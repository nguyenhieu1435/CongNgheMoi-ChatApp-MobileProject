import { View, Text, StatusBar, SafeAreaView, Image, Switch } from 'react-native'
import { styles } from './styles'
import { IRootState } from '../../redux_toolkit/store'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { lightMode } from '../../redux_toolkit/slices/theme.slice'
import commonStyles from '../../CommonStyles/commonStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useState } from 'react'
import ToggleSwitch from 'toggle-switch-react-native'
import Checkbox from 'expo-checkbox'

interface IAddFriendInvitationSettingProps {
    navigation: any

}

export default function AddFriendInvitationSetting({navigation}: IAddFriendInvitationSettingProps) {
    const theme = useSelector((state: IRootState) => state.theme.theme)
    const {t} = useTranslation()
    const [isAllowAddFriend, setIsAllowAddFriend] = useState(true)
    const [addFriendByQrCode, setAddFriendByQrCode] = useState(true)
    const [addFriendByCommonGroup, setAddFriendByCommonGroup] = useState(true)
    const [addFriendBySuggestion, setAddFriendBySuggestion] = useState(true)

    return (
        <View
            style={[
                styles.addFriendSettingWrapper,
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
                    styles.addFriendSettingContainer
                ]}
            >
                <View
                    style={[
                        styles.addFriendSettingHeaderBox,
                        {
                            borderBottomColor: theme === lightMode
                            ?
                            commonStyles.chatNavbarBorderBottomColorLight.color
                            :
                            commonStyles.chatNavbarBorderBottomColorDark.color
                        }
                    ]}
                >
                    <TouchableOpacity   
                        onPress={() => navigation.goBack()}
                        style={[
                            styles.addFriendSettingHeaderBackButton
                        ]}
                    >
                        <Image
                            source={require("../../assets/arrow-left-s-line-icon.png")}
                            style={[
                                styles.addFriendSettingHeaderBackButtonImage,
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
                            styles.addFriendSettingHeaderTitle,
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText
                            :
                            commonStyles.darkPrimaryText
                        ]}
                    >
                        {t("addFriendInvitationSettingTitle")}
                    </Text>
                </View>
                <View
                    style={[
                        styles.addFriendSettingAllowAddFriendByPhonePermissionBox,
                    ]}
                >   
                    <View
                        style={[
                            styles.addFriendSettingAllowAddFriendByPhonePermissionBoxMainContent
                        ]}
                    >
                        <Text
                            style={[
                                styles.addFriendSettingAllowAddFriendByPhonePermissionBoxTitle,
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText
                                :
                                commonStyles.darkPrimaryText
                            ]}
                        >
                            {t("addFriendInvitationSettingFindByPhonePermissionDesc")}
                        </Text>
                        <Text
                        style={[
                                styles.addFriendSettingAllowAddFriendByPhonePermissionBoxTel,
                                theme === lightMode
                                ?
                                commonStyles.lightSecondaryText
                                :
                                commonStyles.darkSecondaryText
                            ]}
                        >
                        +84975654628</Text>
                    </View>
                    
                    <ToggleSwitch
                        isOn={isAllowAddFriend}
                        onColor={commonStyles.primaryColor.color}
                        offColor={commonStyles.lightSecondaryText.color}
                        size="medium"
                        onToggle={(isOn) => setIsAllowAddFriend(isOn)}
                    />

                </View>
                <View
                    style={[
                        styles.addFriendSettingBreakLine,
                        theme === lightMode
                        ?
                        commonStyles.lightTertiaryBackground
                        :
                        commonStyles.darkTertiaryBackground
                    ]}
                >

                </View>
                <View
                    style={[
                        styles.addFriendSettingAnotherPermissionBox,
                    ]}
                >
                    <Text
                        style={[
                            styles.addFriendSettingAnotherPermissionBoxTitle
                        ]}
                    >{t("addFriendInvitationSettingAllowUnknownPeopleAddFriend")}</Text>
                    
                    <Text
                        style={[
                            styles.addFriendSettingAnotherPermissionBoxDesc,
                            theme === lightMode
                            ?
                            commonStyles.lightTertiaryText
                            :
                            commonStyles.darkTertiaryText
                        ]}
                    >{t("addFriendInvitationSettingAllowUnknownPeopleAddFriendDesc")}</Text>

                    <TouchableOpacity
                        style={[
                            styles.addFriendSettingAnotherPermissionBtn
                        ]}
                        onPress={() => setAddFriendByQrCode(!addFriendByQrCode)}
                    >
                        <Checkbox
                            value={addFriendByQrCode}
                            style={{
                                width: 27,
                                height: 27,
                                borderColor: 
                                theme === lightMode
                                ?
                                commonStyles.lightSecondaryText.color
                                :
                                commonStyles.darkSecondaryText.color,
                                borderRadius: 8,
                                
                            }}
                            color={commonStyles.primaryColor.color}
                        />
                        <Text
                            style={[
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText
                                :
                                commonStyles.darkPrimaryText,
                                styles.addFriendSettingAnotherPermissionBtnText
                            
                            ]}
                        >{t("addFriendInvitationSetting")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setAddFriendByCommonGroup(!addFriendByCommonGroup)}
                        style={[
                            styles.addFriendSettingAnotherPermissionBtn
                        ]}
                    >
                        <Checkbox
                            value={addFriendByCommonGroup}
                            style={{
                                width: 27,
                                height: 27,
                                borderColor: 
                                theme === lightMode
                                ?
                                commonStyles.lightSecondaryText.color
                                :
                                commonStyles.darkSecondaryText.color,
                                borderRadius: 8,
                                
                            }}
                            color={commonStyles.primaryColor.color}
                        />
                        <Text
                            style={[
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText
                                :
                                commonStyles.darkPrimaryText,
                                styles.addFriendSettingAnotherPermissionBtnText
                            
                            ]}
                        >{t("addFriendInvitationCommonGroup")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setAddFriendBySuggestion(!addFriendBySuggestion)}
                        style={[
                            styles.addFriendSettingAnotherPermissionBtn
                        ]}
                    >
                        <Checkbox
                            value={addFriendBySuggestion}
                            style={{
                                width: 27,
                                height: 27,
                                borderColor: 
                                theme === lightMode
                                ?
                                commonStyles.lightSecondaryText.color
                                :
                                commonStyles.darkSecondaryText.color,
                                borderRadius: 8,
                                
                            }}
                            color={commonStyles.primaryColor.color}
                        />
                        <Text
                            style={[
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText
                                :
                                commonStyles.darkPrimaryText,
                                styles.addFriendSettingAnotherPermissionBtnText
                            
                            ]}
                        >{t("addFriendInvitationAddFriendSuggestions")}</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        </View>
    )
}