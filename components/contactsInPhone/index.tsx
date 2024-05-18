import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
    SectionList,
    Platform,
    UIManager,
    LayoutAnimation,
    Animated,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import { useEffect, useRef, useState } from "react";
import * as Contacts from "expo-contacts";
import { LINK_GET_MY_CONVERSATIONS, LINK_PHONE_BOOK, LINK_REQUEST_ADD_FRIEND, LINK_REQUEST_FRIEND_LIST, LINK_REVOCATION_REQUEST_FRIEND } from "@env";
import { IContactInServer, IConversation, IRequestFriendList, IUserInContact } from "../../configs/interfaces";
import { handleNavigateToChatDetail } from "../../utils/handleNavigateToChatDetail";

interface IContactsInPhoneProps {
    navigation: any;
}

const CONTACT_FILTERS = {
    ALL: "all",
    NOT_FRIEND: "notFriend",
};

interface ISectionContact {
    title: string;
    data: IUserInContact[];
}

export default function ContactsInPhone({ navigation }: IContactsInPhoneProps) {
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { t } = useTranslation();
    const [contactFilter, setContactFilter] = useState(CONTACT_FILTERS.ALL);
    const [isShowUpdateContactBox, setIsShowUpdateContactBox] = useState(true);
    const isFocusTextInput = useRef<boolean>(false);
    const refPageYOfScrollSection = useRef<number>(0);
    const userInfo = useSelector((state: IRootState) => state.userInfo)
    const [contactsInPhoneList, setContactsInPhoneList] = useState<IContactInServer | null>(null);
    const [sectionAll, setSectionAll] = useState<ISectionContact[]>([]);
    const [sectionNotFriend, setSectionNotFriend] = useState<ISectionContact[]>([]);
    const [textSearch, setTextSearch] = useState<string>("");
    const [usersIdRequestFriend, setUsersIdRequestFriend] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const socket = useSelector((state: IRootState) => state.socketIo.socket);
    const [isLoadingNavigate, setIsLoadingNavigate] = useState<boolean>(false);

    if (Platform.OS === "android") {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    function toggleFocusSearchBox(value: boolean) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        // setIsShowUpdateContactBox(value)
        if (value === false) {
            setIsShowUpdateContactBox(false);
        } else {
            if (
                !isFocusTextInput.current &&
                refPageYOfScrollSection.current <= 5
            ) {
                setIsShowUpdateContactBox(true);
            }
        }
    }

    async function handleGetContactsFromPhone() {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Emails],
            });
            if (data.length > 0) {
                let newData = data.filter(item => {
                    if (item.emails && item.emails.length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                });
                return newData.map((item) => {
                    return {email: item.emails?.[0]?.email, name: item.name}
                })
            } else {
                return []
            }
        }
    }
    async function handleCheckIsHaveContactInDB() {
        try {
            const resp = await fetch(LINK_PHONE_BOOK, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.accessToken}`
                },
            })
            if (resp.ok){
                const data = await resp.json() as IContactInServer;
                if (data == null || data.contacts == null || data.contacts.length == 0) {
                    handlePostContactToServer()
                    return;
                }
                setContactsInPhoneList(data);
            }
        } catch (error) {
            console.log("handleCheckIsHaveContactInDB: ", error);
        }
    }
    async function handlePostContactToServer() {
        const data = await handleGetContactsFromPhone();

        try {
            const resp = await fetch(LINK_PHONE_BOOK, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.accessToken}`
                },
                body: JSON.stringify({
                    phonebook: data
                })
            })
           
            
            if (resp.ok){
                const data = await resp.json() as IContactInServer;
                if (data.contacts.length > 0){
                    setContactsInPhoneList(data);
                } else {
                    setContactsInPhoneList({
                        contacts: contactsInPhoneList?.contacts,
                        updatedAt: data.updatedAt
                    } as IContactInServer)
                }
                
            }
        } catch (error) {
            console.log(
                "handlePostContactToServer: ",
                error
            )
        }
    }
    console.log("contactsInPhoneList: ", JSON.stringify(contactsInPhoneList));
    function classificationContactUserAll() {
        const sectionData: ISectionContact[] = [];
        contactsInPhoneList?.contacts?.forEach((contact) => {
            const firstChar = contact.name[0].toUpperCase();
            const index = sectionData.findIndex(
                (section) => section.title === firstChar
            );
            if (index !== -1) {
                sectionData[index].data.push(contact);
            } else {
                sectionData.push({
                    title: firstChar,
                    data: [contact],
                });
            }
        });
        setSectionAll(sectionData);
    }
    function classificationContactUserNotFriend() {
        const sectionData: ISectionContact[] = [];
        contactsInPhoneList?.contacts?.forEach((contact) => {
            if (!contact.isFriend) {
                const firstChar = contact.name[0].toUpperCase();
                const index = sectionData.findIndex(
                    (section) => section.title === firstChar
                );
                if (index !== -1) {
                    sectionData[index].data.push(contact);
                } else {
                    sectionData.push({
                        title: firstChar,
                        data: [contact],
                    });
                }
            }
        });
        setSectionNotFriend(sectionData);
    }
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
                const arrayData: string[] = [];
                Array.isArray(data) &&
                    data.forEach((element: any) => {
                        arrayData.push(element.receiver_id._id);
                    });
                console.log("arrayData::RequestFriend: ", arrayData)

                setUsersIdRequestFriend(arrayData);
            } else {
                setUsersIdRequestFriend([]);
            }
        } catch (error) {
            setUsersIdRequestFriend([]);
            throw error;
        }

    }
    async function handleOpenChatDetail(friendId: string) {
        try {
           
            const conversationResponse = await fetch(
                LINK_GET_MY_CONVERSATIONS,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.accessToken}`,
                    },
                    body: JSON.stringify({
                        receiverUserId: friendId,
                    }),
                }
            );
            if (conversationResponse.ok) {
                const conversationData = await conversationResponse.json();

                handleNavigateToChatDetail(
                    conversationData as IConversation,
                    setIsLoadingNavigate,
                    userInfo,
                    navigation
                );
            }
        } catch (error) {
            console.log("error", error);
        }
        
    }

    useEffect(() => {
        // handleCheckIsHaveContactInDB();
        // handlePostContactToServer()
        getUserInRequestFriendList();
        handleCheckIsHaveContactInDB();
    }, []);

    useEffect(()=>{
        if (contactsInPhoneList) {
            classificationContactUserAll();
            classificationContactUserNotFriend();
        }
    }, [contactsInPhoneList, usersIdRequestFriend])

    function checkIsInRequestFriendList(userId: string) {
        console.log("Thao: ", userId);
        
        return usersIdRequestFriend.some(id => id === userId);
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

                setUsersIdRequestFriend([...usersIdRequestFriend, userId]);
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
             
                setUsersIdRequestFriend(prev => {
                    return prev.filter(item => item !== userId)
                })
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


    function renderContactSectionItem({
        item,
        index,
    }: {
        item: IUserInContact;
        index: number;
    }) {
        return (
            <TouchableOpacity style={[styles.contactsInPhoneListContactItem]} key={index}
                onPress={()=> handleOpenChatDetail(item._id)}
            >
                <Image
                    source={{
                        uri: item.avatar,
                    }}
                    style={[styles.contactsInPhoneListContactAvatar]}
                />
                <View style={[styles.contactsInPhoneListContactInfo]}>
                    <Text
                        style={[
                            styles.contactsInPhoneNameInDevice,
                            {
                                color:
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText.color
                                        : commonStyles.darkPrimaryText.color,
                            },
                        ]}
                    >
                        {item.alias}
                    </Text>
                    <Text
                        style={[
                            styles.contactsInPhoneNameInApp,
                            {
                                color:
                                    theme === lightMode
                                        ? commonStyles.lightSecondaryText.color
                                        : commonStyles.darkSecondaryText.color,
                            },
                        ]}
                    >
                        {item.name}
                    </Text>
                </View>
                {!item.isFriend && (
                    checkIsInRequestFriendList(item._id) ? 
                    <TouchableOpacity
                        onPress={() => handleUndoAddFriend(item._id)}
                        disabled={isLoading}
                        style={[
                            styles.contactsInPhoneAddFriendBtn,
                            commonStyles.primaryColorBackground,
                        ]}
                    >
                        {
                            isLoading 
                            ?
                            <ActivityIndicator
                                style={{width: 55}}
                                size={"small"}
                                color={commonStyles.darkPrimaryText.color}
                            />
                            :
                            <Text
                            style={[
                                styles.contactsInPhoneBackBtnText,
                                commonStyles.primaryColor,
                            ]}
                        >
                            {t("contactInPhoneAddFriendUndoTitle")}
                        </Text>
                        }
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => handleAddFriend(item._id)}
                        disabled={isLoading}
                        style={[
                            styles.contactsInPhoneAddFriendBtn,
                            commonStyles.primaryColorBackground,
                        ]}
                    >
                        {
                            isLoading 
                            ?
                            <ActivityIndicator
                                style={{width: 55}}
                                size={"small"}
                                color={commonStyles.darkPrimaryText.color}
                            />
                            :
                            <Text
                                style={[
                                    styles.contactsInPhoneBackBtnText,
                                    commonStyles.primaryColor,
                                ]}
                            >
                                {t("contactInPhoneAddFriendTitle")}
                            </Text>
                        }
                        
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        );
    }

    return (
        <View
            style={[
                styles.contactsInPhoneWrapper,
                theme === lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
            ]}
        >
            <StatusBar />
            <SafeAreaView style={[styles.contactsInPhoneContainer]}>
                <View
                    style={[
                        styles.contactsInPhoneHeader,
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
                        onPress={() => navigation.goBack()}
                        style={[styles.contactsInPhoneBackBtn]}
                    >
                        <Image
                            source={require("../../assets/arrow-left-s-line-icon.png")}
                            style={[
                                styles.contactsInPhoneBackBtnIcon,
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
                            styles.contactsInPhoneContainerTitle,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {t("contactInPhoneTitle")}
                    </Text>
                </View>

                {isShowUpdateContactBox && (
                    <View style={[styles.contactsInPhoneLatestUpdateContainer]}>
                        <View
                            style={[
                                styles.contactsInPhoneLatestUpdateLeftContainer,
                            ]}
                        >
                            <View
                                style={[
                                    styles.contactsInPhoneLatestUpdateLeftFlowRow,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.latestUpdateLeftFlowRowText,
                                        {
                                            color:
                                                theme === lightMode
                                                    ? commonStyles
                                                          .lightPrimaryText
                                                          .color
                                                    : commonStyles
                                                          .darkPrimaryText
                                                          .color,
                                        },
                                    ]}
                                >
                                    {t("contactInPhoneLatestUpdate")}
                                </Text>
                                <Image
                                    source={require("../../assets/information-line-icon.png")}
                                    style={[
                                        styles.latestUpdateLeftFlowRowInfoIcon,
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
                                />
                            </View>
                            <Text
                                style={[
                                    styles.latestUpdateLeftTimeText,
                                    {
                                        color:
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryText
                                                      .color
                                                : commonStyles.darkPrimaryText
                                                      .color,
                                    },
                                ]}
                            >
                                {contactsInPhoneList?.updatedAt 
                                    &&
                                    new Date(contactsInPhoneList?.updatedAt || "").toLocaleString("vi-VN")
                                }
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={handlePostContactToServer}
                            style={[
                                styles.contactsInPhoneLatestUpdateBtn,
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
                                style={[
                                    styles.contactsInPhoneLatestUpdateBtnIcon,
                                    {
                                        tintColor:
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryText
                                                      .color
                                                : commonStyles.darkPrimaryText
                                                      .color,
                                    },
                                ]}
                                source={require("../../assets/loop-right-line-icon.png")}
                            />
                        </TouchableOpacity>
                    </View>
                )}

                {isShowUpdateContactBox && (
                    <View
                        style={[
                            styles.contactsInPhoneLineBreak,
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
                )}

                <View
                    style={[
                        styles.contactsInPhoneListContainer,
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
                    <View style={[styles.contactsInPhoneListHeader]}>
                        <View
                            style={[
                                styles.contactsInPhoneListSearchBox,
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
                                source={require("../../assets/search-line-icon.png")}
                                style={[
                                    styles.contactsInPhoneListSearchIcon,
                                    {
                                        tintColor:
                                            theme === lightMode
                                                ? commonStyles
                                                      .lightSecondaryText.color
                                                : commonStyles.darkSecondaryText
                                                      .color,
                                    },
                                ]}
                            />
                            <TextInput
                                placeholder={t(
                                    "registerPhoneInputSearchPlaceholder"
                                )}
                                placeholderTextColor={
                                    theme === lightMode
                                        ? commonStyles.lightSecondaryText.color
                                        : commonStyles.darkSecondaryText.color
                                }
                                style={[
                                    styles.contactsInPhoneListSearchInput,
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText,
                                ]}
                                onFocus={() => {
                                    isFocusTextInput.current = true;
                                    toggleFocusSearchBox(false);
                                }}
                                onBlur={() => {
                                    isFocusTextInput.current = false;
                                    toggleFocusSearchBox(true);
                                }}
                                onChangeText={text => setTextSearch(text)}
                            />
                        </View>
                        <View
                            style={[styles.contactsInPhoneListFilterContainer]}
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    setContactFilter(CONTACT_FILTERS.ALL)
                                }
                                style={[
                                    styles.contactsInPhoneListFilterBtn,
                                    {
                                        borderColor:
                                            contactFilter ===
                                            CONTACT_FILTERS.ALL
                                                ? theme === lightMode
                                                    ? commonStyles
                                                          .chatNavbarBorderBottomColorLight
                                                          .color
                                                    : commonStyles
                                                          .chatNavbarBorderBottomColorDark
                                                          .color
                                                : lightMode === theme
                                                ? commonStyles
                                                      .chatNavbarBorderBottomColorLight
                                                      .color
                                                : commonStyles
                                                      .chatNavbarBorderBottomColorDark
                                                      .color,
                                        backgroundColor:
                                            contactFilter ===
                                            CONTACT_FILTERS.ALL
                                                ? theme === lightMode
                                                    ? commonStyles
                                                          .chatNavbarBorderBottomColorLight
                                                          .color
                                                    : commonStyles
                                                          .chatNavbarBorderBottomColorDark
                                                          .color
                                                : lightMode === theme
                                                ? commonStyles
                                                      .lightBackgroundIconActive
                                                      .backgroundColor
                                                : commonStyles
                                                      .darkBackgroundIconActive
                                                      .backgroundColor,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.contactsInPhoneListFilterBtnText,
                                        {
                                            color:
                                                contactFilter ===
                                                CONTACT_FILTERS.ALL
                                                    ? theme === lightMode
                                                        ? commonStyles
                                                              .lightPrimaryText
                                                              .color
                                                        : commonStyles
                                                              .darkPrimaryText
                                                              .color
                                                    : lightMode === theme
                                                    ? commonStyles
                                                          .lightSecondaryText
                                                          .color
                                                    : commonStyles
                                                          .darkSecondaryText
                                                          .color,
                                        },
                                    ]}
                                >
                                    {t("contactInPhoneAllFilter")}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    setContactFilter(CONTACT_FILTERS.NOT_FRIEND)
                                }
                                style={[
                                    styles.contactsInPhoneListFilterBtn,
                                    {
                                        borderColor:
                                            contactFilter ===
                                            CONTACT_FILTERS.NOT_FRIEND
                                                ? theme === lightMode
                                                    ? commonStyles
                                                          .chatNavbarBorderBottomColorLight
                                                          .color
                                                    : commonStyles
                                                          .chatNavbarBorderBottomColorDark
                                                          .color
                                                : lightMode === theme
                                                ? commonStyles
                                                      .chatNavbarBorderBottomColorLight
                                                      .color
                                                : commonStyles
                                                      .chatNavbarBorderBottomColorDark
                                                      .color,
                                        backgroundColor:
                                            contactFilter ===
                                            CONTACT_FILTERS.NOT_FRIEND
                                                ? theme === lightMode
                                                    ? commonStyles
                                                          .chatNavbarBorderBottomColorLight
                                                          .color
                                                    : commonStyles
                                                          .chatNavbarBorderBottomColorDark
                                                          .color
                                                : lightMode === theme
                                                ? commonStyles
                                                      .lightBackgroundIconActive
                                                      .backgroundColor
                                                : commonStyles
                                                      .darkBackgroundIconActive
                                                      .backgroundColor,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.contactsInPhoneListFilterBtnText,
                                        {
                                            color:
                                                contactFilter ===
                                                CONTACT_FILTERS.NOT_FRIEND
                                                    ? theme === lightMode
                                                        ? commonStyles
                                                              .lightPrimaryText
                                                              .color
                                                        : commonStyles
                                                              .darkPrimaryText
                                                              .color
                                                    : lightMode === theme
                                                    ? commonStyles
                                                          .lightSecondaryText
                                                          .color
                                                    : commonStyles
                                                          .darkSecondaryText
                                                          .color,
                                        },
                                    ]}
                                >
                                    {t("contactInPhoneNotFriendFilter")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* <TouchableOpacity
                        style={[
                            styles.contactsInPhoneListContactItem,
                            
                        ]}
                    >
                        <Image
                            source={{uri: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"}}
                            style={[
                                styles.contactsInPhoneListContactAvatar
                            ]}
                        />
                        <View
                            style={[
                                styles.contactsInPhoneListContactInfo
                            ]}
                        >
                            <Text
                                style={[
                                    styles.contactsInPhoneNameInDevice,
                                    {
                                        color: theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText.color
                                        :
                                        commonStyles.darkPrimaryText.color
                                    }
                                ]}
                            >Nguyễn Văn A</Text>
                            <Text
                                style={[
                                    styles.contactsInPhoneNameInApp,
                                    {
                                        color: theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    }
                                ]}
                            >Nguyễn Văn A</Text>
                        </View>
                        <TouchableOpacity
                            style={[
                                styles.contactsInPhoneAddFriendBtn,
                                commonStyles.primaryColorBackground
                            ]}
                        >
                            <Text
                                style={[
                                    styles.contactsInPhoneBackBtnText,
                                    commonStyles.primaryColor
                                ]}
                            >{t("contactInPhoneAddFriendTitle")}</Text>
                        </TouchableOpacity>
                </TouchableOpacity> */}
                <SectionList
                    onScroll={(evt) => {
                        if (evt.nativeEvent.contentOffset.y > 5) {
                            refPageYOfScrollSection.current =
                                evt.nativeEvent.contentOffset.y;
                            toggleFocusSearchBox(false);
                        } else {
                            refPageYOfScrollSection.current =
                                evt.nativeEvent.contentOffset.y;
                            toggleFocusSearchBox(true);
                        }
                    }}
                    style={[
                        {
                            paddingVertical: 10,
                        },
                    ]}
                    sections={
                        contactFilter == CONTACT_FILTERS.ALL
                            ? 
                                textSearch.trim().length > 0
                                ?
                                    sectionAll.map(section => {
                                        return {
                                            title: section.title,
                                            data: section.data.filter(
                                                item => item.name.toLowerCase().includes(textSearch.toLowerCase()) || item.alias.toLowerCase().includes(textSearch.toLowerCase())
                                            )
                                        }
                                    })
                                :
                                sectionAll
                            : textSearch.trim().length > 0
                                    ?
                                        sectionNotFriend.map(section => {
                                            return {
                                                title: section.title,
                                                data: section.data.filter(
                                                    item => item.name.toLowerCase().includes(textSearch.toLowerCase()) || item.alias.toLowerCase().includes(textSearch.toLowerCase())
                                                )
                                            }
                                        })
                                    :
                                        sectionNotFriend
                                    
                    }
                    renderItem={renderContactSectionItem}
                    keyExtractor={(item, index) => index.toString()}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text
                            style={[
                                styles.contactsInPhoneListSectionTitle,
                                {
                                    color:
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                                  .color
                                            : commonStyles.darkPrimaryText
                                                  .color,
                                },
                            ]}
                        >
                            {title}
                        </Text>
                    )}
                />
            </SafeAreaView>
        </View>
    );
}
