import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import { useTranslation } from "react-i18next";
import { TFunction, use } from "i18next";
import { useEffect, useState } from "react";
import OutsidePressHandler from "react-native-outside-press";
import {
    LINK_GET_MY_CONVERSATIONS,
    LINK_GET_MY_FRIENDS,
    LINK_REQUEST_ADD_FRIEND,
    LINK_REQUEST_FRIEND_LIST,
    LINK_REVOCATION_REQUEST_FRIEND,
    LINK_SEARCH_USER,
} from "@env";
import Spinner from "react-native-loading-spinner-overlay";
import {
    IConversation,
    IRequestFriendList,
    IUserIsMyFriendsResult,
    IUserResultSearch,
} from "../../configs/interfaces";
import {
    createUserSearchedTable,
    getDBConnection,
    insertUserSearched,
    selectTop5NewestUserSearched,
} from "../../utils/sqlite";
import { handleNavigateToChatDetail } from "../../utils/handleNavigateToChatDetail";

interface SearchDetailPopupProps {
    textSearch: string;
    setTextSearch: (search: string) => void;
    heightFromHeaderToInput: number;
    isPressOutsideTextInput: boolean;
    setHeightFromHeaderToInput: (height: number) => void;
    navigation: any;
}

export default function SearchDetailPopup({
    textSearch,
    setTextSearch,
    heightFromHeaderToInput,
    isPressOutsideTextInput,
    navigation,
}: SearchDetailPopupProps) {
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { t } = useTranslation();
    const { navigate, goBack } = useNavigation();
    const [isPressOutsidePopup, setIsPressOutsidePopup] = useState(false);

    return (!isPressOutsideTextInput || !isPressOutsidePopup) &&
        heightFromHeaderToInput ? (
        <OutsidePressHandler
            onOutsidePress={() => {
                setIsPressOutsidePopup(true);
            }}
            style={[
                styles.detailSearchPopUpWrapper,
                theme === lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
                {
                    marginTop: heightFromHeaderToInput + 10 + 15,
                },
            ]}
        >
            <View
                onTouchStart={() => setIsPressOutsidePopup(false)}
                style={{
                    flex: 1,
                }}
            >
                {textSearch.trim() ? (
                    <DetailSearchPopUpSearchNotEmpty
                        translation={t}
                        theme={theme}
                        navigate={navigate}
                        textSearch={textSearch}
                        navigation={navigation}
                        setTextSearch={setTextSearch}
                    />
                ) : (
                    <DetailSearchPopUpSearchEmpty
                        translation={t}
                        theme={theme}
                        navigate={navigate}
                    />
                )}
            </View>
        </OutsidePressHandler>
    ) : (
        <View></View>
    );
}

interface DetailSearchPopUpSearchEmptyProps {
    translation: TFunction<"translation", undefined>;
    theme: string;
    navigate: any;
}

