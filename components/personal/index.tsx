import {
    View,
    Text,
    Image,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Platform,
    UIManager,
    LayoutAnimation,
} from "react-native";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import commonStyles from "../../CommonStyles/commonStyles";
import { darkMode, lightMode, setTheme } from "../../redux_toolkit/slices/theme.slice";
import { useEffect, useRef, useState } from "react";
import OutsidePressHandler from "react-native-outside-press";
import getDateString from "../../utils/date";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { handleOpenActionSheet } from "../../utils/imagePicker";
import { LINK_UPDATE_IMAGE } from "@env";
import { updateAvatarImage } from "../../redux_toolkit/slices/userInfo.slice";
import { CustomRadioButton } from "../register/stepFourRegister";

interface PersonalProps {
    navigation: any;
    route: any
}

export default function Personal({navigation, route} : PersonalProps) {
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { t, i18n} = useTranslation();
    const [indexTabSelected, setIndexTabSelected] = useState(0);
    const [showPersonalPopup, setShowPersonalPopup] = useState(false);
    const userInfo = useSelector((state: IRootState) => state.userInfo);
    const { showActionSheetWithOptions } = useActionSheet();
    const [hasGalleryPermission, setHasGalleryPermission] = useState<
        null | boolean
    >(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<
        null | boolean
    >(null);
    const [avatar, setAvatar] = useState<null | string | string[]>(null);
    const previousAvatar = useRef<string | null>(null);
    const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
    const dispatch = useDispatch();

    if (Platform.OS === "android") {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    function handleClickTab(index: number): void {
        LayoutAnimation.configureNext(
            LayoutAnimation.create(300, "easeInEaseOut", "scaleY")
        );
        if (indexTabSelected === index) {
            setIndexTabSelected(-1);
            return;
        } else {
            setIndexTabSelected(index);
        }
    }
    function handleOpenActionSheetFn() {
        const [
            registerChooseImageFromLibrary,
            registerTakePhotoFromCamera,
            cancel,
        ] = [
            t("registerChooseImageFromLibrary"),
            t("registerTakePhotoFromCamera"),
            t("cancel"),
        ];
        handleOpenActionSheet({
            registerChooseImageFromLibrary,
            registerTakePhotoFromCamera,
            cancel,
            showActionSheetWithOptions,
            hasGalleryPermission,
            setHasGalleryPermission,
            setImages: setAvatar,
            hasCameraPermission,
            setHasCameraPermission,
            isMultiple: false,
        });
       
    }
    useEffect(()=>{
        if (avatar && typeof avatar === "string") {
            if (avatar !== previousAvatar.current) {
                previousAvatar.current = avatar;
                updateImageToServer();
            }
        }
    }, [avatar])

    function updateImageToServer() {
        console.log(avatar);
        
        if (avatar && typeof avatar === "string"){
            let formData = new FormData();
            let splitPath = avatar.split("/");
            let extName = splitPath[splitPath.length - 1].split(".").pop();
            formData.append("avatar", {
                uri: Platform.OS === "ios" ? avatar.replace("file://", "") : avatar,
                name: splitPath[splitPath.length - 1],
                type: `image/${extName}`,
            });

            fetch(LINK_UPDATE_IMAGE, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })
            .then(resp => resp.json())
            .then(data => dispatch(updateAvatarImage(data.avatar)))
            .catch(err => console.log(err));
        }
    }

    function getGenderUser(){
        if (i18n.language === "vi"){
            if (userInfo.user?.gender === "female"){
                return "Nữ"
            } else {
                return "Nam"
            }
        } else {
            if (userInfo.user?.gender === "female"){
                return "Female"
            } else {
                return "Male"
            }
        }
    }

    return userInfo.user ? (
        <View
            style={[
                styles.personalWrapper,
                theme === lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
            ]}
        >
            <StatusBar />
            <SafeAreaView
                style={{
                    flex: 1,
                    paddingVertical: 15,
                }}
            >
                <View style={[styles.personalHeaderWrapper]}>
                    <Text
                        style={[
                            styles.personalHeaderWrapperTitle,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {t("personalTitle")}
                    </Text>
                    <OutsidePressHandler
                        onOutsidePress={() => {
                            setShowPersonalPopup(false);
                        }}
                        style={{
                            position: "relative",
                            zIndex: 10,
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() =>
                                setShowPersonalPopup(!showPersonalPopup)
                            }
                        >
                            <Image
                                source={require("../../assets/more-vertical-line-icon.png")}
                                style={[
                                    styles.personalHeaderWrapperMore,
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
                        {showPersonalPopup && (
                            <View
                                style={[
                                    styles.personalHeaderMorePopup,
                                    theme === lightMode
                                        ? commonStyles.lightTertiaryBackground
                                        : commonStyles.darkTertiaryBackground,
                                    {
                                        shadowColor: "#0F223A",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.12,
                                        shadowRadius: 4,
                                        elevation: 4,
                                    },
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={()=> navigation.navigate("EditProfile")}
                                >
                                    <Text
                                        style={[
                                            styles.personalHeaderMorePopupItemText,
                                            theme == lightMode
                                                ? commonStyles.lightPrimaryText
                                                : commonStyles.darkPrimaryText,
                                        ]}
                                    >
                                        {t("profileEditInfo")}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=> navigation.navigate("ChangePassword")}
                                >
                                    <Text
                                        style={[
                                            styles.personalHeaderMorePopupItemText,
                                            theme == lightMode
                                                ? commonStyles.lightPrimaryText
                                                : commonStyles.darkPrimaryText,
                                        ]}
                                    >
                                        {t("profileEditChangePassword")}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </OutsidePressHandler>
                </View>
                <View
                    style={[
                        styles.personalHeaderBox,
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
                    <TouchableOpacity style={[styles.editNewAvatarBtn]}
                        onPress={handleOpenActionSheetFn}
                    >
                        <Image
                            source={{ uri: userInfo.user.avatar }}
                            style={[
                                styles.personalAvatarImage,
                                {
                                    borderColor:
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color,
                                },
                            ]}
                        />
                        <View
                            style={[
                                styles.personalEditAvatarIconBox,
                                {
                                    backgroundColor:
                                        theme == lightMode
                                            ? commonStyles.darkPrimaryBackground
                                                  .backgroundColor
                                            : commonStyles
                                                  .lightPrimaryBackground
                                                  .backgroundColor,
                                },
                            ]}
                        >
                            <Image
                                source={require("../../camera-edit-avatar.png")}
                                style={[
                                    styles.personalEditAvatarIcon,
                                    {
                                        tintColor:
                                            theme == lightMode
                                                ? commonStyles.darkPrimaryText
                                                      .color
                                                : commonStyles.lightPrimaryText
                                                      .color,
                                    },
                                ]}
                            />
                        </View>
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.personalUsernameText,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {userInfo.user.name}
                    </Text>
                    <View style={[styles.personalActivityBox]}>
                        <View
                            style={[
                                styles.personalActivityIcon,
                                {
                                    backgroundColor:
                                        commonStyles.activeOnlineColor.color,
                                },
                            ]}
                        ></View>
                        <Text
                            style={[
                                styles.personalActivityText,
                                theme === lightMode
                                    ? commonStyles.lightSecondaryText
                                    : commonStyles.darkSecondaryText,
                            ]}
                        >
                            Active
                        </Text>
                    </View>
                </View>
                <ScrollView style={[styles.personalScrollBox]}>
                    <Text
                        style={[
                            styles.personalDescriptionText,
                            theme === lightMode
                                ? commonStyles.lightSecondaryText
                                : commonStyles.darkSecondaryText,
                        ]}
                    >
                        "If several languages coalesce, the grammar of the
                        resulting language is more simple and regular than that
                        of the individual."
                    </Text>
                    <View
                        style={[
                            styles.chatDetailCollapsibleBox,
                            {
                                borderColor:
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
                            activeOpacity={1}
                            onPress={() => handleClickTab(0)}
                            style={[styles.personalToggleDetailBox]}
                        >
                            <View style={[styles.personalToggleDetailLeft]}>
                                <Image
                                    source={require("../../assets/user-chatlist-bottom-tab.png")}
                                    style={[
                                        styles.personalColabsibleIconLeft,
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
                                <Text
                                    style={[
                                        styles.personalColabsibleText,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    {t("chatProfileAboutTitle")}
                                </Text>
                            </View>
                            <Image
                                source={
                                    indexTabSelected === 0
                                        ? require("../../assets/arrow-up-s-line-icon.png")
                                        : require("../../assets/arrow-down-s-line-icon.png")
                                }
                                style={[
                                    styles.personalColabsibleIconRight,
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
                        {indexTabSelected === 0 && (
                            <View>
                                <View style={[styles.personalAboutItemBox]}>
                                    <Text
                                        style={[
                                            styles.personalAboutItemTitle,
                                            theme === lightMode
                                                ? commonStyles.lightSecondaryText
                                                : commonStyles.darkSecondaryText,
                                        ]}
                                    >
                                        {t("chatProfileAboutName")}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.personalAboutItemValue,
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryText
                                                : commonStyles.darkPrimaryText,
                                        ]}
                                    >
                                        {userInfo.user.name}
                                    </Text>
                                </View>
                                <View style={[styles.personalAboutItemBox]}>
                                    <Text
                                        style={[
                                            styles.personalAboutItemTitle,
                                            theme === lightMode
                                                ? commonStyles.lightSecondaryText
                                                : commonStyles.darkSecondaryText,
                                        ]}
                                    >
                                        {t("profileGender")}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.personalAboutItemValue,
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryText
                                                : commonStyles.darkPrimaryText,
                                        ]}
                                    >
                                        {getGenderUser()}
                                    </Text>
                                </View>
                                <View style={[styles.personalAboutItemBox]}>
                                    <Text
                                        style={[
                                            styles.personalAboutItemTitle,
                                            theme === lightMode
                                                ? commonStyles.lightSecondaryText
                                                : commonStyles.darkSecondaryText,
                                        ]}
                                    >
                                        {t("chatProfileAboutEmail")}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.personalAboutItemValue,
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryText
                                                : commonStyles.darkPrimaryText,
                                        ]}
                                    >
                                        {userInfo.user._id}
                                    </Text>
                                </View>
                                <View style={[styles.personalAboutItemBox]}>
                                    <Text
                                        style={[
                                            styles.personalAboutItemTitle,
                                            theme === lightMode
                                                ? commonStyles.lightSecondaryText
                                                : commonStyles.darkSecondaryText,
                                        ]}
                                    >
                                        {t("chatProfileAboutTime")}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.personalAboutItemValue,
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryText
                                                : commonStyles.darkPrimaryText,
                                        ]}
                                    >
                                        {getDateString(userInfo.user.createdAt)}
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
                        )}
                    </View>
                    <View
                        style={[
                            styles.chatDetailCollapsibleBox,
                            {
                                borderColor:
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
                            activeOpacity={1}
                            onPress={() => handleClickTab(1)}
                            style={[styles.personalToggleDetailBox]}
                        >
                            <View style={[styles.personalToggleDetailLeft]}>
                                <Image
                                    source={require("../../assets/settings-4-line-icon.png")}
                                    style={[
                                        styles.personalColabsibleIconLeft,
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
                                <Text
                                    style={[
                                        styles.personalColabsibleText,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    {t("chatProfileSetting")}
                                </Text>
                            </View>
                            <Image
                                source={
                                    indexTabSelected === 1
                                        ? require("../../assets/arrow-up-s-line-icon.png")
                                        : require("../../assets/arrow-down-s-line-icon.png")
                                }
                                style={[
                                    styles.personalColabsibleIconRight,
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
                        {indexTabSelected === 1 && (
                            <View style={[styles.personalFilesList]}>
                                <View
                                    style={[
                                        styles.settingItem,
                                        {
                                            borderColor:
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
                                    <Text
                                        style={[
                                            styles.personalSettingThemeTextTitle,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightPrimaryText
                                            :
                                            commonStyles.darkPrimaryText
                                        ]}
                                    >{t("chatProfileInterface")}</Text>

                                    <View
                                        style={[
                                            {
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 10,
                                            }
                                        ]}
                                    >
                                        <CustomRadioButton
                                            onPress={() => dispatch(setTheme(lightMode))}
                                            value={lightMode}
                                            selected={theme === lightMode}
                                        />
                                        <Text
                                            style={[
                                                theme === lightMode
                                                ?
                                                commonStyles.lightPrimaryText
                                                :
                                                commonStyles.darkPrimaryText
                                            ]}
                                        >{t("chatProfileLightMode")}</Text>
                                    </View>

                                    <View
                                        style={[
                                            {
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 10,
                                            }
                                        ]}
                                    >
                                        <CustomRadioButton
                                            onPress={() => dispatch(setTheme(darkMode))}
                                            value={darkMode}
                                            selected={theme === darkMode}
                                        />
                                        <Text
                                            style={[
                                                theme === lightMode
                                                ?
                                                commonStyles.lightPrimaryText
                                                :
                                                commonStyles.darkPrimaryText
                                            ]}
                                        >{t("chatProfileDarkMode")}</Text>
                                    </View> 
                                </View>
                                <View
                                    style={[
                                        styles.settingItem,
                                        {
                                            borderColor:
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
                                    <Text
                                        style={[
                                            styles.personalSettingThemeTextTitle,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightPrimaryText
                                            :
                                            commonStyles.darkPrimaryText
                                        ]}
                                    >{t("chatProfileLanguage")}</Text>

                                    <View
                                        style={[
                                            {
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 10,
                                            }
                                        ]}
                                    >
                                        <CustomRadioButton
                                            onPress={() => i18n.changeLanguage("vi")}
                                            value={"vi"}
                                            selected={i18n.language === "vi"}
                                        />
                                        <Text
                                            style={[
                                                theme === lightMode
                                                ?
                                                commonStyles.lightPrimaryText
                                                :
                                                commonStyles.darkPrimaryText
                                            ]}
                                        >{t("chatProfileVietnameseLanguage")}</Text>
                                    </View>

                                    <View
                                        style={[
                                            {
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 10,
                                            }
                                        ]}
                                    >
                                        <CustomRadioButton
                                            onPress={() => i18n.changeLanguage("en")}
                                            value={"en"}
                                            selected={i18n.language === "en"}
                                        />
                                        <Text
                                            style={[
                                                theme === lightMode
                                                ?
                                                commonStyles.lightPrimaryText
                                                :
                                                commonStyles.darkPrimaryText
                                            ]}
                                        >{t("chatProfileEnglishLanguage")}</Text>
                                    </View> 
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    ) : (
        <View></View>
    );
}
