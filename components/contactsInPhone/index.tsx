import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, Image, TextInput, SectionList, Platform, UIManager, LayoutAnimation, Animated } from 'react-native'
import { useSelector } from 'react-redux'
import { IRootState } from '../../redux_toolkit/store'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
import { lightMode } from '../../redux_toolkit/slices/theme.slice'
import commonStyles from '../../CommonStyles/commonStyles'
import { useRef, useState } from 'react'


interface IContactsInPhoneProps {
    navigation: any
}

const CONTACT_FILTERS = {
    ALL: "all",
    NOT_FRIEND: "notFriend"
}

export default function ContactsInPhone({navigation} : IContactsInPhoneProps) {
    const theme = useSelector((state: IRootState) => state.theme.theme)
    const {t} = useTranslation() ;
    const [contactFilter, setContactFilter] = useState(CONTACT_FILTERS.ALL)
    const [isShowUpdateContactBox, setIsShowUpdateContactBox] = useState(true)
    const isFocusTextInput = useRef<boolean>(false)
    const refPageYOfScrollSection = useRef<number>(0);

    const sectionData = [
        {
            title: "A",
            data: [
                {
                    name: "A Bắc",
                    image: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                    nickName: "Bắc Hoàng",
                    isFriend: true
                },
                {
                    name: "A Hắc",
                    image: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                    nickName: "Hắc Hoàng",
                    isFriend: true
                }
            ]
        },
        {
            title: "B",
            data: [
                {
                    name: "B Bắc",
                    image: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                    nickName: "Bắc Hoàng",
                    isFriend: false
                },
                {
                    name: "A Bắc",
                    image: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                    nickName: "Bắc Hoàng",
                    isFriend: true
                },
                {
                    name: "A Hắc",
                    image: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                    nickName: "Hắc Hoàng",
                    isFriend: true
                },
                {
                    name: "A Bắc",
                    image: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                    nickName: "Bắc Hoàng",
                    isFriend: true
                },
                {
                    name: "A Hắc",
                    image: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                    nickName: "Hắc Hoàng",
                    isFriend: true
                }
            ]
        },
        {
            title: "C",
            data: [
                {
                    name: "C Bắc",
                    image: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                    nickName: "Bắc Hoàng",
                    isFriend: true
                },
                {
                    name: "B Bắc",
                    image: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                    nickName: "Bắc Hoàng",
                    isFriend: false
                },
                {
                    name: "A Bắc",
                    image: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                    nickName: "Bắc Hoàng",
                    isFriend: true
                },
                {
                    name: "A Hắc",
                    image: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                    nickName: "Hắc Hoàng",
                    isFriend: true
                },
                {
                    name: "A Bắc",
                    image: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                    nickName: "Bắc Hoàng",
                    isFriend: true
                },
                {
                    name: "A Hắc",
                    image: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                    nickName: "Hắc Hoàng",
                    isFriend: true
                }
            ]
        }
    ]

    if(Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    function toggleFocusSearchBox(value : boolean){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        // setIsShowUpdateContactBox(value)
        if (value === false){
            setIsShowUpdateContactBox(false)
        } else {
            if (!isFocusTextInput.current && refPageYOfScrollSection.current <= 5) {
                setIsShowUpdateContactBox(true)
            }
        }
    }

    function renderContactSectionItem({item, index} : {item: any, index: number}) {
        return (
            <TouchableOpacity
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
                        {
                            !item.isFriend
                            &&
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
                        }
            </TouchableOpacity>
        )
    }

    return (
        <View
            style={[
                styles.contactsInPhoneWrapper,
                theme === lightMode
                ?
                commonStyles.lightPrimaryBackground
                :
                commonStyles.darkPrimaryBackground
            ]}
        >
            <StatusBar/>
            <SafeAreaView
                style={[
                    styles.contactsInPhoneContainer
                ]}
            >
                <View
                    style={[
                        styles.contactsInPhoneHeader,
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
                        onPress={()=> navigation.goBack()}

                        style={[
                            styles.contactsInPhoneBackBtn,
                        ]}
                    >
                        <Image
                            source={require("../../assets/arrow-left-s-line-icon.png")}
                            style={[
                                styles.contactsInPhoneBackBtnIcon,
                                {
                                    tintColor: theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText.color
                                    :
                                    commonStyles.darkPrimaryText.color
                                }
                            ]}
                        />
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.contactsInPhoneContainerTitle,
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText
                            :
                            commonStyles.darkPrimaryText
                        ]}
                    >{t("contactInPhoneTitle")}</Text>
                </View>

                {
                    isShowUpdateContactBox
                    &&
                    <View
                        style={[
                            styles.contactsInPhoneLatestUpdateContainer,
                        ]}
                    >
                        <View
                            style={[
                                styles.contactsInPhoneLatestUpdateLeftContainer
                            ]}
                        >
                            <View
                                style={[
                                    styles.contactsInPhoneLatestUpdateLeftFlowRow
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.latestUpdateLeftFlowRowText,
                                        {
                                            color: theme === lightMode
                                            ?
                                            commonStyles.lightPrimaryText.color
                                            :
                                            commonStyles.darkPrimaryText.color
                                        }
                                    ]}
                                >{t("contactInPhoneLatestUpdate")}</Text>
                                <Image
                                    source={require("../../assets/information-line-icon.png")}
                                    style={[
                                        styles.latestUpdateLeftFlowRowInfoIcon,
                                        {
                                            tintColor: theme === lightMode
                                            ?
                                            commonStyles.lightPrimaryText.color
                                            :
                                            commonStyles.darkPrimaryText.color
                                        }
                                    ]}
                                />
                            </View>
                            <Text
                                style={[
                                    styles.latestUpdateLeftTimeText,
                                    {
                                        color: theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText.color
                                        :
                                        commonStyles.darkPrimaryText.color
                                    }
                                ]}
                            >14/02/2024 08:38</Text>
                        </View>
                        <TouchableOpacity   
                            style={[
                                styles.contactsInPhoneLatestUpdateBtn,
                                {
                                    backgroundColor: theme === lightMode
                                    ?
                                    commonStyles.chatNavbarBorderBottomColorLight.color
                                    :
                                    commonStyles.chatNavbarBorderBottomColorDark.color
                                }
                            ]}
                        >
                            <Image
                                style={[
                                    styles.contactsInPhoneLatestUpdateBtnIcon,
                                ]}
                                source={require("../../assets/loop-right-line-icon.png")}
                            />
                        </TouchableOpacity>
                    </View>
                }

                {
                    isShowUpdateContactBox
                    &&
                    <View
                        style={[
                            styles.contactsInPhoneLineBreak,
                            {
                                backgroundColor: theme === lightMode
                                ?
                                commonStyles.lightTertiaryBackground.backgroundColor
                                :
                                commonStyles.darkTertiaryBackground.backgroundColor
                            }
                        ]}
                    ></View>
                }

                <View
                    style={[
                        styles.contactsInPhoneListContainer,
                        {
                            borderBottomColor: theme === lightMode
                            ?
                            commonStyles.chatNavbarBorderBottomColorLight.color
                            :
                            commonStyles.chatNavbarBorderBottomColorDark.color
                        }
                    ]}
                >
                    <View
                        style={[
                            styles.contactsInPhoneListHeader
                        ]}
                    >
                        <View
                            style={[
                                styles.contactsInPhoneListSearchBox,
                                {
                                    backgroundColor:
                                    theme === lightMode
                                    ?
                                    commonStyles.chatNavbarBorderBottomColorLight.color
                                    :
                                    commonStyles.chatNavbarBorderBottomColorDark.color
                                }
                            ]}
                        >
                            <Image
                                source={require("../../assets/search-line-icon.png")}
                                style={[
                                    styles.contactsInPhoneListSearchIcon,
                                    {
                                        tintColor: theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    }
                                ]}
                            />
                            <TextInput
                                placeholder={t("registerPhoneInputSearchPlaceholder")}
                                placeholderTextColor={
                                    theme === lightMode
                                    ?
                                    commonStyles.lightSecondaryText.color
                                    :
                                    commonStyles.darkSecondaryText.color
                                }
                                style={[
                                    styles.contactsInPhoneListSearchInput,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                                onFocus={()=>{
                                    isFocusTextInput.current = true
                                    toggleFocusSearchBox(false)
                                }}
                                onBlur={()=>{
                                    isFocusTextInput.current = false
                                    toggleFocusSearchBox(true)
                                }}
                            />
                        </View>
                        <View
                            style={[
                                styles.contactsInPhoneListFilterContainer           
                            ]}
                        >
                            <TouchableOpacity
                                onPress={()=> setContactFilter(CONTACT_FILTERS.ALL)}
                                style={[
                                    styles.contactsInPhoneListFilterBtn,
                                    {
                                        borderColor:
                                        contactFilter === CONTACT_FILTERS.ALL
                                        ?
                                            theme === lightMode
                                            ?
                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                            :
                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                        :
                                            lightMode === theme
                                            ?
                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                            :
                                            commonStyles.chatNavbarBorderBottomColorDark.color,
                                        backgroundColor:
                                        contactFilter === CONTACT_FILTERS.ALL
                                        ?
                                            theme === lightMode
                                            ?
                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                            :
                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                        :
                                            lightMode === theme
                                            ?
                                            commonStyles.lightBackgroundIconActive.backgroundColor
                                            :
                                            commonStyles.darkBackgroundIconActive.backgroundColor
                                    }
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.contactsInPhoneListFilterBtnText,{
                                        color:
                                            contactFilter === CONTACT_FILTERS.ALL
                                            ?
                                                theme === lightMode
                                                ?
                                                commonStyles.lightPrimaryText.color
                                                :
                                                commonStyles.darkPrimaryText.color
                                            :
                                                lightMode === theme
                                                ?
                                                commonStyles.lightSecondaryText.color
                                                :
                                                commonStyles.darkSecondaryText.color
                                        }
                                        
                                    ]}
                                >{t("contactInPhoneAllFilter")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=> setContactFilter(CONTACT_FILTERS.NOT_FRIEND)}
                                style={[
                                    styles.contactsInPhoneListFilterBtn,
                                    {
                                        borderColor:
                                        contactFilter === CONTACT_FILTERS.NOT_FRIEND
                                        ?
                                            theme === lightMode
                                            ?
                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                            :
                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                        :
                                            lightMode === theme
                                            ?
                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                            :
                                            commonStyles.chatNavbarBorderBottomColorDark.color,
                                        backgroundColor:
                                        contactFilter === CONTACT_FILTERS.NOT_FRIEND
                                        ?
                                            theme === lightMode
                                            ?
                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                            :
                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                        :
                                            lightMode === theme
                                            ?
                                            commonStyles.lightBackgroundIconActive.backgroundColor
                                            :
                                            commonStyles.darkBackgroundIconActive.backgroundColor
                                    }
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.contactsInPhoneListFilterBtnText,{
                                        color:
                                            contactFilter === CONTACT_FILTERS.NOT_FRIEND
                                            ?
                                                theme === lightMode
                                                ?
                                                commonStyles.lightPrimaryText.color
                                                :
                                                commonStyles.darkPrimaryText.color
                                            :
                                                lightMode === theme
                                                ?
                                                commonStyles.lightSecondaryText.color
                                                :
                                                commonStyles.darkSecondaryText.color
                                        }
                                        
                                    ]}
                                >{t("contactInPhoneNotFriendFilter")}</Text>
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
                    onScroll={(evt)=>{
                        if (evt.nativeEvent.contentOffset.y > 5) {
                            refPageYOfScrollSection.current = evt.nativeEvent.contentOffset.y
                            toggleFocusSearchBox(false)
                            
                        } else {
                            refPageYOfScrollSection.current = evt.nativeEvent.contentOffset.y
                            toggleFocusSearchBox(true)
                            
                        }
                    }}
                    style={[
                        {
                            paddingVertical: 10,

                        }
                    ]}
                    
                    sections={
                        contactFilter == CONTACT_FILTERS.ALL
                        ?
                        sectionData
                        :
                        sectionData.filter((section) => section.data.some((item) => !item.isFriend))    
                    }
                    renderItem={renderContactSectionItem}
                    keyExtractor={(item, index) => index.toString()}
                    renderSectionHeader={({section: {title}}) => (
                        <Text
                            style={[
                                styles.contactsInPhoneListSectionTitle,
                                {
                                    color: theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText.color
                                    :
                                    commonStyles.darkPrimaryText.color
                                }
                            ]}
                        >{title}</Text>
                    )}
                />
            </SafeAreaView>
        </View>
    )
}