import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import { IRootState } from "../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import { useState } from "react";
import {
    LINK_GET_MY_FRIENDS,
    LINK_REQUEST_ADD_FRIEND,
    LINK_REQUEST_FRIEND_LIST,
    LINK_SEARCH_USER,
} from "@env";
import {
    IRequestFriendList,
    IUserIsMyFriendsResult,
    IUserResultSearch,
} from "../../configs/interfaces";

interface AddFriendProps {
    navigation: any;
}

export default function AddFriend({ navigation }: AddFriendProps) {
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { t } = useTranslation();
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector((state: IRootState) => state.userInfo);
    const socket = useSelector((state: IRootState) => state.socketIo.socket);

    async function handleCheckAndAddFriend() {
        setIsLoading(true);
        try {
            const [usersResult, myFriends, requestFriendList] =
                await Promise.all([
                    getUserByTextSearch(userId),
                    getUsersIsMyFriends(),
                    getUserInRequestFriendList(),
                ]);
            if (usersResult.length === 0 || usersResult[0]._id === user.user?._id) {
                Alert.alert(
                    t("notificationTitle"),
                    t("addFriendCantFindAnyUser")
                );
            } else if (
                myFriends?.friends.some(
                    (friend) => friend._id === usersResult[0]._id
                )
            ) {
                Alert.alert(
                    t("notificationTitle"),
                    t("addFriendUserIsAlreadyFriend")
                );
            } else if (
                requestFriendList.some(
                    (request) => request.receiver_id._id === usersResult[0]._id
                )
            ) {
                Alert.alert(
                    t("notificationTitle"),
                    t("addFriendUserIsAlreadySentRequest")
                );
            } else {
                handleAddFriend(usersResult[0]._id);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }
    async function handleAddFriend(friendIdRequest: string) {
        try {
            const response = await fetch(LINK_REQUEST_ADD_FRIEND, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + user.accessToken,
                },
                body: JSON.stringify({
                    friendId: friendIdRequest,
                    message: "Hello, I want to be your friend",
                    blockView: false,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                socket.emit("sendFriendRequest", {
                    _id: data._id,
                    receiver_id: friendIdRequest,
                    blockView: false,
                    message: "",
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    sender_id: {
                        _id: user.user?._id,
                        name: user.user?.name,
                        avatar: user.user?.avatar,
                        background: user.user?.background,
                        dateOfBirth: user.user?.dateOfBirth,
                        gender: user.user?.gender
                    }
                })
                Alert.alert(t("notificationTitle"), t("addFriendRequestSent"));
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getUserInRequestFriendList() {
        try {
            const response = await fetch(LINK_REQUEST_FRIEND_LIST, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.accessToken,
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
                    Authorization: "Bearer " + user.accessToken,
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
                    Authorization: "Bearer " + user.accessToken,
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

    return (
        <View
            style={[
                styles.addFriendWrapper,
                theme === lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
            ]}
        >
            <StatusBar />
            <SafeAreaView
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={[
                        styles.addFriendHeaderBox,
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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require("../../assets/arrow-left-s-line-icon.png")}
                            style={[
                                styles.addFriendHeaderGoBackBtn,
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
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.addFriendHeaderTitle,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {t("chatListAddFriendTitle")}
                    </Text>
                </View>
                <View
                    style={[
                        styles.addFriendMyQrCodeBoxContainer,
                        theme === lightMode
                            ? commonStyles.lightSecondaryBackground
                            : commonStyles.darkSecondaryBackground,
                    ]}
                >
                    <View style={[styles.addFriendMyQrCodeBox]}>
                        <Image
                            source={require("../../assets/354370dbb2a41b362ef9b9747085b76b.jpg")}
                            style={[styles.addFriendMyQrCodeBoxBackground]}
                        />
                        <Text
                            style={[
                                styles.addFriendMyQrCodeUsername,
                                {
                                    color: commonStyles.darkPrimaryText.color,
                                },
                            ]}
                        >
                            {user.user?.name}
                        </Text>
                        <Image
                            source={{ uri: user.user?.qrCode }}
                            style={[styles.addFriendMyQrCodeBoxCodeImg]}
                        />
                        <Text
                            style={[
                                styles.addFriendMyQrCodeDesc,
                                {
                                    color: commonStyles.darkSecondaryText.color,
                                },
                            ]}
                        >
                            {t("addFriendDescMyQr")}
                        </Text>
                    </View>
                </View>
                <View
                    style={[styles.addFriendSearchTelAndChooseCountryContainer]}
                >
                    <View
                        style={[
                            styles.addFriendSearchTelAndChooseCountryBox,
                            {
                                borderColor:
                                    theme === lightMode
                                        ? commonStyles.lightTertiaryText.color
                                        : commonStyles.darkTertiaryText.color,
                            },
                        ]}
                    >
                        <TextInput
                            keyboardType="default"
                            placeholder={t("addFriendInputSearchPlaceholder")}
                            value={userId}
                            onChangeText={(text) => setUserId(text)}
                            style={[
                                styles.addFriendSearchTelAndChooseCountryInput,
                                theme === lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                            placeholderTextColor={
                                theme === lightMode
                                    ? commonStyles.lightSecondaryText.color
                                    : commonStyles.darkSecondaryText.color
                            }
                        />
                        {userId.trim().length > 0 && (
                            <TouchableOpacity
                                onPress={() => setUserId("")}
                                style={[
                                    styles.addFriendSearchTelAndChooseCountryResetBtn,
                                ]}
                            >
                                <Image
                                    source={require("../../assets/close-line-icon.png")}
                                    style={[
                                        styles.addFriendSearchTelAndChooseCountryResetBtnImage,
                                        {
                                            tintColor:
                                                theme === lightMode
                                                    ? commonStyles
                                                          .lightSecondaryText
                                                          .color
                                                    : commonStyles
                                                          .darkSecondaryText
                                                          .color,
                                        },
                                    ]}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity
                        disabled={isLoading}
                        onPress={handleCheckAndAddFriend}
                        style={[
                            styles.addFriendSearchTelAndChooseCountryNextStepBtn,
                            {
                                backgroundColor:
                                    userId.trim().length > 0
                                        ? commonStyles.primaryColor.color
                                        : theme === lightMode
                                        ? commonStyles.lightTertiaryBackground
                                              .backgroundColor
                                        : commonStyles.darkTertiaryBackground
                                              .backgroundColor,
                            },
                        ]}
                    >
                        {isLoading ? (
                            <ActivityIndicator
                                size={"small"}
                                color={commonStyles.darkPrimaryText.color}
                            />
                        ) : (
                            <Image
                                source={require("../../assets/arrow-right-line-icon.png")}
                                style={[
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
                        )}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.addFriendAnotherFeatureBox]}>
                    <Image
                        source={require("../../assets/qr-code-line-icon.png")}
                        style={[styles.addFriendAnotherFeatureBoxIcon]}
                    />
                    <Text
                        style={[
                            styles.addFriendAnotherFeatureBoxText,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {t("addFriendScanQrTitle")}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.addFriendAnotherFeatureBox]}
                    onPress={() => navigation.navigate("ContactsInPhone")}
                >
                    <Image
                        source={require("../../assets/contacts-book-3-line-icon.png")}
                        style={[styles.addFriendAnotherFeatureBoxIcon]}
                    />
                    <Text
                        style={[
                            styles.addFriendAnotherFeatureBoxText,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {t("addFriendContactsInDevice")}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.addFriendAnotherFeatureBox]}>
                    <Image
                        source={require("../../assets/contacts-book-line-icon.png")}
                        style={[styles.addFriendAnotherFeatureBoxIcon]}
                    />
                    <Text
                        style={[
                            styles.addFriendAnotherFeatureBoxText,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {t("addFriendFriendMyKnow")}
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}
