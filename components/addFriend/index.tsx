import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import { styles } from './styles'
import { IRootState } from '../../redux_toolkit/store'
import { useTranslation } from 'react-i18next'
import { lightMode } from '../../redux_toolkit/slices/theme.slice'
import commonStyles from '../../CommonStyles/commonStyles'
import { useState } from 'react'
import { ICountryItem } from '../../data/countrys'
import ModalShowCountryCode from '../modalShowCountryCode'

interface AddFriendProps {
    navigation: any

}

export default function AddFriend({navigation}: AddFriendProps) {
    const theme = useSelector((state: IRootState) => state.theme.theme)
    const {t} = useTranslation();
    const [phoneNumber, setPhoneNumber] = useState("")
    const [currentCountry, setCurrentCountry] = useState<ICountryItem>({
        code: "VN",
        dial_code: "+84",
        name: "Vietnam"
    })
    const [visibleModal, setVisibleModal] = useState<boolean>(false);

    return (
        <View
            style={[
                styles.addFriendWrapper,
                theme === lightMode
                ?
                commonStyles.lightPrimaryBackground
                :
                commonStyles.darkPrimaryBackground
            ]}
        >
            <StatusBar/>
            <SafeAreaView
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={[
                        styles.addFriendHeaderBox,
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
                    >
                        <Image
                            source={require("../../assets/arrow-left-s-line-icon.png")}
                            style={[
                                styles.addFriendHeaderGoBackBtn,
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
                            styles.addFriendHeaderTitle,
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText
                            :
                            commonStyles.darkPrimaryText
                        ]}
                    >{t("chatListAddFriendTitle")}</Text>
                </View>
                <View
                    style={[
                        styles.addFriendMyQrCodeBoxContainer,
                        theme === lightMode
                        ?
                        commonStyles.lightSecondaryBackground
                        :
                        commonStyles.darkSecondaryBackground
                    ]}
                >
                    <View
                        style={[
                            styles.addFriendMyQrCodeBox
                        ]}
                    >
                        <Image
                            source={require("../../assets/354370dbb2a41b362ef9b9747085b76b.jpg")}
                            style={[
                                styles.addFriendMyQrCodeBoxBackground
                            ]}
                        />
                        <Text
                            style={[
                                styles.addFriendMyQrCodeUsername,
                                {
                                    color: commonStyles.darkPrimaryText.color
                                }
                            ]}
                        >
                            Nguyễn Hiếu
                        </Text>
                        <Image
                            source={{uri: "https://img.freepik.com/premium-vector/qr-code-vector-icon_389832-989.jpg"}}
                            style={[
                                styles.addFriendMyQrCodeBoxCodeImg
                            ]}
                        />
                        <Text
                            style={[
                                styles.addFriendMyQrCodeDesc,
                                {
                                    color: commonStyles.darkSecondaryText.color
                                }
                            ]}
                        >
                            {t("addFriendDescMyQr")}
                        </Text>
                    </View>
                </View>
                <View
                    style={[
                        styles.addFriendSearchTelAndChooseCountryContainer,
                    ]}
                >
                    <View
                        style={[
                            styles.addFriendSearchTelAndChooseCountryBox,
                            {
                                borderColor: theme === lightMode
                                ?
                                commonStyles.lightTertiaryText.color
                                :
                                commonStyles.darkTertiaryText.color
                            }
                        ]}
                    >
                        <TouchableOpacity
                            onPress={() => setVisibleModal(true)}
                            style={[
                                styles.addFriendSearchTelAndChooseCountryBtn,
                                theme === lightMode
                                ?
                                commonStyles.lightTertiaryBackground
                                :
                                commonStyles.darkTertiaryBackground
                            ]}
                        >
                            <Text
                                style={[
                                    styles.addFriendSearchTelAndChooseCountryBtnText,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >
                                {currentCountry.dial_code}
                            </Text>
                            <Image
                                source={require("../../assets/arrow-down-s-line-icon.png")}
                                style={[
                                    styles.addFriendSearchTelAndChooseCountryBtnImage,
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
                        <TextInput
                            keyboardType='number-pad'
                            placeholder={t("addFriendInputSearchPlaceholder")}
                            value={phoneNumber}
                            onChangeText={(text) => setPhoneNumber(text)}
                            style={[
                                styles.addFriendSearchTelAndChooseCountryInput,
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText
                                :
                                commonStyles.darkPrimaryText
                            ]}
                            placeholderTextColor={
                                theme === lightMode
                                ?
                                commonStyles.lightSecondaryText.color
                                :
                                commonStyles.darkSecondaryText.color
                            }
                        />
                        {
                            phoneNumber.trim().length > 0
                            &&
                            <TouchableOpacity
                                onPress={() => setPhoneNumber("")}
                                style={[
                                    styles.addFriendSearchTelAndChooseCountryResetBtn
                                ]}
                            >
                                <Image
                                    source={require("../../assets/close-line-icon.png")}
                                    style={[
                                        styles.addFriendSearchTelAndChooseCountryResetBtnImage,
                                        {
                                            tintColor: theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText.color
                                            :
                                            commonStyles.darkSecondaryText.color
                                        }
                                    ]}
                                />
                            </TouchableOpacity>
                        }
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.addFriendSearchTelAndChooseCountryNextStepBtn,
                            {
                                backgroundColor:
                                phoneNumber.trim().length > 0
                                ?
                                commonStyles.primaryColor.color
                                :
                                theme === lightMode
                                ?
                                commonStyles.lightTertiaryBackground.backgroundColor
                                :
                                commonStyles.darkTertiaryBackground.backgroundColor
                            }
                            
                        ]}
                    >
                        <Image
                            source={require("../../assets/arrow-right-line-icon.png")}
                            style={[
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
                </View>
                <TouchableOpacity
                    style={[
                        styles.addFriendAnotherFeatureBox
                    ]}
                >
                    <Image
                        source={require("../../assets/qr-code-line-icon.png")}
                        style={[
                            styles.addFriendAnotherFeatureBoxIcon
                        ]}
                    />
                    <Text
                        style={[
                            styles.addFriendAnotherFeatureBoxText,
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText
                            :
                            commonStyles.darkPrimaryText
                        ]}
                    >{t("addFriendScanQrTitle")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.addFriendAnotherFeatureBox
                    ]}
                    onPress={() => navigation.navigate("ContactsInPhone")}
                >
                    <Image
                        source={require("../../assets/contacts-book-3-line-icon.png")}
                        style={[
                            styles.addFriendAnotherFeatureBoxIcon
                        ]}
                    />
                    <Text
                        style={[
                            styles.addFriendAnotherFeatureBoxText,
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText
                            :
                            commonStyles.darkPrimaryText
                        ]}
                    >{t("addFriendContactsInDevice")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.addFriendAnotherFeatureBox
                    ]}
                >
                    <Image
                        source={require("../../assets/contacts-book-line-icon.png")}
                        style={[
                            styles.addFriendAnotherFeatureBoxIcon
                        ]}
                    />
                    <Text
                        style={[
                            styles.addFriendAnotherFeatureBoxText,
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText
                            :
                            commonStyles.darkPrimaryText
                        ]}
                    >{t("addFriendFriendMyKnow")}</Text>
                </TouchableOpacity>

                <ModalShowCountryCode
                    setVisibleModal={setVisibleModal}
                    visibleModal={visibleModal}
                    setCurrentCountry={setCurrentCountry}
                />
            </SafeAreaView>
        </View>
    )
}