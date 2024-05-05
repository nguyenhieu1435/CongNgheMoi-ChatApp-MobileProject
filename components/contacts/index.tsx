import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
    SectionList,
    ScrollView,
    Alert,
} from "react-native";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import OutsidePressHandler from "react-native-outside-press";
import { EvilIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { TFunction } from "i18next";
import Tooltip from "react-native-walkthrough-tooltip";
import SearchDetailPopup from "../searchDetailPopup";
import debounce from "debounce";
import { userInfoInterfaceI } from "../../redux_toolkit/slices/userInfo.slice";
import {
    LINK_DELETE_FRIEND,
    LINK_GET_MY_CONVERSATIONS,
    LINK_GET_MY_FRIENDS,
    LINK_GROUP,
} from "@env";
import {
    IConversation,
    IGroupConversation,
    IUserResultSearch,
} from "../../configs/interfaces";
import { handleConvertDateStrToDateFormat } from "../../utils/date";
import CreateGroupAvatarWhenAvatarIsEmpty from "../../utils/createGroupAvatarWhenAvatarIsEmpty";
import Spinner from "react-native-loading-spinner-overlay";
import { handleNavigateToChatDetail } from "../../utils/handleNavigateToChatDetail";
import classificationFriendListByName from "../../utils/classificationFriendByName";
import { socket } from "../../configs/socket-io";

interface ContactsProps {
    navigation: any;
}
const ContactTypeFilter = {
    FRIEND: "FRIEND",
    GROUP: "GROUP",
};

export default function Contacts({ navigation }: ContactsProps) {
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { t } = useTranslation();
    const refTextInputSearch = useRef<TextInput>(null);
    const [textSearch, setTextSearch] = useState<string>("");
    const [heightPopup, setHeightPopup] = useState<number>(0);
    const [isClickOutsideSearch, setIsClickOutsideSearch] =
        useState<boolean>(false);
    const [typeFilterSelected, setTypeFilterSelected] = useState<string>(
        ContactTypeFilter.FRIEND
    );
    const userInfo = useSelector((state: IRootState) => state.userInfo);

    const setTextSearchDebounce = useCallback(debounce(setTextSearch, 500), []);

    return (
        <View
            style={[
                styles.contactDetailWrapper,
                theme === lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
            ]}
        >
            <StatusBar />
            <SafeAreaView style={[styles.contactDetailContainer]}>
                <View style={[styles.contactDetailHeaderBox]}>
                    <Text
                        style={[
                            styles.contactDetailHeaderTitleName,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {t("tabbarContact")}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("AddFriend");
                        }}
                    >
                        <Image
                            source={require("../../assets/user-add-line.png")}
                            style={[
                                styles.contactDetailHeaderIconAddFriend,
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
                </View>
                <OutsidePressHandler
                    onOutsidePress={() => {
                        setIsClickOutsideSearch(true);
                    }}
                    style={[styles.contactDetailBoxSearchWrapper]}
                >
                    <View
                        style={[
                            styles.contactDetailBoxSearch,
                            theme === lightMode
                                ? commonStyles.lightSecondaryBackground
                                : commonStyles.darkSecondaryBackground,
                        ]}
                        onTouchStart={() => {
                            setIsClickOutsideSearch(false);
                        }}
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
                            onChangeText={(text) => setTextSearchDebounce(text)}
                        />
                    </View>
                </OutsidePressHandler>
                <View
                    style={[
                        styles.contactDetailTypeFilterBox,
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
                    <TouchableOpacity
                        onPress={() => {
                            setTypeFilterSelected(ContactTypeFilter.FRIEND);
                        }}
                        style={[
                            styles.contactDetailTypeFilterBtn,
                            {
                                borderBottomColor:
                                    typeFilterSelected ===
                                    ContactTypeFilter.FRIEND
                                        ? commonStyles.primaryColor.color
                                        : "transparent",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.contactDetailTypeFilterBtnText,
                                typeFilterSelected === ContactTypeFilter.FRIEND
                                    ? theme === lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText
                                    : theme === lightMode
                                    ? commonStyles.lightSecondaryText
                                    : commonStyles.darkSecondaryText,
                            ]}
                        >
                            {t("searchDetailContactTabFriend")}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setTypeFilterSelected(ContactTypeFilter.GROUP);
                        }}
                        style={[
                            styles.contactDetailTypeFilterBtn,
                            {
                                borderBottomColor:
                                    typeFilterSelected ===
                                    ContactTypeFilter.GROUP
                                        ? commonStyles.primaryColor.color
                                        : "transparent",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.contactDetailTypeFilterBtnText,
                                typeFilterSelected === ContactTypeFilter.GROUP
                                    ? theme === lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText
                                    : theme === lightMode
                                    ? commonStyles.lightSecondaryText
                                    : commonStyles.darkSecondaryText,
                            ]}
                        >
                            {t("searchDetailContactTabGroup")}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={[styles.contactDetailFriendListOrGroupListWrapper]}
                >
                    {typeFilterSelected === ContactTypeFilter.FRIEND ? (
                        <FriendScrollBox
                            translation={t}
                            theme={theme}
                            style={{
                                flexGrow: 1,
                                flexShrink: 1,
                                paddingVertical: 10,
                            }}
                            navigation={navigation}
                            userInfo={userInfo}
                        />
                    ) : (
                        <GroupScrollBox
                            translation={t}
                            theme={theme}
                            style={{
                                flexGrow: 1,
                                flexShrink: 1,
                            }}
                            navigation={navigation}
                            userInfo={userInfo}
                        />
                    )}
                </View>
                <SearchDetailPopup
                    heightFromHeaderToInput={heightPopup}
                    isPressOutsideTextInput={isClickOutsideSearch}
                    textSearch={textSearch}
                    setTextSearch={setTextSearch}
                    setHeightFromHeaderToInput={setHeightPopup}
                />
            </SafeAreaView>
        </View>
    );
}

interface FriendScrollBoxProps {
    translation: TFunction<"translation", undefined>;
    theme: string;
    style: object;
    navigation: any;
    userInfo: userInfoInterfaceI;
}
export interface ISectionFriendData {
    title: string;
    data: IUserResultSearch[];
}
function FriendScrollBox({
    translation: t,
    theme,
    style,
    navigation,
    userInfo,
}: FriendScrollBoxProps) {
    const [indexPopupSelected, setIndexPopupSelected] = useState<string | null>(
        null
    );
    const refLocationYPopupSelected = useRef<number>(0);
    const [sectionFriendList, setSectionFriendList] = useState<
        ISectionFriendData[]
    >([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const friendOnline = useSelector(
        (state: IRootState) => state.onlineUserIds
    );

    async function getFriendList() {
        try {
            const response = await fetch(LINK_GET_MY_FRIENDS, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                const finalData = classificationFriendListByName(
                    data.friends as IUserResultSearch[]
                );
                setSectionFriendList(finalData);
            } else {
                setSectionFriendList([]);
            }
        } catch (error) {
            console.log("error", error);
            setSectionFriendList([]);
        }
    }
    // function classificationFriendListByName(friendList: IUserResultSearch[]){
    //     const sectionData: ISectionFriendData[] = []

    //     friendList.forEach((friend) => {
    //         const firstChar = friend.name[0].toUpperCase()
    //         const index = sectionData.findIndex((section) => section.title === firstChar)
    //         if(index !== -1){
    //             sectionData[index].data.push(friend)
    //         }else{
    //             sectionData.push({
    //                 title: firstChar,
    //                 data: [friend]
    //             })
    //         }
    //     })
    //     return sectionData;
    // }
    function onConnect() {
        socket.emit("online", {
            userId: userInfo.user?._id,
            friendIds: friendOnline.friends,
        });
        console.log("connect succesfull");
        
    }
    function onReceivedDeleteFriend({ senderId }: { senderId: string }) {
        console.log("onReceivedDeleteFriend", senderId);
        
        setSectionFriendList((prev) => {
            return prev.map((section) => {
                section.data = section.data.filter(
                    (friend) => friend._id !== senderId
                );
                return section;
            });
        });
    }

    useEffect(() => {
        socket.connect();

        socket.on("connect", onConnect);
        socket.on("deleteFriend", onReceivedDeleteFriend);

        return () => {
            socket.off("connect", onConnect);
            socket.off("deleteFriend", onReceivedDeleteFriend);
        };
    }, [sectionFriendList]);

    useEffect(()=>{
        getFriendList();
    }, [])

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

    function handleDeleteFriend(friendId: string) {
        Alert.alert(t("notificationTitle"), t("deleteFriendContent"), [
            {
                text: t("cancel"),
                style: "cancel",
            },
            {
                text: t("delete"),
                onPress: () => handleDeleteFriendConfirm(friendId),
            },
        ]);
    }
    async function handleDeleteFriendConfirm(friendId: string) {
        try {
            const resp = await fetch(LINK_DELETE_FRIEND + `/${friendId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            });
            if (resp.ok) {
                socket.emit("deleteFriend", {
                    senderId: userInfo.user?._id,
                    receiverId: friendId,
                });
                onReceivedDeleteFriend({ senderId: friendId });
            }
        } catch (error) {
            console.log("DELETE FRIEND ERROR", error);
        }
    }

    function renderFriendItem({
        item,
        index,
    }: {
        item: IUserResultSearch;
        index: number;
    }) {
        return (
            <TouchableOpacity
                onPress={() => handleOpenChatDetail(item)}
                style={[
                    styles.contactDetailFriendItemBox,
                    {
                        zIndex: indexPopupSelected == item._id ? 200 : 0,
                    },
                ]}
            >
                <Image
                    source={{ uri: item?.avatar }}
                    style={[styles.contactDetailFriendItemAvatar]}
                />
                <Text
                    style={[
                        styles.contactDetailFriendItemName,
                        theme === lightMode
                            ? commonStyles.lightPrimaryText
                            : commonStyles.darkPrimaryText,
                    ]}
                >
                    {item?.name}
                </Text>
                <View
                    style={[
                        styles.contactDetailFriendItemActionsBox,
                        {
                            zIndex: indexPopupSelected == item._id ? 200 : 1,
                        },
                    ]}
                >
                    <TouchableOpacity>
                        <Image
                            source={require("../../assets/phone-line-icon.png")}
                            style={[
                                styles.contactDetailFriendItemActionIcon,
                                {
                                    tintColor:
                                        theme === lightMode
                                            ? commonStyles.lightIconColor.color
                                            : commonStyles.darkIconColor.color,
                                },
                            ]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require("../../assets/vidicon-line-icon.png")}
                            style={[
                                styles.contactDetailFriendItemActionIcon,
                                {
                                    tintColor:
                                        theme === lightMode
                                            ? commonStyles.lightIconColor.color
                                            : commonStyles.darkIconColor.color,
                                },
                            ]}
                        />
                    </TouchableOpacity>

                    <Tooltip
                        isVisible={indexPopupSelected == item._id}
                        placement="top"
                        backgroundColor="transparent"
                        contentStyle={[
                            styles.contactDetailTooltipPopupContent,
                            theme === lightMode
                                ? commonStyles.lightFourBackground
                                : commonStyles.darkFourBackground,
                        ]}
                        content={
                            <OutsidePressHandler
                                onOutsidePress={() => {
                                    setIndexPopupSelected(null);
                                    refLocationYPopupSelected.current = 0;
                                }}
                                style={[
                                    styles.contactDetailFriendItemActionPopup,
                                    theme === lightMode
                                        ? commonStyles.lightFourBackground
                                        : commonStyles.darkFourBackground,
                                    {
                                        zIndex:
                                            indexPopupSelected == item._id
                                                ? 200
                                                : 1,
                                    },
                                ]}
                            >
                                <TouchableOpacity
                                    style={[
                                        styles.contactDetailFriendActionPopupBtnItem,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.contactDetailFriendActionPopupBtnItemText,
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryText
                                                : commonStyles.darkPrimaryText,
                                        ]}
                                    >
                                        {t("searchDetailFriendActionShare")}
                                    </Text>
                                    <Image
                                        source={require("../../assets/share-line-icon.png")}
                                        style={[
                                            styles.contactDetailFriendItemActionBtnImage,
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

                                <TouchableOpacity
                                    style={[
                                        styles.contactDetailFriendActionPopupBtnItem,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.contactDetailFriendActionPopupBtnItemText,
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryText
                                                : commonStyles.darkPrimaryText,
                                        ]}
                                    >
                                        {t("searchDetailFriendActionBlock")}
                                    </Text>
                                    <Image
                                        source={require("../../assets/indeterminate-circle-line-block-icon.png")}
                                        style={[
                                            styles.contactDetailFriendItemActionBtnImage,
                                            {
                                                tintColor:
                                                    theme === lightMode
                                                        ? commonStyles
                                                              .lightIconColor
                                                              .color
                                                        : commonStyles
                                                              .darkIconColor
                                                              .color,
                                                transform: [
                                                    { rotate: "45deg" },
                                                ],
                                            },
                                        ]}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.contactDetailFriendActionPopupBtnItem,
                                    ]}
                                    onPress={() => handleDeleteFriend(item._id)}
                                >
                                    <Text
                                        style={[
                                            styles.contactDetailFriendActionPopupBtnItemText,
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryText
                                                : commonStyles.darkPrimaryText,
                                        ]}
                                    >
                                        {t("searchDetailFriendActionRemove")}
                                    </Text>
                                    <Image
                                        source={require("../../assets/delete-bin-line-icon.png")}
                                        style={[
                                            styles.contactDetailFriendItemActionBtnImage,
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
                            </OutsidePressHandler>
                        }
                        onClose={() => {}}
                    >
                        <TouchableOpacity
                            onPress={(evt) => {
                                setIndexPopupSelected(item._id);
                                refLocationYPopupSelected.current =
                                    evt.nativeEvent.pageY;
                            }}
                        >
                            <Image
                                source={require("../../assets/more-vertical-line-icon.png")}
                                style={[
                                    styles.contactDetailFriendItemActionIcon,
                                    {
                                        tintColor:
                                            theme === lightMode
                                                ? commonStyles.lightIconColor
                                                      .color
                                                : commonStyles.darkIconColor
                                                      .color,
                                    },
                                ]}
                            />
                        </TouchableOpacity>
                    </Tooltip>

                    {/* <OutsidePressHandler
                        onOutsidePress={() => {
                            console.log("outside", Number.parseInt((index + "" + item?.userId)))
                            setIndexPopupSelected(-1)
                            refLocationYPopupSelected.current = 0
                        }}
                        style={[
                            styles.contactDetailFriendItemActionPopupWrapper,
                            {
                                zIndex: indexPopupSelected === Number.parseInt((index + "" + item?.userId))
                                ?
                                200
                                :
                                1
                            }
                        ]}
                    >
                        
                        <TouchableOpacity
                            onPress={(evt)=>{
                                setIndexPopupSelected(Number.parseInt((index + "" + item?.userId)))
                                refLocationYPopupSelected.current = evt.nativeEvent.pageY
                            }}
                        
                        >
                            <Image
                                source={require("../../assets/more-vertical-line-icon.png")}
                                style={[
                                    styles.contactDetailFriendItemActionIcon,
                                    {
                                        tintColor: theme === lightMode
                                        ?
                                        commonStyles.lightIconColor.color
                                        :
                                        commonStyles.darkIconColor.color
                                    }
                                ]}
                            />
                        </TouchableOpacity>
                        {
                            indexPopupSelected === Number.parseInt((index + "" + item?.userId))
                            &&
                            <View
                                style={[
                                    styles.contactDetailFriendItemActionPopup,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightFourBackground
                                    :
                                    commonStyles.darkFourBackground,
                                    {
                                        shadowColor: '#0F223A',
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.12,
                                        shadowRadius: 4,
                                        elevation: 4,
                                    },
                                    {
                                        zIndex: indexPopupSelected === Number.parseInt((index + "" + item?.userId))
                                        ?
                                        200
                                        :
                                        1
                                    }
                                ]}
                            >
                                <TouchableOpacity
                                    style={[
                                        styles.contactDetailFriendActionPopupBtnItem
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.contactDetailFriendActionPopupBtnItemText,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightPrimaryText
                                            :
                                            commonStyles.darkPrimaryText
                                        ]}
                                    >{t("searchDetailFriendActionShare")}</Text>
                                    <Image
                                        source={require("../../assets/share-line-icon.png")}
                                        style={[
                                            styles.contactDetailFriendItemActionBtnImage,
                                            {
                                                tintColor: theme === lightMode
                                                ?
                                                commonStyles.lightIconColor.color
                                                :
                                                commonStyles.darkIconColor.color
                                            }
                                        ]}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.contactDetailFriendActionPopupBtnItem
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.contactDetailFriendActionPopupBtnItemText,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightPrimaryText
                                            :
                                            commonStyles.darkPrimaryText
                                        ]}
                                    >{t("searchDetailFriendActionBlock")}</Text>
                                    <Image
                                        source={require("../../assets/indeterminate-circle-line-block-icon.png")}
                                        style={[
                                            styles.contactDetailFriendItemActionBtnImage,
                                            {
                                                tintColor: theme === lightMode
                                                ?
                                                commonStyles.lightIconColor.color
                                                :
                                                commonStyles.darkIconColor.color,
                                                transform: [{rotate: "45deg"}]
                                            }
                                        ]}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.contactDetailFriendActionPopupBtnItem
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.contactDetailFriendActionPopupBtnItemText,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightPrimaryText
                                            :
                                            commonStyles.darkPrimaryText
                                        ]}
                                    >{t("searchDetailFriendActionRemove")}</Text>
                                    <Image
                                        source={require("../../assets/delete-bin-line-icon.png")}
                                        style={[
                                            styles.contactDetailFriendItemActionBtnImage,
                                            {
                                                tintColor: theme === lightMode
                                                ?
                                                commonStyles.lightIconColor.color
                                                :
                                                commonStyles.darkIconColor.color
                                            }
                                        ]}
                                    />
                                </TouchableOpacity>
                            </View>
                        } 
                    </OutsidePressHandler> */}
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={[style]}>
            <Spinner
                visible={isLoading}
                textContent={t("loading")}
                color="#fff"
            />
            <View style={[styles.contactDetailFriendAnotherActionContainer]}>
                <TouchableOpacity
                    style={[styles.contactDetailFriendAnotherActionBtn]}
                    onPress={() => navigation.navigate("AddFriendInvitation")}
                >
                    <View
                        style={[
                            styles.contactDetailFriendAnotherActionImageBox,
                        ]}
                    >
                        <Image
                            source={require("../../assets/group-line-icon.png")}
                            style={[
                                styles.contactDetailFriendAnotherActionImage,
                                {
                                    tintColor:
                                        commonStyles.darkPrimaryText.color,
                                },
                            ]}
                        />
                    </View>
                    <View>
                        <Text
                            style={[
                                styles.contactDetailFriendAnotherActionBtnTitle,
                                theme === lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {t("searchDetailContactAddFriendInvitation")}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.contactDetailFriendAnotherActionBtn]}
                    onPress={() => navigation.navigate("ContactsInPhone")}
                >
                    <View
                        style={[
                            styles.contactDetailFriendAnotherActionImageBox,
                        ]}
                    >
                        <Image
                            source={require("../../assets/contacts-book-3-line-icon.png")}
                            style={[
                                styles.contactDetailFriendAnotherActionImage,
                                {
                                    tintColor:
                                        commonStyles.darkPrimaryText.color,
                                },
                            ]}
                        />
                    </View>
                    <View>
                        <Text
                            style={[
                                styles.contactDetailFriendAnotherActionBtnTitle,
                                theme === lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {t("searchDetailContactMachineContact")}
                        </Text>
                        <Text
                            style={[
                                styles.contactDetailFriendAnotherActionBtnDesc,
                                theme === lightMode
                                    ? commonStyles.lightTertiaryText
                                    : commonStyles.darkTertiaryText,
                            ]}
                        >
                            {t("searchDetailContactMachineContactDesc")}
                        </Text>
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    style={[
                        styles.contactDetailFriendAnotherActionBtn
                    ]}
                >
                    <View
                        style={[
                            styles.contactDetailFriendAnotherActionImageBox
                        ]}
                    >
                        <Image
                            source={require("../../assets/cake-2-line.png")}
                            style={[
                                styles.contactDetailFriendAnotherActionImage,
                                {
                                    tintColor: commonStyles.darkPrimaryText.color
                                }
                            ]}
                        />
                    </View>
                    <View>
                        <Text
                            style={[
                                styles.contactDetailFriendAnotherActionBtnTitle,
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText
                                :
                                commonStyles.darkPrimaryText
                            ]}
                        >{t("searchDetailContactBirthdaySchedule")}</Text>
                        <Text
                            style={[
                                styles.contactDetailFriendAnotherActionBtnDesc,
                                theme === lightMode
                                ?
                                commonStyles.lightTertiaryText
                                :
                                commonStyles.darkTertiaryText
                            ]}
                        >{t("searchDetailContactBirthdayScheduleDesc")}</Text>
                    </View>
                </TouchableOpacity> */}
            </View>
            <View
                style={[
                    styles.contactDetailFriendBreakLine,
                    {
                        backgroundColor:
                            theme === lightMode
                                ? commonStyles.lightTertiaryBackground
                                      .backgroundColor
                                : commonStyles.darkTertiaryBackground
                                      .backgroundColor,
                    },
                ]}
            ></View>
            <View style={[styles.contactDetailFriendListWrapper]}>
                {/* <View
                    style={[
                        styles.contactDetailFriendListFilterBox,
                        {
                            borderBottomColor:
                            theme === lightMode
                            ?
                            commonStyles.chatNavbarBorderBottomColorLight.color
                            :
                            commonStyles.chatNavbarBorderBottomColorDark.color
                        }
                    ]}
                >

                    <TouchableOpacity
                        style={[
                            styles.contactDetailFriendListFilterBtn,
                            {
                                borderWidth: 
                                    friendFilterSelected === FriendFilter.ALL
                                    ?
                                    0
                                    :
                                    1,
                                borderColor: 
                                    theme === lightMode
                                    ?
                                    commonStyles.lightTertiaryBackground.backgroundColor
                                    :
                                    commonStyles.darkTertiaryBackground.backgroundColor
                                    ,
                                backgroundColor: 
                                    friendFilterSelected === FriendFilter.ALL
                                    ?
                                        theme === lightMode
                                        ?
                                        commonStyles.lightTertiaryBackground.backgroundColor
                                        :
                                        commonStyles.darkTertiaryBackground.backgroundColor
                                    :
                                    "transparent",
                            }
                        ]}
                    >
                        <Text
                            style={[
                                styles.contactDetailFriendListFilterBtnText,
                                {
                                    fontWeight: 
                                    friendFilterSelected === FriendFilter.ALL
                                    ?
                                    "500"
                                    :
                                    "400",
                                    color:
                                    friendFilterSelected === FriendFilter.ALL
                                    ?
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText.color
                                        :
                                        commonStyles.darkPrimaryText.color
                                    :
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    
                                    
                                }
                            ]}
                        >{t("searchDetailContactAllType")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.contactDetailFriendListFilterBtn,
                            {
                                borderWidth: 
                                    friendFilterSelected === FriendFilter.NEW_ACCESS
                                    ?
                                    0
                                    :
                                    1,
                                borderColor: 
                                    theme === lightMode
                                    ?
                                    commonStyles.lightTertiaryBackground.backgroundColor
                                    :
                                    commonStyles.darkTertiaryBackground.backgroundColor
                                    ,
                                backgroundColor: 
                                    friendFilterSelected === FriendFilter.NEW_ACCESS
                                    ?
                                        theme === lightMode
                                        ?
                                        commonStyles.lightTertiaryBackground.backgroundColor
                                        :
                                        commonStyles.darkTertiaryBackground.backgroundColor
                                    :
                                    "transparent",
                            }
                        ]}
                    >
                        <Text
                            style={[
                                styles.contactDetailFriendListFilterBtnText,
                                {
                                    fontWeight: 
                                    friendFilterSelected === FriendFilter.NEW_ACCESS
                                    ?
                                    "500"
                                    :
                                    "400",
                                    color:
                                    friendFilterSelected === FriendFilter.NEW_ACCESS
                                    ?
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText.color
                                        :
                                        commonStyles.darkPrimaryText.color
                                    :
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    
                                    
                                }
                            ]}
                        >{t("searchDetailContactNewAccess")}</Text>
                    </TouchableOpacity>

                </View> */}
                <View>
                    {/* <TouchableOpacity
                        style={[
                            styles.contactDetailFriendItemBox,
                            
                        ]}
                    >
                        <Image
                            source={{uri: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"}}
                            style={[
                                styles.contactDetailFriendItemAvatar
                            ]}
                        />
                        <Text
                            
                            style={[
                                styles.contactDetailFriendItemName,
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText
                                :
                                commonStyles.darkPrimaryText
                            ]}
                        >Au Tran</Text>
                        <View
                            style={[
                                styles.contactDetailFriendItemActionsBox
                            ]}
                        >
                            <TouchableOpacity>
                                <Image
                                    source={require("../../assets/phone-line-icon.png")}
                                    style={[
                                        styles.contactDetailFriendItemActionIcon,
                                        {
                                            tintColor: theme === lightMode
                                            ?
                                            commonStyles.lightIconColor.color
                                            :
                                            commonStyles.darkIconColor.color
                                        }
                                    ]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    source={require("../../assets/vidicon-line-icon.png")}
                                    style={[
                                        styles.contactDetailFriendItemActionIcon,
                                        {
                                            tintColor: theme === lightMode
                                            ?
                                            commonStyles.lightIconColor.color
                                            :
                                            commonStyles.darkIconColor.color
                                        }
                                    ]}
                                />
                            </TouchableOpacity>
                            <OutsidePressHandler
                                onOutsidePress={() => {
                                    setIndexPopupSelected(-1)
                                    refLocationYPopupSelected.current = 0
                                }}
                                style={[
                                    styles.contactDetailFriendItemActionPopupWrapper,
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={(evt)=>{
                                        setIndexPopupSelected(0)
                                        refLocationYPopupSelected.current = evt.nativeEvent.pageY
                                    }}
                                  
                                >
                                    <Image
                                        source={require("../../assets/more-vertical-line-icon.png")}
                                        style={[
                                            styles.contactDetailFriendItemActionIcon,
                                            {
                                                tintColor: theme === lightMode
                                                ?
                                                commonStyles.lightIconColor.color
                                                :
                                                commonStyles.darkIconColor.color
                                            }
                                        ]}
                                    />
                                </TouchableOpacity>
                                {
                                    indexPopupSelected === 0
                                    &&
                                    <View
                                        style={[
                                            styles.contactDetailFriendItemActionPopup,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightFourBackground
                                            :
                                            commonStyles.darkFourBackground,
                                            {
                                                shadowColor: '#0F223A',
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
                                        <TouchableOpacity
                                            style={[
                                                styles.contactDetailFriendActionPopupBtnItem
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.contactDetailFriendActionPopupBtnItemText,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >{t("searchDetailFriendActionShare")}</Text>
                                            <Image
                                                source={require("../../assets/share-line-icon.png")}
                                                style={[
                                                    styles.contactDetailFriendItemActionBtnImage,
                                                    {
                                                        tintColor: theme === lightMode
                                                        ?
                                                        commonStyles.lightIconColor.color
                                                        :
                                                        commonStyles.darkIconColor.color
                                                    }
                                                ]}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[
                                                styles.contactDetailFriendActionPopupBtnItem
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.contactDetailFriendActionPopupBtnItemText,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >{t("searchDetailFriendActionBlock")}</Text>
                                            <Image
                                                source={require("../../assets/indeterminate-circle-line-block-icon.png")}
                                                style={[
                                                    styles.contactDetailFriendItemActionBtnImage,
                                                    {
                                                        tintColor: theme === lightMode
                                                        ?
                                                        commonStyles.lightIconColor.color
                                                        :
                                                        commonStyles.darkIconColor.color,
                                                        transform: [{rotate: "45deg"}]
                                                    }
                                                ]}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[
                                                styles.contactDetailFriendActionPopupBtnItem
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.contactDetailFriendActionPopupBtnItemText,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >{t("searchDetailFriendActionRemove")}</Text>
                                            <Image
                                                source={require("../../assets/delete-bin-line-icon.png")}
                                                style={[
                                                    styles.contactDetailFriendItemActionBtnImage,
                                                    {
                                                        tintColor: theme === lightMode
                                                        ?
                                                        commonStyles.lightIconColor.color
                                                        :
                                                        commonStyles.darkIconColor.color
                                                    }
                                                ]}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                }
                            </OutsidePressHandler>
                        </View>
                    </TouchableOpacity> */}
                </View>
                <SectionList
                    style={{
                        paddingHorizontal: 20,
                    }}
                    contentContainerStyle={{
                        paddingBottom: 130,
                    }}
                    sections={sectionFriendList}
                    keyExtractor={(item, index) => "" + index}
                    renderItem={({ item, index }) =>
                        renderFriendItem({ item, index })
                    }
                    renderSectionHeader={({ section: { title } }) => (
                        <Text
                            style={[
                                styles.contactDetailFriendListCharacterClassification,
                            ]}
                        >
                            {title}
                        </Text>
                    )}
                />
            </View>
        </View>
    );
}

interface GroupScrollBoxProps {
    translation: TFunction<"translation", undefined>;
    theme: string;
    style: object;
    navigation: any;
    userInfo: userInfoInterfaceI;
}

function GroupScrollBox({
    translation: t,
    theme,
    style,
    navigation,
    userInfo,
}: GroupScrollBoxProps) {
    const [myGroups, setMyGroups] = useState<IGroupConversation[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function getMyGroupList() {
        try {
            const response = await fetch(LINK_GROUP, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setMyGroups(data as IGroupConversation[]);
            } else {
                setMyGroups([]);
            }
        } catch (error) {
            console.log("error", error);
            setMyGroups([]);
        }
    }
    useEffect(() => {
        getMyGroupList();
    }, []);

    // function handleNavigateToGroupDetail(group: IGroupConversation){
    //     try {
    //         setIsLoading(true)

    //     } catch (error) {
    //         console.log("error", error)
    //     }
    //     setIsLoading(false)
    // }

    return (
        <View style={[style]}>
            <Spinner
                visible={isLoading}
                textContent={t("loading")}
                color="#fff"
            />
            <TouchableOpacity
                style={[styles.contactDetailFriendCreateNewGroupBtn]}
                onPress={() => navigation.navigate("CreateGroup")}
            >
                <View
                    style={[
                        styles.contactDetailFriendCreateNewGroupBtnImageBox,
                        {
                            backgroundColor:
                                theme === lightMode
                                    ? commonStyles.lightTertiaryBackground
                                          .backgroundColor
                                    : commonStyles.darkTertiaryBackground
                                          .backgroundColor,
                        },
                    ]}
                >
                    <Image
                        source={require("../../assets/add-group-icon.png")}
                        style={[
                            styles.contactDetailFriendCreateNewGroupBtnImage,
                        ]}
                    />
                </View>
                <Text style={[styles.contactDetailFriendCreateNewGroupBtnText]}>
                    {t("searchDetailCreateNewGroup")}
                </Text>
            </TouchableOpacity>

            <View
                style={[
                    styles.contactDetailFriendBreakLine,
                    {
                        backgroundColor:
                            theme === lightMode
                                ? commonStyles.lightTertiaryBackground
                                      .backgroundColor
                                : commonStyles.darkTertiaryBackground
                                      .backgroundColor,
                        marginTop: 0,
                    },
                ]}
            ></View>

            <View style={[styles.contactDetailGroupItemWrapper]}>
                <View style={[styles.contactDetailFriendHeaderGroupFilterBox]}>
                    <Text
                        style={[
                            styles.contactDetailFriendHeaderGroupFilterLeftText,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {t("searchDetailGroupsAreJoining")}
                    </Text>
                    <TouchableOpacity
                        style={[
                            styles.contactDetailFriendHeaderGroupFilterRightBox,
                        ]}
                    >
                        <Image
                            source={require("../../assets/arrow-up-down-line-swap.png")}
                            style={[
                                styles.contactDetailFriendHeaderGroupFilterRightImage,
                                {
                                    tintColor:
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color,
                                },
                            ]}
                        />
                        <Text
                            style={[
                                styles.contactDetailFriendHeaderGroupFilterRightText,
                                theme === lightMode
                                    ? commonStyles.lightSecondaryText
                                    : commonStyles.darkSecondaryText,
                            ]}
                        >
                            {t("searchDetailGroupFilterLastAccess")}
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 110,
                    }}
                >
                    {myGroups.map((group) => {
                        return (
                            <TouchableOpacity
                                style={[styles.contactDetailGroupItemBox]}
                                key={group._id}
                                onPress={() => {
                                    handleNavigateToChatDetail(
                                        group,
                                        setIsLoading,
                                        userInfo,
                                        navigation
                                    );
                                }}
                            >
                                {group.picture ? (
                                    <Image
                                        source={{ uri: group.picture }}
                                        style={[
                                            styles.contactDetailGroupItemAvatar,
                                        ]}
                                    />
                                ) : (
                                    CreateGroupAvatarWhenAvatarIsEmpty(group)
                                )}
                                <View
                                    style={[
                                        styles.contactDetailGroupItemContentBox,
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.contactDetailGroupItemFirstTitleBox,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.contactDetailGroupItemFirstTitleLeftText,
                                                theme === lightMode
                                                    ? commonStyles.lightPrimaryText
                                                    : commonStyles.darkPrimaryText,
                                            ]}
                                        >
                                            {group.name}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.contactDetailGroupItemFirstTitleRightText,
                                                theme === lightMode
                                                    ? commonStyles.lightTertiaryText
                                                    : commonStyles.darkTertiaryText,
                                            ]}
                                        >
                                            {handleConvertDateStrToDateFormat(
                                                group.updatedAt
                                            )}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            lineBreakMode="tail"
                                            numberOfLines={1}
                                            style={[
                                                styles.contactDetailGroupItemSecondPreviewText,
                                                theme === lightMode
                                                    ? commonStyles.lightPrimaryText
                                                    : commonStyles.darkPrimaryText,
                                            ]}
                                        ></Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}

                    {/* <TouchableOpacity
                        style={[
                            styles.contactDetailGroupItemBox
                        ]}
                    >
                        <Image
                            source={{uri: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"}}
                            style={[
                                styles.contactDetailGroupItemAvatar
                            ]}
                        />
                        <View
                            style={[
                                styles.contactDetailGroupItemContentBox
                            ]}
                        >
                            <View
                                style={[
                                    styles.contactDetailGroupItemFirstTitleBox
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.contactDetailGroupItemFirstTitleLeftText,
                                        theme ===  lightMode
                                        ?
                                        commonStyles.lightPrimaryText
                                        :
                                        commonStyles.darkPrimaryText
                                    ]}
                                >Big-Data</Text>
                                <Text
                                    style={[
                                        styles.contactDetailGroupItemFirstTitleRightText,
                                        theme ===  lightMode
                                        ?
                                        commonStyles.lightTertiaryText
                                        :
                                        commonStyles.darkTertiaryText
                                    ]}
                                >29/01</Text>
                            </View>
                            <View>
                                <Text
                                    lineBreakMode='tail'
                                    numberOfLines={1}
                                    style={[
                                        styles.contactDetailGroupItemSecondPreviewText,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText
                                        :
                                        commonStyles.darkPrimaryText
                                    ]}
                                >
                                    Văn Nam: Bán acc clone dsmp lv63 6ttc9 aaasdasdasdasdasdas
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity> */}
                </ScrollView>
            </View>
        </View>
    );
}
