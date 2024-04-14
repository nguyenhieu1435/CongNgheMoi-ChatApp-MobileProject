import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Image,
    GestureResponderEvent,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Modal,
} from "react-native";
import { styles } from "./styles";
import { connect, useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import OutsidePressHandler from "react-native-outside-press";
import { useEffect, useRef, useState } from "react";
const { TypingAnimation } = require("react-native-typing-animation");
import ChatDetailHeader from "./chatDetailHeader";
import ChatDetailBottom from "./chatDetailBottom";
import MessageComponent from "./messageComponent";
import { IConversation, IMessageItem, IMessageStatus } from "../../configs/interfaces";
import {
    convertDateStrToHourMinute,
    getAccurancyDateVN,
} from "../../utils/date";
import { socket } from "../../configs/socket-io";

interface Props {
    navigation: any;
    route: any;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

interface DataHistoryChatsI {
    id: number;
    date: string;
    conversations: DataHistoryChatMessageInterface[];
}

export interface DataHistoryChatMessageInterface {
    side: string;
    image: string;
    name: string;
    time: string;
    messages: {
        content: string;
        type: string;
        id?: number;
    }[];
    attachmentFile?: {
        name: string;
        url: string;
    };
    attachmentImages?: {
        url: string;
    }[];
    reactions: DataHistoryChatMessageReactionInterface[] | [];
}
export interface DataHistoryChatMessageReactionInterface {
    userID: number;
    emoji: string;
    userImg: string;
    userName: string;
}

export default function ChatDetail({ navigation, route }: Props) {
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { t } = useTranslation();
    const [textSearch, setTextSearch] = useState("");
    const scrollViewRef = useRef<ScrollView>(null);
    const [showMoreChatActions, setShowMoreChatActions] =
        useState<boolean>(false);
    const heightForMoreChatActions = useRef<number>(80);
    const [indexMessageShowListReaction, setIndexMessageShowListReaction] =
        useState(-1);
    const [replyItem, setReplyItem] = useState<null | IMessageItem>(null);
    const [messageHistory, setMessageHistory] = useState<IMessageItem[]>(
        route.params.messages || []
    );
    const [conversation, setConversation] = useState<IConversation>(
        route.params.conversation
    );
    const [reactionFilter, setReactionFilter] = useState(-1);
    const scrollReactionRef = useRef<ScrollView>(null);
    const userInfo = useSelector((state: IRootState) => state.userInfo);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const ref = useRef<String>("");



    function findReactionsByIndexMessageShowListReaction() {
        return messageHistory[indexMessageShowListReaction].statuses as IMessageStatus[];
    }

    function removeReactionDuplicate(
        reactions: DataHistoryChatMessageReactionInterface[]
    ) {
        return [
            ...new Map(reactions.map((item) => [item.emoji, item])).values(),
        ];
    }
    function classificationEmoji(
        reactions: DataHistoryChatMessageReactionInterface[]
    ) {
        let emojis = new Map<
            string,
            DataHistoryChatMessageReactionInterface[]
        >();
        reactions.forEach((item) => {
            if (emojis.has(item.emoji)) {
                let oldValues = emojis.get(item.emoji);
                emojis.set(
                    item.emoji,
                    oldValues ? [...oldValues, item] : [item]
                );
            } else {
                emojis.set(item.emoji, [item]);
            }
        });
        return Array.from(emojis.values());
    }
    // function returnRequireImageReaction(emoji: string) {
    //     switch (emoji) {
    //         case "👍":
    //             return require("../../assets/like-reaction.png");
    //         case "😡":
    //             return require("../../assets/aggry-reaction.png");
    //         case "😮":
    //             return require("../../assets/surprise-reaction.png");
    //         case "❤":
    //             return require("../../assets/heart-reaction.png");
    //         case "😢":
    //             return require("../../assets/sad-reaction.png");
    //         default:
    //             return require("../../assets/haha-reaction.png");
    //     }
    // }

    function handelSetPaddingBottom() {
        let height = 0;
        height = showMoreChatActions
            ? 75 + heightForMoreChatActions.current
            : 75;
        if (replyItem) {
            height += 40;
        }
        return height;
    }

  
    const handleConvertDataMessageToDateTimeline = (date: string) => {
        const objDate = new Date(getAccurancyDateVN(date));
        // if (objDate is today) return "hh:mm" or return "hh:mm dd/mm/yyyy"
        const currentDate = new Date(
            getAccurancyDateVN(new Date().toISOString())
        );

        if (
            currentDate.getDay() === objDate.getDay() &&
            currentDate.getMonth() === objDate.getMonth() &&
            currentDate.getFullYear() === objDate.getFullYear()
        ) {
            return convertDateStrToHourMinute(date);
        } else {
            if (currentDate.getFullYear() !== objDate.getFullYear()) {
                return `${convertDateStrToHourMinute(
                    date
                )} ${objDate.getDate()}/${
                    objDate.getMonth() + 1
                }/${objDate.getFullYear()}`;
            } else {
                return `${convertDateStrToHourMinute(
                    date
                )} ${objDate.getDate()}/${objDate.getMonth() + 1}`;
            }
        }
    };

    useEffect(() => {

        socket.connect();

        function onConnect(){
            console.log("Connected Socket!");
            socket.emit("openConversation", {
                conversation: conversation,
                user: userInfo.user,
            });
            socket.emit("online", userInfo.user?._id);
        }
        function onReceivedMessage(message : IMessageItem){
           
            if (ref.current !== message._id) {
                setMessageHistory([...messageHistory, {
                    ...message,
                    createdAt: getAccurancyDateVN(message.createdAt),
                    updatedAt: getAccurancyDateVN(message.updatedAt),
                }]);
                ref.current = message._id;
            }
        }
        function onTyping({ conversationId, userId } : any){
            console.log("typing", conversationId, userId);
            setIsTyping(true);
        }
        function onStopTyping(){
            console.log("stopTyping");
            setIsTyping(false);
        }
        function recallMessage(messageReceived: IMessageItem){
            console.log("MESSSAGE HISTORY", messageHistory)
            let newMessageHistory = messageHistory.map((message)=>{
                if (messageReceived._id != message._id){
                    if (message.reply?._id === messageReceived._id){
                        message.reply = {
                            ...messageReceived,
                            deleted: "2",
                        };
                    }
                    return message;
                } else {
                    return {
                        ...messageReceived,
                        deleted: "2",
                    };
                }
            })
            console.log("newMessageHistory", JSON.stringify(newMessageHistory));
            
            setMessageHistory(newMessageHistory as IMessageItem[]);
        }
        function onPinMessage({message } : {message : IMessageItem}){
            console.log("onPinMessage onPinMessage")
            let newPinMessage = conversation.pinnedMessages;
            newPinMessage.pop();
            newPinMessage.unshift(message);
            setConversation({
                ...conversation,
                pinnedMessages: newPinMessage,
            });
        }
        function onUnpinMessage({message }: {message : IMessageItem}){
            console.log("onUnpinMessage onUnpinMessage")
            let newPinMessage = conversation.pinnedMessages;
            newPinMessage = newPinMessage.filter((item) => item._id != message._id);
            setConversation({
                ...conversation,
                pinnedMessages: newPinMessage,
            });
        }
        function onReactForMessage({conversationId, messageId, react, userId}: {
            conversationId: string,
            messageId: string,
            react: string | null,
            userId: string
        }){
            const newMessageHistory = messageHistory.map((message) => {
                if (message._id === messageId) {
                    let newStatuses = message.statuses as IMessageStatus[];
                    if (react) {
                        const isExistReact = newStatuses.find((item) => item.user === userId);
                        if (isExistReact){
                            newStatuses = newStatuses.map((item) => {
                                if (item.user === userId){
                                    return {
                                        ...item,
                                        react: react,
                                    }
                                } else {
                                    return item;
                                }
                            })
                        } else {
                            const newReact : IMessageStatus = {
                                user: userId,
                                status: "sent",
                                react: react,
                            }
                            newStatuses.push(newReact);
                        }
                    } else {
                        newStatuses = newStatuses.filter((item) => item.user !== userId);
                    }
                    return {
                        ...message,
                        statuses: newStatuses,
                    };
                } else {
                    return message;
                }
            })
            setMessageHistory(newMessageHistory);
        }

        socket.on("connect", onConnect)
        socket.on("receivedMessage", onReceivedMessage)
        socket.on("typing", onTyping)
        socket.on("stopTyping", onStopTyping)
        socket.on("recallMessage", recallMessage)
        socket.on("pinMessage", onPinMessage)
        socket.on("unpinMessage", onUnpinMessage)
        socket.on("reactForMessage", onReactForMessage)

        return () => {
            socket.off("connect", onConnect);
            socket.off("receivedMessage", onReceivedMessage);
            socket.off("typing", onTyping);
            socket.off("stopTyping", onStopTyping);
            socket.off("recallMessage", recallMessage);
            socket.off("pinMessage", onPinMessage);
            socket.off("unpinMessage", onUnpinMessage);
            socket.off("reactForMessage", onReactForMessage);
            socket.disconnect();
        }
        
    }, [messageHistory]);

    function handleUpdateAllMessageItem(messageId: string) {
        const newMessages = messageHistory.map((message : IMessageItem) => {
            if (message._id == messageId) {
                
                const deleteMessage = {
                    ...message,
                    deleted: "2",
                }

                socket.emit("recallMessage", deleteMessage);

                return deleteMessage;

            } else {
                if (message.reply?._id == messageId) {
                    message.reply = {
                        ...message.reply,
                        deleted: "2",
                    };
                }
                
                return message;
            }
        })
        setMessageHistory(newMessages as IMessageItem[]);
    }
    function handleRemoveMessageItem(messageId: string) {
        const newArray = messageHistory.filter((message) => {
            return message._id != messageId;
        });
        setMessageHistory(newArray);
    }
    function handleGetNameConversation(conversation: IConversation) {
        if (conversation.isGroup){
            return conversation.name;
        } else {
            return conversation.users.find((user) => user._id !== userInfo.user?._id)?.name;
        }
    }
    
    
    return (
        <View
            style={[
                styles.chatDetailWrapper,
                theme === lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
            ]}
        >
            <StatusBar />
            <SafeAreaView style={[styles.chatDetailContainer]}>
                <ChatDetailHeader
                    navigation={navigation}
                    translation={t}
                    theme={theme}
                    textSearch={textSearch}
                    setTextSearch={setTextSearch}
                    conversation={conversation}
                    setConversation={setConversation}
                    socket={socket}
                />
                <View
                    style={[
                        styles.chatDetailHistoryListWrapper,
                        {
                            paddingBottom: handelSetPaddingBottom(),
                        },
                    ]}
                >
                    
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        ref={scrollViewRef}
                        onContentSizeChange={() =>
                            scrollViewRef.current?.scrollToEnd({
                                animated: true,
                            })
                        }
                    >
                        {messageHistory &&
                            messageHistory.map((messageItem, index) => {
                                const TimeLine =
                                    index == 0 ? (
                                        <View key={index}></View>
                                    ) : (
                                        <View
                                            style={[styles.timeLineBox]}
                                            key={index}
                                        >
                                            <Text
                                                style={[
                                                    styles.timeLineText,
                                                    theme === lightMode
                                                        ? commonStyles.lightTertiaryText
                                                        : commonStyles.darkTertiaryText,
                                                    {
                                                        backgroundColor:
                                                            theme === lightMode
                                                                ? commonStyles
                                                                      .chatNavbarBorderBottomColorLight
                                                                      .color
                                                                : commonStyles
                                                                      .chatNavbarBorderBottomColorDark
                                                                      .color,
                                                    },
                                                ]}
                                            >
                                                {messageItem.createdAt &&
                                                    handleConvertDataMessageToDateTimeline(
                                                        messageItem.createdAt
                                                    )}
                                            </Text>
                                            <View
                                                style={[
                                                    styles.timeLineLine,
                                                    {
                                                        backgroundColor:
                                                            theme === lightMode
                                                                ? commonStyles
                                                                      .chatNavbarBorderBottomColorLight
                                                                      .color
                                                                : commonStyles
                                                                      .chatNavbarBorderBottomColorDark
                                                                      .color,
                                                    },
                                                ]}
                                            ></View>
                                        </View>
                                    );
                                return (
                                    <>
                                        {TimeLine}
                                        <MessageComponent
                                            id={index}
                                            data={messageItem}
                                            theme={theme}
                                            translation={t}
                                            indexShowListReaction={
                                                indexMessageShowListReaction
                                            }
                                            setIndexShowListReaction={
                                                setIndexMessageShowListReaction
                                            }
                                            setReplyItem={setReplyItem}
                                            handleUpdateAllMessageItem={
                                                handleUpdateAllMessageItem
                                            }
                                            handleRemoveMessageItem={
                                                handleRemoveMessageItem
                                            }
                                            conversation={conversation}
                                            setConversation={setConversation}
                                            socket={socket}
                                            messageHistory={messageHistory}
                                            setMessageHistory={setMessageHistory}
                                        />
                                    </>
                                );
                            })}
                        {isTyping && (
                            <View
                                style={[
                                    styles.chatDetailMessageFromOpponentBox,
                                ]}
                            >
                                <Image
                                    source={{
                                        uri: conversation.picture,
                                    }}
                                    resizeMode="contain"
                                    style={[styles.chatDetailAvatarImg]}
                                />
                                <View
                                    style={[
                                        styles.chatDetailMessageFromOpponentMainWrapper,
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.chatDetailMessageFromOpponentMainTypingContainer,
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentInfoBox,
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    styles.chatDetailMessageFromOpponentInfoTextBox,
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.chatDetailMessageFromOpponentInfoText,
                                                    ]}
                                                >
                                                    typing
                                                </Text>
                                                <TypingAnimation
                                                    dotColor={
                                                        commonStyles
                                                            .darkPrimaryText
                                                            .color
                                                    }
                                                    dotAmplitude={2}
                                                    style={{
                                                        marginBottom: 15,
                                                    }}
                                                    dotStyles={{
                                                        fontSize: 3,
                                                    }}
                                                    dotMargin={5}
                                                    dotSpeed={0.3}
                                                    dotRadius={2.5}
                                                    dotX={12}
                                                    dotY={6}
                                                />
                                            </View>
                                            <View
                                                style={[
                                                    styles.chatDetailMessageFromOpponentTriangle,
                                                ]}
                                            ></View>
                                        </View>

                                        <Text
                                            style={[
                                                styles.chatDetailMessageFromOpponentUsername,
                                                theme === lightMode
                                                    ? commonStyles.lightTertiaryText
                                                    : commonStyles.darkTertiaryText,
                                            ]}
                                        >
                                            {
                                                handleGetNameConversation(conversation)
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </ScrollView>
                </View>
                <ChatDetailBottom
                    heightForMoreChatActions={heightForMoreChatActions.current}
                    theme={theme}
                    translation={t}
                    historyChatScrollViewRef={scrollViewRef}
                    showMoreChatActions={showMoreChatActions}
                    setShowMoreChatActions={setShowMoreChatActions}
                    replyItem={replyItem}
                    setReplyItem={setReplyItem}
                    socket={socket}
                    messageHistory={messageHistory}
                    setMessageHistory={setMessageHistory}
                    conversation={conversation}
                />
                {/* <Modal
                    visible={false}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => setIndexMessageShowListReaction(-1)}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0,0.3)",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            paddingHorizontal: 8,
                        }}
                    >
                        <OutsidePressHandler
                            onOutsidePress={() => {
                                setIndexMessageShowListReaction(-1);
                                setReactionFilter(-1);
                            }}
                            style={[
                                theme === lightMode
                                    ? commonStyles.lightPrimaryBackground
                                    : commonStyles.darkPrimaryBackground,
                                {
                                    width: "100%",
                                    height: 350,
                                    borderRadius: 25,
                                    marginBottom: 8,
                                    paddingHorizontal: 15,
                                    paddingVertical: 10,
                                },
                            ]}
                        >
                            <View
                                style={[
                                    styles.chatDetailReactionListPopupWrapper,
                                ]}
                            >
                                <Text></Text>
                                <Text
                                    style={[
                                        styles.chatDetailReactionListPopupTitle,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    {t("messageReactionPopupTitle")}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setIndexMessageShowListReaction(-1);
                                        setReactionFilter(-1);
                                    }}
                                    style={[
                                        styles.chatDetailReactionListBtnClose,
                                        {
                                            backgroundColor:
                                                theme === lightMode
                                                    ? commonStyles
                                                          .chatNavbarBorderBottomColorLight
                                                          .color
                                                    : commonStyles
                                                          .chatNavbarBorderBottomColorDark
                                                          .color,
                                        },
                                    ]}
                                >
                                    <Image
                                        source={require("../../assets/close-line-icon.png")}
                                        style={[
                                            styles.chatDetailReactionListBtnCloseIcon,
                                            {
                                                tintColor:
                                                    lightMode === theme
                                                        ? commonStyles
                                                              .lightPrimaryText
                                                              .color
                                                        : commonStyles
                                                              .darkPrimaryText
                                                              .color,
                                            },
                                        ]}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    marginTop: 10,
                                    flexGrow: 1,
                                    flexShrink: 1,
                                }}
                            >
                                <ScrollView
                                    horizontal={true}
                                    style={{
                                        width: "100%",
                                    }}
                                    pagingEnabled={true}
                                    ref={scrollReactionRef}
                                    showsHorizontalScrollIndicator={false}
                                    onScroll={(event) => {
                                        let positionX =
                                            event.nativeEvent.contentOffset.x;
                                        let index = Math.round(
                                            positionX / (WIDTH - 16 - 30)
                                        );
                                        setReactionFilter(index - 1);
                                    }}
                                >
                                    <ScrollView
                                        style={{
                                            width: WIDTH - 16 - 30,
                                        }}
                                    >
                                        {findReactionsByIndexMessageShowListReaction().map(
                                            (status, indexAll) => {
                                                return (
                                                    <TouchableOpacity
                                                        key={indexAll}
                                                        style={[
                                                            styles.chatDetailPopupReactionItem,
                                                        ]}
                                                    >
                                                        <Image
                                                            source={{
                                                                uri: itemAll.userImg,
                                                            }}
                                                            style={[
                                                                styles.chatDetailPopupReactionItemAvatar,
                                                            ]}
                                                        />
                                                        <View
                                                            style={[
                                                                styles.chatDetailPopupReactionItemMainContent,
                                                                {
                                                                    borderBottomColor:
                                                                        theme ===
                                                                        lightMode
                                                                            ? commonStyles
                                                                                  .chatNavbarBorderBottomColorLight
                                                                                  .color
                                                                            : commonStyles
                                                                                  .chatNavbarBorderBottomColorDark
                                                                                  .color,
                                                                },
                                                            ]}
                                                        >
                                                            <View>
                                                                <Text
                                                                    style={[
                                                                        styles.chatDetailPopupReactionItemMainContentUsername,
                                                                        theme ===
                                                                        lightMode
                                                                            ? commonStyles.lightPrimaryText
                                                                            : commonStyles.darkPrimaryText,
                                                                    ]}
                                                                >
                                                                    {
                                                                        status.user
                                                                    }
                                                                </Text>
                                                                <Text
                                                                    style={[
                                                                        styles.chatDetailPopupReactionItemMainContentRemove,
                                                                        theme ===
                                                                        lightMode
                                                                            ? commonStyles.lightTertiaryText
                                                                            : commonStyles.darkTertiaryText,
                                                                    ]}
                                                                >
                                                                    {t(
                                                                        "messageReactionPopupPressToRemove"
                                                                    )}
                                                                </Text>
                                                            </View>
                                                            <Image
                                                                source={returnRequireImageReaction(
                                                                    itemAll.emoji
                                                                )}
                                                                style={[
                                                                    styles.chatDetailPopupReactionItemMainContentIcon,
                                                                ]}
                                                            />
                                                        </View>
                                                    </TouchableOpacity>
                                                );
                                            }
                                        )}
                                    </ScrollView>
                                    {classificationEmoji(
                                        findReactionsByIndexMessageShowListReaction()
                                    ).map((reactionItems, indexItem) => {
                                        return (
                                            <ScrollView
                                                key={indexItem}
                                                style={{
                                                    width: WIDTH - 16 - 30,
                                                }}
                                            >
                                                {reactionItems.map(
                                                    (
                                                        userReactionItem,
                                                        indexUserReactionItem
                                                    ) => {
                                                        return (
                                                            <TouchableOpacity
                                                                key={
                                                                    indexUserReactionItem
                                                                }
                                                                style={[
                                                                    styles.chatDetailPopupReactionItem,
                                                                ]}
                                                            >
                                                                <Image
                                                                    source={{
                                                                        uri: userReactionItem.userImg,
                                                                    }}
                                                                    style={[
                                                                        styles.chatDetailPopupReactionItemAvatar,
                                                                    ]}
                                                                />
                                                                <View
                                                                    style={[
                                                                        styles.chatDetailPopupReactionItemMainContent,
                                                                        {
                                                                            borderBottomColor:
                                                                                theme ===
                                                                                lightMode
                                                                                    ? commonStyles
                                                                                          .chatNavbarBorderBottomColorLight
                                                                                          .color
                                                                                    : commonStyles
                                                                                          .chatNavbarBorderBottomColorDark
                                                                                          .color,
                                                                        },
                                                                    ]}
                                                                >
                                                                    <View>
                                                                        <Text
                                                                            style={[
                                                                                styles.chatDetailPopupReactionItemMainContentUsername,
                                                                                theme ===
                                                                                lightMode
                                                                                    ? commonStyles.lightPrimaryText
                                                                                    : commonStyles.darkPrimaryText,
                                                                            ]}
                                                                        >
                                                                            {
                                                                                userReactionItem.userName
                                                                            }
                                                                        </Text>
                                                                        <Text
                                                                            style={[
                                                                                styles.chatDetailPopupReactionItemMainContentRemove,
                                                                                theme ===
                                                                                lightMode
                                                                                    ? commonStyles.lightTertiaryText
                                                                                    : commonStyles.darkTertiaryText,
                                                                            ]}
                                                                        >
                                                                            {t(
                                                                                "messageReactionPopupPressToRemove"
                                                                            )}
                                                                        </Text>
                                                                    </View>
                                                                    <Image
                                                                        source={returnRequireImageReaction(
                                                                            userReactionItem.emoji
                                                                        )}
                                                                        style={[
                                                                            styles.chatDetailPopupReactionItemMainContentIcon,
                                                                        ]}
                                                                    />
                                                                </View>
                                                            </TouchableOpacity>
                                                        );
                                                    }
                                                )}
                                            </ScrollView>
                                        );
                                    })}
                                </ScrollView>
                            </View>
                            <View
                                style={[
                                    styles.chatDetailReactionListFilterWrapper,
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        // handleControllingSlideScroll(-1);
                                    }}
                                    style={[
                                        styles.chatDetailReactionListFilterBtn,
                                        {
                                            backgroundColor:
                                                reactionFilter === -1
                                                    ? theme === lightMode
                                                        ? commonStyles
                                                              .chatNavbarBorderBottomColorLight
                                                              .color
                                                        : commonStyles
                                                              .chatNavbarBorderBottomColorDark
                                                              .color
                                                    : "transparent",
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.chatDetailReactionListFilterBtnText,
                                        ]}
                                    >
                                        {t("searchDetailAllTitle")}
                                    </Text>
                                </TouchableOpacity>
                                {removeReactionDuplicate(
                                    findReactionsByIndexMessageShowListReaction()
                                ).map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() =>
                                                handleControllingSlideScroll(
                                                    index
                                                )
                                            }
                                            style={[
                                                styles.chatDetailReactionListFilterBtn,
                                                {
                                                    backgroundColor:
                                                        reactionFilter === index
                                                            ? theme ===
                                                              lightMode
                                                                ? commonStyles
                                                                      .chatNavbarBorderBottomColorLight
                                                                      .color
                                                                : commonStyles
                                                                      .chatNavbarBorderBottomColorDark
                                                                      .color
                                                            : "transparent",
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.chatDetailReactionListFilterBtnText,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                {item.emoji}{" "}
                                                {
                                                    findReactionsByIndexMessageShowListReaction().filter(
                                                        (item2) =>
                                                            item2.emoji ===
                                                            item.emoji
                                                    ).length
                                                }
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </OutsidePressHandler>
                    </View>
                </Modal> */}
            </SafeAreaView>
        </View>
    );
}
