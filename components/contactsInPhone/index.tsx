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
} from "react-native";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import { useEffect, useRef, useState } from "react";
import * as Contacts from "expo-contacts";
import { LINK_PHONE_BOOK } from "@env";
import { IContactInServer, IUserInContact } from "../../configs/interfaces";

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
                console.log(resp.status)
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

    useEffect(() => {
        // handleCheckIsHaveContactInDB();
        // handlePostContactToServer()

        handleCheckIsHaveContactInDB();
    }, []);

    useEffect(()=>{
        if (contactsInPhoneList) {
            classificationContactUserAll();
            classificationContactUserNotFriend();
        }
    }, [contactsInPhoneList])

    console.log("sectionNotFriend: ", JSON.stringify(sectionNotFriend));

    function renderContactSectionItem({
        item,
        index,
    }: {
        item: IUserInContact;
        index: number;
    }) {
        return (
            <TouchableOpacity style={[styles.contactsInPhoneListContactItem]} key={index}>
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
                    <TouchableOpacity
                        style={[
                            styles.contactsInPhoneAddFriendBtn,
                            commonStyles.primaryColorBackground,
                        ]}
                    >
                        <Text
                            style={[
                                styles.contactsInPhoneBackBtnText,
                                commonStyles.primaryColor,
                            ]}
                        >
                            {t("contactInPhoneAddFriendTitle")}
                        </Text>
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