function DetailSearchPopUpSearchEmpty({
    translation: t,
    theme,
    navigate,
}: DetailSearchPopUpSearchEmptyProps) {
    const [userSeached, setUserSearched] = useState<IUserResultSearch[]>([]);
    const userInfo = useSelector((state: IRootState) => state.userInfo);

    useEffect(() => {
        const getUserSearchedFromSQLite = async () => {
            try {
                const db = getDBConnection();
                const table = await createUserSearchedTable(db);
                const result = await selectTop5NewestUserSearched(
                    db,
                    userInfo.user?._id || "0"
                );
                const obj = result[0];
                if ("rows" in obj) {
                    const userSearched: IUserResultSearch[] = [];
                    obj.rows.forEach((element: any) => {
                        userSearched.push({
                            _id: element.userId,
                            name: element.name,
                            avatar: element.avatar,
                        });
                    });
                    setUserSearched(userSearched);
                } else {
                    setUserSearched([]);
                }
            } catch (error) {
                console.log(error);
                setUserSearched([]);
            }
        };
        getUserSearchedFromSQLite();
    }, []);

    return (
        <View
            style={[
                styles.detailSearchPopUpSearchEmptyWrapper,
                {
                    borderWidth: 1,
                },
            ]}
        >
            <ScrollView>
                <View
                    style={[
                        styles.detailSearchPopUpSearchEmptyContainer,
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
                    <Text
                        style={[
                            styles.detailSearchPopupSearchEmptyTitle,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {t("searchDetailPopupContactFound")}
                    </Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={
                            styles.detailSearchPopUpSearchEmptyUserList
                        }
                    >
                        {userSeached.length > 0 &&
                            userSeached.map((user, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() =>
                                            console.log("Open Chat Detail")
                                        }
                                        style={[
                                            styles.detailSearchPopUpSearchEmptyUserSearched,
                                        ]}
                                    >
                                        <Image
                                            source={{
                                                uri: user.avatar,
                                            }}
                                            style={[
                                                styles.detailSearchPopUpSearchEmptyUserSearchedAvatar,
                                            ]}
                                        />
                                        <Text
                                            numberOfLines={2}
                                            style={[
                                                styles.detailSearchPopUpSearchEmptyUserSearchedName,
                                                theme === lightMode
                                                    ? commonStyles.lightPrimaryText
                                                    : commonStyles.darkPrimaryText,
                                            ]}
                                        >
                                            {user.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        {/* <TouchableOpacity
                            onPress={() => console.log("Open Chat Detail")}
                            style={[
                                styles.detailSearchPopUpSearchEmptyUserSearched,
                            ]}
                        >
                            <Image
                                source={{
                                    uri: "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/9/4/a940fe649d1d5bb4355b3dc5ccdee540bb7d2929.png",
                                }}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyUserSearchedAvatar,
                                ]}
                            />
                            <Text
                                numberOfLines={2}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyUserSearchedName,
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText,
                                ]}
                            >
                                Đăng Dương
                            </Text>
                        </TouchableOpacity> */}
                    </ScrollView>
                </View>
                {/* <View
                    style={[
                        styles.detailSearchPopUpSearchEmptyContainer,
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
                    <Text
                        style={[
                            styles.detailSearchPopupSearchEmptyTitle,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {t("searchDetailKeywordSearched")}
                    </Text>
                    <View
                        style={[
                            styles.detailSearchPopUpSearchEmptyKeywordSearchedList,
                        ]}
                    >
                        <TouchableOpacity
                            style={[
                                styles.detailSearchPopUpSearchEmptyKeywordSearchedItem,
                            ]}
                        >
                            <Image
                                source={require("../../assets/search-line-icon.png")}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyKeywordSearchedItemImage,
                                    {
                                        tintColor:
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryText
                                                      .color
                                                : commonStyles.darkPrimaryText
                                                      .color,
                                    },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.detailSearchPopUpSearchEmptyKeywordSearchedItemText,
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText,
                                ]}
                            >
                                Cloud
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.detailSearchPopUpSearchEmptyKeywordSearchedItem,
                            ]}
                        >
                            <Image
                                source={require("../../assets/search-line-icon.png")}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyKeywordSearchedItemImage,
                                    {
                                        tintColor:
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryText
                                                      .color
                                                : commonStyles.darkPrimaryText
                                                      .color,
                                    },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.detailSearchPopUpSearchEmptyKeywordSearchedItemText,
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText,
                                ]}
                            >
                                Cloud
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View> */}

                {/* <TouchableOpacity
                    style={[
                        styles.detailSearchPopUpSearchEmptyBtnEditSearchHistory,
                    ]}
                    onPress={() => navigate("SearchHistoryModification")}
                >
                    <Text
                        style={[
                            styles.detailSearchPopUpSearchEmptyBtnEditSearchHistoryText,
                            commonStyles.primaryColor,
                        ]}
                    >
                        {t("searchDetailEditSearchHistory")}
                    </Text>
                    <Image
                        source={require("../../assets/arrow-right-s-line.png")}
                        style={[
                            styles.detailSearchPopUpSearchEmptyBtnEditSearchHistoryIcon,
                            {
                                tintColor: commonStyles.primaryColor.color,
                            },
                        ]}
                    />
                </TouchableOpacity> */}
            </ScrollView>
        </View>
    );
}

interface DetailSearchPopUpSearchNotEmptyProps {
    translation: TFunction<"translation", undefined>;
    theme: string;
    navigate: any;
    textSearch: string;
    navigation: any;
    setTextSearch: (search: string) => void;
}

function DetailSearchPopUpSearchNotEmpty({
    translation: t,
    theme,
    navigate,
    textSearch,
    navigation,
    setTextSearch
}: DetailSearchPopUpSearchNotEmptyProps) {
    const [usersResult, setUsersResult] = useState<IUserResultSearch[]>([]);
    const [myFriends, setMyFriends] = useState<IUserIsMyFriendsResult | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [requestFriendList, setRequestFriendList] = useState<
        IRequestFriendList[]
    >([]);
    const userInfo = useSelector((state: IRootState) => state.userInfo);
    const friendOnline = useSelector(
        (state: IRootState) => state.onlineUserIds
    );
    const socket = useSelector((state: IRootState) => state.socketIo.socket);

    async function getUserInRequestFriendList() {
        try {
            const response = await fetch(LINK_REQUEST_FRIEND_LIST, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.accessToken,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log("getUserInRequestFriendList-----------: ", data);
                const arrayData: IRequestFriendList[] = [];
                Array.isArray(data) &&
                    data.forEach((element: any) => {
                        arrayData.push({
                            _id: element._id,
                            sender_id: element.sender_id,
                            blockView: element.blockView,
                            createdAt: element.createdAt,
                            updatedAt: element.updatedAt,
                            receiver_id: element.receiver_id,
                            message: element.message,
                        });
                    });

                return arrayData;
            } else {
                return [];
            }
        } catch (error) {
            throw error;
        }
    }
    async function getUserByTextSearch(textSearch: string) {
        try {
            const response = await fetch(LINK_SEARCH_USER + "=" + textSearch, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.accessToken,
                },
            });
            if (response.status === 200) {
                const data: IUserResultSearch = await response.json();
                console.log("getUserByTextSearch", data);

                let arrayData: IUserResultSearch[] = [];
                Array.isArray(data) &&
                    data.forEach((element: any) => {
                        arrayData.push({
                            _id: element._id,
                            name: element.name,
                            avatar: element.avatar,
                        });
                    });
                return arrayData;
            } else {
                return [];
            }
        } catch (error) {
            throw error;
        }
    }
    async function getUsersIsMyFriends() {
        try {
            const response = await fetch(LINK_GET_MY_FRIENDS, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.accessToken,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log("getUsersIsMyFriends", data);
                if (data === null) {
                    return null;
                }
                const arrayData: IUserIsMyFriendsResult = {
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    friends: data.friends,
                    _id: data._id,
                };

                return arrayData;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        const promiseAllFetchData = async () => {
            try {
                const [usersResult, myFriends, requestFriendList] =
                    await Promise.all([
                        getUserByTextSearch(textSearch),
                        getUsersIsMyFriends(),
                        getUserInRequestFriendList(),
                    ]);

                setUsersResult(usersResult);
                setMyFriends(myFriends);
                setRequestFriendList(requestFriendList);
            } catch (error) {
                console.log(error);
            }
        };
        promiseAllFetchData();
    }, [textSearch]);

    function handleCheckUserIsFriend(userId: string) {
        const result =
            myFriends?.friends.some((friend) => friend._id === userId) || false;
        return result;
    }
    function checkIsRequestedFriend(userId: string) {
        const result = requestFriendList.some(
            (request) => request.receiver_id?._id === userId
        );
        return result;
    }
    async function handleAddFriend(userId: string) {
        try {
            setIsLoading(true);
            const response = await fetch(LINK_REQUEST_ADD_FRIEND, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.accessToken,
                },
                body: JSON.stringify({
                    friendId: userId,
                    message: "Hello, I want to be your friend",
                    blockView: false,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                socket.emit("sendFriendRequest", {
                    _id: data._id,
                    receiver_id: userId,
                    blockView: false,
                    message: "Hello, I want to be your friend",
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    sender_id: {
                        _id: userInfo.user?._id,
                        name: userInfo.user?.name,
                        avatar: userInfo.user?.avatar,
                        background: userInfo.user?.background,
                        dateOfBirth: userInfo.user?.dateOfBirth,
                        gender: userInfo.user?.gender,
                    },
                });

                const requestFriendList = await getUserInRequestFriendList();
                setRequestFriendList(requestFriendList);
            } else {
                Alert.alert("Error", "Add friend failed", [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ]);
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }
    async function handleUndoAddFriend(userId: string) {
        try {
            setIsLoading(true);
            const response = await fetch(LINK_REVOCATION_REQUEST_FRIEND, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.accessToken,
                },
                body: JSON.stringify({
                    friendId: userId,
                }),
            });
            if (response.ok) {
                socket.emit("addFriend", userId);
                const requestFriendList = await getUserInRequestFriendList();
                setRequestFriendList(requestFriendList);
            } else {
                Alert.alert("Error", "Undo add friend failed", [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ]);
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }
    async function handleInsertUserSearchedToSQLite(user: IUserResultSearch) {
        try {
            const db = getDBConnection();
            await createUserSearchedTable(db);
            const resultInsert = await insertUserSearched(
                db,
                user._id,
                user.name,
                user.avatar,
                userInfo.user?._id || "0"
            );
            console.log("RESULT INSERT: ", resultInsert);
            return resultInsert;
        } catch (error) {
            throw error;
        }
    }
    async function handleOpenChatDetail(receivedId: string) {
        setTextSearch("");
        
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
                        receiverUserId: receivedId,
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
    async function handleCallFriend(receiverId: string, type: string) {
        setTextSearch("");
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
                        receiverUserId: receiverId,
                    }),
                }
            );
            if (conversationResponse.ok) {
                const conversationData =
                    (await conversationResponse.json()) as IConversation;
                setIsLoading(false);
                if (type == "video") {
                    socket.emit("call", {
                        sender: userInfo.user,
                        users: conversationData.users,
                        type: "video",
                        _id: conversationData._id,
                        conversationName: conversationData.name,
                    });
                    navigation.navigate("VideoCall", {
                        conversationId: conversationData._id,
                        isGroup: conversationData.isGroup,
                        conversationName: conversationData.name,
                        users: conversationData.users,
                        callInComing: false,
                    });
                } else {
                    socket.emit("call", {
                        sender: userInfo.user,
                        users: conversationData.users,
                        type: "audio",
                        _id: conversationData._id,
                        conversationName: conversationData.name,
                    });
                    navigation.navigate("AudioCall", {
                        conversationId: conversationData._id,
                        isGroup: conversationData.isGroup,
                        conversationName: conversationData.name,
                        users: conversationData.users,
                        callInComing: false,
                    });
                }
            }
        } catch (error) {
            console.log("error", error);
        }
        setIsLoading(false);
    }

    // useEffect(()=>{

    // }, [])

    return (
        <View style={[styles.detailSearchPopUpSearchNotEmptyWrapper]}>
            <Spinner
                visible={isLoading}
                textContent={t("loading")}
                textStyle={{ color: "#FFF" }}
            />
            <ScrollView
                style={[styles.detailSearchPopUpSearchNotEmptyScrollWrapper]}
            >
                {usersResult && usersResult.length > 0 ? (
                    <View>
                        <View
                            style={[
                                styles.detailSearchPopupSearchEmptyAllWrapper,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.detailSearchPopupSearchEmptyAllTitle,
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText,
                                ]}
                            >
                                {t("searchDetailContactTitle") + " "}
                                <Text
                                    style={[
                                        styles.detailSearchPopupSearchEmptyAllMatchedNumber,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    {`(${usersResult.length})`}
                                </Text>
                            </Text>
                            <View
                                style={[
                                    styles.detailSearchPopUpSearchNotEmptyAllContactList,
                                ]}
                            >
                                {usersResult.map(
                                    (user: IUserResultSearch, index) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    handleInsertUserSearchedToSQLite(
                                                        user
                                                    );
                                                    handleOpenChatDetail(
                                                        user._id
                                                    );
                                                }}
                                                key={index}
                                                style={[
                                                    styles.detailSearchPopUpSearchNotEmptyAllContactItem,
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
                                                    source={{
                                                        uri: user.avatar,
                                                    }}
                                                    style={[
                                                        styles.detailSearchPopUpSearchNotEmptyAllContactItemAvatar,
                                                    ]}
                                                />
                                                <View
                                                    style={[
                                                        styles.detailSearchPopUpSearchNotEmptyAllContactItemContent,
                                                    ]}
                                                >
                                                    <View
                                                        style={[
                                                            styles.searchNotEmptyAllContactItemContentNameWrapper,
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.searchNotEmptyAllContactItemContentNameNormal,
                                                                theme ===
                                                                lightMode
                                                                    ? commonStyles.lightPrimaryText
                                                                    : commonStyles.darkPrimaryText,
                                                            ]}
                                                        >
                                                            {user.name}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    {handleCheckUserIsFriend(
                                                        user._id
                                                    ) ? (
                                                        <View
                                                            style={{
                                                                flexDirection:
                                                                    "row",
                                                                alignItems:
                                                                    "center",
                                                                gap: 10
                                                            }}
                                                        >
                                                            <TouchableOpacity
                                                                onPress={() =>
                                                                    handleCallFriend(
                                                                        user._id,
                                                                        "audio"
                                                                    )
                                                                }
                                                                style={[
                                                                    styles.detailSearchPopUpSearchNotEmptyContactItemCallBtn,
                                                                ]}
                                                            >
                                                                <Image
                                                                    source={require("../../assets/phone-fill-icon.png")}
                                                                    style={[
                                                                        styles.detailSearchPopUpSearchNotEmptyContactItemCallBtnIcon,
                                                                    ]}
                                                                />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() =>
                                                                    handleCallFriend(
                                                                        user._id,
                                                                        "video"
                                                                    )
                                                                }
                                                                style={[
                                                                    styles.detailSearchPopUpSearchNotEmptyContactItemCallBtn,
                                                                ]}
                                                            >
                                                                <Image
                                                                    source={require("../../assets/vidicon-line-icon.png")}
                                                                    style={[
                                                                        styles.detailSearchPopUpSearchNotEmptyContactItemCallBtnIcon,
                                                                    ]}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                    ) : checkIsRequestedFriend(
                                                          user._id
                                                      ) ? (
                                                        <TouchableOpacity
                                                            onPress={() =>
                                                                handleUndoAddFriend(
                                                                    user._id
                                                                )
                                                            }
                                                            style={[
                                                                styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendBtn,
                                                            ]}
                                                        >
                                                            <Text
                                                                style={[
                                                                    styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendText,
                                                                ]}
                                                            >
                                                                {t(
                                                                    "searchDetailAddFriendTextUndo"
                                                                )}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ) : (
                                                        <TouchableOpacity
                                                            onPress={() =>
                                                                handleAddFriend(
                                                                    user._id
                                                                )
                                                            }
                                                            style={[
                                                                styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendBtn,
                                                            ]}
                                                        >
                                                            <Text
                                                                style={[
                                                                    styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendText,
                                                                ]}
                                                            >
                                                                {t(
                                                                    "searchDetailAddFriendText"
                                                                )}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    }
                                )}
                                {/* <TouchableOpacity
                                    style={[
                                        styles.detailSearchPopUpSearchNotEmptyAllContactItem,
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
                                        source={{
                                            uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg",
                                        }}
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemAvatar,
                                        ]}
                                    />
                                    <View
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemContent,
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentNameWrapper,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                Dương
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameMatched,
                                                ]}
                                            >
                                                Vũ
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                Đăng
                                            </Text>
                                        </View>
                                        <Text
                                            numberOfLines={1}
                                            lineBreakMode="tail"
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentLocation,
                                                ,
                                                theme === lightMode
                                                    ? commonStyles.lightSecondaryText
                                                    : commonStyles.darkSecondaryText,
                                            ]}
                                        >
                                            Chung nhóm: Nhập môn dữ liệu lớn
                                        </Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyContactItemCallBtn
                                            ]}
                                        >   
                                            <Image
                                                source={require("../../assets/phone-fill-icon.png")}
                                                style={[
                                                    styles.detailSearchPopUpSearchNotEmptyContactItemCallBtnIcon,
                                                ]}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendBtn,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendText,
                                                ]}
                                            >
                                                {t("searchDetailAddFriendText")}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity> */}
                                {/* <TouchableOpacity
                                    style={[
                                        styles.detailSearchPopUpSearchNotEmptyAllContactItem,
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
                                        source={{
                                            uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg",
                                        }}
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemAvatar,
                                        ]}
                                    />
                                    <View
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemContent,
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentNameWrapper,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                Dương
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameMatched,
                                                ]}
                                            >
                                                Vũ
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                Đăng
                                            </Text>
                                        </View>
                                        <Text
                                            numberOfLines={1}
                                            lineBreakMode="tail"
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentLocation,
                                                ,
                                                theme === lightMode
                                                    ? commonStyles.lightSecondaryText
                                                    : commonStyles.darkSecondaryText,
                                            ]}
                                        >
                                            Chung nhóm: Nhập môn dữ liệu lớn
                                        </Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyContactItemCallBtn,
                                            ]}
                                        >
                                            <Image
                                                source={require("../../assets/phone-fill-icon.png")}
                                                style={[
                                                    styles.detailSearchPopUpSearchNotEmptyContactItemCallBtnIcon,
                                                ]}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendBtn
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendText
                                                ]}
                                            >{t("searchDetailAddFriendText")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity> */}
                                {/* <TouchableOpacity
                                    style={[
                                        styles.detailSearchPopUpSearchNotEmptyAllContactItem,
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
                                        source={{
                                            uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg",
                                        }}
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemAvatar,
                                        ]}
                                    />
                                    <View
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemContent,
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentNameWrapper,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                Dương
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameMatched,
                                                ]}
                                            >
                                                Cộng
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyContactItemCallBtn,
                                            ]}
                                        >
                                            <Image
                                                source={require("../../assets/phone-fill-icon.png")}
                                                style={[
                                                    styles.detailSearchPopUpSearchNotEmptyContactItemCallBtnIcon,
                                                ]}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendBtn
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendText
                                                ]}
                                            >{t("searchDetailAddFriendText")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity> */}
                                {/* <TouchableOpacity
                                    style={[
                                        styles.detailSearchPopUpSearchNotEmptyAllContactItem,
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
                                        source={{
                                            uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg",
                                        }}
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemAvatar,
                                        ]}
                                    />
                                    <View
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemContent,
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentNameWrapper,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                Nhóm - CNM
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentInGroupWrapper,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentInGroupNormal,
                                                    theme === lightMode
                                                        ? commonStyles.lightSecondaryText
                                                        : commonStyles.darkSecondaryText,
                                                ]}
                                            >
                                                {t("searchDetailMemberTitle")}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentInGroupMatched,
                                                ]}
                                            >
                                                Văn
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentInGroupNormal,
                                                    theme === lightMode
                                                        ? commonStyles.lightSecondaryText
                                                        : commonStyles.darkSecondaryText,
                                                ]}
                                            >
                                                Dương
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyContactItemCallBtn
                                            ]}
                                        >   
                                            <Image
                                                source={require("../../assets/phone-fill-icon.png")}
                                                style={[
                                                    styles.detailSearchPopUpSearchNotEmptyContactItemCallBtnIcon,
                                                ]}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendBtn
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendText
                                                ]}
                                            >{t("searchDetailAddFriendText")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity> */}
                            </View>
                            {/* <TouchableOpacity
                            style={[
                                styles.detailSearchPopUpSearchEmptyBtnSeeMore,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.detailSearchPopUpSearchEmptyBtnSeeMoreText,
                                    theme === lightMode
                                        ? commonStyles.lightSecondaryText
                                        : commonStyles.darkSecondaryText,
                                ]}
                            >
                                {t("searchDetailSeeMore")}
                            </Text>
                            <Image
                                source={require("../../assets/arrow-right-s-line.png")}
                                tintColor={
                                    theme === lightMode
                                        ? commonStyles.lightSecondaryText.color
                                        : commonStyles.darkSecondaryText.color
                                }
                            />
                        </TouchableOpacity> */}
                        </View>
                    </View>
                ) : (
                    <View
                        style={[
                            {
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 50,
                            },
                        ]}
                    >
                        <Image
                            source={require("../../assets/page-is-empty.png")}
                            style={{
                                width: 200,
                                height: 200,
                                resizeMode: "contain",
                            }}
                        />
                        <Text
                            style={[
                                styles.detailSearchPopupSearchEmptyTitle,
                                theme === lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {t("searchDetailAddFriendEmptyList")}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
