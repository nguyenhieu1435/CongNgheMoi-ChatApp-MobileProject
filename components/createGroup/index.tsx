import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    SectionList,
    Dimensions,
    Alert,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import OutsidePressHandler from "react-native-outside-press";
import { CustomRadioButton } from "../register/stepFourRegister";
import EmojiPicker from "rn-emoji-keyboard";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";

const typeSelectedEnum = {
    recent: "recent",
    contact: "contact",
};
interface ICreateGroupProps {
    navigation: any;
    route: any;
}

const { width: WIDTH } = Dimensions.get("window");

export default function CreateGroup({ navigation, route }: ICreateGroupProps) {
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { t } = useTranslation();
    const [usersSelected, setUsersSelected] = useState<string[]>([]);
    const [isFocusInputName, setIsFocusInputName] = useState(false);
    const [isKeyboardDefault, setIsKeyBoardDefault] = useState(true);
    const [textSearch, setTextSearch] = useState("");
    const [typeSelected, setTypeSelected] = useState(typeSelectedEnum.recent);
    const [groupName, setGroupName] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const { showActionSheetWithOptions } = useActionSheet();
    const [hasGalleryPermission, setHasGalleryPermission] = useState<
        null | boolean
    >(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<
        null | boolean
    >(null);
    const [groupAvatar, setGroupAvatar] = useState<null | string>(null);
    const [usersByRecent, setUsersByRecent] = useState([
        {
            userName: "User1",
            avatarURL:
                "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
            activityTime: "2024-03-12T12:00:00Z",
            userID: "123456789",
            tel: "0123456789",
        },
        {
            userName: "User2",
            avatarURL:
                "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
            activityTime: "2024-03-12T12:00:00Z",
            userID: "234567890",
            tel: "1234567890",
        },
        {
            userName: "User3",
            avatarURL:
                "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
            activityTime: "2024-03-12T12:00:00Z",
            userID: "345678901",
            tel: "2345678901",
        },
        {
            userName: "User4",
            avatarURL:
                "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
            activityTime: "2024-03-14T14:49:32.995Z",
            userID: "456789012",
            tel: "3456789012",
        },
        {
            userName: "User5",
            avatarURL:
                "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
            activityTime: "2024-03-14T14:49:32.995Z",
            userID: "567890123",
            tel: "4567890123",
        },
        {
            userName: "User6",
            avatarURL:
                "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
            activityTime: "2024-03-14T14:49:32.995Z",
            userID: "678901234",
            tel: "5678901234",
        },
        {
            userName: "User7",
            avatarURL:
                "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
            activityTime: "2024-03-14T14:49:32.995Z",
            userID: "789012345",
            tel: "6789012345",
        },
        {
            userName: "User8",
            avatarURL:
                "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
            activityTime: "2024-03-14T09:49:32.995Z",
            userID: "890123456",
            tel: "7890123456",
        },
        {
            userName: "User9",
            avatarURL:
                "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
            activityTime: "2024-03-14T09:49:32.995Z",
            userID: "901234567",
            tel: "8901234567",
        },
        {
            userName: "User10",
            avatarURL:
                "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
            activityTime: "2024-03-11T12:00:00Z",
            userID: "012345678",
            tel: "9012345678",
        },
        {
            userName: "User11",
            avatarURL:
                "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
            activityTime: "2024-03-09T12:00:00Z",
            userID: "112233445",
            tel: "1122334455",
        },
        {
            userName: "User12",
            avatarURL:
                "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
            activityTime: "2024-03-05T12:00:00Z",
            userID: "223344556",
            tel: "2233445566",
        },
        {
            userName: "User13",
            avatarURL:
                "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
            activityTime: "2024-03-01T12:00:00Z",
            userID: "334455667",
            tel: "3344556677",
        },
        {
            userName: "User14",
            avatarURL:
                "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
            activityTime: "2024-03-05T12:00:00Z",
            userID: "445566778",
            tel: "4455667788",
        },
        {
            userName: "User15",
            avatarURL:
                "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
            activityTime: "2024-03-12T14:49:32.995Z",
            userID: "556677889",
            tel: "5566778899",
        },
    ]);
    const [usersByContact, setUsersByContact] = useState([
        {
            title: "A",
            data: [
                {
                    userName: "User1",
                    avatarURL:
                        "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
                    activityTime: "2024-03-12T12:00:00Z",
                    userID: "123456789",
                    tel: "0123456789",
                },
                {
                    userName: "User2",
                    avatarURL:
                        "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
                    activityTime: "2024-03-12T12:00:00Z",
                    userID: "234567890",
                    tel: "1234567890",
                },
                {
                    userName: "User3",
                    avatarURL:
                        "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
                    activityTime: "2024-03-12T12:00:00Z",
                    userID: "345678901",
                    tel: "2345678901",
                },
            ],
        },
        {
            title: "B",
            data: [
                {
                    userName: "User4",
                    avatarURL:
                        "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
                    activityTime: "2024-03-14T14:49:32.995Z",
                    userID: "456789012",
                    tel: "3456789012",
                },
                {
                    userName: "User5",
                    avatarURL:
                        "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
                    activityTime: "2024-03-14T14:49:32.995Z",
                    userID: "567890123",
                    tel: "4567890123",
                },
                {
                    userName: "User6",
                    avatarURL:
                        "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
                    activityTime: "2024-03-14T14:49:32.995Z",
                    userID: "678901234",
                    tel: "5678901234",
                },
            ],
        },
        {
            title: "C",
            data: [
                {
                    userName: "User7",
                    avatarURL:
                        "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
                    activityTime: "2024-03-14T14:49:32.995Z",
                    userID: "789012345",
                    tel: "6789012345",
                },
                {
                    userName: "User8",
                    avatarURL:
                        "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
                    activityTime: "2024-03-14T09:49:32.995Z",
                    userID: "890123456",
                    tel: "7890123456",
                },
                {
                    userName: "User9",
                    avatarURL:
                        "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
                    activityTime: "2024-03-14T09:49:32.995Z",
                    userID: "901234567",
                    tel: "8901234567",
                },
            ],
        },
        {
            title: "D",
            data: [
                {
                    userName: "User10",
                    avatarURL:
                        "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
                    activityTime: "2024-03-11T12:00:00Z",
                    userID: "012345678",
                    tel: "9012345678",
                },
                {
                    userName: "User11",
                    avatarURL:
                        "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
                    activityTime: "2024-03-09T12:00:00Z",
                    userID: "112233445",
                    tel: "1122334455",
                },
                {
                    userName: "User12",
                    avatarURL:
                        "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
                    activityTime: "2024-03-05T12:00:00Z",
                    userID: "223344556",
                    tel: "2233445566",
                },
            ],
        },
        {
            title: "E",
            data: [
                {
                    userName: "User13",
                    avatarURL:
                        "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
                    activityTime: "2024-03-01T12:00:00Z",
                    userID: "334455667",
                    tel: "3344556677",
                },
                {
                    userName: "User14",
                    avatarURL:
                        "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
                    activityTime: "2024-03-05T12:00:00Z",
                    userID: "445566778",
                    tel: "4455667788",
                },
                {
                    userName: "User15",
                    avatarURL:
                        "https://i.pinimg.com/originals/e2/05/4b/e2054b0c108f943fa58d98b8a4d37cd5.png",
                    activityTime: "2024-03-12T14:49:32.995Z",
                    userID: "556677889",
                    tel: "5566778899",
                },
            ],
        },
    ]);

    async function handleChooseImageFromLibrary() {
        if (!hasGalleryPermission) {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(status === "granted");
        }
        const newAvatar = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!newAvatar.canceled) {
            const firstElement = newAvatar.assets?.[0];
            if (firstElement.type === "image") {
                setGroupAvatar(firstElement.uri || null);
            }
        }
    }

    async function handleTakePhotoFromCamera() {
        if (!hasCameraPermission) {
            const { status } =
                await ImagePicker.requestCameraPermissionsAsync();
            setHasCameraPermission(status === "granted");
        }
        let options = {
            allowsEditing: true,
            allowsMultipleSelection: false,
            cameraType: ImagePicker.CameraType.front,
            quantity: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        };
        const result = await ImagePicker.launchCameraAsync(options);

        if (!result.canceled) {
            const firstElement = result.assets?.[0];
            if (firstElement.type === "image") {
                setGroupAvatar(firstElement.uri || null);
            }
        }
    }

    const handleOpenActionSheet = () => {
        const options = [
            t("registerChooseImageFromLibrary"),
            t("registerTakePhotoFromCamera"),
            t("cancel"),
        ];
        const cancelButtonIndex = 2;
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            (selectedIndex) => {
                switch (selectedIndex) {
                    case 0:
                        handleChooseImageFromLibrary();
                        break;
                    case 1:
                        handleTakePhotoFromCamera();
                        break;
                    case cancelButtonIndex:
                        break;
                    default:
                        break;
                }
            }
        );
    };

    useEffect(() => {
        setUsersByRecent(
            usersByRecent.sort((a, b) => {
                return (
                    new Date(b.activityTime).getTime() -
                    new Date(a.activityTime).getTime()
                );
            })
        );
    }, []);
    function getDateFromTime(time: string) {
        const date = new Date(Date.parse(time));

        const currentDate = new Date();
        const diff = currentDate.getTime() - date.getTime();
        const diffMinutes = Math.floor(diff / 60000);

        if (diffMinutes < 60) {
            return `${diffMinutes == 0 ? 1 : diffMinutes} minutes ago`;
        } else if (diffMinutes < 60 * 24) {
            return `${Math.floor(diffMinutes / 60)} hours ago`;
        } else {
            return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        }
    }

    function addAndRemoveUserSelected(userID: string) {
        if (usersSelected.includes(userID)) {
            setUsersSelected(usersSelected.filter((id) => id !== userID));
        } else {
            setUsersSelected([...usersSelected, userID]);
        }
    }

    function renderUserByRecent(
        item: {
            userName: string;
            avatarURL: string;
            activityTime: string;
            userID: string;
            tel: string;
        },
        index: number,
        isShowActivityTime: boolean
    ) {
        return (
            <TouchableOpacity
                key={index}
                style={[styles.createGroupSelectedMemberContainer]}
                onPress={() => addAndRemoveUserSelected(item.userID)}
            >
                <CustomRadioButton
                    onPress={() => {
                        addAndRemoveUserSelected(item.userID);
                    }}
                    selected={usersSelected.includes(item.userID)}
                    value={item.userID}
                />
                <Image
                    source={{
                        uri: item.avatarURL,
                    }}
                    style={[styles.createGroupSelectedMemberAvatar]}
                />
                <View style={[styles.createGroupSelectedMemberInfo]}>
                    <Text
                        style={[
                            styles.createGroupSelectedMemberName,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {item.userName}
                    </Text>
                    {isShowActivityTime && (
                        <Text
                            style={[
                                styles.createGroupSelectedMemberActivityTime,
                                theme === lightMode
                                    ? commonStyles.lightSecondaryText
                                    : commonStyles.darkSecondaryText,
                            ]}
                        >
                            {getDateFromTime(item.activityTime)}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    }
    function handleGoToBackScreen(){
        Alert.alert(t("createGroupGoBackTitle"), t("createGroupGoBackDesc"), [
            {
                text: t("cancel"),
                style: "cancel",
            },
            {
                text: t("confirm"),
                onPress: () => navigation.goBack(),
            },
        ])
    }

    return (
        <View
            style={[
                styles.createGroupWrapper,
                theme == lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
            ]}
        >
            <StatusBar />
            <SafeAreaView style={[styles.createGroupContainer]}>
                <View
                    style={[
                        styles.createGroupHeader,
                        {
                            backgroundColor:
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
                        style={[styles.createGroupHeaderBtnBack]}
                        onPress={handleGoToBackScreen}
                    >
                        <Image
                            source={require("../../assets/close-line-icon.png")}
                            style={[
                                styles.createGroupHeaderBtnBackImage,
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
                    <View>
                        <Text
                            style={[
                                styles.createGroupHeaderTitle,
                                theme == lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {t("createGroupTitle")}
                        </Text>
                        <Text
                            style={[
                                styles.createGroupSelectedMemberText,
                                theme == lightMode
                                    ? commonStyles.lightSecondaryText
                                    : commonStyles.darkSecondaryText,
                            ]}
                        >
                            {t("createGroupSelectedMember")}
                            <Text>{usersSelected.length}</Text>
                        </Text>
                    </View>
                </View>
                <View style={[styles.createGroupBodyMainScroll]}>
                    <View
                        style={[
                            styles.createGroupChooseAvatarAndEnterNameContainer,
                        ]}
                    >
                        <TouchableOpacity
                            onPress={handleOpenActionSheet}
                            style={[
                                styles.createGroupChooseAvatarBtn,
                                {
                                    backgroundColor:
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
                            {groupAvatar ? (
                                <Image
                                    source={{ uri: groupAvatar }}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        resizeMode: "cover",
                                        borderRadius: 50,
                                    }}
                                />
                            ) : (
                                <Image
                                    style={[
                                        styles.createGroupChooseAvatarBtnImage,
                                        {
                                            tintColor:
                                                theme === lightMode
                                                    ? commonStyles
                                                          .lightSecondaryText
                                                          .color
                                                    : commonStyles
                                                          .darkSecondaryText
                                                          .color,
                                        },
                                    ]}
                                    source={require("../../assets/camera-fill-icon.png")}
                                />
                            )}
                        </TouchableOpacity>
                        <OutsidePressHandler
                            style={[styles.createGroupEnterNameContainer]}
                            onOutsidePress={() => setIsFocusInputName(false)}
                        >
                            <View
                                style={[
                                    styles.createGroupEnterNameInputContainer,
                                    {
                                        borderBottomColor: isFocusInputName
                                            ? commonStyles.primaryColor.color
                                            : "transparent",
                                    },
                                ]}
                            >
                                <TextInput
                                    onFocus={() => setIsFocusInputName(true)}
                                    placeholderTextColor={
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color
                                    }
                                    value={groupName}
                                    onChangeText={setGroupName}
                                    placeholder={t(
                                        "createGroupInputGroupNamePlaceholder"
                                    )}
                                    style={[
                                        styles.createGroupEnterNameInput,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                />
                                {isFocusInputName && (
                                    <TouchableOpacity
                                        style={[
                                            styles.createGroupEnterNameEmojiBtn,
                                        ]}
                                        onPress={() => setShowEmoji(!showEmoji)}
                                    >
                                        <Image
                                            style={[
                                                styles.createGroupEnterNameEmojiBtnImage,
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
                                            source={require("../../assets/emoji-emotions-icon.png")}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                            {isFocusInputName && (
                                <TouchableOpacity
                                    onPress={() => setIsFocusInputName(false)}
                                    style={[
                                        styles.createGroupEnterNameConfirmBtn,
                                    ]}
                                >
                                    <Image
                                        style={[
                                            styles.createGroupEnterNameConfirmBtnImage,
                                        ]}
                                        source={require("../../assets/check-line-icon.png")}
                                    />
                                </TouchableOpacity>
                            )}
                            <EmojiPicker
                                open={showEmoji}
                                onEmojiSelected={(emoji) => {
                                    setIsFocusInputName(true);
                                    setGroupName(groupName + emoji.emoji);
                                }}
                                onClose={() => {
                                    setShowEmoji(false);
                                    setIsFocusInputName(true);
                                }}
                                enableSearchBar
                                enableRecentlyUsed
                                theme={
                                    theme === lightMode
                                        ? {
                                              container:
                                                  commonStyles
                                                      .lightPrimaryBackground
                                                      .backgroundColor,
                                              header: commonStyles
                                                  .lightPrimaryText.color,
                                              search: {
                                                  text: commonStyles
                                                      .lightPrimaryText.color,
                                                  placeholder:
                                                      commonStyles
                                                          .lightPrimaryText
                                                          .color,
                                                  icon: commonStyles
                                                      .lightPrimaryText.color,
                                              },
                                          }
                                        : {
                                              container:
                                                  commonStyles
                                                      .darkPrimaryBackground
                                                      .backgroundColor,
                                              header: commonStyles
                                                  .darkPrimaryText.color,
                                              search: {
                                                  text: commonStyles
                                                      .darkPrimaryText.color,
                                                  placeholder:
                                                      commonStyles
                                                          .darkPrimaryText
                                                          .color,
                                                  icon: commonStyles
                                                      .darkPrimaryText.color,
                                              },
                                          }
                                }
                            />
                        </OutsidePressHandler>
                    </View>
                    <View
                        style={[
                            styles.createGroupSearchContainer,
                            {
                                backgroundColor:
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
                        <Image
                            style={[
                                styles.createGroupSearchIcon,
                                {
                                    tintColor:
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color,
                                },
                            ]}
                            source={require("../../assets/search-line-icon.png")}
                        />
                        <TextInput
                            value={textSearch}
                            onChangeText={setTextSearch}
                            placeholder={t("createGroupSearchPlaceholder")}
                            keyboardType={
                                isKeyboardDefault ? "default" : "number-pad"
                            }
                            placeholderTextColor={
                                theme === lightMode
                                    ? commonStyles.lightSecondaryText.color
                                    : commonStyles.darkSecondaryText.color
                            }
                            style={[
                                styles.createGroupSearchInput,
                                theme === lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        />
                        {textSearch ? (
                            <TouchableOpacity
                                onPress={() => setTextSearch("")}
                                style={[
                                    styles.createGroupSearchClearInputBtn,
                                    {
                                        backgroundColor:
                                            theme === lightMode
                                                ? commonStyles.lightTertiaryText
                                                      .color
                                                : commonStyles.darkTertiaryText
                                                      .color,
                                    },
                                ]}
                            >
                                <Image
                                    style={[
                                        styles.createGroupSearchClearInputBtnImage,
                                    ]}
                                    source={require("../../assets/close-line-icon.png")}
                                    tintColor={
                                        theme === lightMode
                                            ? commonStyles.darkPrimaryText.color
                                            : commonStyles.lightPrimaryText
                                                  .color
                                    }
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() =>
                                    setIsKeyBoardDefault(!isKeyboardDefault)
                                }
                                style={[
                                    styles.createGroupSearchChooseTypeBtn,
                                    {
                                        borderColor:
                                            theme === lightMode
                                                ? commonStyles
                                                      .lightSecondaryText.color
                                                : commonStyles.darkSecondaryText
                                                      .color,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.createGroupSearchChooseTypeBtnText,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    {isKeyboardDefault ? "ABC" : "123"}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {textSearch ? (
                        <View>
                            <FlatList
                                data={usersByRecent.filter((user) =>
                                    user.userName
                                        .toLowerCase()
                                        .includes(textSearch.toLowerCase()) || user.tel.includes(textSearch)
                                )}
                                keyExtractor={(item) => item.userID}
                                renderItem={({ item, index }) =>
                                    renderUserByRecent(item, index, false)
                                }
                                style={[
                                    {
                                        paddingHorizontal: 10,
                                        flexGrow: 1,
                                        flexShrink: 1,
                                        marginBottom:
                                            usersSelected.length > 0 ? 60 : 0,
                                    },
                                ]}
                            />
                        </View>
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <View
                                style={[
                                    styles.createGroupRecentAndContactFilterContainer,
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
                                <TouchableOpacity
                                    onPress={() =>
                                        setTypeSelected(typeSelectedEnum.recent)
                                    }
                                    style={[
                                        styles.createGroupRecentAndContactFilterBtn,
                                        {
                                            borderBottomColor:
                                                typeSelected ===
                                                typeSelectedEnum.recent
                                                    ? commonStyles.primaryColor
                                                          .color
                                                    : "transparent",
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.createGroupRecentAndContactFilterBtnText,
                                            {
                                                color:
                                                    typeSelected ===
                                                    typeSelectedEnum.recent
                                                        ? theme === lightMode
                                                            ? commonStyles
                                                                  .lightPrimaryText
                                                                  .color
                                                            : commonStyles
                                                                  .darkPrimaryText
                                                                  .color
                                                        : theme === lightMode
                                                        ? commonStyles
                                                              .lightSecondaryText
                                                              .color
                                                        : commonStyles
                                                              .darkSecondaryText
                                                              .color,
                                            },
                                        ]}
                                    >
                                        {t("createGroupRecentTitle")}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        setTypeSelected(
                                            typeSelectedEnum.contact
                                        )
                                    }
                                    style={[
                                        styles.createGroupRecentAndContactFilterBtn,
                                        {
                                            borderBottomColor:
                                                typeSelected ===
                                                typeSelectedEnum.contact
                                                    ? commonStyles.primaryColor
                                                          .color
                                                    : "transparent",
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.createGroupRecentAndContactFilterBtnText,
                                            {
                                                color:
                                                    typeSelected ===
                                                    typeSelectedEnum.contact
                                                        ? theme === lightMode
                                                            ? commonStyles
                                                                  .lightPrimaryText
                                                                  .color
                                                            : commonStyles
                                                                  .darkPrimaryText
                                                                  .color
                                                        : theme === lightMode
                                                        ? commonStyles
                                                              .lightSecondaryText
                                                              .color
                                                        : commonStyles
                                                              .darkSecondaryText
                                                              .color,
                                            },
                                        ]}
                                    >
                                        {t("createGroupContactTitle")}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {typeSelected === typeSelectedEnum.recent ? (
                                <FlatList
                                    data={usersByRecent}
                                    keyExtractor={(item) => item.userID}
                                    renderItem={({ item, index }) =>
                                        renderUserByRecent(item, index, true)
                                    }
                                    style={[
                                        {
                                            paddingHorizontal: 10,
                                            flexGrow: 1,
                                            flexShrink: 1,
                                            marginBottom:
                                                usersSelected.length > 0
                                                    ? 60
                                                    : 0,
                                        },
                                    ]}
                                />
                            ) : (
                                <SectionList
                                    sections={usersByContact}
                                    keyExtractor={(item) => item.userID}
                                    renderItem={({ item, index }) =>
                                        renderUserByRecent(item, index, false)
                                    }
                                    renderSectionHeader={({
                                        section: { title },
                                    }) => (
                                        <Text
                                            style={[
                                                {
                                                    fontSize: 15,
                                                    fontWeight: "500",
                                                    paddingTop: 10,
                                                },
                                                theme === lightMode
                                                    ? commonStyles.lightSecondaryText
                                                    : commonStyles.darkSecondaryText,
                                            ]}
                                        >
                                            {title}
                                        </Text>
                                    )}
                                    renderSectionFooter={() => {
                                        return (
                                            <View
                                                style={{
                                                    height: 1,
                                                    backgroundColor:
                                                        theme === lightMode
                                                            ? commonStyles
                                                                  .chatNavbarBorderBottomColorLight
                                                                  .color
                                                            : commonStyles
                                                                  .chatNavbarBorderBottomColorDark
                                                                  .color,
                                                }}
                                            ></View>
                                        );
                                    }}
                                    style={[
                                        {
                                            paddingHorizontal: 10,
                                            flexGrow: 1,
                                            flexShrink: 1,
                                            marginBottom:
                                                usersSelected.length > 0
                                                    ? 60
                                                    : 0,
                                        },
                                    ]}
                                />
                            )}
                        </View>
                    )}
                </View>
                {usersSelected.length > 0 && (
                    <View
                        style={[
                            styles.createGroupUserListSelectedPopup,
                            theme === lightMode
                                ? commonStyles.lightPrimaryBackground
                                : commonStyles.darkPrimaryBackground,
                            {
                                shadowColor:
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText.color
                                        : commonStyles.darkPrimaryText.color,
                                shadowOffset: {
                                    width: 0,
                                    height: 7,
                                },
                                shadowOpacity: 0.43,
                                shadowRadius: 9.51,

                                elevation: 15,
                            },
                        ]}
                    >
                        <ScrollView
                            horizontal={true}
                            style={[styles.createGroupSelectedMemberList]}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={true}
                        >
                            {usersByRecent
                                .filter((item) =>
                                    usersSelected.includes(item.userID)
                                )
                                .map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() =>
                                                addAndRemoveUserSelected(
                                                    item.userID
                                                )
                                            }
                                            style={[
                                                styles.createGroupSelectedMemberRemoveBtnContainer,
                                            ]}
                                        >
                                            <Image
                                                source={{
                                                    uri: item.avatarURL,
                                                }}
                                                style={[
                                                    styles.createGroupSelectedMemberAvatar,
                                                ]}
                                            />
                                            <View
                                                style={[
                                                    styles.createGroupSelectedMemberRemoveBtn,
                                                    theme === lightMode
                                                        ? commonStyles.lightTertiaryBackground
                                                        : commonStyles.darkTertiaryBackground,
                                                ]}
                                            >
                                                <Image
                                                    source={require("../../assets/close-line-icon.png")}
                                                    style={[
                                                        styles.createGroupSelectedMemberRemoveBtnImage,
                                                        {
                                                            tintColor:
                                                                theme ===
                                                                lightMode
                                                                    ? commonStyles
                                                                          .lightPrimaryText
                                                                          .color
                                                                    : commonStyles
                                                                          .darkPrimaryText
                                                                          .color,
                                                        },
                                                    ]}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                        </ScrollView>
                        <TouchableOpacity
                            style={[
                                styles.createGroupUserListNextStepBtn,
                                {
                                    opacity: usersSelected.length > 1 ? 1 : 0.5,
                                },
                            ]}
                            disabled={usersSelected.length <= 1}
                        >
                            <Image
                                source={require("../../assets/arrow-right-line-icon.png")}
                                style={[
                                    styles.createGroupUserListNextStepBtnImage,
                                ]}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
}
