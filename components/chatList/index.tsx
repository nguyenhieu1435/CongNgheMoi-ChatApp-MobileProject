import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity,
    Modal,
} from "react-native";
import { styles } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import { EvilIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useCallback, useEffect, useRef, useState } from "react";
import OutsidePressHandler from "react-native-outside-press";
import { Camera, requestCameraPermissionsAsync } from "expo-camera";
import SearchDetailPopup from "../searchDetailPopup";
import debounce from "debounce";
import {
    LINK_GET_MESSAGE_HISTORY,
    LINK_GET_MY_CONVERSATIONS,
    LINK_GET_MY_FRIENDS,
    LINK_OPEN_CONVERSATION,
} from "@env";
import {
    IConversation,
    IMessageItem,
    IReceivedRequestFriendList,
    ISenderInCallComing,
    IUserInConversation,
    IUserIsMyFriendsResult,
    IUserResultSearch,
} from "../../configs/interfaces";
import Spinner from "react-native-loading-spinner-overlay";
import { getAccurancyDateVN } from "../../utils/date";
import { useIsFocused } from "@react-navigation/native";
import CreateGroupAvatarWhenAvatarIsEmpty from "../../utils/createGroupAvatarWhenAvatarIsEmpty";
import { handleNavigateToChatDetail } from "../../utils/handleNavigateToChatDetail";
import {
    updateFriends,
    updateOnlineUserIds,
} from "../../redux_toolkit/slices/onlineUserIds.slice";
import { schedulePushNotification } from "../../App";

interface callInComingInterface {
    sender: ISenderInCallComing;
    users: IUserInConversation[];
    type: string;
    _id: string;
    conversationName: string;
}

type Props = {
    navigation: any;
    route: any;
};
const WIDTH = Dimensions.get("window").width;

