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
    Modal,
} from "react-native";
import { styles } from "./styles";
import { useSelector } from "react-redux";
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
import { IConversation, IMessageItem } from "../../configs/interfaces";
import MapView, { Marker } from "react-native-maps";
import { LINK_GET_MESSAGE_HISTORY } from "@env";
import {
    convertDateStrToHourMinute,
    getAccurancyDateVN,
} from "../../utils/date";
import { io } from "socket.io-client";

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
    const [indexMessageAction, setIndexMessageAction] = useState(-1);
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
    const [socketIO, setSocketIO] = useState<any>(null);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const ref = useRef<String>('')

    // const dataHistoryChats: DataHistoryChatsI[] = [
    //     {
    //         id: 1,
    //         date: "15/01/2024",
    //         conversations: [
    //             {
    //                 side: "me",
    //                 image: "https://avatar.iran.liara.run/public/44",
    //                 name: "Doris Brown",
    //                 time: "10:31",
    //                 messages: [
    //                     {
    //                         content: "Jesse Pinkman",
    //                         type: "tag",
    //                         id: 9999,
    //                     },
    //                     {
    //                         content: " fgfgfgfgfgfgfgf ",
    //                         type: "text",
    //                     },
    //                     {
    //                         content: "Pipilu",
    //                         type: "tag",
    //                         id: 9998,
    //                     },
    //                     {
    //                         content: " fgfgfgfgfgfgfgf",
    //                         type: "text",
    //                     },
    //                 ],
    //                 reactions: [],
    //             },
    //             {
    //                 side: "opponent",
    //                 image: "https://avatar.iran.liara.run/public/44",
    //                 name: "Jane Smith",
    //                 time: "10:31",
    //                 messages: [
    //                     {
    //                         content: "Jesse Pinkman",
    //                         type: "tag",
    //                         id: 9997,
    //                     },
    //                     {
    //                         content: " fgfgfgfgfgfgfgf ",
    //                         type: "text",
    //                     },
    //                     {
    //                         content: "Pipilu",
    //                         type: "tag",
    //                         id: 9996,
    //                     },
    //                     {
    //                         content: " fgfgfgfgfgfgfgf",
    //                         type: "text",
    //                     },
    //                 ],
    //                 reactions: [
    //                     {
    //                         userID: 1,
    //                         emoji: "👍",
    //                         userImg: "https://avatar.iran.liara.run/public/44",
    //                         userName: "Doris Brown",
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    //     {
    //         id: 2,
    //         date: "18/01/2024",
    //         conversations: [
    //             {
    //                 side: "me",
    //                 image: "https://avatar.iran.liara.run/public/44",
    //                 name: "Doris Brown",
    //                 time: "10:31",
    //                 messages: [
    //                     {
    //                         content: "Jesse Pinkman",
    //                         type: "tag",
    //                         id: 9995,
    //                     },
    //                     {
    //                         content: " fgfgfgfgfgfgfgf ",
    //                         type: "text",
    //                     },
    //                     {
    //                         content: "Pipilu",
    //                         type: "tag",
    //                         id: 9994,
    //                     },
    //                     {
    //                         content: " fgfgfgfgfgfgfgf",
    //                         type: "text",
    //                     },
    //                 ],
    //                 attachmentFile: {
    //                     name: "Minible-Whitepaper.pdf",
    //                     url: "https://minible.finance/Minible-Whitepaper.pdf",
    //                 },
    //                 reactions: [
    //                     {
    //                         userID: 1,
    //                         emoji: "❤",
    //                         userImg: "https://avatar.iran.liara.run/public/44",
    //                         userName: "Doris Brown",
    //                     },
    //                     {
    //                         userID: 3,
    //                         emoji: "😡",
    //                         userImg: "https://avatar.iran.liara.run/public/44",
    //                         userName: "Doris Brown",
    //                     },
    //                 ],
    //             },
    //             {
    //                 side: "opponent",
    //                 image: "https://avatar.iran.liara.run/public/44",
    //                 name: "Jane Smith",
    //                 time: "10:31",
    //                 messages: [
    //                     {
    //                         content: "Jesse Pinkman",
    //                         type: "tag",
    //                         id: 9993,
    //                     },
    //                     {
    //                         content: " fgfgfgfgfgfgfgf ",
    //                         type: "text",
    //                     },
    //                     {
    //                         content: "Pipilu",
    //                         type: "tag",
    //                         id: 9992,
    //                     },
    //                     {
    //                         content: " fgfgfgfgfgfgfgf",
    //                         type: "text",
    //                     },
    //                 ],
    //                 attachmentFile: {
    //                     name: "Minible-Whitepaper.pdf",
    //                     url: "https://minible.finance/Minible-Whitepaper.pdf",
    //                 },
    //                 reactions: [],
    //             },
    //         ],
    //     },
    //     {
    //         id: 3,
    //         date: "20/01/2024",
    //         conversations: [
    //             {
    //                 side: "me",
    //                 image: "https://avatar.iran.liara.run/public/44",
    //                 name: "Doris Brown",
    //                 time: "10:31",
    //                 messages: [
    //                     {
    //                         content: "Jesse Pinkman",
    //                         type: "tag",
    //                         id: 9991,
    //                     },
    //                     {
    //                         content: " fgfgfgfgfgfgfgf ",
    //                         type: "text",
    //                     },
    //                     {
    //                         content: "Pipilu",
    //                         type: "tag",
    //                         id: 9990,
    //                     },
    //                     {
    //                         content: " fgfgfgfgfgfgfgf",
    //                         type: "text",
    //                     },
    //                 ],
    //                 attachmentImages: [
    //                     {
    //                         url: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    //                     },
    //                     {
    //                         url: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    //                     },
    //                 ],
    //                 reactions: [
    //                     {
    //                         userID: 2,
    //                         emoji: "😡",
    //                         userImg: "https://avatar.iran.liara.run/public/44",
    //                         userName: "Doris Brown",
    //                     },
    //                 ],
    //             },
    //             {
    //                 side: "opponent",
    //                 image: "https://avatar.iran.liara.run/public/44",
    //                 name: "Jane Smith",
    //                 time: "10:31",
    //                 messages: [
    //                     {
    //                         content: "Jesse Pinkman",
    //                         type: "tag",
    //                         id: 9989,
    //                     },
    //                     {
    //                         content: " fgfgfgfgfgfgfgf ",
    //                         type: "text",
    //                     },
    //                     {
    //                         content: "Pipilu",
    //                         type: "tag",
    //                         id: 9988,
    //                     },
    //                     {
    //                         content: " fgfgfgfgfgfgfgf",
    //                         type: "text",
    //                     },
    //                 ],
    //                 attachmentImages: [
    //                     {
    //                         url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    //                     },
    //                     {
    //                         url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    //                     },
    //                 ],
    //                 reactions: [
    //                     {
    //                         userID: 1,
    //                         emoji: "😮",
    //                         userImg: "https://avatar.iran.liara.run/public/44",
    //                         userName: "Doris Brown",
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // ];

    // function findReactionsByIndexMessageShowListReaction() {
    //     let indexOfDataHistoryChats = Math.floor(
    //         indexMessageShowListReaction / 10
    //     );
    //     let indexOfMessage = indexMessageShowListReaction % 10;

    //     if (indexOfDataHistoryChats < 0) return [];

    //     return dataHistoryChats[indexOfDataHistoryChats].conversations[
    //         indexOfMessage
    //     ].reactions;
    // }

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
    function returnRequireImageReaction(emoji: string) {
        switch (emoji) {
            case "👍":
                return require("../../assets/like-reaction.png");
            case "😡":
                return require("../../assets/aggry-reaction.png");
            case "😮":
                return require("../../assets/surprise-reaction.png");
            case "❤":
                return require("../../assets/heart-reaction.png");
            case "😢":
                return require("../../assets/sad-reaction.png");
            default:
                return require("../../assets/haha-reaction.png");
        }
    }
    function handleControllingSlideScroll(index: number) {
        if (index === -1) {
            scrollReactionRef.current?.scrollTo({
                x: 0,
                animated: true,
            });
        } else {
            scrollReactionRef.current?.scrollTo({
                x: (WIDTH - 30 - 16) * (index + 1),
                animated: true,
            });
        }
        setReactionFilter(index);
    }
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

    // useEffect(() => {
    //     const bearToken =
    //         "Bearer " + userInfo.accessToken;

    //     async function fetchMessageHistory() {
    //         try {
    //             const response = await fetch(
    //                 LINK_GET_MESSAGE_HISTORY + conversation._id,
    //                 {
    //                     method: "GET",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         Authorization: bearToken,
    //                     },
    //                 }
    //             );
    //             if (!response.ok) {
    //                 throw new Error("Something went wrong!");
    //             }
    //             const data = await response.json();
    //             if (Array.isArray(data)) {
    //                 const newData = data.map((message) => {
    //                     let messageItem: IMessageItem = {
    //                         _id: message._id,
    //                         sender: {
    //                             _id: message.sender._id,
    //                             name: message.sender.name,
    //                             avatar: message.sender.avatar,
    //                         },
    //                         messages: message.messages,
    //                         conversation: message.conversation,
    //                         reply: message.reply,
    //                         files: message.files,
    //                         createdAt: getAccurancyDateVN(message.createdAt),
    //                         updatedAt: getAccurancyDateVN(message.updatedAt),
    //                         __v: message.__v,
    //                         statuses: message.statuses,
    //                         location: message.location,
    //                         deleted: message.deleted,
    //                     };

    //                     return messageItem;
    //                 });
    //                 console.log(newData);
    //                 setMessageHistory(newData);
    //             } else {
    //                 setMessageHistory([]);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchMessageHistory();
    // }, []);

    // function sortMessageByDateDesc(messages : IMessageItem[]) {
    //     return messages.sort((a, b) => {
    //         return new Date(a.createdAt) - new Date(b.createdAt);
    //     });
    // }

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
        let socket = io("https://homeless-eadith-vunguyendev.koyeb.app");

        
        socket.on("connect", () => {
            console.log("connected");

            socket.emit("online", userInfo.user?._id)

            socket.on("receivedMessage", (message) => {
                console.log("receivedMessage", message);
                // const isExist = messageHistory.some(myMessage => message._id === myMessage._id)
                if (ref.current !== message._id){
                    console.log("ababa", messageHistory)
                    setMessageHistory(prev => [...prev, message])
                    ref.current = message._id
                }
            });
    
            socket.on("typing", ({ conversationId, userId  }) => {
                console.log("typing", conversationId, userId);
                setIsTyping(true);
            });
            socket.on("stopTyping", () => {
                console.log("stopTyping");
                setIsTyping(false);
            });
        });

      

        // socket.emit("online", userInfo.user?._id)

        socket.emit("openConversation", {
            conversation: conversation,
            user: userInfo.user,
        });

       

        setSocketIO(socket);

        return () => {
            socket.disconnect();
        };
    }, []);


    
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
                                            indexMessageAction={
                                                indexMessageAction
                                            }
                                            setIndexMessageAction={
                                                setIndexMessageAction
                                            }
                                            indexShowListReaction={
                                                indexMessageShowListReaction
                                            }
                                            setIndexShowListReaction={
                                                setIndexMessageShowListReaction
                                            }
                                            setReplyItem={setReplyItem}
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
                                            {conversation.name}
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
                    socket={socketIO}
                    messageHistory={messageHistory}
                    setMessageHistory={setMessageHistory}
                    conversation={conversation}
                />
                <Modal
                    visible={indexMessageShowListReaction !== -1}
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
                                {/* <ScrollView
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
                                            (itemAll, indexAll) => {
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
                                                                        itemAll.userName
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
                                </ScrollView> */}
                            </View>
                            <View
                                style={[
                                    styles.chatDetailReactionListFilterWrapper,
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        handleControllingSlideScroll(-1);
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
                                {/* {removeReactionDuplicate(
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
                                })} */}
                            </View>
                        </OutsidePressHandler>
                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    );
}
