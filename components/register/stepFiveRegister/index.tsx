import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Modal,
    Platform,
    ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IRootState } from "../../../redux_toolkit/store";
import { lightMode } from "../../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../../CommonStyles/commonStyles";
import { Octicons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateAvatarImage } from "../../../redux_toolkit/slices/userInfo.slice";
import { LINK_UPDATE_IMAGE } from "@env";
import * as FileSystem from "expo-file-system";
import { handleOpenActionSheet } from "../../../utils/imagePicker";

interface Props {
    navigation: any;
    route: any;
}

export default function StepFiveRegister({ navigation, route }: Props) {
    const { t } = useTranslation();
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { showActionSheetWithOptions } = useActionSheet();
    const [hasGalleryPermission, setHasGalleryPermission] = useState<
        null | boolean
    >(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<
        null | boolean
    >(null);
    const [avatar, setAvatar] = useState<null | string | string[]>(null);
    const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
    const dispatch = useDispatch();

    function handleOpenActionSheetFn() {
        const [registerChooseImageFromLibrary, registerTakePhotoFromCamera, cancel] = [
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
        })
    }

    async function handleNavigateNextPage() {
        if (avatar && typeof avatar === "string") {
            setIsUploadingImage(true);
            try {
                let formData = new FormData();
                let splitPath = avatar.split("/");
                let extName = splitPath[splitPath.length - 1].split(".").pop();
                formData.append("avatar", {
                    uri:
                        Platform.OS === "ios"
                            ? avatar.replace("file://", "")
                            : avatar,
                    name: splitPath[splitPath.length - 1],
                    type: `image/${extName}`,
                });

                const response = await fetch(LINK_UPDATE_IMAGE, {
                    method: "POST",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${route.params?.accessToken}`,
                    },
                });
                // console.log(response)
                if (response.ok) {
                    const data = await response.json();
                    dispatch(updateAvatarImage(data.avatar));
                }
            } catch (error) {
                console.log(error);
            }
            setIsUploadingImage(false);
        }
        navigation.navigate("PrimaryBottomTab");
    }

    return (
        <View
            style={[
                styles.wrapperAllBox,
                theme == lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
            ]}
        >
            <StatusBar />
            <SafeAreaView style={[styles.boxContainer]}>
                <View style={[styles.navigationTabBox]}>
                    <TouchableOpacity
                        style={styles.btnReturnInitialPage}
                        onPress={() => navigation.goBack()}
                    >
                        <FontAwesome
                            name="angle-left"
                            size={28}
                            color={commonStyles.darkPrimaryText.color}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.currentTabName]}>
                        {t("registerAvatarTitle")}
                    </Text>
                </View>
                <Text
                    style={[
                        theme == lightMode
                            ? commonStyles.lightPrimaryText
                            : commonStyles.darkPrimaryText,
                        theme == lightMode
                            ? commonStyles.lightSecondaryBackground
                            : commonStyles.darkSecondaryBackground,
                        styles.chooseAvatarDesc,
                    ]}
                >
                    {t("registerChooseAvatarDesc")}
                </Text>
                <View style={styles.flex1}>
                    <View style={[styles.boxChooseAvatar]}>
                        <View style={[styles.boxImageAvatar]}>
                            <Image
                                source={
                                    avatar
                                        ? { uri: avatar }
                                        : { uri: route.params?.avatar }
                                }
                                style={styles.imgAvatar}
                            />
                            <TouchableOpacity
                                activeOpacity={1}
                                style={[styles.btnIconEditAvatar]}
                                onPress={handleOpenActionSheetFn}
                            >
                                <Octicons
                                    name="pencil"
                                    size={16}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={[
                                styles.descChooseAvatarTitle,
                                theme === lightMode
                                    ? commonStyles.lightSecondaryText
                                    : commonStyles.darkSecondaryText,
                            ]}
                        >
                            {t("registerChooseImageFromDirectoryDesc")}
                        </Text>
                        <View style={[styles.boxWrapperChooseAvatarBtn]}>
                            <TouchableOpacity
                                style={[styles.btnChooseAvatarNow]}
                                onPress={handleOpenActionSheetFn}
                            >
                                <Text style={[styles.textChooseAvatarNow]}>
                                    {t("registerChooseImageNow")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.boxContainBtnNavigation]}>
                        <View style={[styles.btnContinueWrapper]}>
                            <TouchableOpacity
                                style={[
                                    styles.btnContinueBox,
                                    styles.btnContinueBoxActive,
                                ]}
                                activeOpacity={1}
                                onPress={handleNavigateNextPage}
                                disabled={isUploadingImage}
                            >
                                {isUploadingImage ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="white"
                                    />
                                ) : (
                                    <Text
                                        style={[
                                            styles.textBtnContinueBox,
                                            commonStyles.darkPrimaryText,
                                        ]}
                                    >
                                        {t("next")}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}
