import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux_toolkit/store';
import { lightMode } from '../../redux_toolkit/slices/theme.slice';
import commonStyles from '../../CommonStyles/commonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import ToggleSwitch from 'toggle-switch-react-native';
import { useState } from 'react';

interface SearchHistoryModificationProps {
    navigation: any
}

export default function SearchHistoryModification({navigation} : SearchHistoryModificationProps) {
    const {t} = useTranslation();
    const theme = useSelector((state: IRootState) => state.theme.theme)
    const [saveContactSearched, setSaveContactSearched] = useState(true)
    const [saveKeywordSearch, setSaveKeywordSearch] = useState(true)

    return (
        <View
          style={[
            styles.searchHistoryModificationWrapper,
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
                styles.searchHistoryModificationContainer,
              ]}
            >
                <View
                  style={[
                    styles.searchHistoryModificationHeader,
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
                            styles.searchHistoryModificationBackBtn
                        ]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                          source={require("../../assets/arrow-left-s-line-icon.png")}
                          style={[
                            styles.searchHistoryModificationBackIcon,
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
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.searchHistoryModificationTitle,
                        theme === lightMode
                        ?
                        commonStyles.lightPrimaryText
                        :
                        commonStyles.darkPrimaryText
                      ]}
                    >{t("searchHistoryModificationTitle")}</Text>
                </View>
                <ScrollView>
                      <Text
                          style={[
                              styles.searchHistoryBodyTitle,
                              {
                                borderBottomColor:
                                  theme === lightMode
                                  ?
                                  commonStyles.chatNavbarBorderBottomColorLight.color
                                  :
                                  commonStyles.chatNavbarBorderBottomColorDark.color,
                                color:
                                  theme === lightMode
                                  ?
                                  commonStyles.lightPrimaryText.color
                                  :
                                  commonStyles.darkPrimaryText.color
                              
                              }
                          ]}
                      >
                          {t("searchHistoryModificationHistoryTitle")}
                      </Text>
                      <View
                      >
                          <View
                              style={[
                                styles.searchHistoryBodySettingBox
                              ]}
                          >
                            <Text
                              style={[
                                styles.searchHistoryBodySettingTitle,
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText
                                :
                                commonStyles.darkPrimaryText
                              ]}
                            >{t("searchHistoryModificationSaveContactSearched")}</Text>
                            <ToggleSwitch
                              isOn={saveContactSearched}
                              onColor={commonStyles.primaryColor.color}
                              offColor={
                                theme === lightMode
                                ?
                                commonStyles.lightSecondaryText.color
                                :
                                commonStyles.darkSecondaryText.color
                              
                              }
                              onToggle={() => setSaveContactSearched(!saveContactSearched)}
                              size="medium"
                            />
                          </View>
                          <View
                              style={[
                                styles.searchHistoryContactSearchedList
                              ]}
                          >
                              <View
                                style={[
                                  styles.searchHistoryContactSearchedItem
                                ]}
                              >
                                  <Image
                                      source={{uri: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"}}
                                      style={[
                                          styles.searchHistoryContactSearchedAvatar
                                      ]}
                                  />
                                  <Text
                                      style={[
                                          styles.searchHistoryContactSearchedName,
                                          theme === lightMode
                                          ?
                                          commonStyles.lightPrimaryText
                                          :
                                          commonStyles.darkPrimaryText
                                      ]}
                                  >Khánh Hưng</Text>

                                  <TouchableOpacity
                                      style={[
                                          styles.searchHistoryContactSearchedRemoveBtn
                                      ]}
                                  >
                                    <Image
                                      source={require("../../assets/close-line-icon.png")}
                                      style={[
                                        styles.searchHistoryContactSearchedRemoveIcon,
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
                                  </TouchableOpacity>
                              </View>
                              <View
                                style={[
                                  styles.searchHistoryContactSearchedItem
                                ]}
                              >
                                  <Image
                                      source={{uri: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"}}
                                      style={[
                                          styles.searchHistoryContactSearchedAvatar
                                      ]}
                                  />
                                  <Text
                                      style={[
                                          styles.searchHistoryContactSearchedName,
                                          theme === lightMode
                                          ?
                                          commonStyles.lightPrimaryText
                                          :
                                          commonStyles.darkPrimaryText
                                      ]}
                                  >Khánh Hưng</Text>

                                  <TouchableOpacity
                                      style={[
                                          styles.searchHistoryContactSearchedRemoveBtn
                                      ]}
                                  >
                                    <Image
                                      source={require("../../assets/close-line-icon.png")}
                                      style={[
                                        styles.searchHistoryContactSearchedRemoveIcon,
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
                                  </TouchableOpacity>
                              </View>
                          </View>
                      </View>
                      <View>
                          <View
                                style={[
                                  styles.searchHistoryBodySettingBox
                                ]}
                            >
                              <Text
                                style={[
                                  styles.searchHistoryBodySettingTitle,
                                  theme === lightMode
                                  ?
                                  commonStyles.lightPrimaryText
                                  :
                                  commonStyles.darkPrimaryText
                                ]}
                              >{t("searchHistoryModificationSaveKeywordSearched")}</Text>
                              <ToggleSwitch
                                isOn={saveKeywordSearch}
                                onColor={commonStyles.primaryColor.color}
                                offColor={
                                  theme === lightMode
                                  ?
                                  commonStyles.lightSecondaryText.color
                                  :
                                  commonStyles.darkSecondaryText.color
                                
                                }
                                onToggle={() => setSaveKeywordSearch(!saveKeywordSearch)}
                                size="medium"
                              />
                          </View>
                          <View
                              style={[
                                styles.searchHistoryContactSearchedList
                              ]}
                          >
                              <View
                                style={[
                                  styles.searchHistoryContactSearchedItem
                                ]}
                              >
                                  <Image
                                      source={require("../../assets/search-line-icon.png")}
                                      style={[
                                          styles.searchHistoryKeywordSearchedAvatar,
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
                                          styles.searchHistoryContactSearchedName,
                                          theme === lightMode
                                          ?
                                          commonStyles.lightPrimaryText
                                          :
                                          commonStyles.darkPrimaryText
                                      ]}
                                  >Khánh Hưng</Text>

                                  <TouchableOpacity
                                      style={[
                                          styles.searchHistoryContactSearchedRemoveBtn
                                      ]}
                                  >
                                    <Image
                                      source={require("../../assets/close-line-icon.png")}
                                      style={[
                                        styles.searchHistoryContactSearchedRemoveIcon,
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
                                  </TouchableOpacity>
                              </View>
                             
                          </View>
                      </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}