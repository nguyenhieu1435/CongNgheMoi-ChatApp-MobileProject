import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform,
    Modal,
} from "react-native";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import { lightMode } from "../../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../../CommonStyles/commonStyles";
import { userInfoInterfaceI } from "../../../redux_toolkit/slices/userInfo.slice";
import { IConversation, IFileMessage } from "../../../configs/interfaces";
import { useEffect, useState } from "react";
import { LINK_GROUP, LINK_MESSAGE } from "@env";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import ImageViewer from "react-native-image-zoom-viewer";
import CreateGroupAvatarWhenAvatarIsEmpty from "../../../utils/createGroupAvatarWhenAvatarIsEmpty";
import { handleNavigateToChatDetail } from "../../../utils/handleNavigateToChatDetail";

interface IChatOptionalProps {
    navigation: any;
    route: any;
}

export default function ChatOptional({
    navigation,
    route,
}: IChatOptionalProps) {
    const { t } = useTranslation();
    const {
        conversation,
        userInfo,
    }: { conversation: IConversation; userInfo: userInfoInterfaceI } =
        route.params;
    const theme = useSelector((state: IRootState) => state.theme.theme);

    const userNotMe = conversation.users.find(
        (member) => member._id !== userInfo.user?._id
    );
    const [hideAttachmentFiles, setHideAttachmentFiles] =
        useState<boolean>(true);
    const [hideImages, setHideImages] = useState<boolean>(true);
    const [hideCommonGroup, setHideCommonGroup] = useState<boolean>(true);
    const [attachmentFiles, setAttachmentFiles] = useState<IFileMessage[]>([]);
    const [showFullScreenImageMessage, setShowFullScreenImageMessage] =
        useState<IFileMessage | null>(null);
    const [commonGroups, setCommonGroups] = useState<IConversation[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function getAllAttachmentFiles() {
        fetch(`${LINK_MESSAGE}/${conversation._id}/attached-files`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        })
            .then((data) => data.json())
            .then((data) => setAttachmentFiles(data as IFileMessage[]))
            .catch((err) => console.log(err));
    }
    function getCommonGroups() {
        fetch(`${LINK_GROUP}/mutual?userId=${userNotMe?._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        })
            .then((data) => data.json())
            .then((data) => setCommonGroups(data as IConversation[]))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getAllAttachmentFiles();
        getCommonGroups();
    }, []);

    function getAttachmentFiles() {
        return attachmentFiles.filter((file) => !file.type.includes("image"));
    }
    function getAttachmentImages() {
        return attachmentFiles.filter((file) => file.type.includes("image"));
    }

    const handleDownloadFile = async (url: string, name: string) => {
        const fileName = name;
        try {
            const res = await FileSystem.downloadAsync(
                url,
                FileSystem.documentDirectory + fileName
            );

            saveFileToDevice(res.uri, fileName, res.headers["Content-Type"]);
        } catch (error) {
            console.log("FS Err: ", error);
        }
    };
    const saveFileToDevice = async (
        fileUri: string,
        fileName: string,
        mimetype: string
    ) => {
        if (Platform.OS === "android") {
            const permissions =
                await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (permissions.granted) {
                const base64 = await FileSystem.readAsStringAsync(fileUri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                await FileSystem.StorageAccessFramework.createFileAsync(
                    permissions.directoryUri,
                    fileName,
                    mimetype
                )
                    .then(async (uri) => {
                        await FileSystem.writeAsStringAsync(uri, base64, {
                            encoding: FileSystem.EncodingType.Base64,
                        });
                    })
                    .catch((e) => console.log(e));
            } else {
                shareAsync(fileUri);
            }
        } else {
            shareAsync(fileUri);
        }
    };

    return (
        <View
            style={[
                {
                    flex: 1,
                },
                theme === lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
            ]}
        >
            <StatusBar />
            <SafeAreaView
                style={{
                    flex: 1,
                    position: "relative",
                }}
            >
                <View
                    style={[
                        styles.managingGroupHeaderBox,
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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require("../../../assets/arrow-left-s-line-icon.png")}
                            style={[
                                styles.managingGroupHeaderGoBackBtn,
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
                    <Text
                        style={[
                            styles.managingGroupHeaderTitle,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {t("chatDetaildMoreViewProfileTitle")}
                    </Text>
                </View>

                <ScrollView contentContainerStyle={{}}>
                    <View>
                        <View
                            style={{
                                alignItems: "center",
                                marginTop: 25,
                            }}
                        >
                            <View>
                                <Image
                                    source={{ uri: userNotMe?.avatar }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 50,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    width: "80%",
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        marginTop: 15,
                                        fontSize: 18,
                                        marginBottom: 10,
                                        fontWeight: "600",
                                    }}
                                >
                                    {userNotMe?.name}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.attachmentFilesWrapper,
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
                            onPress={() =>
                                setHideAttachmentFiles(!hideAttachmentFiles)
                            }
                            style={[
                                styles.toggleShowAndHideBox,
                                theme === lightMode
                                    ? commonStyles.lightSecondaryBackground
                                    : commonStyles.darkSecondaryBackground,
                            ]}
                        >
                            <Image
                                source={require("../../../assets/attachment-line-icon.png")}
                                style={[
                                    styles.categoryIconForAttachment,
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
                            <Text
                                style={[styles.categoryIconForAttachmentText]}
                            >
                                {t("chatProfileAttachedFiles")}
                            </Text>
                            <Image
                                source={
                                    hideAttachmentFiles
                                        ? require("../../../assets/arrow-down-s-line-icon.png")
                                        : require("../../../assets/arrow-up-s-line-icon.png")
                                }
                                style={[
                                    styles.showAndHideIcon,
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
                        {hideAttachmentFiles ? null : (
                            <View style={[styles.boxContaineAttachmentFiles]}>
                                {getAttachmentFiles().map((file, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={[
                                                styles.boxAttachmentFileItem,
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
                                            <View
                                                style={[
                                                    styles.iconForFileBox,
                                                    {
                                                        backgroundColor:
                                                            commonStyles
                                                                .secondColor
                                                                .color,
                                                    },
                                                ]}
                                            >
                                                <Image
                                                    source={require("../../../assets/file-text-fill-icon.png")}
                                                    style={[
                                                        styles.iconForFileItem,
                                                        {
                                                            tintColor:
                                                                commonStyles
                                                                    .primaryColor
                                                                    .color,
                                                        },
                                                    ]}
                                                />
                                            </View>
                                            <Text
                                                numberOfLines={1}
                                                style={[
                                                    styles.textForFileItem,
                                                    {
                                                        color:
                                                            theme === lightMode
                                                                ? commonStyles
                                                                      .lightPrimaryText
                                                                      .color
                                                                : commonStyles
                                                                      .darkPrimaryText
                                                                      .color,
                                                    },
                                                ]}
                                            >
                                                {file.name}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    handleDownloadFile(
                                                        file.link,
                                                        file.name
                                                    );
                                                }}
                                            >
                                                <Image
                                                    source={require("../../../assets/download-2-line-icon.png")}
                                                    style={[
                                                        styles.iconDownloadFileItem,
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
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </View>
                        )}
                    </View>
                    <View
                        style={[
                            styles.attachmentFilesWrapper,
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
                            onPress={() => setHideImages(!hideImages)}
                            style={[
                                styles.toggleShowAndHideBox,
                                theme === lightMode
                                    ? commonStyles.lightSecondaryBackground
                                    : commonStyles.darkSecondaryBackground,
                            ]}
                        >
                            <Image
                                source={require("../../../assets/image-fill-icon.png")}
                                style={[
                                    styles.categoryIconForAttachment,
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
                            <Text
                                style={[styles.categoryIconForAttachmentText]}
                            >
                                {t("image")}
                            </Text>
                            <Image
                                source={
                                    hideImages
                                        ? require("../../../assets/arrow-down-s-line-icon.png")
                                        : require("../../../assets/arrow-up-s-line-icon.png")
                                }
                                style={[
                                    styles.showAndHideIcon,
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
                        {hideImages ? null : (
                            <View
                                style={[
                                    styles.boxContaineAttachmentFiles,
                                    styles.boxContaineAttachmentImages,
                                ]}
                            >
                                {getAttachmentImages().map((image, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() =>
                                                setShowFullScreenImageMessage(
                                                    image
                                                )
                                            }
                                            style={[
                                                styles.boxContaineAttachmentImgBtn,
                                            ]}
                                        >
                                            <Image
                                                source={{
                                                    uri: image.link,
                                                }}
                                                style={[
                                                    styles.boxContainerImageStyle,
                                                ]}
                                            />
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleDownloadFile(
                                                        image.link,
                                                        image.name
                                                    )
                                                }
                                            >
                                                <Image
                                                    source={require("../../../assets/download-2-line-icon.png")}
                                                    style={[
                                                        styles.iconDownloadImgItem,
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
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        )}
                    </View>
                    <View
                        style={[
                            styles.attachmentFilesWrapper,
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
                            onPress={() => setHideCommonGroup(!hideCommonGroup)}
                            style={[
                                styles.toggleShowAndHideBox,
                                theme === lightMode
                                    ? commonStyles.lightSecondaryBackground
                                    : commonStyles.darkSecondaryBackground,
                            ]}
                        >
                            <Image
                                source={require("../../../assets/group-line-icon.png")}
                                style={[
                                    styles.categoryIconForAttachment,
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
                            <Text
                                style={[styles.categoryIconForAttachmentText]}
                            >
                                {t("addFriendInvitationCommonGroup")}
                            </Text>
                            <Image
                                source={
                                    hideCommonGroup
                                        ? require("../../../assets/arrow-down-s-line-icon.png")
                                        : require("../../../assets/arrow-up-s-line-icon.png")
                                }
                                style={[
                                    styles.showAndHideIcon,
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
                        {hideCommonGroup ? null : (
                            <View style={[styles.boxContaineAttachmentFiles]}>
                                {commonGroups.map((group, index) => {
                                    return (
                                        <TouchableOpacity
                                            style={[
                                                styles.contactDetailGroupItemBox,
                                            ]}
                                            key={group._id}
                                            onPress={() => {
                                                handleNavigateToChatDetail(
                                                    group,
                                                    setIsLoading,
                                                    userInfo,
                                                    navigation
                                                );
                                            }}
                                        >
                                            {group.picture ? (
                                                <Image
                                                    source={{
                                                        uri: group.picture,
                                                    }}
                                                    style={[
                                                        styles.contactDetailGroupItemAvatar,
                                                    ]}
                                                />
                                            ) : (
                                                CreateGroupAvatarWhenAvatarIsEmpty(
                                                    group
                                                )
                                            )}
                                            <View
                                                style={[
                                                    styles.contactDetailGroupItemContentBox,
                                                ]}
                                            >
                                                <View
                                                    style={[
                                                        styles.contactDetailGroupItemFirstTitleBox,
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.contactDetailGroupItemFirstTitleLeftText,
                                                            theme === lightMode
                                                                ? commonStyles.lightPrimaryText
                                                                : commonStyles.darkPrimaryText,
                                                        ]}
                                                    >
                                                        {group.name}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text
                                                        lineBreakMode="tail"
                                                        numberOfLines={1}
                                                        style={[
                                                            styles.contactDetailGroupItemSecondPreviewText,
                                                            theme === lightMode
                                                                ? commonStyles.lightPrimaryText
                                                                : commonStyles.darkPrimaryText,
                                                        ]}
                                                    ></Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
            {showFullScreenImageMessage && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showFullScreenImageMessage !== null}
                >
                    <ImageViewer
                        imageUrls={[{ url: showFullScreenImageMessage.link }]}
                        style={{ backgroundColor: "black" }}
                        renderIndicator={() => {
                            return <></>;
                        }}
                        renderHeader={() => {
                            return (
                                <View
                                    style={[
                                        styles.chatDetailModalImageFullscreenHeader,
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.chatDetailModalImageFullscreenHeaderLeft,
                                        ]}
                                    >
                                        <TouchableOpacity
                                            onPress={() =>
                                                setShowFullScreenImageMessage(
                                                    null
                                                )
                                            }
                                            style={[
                                                styles.chatDetailModalImageFullscreenCloseBtn,
                                            ]}
                                        >
                                            <Image
                                                source={require("../../../assets/arrow-left-s-line-icon.png")}
                                                resizeMode="contain"
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                    tintColor:
                                                        commonStyles
                                                            .darkPrimaryText
                                                            .color,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleDownloadFile(
                                                    showFullScreenImageMessage.link,
                                                    showFullScreenImageMessage.name
                                                )
                                            }
                                        >
                                            <Image
                                                source={require("../../../assets/download-2-line-icon.png")}
                                                resizeMode="contain"
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                    tintColor:
                                                        commonStyles
                                                            .darkPrimaryText
                                                            .color,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </Modal>
            )}
        </View>
    );
}
