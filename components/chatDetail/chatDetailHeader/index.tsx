import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Modal,
    Alert,
} from "react-native";
import {
    Dispatch,
    memo,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import { styles } from "./styles";
import commonStyles from "../../../CommonStyles/commonStyles";
import { lightMode } from "../../../redux_toolkit/slices/theme.slice";
import { FontAwesome } from "@expo/vector-icons";
import OutsidePressHandler from "react-native-outside-press";
import { TFunction } from "i18next";
import debounce from "debounce";
import {
    IConversation,
    IFileMessage,
    IMessageItem,
    IUserInConversation,
} from "../../../configs/interfaces";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux_toolkit/store";
import Tooltip from "react-native-walkthrough-tooltip";
import { saveToClipboard } from "../../../utils/clipboard";
import {
    LINK_GROUP,
    LINK_MESSAGE_NOTIFICATION,
    LINK_OPEN_CONVERSATION,
    LINK_UNPIN_MESSAGE,
} from "@env";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";
import { socket } from "../../../configs/socket-io";
import CreateGroupAvatarWhenAvatarIsEmpty from "../../../utils/createGroupAvatarWhenAvatarIsEmpty";
import BottomSheetLeaveGroup from "../bottomSheetLeaveGroup";
import { getAccurancyDateVN } from "../../../utils/date";

interface ChatDetailHeaderProps {
    theme: string;
    navigation: any;
    translation: TFunction<"translation", undefined>;
    textSearch: string;
    setTextSearch: (text: string) => void;
    conversation: IConversation;
    setConversation: Dispatch<SetStateAction<IConversation>>;
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    setMessageHistory: Dispatch<SetStateAction<IMessageItem[]>>;
}

function ChatDetailHeader({
    theme,
    navigation,
    translation: t,
    textSearch,
    setTextSearch,
    conversation,
    setConversation,
    setMessageHistory,
}: ChatDetailHeaderProps) {
    const [showModalSearch, setShowModalSearch] = useState(false);
    const [showMoreAction, setShowMoreAction] = useState(false);
    const userInfo = useSelector((state: IRootState) => state.userInfo);
    const [isShowPinAction, setIsShowPinAction] = useState(-1);
    const [showMore, setShowMore] = useState(false);
    const [showModalLeaveGroup, setShowModalLeaveGroup] = useState(false);
    const friendsOnline = useSelector(
        (state: IRootState) => state.onlineUserIds
    );
    const messageIdRef = useRef<string>("");

    function setTextDebounce(text: string) {
        debounce(() => {
            setTextSearch(text);
        }, 500);
    }

    async function createPinNotification({
        conversationId,
        type,
        messageId,
    }: {
        conversationId: string;
        type: string;
        messageId: string;
    }) {
        try {
            const resp = await fetch(LINK_MESSAGE_NOTIFICATION, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
                body: JSON.stringify({
                    conversationId,
                    type,
                    messageId,
                }),
            });
            if (resp.ok) {
                const data = (await resp.json()) as IMessageItem;
                socket.emit("sendMessage", data);
                if (messageIdRef.current !== data._id) {
                    setMessageHistory((prev) => [
                        ...prev,
                        {
                            ...data,
                            createdAt: getAccurancyDateVN(data.createdAt),
                            updatedAt: getAccurancyDateVN(data.updatedAt),
                        },
                    ]);
                    messageIdRef.current = data._id;
                }
                console.log(`Create ${type} notification success`);
            }
        } catch (error) {
            console.log(`Error create ${type} notification`, error);
        }
    }
    function handleUnpinMessage(message: IMessageItem) {
        setIsShowPinAction(-1);
        fetch(LINK_UNPIN_MESSAGE + message._id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    const newPinnedMessage = conversation.pinnedMessages.filter(
                        (item) => item._id !== message._id
                    );
                    setConversation({
                        ...conversation,
                        pinnedMessages: newPinnedMessage,
                    });
                    console.log("calling unpin");

                    socket.emit("unpinMessage", {
                        users: conversation.users,
                        message: message,
                        userId: userInfo.user?._id,
                    });
                    createPinNotification({
                        conversationId: conversation._id,
                        type: "UNPIN_MESSAGE",
                        messageId: message._id,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function handleGetMessageContent(message: IMessageItem): string {
        if (message.messages.length > 0) {
            console.log("Message PINNEDaaaaaaaa: ", message);
            return message.messages
                .map((messageDetail) => {
                    return messageDetail.type === "text"
                        ? messageDetail.content
                        : "@" + messageDetail.content;
                })
                .join("");
        } else if (message.files.some((file) => file.type.includes("image"))) {
            return t("chatDetailImageTitle");
        } else if (
            message.files.some(
                (file) =>
                    file.type.includes("video") ||
                    file.type.includes("application")
            )
        ) {
            return t("chatDetailFileTitle");
        } else {
            return t("chatDetailFileTitle");
        }
    }
    function deleteMyConversationAlert() {
        Alert.alert(
            "Xác nhận xóa trò chuyện",
            "Bạn có chắc chắn muốn xóa trò chuyện này không?",
            [
                {
                    text: "Hủy",
                    onPress: () => {},
                    style: "cancel",
                },
                {
                    text: "Xóa",
                    onPress: handleDeleteMyConversation,
                },
            ]
        );
    }
    async function handleDeleteMyConversation() {
        console.log("begin delete conversation");

        try {
            const response = await fetch(
                LINK_OPEN_CONVERSATION + `/${conversation._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.accessToken}`,
                    },
                }
            );
            if (response.ok) {
                setShowMoreAction(false);
                setMessageHistory([]);
            } else {
                const data = await response.json();
                console.log("Failed to delete conversation", data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function isConversationOnline() {
        return conversation.users.some(
            (user: IUserInConversation) =>
                friendsOnline.onlineUserIds.includes(user._id) &&
                user._id !== userInfo.user?._id
        );
    }

    function handleCallVideo() {
        navigation.navigate("VideoCall", {
            conversation: conversation,
        });
    }
    function handleCallAudio() {
        navigation.navigate("AudioCall", {
            conversation: conversation,
        });
    }

    return (
        <>
            <View style={[styles.chatDetailNavbarContainer]}>
                <View
                    style={[
                        styles.chatDetailNavbar,
                        {
                            borderBottomColor:
                                theme === lightMode
                                    ? commonStyles
                                          .chatNavbarBorderBottomColorLight
                                          .color
                                    : commonStyles
                                          .chatNavbarBorderBottomColorDark
                                          .color,
                            zIndex: 20,
                        },
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ChatList")}
                        style={[styles.btnGoback]}
                    >
                        <FontAwesome
                            name="angle-left"
                            size={24}
                            color={
                                theme === lightMode
                                    ? commonStyles.lightSecondaryText.color
                                    : commonStyles.darkSecondaryText.color
                            }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.chatDetailNavbarUsernameBox]}
                    >
                        {!conversation.isGroup ? (
                            <Image
                                source={{
                                    uri: conversation.users.find(
                                        (user) =>
                                            user._id !== userInfo.user?._id
                                    )?.avatar,
                                }}
                                resizeMode="cover"
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 50,
                                }}
                            />
                        ) : conversation.picture ? (
                            <Image
                                source={{ uri: conversation.picture }}
                                resizeMode="cover"
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 50,
                                }}
                            />
                        ) : (
                            CreateGroupAvatarWhenAvatarIsEmpty(conversation)
                        )}
                        <View style={[styles.chatDetailUsernameTextBox]}>
                            <Text
                                numberOfLines={1}
                                style={[
                                    styles.chatDetailUsernameText,
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText,
                                ]}
                            >
                                {conversation.isGroup
                                    ? conversation.name
                                    : conversation.users.find(
                                          (user) =>
                                              user._id !== userInfo.user?._id
                                      )?.name}
                            </Text>
                            {isConversationOnline() && (
                                <Text
                                    style={[
                                        styles.activityIcon,
                                        {
                                            backgroundColor:
                                                commonStyles.activeOnlineColor
                                                    .color,
                                        },
                                    ]}
                                ></Text>
                            )}
                        </View>
                    </TouchableOpacity>

                    <View style={[styles.chatDetailNavbarBaseActions]}>
                        {/* <OutsidePressHandler
                            onOutsidePress={() => {
                                setShowModalSearch(false);
                            }}
                            style={[styles.chatDetailNavbarBaseActionItemBox]}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setShowModalSearch(!showModalSearch);
                                }}
                            >
                                <Image
                                    source={require("../../../assets/search-line-icon.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 23,
                                        height: 23,
                                    }}
                                    tintColor={
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color
                                    }
                                />
                            </TouchableOpacity>

                            {showModalSearch && (
                                <View
                                    style={[
                                        styles.chatDetailNavbarBaseActionItemPopup,
                                        theme === lightMode
                                            ? commonStyles.lightFourBackground
                                            : commonStyles.darkFourBackground,
                                        {
                                            shadowColor: "#0F223A",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.12,
                                            shadowRadius: 4,
                                            elevation: 4,
                                        },
                                    ]}
                                >
                                    <TextInput
                                        placeholder={t(
                                            "chatDetailSearchPlaceholder"
                                        )}
                                        value={textSearch}
                                        onChangeText={(text) =>
                                            setTextDebounce(text)
                                        }
                                        placeholderTextColor={
                                            theme === lightMode
                                                ? commonStyles
                                                      .lightSecondaryText.color
                                                : commonStyles.darkSecondaryText
                                                      .color
                                        }
                                        style={[
                                            styles.chatDetailNavbarBaseActionItePopupInput,
                                            theme === lightMode
                                                ? commonStyles.lightTertiaryBackground
                                                : commonStyles.darkTertiaryBackground,
                                            theme === lightMode
                                                ? commonStyles.lightTertiaryText
                                                : commonStyles.darkTertiaryText,
                                        ]}
                                    />
                                </View>
                            )}
                        </OutsidePressHandler> */}

                        {conversation.isGroup ? (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("AddFriendIntoGroup", {
                                        conversation: conversation,
                                        socket: socket,
                                        setConversation: setConversation,
                                        setMessageHistory: setMessageHistory,
                                    })
                                }
                            >
                                <Image
                                    source={require("../../../assets/user-add-line.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 23,
                                        height: 23,
                                    }}
                                    tintColor={
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color
                                    }
                                />
                            </TouchableOpacity>
                        ) : (
                            <></>
                        )}
                        <TouchableOpacity onPress={handleCallAudio}>
                            <Image
                                source={require("../../../assets/phone-line-icon.png")}
                                resizeMode="contain"
                                style={{
                                    width: 23,
                                    height: 23,
                                }}
                                tintColor={
                                    theme === lightMode
                                        ? commonStyles.lightSecondaryText.color
                                        : commonStyles.darkSecondaryText.color
                                }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCallVideo}>
                            <Image
                                source={require("../../../assets/vidicon-line-icon.png")}
                                resizeMode="contain"
                                style={{
                                    width: 23,
                                    height: 23,
                                }}
                                tintColor={
                                    theme === lightMode
                                        ? commonStyles.lightSecondaryText.color
                                        : commonStyles.darkSecondaryText.color
                                }
                            />
                        </TouchableOpacity>

                        <OutsidePressHandler
                            onOutsidePress={() => {
                                setShowMoreAction(false);
                            }}
                            style={[styles.chatDetailNavbarBaseActionItemBox]}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setShowMoreAction(!showMoreAction);
                                }}
                            >
                                <Image
                                    source={require("../../../assets/more-line-icon.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 23,
                                        height: 23,
                                    }}
                                    tintColor={
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color
                                    }
                                />
                            </TouchableOpacity>
                            {showMoreAction && (
                                <View
                                    style={[
                                        styles.chatDetailNavbarBaseActionMoreItemPopup,
                                        theme === lightMode
                                            ? commonStyles.lightFourBackground
                                            : commonStyles.darkFourBackground,
                                        {
                                            shadowColor: "#0F223A",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.12,
                                            shadowRadius: 4,
                                            elevation: 4,
                                        },
                                    ]}
                                >
                                    {conversation.isGroup ? (
                                        <>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate(
                                                        "ManagingGroup",
                                                        {
                                                            conversation:
                                                                conversation,
                                                            socket: socket,
                                                            setConversation:
                                                                setConversation,
                                                            setMessageHistory:
                                                                setMessageHistory,
                                                        }
                                                    );
                                                }}
                                                style={[
                                                    styles.chatDetailNavbarBaseActionMoreItem,
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        theme === lightMode
                                                            ? commonStyles.lightTertiaryText
                                                            : commonStyles.darkTertiaryText,
                                                        styles.navbarActionMoreItemText,
                                                    ]}
                                                >
                                                    {t(
                                                        "chatDetaildMoreViewSettingGroup"
                                                    )}
                                                </Text>
                                                <Image
                                                    source={require("../../../assets/settings-4-line-icon.png")}
                                                    resizeMode="contain"
                                                    style={{
                                                        width: 17,
                                                        height: 17,
                                                    }}
                                                    tintColor={
                                                        theme === lightMode
                                                            ? commonStyles
                                                                  .lightSecondaryText
                                                                  .color
                                                            : commonStyles
                                                                  .darkSecondaryText
                                                                  .color
                                                    }
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    setShowModalLeaveGroup(true)
                                                }
                                                style={[
                                                    styles.chatDetailNavbarBaseActionMoreItem,
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        theme === lightMode
                                                            ? commonStyles.lightTertiaryText
                                                            : commonStyles.darkTertiaryText,
                                                        styles.navbarActionMoreItemText,
                                                    ]}
                                                >
                                                    {t("chatDetailLeaveGroup")}
                                                </Text>
                                                <Image
                                                    source={require("../../../assets/user_leave_group.png")}
                                                    resizeMode="contain"
                                                    style={{
                                                        width: 17,
                                                        height: 17,
                                                    }}
                                                    tintColor={
                                                        theme === lightMode
                                                            ? commonStyles
                                                                  .lightSecondaryText
                                                                  .color
                                                            : commonStyles
                                                                  .darkSecondaryText
                                                                  .color
                                                    }
                                                />
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate(
                                                    "ChatOptional",
                                                    {
                                                        conversation:
                                                            conversation,
                                                        userInfo: userInfo,
                                                    }
                                                );
                                            }}
                                            style={[
                                                styles.chatDetailNavbarBaseActionMoreItem,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    theme === lightMode
                                                        ? commonStyles.lightTertiaryText
                                                        : commonStyles.darkTertiaryText,
                                                    styles.navbarActionMoreItemText,
                                                ]}
                                            >
                                                {t(
                                                    "chatDetaildMoreViewProfileTitle"
                                                )}
                                            </Text>
                                            <Image
                                                source={require("../../../assets/user-chatlist-bottom-tab.png")}
                                                resizeMode="contain"
                                                style={{
                                                    width: 17,
                                                    height: 17,
                                                }}
                                                tintColor={
                                                    theme === lightMode
                                                        ? commonStyles
                                                              .lightSecondaryText
                                                              .color
                                                        : commonStyles
                                                              .darkSecondaryText
                                                              .color
                                                }
                                            />
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity
                                        style={[
                                            styles.chatDetailNavbarBaseActionMoreItem,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                theme === lightMode
                                                    ? commonStyles.lightTertiaryText
                                                    : commonStyles.darkTertiaryText,
                                                styles.navbarActionMoreItemText,
                                            ]}
                                        >
                                            {t("chatDetailMoreMuteTitle")}
                                        </Text>
                                        <Image
                                            source={require("../../../assets/volume-mute-line-icon.png")}
                                            resizeMode="contain"
                                            style={{
                                                width: 17,
                                                height: 17,
                                            }}
                                            tintColor={
                                                theme === lightMode
                                                    ? commonStyles
                                                          .lightSecondaryText
                                                          .color
                                                    : commonStyles
                                                          .darkSecondaryText
                                                          .color
                                            }
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.chatDetailNavbarBaseActionMoreItem,
                                        ]}
                                        onPress={deleteMyConversationAlert}
                                    >
                                        <Text
                                            style={[
                                                theme === lightMode
                                                    ? commonStyles.lightTertiaryText
                                                    : commonStyles.darkTertiaryText,
                                                styles.navbarActionMoreItemText,
                                            ]}
                                        >
                                            {t("chatDetailMoreDeleteTitle")}
                                        </Text>
                                        <Image
                                            source={require("../../../assets/delete-bin-line-icon.png")}
                                            resizeMode="contain"
                                            style={{
                                                width: 17,
                                                height: 17,
                                            }}
                                            tintColor={
                                                theme === lightMode
                                                    ? commonStyles
                                                          .lightSecondaryText
                                                          .color
                                                    : commonStyles
                                                          .darkSecondaryText
                                                          .color
                                            }
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </OutsidePressHandler>
                    </View>
                </View>
                {conversation.pinnedMessages &&
                    conversation.pinnedMessages.length > 0 && (
                        <View
                            style={[
                                styles.pinnedMessageContainer,
                                {
                                    backgroundColor:
                                        theme === lightMode
                                            ? commonStyles.lightFourBackground
                                                  .backgroundColor
                                            : commonStyles.darkFourBackground
                                                  .backgroundColor,
                                },
                            ]}
                        >
                            {showMore ? (
                                <View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: 10,
                                            paddingHorizontal: 15,
                                            paddingVertical: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                color: commonStyles.primaryColor
                                                    .color,
                                            }}
                                        >
                                            {t("chatDetailMessagePin")}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowMore(!showMore);
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    color: commonStyles
                                                        .primaryColor.color,
                                                }}
                                            >
                                                {t(
                                                    "chatDetailMessagePinShowless"
                                                )}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {conversation.pinnedMessages.map(
                                        (message, index) => {
                                            return (
                                                <View
                                                    key={index}
                                                    style={[
                                                        styles.pinnedMessagePreviewBox,
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
                                                    <Image
                                                        source={require("../../../assets/icon-message-pin.png")}
                                                        style={[
                                                            styles.pinnedMessageIcon,
                                                        ]}
                                                    />
                                                    <View
                                                        style={[
                                                            styles.pinnedContentMessageBox,
                                                        ]}
                                                    >
                                                        <Text numberOfLines={1}>
                                                            {handleGetMessageContent(
                                                                message
                                                            )}
                                                        </Text>
                                                        <Text numberOfLines={1}>
                                                            {`${t(
                                                                "chatDetailMessageTheMessageOf"
                                                            )} ${
                                                                message.sender
                                                                    .name
                                                            }`}
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={[
                                                            styles.pinnedMessageOtherActionBox,
                                                        ]}
                                                    >
                                                        <Tooltip
                                                            content={
                                                                <View
                                                                    style={{
                                                                        backgroundColor:
                                                                            theme ===
                                                                            lightMode
                                                                                ? commonStyles
                                                                                      .lightFourBackground
                                                                                      .backgroundColor
                                                                                : commonStyles
                                                                                      .darkFourBackground
                                                                                      .backgroundColor,
                                                                        width: 150,
                                                                    }}
                                                                >
                                                                    <TouchableOpacity
                                                                        style={[
                                                                            styles.itemInMessageFromOpponentPopupAction,
                                                                        ]}
                                                                        onPress={() => {
                                                                            saveToClipboard(
                                                                                message
                                                                            );
                                                                            setIsShowPinAction(
                                                                                index
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Text
                                                                            style={[
                                                                                styles.itemInMessageFromOpponentPopupActionText,
                                                                                {
                                                                                    color:
                                                                                        theme ===
                                                                                        lightMode
                                                                                            ? commonStyles
                                                                                                  .lightPrimaryText
                                                                                                  .color
                                                                                            : commonStyles
                                                                                                  .darkPrimaryText
                                                                                                  .color,
                                                                                },
                                                                            ]}
                                                                        >
                                                                            {t(
                                                                                "chatDetailMessageCopyAction"
                                                                            )}
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity
                                                                        style={[
                                                                            styles.itemInMessageFromOpponentPopupAction,
                                                                        ]}
                                                                        onPress={() =>
                                                                            handleUnpinMessage(
                                                                                message
                                                                            )
                                                                        }
                                                                    >
                                                                        <Text
                                                                            style={[
                                                                                styles.itemInMessageFromOpponentPopupActionText,
                                                                                {
                                                                                    color:
                                                                                        theme ===
                                                                                        lightMode
                                                                                            ? commonStyles
                                                                                                  .lightPrimaryText
                                                                                                  .color
                                                                                            : commonStyles
                                                                                                  .darkPrimaryText
                                                                                                  .color,
                                                                                },
                                                                            ]}
                                                                        >
                                                                            {t(
                                                                                "chatDetailMessageUnpinAction"
                                                                            )}
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            }
                                                            isVisible={
                                                                isShowPinAction ===
                                                                index
                                                            }
                                                            backgroundColor="transparent"
                                                            placement="bottom"
                                                            showChildInTooltip={
                                                                false
                                                            }
                                                            contentStyle={[
                                                                {
                                                                    shadowColor:
                                                                        "#171717",
                                                                    shadowOffset:
                                                                        {
                                                                            width: 0,
                                                                            height: 3,
                                                                        },
                                                                    shadowOpacity: 0.4,
                                                                    shadowRadius: 2,
                                                                    elevation: 3,
                                                                    zIndex: 10,
                                                                },
                                                                theme ===
                                                                lightMode
                                                                    ? commonStyles.lightFourBackground
                                                                    : commonStyles.darkFourBackground,
                                                            ]}
                                                            onClose={() => {
                                                                setIsShowPinAction(
                                                                    -1
                                                                );
                                                            }}
                                                            arrowSize={{
                                                                width: 0,
                                                                height: 0,
                                                            }}
                                                            arrowStyle={{
                                                                borderTopColor:
                                                                    theme ===
                                                                    lightMode
                                                                        ? commonStyles
                                                                              .lightFourBackground
                                                                              .backgroundColor
                                                                        : commonStyles
                                                                              .darkFourBackground
                                                                              .backgroundColor,
                                                            }}
                                                        >
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setIsShowPinAction(
                                                                        index
                                                                    );
                                                                }}
                                                            >
                                                                <Image
                                                                    source={require("../../../assets/more-line-icon.png")}
                                                                    style={[
                                                                        styles.pinnedMessageMoreActionImg,
                                                                    ]}
                                                                    tintColor={
                                                                        theme ===
                                                                        lightMode
                                                                            ? commonStyles
                                                                                  .lightSecondaryText
                                                                                  .color
                                                                            : commonStyles
                                                                                  .darkSecondaryText
                                                                                  .color
                                                                    }
                                                                />
                                                            </TouchableOpacity>
                                                        </Tooltip>
                                                    </View>
                                                </View>
                                            );
                                        }
                                    )}
                                </View>
                            ) : (
                                <View
                                    style={[
                                        styles.pinnedMessagePreviewBox,
                                        {
                                            borderBottomColor:
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
                                        source={require("../../../assets/icon-message-pin.png")}
                                        style={[styles.pinnedMessageIcon]}
                                    />
                                    <View
                                        style={[styles.pinnedContentMessageBox]}
                                    >
                                        <Text numberOfLines={1}>
                                            {handleGetMessageContent(
                                                conversation.pinnedMessages[0]
                                            )}
                                        </Text>
                                        <Text numberOfLines={1}>
                                            {`${t(
                                                "chatDetailMessageTheMessageOf"
                                            )} ${
                                                conversation.pinnedMessages[0]
                                                    .sender.name
                                            }`}
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            styles.pinnedMessageOtherActionBox,
                                        ]}
                                    >
                                        <Tooltip
                                            content={
                                                <View
                                                    style={{
                                                        backgroundColor:
                                                            theme === lightMode
                                                                ? commonStyles
                                                                      .lightFourBackground
                                                                      .backgroundColor
                                                                : commonStyles
                                                                      .darkFourBackground
                                                                      .backgroundColor,
                                                        width: 150,
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        style={[
                                                            styles.itemInMessageFromOpponentPopupAction,
                                                        ]}
                                                        onPress={() => {
                                                            saveToClipboard(
                                                                conversation
                                                                    .pinnedMessages[0]
                                                            );
                                                            setIsShowPinAction(
                                                                0
                                                            );
                                                        }}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.itemInMessageFromOpponentPopupActionText,
                                                                {
                                                                    color:
                                                                        theme ===
                                                                        lightMode
                                                                            ? commonStyles
                                                                                  .lightPrimaryText
                                                                                  .color
                                                                            : commonStyles
                                                                                  .darkPrimaryText
                                                                                  .color,
                                                                },
                                                            ]}
                                                        >
                                                            {t(
                                                                "chatDetailMessageCopyAction"
                                                            )}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={[
                                                            styles.itemInMessageFromOpponentPopupAction,
                                                        ]}
                                                        onPress={() =>
                                                            handleUnpinMessage(
                                                                conversation
                                                                    .pinnedMessages[0]
                                                            )
                                                        }
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.itemInMessageFromOpponentPopupActionText,
                                                                {
                                                                    color:
                                                                        theme ===
                                                                        lightMode
                                                                            ? commonStyles
                                                                                  .lightPrimaryText
                                                                                  .color
                                                                            : commonStyles
                                                                                  .darkPrimaryText
                                                                                  .color,
                                                                },
                                                            ]}
                                                        >
                                                            {t(
                                                                "chatDetailMessageUnpinAction"
                                                            )}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                            isVisible={isShowPinAction == 0}
                                            backgroundColor="transparent"
                                            placement="bottom"
                                            showChildInTooltip={false}
                                            contentStyle={[
                                                {
                                                    shadowColor: "#171717",
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 3,
                                                    },
                                                    shadowOpacity: 0.4,
                                                    shadowRadius: 2,
                                                    elevation: 3,
                                                    zIndex: 10,
                                                },
                                                theme === lightMode
                                                    ? commonStyles.lightFourBackground
                                                    : commonStyles.darkFourBackground,
                                            ]}
                                            onClose={() => {
                                                setIsShowPinAction(-1);
                                            }}
                                            arrowSize={{ width: 0, height: 0 }}
                                            arrowStyle={{
                                                borderTopColor:
                                                    theme === lightMode
                                                        ? commonStyles
                                                              .lightFourBackground
                                                              .backgroundColor
                                                        : commonStyles
                                                              .darkFourBackground
                                                              .backgroundColor,
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setIsShowPinAction(0);
                                                }}
                                            >
                                                <Image
                                                    source={require("../../../assets/more-line-icon.png")}
                                                    style={[
                                                        styles.pinnedMessageMoreActionImg,
                                                    ]}
                                                    tintColor={
                                                        theme === lightMode
                                                            ? commonStyles
                                                                  .lightSecondaryText
                                                                  .color
                                                            : commonStyles
                                                                  .darkSecondaryText
                                                                  .color
                                                    }
                                                />
                                            </TouchableOpacity>
                                        </Tooltip>
                                        {conversation.pinnedMessages.length >
                                            1 && (
                                            <TouchableOpacity
                                                style={[
                                                    styles.pinnedMessageSeeMorePinMessageBtn,
                                                ]}
                                                onPress={() => {
                                                    setShowMore(!showMore);
                                                }}
                                            >
                                                <Text
                                                    style={[
                                                        {
                                                            color: commonStyles
                                                                .primaryColor
                                                                .color,
                                                        },
                                                    ]}
                                                >
                                                    {`${
                                                        conversation
                                                            .pinnedMessages
                                                            .length - 1
                                                    } ${t(
                                                        "chatDetailMoreActionPin"
                                                    )}`}
                                                </Text>
                                                <Image
                                                    source={require("../../../assets/arrow-down-s-line-icon.png")}
                                                    style={{
                                                        width: 17,
                                                        height: 17,
                                                        tintColor:
                                                            commonStyles
                                                                .primaryColor
                                                                .color,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            )}
                        </View>
                    )}
            </View>

            {showModalLeaveGroup && (
                <BottomSheetLeaveGroup
                    conversation={conversation}
                    visible={showModalLeaveGroup}
                    setVisible={setShowModalLeaveGroup}
                    currentUser={userInfo}
                    navigation={navigation}
                    socket={socket}
                    setMessageHistory={setMessageHistory}
                />
            )}
        </>
    );
}

export default memo(ChatDetailHeader);