export default function ChatList({ navigation, route }: Props) {
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { t } = useTranslation();
    const [textSearch, setTextSearch] = useState("");
    const [showHeaderMoreActionPopup, setShowHeaderMoreActionPopup] =
        useState(false);
    const [showModalScanQRCode, setShowModalScanQRCode] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState<
        null | boolean
    >(null);
    const [startCamera, setStartCamera] = useState(false);
    const [heightPopup, setHeightPopup] = useState(0);
    const refTextInputSearch = useRef<TextInput>(null);
    const [isOutsideTextInput, setIsOutsideTextInput] = useState(false);
    const userInfo = useSelector((state: IRootState) => state.userInfo);
    const [myConversations, setMyConversations] = useState<IConversation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const updateOnlineUserIdsState = useRef(false);
    const friendsOnline = useSelector(
        (state: IRootState) => state.onlineUserIds
    );
    const [friendList, setFriendList] = useState<IUserIsMyFriendsResult | null>(
        null
    );
    const socket = useSelector((state: IRootState) => state.socketIo.socket);
    const messageIdRef = useRef<string | null>(null);
    const prevUserInfoRef = useRef("");

    async function handleToggleModalScanQRCode() {
        if (showModalScanQRCode) {
            setShowModalScanQRCode(false);
        } else {
            setShowModalScanQRCode(true);
            if (!hasCameraPermission) {
                const { status } = await Camera.requestCameraPermissionsAsync();
                setHasCameraPermission(status === "granted");
                setStartCamera(status === "granted");
            }
        }
    }

    const setTextSearchDebounce = useCallback(debounce(setTextSearch, 500), []);
    const isInCall = useSelector(
        (state: IRootState) => state.isInCall.isInCall
    );

    async function getFriendList() {
        try {
            const resp = await fetch(LINK_GET_MY_FRIENDS, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.accessToken,
                },
            });
            console.log("status: ", resp.status);
            if (resp.ok) {
                const data = (await resp.json()) as IUserIsMyFriendsResult;

                setFriendList(data);
                dispatch(updateFriends(data.friends.map((item) => item._id)));
            }
        } catch (error) {
            console.log("error get my friends");
            dispatch(updateFriends([]));
        }
    }

    useEffect(() => {
        async function getMyConversations() {
            console.log("fetching my conversations");
            try {
                setIsLoading(true);
                const response = await fetch(LINK_GET_MY_CONVERSATIONS, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + userInfo.accessToken,
                    },
                });
                if (response.ok) {
                    let data = await response.json();

                    let conversations: IConversation[] = [];

                    Array.isArray(data) &&
                        data.forEach((item: IConversation) => {
                            conversations.push(item);
                        });
                    // conversations = conversations.filter((item) => item.lastMessage);
                    setMyConversations(conversations);
                } else {
                    console.log("error get my conversations");
                    setMyConversations([]);
                }
            } catch (error) {
                console.log("error get my conversations");
                setMyConversations([]);
            }
            setIsLoading(false);
        }
        if (
            isFocused &&
            route.name === "ChatList" &&
            updateOnlineUserIdsState.current === false
        ) {
            getMyConversations();
        }
    }, [route.name, isFocused, userInfo]);

    useEffect(() => {
        if (friendsOnline.friends.length === 0 || prevUserInfoRef.current !== userInfo?.user?._id) {
            prevUserInfoRef.current = userInfo?.user?._id || "";
            getFriendList();
        }

        function onOnline(usersOnline: string[]) {
            console.log("Users Online: ", usersOnline);
            dispatch(updateOnlineUserIds(usersOnline));
        }

        function onOffline(userId: string) {
            console.log("User Offline: ", userId);
            dispatch(
                updateOnlineUserIds(
                    friendsOnline.onlineUserIds.filter(
                        (item) => item !== userId
                    )
                )
            );
        }

        function sortConversationsByUpdatedTime(
            conversations: IConversation[]
        ) {
            return conversations.sort((a, b) => {
                return (
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime()
                );
            });
        }

        function onReceivedMessage(message: IMessageItem) {
            console.log("Received message: ", JSON.stringify(message));

            if (messageIdRef.current !== message._id) {
                let newConversations = myConversations.map((conversation) => {
                    let currentDate = new Date();
                    currentDate.setMinutes(currentDate.getMinutes());
                    if (conversation._id === message.conversation._id) {
                        return {
                            ...conversation,
                            lastMessage: message,
                            updatedAt: currentDate.toISOString(),
                            unreadMessageCount:
                                conversation.unreadMessageCount + 1,
                        };
                    } else {
                        return conversation;
                    }
                });
                newConversations =
                    sortConversationsByUpdatedTime(newConversations);
                setMyConversations(newConversations);

                if (message.conversation.isGroup) {
                    schedulePushNotification(
                        t("notificationTitle"),
                        `Có tin nhắn mới từ ${message.sender.name} trong nhóm ${message.conversation.name}`
                    );
                } else {
                    schedulePushNotification(
                        t("notificationTitle"),
                        `Có tin nhắn mới từ ${message.sender.name}`
                    );
                }
                messageIdRef.current = message._id;
            }
        }

        if (socket != null) {
            socket.on("usersOnline", onOnline);
            socket.on("userOffline", onOffline);
            socket.on("receivedMessage", onReceivedMessage);
            socket.on("sendFriendRequest", onSendFriendRequest);
            socket.on("call", onReceivedCall);
            socket.on("missedCall", onMissedCall);
        }
        return () => {
            if (socket != null) {
                socket.off("userOnline", onOnline);
                socket.off("userOffline", onOffline);
                socket.off("receivedMessage", onReceivedMessage);
                socket.off("sendFriendRequest", onSendFriendRequest);
                socket.off("call", onReceivedCall);
                socket.off("missedCall", onMissedCall);
            }
        };
    }, [route.name, isFocused, socket, isInCall, userInfo?.user?._id]);

    function onMissedCall({
        _id,
        conversationName,
    }: {
        _id: string;
        conversationName: string;
    }) {
        schedulePushNotification(
            t("notificationTitle"),
            `Cuộc gọi nhỡ từ ${conversationName}`
        );
    }

    function onReceivedCall({
        sender,
        users,
        type,
        _id,
        conversationName,
    }: callInComingInterface) {
        if (!isInCall) {
            navigation.navigate("CallIncoming", {
                sender,
                users,
                type,
                _id,
                conversationName,
            });
        }
    }

    function onSendFriendRequest(friendRequest: IReceivedRequestFriendList) {
        console.log("Received friend request: ", friendRequest);
        schedulePushNotification(
            t("notificationTitle"),
            `${friendRequest.sender_id.name} đã gửi yêu cầu kết bạn!`
        );
    }

    function getDateFormated(date: string) {
        const utcDate = new Date(date);
        const day = String(utcDate.getUTCDate()).padStart(2, "0");
        const month = String(utcDate.getUTCMonth() + 1).padStart(2, "0");
        const year = utcDate.getUTCFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }

    function handleMessageTimeAgo(date: string) {
        let accurancyDate = getAccurancyDateVN(date);
        let currentDate = getAccurancyDateVN(new Date().toISOString());
        let diffMinute = Math.floor(
            (new Date(currentDate).getTime() -
                new Date(accurancyDate).getTime()) /
                60000
        );
        if (diffMinute === -1) {
            return "0" + " " + t("minutes");
        }
        if (diffMinute < 60) {
            return diffMinute + " " + t("minutes");
        } else {
            let diffHour = Math.floor(diffMinute / 60);
            if (diffHour < 24) {
                return diffHour + " " + t("hours");
            } else {
                let diffDay = Math.floor(diffHour / 24);
                if (diffDay < 7) {
                    return diffDay + " " + t("day");
                } else {
                    // return dd/mm/yyyy
                    return getDateFormated(accurancyDate);
                }
            }
        }
    }
    function handleShowMessagePreview(message: IMessageItem) {
        if (message.files.some((file) => file.type.includes("image"))) {
            return (
                <View style={[styles.chatListHistoryPrevContentBox]}>
                    <Image
                        source={require("../../assets/image-fill-icon.png")}
                        resizeMode="contain"
                        style={{ width: 15, height: 15 }}
                        tintColor={
                            theme === lightMode
                                ? commonStyles.lightSecondaryText.color
                                : commonStyles.darkSecondaryText.color
                        }
                    />
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.chatListHistoryPrevContent,
                            theme === lightMode
                                ? commonStyles.lightSecondaryText
                                : commonStyles.darkSecondaryText,
                        ]}
                    >
                        {t("chatDetailImageTitle")}
                    </Text>
                </View>
            );
        } else if (
            message.files.some((file) => file.type.includes("application"))
        ) {
            return (
                <View style={[styles.chatListHistoryPrevContentBox]}>
                    <Image
                        source={require("../../assets/file-text-fill-icon.png")}
                        resizeMode="contain"
                        style={{ width: 15, height: 15, borderRadius: 50 }}
                        tintColor={
                            theme === lightMode
                                ? commonStyles.lightSecondaryText.color
                                : commonStyles.darkSecondaryText.color
                        }
                    />
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.chatListHistoryPrevContent,
                            theme === lightMode
                                ? commonStyles.lightSecondaryText
                                : commonStyles.darkSecondaryText,
                        ]}
                    >
                        {message.files[0].name}
                    </Text>
                </View>
            );
        } else if (message.sticker) {
            return (
                <View style={[styles.chatListHistoryPrevContentBox]}>
                    <Image
                        source={require("../../assets/image-fill-icon.png")}
                        resizeMode="contain"
                        style={{ width: 15, height: 15 }}
                        tintColor={
                            theme === lightMode
                                ? commonStyles.lightSecondaryText.color
                                : commonStyles.darkSecondaryText.color
                        }
                    />
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.chatListHistoryPrevContent,
                            theme === lightMode
                                ? commonStyles.lightSecondaryText
                                : commonStyles.darkSecondaryText,
                        ]}
                    >
                        {t("chatDetailStickerTitle")}
                    </Text>
                </View>
            );
        } else if (!!message.notification?.type) {
            return (
                <View style={[styles.chatListHistoryPrevContentBox]}>
                    <Image
                        source={require("../../assets/image-fill-icon.png")}
                        resizeMode="contain"
                        style={{ width: 15, height: 15 }}
                        tintColor={
                            theme === lightMode
                                ? commonStyles.lightSecondaryText.color
                                : commonStyles.darkSecondaryText.color
                        }
                    />
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.chatListHistoryPrevContent,
                            theme === lightMode
                                ? commonStyles.lightSecondaryText
                                : commonStyles.darkSecondaryText,
                        ]}
                    >
                        {t("chatDetailNotificationTitle")}
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={[styles.chatListHistoryPrevContentBox]}>
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.chatListHistoryPrevContent,
                            theme === lightMode
                                ? commonStyles.lightSecondaryText
                                : commonStyles.darkSecondaryText,
                        ]}
                    >
                        {message.messages.map((mess) => {
                            return mess.type === "text"
                                ? mess.content
                                : "@" + mess.content;
                        })}
                    </Text>
                </View>
            );
        }
    }

    function handleGetNameConversation(conversation: IConversation) {
        if (conversation.isGroup) {
            return conversation.name;
        } else {
            return conversation.users.find(
                (user) => user._id !== userInfo.user?._id
            )?.name;
        }
    }

    function getFriendOnlineStatus() {
        console.log("getFriendOnlineStatus-friendList", friendList);
        console.log("getFriendOnlineStatus-friendsOnline", friendsOnline);
        
        if (friendList == null || friendsOnline.friends.length === 0) {

            return [];
        }

        return friendList.friends.filter((item) =>
            friendsOnline.onlineUserIds.includes(item._id)
        );
    }

    async function handleOpenChatDetail(friend: IUserResultSearch) {
        try {
            setIsLoading(true);
            const conversationResponse = await fetch(
                LINK_GET_MY_CONVERSATIONS,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.accessToken}`,
                    },
                    body: JSON.stringify({
                        receiverUserId: friend._id,
                    }),
                }
            );
            if (conversationResponse.ok) {
                const conversationData = await conversationResponse.json();

                handleNavigateToChatDetail(
                    conversationData as IConversation,
                    setIsLoading,
                    userInfo,
                    navigation
                );
            }
        } catch (error) {
            console.log("error", error);
        }
        setIsLoading(false);
    }

    return (
        <View
            style={[
                styles.chatListWrapper,
                theme === lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
            ]}
        >
            <StatusBar />
            <Spinner
                visible={isLoading}
                textContent={t("loading")}
                textStyle={{ color: "#FFF" }}
            />
            <SafeAreaView style={[styles.chatListContainer]}>
                <View style={[styles.chatListHeader]}>
                    <View style={[styles.chatListHeaderMain]}>
                        <Text
                            style={[
                                styles.chatListTitleName,
                                theme === lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {t("chatListTitle")}
                        </Text>
                        <View style={[styles.chatListHeaderIconBox]}>
                            {/* <TouchableOpacity
                                onPress={handleToggleModalScanQRCode}
                            >
                                <Image
                                    source={require("../../assets/qr-code-line-icon.png")}
                                    style={[
                                        styles.chatListHeaderImgIcon,
                                        {
                                            tintColor:
                                                theme === lightMode
                                                    ? commonStyles
                                                          .lightIconColor.color
                                                    : commonStyles.darkIconColor
                                                          .color,
                                        },
                                    ]}
                                />
                            </TouchableOpacity> */}
                            <OutsidePressHandler
                                onOutsidePress={() =>
                                    setShowHeaderMoreActionPopup(false)
                                }
                                style={[
                                    styles.chatListHeaderPopUpRightContainer,
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={async () => {
                                        setShowHeaderMoreActionPopup(
                                            !showHeaderMoreActionPopup
                                        );
                                    }}
                                >
                                    <Image
                                        source={require("../../assets/add-fill-icon.png")}
                                        style={[
                                            styles.chatListHeaderImgIcon,
                                            {
                                                tintColor:
                                                    theme === lightMode
                                                        ? commonStyles
                                                              .lightIconColor
                                                              .color
                                                        : commonStyles
                                                              .darkIconColor
                                                              .color,
                                            },
                                        ]}
                                    />
                                </TouchableOpacity>
                                {showHeaderMoreActionPopup && (
                                    <View
                                        style={[
                                            styles.chatListHeaderPopUpRight,
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
                                        {/* <View
                                            style={[
                                                styles.chatListHeaderPopUpRightTriangle,
                                                {
                                                    borderBottomColor: theme === lightMode
                                                    ?
                                                    commonStyles.lightFourBackground.backgroundColor
                                                    :
                                                    commonStyles.darkFourBackground.backgroundColor,
                                                    shadowColor: '#0F223A',
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 2,
                                                    },
                                                    shadowOpacity: 0.12,
                                                    shadowRadius: 4,
                                                    elevation: 4, 
                                                }
                                                
                                            ]}
                                        >

                                        </View> */}
                                        <TouchableOpacity
                                            style={[
                                                styles.chatListHeaderPopUpRightBtn,
                                            ]}
                                            onPress={() =>
                                                navigation.navigate("AddFriend")
                                            }
                                        >
                                            <Image
                                                style={[
                                                    styles.chatListHeaderPopUpRightIcon,
                                                    {
                                                        tintColor:
                                                            theme === lightMode
                                                                ? commonStyles
                                                                      .lightPrimaryText
                                                                      .color
                                                                : commonStyles
                                                                      .darkPrimaryText
                                                                      .color,
                                                    },
                                                ]}
                                                source={require("../../assets/user-add-line.png")}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatListHeaderPopUpRightText,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                {t("chatListAddFriendTitle")}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.chatListHeaderPopUpRightBtn,
                                            ]}
                                            onPress={() =>
                                                navigation.navigate(
                                                    "CreateGroup"
                                                )
                                            }
                                        >
                                            <Image
                                                style={[
                                                    styles.chatListHeaderPopUpRightIcon,
                                                    {
                                                        tintColor:
                                                            theme === lightMode
                                                                ? commonStyles
                                                                      .lightPrimaryText
                                                                      .color
                                                                : commonStyles
                                                                      .darkPrimaryText
                                                                      .color,
                                                    },
                                                ]}
                                                source={require("../../assets/add-group-icon.png")}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatListHeaderPopUpRightText,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                {t("chatListCreateGroupTitle")}
                                            </Text>
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity
                                            style={[
                                                styles.chatListHeaderPopUpRightBtn,
                                            ]}
                                        >
                                            <Image
                                                style={[
                                                    styles.chatListHeaderPopUpRightIcon,
                                                    {
                                                        tintColor:
                                                            theme === lightMode
                                                                ? commonStyles
                                                                      .lightPrimaryText
                                                                      .color
                                                                : commonStyles
                                                                      .darkPrimaryText
                                                                      .color,
                                                    },
                                                ]}
                                                source={require("../../assets/cloud-line-icon.png")}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatListHeaderPopUpRightText,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                {t("chatListMyCloudTitle")}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.chatListHeaderPopUpRightBtn,
                                            ]}
                                        >
                                            <Image
                                                style={[
                                                    styles.chatListHeaderPopUpRightIcon,
                                                    {
                                                        tintColor:
                                                            theme === lightMode
                                                                ? commonStyles
                                                                      .lightPrimaryText
                                                                      .color
                                                                : commonStyles
                                                                      .darkPrimaryText
                                                                      .color,
                                                    },
                                                ]}
                                                source={require("../../assets/calendar-2-line-icon.png")}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatListHeaderPopUpRightText,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                {t("chatListMyCloudCalender")}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.chatListHeaderPopUpRightBtn,
                                            ]}
                                        >
                                            <Image
                                                style={[
                                                    styles.chatListHeaderPopUpRightIcon,
                                                    {
                                                        tintColor:
                                                            theme === lightMode
                                                                ? commonStyles
                                                                      .lightPrimaryText
                                                                      .color
                                                                : commonStyles
                                                                      .darkPrimaryText
                                                                      .color,
                                                    },
                                                ]}
                                                source={require("../../assets/vidicon-line-icon.png")}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatListHeaderPopUpRightText,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                {t("chatListCreateGroupCall")}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.chatListHeaderPopUpRightBtn,
                                            ]}
                                        >
                                            <Image
                                                style={[
                                                    styles.chatListHeaderPopUpRightIcon,
                                                    {
                                                        tintColor:
                                                            theme === lightMode
                                                                ? commonStyles
                                                                      .lightPrimaryText
                                                                      .color
                                                                : commonStyles
                                                                      .darkPrimaryText
                                                                      .color,
                                                    },
                                                ]}
                                                source={require("../../assets/computer-line-icon.png")}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatListHeaderPopUpRightText,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                {t("chatListLoginDevices")}
                                            </Text>
                                        </TouchableOpacity> */}
                                    </View>
                                )}
                            </OutsidePressHandler>
                        </View>
                    </View>
                    <OutsidePressHandler
                        onOutsidePress={() => setIsOutsideTextInput(true)}
                    >
                        <View
                            style={[
                                styles.chatListBoxSearch,
                                theme === lightMode
                                    ? commonStyles.lightSecondaryBackground
                                    : commonStyles.darkSecondaryBackground,
                            ]}
                            onTouchStart={() => setIsOutsideTextInput(false)}
                        >
                            <EvilIcons
                                name="search"
                                size={26}
                                color={
                                    theme === lightMode
                                        ? commonStyles.lightIconColor.color
                                        : commonStyles.darkIconColor.color
                                }
                                style={[styles.iconSearchMsgAndUser]}
                            />
                            <TextInput
                                ref={refTextInputSearch}
                                onPressIn={(evt) => {
                                    refTextInputSearch.current?.measure(
                                        (fx, fy, width, height, px, py) => {
                                            !heightPopup &&
                                                setHeightPopup(py + height / 2);
                                        }
                                    );
                                }}
                                placeholder={t("chatListSearchPlaceholder")}
                                style={[
                                    styles.textInputSearchMsgOrUser,
                                    theme === lightMode
                                        ? commonStyles.lightTertiaryText
                                        : commonStyles.darkTertiaryText,
                                ]}
                                placeholderTextColor={
                                    theme === lightMode
                                        ? commonStyles.lightIconColor.color
                                        : commonStyles.darkIconColor.color
                                }
                                onChangeText={(text) =>
                                    setTextSearchDebounce(text)
                                }
                            />
                        </View>
                    </OutsidePressHandler>

                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={[styles.friendsActiveListBox]}
                    >
                        {getFriendOnlineStatus().map((friendOnline, index) => {
                            console.log("getFriendOnlineStatus", friendOnline);
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() =>
                                        handleOpenChatDetail(friendOnline)
                                    }
                                    style={[styles.friendActiveItem]}
                                >
                                    <View
                                        style={[
                                            styles.friendActiveItemChild,
                                            {
                                                width:
                                                    (WIDTH - 40 - 16 * 3) / 4,
                                            },
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.friendActiveMainContentBox,
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    styles.friendActiveItemImageBox,
                                                ]}
                                            >
                                                <Image
                                                    source={{
                                                        uri: friendOnline.avatar,
                                                    }}
                                                    resizeMode="contain"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        borderRadius: 50,
                                                    }}
                                                />
                                                <View
                                                    style={[
                                                        styles.friendActiveItemIconOnline,
                                                        {
                                                            borderColor:
                                                                theme ==
                                                                lightMode
                                                                    ? commonStyles
                                                                          .lightPrimaryBackground
                                                                          .backgroundColor
                                                                    : commonStyles
                                                                          .darkPrimaryBackground
                                                                          .backgroundColor,
                                                        },
                                                    ]}
                                                ></View>
                                            </View>
                                            <Text
                                                numberOfLines={1}
                                                style={[
                                                    styles.activeOnlineUserName,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                {friendOnline.name}
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.friendActiveItemLayout,
                                                theme == lightMode
                                                    ? commonStyles.lightTertiaryBackground
                                                    : commonStyles.darkTertiaryBackground,
                                            ]}
                                        ></View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                        {/* <TouchableOpacity
                            onPress={() => {}}
                            style={[styles.friendActiveItem]}
                        >
                            <View
                                style={[
                                    styles.friendActiveItemChild,
                                    { width: (WIDTH - 40 - 16 * 3) / 4 },
                                ]}
                            >
                                <View
                                    style={[styles.friendActiveMainContentBox]}
                                >
                                    <View
                                        style={[
                                            styles.friendActiveItemImageBox,
                                        ]}
                                    >
                                        <Image
                                            source={{
                                                uri: "https://avatar.iran.liara.run/public/44",
                                            }}
                                            resizeMode="contain"
                                            style={{
                                                width: 36,
                                                height: 36,
                                                borderRadius: 50,
                                            }}
                                        />
                                        <View
                                            style={[
                                                styles.friendActiveItemIconOnline,
                                                {
                                                    borderColor:
                                                        theme == lightMode
                                                            ? commonStyles
                                                                  .lightPrimaryBackground
                                                                  .backgroundColor
                                                            : commonStyles
                                                                  .darkPrimaryBackground
                                                                  .backgroundColor,
                                                },
                                            ]}
                                        ></View>
                                    </View>
                                    <Text
                                        style={[
                                            styles.activeOnlineUserName,
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryText
                                                : commonStyles.darkPrimaryText,
                                        ]}
                                    >
                                        Mark
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.friendActiveItemLayout,
                                        theme == lightMode
                                            ? commonStyles.lightTertiaryBackground
                                            : commonStyles.darkTertiaryBackground,
                                    ]}
                                ></View>
                            </View>
                        </TouchableOpacity> */}
                    </ScrollView>
                </View>
                <View style={[styles.chatListHistoryBox]}>
                    <Text
                        style={[
                            styles.chatListHistoryTitle,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {t("chatListRecentTitle")}
                    </Text>
                    {/* <View
                        style={[
                            styles.chatListEmptyHistoryBox
                        ]}
                    >
                        <Image
                            source={require("../../assets/empty-chatlist.png")}
                            style={[styles.chatListEmptyHistoryImage,
                            {
                                tintColor: theme === lightMode
                                ?
                                commonStyles.lightIconColor.color
                                :
                                commonStyles.darkIconColor.color
                            
                            }]}
                        />
                        <Text
                            style={[styles.chatListEmptyHistoryTitle,
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText
                                :
                                commonStyles.darkPrimaryText
                            ]}
                        >{t("chatListNoMessageTitle")}</Text>
                        <Text
                            style={[styles.chatListEmptyHistoryDesc,
                                theme === lightMode
                                ?
                                commonStyles.lightSecondaryText
                                :
                                commonStyles.darkSecondaryText
                            ]}
                        >{t("chatListNoMessageDesc")}</Text>
                    </View> */}
                    <ScrollView
                        style={[styles.chatListHistoryScroll]}
                        showsVerticalScrollIndicator={false}
                    >
                        {myConversations.length > 0 &&
                            myConversations.map((conversation, index) => {
                                return conversation.lastMessage ? (
                                    <TouchableOpacity
                                        onPress={() =>
                                            handleNavigateToChatDetail(
                                                conversation,
                                                setIsLoading,
                                                userInfo,
                                                navigation
                                            )
                                        }
                                        style={[styles.chatListHistoryItem]}
                                    >
                                        <View
                                            style={[
                                                styles.friendActiveItemImageBox,
                                            ]}
                                        >
                                            <View>
                                                {!conversation.isGroup ? (
                                                    <Image
                                                        source={{
                                                            uri: conversation.users.find(
                                                                (item) =>
                                                                    item._id !==
                                                                    userInfo
                                                                        .user
                                                                        ?._id
                                                            )?.avatar,
                                                        }}
                                                        resizeMode="contain"
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            borderRadius: 50,
                                                        }}
                                                    />
                                                ) : (
                                                    <View>
                                                        {conversation.picture ? (
                                                            <Image
                                                                source={{
                                                                    uri: conversation.picture,
                                                                }}
                                                                resizeMode="contain"
                                                                style={{
                                                                    width: 36,
                                                                    height: 36,
                                                                    borderRadius: 50,
                                                                }}
                                                            />
                                                        ) : (
                                                            CreateGroupAvatarWhenAvatarIsEmpty(
                                                                conversation
                                                            )
                                                        )}
                                                    </View>
                                                )}
                                            </View>
                                            {conversation.users.some((user) =>
                                                friendsOnline.onlineUserIds.includes(
                                                    user._id
                                                )
                                            ) && (
                                                <View
                                                    style={[
                                                        styles.friendActiveItemIconOnline,
                                                        {
                                                            borderColor:
                                                                theme ==
                                                                lightMode
                                                                    ? commonStyles
                                                                          .lightPrimaryBackground
                                                                          .backgroundColor
                                                                    : commonStyles
                                                                          .darkPrimaryBackground
                                                                          .backgroundColor,
                                                            backgroundColor:
                                                                commonStyles
                                                                    .activeOnlineColor
                                                                    .color,
                                                        },
                                                    ]}
                                                ></View>
                                            )}
                                        </View>
                                        <View
                                            style={[
                                                styles.chatListHistoryMainCol,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.chatListHistoryUserName,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                                numberOfLines={1}
                                            >
                                                {handleGetNameConversation(
                                                    conversation
                                                )}
                                            </Text>
                                            <View
                                                style={[
                                                    styles.chatListHistoryPrevContentBox,
                                                ]}
                                            >
                                                {conversation.lastMessage &&
                                                    handleShowMessagePreview(
                                                        conversation.lastMessage
                                                    )}
                                            </View>
                                        </View>
                                        <View>
                                            {(conversation.pinBy?.length > 0 ||
                                                conversation.pinnedMessages
                                                    ?.length > 0) && (
                                                <Image
                                                    source={require("../../assets/pin-fill-icon.png")}
                                                    style={[
                                                        {
                                                            width: 15,
                                                            height: 15,
                                                            marginLeft: "auto",
                                                            tintColor:
                                                                theme ===
                                                                lightMode
                                                                    ? commonStyles
                                                                          .lightSecondaryText
                                                                          .color
                                                                    : commonStyles
                                                                          .darkSecondaryText
                                                                          .color,
                                                        },
                                                    ]}
                                                />
                                            )}
                                            <Text
                                                style={[
                                                    styles.chatListHistoryTime,
                                                    theme === lightMode
                                                        ? commonStyles.lightSecondaryText
                                                        : commonStyles.darkSecondaryText,
                                                ]}
                                            >
                                                {handleMessageTimeAgo(
                                                    conversation.updatedAt
                                                )}
                                            </Text>
                                            {conversation.unreadMessageCount >
                                                0 && (
                                                <Text
                                                    style={[
                                                        styles.chatListHistoryMsgNumber,
                                                    ]}
                                                >
                                                    {
                                                        conversation.unreadMessageCount
                                                    }
                                                </Text>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <></>
                                );
                            })}
                        {/* <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View style={[styles.friendActiveItemImageBox]}>
                                <Image
                                    source={{
                                        uri: "https://avatar.iran.liara.run/public/44",
                                    }}
                                    resizeMode="contain"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 50,
                                    }}
                                />
                                <View
                                    style={[
                                        styles.friendActiveItemIconOnline,
                                        {
                                            borderColor:
                                                theme == lightMode
                                                    ? commonStyles
                                                          .lightPrimaryBackground
                                                          .backgroundColor
                                                    : commonStyles
                                                          .darkPrimaryBackground
                                                          .backgroundColor,
                                            backgroundColor:
                                                commonStyles.activeOnlineColor
                                                    .color,
                                        },
                                    ]}
                                ></View>
                            </View>
                            <View style={[styles.chatListHistoryMainCol]}>
                                <Text
                                    style={[
                                        styles.chatListHistoryUserName,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    Patrick Hendricks
                                </Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                                ? commonStyles.lightSecondaryText
                                                : commonStyles.darkSecondaryText,
                                        ]}
                                    >
                                        Hey! there i'm available
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    05 min
                                </Text>
                                <Text style={[styles.chatListHistoryMsgNumber]}>
                                    02
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View style={[styles.friendActiveItemImageBox]}>
                                <Image
                                    source={{
                                        uri: "https://avatar.iran.liara.run/public/44",
                                    }}
                                    resizeMode="contain"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 50,
                                    }}
                                />
                                <View
                                    style={[
                                        styles.friendActiveItemIconOnline,
                                        {
                                            borderColor:
                                                theme == lightMode
                                                    ? commonStyles
                                                          .lightPrimaryBackground
                                                          .backgroundColor
                                                    : commonStyles
                                                          .darkPrimaryBackground
                                                          .backgroundColor,
                                            backgroundColor:
                                                commonStyles.busyOnlineColor
                                                    .color,
                                        },
                                    ]}
                                ></View>
                            </View>
                            <View style={[styles.chatListHistoryMainCol]}>
                                <Text
                                    style={[
                                        styles.chatListHistoryUserName,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    Patrick Hendricks
                                </Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox,
                                    ]}
                                >
                                    <Image
                                        source={require("../../assets/image-fill-icon.png")}
                                        resizeMode="contain"
                                        style={{ width: 15, height: 15 }}
                                        tintColor={
                                            theme === lightMode
                                                ? commonStyles
                                                      .lightSecondaryText.color
                                                : commonStyles.darkSecondaryText
                                                      .color
                                        }
                                    />
                                    <Text
                                        style={[
                                            styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                                ? commonStyles.lightSecondaryText
                                                : commonStyles.darkSecondaryText,
                                        ]}
                                    >
                                        Images
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    05 min
                                </Text>
                                <Text style={[styles.chatListHistoryMsgNumber]}>
                                    02
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View style={[styles.friendActiveItemImageBox]}>
                                <Image
                                    source={{
                                        uri: "https://avatar.iran.liara.run/public/44",
                                    }}
                                    resizeMode="contain"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 50,
                                    }}
                                />
                            </View>
                            <View style={[styles.chatListHistoryMainCol]}>
                                <Text
                                    style={[
                                        styles.chatListHistoryUserName,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    Patrick Hendricks
                                </Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.chatListHistoryPrevContent,
                                            commonStyles.primaryColor,
                                        ]}
                                    >
                                        Typing
                                    </Text>
                                    <TypingAnimation
                                        dotColor={
                                            commonStyles.primaryColor.color
                                        }
                                        dotAmplitude={2}
                                        style={{
                                            marginBottom: 15,
                                        }}
                                        dotStyles={{
                                            fontSize: 5,
                                        }}
                                        dotMargin={5}
                                        dotSpeed={0.15}
                                        dotRadius={2.5}
                                        dotX={12}
                                        dotY={6}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    05 min
                                </Text>
                                <Text style={[styles.chatListHistoryMsgNumber]}>
                                    02
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View style={[styles.friendActiveItemImageBox]}>
                                <Image
                                    source={{
                                        uri: "https://avatar.iran.liara.run/public/44",
                                    }}
                                    resizeMode="contain"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 50,
                                    }}
                                />
                                <View
                                    style={[
                                        styles.friendActiveItemIconOnline,
                                        {
                                            borderColor:
                                                theme == lightMode
                                                    ? commonStyles
                                                          .lightPrimaryBackground
                                                          .backgroundColor
                                                    : commonStyles
                                                          .darkPrimaryBackground
                                                          .backgroundColor,
                                            backgroundColor:
                                                commonStyles.activeOnlineColor
                                                    .color,
                                        },
                                    ]}
                                ></View>
                            </View>
                            <View style={[styles.chatListHistoryMainCol]}>
                                <Text
                                    style={[
                                        styles.chatListHistoryUserName,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    Patrick Hendricks
                                </Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox,
                                    ]}
                                >
                                    <Image
                                        source={require("../../assets/file-text-fill-icon.png")}
                                        resizeMode="contain"
                                        style={{
                                            width: 15,
                                            height: 15,
                                            borderRadius: 50,
                                        }}
                                        tintColor={
                                            theme === lightMode
                                                ? commonStyles
                                                      .lightSecondaryText.color
                                                : commonStyles.darkSecondaryText
                                                      .color
                                        }
                                    />
                                    <Text
                                        style={[
                                            styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                                ? commonStyles.lightSecondaryText
                                                : commonStyles.darkSecondaryText,
                                        ]}
                                    >
                                        Admin-A.zip
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    05 min
                                </Text>
                                <Text style={[styles.chatListHistoryMsgNumber]}>
                                    02
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View style={[styles.friendActiveItemImageBox]}>
                                <Image
                                    source={{
                                        uri: "https://avatar.iran.liara.run/public/44",
                                    }}
                                    resizeMode="contain"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 50,
                                    }}
                                />
                                <View
                                    style={[
                                        styles.friendActiveItemIconOnline,
                                        {
                                            borderColor:
                                                theme == lightMode
                                                    ? commonStyles
                                                          .lightPrimaryBackground
                                                          .backgroundColor
                                                    : commonStyles
                                                          .darkPrimaryBackground
                                                          .backgroundColor,
                                            backgroundColor:
                                                commonStyles.activeOnlineColor
                                                    .color,
                                        },
                                    ]}
                                ></View>
                            </View>
                            <View style={[styles.chatListHistoryMainCol]}>
                                <Text
                                    style={[
                                        styles.chatListHistoryUserName,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    Patrick Hendricks
                                </Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                                ? commonStyles.lightSecondaryText
                                                : commonStyles.darkSecondaryText,
                                        ]}
                                    >
                                        Hey! there i'm available
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    05 min
                                </Text>
                                <Text style={[styles.chatListHistoryMsgNumber]}>
                                    02
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View style={[styles.friendActiveItemImageBox]}>
                                <Image
                                    source={{
                                        uri: "https://avatar.iran.liara.run/public/44",
                                    }}
                                    resizeMode="contain"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 50,
                                    }}
                                />
                                <View
                                    style={[
                                        styles.friendActiveItemIconOnline,
                                        {
                                            borderColor:
                                                theme == lightMode
                                                    ? commonStyles
                                                          .lightPrimaryBackground
                                                          .backgroundColor
                                                    : commonStyles
                                                          .darkPrimaryBackground
                                                          .backgroundColor,
                                            backgroundColor:
                                                commonStyles.busyOnlineColor
                                                    .color,
                                        },
                                    ]}
                                ></View>
                            </View>
                            <View style={[styles.chatListHistoryMainCol]}>
                                <Text
                                    style={[
                                        styles.chatListHistoryUserName,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    Patrick Hendricks
                                </Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox,
                                    ]}
                                >
                                    <Image
                                        source={require("../../assets/image-fill-icon.png")}
                                        resizeMode="contain"
                                        style={{ width: 15, height: 15 }}
                                        tintColor={
                                            theme === lightMode
                                                ? commonStyles
                                                      .lightSecondaryText.color
                                                : commonStyles.darkSecondaryText
                                                      .color
                                        }
                                    />
                                    <Text
                                        style={[
                                            styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                                ? commonStyles.lightSecondaryText
                                                : commonStyles.darkSecondaryText,
                                        ]}
                                    >
                                        Images
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    05 min
                                </Text>
                                <Text style={[styles.chatListHistoryMsgNumber]}>
                                    02
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View style={[styles.friendActiveItemImageBox]}>
                                <Image
                                    source={{
                                        uri: "https://avatar.iran.liara.run/public/44",
                                    }}
                                    resizeMode="contain"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 50,
                                    }}
                                />
                            </View>
                            <View style={[styles.chatListHistoryMainCol]}>
                                <Text
                                    style={[
                                        styles.chatListHistoryUserName,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    Patrick Hendricks
                                </Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.chatListHistoryPrevContent,
                                            commonStyles.primaryColor,
                                        ]}
                                    >
                                        Typing
                                    </Text>
                                    <TypingAnimation
                                        dotColor={
                                            commonStyles.primaryColor.color
                                        }
                                        dotAmplitude={2}
                                        style={{
                                            marginBottom: 15,
                                        }}
                                        dotStyles={{
                                            fontSize: 5,
                                        }}
                                        dotMargin={5}
                                        dotSpeed={0.15}
                                        dotRadius={2.5}
                                        dotX={12}
                                        dotY={6}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    05 min
                                </Text>
                                <Text style={[styles.chatListHistoryMsgNumber]}>
                                    02
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View style={[styles.friendActiveItemImageBox]}>
                                <Image
                                    source={{
                                        uri: "https://avatar.iran.liara.run/public/44",
                                    }}
                                    resizeMode="contain"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 50,
                                    }}
                                />
                                <View
                                    style={[
                                        styles.friendActiveItemIconOnline,
                                        {
                                            borderColor:
                                                theme == lightMode
                                                    ? commonStyles
                                                          .lightPrimaryBackground
                                                          .backgroundColor
                                                    : commonStyles
                                                          .darkPrimaryBackground
                                                          .backgroundColor,
                                            backgroundColor:
                                                commonStyles.activeOnlineColor
                                                    .color,
                                        },
                                    ]}
                                ></View>
                            </View>
                            <View style={[styles.chatListHistoryMainCol]}>
                                <Text
                                    style={[
                                        styles.chatListHistoryUserName,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    Patrick Hendricks
                                </Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox,
                                    ]}
                                >
                                    <Image
                                        source={require("../../assets/file-text-fill-icon.png")}
                                        resizeMode="contain"
                                        style={{
                                            width: 15,
                                            height: 15,
                                            borderRadius: 50,
                                        }}
                                        tintColor={
                                            theme === lightMode
                                                ? commonStyles
                                                      .lightSecondaryText.color
                                                : commonStyles.darkSecondaryText
                                                      .color
                                        }
                                    />
                                    <Text
                                        style={[
                                            styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                                ? commonStyles.lightSecondaryText
                                                : commonStyles.darkSecondaryText,
                                        ]}
                                    >
                                        Admin-A.zip
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    05 min
                                </Text>
                                <Text style={[styles.chatListHistoryMsgNumber]}>
                                    02
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View style={[styles.friendActiveItemImageBox]}>
                                <Image
                                    source={{
                                        uri: "https://avatar.iran.liara.run/public/44",
                                    }}
                                    resizeMode="contain"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 50,
                                    }}
                                />
                                <View
                                    style={[
                                        styles.friendActiveItemIconOnline,
                                        {
                                            borderColor:
                                                theme == lightMode
                                                    ? commonStyles
                                                          .lightPrimaryBackground
                                                          .backgroundColor
                                                    : commonStyles
                                                          .darkPrimaryBackground
                                                          .backgroundColor,
                                            backgroundColor:
                                                commonStyles.activeOnlineColor
                                                    .color,
                                        },
                                    ]}
                                ></View>
                            </View>
                            <View style={[styles.chatListHistoryMainCol]}>
                                <Text
                                    style={[
                                        styles.chatListHistoryUserName,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    Patrick Hendricks
                                </Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                                ? commonStyles.lightSecondaryText
                                                : commonStyles.darkSecondaryText,
                                        ]}
                                    >
                                        Hey! there i'm available
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    05 min
                                </Text>
                                <Text style={[styles.chatListHistoryMsgNumber]}>
                                    02
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View style={[styles.friendActiveItemImageBox]}>
                                <Image
                                    source={{
                                        uri: "https://avatar.iran.liara.run/public/44",
                                    }}
                                    resizeMode="contain"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 50,
                                    }}
                                />
                                <View
                                    style={[
                                        styles.friendActiveItemIconOnline,
                                        {
                                            borderColor:
                                                theme == lightMode
                                                    ? commonStyles
                                                          .lightPrimaryBackground
                                                          .backgroundColor
                                                    : commonStyles
                                                          .darkPrimaryBackground
                                                          .backgroundColor,
                                            backgroundColor:
                                                commonStyles.busyOnlineColor
                                                    .color,
                                        },
                                    ]}
                                ></View>
                            </View>
                            <View style={[styles.chatListHistoryMainCol]}>
                                <Text
                                    style={[
                                        styles.chatListHistoryUserName,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    Patrick Hendricks
                                </Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox,
                                    ]}
                                >
                                    <Image
                                        source={require("../../assets/image-fill-icon.png")}
                                        resizeMode="contain"
                                        style={{ width: 15, height: 15 }}
                                        tintColor={
                                            theme === lightMode
                                                ? commonStyles
                                                      .lightSecondaryText.color
                                                : commonStyles.darkSecondaryText
                                                      .color
                                        }
                                    />
                                    <Text
                                        style={[
                                            styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                                ? commonStyles.lightSecondaryText
                                                : commonStyles.darkSecondaryText,
                                        ]}
                                    >
                                        Images
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    05 min
                                </Text>
                                <Text style={[styles.chatListHistoryMsgNumber]}>
                                    02
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View style={[styles.friendActiveItemImageBox]}>
                                <Image
                                    source={{
                                        uri: "https://avatar.iran.liara.run/public/44",
                                    }}
                                    resizeMode="contain"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 50,
                                    }}
                                />
                            </View>
                            <View style={[styles.chatListHistoryMainCol]}>
                                <Text
                                    style={[
                                        styles.chatListHistoryUserName,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    Patrick Hendricks
                                </Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.chatListHistoryPrevContent,
                                            commonStyles.primaryColor,
                                        ]}
                                    >
                                        Typing
                                    </Text>
                                    <TypingAnimation
                                        dotColor={
                                            commonStyles.primaryColor.color
                                        }
                                        dotAmplitude={2}
                                        style={{
                                            marginBottom: 15,
                                        }}
                                        dotStyles={{
                                            fontSize: 5,
                                        }}
                                        dotMargin={5}
                                        dotSpeed={0.15}
                                        dotRadius={2.5}
                                        dotX={12}
                                        dotY={6}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    05 min
                                </Text>
                                <Text style={[styles.chatListHistoryMsgNumber]}>
                                    02
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View style={[styles.friendActiveItemImageBox]}>
                                <Image
                                    source={{
                                        uri: "https://avatar.iran.liara.run/public/44",
                                    }}
                                    resizeMode="contain"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 50,
                                    }}
                                />
                                <View
                                    style={[
                                        styles.friendActiveItemIconOnline,
                                        {
                                            borderColor:
                                                theme == lightMode
                                                    ? commonStyles
                                                          .lightPrimaryBackground
                                                          .backgroundColor
                                                    : commonStyles
                                                          .darkPrimaryBackground
                                                          .backgroundColor,
                                            backgroundColor:
                                                commonStyles.activeOnlineColor
                                                    .color,
                                        },
                                    ]}
                                ></View>
                            </View>
                            <View style={[styles.chatListHistoryMainCol]}>
                                <Text
                                    style={[
                                        styles.chatListHistoryUserName,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    Patrick Hendricks
                                </Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox,
                                    ]}
                                >
                                    <Image
                                        source={require("../../assets/file-text-fill-icon.png")}
                                        resizeMode="contain"
                                        style={{
                                            width: 15,
                                            height: 15,
                                            borderRadius: 50,
                                        }}
                                        tintColor={
                                            theme === lightMode
                                                ? commonStyles
                                                      .lightSecondaryText.color
                                                : commonStyles.darkSecondaryText
                                                      .color
                                        }
                                    />
                                    <Text
                                        style={[
                                            styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                                ? commonStyles.lightSecondaryText
                                                : commonStyles.darkSecondaryText,
                                        ]}
                                    >
                                        Admin-A.zip
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    05 min
                                </Text>
                                <Text style={[styles.chatListHistoryMsgNumber]}>
                                    02
                                </Text>
                            </View>
                        </TouchableOpacity> */}
                    </ScrollView>
                </View>
            </SafeAreaView>
            <Modal visible={showModalScanQRCode}>
                {startCamera && <Camera style={{ flex: 1 }}></Camera>}
            </Modal>
            <SearchDetailPopup
                textSearch={textSearch}
                setTextSearch={setTextSearch}
                isPressOutsideTextInput={isOutsideTextInput}
                heightFromHeaderToInput={heightPopup}
                setHeightFromHeaderToInput={setHeightPopup}
            />
        </View>
    );
}
