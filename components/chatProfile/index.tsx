import { View, Text, StatusBar, SafeAreaView, LayoutAnimation, Platform, TouchableOpacity, Image, UIManager } from 'react-native'
import { useSelector } from 'react-redux'
import { IRootState } from '../../redux_toolkit/store'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { lightMode } from '../../redux_toolkit/slices/theme.slice'
import commonStyles from '../../CommonStyles/commonStyles'
import { useState } from 'react'

interface ChatProfileProps {
  navigation: any
}

export default function ChatProfile(props : ChatProfileProps) {
    const {navigation} = props
    const theme = useSelector<IRootState>(state => state.theme.theme)
    const {t} = useTranslation();
    const [indexTabSelected, setIndexTabSelected] = useState(0)

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
      <View
        style={[
          styles.chatProfileWrapper,
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
              styles.chatProfileBoxClose
            ]}
          >
            <TouchableOpacity
              onPress={()=> navigation.goBack()}
            >
              <Image
                source={require("../../assets/close-line-icon.png")}
                style={[{
                  width: 22,
                  height: 22,
                  padding: 5
                }]}
                tintColor={
                  theme == lightMode
                  ?
                  commonStyles.lightSecondaryText.color
                  :
                  commonStyles.darkSecondaryText.color
                }
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.chatProfileHeaderBox,
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
              source={{uri: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"}}
              style={[
                styles.chatProfileAvatarImage
              ]}
            />
            <Text
              style={[
                styles.chatProfileUsernameText,
                theme === lightMode
                ?
                commonStyles.lightPrimaryText
                :
                commonStyles.darkPrimaryText
              ]}
            >Doris Brown</Text>
            <View
              style={[
                styles.chatProfileActivityBox
              ]}
            >
              <View
                style={[
                  styles.chatProfileActivityIcon,
                  {
                    backgroundColor: commonStyles.activeOnlineColor.color
                  }
                ]}
              >
              </View>
              <Text
                style={[
                  styles.chatProfileActivityText,
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
              styles.chatProfileScrollBox
            ]}
          >
            <Text
              style={[
                styles.chatProfileDescriptionText,
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
                    styles.chatProfileToggleDetailBox
                  ]
                }
              >
                <View
                  style={[
                    styles.chatProfileToggleDetailLeft
                  ]}
                >
                  <Image
                    source={require("../../assets/user-chatlist-bottom-tab.png")}
                    style={[
                      styles.chatProfileColabsibleIconLeft,
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
                      styles.chatProfileColabsibleText,
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
                    styles.chatProfileColabsibleIconRight,
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
                      styles.chatProfileAboutItemBox
                    ]}
                  >
                    <Text
                      style={[
                        styles.chatProfileAboutItemTitle,
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
                        styles.chatProfileAboutItemValue,
                        theme === lightMode
                        ?
                        commonStyles.lightPrimaryText
                        :
                        commonStyles.darkPrimaryText
                      ]}
                    >
                      Doris Brown
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.chatProfileAboutItemBox
                    ]}
                  >
                    <Text
                      style={[
                        styles.chatProfileAboutItemTitle,
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
                        styles.chatProfileAboutItemValue,
                        theme === lightMode
                        ?
                        commonStyles.lightPrimaryText
                        :
                        commonStyles.darkPrimaryText
                      ]}
                    >
                      Doris Brown
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.chatProfileAboutItemBox
                    ]}
                  >
                    <Text
                      style={[
                        styles.chatProfileAboutItemTitle,
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
                        styles.chatProfileAboutItemValue,
                        theme === lightMode
                        ?
                        commonStyles.lightPrimaryText
                        :
                        commonStyles.darkPrimaryText
                      ]}
                    >
                      Doris Brown
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.chatProfileAboutItemBox
                    ]}
                  >
                    <Text
                      style={[
                        styles.chatProfileAboutItemTitle,
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
                        styles.chatProfileAboutItemValue,
                        theme === lightMode
                        ?
                        commonStyles.lightPrimaryText
                        :
                        commonStyles.darkPrimaryText
                      ]}
                    >
                      Doris Brown
                    </Text>
                  </View>
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
                    styles.chatProfileToggleDetailBox
                  ]
                }
              >
                <View
                  style={[
                    styles.chatProfileToggleDetailLeft
                  ]}
                >
                  <Image
                    source={require("../../assets/attachment-line-icon.png")}
                    style={[
                      styles.chatProfileColabsibleIconLeft,
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
                      styles.chatProfileColabsibleText,
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
                    styles.chatProfileColabsibleIconRight,
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
                    styles.chatProfileFilesList
                  ]}
                >
                  <View
                    style={[
                      styles.chatProfileFilesItem,
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
                        styles.chatProfileFilesItemImgBox,
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
                        styles.chatProfileFilesItemInfoBox
                      ]}
                    >
                      <Text
                        style={[
                          styles.chatProfileFilesItemFileName,
                          theme === lightMode
                          ?
                          commonStyles.lightPrimaryText
                          :
                          commonStyles.darkPrimaryText
                        ]}
                      >Admin-A.zip</Text>
                      <Text
                        style={[
                          styles.chatProfileFilesItemFileSize,
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
                          styles.chatProfileSecondIcon,
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
                          styles.chatProfileSecondIcon,
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
                      styles.chatProfileFilesItem,
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
                        styles.chatProfileFilesItemImgBox,
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
                        styles.chatProfileFilesItemInfoBox
                      ]}
                    >
                      <Text
                        style={[
                          styles.chatProfileFilesItemFileName,
                          theme === lightMode
                          ?
                          commonStyles.lightPrimaryText
                          :
                          commonStyles.darkPrimaryText
                        ]}
                      >Admin-A.zip</Text>
                      <Text
                        style={[
                          styles.chatProfileFilesItemFileSize,
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
                          styles.chatProfileSecondIcon,
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
                          styles.chatProfileSecondIcon,
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
                onPress={()=> handleClickTab(2)}
                style={
                  [
                    styles.chatProfileToggleDetailBox
                  ]
                }
              >
                <View
                  style={[
                    styles.chatProfileToggleDetailLeft
                  ]}
                >
                  <Image
                    source={require("../../assets/group-line-icon.png")}
                    style={[
                      styles.chatProfileColabsibleIconLeft,
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
                      styles.chatProfileColabsibleText,
                      theme === lightMode
                      ?
                      commonStyles.lightPrimaryText
                      :
                      commonStyles.darkPrimaryText
                    ]}
                  >{t("chatProfileAttachedMembers")}</Text>
                </View>
                <Image
                  source={
                    indexTabSelected === 2
                    ?
                    require("../../assets/arrow-up-s-line-icon.png")
                    :
                    require("../../assets/arrow-down-s-line-icon.png")
                  }
                  style={[
                    styles.chatProfileColabsibleIconRight,
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
                indexTabSelected == 2
                &&
                <View
                  style={[
                    styles.chatProfileMemberList
                  ]}
                >
                  <View
                    style={[
                      styles.chatProfileMemberItem
                    ]}
                  >
                    <Image
                      source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0-kPnVziTcIJEMOtUOGpqcrUTXGv6-OU_GCzo3kvNNw&s"}}
                      style={[
                        styles.chatProfileMemberAvatar
                      ]}
                    />
                    <Text
                      style={[
                        styles.chatProfileMemberName,
                        theme === lightMode
                        ?
                        commonStyles.lightPrimaryText
                        :
                        commonStyles.darkPrimaryText
                      ]}
                    >
                      Doris Brown
                    </Text>
                    <Text
                      style={[
                        styles.chatProfileMemberRole,
                        theme === lightMode
                        ?
                        commonStyles.lightSecondaryText
                        :
                        commonStyles.darkSecondaryText,
                        {
                          backgroundColor: commonStyles.redPrimaryBackground.backgroundColor,
                          color: commonStyles.redPrimaryColor.color
                        
                        }
                      ]}
                    >
                      Admin
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.chatProfileMemberItem
                    ]}
                  >
                    <Image
                      source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0-kPnVziTcIJEMOtUOGpqcrUTXGv6-OU_GCzo3kvNNw&s"}}
                      style={[
                        styles.chatProfileMemberAvatar
                      ]}
                    />
                    <Text
                      style={[
                        styles.chatProfileMemberName,
                        theme === lightMode
                        ?
                        commonStyles.lightPrimaryText
                        :
                        commonStyles.darkPrimaryText
                      ]}
                    >
                      Doris Brown
                    </Text>
                    
                  </View>
                </View>
              }
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
}