import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, Image, ScrollView, SectionList, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { IRootState } from '../../redux_toolkit/store'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
import { lightMode } from '../../redux_toolkit/slices/theme.slice'
import commonStyles from '../../CommonStyles/commonStyles'
import { useState } from 'react'
import { TFunction } from 'i18next'
import ReadMore from '@fawazahmed/react-native-read-more'

interface AddFriendInvitationProps {
    navigation: any
}
const TypeFilter = {
    RECEIVED: "RECEIVED",
    SENT: "SENT"
}
export default function AddFriendInvitation({navigation}: AddFriendInvitationProps) {
    const theme = useSelector((state: IRootState) => state.theme.theme)
    const {t} = useTranslation();
    const [typeFilterSelected, setTypeFilterSelected] = useState(TypeFilter.RECEIVED)

    return (
        <View
            style={[
                styles.addFriendInvitationWrapper,
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
                    styles.addFriendInvitationContainer,
                ]}
            >
                <View
                    style={[
                        styles.addFriendInvitationHeader,
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
                            styles.addFriendInvitationHeaderBackButton,
                        ]}
                    >
                        <Image
                            source={require("../../assets/arrow-left-s-line-icon.png")}
                            style={[
                                styles.addFriendInvitationHeaderIconImage,
                                {
                                    tintColor :
                                    theme === lightMode
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
                            styles.addFriendInvitationHeaderTitle,
                            {
                                color :
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText.color
                                :
                                commonStyles.darkPrimaryText.color
                            }
                        ]}
                    >{t("searchDetailContactAddFriendInvitation")}</Text>
                    <TouchableOpacity
                        onPress={()=> navigation.navigate("AddFriendInvitationSetting")}
                        style={[
                            styles.addFriendInvitationHeaderSettingButton,
                           
                        ]}
                    >
                        <Image
                            source={require("../../assets/settings-icon-bottom-tab.png")}
                            style={[
                                styles.addFriendInvitationHeaderIconImage,
                                {
                                    tintColor :
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText.color
                                    :
                                    commonStyles.darkPrimaryText.color
                                }
                            ]}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={[
                        styles.addFriendInvitationChooseTypeBox,
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
                        onPress={()=> setTypeFilterSelected(TypeFilter.RECEIVED)}
                        style={[
                            styles.addFriendInvitationChooseTypeItem,
                            typeFilterSelected === TypeFilter.RECEIVED
                            ?
                            styles.addFriendInvitationChooseTypeItemActive
                            : null
                        ]}
                    >
                        <Text
                            style={[
                                styles.addFriendInvitationChooseTypeItemText,
                                {
                                    fontWeight: 
                                    typeFilterSelected === TypeFilter.RECEIVED
                                    ? "500" : "400"
                                }
                                
                            ]}
                        >{t("addFriendInvitationReceivedTitle")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=> setTypeFilterSelected(TypeFilter.SENT)}
                        style={[
                            styles.addFriendInvitationChooseTypeItem,
                            typeFilterSelected === TypeFilter.SENT
                            ?
                            styles.addFriendInvitationChooseTypeItemActive
                            : null
                        ]}
                    >
                        <Text
                            style={[
                                styles.addFriendInvitationChooseTypeItemText,
                                {
                                    fontWeight: 
                                    typeFilterSelected === TypeFilter.SENT
                                    ? "500" : "400"
                                }
                            ]}
                        >{t("addFriendInvitationSentTitle")}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {
                        typeFilterSelected === TypeFilter.RECEIVED
                        &&
                        <AddFriendInvitationReceivedList
                            theme={theme}
                            translation={t}
                        />
                    }
                    {
                        typeFilterSelected === TypeFilter.SENT
                        &&
                        <AddFriendInvitationSentList
                            theme={theme}
                            translation={t}
                        />
                    }
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
interface   AddFriendInvitationReceivedListProps {
    theme: string,
    translation: TFunction<"translation", undefined>
}

function AddFriendInvitationReceivedList({theme, translation: t}: AddFriendInvitationReceivedListProps) {
    const sectionData = [
        {
            title: "12-2023",
            data: [
                {
                    userID: 1,
                    name: "John Doe",
                    avatar: "https://www.w3schools.com/w3images/avatar2.png",
                    date: "02/12/2023",
                    relation: "Từ Bạn cùng nhóm",
                    message: "Chào bạn, mình muốn kết bạn với bạn, bạn có muốn kết bạn với mình không?"
                }
            ]
        }
    ]

    function renderSectionItem({item, index}: {item: any, index: number}) {
        return (
            <View key={index}
                    style={[
                        styles.addFriendInvitationReceivedItemSection
                    ]}
                >
                    <Image
                        source={{uri: "https://www.w3schools.com/w3images/avatar2.png"}}
                        style={[
                            styles.addFriendInvitationAvatarImage,
                        ]}
                    />
                    <View
                        style={[
                            styles.addFriendInvitationReceivedItemMainContent
                        ]}
                    >
                        <Text
                            style={[
                                styles.addFriendInvitationReceivedItemRealName,
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText
                                :
                                commonStyles.darkPrimaryText
                            ]}
                        >John Doe</Text>
                        <Text
                            style={[
                                styles.addFriendInvitationReceivedItemAddDate,
                                theme === lightMode
                                ?
                                commonStyles.lightTertiaryText
                                :
                                commonStyles.darkTertiaryText
                            ]}
                        >02/12/2023</Text>
                        <View
                            style={[
                                styles.addFriendInvitationReceivedItemMessageBox,
                                {
                                    borderColor:
                                    theme === lightMode
                                    ?
                                    commonStyles.lightSecondaryText.color
                                    :
                                    commonStyles.darkSecondaryText.color
                                }
                            ]}
                        >
                            <ReadMore
                                numberOfLines={2}
                                seeMoreText={t("addFriendInvitationSeeMore")}
                                seeLessText={t("addFriendInvitationSeeLess")}
                                style={[
                                    styles.addFriendInvitationReceivedMessage
                                ]}
                                seeMoreStyle={{
                                    fontWeight: "500",
                                    
                                    color:
                                    theme === lightMode
                                    ?
                                    commonStyles.lightSecondaryText.color
                                    :
                                    commonStyles.darkSecondaryText.color
                                }}
                                seeLessStyle={{
                                    fontWeight: "500",
                                    color:
                                    theme === lightMode
                                    ?
                                    commonStyles.lightSecondaryText.color
                                    :
                                    commonStyles.darkSecondaryText.color
                                }}
                            >
                                Chào bạn, mình muốn kết bạn với bạn, mình muốn kết bạn với bạn, bạn có muốn kết bạn với mình không?
                            </ReadMore>
                        </View>
                        <View
                            style={[
                                styles.addFriendInvitationReceivedItemActionBox
                            ]}
                        >
                            <TouchableOpacity
                                style={[
                                    styles.addFriendInvitationReceivedItemActionItem,
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
                                <Text
                                    style={[
                                        styles.addFriendInvitationReceivedItemActionItemText,
                                        
                                    ]}
                                >{t("addFriendInvitationDecline")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.addFriendInvitationReceivedItemActionItem,
                                    commonStyles.primaryColorBackground
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.addFriendInvitationReceivedItemActionItemText,
                                        commonStyles.primaryColor
                                    ]}
                                >{t("addFriendInvitationAccept")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
        )
    }

    return (
        sectionData && sectionData.length > 0
        ?
        <View
            style={[
            ]}
        >
            <View
                style={[
                    styles.addFriendInvitationReceivedListSection
                ]}
            >
                
                <SectionList
                    sections={sectionData}
                    keyExtractor={(item, index) => "" + index}
                    renderItem={renderSectionItem}
                />
            </View>

            <View
                style={[
                    styles.addFriendInvitationReceivedBreakLine,
                    {
                        backgroundColor:
                        theme === lightMode
                        ?
                        commonStyles.lightTertiaryBackground.backgroundColor
                        :
                        commonStyles.darkTertiaryBackground.backgroundColor
                    }
                ]}
            >

            </View>

            <View
                style={[
                    styles.addFriendInvitationReceivedMayBeYouKnowBox
                ]}
            >
                <Text
                    style={[
                        styles.addFriendInvitationReceivedMayBeYouKnowTitle,
                        {
                            color:
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText.color
                            :
                            commonStyles.darkPrimaryText.color
                        }
                    ]}
                >{t("addFriendInvitationMayBeYouKnow")}</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{
                        marginTop: 15,
                       
                    }}
                    contentContainerStyle={{
                        gap: 12
                    }}
                >
                    <View
                        style={[
                            styles.addFriendInvitationReceivedMayBeYouKnowItem,
                            {
                                borderColor:
                                theme === lightMode
                                ?
                                commonStyles.lightSecondaryText.color
                                :
                                commonStyles.darkSecondaryText.color
                            }
                        ]}
                    >
                        <TouchableOpacity
                            style={[
                                styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButton
                            ]}
                        >
                            <Image
                                source={require("../../assets/close-line-icon.png")}
                                style={[
                                    styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButtonIcon,
                                    {
                                        tintColor:
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    }
                                ]}
                            />
                        </TouchableOpacity>
                        <Image
                            source={{uri: "https://www.w3schools.com/w3images/avatar2.png"}}
                            style={[
                                styles.addFriendInvitationAvatarImage,
                            ]}
                        />
                        <Text
                            style={[
                                styles.addFriendInvitationReceivedMayBeKnownItemRealName,
                                {
                                    color:
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText.color
                                    :
                                    commonStyles.darkPrimaryText.color
                                }
                            ]}
                        >John Doe</Text>
                        <TouchableOpacity
                            style={[
                                styles.addFriendInvitationReceivedMayBeYouKnowItemAddButton,
                                commonStyles.primaryColorBackground
                            ]}
                        >
                            <Text
                                style={[
                                    commonStyles.primaryColor,
                                    styles.addFriendInvitationReceivedMayBeYouKnowItemText
                                ]}
                            >{t("addFriendInvitationAdd")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[
                            styles.addFriendInvitationReceivedMayBeYouKnowItem,
                            {
                                borderColor:
                                theme === lightMode
                                ?
                                commonStyles.lightSecondaryText.color
                                :
                                commonStyles.darkSecondaryText.color
                            }
                        ]}
                    >
                        <TouchableOpacity
                            style={[
                                styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButton
                            ]}
                        >
                            <Image
                                source={require("../../assets/close-line-icon.png")}
                                style={[
                                    styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButtonIcon,
                                    {
                                        tintColor:
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    }
                                ]}
                            />
                        </TouchableOpacity>
                        <Image
                            source={{uri: "https://www.w3schools.com/w3images/avatar2.png"}}
                            style={[
                                styles.addFriendInvitationAvatarImage,
                            ]}
                        />
                        <Text
                            style={[
                                styles.addFriendInvitationReceivedMayBeKnownItemRealName,
                                {
                                    color:
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText.color
                                    :
                                    commonStyles.darkPrimaryText.color
                                }
                            ]}
                        >John Doe</Text>
                        <TouchableOpacity
                            style={[
                                styles.addFriendInvitationReceivedMayBeYouKnowItemAddButton,
                                commonStyles.primaryColorBackground
                            ]}
                        >
                            <Text
                                style={[
                                    commonStyles.primaryColor,
                                    styles.addFriendInvitationReceivedMayBeYouKnowItemText
                                ]}
                            >{t("addFriendInvitationAdd")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[
                            styles.addFriendInvitationReceivedMayBeYouKnowItem,
                            {
                                borderColor:
                                theme === lightMode
                                ?
                                commonStyles.lightSecondaryText.color
                                :
                                commonStyles.darkSecondaryText.color
                            }
                        ]}
                    >
                        <TouchableOpacity
                            style={[
                                styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButton
                            ]}
                        >
                            <Image
                                source={require("../../assets/close-line-icon.png")}
                                style={[
                                    styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButtonIcon,
                                    {
                                        tintColor:
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    }
                                ]}
                            />
                        </TouchableOpacity>
                        <Image
                            source={{uri: "https://www.w3schools.com/w3images/avatar2.png"}}
                            style={[
                                styles.addFriendInvitationAvatarImage,
                            ]}
                        />
                        <Text
                            style={[
                                styles.addFriendInvitationReceivedMayBeKnownItemRealName,
                                {
                                    color:
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText.color
                                    :
                                    commonStyles.darkPrimaryText.color
                                }
                            ]}
                        >John Doe</Text>
                        <TouchableOpacity
                            style={[
                                styles.addFriendInvitationReceivedMayBeYouKnowItemAddButton,
                                commonStyles.primaryColorBackground
                            ]}
                        >
                            <Text
                                style={[
                                    commonStyles.primaryColor,
                                    styles.addFriendInvitationReceivedMayBeYouKnowItemText
                                ]}
                            >{t("addFriendInvitationAdd")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[
                            styles.addFriendInvitationReceivedMayBeYouKnowItem,
                            {
                                borderColor:
                                theme === lightMode
                                ?
                                commonStyles.lightSecondaryText.color
                                :
                                commonStyles.darkSecondaryText.color
                            }
                        ]}
                    >
                        <TouchableOpacity
                            style={[
                                styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButton
                            ]}
                        >
                            <Image
                                source={require("../../assets/close-line-icon.png")}
                                style={[
                                    styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButtonIcon,
                                    {
                                        tintColor:
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    }
                                ]}
                            />
                        </TouchableOpacity>
                        <Image
                            source={{uri: "https://www.w3schools.com/w3images/avatar2.png"}}
                            style={[
                                styles.addFriendInvitationAvatarImage,
                            ]}
                        />
                        <Text
                            style={[
                                styles.addFriendInvitationReceivedMayBeKnownItemRealName,
                                {
                                    color:
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText.color
                                    :
                                    commonStyles.darkPrimaryText.color
                                }
                            ]}
                        >John Doe</Text>
                        <TouchableOpacity
                            style={[
                                styles.addFriendInvitationReceivedMayBeYouKnowItemAddButton,
                                commonStyles.primaryColorBackground
                            ]}
                        >
                            <Text
                                style={[
                                    commonStyles.primaryColor,
                                    styles.addFriendInvitationReceivedMayBeYouKnowItemText
                                ]}
                            >{t("addFriendInvitationAdd")}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
        :
        <View
            style={[
                styles.addFriendInvitationEmptyList
            ]}
        >
            <Image
                source={require("../../assets/addInvitationEmptyListImage.png")}
                style={[
                    styles.addFriendInvitationEmptyListImage
                ]}
            />
            <Text style={[
                styles.addFriendInvitationEmptyListText,
                theme === lightMode
                ?
                commonStyles.lightSecondaryText
                :
                commonStyles.darkSecondaryText
            ]}>{t("addFriendInvitationReceivedEmpty")}</Text>
        </View>
    )

}

interface AddFriendInvitationSentListProps {
    theme: string,
    translation: TFunction<"translation", undefined>
}
function AddFriendInvitationSentList({theme, translation : t} : AddFriendInvitationSentListProps) {
    const flatData = [
        {
            userID: 1,
            name: "John Doe",
            avatar: "https://www.w3schools.com/w3images/avatar2.png",
            date: "02/12/2023"
        }
    ]

    function renderFlatItem({item, index}: {item: any, index: number}) {
        return (
            <View
                key={index}
                style={[
                    styles.addFriendInvitationSentFlatItem
                ]}
            >
                <Image
                    source={{uri: "https://www.w3schools.com/w3images/avatar2.png"}}
                    style={[
                        styles.addFriendInvitationAvatarImage,
                    ]}
                />
                <View
                    style={[
                        styles.addFriendInvitationSentItemMainContent
                    ]}
                >
                    <Text
                        style={[
                            styles.addFriendInvitationReceivedItemRealName,
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText
                            :
                            commonStyles.darkPrimaryText
                        ]}
                    >
                        John Doe
                    </Text>
                    <Text
                        style={[
                            styles.addFriendInvitationReceivedItemAddDate,
                            theme === lightMode
                            ?
                            commonStyles.lightTertiaryText
                            :
                            commonStyles.darkTertiaryText
                        ]}
                    >
                        02/12/2023
                    </Text>
                </View>
                <TouchableOpacity
                    style={[
                        styles.addFriendInvitationSentItemActionUndoButton,
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
                    <Text
                        style={[
                            styles.addFriendInvitationSentItemActionUndoButtonText,
                            {
                                color:
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText.color
                                :
                                commonStyles.darkPrimaryText.color
                            }
                        ]}
                    >{t("addFriendInvitationSentUndo")}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        flatData && flatData.length > 1
        ?
        <View>
            {/* <View
                style={[
                    styles.addFriendInvitationSentFlatItem
                ]}
            >
                <Image
                    source={{uri: "https://www.w3schools.com/w3images/avatar2.png"}}
                    style={[
                        styles.addFriendInvitationAvatarImage,
                    ]}
                />
                <View
                    style={[
                        styles.addFriendInvitationSentItemMainContent
                    ]}
                >
                    <Text
                        style={[
                            styles.addFriendInvitationReceivedItemRealName,
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText
                            :
                            commonStyles.darkPrimaryText
                        ]}
                    >
                        John Doe
                    </Text>
                    <Text
                        style={[
                            styles.addFriendInvitationReceivedItemAddDate,
                            theme === lightMode
                            ?
                            commonStyles.lightTertiaryText
                            :
                            commonStyles.darkTertiaryText
                        ]}
                    >
                        02/12/2023
                    </Text>
                </View>
                <TouchableOpacity
                    style={[
                        styles.addFriendInvitationSentItemActionAddButton,
                       
                    ]}
                >
                    <Text
                        style={[
                            styles.addFriendInvitationSentItemActionAddButtonText,
                            
                        ]}
                    >{t("addFriendInvitationSentAddFriend")}</Text>
                </TouchableOpacity>
            </View> */}
            <FlatList
                data={flatData}
                keyExtractor={(item, index) => "" + index}
                renderItem={renderFlatItem}
            />
        </View>
        :
        <View
            style={[
                styles.addFriendInvitationEmptyList
            ]}
        >
            <Image
                source={require("../../assets/addInvitationEmptyListImage.png")}
                style={[
                    styles.addFriendInvitationEmptyListImage
                ]}
            />
            <Text style={[
                styles.addFriendInvitationEmptyListText,
                theme === lightMode
                ?
                commonStyles.lightSecondaryText
                :
                commonStyles.darkSecondaryText
            ]}>{t("addFriendInvitationSentEmpty")}</Text>
        </View>

    )
}
