import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { IRootState } from '../../redux_toolkit/store'
import { lightMode } from '../../redux_toolkit/slices/theme.slice'
import commonStyles from '../../CommonStyles/commonStyles'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import { useState } from 'react'
import Checkbox from 'expo-checkbox'
import OutsidePressHandler from 'react-native-outside-press'

interface SearchDetailPopupProps {
    textSearch: string,
    setTextSearch: (search: string) => void,
    heightFromHeaderToInput: number,
    isPressOutsideTextInput: boolean,
    setHeightFromHeaderToInput: (height: number) => void,
}

export default function SearchDetailPopup({textSearch, setTextSearch, heightFromHeaderToInput, isPressOutsideTextInput} : SearchDetailPopupProps ) {
    const theme = useSelector((state : IRootState) => state.theme.theme);
    const {t} = useTranslation();
    const {navigate, goBack} = useNavigation();
    const [isPressOutsidePopup, setIsPressOutsidePopup] = useState(false);

    return (
            ((!isPressOutsideTextInput || !isPressOutsidePopup) && heightFromHeaderToInput)
            ?
            <OutsidePressHandler
                onOutsidePress={()=>{
                    setIsPressOutsidePopup(true)

                }}
                style={[
                    styles.detailSearchPopUpWrapper,
                    theme === lightMode
                    ?
                    commonStyles.lightPrimaryBackground
                    :
                    commonStyles.darkPrimaryBackground,
                    {
                        marginTop: heightFromHeaderToInput + 10 + 15
                    }
                ]}
            >
                <View
                    onTouchStart={()=> setIsPressOutsidePopup(false)}
                    style={{
                        flex: 1,
                    }}
                >
                    {
                        textSearch.trim() 
                        ?
                        <DetailSearchPopUpSearchNotEmpty
                            translation={t}
                            theme={theme}
                            navigate={navigate}
                        />
                        :
                        <DetailSearchPopUpSearchEmpty translation={t} theme={theme} navigate={navigate}/>
                    }
                </View>
            </OutsidePressHandler>
        :
        <View></View>
        
    )
}

interface DetailSearchPopUpSearchEmptyProps {
    translation: TFunction<"translation", undefined>,
    theme: string,
    navigate: any,
}

function DetailSearchPopUpSearchEmpty({translation : t, theme, navigate} : DetailSearchPopUpSearchEmptyProps){
    return (
        <View
            style={[
                styles.detailSearchPopUpSearchEmptyWrapper,
            ]}
        >
            <ScrollView>
                <View
                    style={[
                        styles.detailSearchPopUpSearchEmptyContainer,
                        {
                            borderBottomColor: theme === lightMode
                            ?
                            commonStyles.chatNavbarBorderBottomColorLight.color
                            :
                            commonStyles.chatNavbarBorderBottomColorDark.color
                        }
                    ]}
                >
                    <Text
                        style={[
                            styles.detailSearchPopupSearchEmptyTitle,
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText
                            :
                            commonStyles.darkPrimaryText
                        ]}
                    >{t("searchDetailPopupContactFound")}</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={
                            styles.detailSearchPopUpSearchEmptyUserList
                        }
                    >
                        <TouchableOpacity
                            onPress={()=>console.log("Open Chat Detail")}
                            style={[
                                styles.detailSearchPopUpSearchEmptyUserSearched,
                            ]}
                        >
                            <Image
                                source={{uri: "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/9/4/a940fe649d1d5bb4355b3dc5ccdee540bb7d2929.png"}}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyUserSearchedAvatar
                                ]}
                            />
                            <Text
                                numberOfLines={2}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyUserSearchedName,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >Đăng Dương</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>console.log("Open Chat Detail")}
                            style={[
                                styles.detailSearchPopUpSearchEmptyUserSearched,
                            ]}
                        >
                            <Image
                                source={{uri: "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/9/4/a940fe649d1d5bb4355b3dc5ccdee540bb7d2929.png"}}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyUserSearchedAvatar
                                ]}
                            />
                            <Text
                                numberOfLines={2}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyUserSearchedName,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >Đăng Dương</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>console.log("Open Chat Detail")}
                            style={[
                                styles.detailSearchPopUpSearchEmptyUserSearched,
                            ]}
                        >
                            <Image
                                source={{uri: "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/9/4/a940fe649d1d5bb4355b3dc5ccdee540bb7d2929.png"}}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyUserSearchedAvatar
                                ]}
                            />
                            <Text
                                numberOfLines={2}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyUserSearchedName,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >Đăng Dươngaaaaaaaaaaaaaaaaaaaaaa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>console.log("Open Chat Detail")}
                            style={[
                                styles.detailSearchPopUpSearchEmptyUserSearched,
                            ]}
                        >
                            <Image
                                source={{uri: "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/9/4/a940fe649d1d5bb4355b3dc5ccdee540bb7d2929.png"}}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyUserSearchedAvatar
                                ]}
                            />
                            <Text
                                numberOfLines={2}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyUserSearchedName,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >Đăng Dương</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>console.log("Open Chat Detail")}
                            style={[
                                styles.detailSearchPopUpSearchEmptyUserSearched,
                            ]}
                        >
                            <Image
                                source={{uri: "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/9/4/a940fe649d1d5bb4355b3dc5ccdee540bb7d2929.png"}}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyUserSearchedAvatar
                                ]}
                            />
                            <Text
                                numberOfLines={2}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyUserSearchedName,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >Đăng Dương</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>console.log("Open Chat Detail")}
                            style={[
                                styles.detailSearchPopUpSearchEmptyUserSearched,
                            ]}
                        >
                            <Image
                                source={{uri: "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/9/4/a940fe649d1d5bb4355b3dc5ccdee540bb7d2929.png"}}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyUserSearchedAvatar
                                ]}
                            />
                            <Text
                                numberOfLines={2}
                                style={[
                                    styles.detailSearchPopUpSearchEmptyUserSearchedName,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >Đăng Dương</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View
                    style={[
                        styles.detailSearchPopUpSearchEmptyContainer,
                        {
                            borderBottomColor: theme === lightMode
                            ?
                            commonStyles.chatNavbarBorderBottomColorLight.color
                            :
                            commonStyles.chatNavbarBorderBottomColorDark.color
                        }
                    ]}
                >
                    <Text
                        style={[
                            styles.detailSearchPopupSearchEmptyTitle,
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText
                            :
                            commonStyles.darkPrimaryText
                        ]}
                    >{t("searchDetailKeywordSearched")}</Text>
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
                                        ?
                                        commonStyles.lightPrimaryText.color
                                        :
                                        commonStyles.darkPrimaryText.color
                                    }
                                ]}
                            />
                            <Text
                                style={[
                                    styles.detailSearchPopUpSearchEmptyKeywordSearchedItemText,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >Cloud</Text>
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
                                        ?
                                        commonStyles.lightPrimaryText.color
                                        :
                                        commonStyles.darkPrimaryText.color
                                    }
                                ]}
                            />
                            <Text
                                style={[
                                    styles.detailSearchPopUpSearchEmptyKeywordSearchedItemText,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >Cloud</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>

                <TouchableOpacity
                    style={[
                        styles.detailSearchPopUpSearchEmptyBtnEditSearchHistory,
                    ]}
                >
                    <Text
                        style={[
                            styles.detailSearchPopUpSearchEmptyBtnEditSearchHistoryText,
                            commonStyles.primaryColor
                        ]}
                    >{t("searchDetailEditSearchHistory")}</Text>
                    <Image
                        source={require("../../assets/arrow-right-s-line.png")}
                        style={[
                            styles.detailSearchPopUpSearchEmptyBtnEditSearchHistoryIcon,
                            {
                                tintColor: commonStyles.primaryColor.color
                            }
                        ]}
                    />
                </TouchableOpacity>
            </ScrollView>
        </View>     
    )
}

