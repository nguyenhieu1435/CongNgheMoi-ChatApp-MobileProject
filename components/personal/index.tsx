import { View, Text, Image, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, Platform, UIManager, LayoutAnimation } from 'react-native'
import { styles } from './styles'
import { useSelector } from 'react-redux'
import { IRootState } from '../../redux_toolkit/store'
import { useTranslation } from 'react-i18next'
import commonStyles from '../../CommonStyles/commonStyles'
import { lightMode } from '../../redux_toolkit/slices/theme.slice'
import { useState } from 'react'
import OutsidePressHandler from 'react-native-outside-press'
import getDateString from '../../utils/date'

export default function Personal() {
    const theme = useSelector((state: IRootState) => state.theme.theme)
    const {t} = useTranslation();
    const [indexTabSelected, setIndexTabSelected] = useState(0)
    const [showPersonalPopup, setShowPersonalPopup] = useState(false)
    const userInfo = useSelector((state: IRootState) => state.userInfo.user)

    
    if(Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    function handleClickTab(index: number): void {
      LayoutAnimation.configureNext(LayoutAnimation.create(300, 'easeInEaseOut', 'scaleY'))
      if (indexTabSelected === index) {
        setIndexTabSelected(-1)
        return
      } else {
        setIndexTabSelected(index)
      }
    }

    return (
      userInfo 
      ?
      <View
        style={[
          styles.personalWrapper,
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
            paddingVertical: 15
          }}
        >
          <View
            style={[
                styles.personalHeaderWrapper
            ]}
          >
            <Text
                style={[
                    styles.personalHeaderWrapperTitle,
                    theme === lightMode
                    ?
                    commonStyles.lightPrimaryText
                    :
                    commonStyles.darkPrimaryText
                ]}
            >{t("personalTitle")}</Text>
            <OutsidePressHandler
                onOutsidePress={()=> {
                    setShowPersonalPopup(false)
                }}
                style={{
                    position: "relative",
                    zIndex: 10
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={()=> setShowPersonalPopup(!showPersonalPopup)}
                >
                    <Image
                        source={require("../../assets/more-vertical-line-icon.png")}
                        style={[
                            styles.personalHeaderWrapperMore,
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
                {
                    showPersonalPopup
                    &&
                    <View
                        style={[
                            styles.personalHeaderMorePopup,
                            theme === lightMode
                            ?
                            commonStyles.lightTertiaryBackground
                            :
                            commonStyles.darkTertiaryBackground,
                            {
                                shadowColor: '#0F223A',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.12,
                                shadowRadius: 4,
                                elevation: 4, 
                            }
                        ]}
                    >
                        <TouchableOpacity>
                            <Text
                                style={[
                                    styles.personalHeaderMorePopupItemText,
                                    theme == lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text
                                style={[
                                    styles.personalHeaderMorePopupItemText,
                                    theme == lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                ]}
                            >Action</Text>
                        </TouchableOpacity>
                    </View>
                }
            </OutsidePressHandler>
          </View>
          <View
            style={[
              styles.personalHeaderBox,
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
            <Image
              source={{uri: userInfo.avatar}}
              style={[
                styles.personalAvatarImage
              ]}
            />
            <Text
              style={[
                styles.personalUsernameText,
                theme === lightMode
                ?
                commonStyles.lightPrimaryText
                :
                commonStyles.darkPrimaryText
              ]}
            >{userInfo.name}</Text>
            <View
              style={[
                styles.personalActivityBox
              ]}
            >
              <View
                style={[
                  styles.personalActivityIcon,
                  {
                    backgroundColor: commonStyles.activeOnlineColor.color
                  }
                ]}
              >
              </View>
              <Text
                style={[
                  styles.personalActivityText,
                  theme === lightMode
                  ?
                  commonStyles.lightSecondaryText
                  :
                  commonStyles.darkSecondaryText
                ]}
              >Active</Text>
            </View>
          </View>
          <ScrollView
            style={[
              styles.personalScrollBox
            ]}
          >
            <Text
              style={[
                styles.personalDescriptionText,
                theme === lightMode
                ?
                commonStyles.lightSecondaryText
                :
                commonStyles.darkSecondaryText
              ]}
            >
              "If several languages coalesce, the grammar of the resulting language 
              is more simple and regular than that of the individual."
            </Text>
            <View 
              style={[
                styles.chatDetailCollapsibleBox,
                {
                  borderColor: theme === lightMode
                  ?
                  commonStyles.chatNavbarBorderBottomColorLight.color
                  :
                  commonStyles.chatNavbarBorderBottomColorDark.color
                }
              ]}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={()=> handleClickTab(0)}
                style={
                  [
                    styles.personalToggleDetailBox
                  ]
                }
              >
                <View
                  style={[
                    styles.personalToggleDetailLeft
                  ]}
                >
                  <Image
                    source={require("../../assets/user-chatlist-bottom-tab.png")}
                    style={[
                      styles.personalColabsibleIconLeft,
                      {
                        tintColor: theme === lightMode
                        ?
                        commonStyles.lightPrimaryText.color
                        :
                        commonStyles.darkPrimaryText.color
                      }
                    ]}
                  />
                  <Text
                    style={[
                      styles.personalColabsibleText,
                      theme === lightMode
                      ?
                      commonStyles.lightPrimaryText
                      :
                      commonStyles.darkPrimaryText
                    ]}
                  >{t("chatProfileAboutTitle")}</Text>
                </View>
                <Image
                  source={
                    indexTabSelected === 0
                    ?
                    require("../../assets/arrow-up-s-line-icon.png")
                    :
                    require("../../assets/arrow-down-s-line-icon.png")
                  }
                  style={[
                    styles.personalColabsibleIconRight,
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
              {
                indexTabSelected === 0
                &&
                <View>
                  <View
                    style={[
                      styles.personalAboutItemBox
                    ]}
                  >
                    <Text
                      style={[
                        styles.personalAboutItemTitle,
                        theme === lightMode
                        ?
                        commonStyles.lightSecondaryText
                        :
                        commonStyles.darkSecondaryText
                      ]}
                    >
                      {t("chatProfileAboutName")}
                    </Text>
                    <Text
                      style={[
                        styles.personalAboutItemValue,
                        theme === lightMode
                        ?
                        commonStyles.lightPrimaryText
                        :
                        commonStyles.darkPrimaryText
                      ]}
                    >
                      {userInfo.name}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.personalAboutItemBox
                    ]}
                  >
                    <Text
                      style={[
                        styles.personalAboutItemTitle,
                        theme === lightMode
                        ?
                        commonStyles.lightSecondaryText
                        :
                        commonStyles.darkSecondaryText
                      ]}
                    >
                      {t("chatProfileAboutEmail")}
                    </Text>
                    <Text
                      style={[
                        styles.personalAboutItemValue,
                        theme === lightMode
                        ?
                        commonStyles.lightPrimaryText
                        :
                        commonStyles.darkPrimaryText
                      ]}
                    >
                      {userInfo.phone}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.personalAboutItemBox
                    ]}
                  >
                    <Text
                      style={[
                        styles.personalAboutItemTitle,
                        theme === lightMode
                        ?
                        commonStyles.lightSecondaryText
                        :
                        commonStyles.darkSecondaryText
                      ]}
                    >
                      {t("chatProfileAboutTime")}
                    </Text>
                    <Text
                      style={[
                        styles.personalAboutItemValue,
                        theme === lightMode
                        ?
                        commonStyles.lightPrimaryText
                        :
                        commonStyles.darkPrimaryText
                      ]}
                    >
                      {getDateString(userInfo.createdAt)}
                    </Text>
                  </View>
                  {/* <View
                    style={[
                      styles.personalAboutItemBox
                    ]}
                  >
                    <Text
                      style={[
                        styles.personalAboutItemTitle,
                        theme === lightMode
                        ?
                        commonStyles.lightSecondaryText
                        :
                        commonStyles.darkSecondaryText
                      ]}
                    >
                      {t("chatProfileAboutLocation")}
                    </Text>
                    <Text
                      style={[
                        styles.personalAboutItemValue,
                        theme === lightMode
                        ?
                        commonStyles.lightPrimaryText
                        :
                        commonStyles.darkPrimaryText
                      ]}
                    >
                      Doris Brown
                    </Text>
                  </View> */}
                </View>
              }
            </View>
            <View
              style={[
                styles.chatDetailCollapsibleBox,
                {
                  borderColor: theme === lightMode
                  ?
                  commonStyles.chatNavbarBorderBottomColorLight.color
                  :
                  commonStyles.chatNavbarBorderBottomColorDark.color
                }
              ]}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={()=> handleClickTab(1)}
                style={
                  [
                    styles.personalToggleDetailBox
                  ]
                }
              >
                <View
                  style={[
                    styles.personalToggleDetailLeft
                  ]}
                >
                  <Image
                    source={require("../../assets/attachment-line-icon.png")}
                    style={[
                      styles.personalColabsibleIconLeft,
                      {
                        tintColor: theme === lightMode
                        ?
                        commonStyles.lightPrimaryText.color
                        :
                        commonStyles.darkPrimaryText.color
                      }
                    ]}
                  />
                  <Text
                    style={[
                      styles.personalColabsibleText,
                      theme === lightMode
                      ?
                      commonStyles.lightPrimaryText
                      :
                      commonStyles.darkPrimaryText
                    ]}
                  >{t("chatProfileAttachedFiles")}</Text>
                </View>
                <Image
                  source={
                    indexTabSelected === 1
                    ?
                    require("../../assets/arrow-up-s-line-icon.png")
                    :
                    require("../../assets/arrow-down-s-line-icon.png")
                  }
                  style={[
                    styles.personalColabsibleIconRight,
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
              {
                indexTabSelected === 1
                &&
                <View
                  style={[
                    styles.personalFilesList
                  ]}
                >
                  <View
                    style={[
                      styles.personalFilesItem,
                      {
                        borderColor: theme === lightMode
                        ?
                        commonStyles.chatNavbarBorderBottomColorLight.color
                        :
                        commonStyles.chatNavbarBorderBottomColorDark.color
                      }
                    ]}
                  >
                    <View
                      style={[
                        styles.personalFilesItemImgBox,
                        {
                          backgroundColor: theme === lightMode
                          ?
                          "#ECE1FC"
                          :
                          "#7269ef26"
                        }
                      ]}
                    >
                      <Image
                        source={require("../../assets/file-text-fill-icon.png")}
                        resizeMode='contain'
                        style={{
                          width: 20, height: 20,
                          tintColor: commonStyles.primaryColor.color
                        }}
                      />
                    </View>
                    <View
                      style={[
                        styles.personalFilesItemInfoBox
                      ]}
                    >
                      <Text
                        style={[
                          styles.personalFilesItemFileName,
                          theme === lightMode
                          ?
                          commonStyles.lightPrimaryText
                          :
                          commonStyles.darkPrimaryText
                        ]}
                      >Admin-A.zip</Text>
                      <Text
                        style={[
                          styles.personalFilesItemFileSize,
                          theme === lightMode
                          ?
                          commonStyles.lightSecondaryText
                          :
                          commonStyles.darkSecondaryText
                        ]}
                      >1.2 MB</Text>
                    </View>
                    <TouchableOpacity>
                      <Image
                        source={require("../../assets/download-2-line-icon.png")}
                        style={[
                          styles.personalSecondIcon,
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
                    <TouchableOpacity>
                      <Image
                        source={require("../../assets/more-fill-icon.png")}
                        style={[
                          styles.personalSecondIcon,
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
                  </View>
                  <View
                    style={[
                      styles.personalFilesItem,
                      {
                        borderColor: theme === lightMode
                        ?
                        commonStyles.chatNavbarBorderBottomColorLight.color
                        :
                        commonStyles.chatNavbarBorderBottomColorDark.color
                      }
                    ]}
                  >
                    <View
                      style={[
                        styles.personalFilesItemImgBox,
                        {
                          backgroundColor: theme === lightMode
                          ?
                          "#ECE1FC"
                          :
                          "#7269ef26"
                        }
                      ]}
                    >
                      <Image
                        source={require("../../assets/image-fill-icon.png")}
                        resizeMode='contain'
                        style={{
                          width: 20, height: 20,
                          tintColor: commonStyles.primaryColor.color
                        }}
                      />
                    </View>
                    <View
                      style={[
                        styles.personalFilesItemInfoBox
                      ]}
                    >
                      <Text
                        style={[
                          styles.personalFilesItemFileName,
                          theme === lightMode
                          ?
                          commonStyles.lightPrimaryText
                          :
                          commonStyles.darkPrimaryText
                        ]}
                      >Admin-A.zip</Text>
                      <Text
                        style={[
                          styles.personalFilesItemFileSize,
                          theme === lightMode
                          ?
                          commonStyles.lightSecondaryText
                          :
                          commonStyles.darkSecondaryText
                        ]}
                      >1.2 MB</Text>
                    </View>
                    <TouchableOpacity>
                      <Image
                        source={require("../../assets/download-2-line-icon.png")}
                        style={[
                          styles.personalSecondIcon,
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
                    <TouchableOpacity>
                      <Image
                        source={require("../../assets/more-fill-icon.png")}
                        style={[
                          styles.personalSecondIcon,
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
                  </View>
                </View>
              }
            </View>
           
          </ScrollView>
        </SafeAreaView>
      </View>
      :
      <View></View>
    )
}