export const TypeSearch = {
    all: "all",
    contact: "contact",
    message: "message",
}

interface DetailSearchPopUpSearchNotEmptyProps {
    translation: TFunction<"translation", undefined>,
    theme: string,
    navigate: any,
}

function DetailSearchPopUpSearchNotEmpty({translation : t, theme, navigate} : DetailSearchPopUpSearchNotEmptyProps){
    const [typeSelected, setTypeSelected] = useState(TypeSearch.all);
    const [checkedLink, setCheckedLink] = useState(false);
    const [checkedFile, setCheckedFile] = useState(false);

    return (
        <View
            style={[
                styles.detailSearchPopUpSearchNotEmptyWrapper,
            ]}
        >
            <View
                style={[
                    styles.detailSearchPopUpSearchNotEmptyTypeFilter,
                ]}
            >
                <TouchableOpacity
                    style={[
                        styles.detailSearchPopUpSearchNotEmptyTypeFilterBtn
                    ]}
                    onPress={()=>setTypeSelected(TypeSearch.all)}
                >
                    <Text
                        style={[
                            styles.detailSearchPopupSearchEmptyTitleBtnText,
                            {
                                borderBottomColor: typeSelected === TypeSearch.all
                                ?
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText.color
                                    :
                                    commonStyles.darkPrimaryText.color
                                :
                                "transparent"
                                
                            },
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText
                            :
                            commonStyles.darkPrimaryText
                        ]}
                    >{t("searchDetailAllTitle")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>setTypeSelected(TypeSearch.contact)}
                    style={[
                        styles.detailSearchPopUpSearchNotEmptyTypeFilterBtn,
                        
                    ]}
                >
                    <Text
                        style={[
                            styles.detailSearchPopupSearchEmptyTitleBtnText,
                            {
                                borderBottomColor: typeSelected === TypeSearch.contact
                                ?
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText.color
                                    :
                                    commonStyles.darkPrimaryText.color
                                :
                                "transparent"
                                
                            },
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText
                            :
                            commonStyles.darkPrimaryText
                        ]}
                    >{t("searchDetailContactTitle")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>setTypeSelected(TypeSearch.message)}
                    style={[
                        styles.detailSearchPopUpSearchNotEmptyTypeFilterBtn,
                        
                    ]}
                >
                    <Text
                        style={[
                            styles.detailSearchPopupSearchEmptyTitleBtnText,
                            {
                                borderBottomColor: typeSelected === TypeSearch.message
                                ?
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText.color
                                    :
                                    commonStyles.darkPrimaryText.color
                                :
                                "transparent"
                                
                            },
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText
                            :
                            commonStyles.darkPrimaryText
                        ]}
                    >{t("searchDetailMessageTitle")}</Text>
                </TouchableOpacity>
                
            </View>
            <ScrollView
                style={[
                    styles.detailSearchPopUpSearchNotEmptyScrollWrapper,
                ]}
            >
                {
                    typeSelected === TypeSearch.all
                    &&
                    <View>
                        <View
                            style={[
                                styles.detailSearchPopupSearchEmptyAllWrapper
                            ]}
                        >      
                            <Text
                                style={[
                                    styles.detailSearchPopupSearchEmptyAllTitle,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >{t("searchDetailContactTitle") + " "}
                                <Text
                                    style={[
                                        styles.detailSearchPopupSearchEmptyAllMatchedNumber,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >(2)</Text>
                            </Text>
                            <View
                                style={[
                                    styles.detailSearchPopUpSearchNotEmptyAllContactList,
                                
                                ]}
                            >
                                <TouchableOpacity   
                                    style={[
                                        styles.detailSearchPopUpSearchNotEmptyAllContactItem,
                                        {
                                            borderBottomColor: theme === lightMode
                                            ?
                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                            :
                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                        }
                                    ]}
                                >
                                    <Image
                                        source={{uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg"}}
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemAvatar
                                        ]}
                                    />
                                    <View
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemContent
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentNameWrapper
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >Dương</Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameMatched
                                                ]}
                                            >Vũ</Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >Đăng</Text>
                                        </View>
                                        <Text
                                            numberOfLines={1}
                                            lineBreakMode='tail'
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentLocation, ,
                                                theme === lightMode
                                                ?
                                                commonStyles.lightSecondaryText
                                                :
                                                commonStyles.darkSecondaryText
                                            ]}
                                        >
                                            Chung nhóm: Nhập môn dữ liệu lớn
                                        </Text>
                                    </View>
                                    <View>
                                        {/* <TouchableOpacity
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
                                        </TouchableOpacity> */}
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
                                </TouchableOpacity>
                                <TouchableOpacity   
                                    style={[
                                        styles.detailSearchPopUpSearchNotEmptyAllContactItem,
                                        {
                                            borderBottomColor: theme === lightMode
                                            ?
                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                            :
                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                        }
                                    ]}
                                >
                                    <Image
                                        source={{uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg"}}
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemAvatar
                                        ]}
                                    />
                                    <View
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemContent
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentNameWrapper
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >Dương</Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameMatched
                                                ]}
                                            >Vũ</Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >Đăng</Text>
                                        </View>
                                        <Text
                                            numberOfLines={1}
                                            lineBreakMode='tail'
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentLocation, ,
                                                theme === lightMode
                                                ?
                                                commonStyles.lightSecondaryText
                                                :
                                                commonStyles.darkSecondaryText
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
                                        {/* <TouchableOpacity
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendBtn
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendText
                                                ]}
                                            >{t("searchDetailAddFriendText")}</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity   
                                    style={[
                                        styles.detailSearchPopUpSearchNotEmptyAllContactItem,
                                        {
                                            borderBottomColor: theme === lightMode
                                            ?
                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                            :
                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                        }
                                    ]}
                                >
                                    <Image
                                        source={{uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg"}}
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemAvatar
                                        ]}
                                    />
                                    <View
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemContent
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentNameWrapper
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >Dương</Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameMatched
                                                ]}
                                            >Cộng</Text>
                                            
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
                                        {/* <TouchableOpacity
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendBtn
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendText
                                                ]}
                                            >{t("searchDetailAddFriendText")}</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity   
                                    style={[
                                        styles.detailSearchPopUpSearchNotEmptyAllContactItem,
                                        {
                                            borderBottomColor: theme === lightMode
                                            ?
                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                            :
                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                        }
                                    ]}
                                >
                                    <Image
                                        source={{uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg"}}
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemAvatar
                                        ]}
                                    />
                                    <View
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemContent
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentNameWrapper
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >Nhóm - CNM</Text>
                                            
                                        </View>
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentInGroupWrapper
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentInGroupNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText
                                                    :
                                                    commonStyles.darkSecondaryText
                                                ]}
                                            >{t("searchDetailMemberTitle")}</Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentInGroupMatched
                                                ]}
                                            >Văn</Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentInGroupNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText
                                                    :
                                                    commonStyles.darkSecondaryText
                                                ]}
                                            >Dương</Text>
                                        </View>
                                    </View>
                                    <View>
                                        {/* <TouchableOpacity
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
                                        </TouchableOpacity> */}
                                        {/* <TouchableOpacity
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendBtn
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendText
                                                ]}
                                            >{t("searchDetailAddFriendText")}</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.detailSearchPopUpSearchEmptyBtnSeeMore
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.detailSearchPopUpSearchEmptyBtnSeeMoreText,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >
                                    {t("searchDetailSeeMore")}
                                </Text>
                                <Image
                                    source={require("../../assets/arrow-right-s-line.png")}
                                    tintColor={
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    }
                                />
                            </TouchableOpacity>
                            
                        </View>
                        <View
                            style={{
                                height: 10,
                                width: "100%",
                                backgroundColor: theme === lightMode
                                ?
                                commonStyles.lightTertiaryBackground.backgroundColor
                                :
                                commonStyles.darkTertiaryBackground.backgroundColor
                            }}
                        >
                            
                        </View>
                        <View
                            style={[
                                styles.detailSearchPopupSearchEmptyAllWrapper
                            ]}
                        >      
                            <Text
                                style={[
                                    styles.detailSearchPopupSearchEmptyAllTitle,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >{t("searchDetailMessageTitle") + " "}
                                <Text
                                    style={[
                                        styles.detailSearchPopupSearchEmptyAllMatchedNumber,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >(2)</Text>
                            </Text>
                            <View
                                style={[
                                    styles.detailSearchPopUpSearchNotEmptyAllMessageList,
                                ]}
                            >
                                <TouchableOpacity
                                    style={[
                                        styles.detailSearchPopUpSearchNotEmptyAllMessageItem,
                                        {
                                            borderBottomColor: theme === lightMode
                                            ?
                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                            :
                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                        }
                                    ]}
                                >
                                    <Image
                                        source={{uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg"}}
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllMessageItemAvatar,

                                        ]}
                                    />
                                    <View
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllMessageItemContent
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllMessageItemContentNameWrapper
                                            ]}
                                        >
                                            <View>
                                                <Text
                                                    style={[
                                                        styles.detailSearchPopUpSearchNotEmptyAllMessageItemName,
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.lightPrimaryText
                                                        :
                                                        commonStyles.darkPrimaryText
                                                    ]}
                                                >Nhóm CMN</Text>
                                                <View
                                                    style={[
                                                        styles.detailSearchPopUpSearchNotEmptyAllMessageContent
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.detailSearchPopUpSearchNotEmptyAllMessageContentNormal,
                                                            theme === lightMode
                                                            ?
                                                            commonStyles.lightSecondaryText
                                                            :
                                                            commonStyles.darkSecondaryText
                                                        ]}
                                                    >xem có</Text>
                                                    <Text
                                                        style={[
                                                            styles.detailSearchPopUpSearchNotEmptyAllMessageContentMatched,
                                                        ]}
                                                    > vu</Text>
                                                    <Text
                                                        style={[
                                                            styles.detailSearchPopUpSearchNotEmptyAllMessageContentNormal,
                                                            theme === lightMode
                                                            ?
                                                            commonStyles.lightSecondaryText
                                                            :
                                                            commonStyles.darkSecondaryText
                                                        ]}
                                                    >i không</Text>
                                                </View>
                                            </View>
                                            <Text
                                                style={[
                                                    styles.detailSearchPopUpSearchNotEmptyAllMessageTime,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText
                                                    :
                                                    commonStyles.darkSecondaryText
                                                ]}
                                            >04:45</Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllMessageMatchedResultWrapper
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.detailSearchPopupSearchEmptyAllMatchedNumberTotal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >99+</Text>
                                            <Text
                                                style={[
                                                    styles.detailSearchPopupSearchEmptyAllMatchedNumberTitle,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >{t("searchDetailMatchedResult")}</Text>
                                            <Image
                                                source={require("../../assets/arrow-right-s-line.png")}
                                                style={[
                                                    {
                                                        height: 23, width: 23,
                                                        tintColor: theme === lightMode
                                                        ?
                                                        commonStyles.lightSecondaryText.color
                                                        :
                                                        commonStyles.darkSecondaryText.color
                                                    }
                                                ]}
                                            />
                                        </View>
                                    </View>
                                    
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.detailSearchPopUpSearchEmptyBtnSeeMore
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.detailSearchPopUpSearchEmptyBtnSeeMoreText,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >
                                    {t("searchDetailSeeMore")}
                                </Text>
                                <Image
                                    source={require("../../assets/arrow-right-s-line.png")}
                                    tintColor={
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                height: 10,
                                width: "100%",
                                backgroundColor: theme === lightMode
                                ?
                                commonStyles.lightTertiaryBackground.backgroundColor
                                :
                                commonStyles.darkTertiaryBackground.backgroundColor
                            }}
                        >
                            
                        </View>
                    </View>

                }
                {
                    typeSelected === TypeSearch.contact
                    &&
                    <View>
                        <View
                            style={[
                                styles.detailSearchPopupSearchEmptyAllWrapper
                            ]}
                        >      
                            <Text
                                style={[
                                    styles.detailSearchPopupSearchEmptyAllTitle,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >{t("searchDetailContactTabFriend") + " "}
                                <Text
                                    style={[
                                        styles.detailSearchPopupSearchEmptyAllMatchedNumber,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >(2)</Text>
                            </Text>
                            <View
                                style={[
                                    styles.detailSearchPopUpSearchNotEmptyAllContactList,
                                ]}
                            >
                                <TouchableOpacity   
                                    style={[
                                        styles.detailSearchPopUpSearchNotEmptyAllContactItem,
                                        {
                                            borderBottomColor: theme === lightMode
                                            ?
                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                            :
                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                        }
                                    ]}
                                >
                                    <Image
                                        source={{uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg"}}
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemAvatar
                                        ]}
                                    />
                                    <View
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemContent
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentNameWrapper
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >Dương</Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameMatched
                                                ]}
                                            >Vũ</Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >Đăng</Text>
                                        </View>
                                        <Text
                                            numberOfLines={1}
                                            lineBreakMode='tail'
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentLocation, ,
                                                theme === lightMode
                                                ?
                                                commonStyles.lightSecondaryText
                                                :
                                                commonStyles.darkSecondaryText
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
                                        
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.detailSearchPopUpSearchEmptyBtnSeeMore
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.detailSearchPopUpSearchEmptyBtnSeeMoreText,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >
                                    {t("searchDetailSeeMore")}
                                </Text>
                                <Image
                                    source={require("../../assets/arrow-right-s-line.png")}
                                    tintColor={
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                height: 10,
                                width: "100%",
                                backgroundColor: theme === lightMode
                                ?
                                commonStyles.lightTertiaryBackground.backgroundColor
                                :
                                commonStyles.darkTertiaryBackground.backgroundColor
                            }}
                        >
                                
                        </View>
                        <View
                            style={[
                                styles.detailSearchPopupSearchEmptyAllWrapper
                            ]}
                        >      
                            <Text
                                style={[
                                    styles.detailSearchPopupSearchEmptyAllTitle,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >{t("searchDetailContactTabGroup") + " "}
                                <Text
                                    style={[
                                        styles.detailSearchPopupSearchEmptyAllMatchedNumber,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >(2)</Text>
                            </Text>
                            <View
                                style={[
                                    styles.detailSearchPopUpSearchNotEmptyAllContactList,
                                ]}
                            >
                                <TouchableOpacity   
                                    style={[
                                        styles.detailSearchPopUpSearchNotEmptyAllContactItem,
                                        {
                                            borderBottomColor: theme === lightMode
                                            ?
                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                            :
                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                        }
                                    ]}
                                >
                                    <Image
                                        source={{uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg"}}
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemAvatar
                                        ]}
                                    />
                                    <View
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemContent
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentNameWrapper
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >Nhóm - CNM</Text>
                                                
                                        </View>
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentInGroupWrapper
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentInGroupNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText
                                                    :
                                                    commonStyles.darkSecondaryText
                                                ]}
                                            >{t("searchDetailMemberTitle")}</Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentInGroupMatched
                                                ]}
                                            >Văn</Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentInGroupNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText
                                                    :
                                                    commonStyles.darkSecondaryText
                                                ]}
                                            >Dương</Text>
                                        </View>
                                    </View>
                                    <View>
                                            {/* <TouchableOpacity
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
                                            </TouchableOpacity> */}
                                            {/* <TouchableOpacity
                                                style={[
                                                    styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendBtn
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendText
                                                    ]}
                                                >{t("searchDetailAddFriendText")}</Text>
                                            </TouchableOpacity> */}
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity   
                                    style={[
                                        styles.detailSearchPopUpSearchNotEmptyAllContactItem,
                                        {
                                            borderBottomColor: theme === lightMode
                                            ?
                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                            :
                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                        }
                                    ]}
                                >
                                    <Image
                                        source={{uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg"}}
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemAvatar
                                        ]}
                                    />
                                    <View
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemContent
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentNameWrapper
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >Nhóm - CNM</Text>
                                                
                                        </View>
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentInGroupWrapper
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentInGroupNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText
                                                    :
                                                    commonStyles.darkSecondaryText
                                                ]}
                                            >{t("searchDetailMemberTitle")}</Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentInGroupMatched
                                                ]}
                                            >Văn</Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentInGroupNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText
                                                    :
                                                    commonStyles.darkSecondaryText
                                                ]}
                                            >Dương</Text>
                                        </View>
                                    </View>
                                    <View>
                                            {/* <TouchableOpacity
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
                                            </TouchableOpacity> */}
                                            {/* <TouchableOpacity
                                                style={[
                                                    styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendBtn
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.detailSearchPopUpSearchNotEmptyContactItemAddFriendText
                                                    ]}
                                                >{t("searchDetailAddFriendText")}</Text>
                                            </TouchableOpacity> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.detailSearchPopUpSearchEmptyBtnSeeMore
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.detailSearchPopUpSearchEmptyBtnSeeMoreText,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >
                                    {t("searchDetailSeeMore")}
                                </Text>
                                <Image
                                    source={require("../../assets/arrow-right-s-line.png")}
                                    tintColor={
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    }
                                />
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                height: 10,
                                width: "100%",
                                backgroundColor: theme === lightMode
                                ?
                                commonStyles.lightTertiaryBackground.backgroundColor
                                :
                                commonStyles.darkTertiaryBackground.backgroundColor
                            }}
                        ></View>
                        <View
                            style={[
                                styles.detailSearchPopupSearchEmptyAllWrapper
                            ]}
                        >      
                            <Text
                                style={[
                                    styles.detailSearchPopupSearchEmptyAllTitle,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >{t("searchDetailContactTabUnknownPeopleContacted") + " "}
                                <Text
                                    style={[
                                        styles.detailSearchPopupSearchEmptyAllMatchedNumber,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >(2)</Text>
                            </Text>
                            <View
                                style={[
                                    styles.detailSearchPopUpSearchNotEmptyAllContactList,
                                ]}
                            >
                                <TouchableOpacity   
                                    style={[
                                        styles.detailSearchPopUpSearchNotEmptyAllContactItem,
                                        {
                                            borderBottomColor: theme === lightMode
                                            ?
                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                            :
                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                        }
                                    ]}
                                >
                                    <Image
                                        source={{uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg"}}
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemAvatar
                                        ]}
                                    />
                                    <View
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllContactItemContent
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentNameWrapper
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :  
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >Dương</Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameMatched
                                                ]}
                                            >Vũ</Text>
                                            <Text
                                                style={[
                                                    styles.searchNotEmptyAllContactItemContentNameNormal,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :  
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >Đăng</Text>
                                        </View>
                                        <Text
                                            numberOfLines={1}
                                            lineBreakMode='tail'
                                            style={[
                                                styles.searchNotEmptyAllContactItemContentLocation, ,
                                                theme === lightMode
                                                ?
                                                commonStyles.lightSecondaryText
                                                :
                                                commonStyles.darkSecondaryText
                                            ]}
                                        >
                                            Chung nhóm: Nhập môn dữ liệu lớn
                                        </Text>
                                    </View>
                                    <View>
                                        {/* <TouchableOpacity
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
                                        </TouchableOpacity> */}
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
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.detailSearchPopUpSearchEmptyBtnSeeMore
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.detailSearchPopUpSearchEmptyBtnSeeMoreText,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >
                                    {t("searchDetailSeeMore")}
                                </Text>
                                <Image
                                    source={require("../../assets/arrow-right-s-line.png")}
                                    tintColor={
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {
                    typeSelected === TypeSearch.message
                    &&
                    <View>
                        <View
                            style={[
                                styles.detailSearchPopupSearchEmptyMessageWrapper
                            ]}
                        >
                            <View
                                style={[
                                    styles.detailSearchPopupSearchEmptyMessageTypeFilter,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightTertiaryBackground
                                    :
                                    commonStyles.darkTertiaryBackground
                                ]}
                            >
                                <Checkbox
                                    value={checkedLink}
                                    onValueChange={setCheckedLink}
                                    style={[
                                        styles.detailSearchPopupSearchEmptyMessageTypeFilterCheckbox,
                                    ]}
                                    color={
                                        checkedLink
                                        ?
                                        commonStyles.primaryColor.color
                                        :
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    }
                                />
                                <Text
                                    style={[
                                        styles.detailSearchPopupSearchEmptyMessageTypeFilterText,
                                        {
                                            color: theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText.color
                                            :
                                            commonStyles.darkSecondaryText.color
                                        }
                                    ]}
                                >Link</Text>
                            </View>

                            <View
                                style={[
                                    styles.detailSearchPopupSearchEmptyMessageTypeFilter,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightTertiaryBackground
                                    :
                                    commonStyles.darkTertiaryBackground
                                ]}
                            >
                                <Checkbox   
                                    value={checkedFile}
                                    onValueChange={setCheckedFile}
                                    style={[
                                        styles.detailSearchPopupSearchEmptyMessageTypeFilterCheckbox
                                    ]}
                                    color={
                                        checkedFile
                                        ?
                                        commonStyles.primaryColor.color
                                        :
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    }
                                />
                                <Text
                                    style={[
                                        styles.detailSearchPopupSearchEmptyMessageTypeFilterText,
                                        {
                                            color: theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText.color
                                            :
                                            commonStyles.darkSecondaryText.color
                                        }
                                    ]}
                                >File</Text>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.detailSearchPopupSearchEmptyMessageList
                            ]}
                        >
                            <View
                                    style={[
                                        styles.detailSearchPopUpSearchNotEmptyAllMessageList,
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllMessageItem,
                                            {
                                                borderBottomColor: theme === lightMode
                                                ?
                                                commonStyles.chatNavbarBorderBottomColorLight.color
                                                :
                                                commonStyles.chatNavbarBorderBottomColorDark.color
                                            }
                                        ]}
                                    >
                                        <Image
                                            source={{uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg"}}
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyAllMessageItemAvatar,

                                            ]}
                                        />
                                        <View
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyAllMessageItemContent
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    styles.searchNotEmptyAllMessageItemContentNameWrapper
                                                ]}
                                            >
                                                <View>
                                                    <Text
                                                        style={[
                                                            styles.detailSearchPopUpSearchNotEmptyAllMessageItemName,
                                                            theme === lightMode
                                                            ?
                                                            commonStyles.lightPrimaryText
                                                            :
                                                            commonStyles.darkPrimaryText
                                                        ]}
                                                    >Nhóm CMN</Text>
                                                    <View
                                                        style={[
                                                            styles.detailSearchPopUpSearchNotEmptyAllMessageContent
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.detailSearchPopUpSearchNotEmptyAllMessageContentNormal,
                                                                theme === lightMode
                                                                ?
                                                                commonStyles.lightSecondaryText
                                                                :
                                                                commonStyles.darkSecondaryText
                                                            ]}
                                                        >xem có</Text>
                                                        <Text
                                                            style={[
                                                                styles.detailSearchPopUpSearchNotEmptyAllMessageContentMatched,
                                                            ]}
                                                        > vu</Text>
                                                        <Text
                                                            style={[
                                                                styles.detailSearchPopUpSearchNotEmptyAllMessageContentNormal,
                                                                theme === lightMode
                                                                ?
                                                                commonStyles.lightSecondaryText
                                                                :
                                                                commonStyles.darkSecondaryText
                                                            ]}
                                                        >i không</Text>
                                                    </View>
                                                </View>
                                                <Text
                                                    style={[
                                                        styles.detailSearchPopUpSearchNotEmptyAllMessageTime,
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.lightSecondaryText
                                                        :
                                                        commonStyles.darkSecondaryText
                                                    ]}
                                                >04:45</Text>
                                            </View>
                                            <View
                                                style={[
                                                    styles.searchNotEmptyAllMessageMatchedResultWrapper
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.detailSearchPopupSearchEmptyAllMatchedNumberTotal,
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.lightPrimaryText
                                                        :
                                                        commonStyles.darkPrimaryText
                                                    ]}
                                                >99+</Text>
                                                <Text
                                                    style={[
                                                        styles.detailSearchPopupSearchEmptyAllMatchedNumberTitle,
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.lightPrimaryText
                                                        :
                                                        commonStyles.darkPrimaryText
                                                    ]}
                                                >{t("searchDetailMatchedResult")}</Text>
                                                <Image
                                                    source={require("../../assets/arrow-right-s-line.png")}
                                                    style={[
                                                        {
                                                            height: 23, width: 23,
                                                            tintColor: theme === lightMode
                                                            ?
                                                            commonStyles.lightSecondaryText.color
                                                            :
                                                            commonStyles.darkSecondaryText.color
                                                        }
                                                    ]}
                                                />
                                            </View>
                                        </View>
                                        
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllMessageItem,
                                            {
                                                borderBottomColor: theme === lightMode
                                                ?
                                                commonStyles.chatNavbarBorderBottomColorLight.color
                                                :
                                                commonStyles.chatNavbarBorderBottomColorDark.color
                                            }
                                        ]}
                                    >
                                        <Image
                                            source={{uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg"}}
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyAllMessageItemAvatar,

                                            ]}
                                        />
                                        <View
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyAllMessageItemContent
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    styles.searchNotEmptyAllMessageItemContentNameWrapper
                                                ]}
                                            >
                                                <View>
                                                    <Text
                                                        style={[
                                                            styles.detailSearchPopUpSearchNotEmptyAllMessageItemName,
                                                            theme === lightMode
                                                            ?
                                                            commonStyles.lightPrimaryText
                                                            :
                                                            commonStyles.darkPrimaryText
                                                        ]}
                                                    >Nhóm CMN</Text>
                                                    <View
                                                        style={[
                                                            styles.detailSearchPopUpSearchNotEmptyAllMessageContent
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.detailSearchPopUpSearchNotEmptyAllMessageContentNormal,
                                                                theme === lightMode
                                                                ?
                                                                commonStyles.lightSecondaryText
                                                                :
                                                                commonStyles.darkSecondaryText
                                                            ]}
                                                        >xem có</Text>
                                                        <Text
                                                            style={[
                                                                styles.detailSearchPopUpSearchNotEmptyAllMessageContentMatched,
                                                            ]}
                                                        > vu</Text>
                                                        <Text
                                                            style={[
                                                                styles.detailSearchPopUpSearchNotEmptyAllMessageContentNormal,
                                                                theme === lightMode
                                                                ?
                                                                commonStyles.lightSecondaryText
                                                                :
                                                                commonStyles.darkSecondaryText
                                                            ]}
                                                        >i không</Text>
                                                    </View>
                                                </View>
                                                <Text
                                                    style={[
                                                        styles.detailSearchPopUpSearchNotEmptyAllMessageTime,
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.lightSecondaryText
                                                        :
                                                        commonStyles.darkSecondaryText
                                                    ]}
                                                >04:45</Text>
                                            </View>
                                            <View
                                                style={[
                                                    styles.searchNotEmptyMessageFilterLinkWrapper,
                                                    {
                                                        borderColor:
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.chatNavbarBorderBottomColorLight.color
                                                        :
                                                        commonStyles.chatNavbarBorderBottomColorDark.color
                                                    }
                                                ]}
                                            >
                                                <Image
                                                    source={{uri: "https://png.pngtree.com/png-clipart/20200722/original/pngtree-abc-icon-on-a-rectangular-box-arranged-in-vector-png-image_4967552.jpg"}}
                                                    style={[
                                                        styles.searchNotEmptyMessageFilterLinkImage
                                                    ]}
                                                />
                                                <View
                                                    style={[
                                                        styles.searchNotEmptyMessageFilterLinkContent
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.searchNotEmptyMessageFilterLinkAddress
                                                        ]}
                                                    >zalo.me</Text>
                                                    <Text
                                                        lineBreakMode='tail'
                                                        numberOfLines={1}
                                                        style={[
                                                            styles.searchNotEmptyMessageFilterLinkDesc,
                                                            theme === lightMode
                                                            ?
                                                            commonStyles.lightSecondaryText
                                                            :
                                                            commonStyles.darkSecondaryText
                                                        ]}
                                                    >Zalo - ABC Origin - xyzaaaaaaaaaaaaaaaaaaaaaa</Text>
                                                </View>
                                            </View>
                                            <View
                                                style={[
                                                    styles.searchNotEmptyAllMessageMatchedResultWrapper
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.detailSearchPopupSearchEmptyAllMatchedNumberTotal,
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.lightPrimaryText
                                                        :
                                                        commonStyles.darkPrimaryText
                                                    ]}
                                                >99+</Text>
                                                <Text
                                                    style={[
                                                        styles.detailSearchPopupSearchEmptyAllMatchedNumberTitle,
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.lightPrimaryText
                                                        :
                                                        commonStyles.darkPrimaryText
                                                    ]}
                                                >{t("searchDetailMatchedResult")}</Text>
                                                <Image
                                                    source={require("../../assets/arrow-right-s-line.png")}
                                                    style={[
                                                        {
                                                            height: 23, width: 23,
                                                            tintColor: theme === lightMode
                                                            ?
                                                            commonStyles.lightSecondaryText.color
                                                            :
                                                            commonStyles.darkSecondaryText.color
                                                        }
                                                    ]}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.detailSearchPopUpSearchNotEmptyAllMessageItem,
                                            {
                                                borderBottomColor: theme === lightMode
                                                ?
                                                commonStyles.chatNavbarBorderBottomColorLight.color
                                                :
                                                commonStyles.chatNavbarBorderBottomColorDark.color
                                            }
                                        ]}
                                    >
                                        <Image
                                            source={{uri: "https://c8.alamy.com/comp/2PWFRTF/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWFRTF.jpg"}}
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyAllMessageItemAvatar,

                                            ]}
                                        />
                                        <View
                                            style={[
                                                styles.detailSearchPopUpSearchNotEmptyAllMessageItemContent
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    styles.searchNotEmptyAllMessageItemContentNameWrapper
                                                ]}
                                            >
                                                <View>
                                                    <Text
                                                        style={[
                                                            styles.detailSearchPopUpSearchNotEmptyAllMessageItemName,
                                                            theme === lightMode
                                                            ?
                                                            commonStyles.lightPrimaryText
                                                            :
                                                            commonStyles.darkPrimaryText
                                                        ]}
                                                    >Nhóm CMN</Text>
                                                
                                                </View>
                                                <Text
                                                    style={[
                                                        styles.detailSearchPopUpSearchNotEmptyAllMessageTime,
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.lightSecondaryText
                                                        :
                                                        commonStyles.darkSecondaryText
                                                    ]}
                                                >04:45</Text>
                                            </View>
                                            <View
                                                style={[
                                                    styles.searchNotEmptyMessageFilterLinkWrapper,
                                                    {
                                                        borderColor:
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.chatNavbarBorderBottomColorLight.color
                                                        :
                                                        commonStyles.chatNavbarBorderBottomColorDark.color
                                                    }
                                                ]}
                                            >
                                                <Image
                                                    source={{uri: "https://png.pngtree.com/png-clipart/20200722/original/pngtree-abc-icon-on-a-rectangular-box-arranged-in-vector-png-image_4967552.jpg"}}
                                                    style={[
                                                        styles.searchNotEmptyMessageFilterLinkImage
                                                    ]}
                                                />
                                                <View
                                                    style={[
                                                        styles.searchNotEmptyMessageFilterLinkContent
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.searchNotEmptyMessageFilterLinkDesc,
                                                            theme === lightMode
                                                            ?
                                                            commonStyles.lightSecondaryText
                                                            :
                                                            commonStyles.darkSecondaryText
                                                        ]}
                                                    >Bigquery(A, B).docx</Text>
                                                    <Text
                                                        lineBreakMode='tail'
                                                        numberOfLines={1}
                                                        style={[
                                                            styles.searchNotEmptyMessageFilterFileSize,
                                                            theme === lightMode
                                                            ?
                                                            commonStyles.lightSecondaryText
                                                            :
                                                            commonStyles.darkSecondaryText
                                                        ]}
                                                    >483 KB</Text>
                                                </View>
                                            </View>
                                            <View
                                                style={[
                                                    styles.searchNotEmptyAllMessageMatchedResultWrapper
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.detailSearchPopupSearchEmptyAllMatchedNumberTotal,
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.lightPrimaryText
                                                        :
                                                        commonStyles.darkPrimaryText
                                                    ]}
                                                >99+</Text>
                                                <Text
                                                    style={[
                                                        styles.detailSearchPopupSearchEmptyAllMatchedNumberTitle,
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.lightPrimaryText
                                                        :
                                                        commonStyles.darkPrimaryText
                                                    ]}
                                                >{t("searchDetailMatchedResult")}</Text>
                                                <Image
                                                    source={require("../../assets/arrow-right-s-line.png")}
                                                    style={[
                                                        {
                                                            height: 23, width: 23,
                                                            tintColor: theme === lightMode
                                                            ?
                                                            commonStyles.lightSecondaryText.color
                                                            :
                                                            commonStyles.darkSecondaryText.color
                                                        }
                                                    ]}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                            </View>
                            
                        </View>
                    </View>
                }
            </ScrollView>
        </View>
    )
}