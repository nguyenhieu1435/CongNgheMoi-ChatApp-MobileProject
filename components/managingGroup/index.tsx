import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import {
    Image,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    View,
    TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import commonStyles from "../../CommonStyles/commonStyles";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import { IConversation, IFileMessage, IMessageItem } from "../../configs/interfaces";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LINK_MESSAGE } from "@env";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import ImageViewer from "react-native-image-zoom-viewer";

export function ManagingGroup({
    navigation,
    route,
}: {
    navigation: any;
    route: any;
}) {
    const userInfo = useSelector((state: IRootState) => state.userInfo);
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { t } = useTranslation();
    const conversation = route.params.conversation as IConversation;
    const setMessageHistory = route.params.setMessageHistory as Dispatch<SetStateAction<IMessageItem[]>>;
    const socket = route.params.socket as Socket<
        DefaultEventsMap,
        DefaultEventsMap
    >;
    const setConversation = route.params.setConversation as React.Dispatch<
        React.SetStateAction<IConversation>
    >;
    const [hideAttachmentFiles, setHideAttachmentFiles] =
        useState<boolean>(true);
    const [hideImages, setHideImages] = useState<boolean>(true);
    const [attachmentFiles, setAttachmentFiles] = useState<IFileMessage[]>([]);
    const [showFullScreenImageMessage, setShowFullScreenImageMessage] =
        useState<IFileMessage | null>(null);

    async function getAllAttachmentFiles() {
        try {
            const resp = await fetch(
                `${LINK_MESSAGE}/${conversation._id}/attached-files`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.accessToken}`,
                    },
                }
            );
            if (resp.ok) {
                console.log("Get all attachment files successfully");
                const data = (await resp.json()) as IFileMessage[];
                setAttachmentFiles(data);
            }
        } catch (error) {
            console.log("Error when get all attachment files", error);
            setAttachmentFiles([]);
        }
    }

    useEffect(() => {
        getAllAttachmentFiles();
    }, []);

    function getAttachmentFiles() {
        return attachmentFiles.filter((file) => !file.type.includes("image"));
    }
    function getAttachmentImages() {
        return attachmentFiles.filter((file) => file.type.includes("image"));
    }

    function createImageIfAvatarIsEmpty() {
        let users = conversation.users;
        if (users.length > 4) {
            users = users.slice(0, 4);
        }
        return (
            <View
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {users.map((user) => {
                    return (
                        <Image
                            source={{
                                uri: user.avatar,
                            }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                padding: 3,
                            }}
                        />
                    );
                })}
            </View>
        );
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
                            source={require("../../assets/arrow-left-s-line-icon.png")}
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
                        {t("managingGroupTitle")}
                    </Text>
                </View>
                <ScrollView
                    contentContainerStyle={{
                       
                    }}
                >
                    <View>
                        <View
                            style={{
                                alignItems: "center",
                                marginTop: 25,
                            }}
                        >
                            <View>
                                {conversation.picture ? (
                                    <Image
                                        source={{ uri: conversation.picture }}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 50,
                                        }}
                                    />
                                ) : (
                                    createImageIfAvatarIsEmpty()
                                )}
                            </View>
                            <View
                                style={{
                                    width: "80%",
                                }}
                            >
                                <Text
                                    style={[{
                                        textAlign: "center",
                                        marginTop: 15,
                                        fontSize: 18,
                                        marginBottom: 10,
                                        fontWeight: "600",
                                    },
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText
                                    ]}
                                >
                                    {conversation.name}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 25,
                                justifyContent: "center",
                                marginTop: 15,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    alignItems: "center",
                                    
                                }}
                                onPress={() =>
                                    navigation.navigate("AddFriendIntoGroup", {
                                        conversation: conversation,
                                        socket: socket,
                                        setConversation: setConversation,
                                        setMessageHistory: setMessageHistory
                                    })
                                }
                            >
                                <Image
                                    source={require("../../assets/user-add-line.png")}
                                    style={[{
                                        width: 25,
                                        height: 25,
                                        resizeMode: "contain",
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
                                    style={[{
                                        fontSize: 16,
                                        
                                    },
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText
                                    
                                ]}
                                >
                                    {t("managingGroupAddMember")}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    alignItems: "center",
                                    gap: 5,
                                }}
                                onPress={() => {
                                    navigation.navigate("ShowMembersInGroup", {
                                        conversation: conversation,
                                        socket: socket,
                                        setConversation: setConversation,
                                        setMessageHistory: setMessageHistory,
                                    });
                                }}
                            >
                                <Image
                                    source={require("../../assets/group-bottom-tab.png")}
                                    style={{
                                        width: 25,
                                        height: 25,
                                        resizeMode: "contain",
                                        tintColor:
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText.color
                                        :
                                        commonStyles.darkPrimaryText.color
                                    }}
                                />
                                <Text
                                    style={[{
                                        fontSize: 16,
                                    },
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText
                                ]}
                                >{`${t("managingGroupShowMembers")} (${
                                    conversation.users.length
                                })`}</Text>
                            </TouchableOpacity>
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
                                source={require("../../assets/attachment-line-icon.png")}
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
                                style={[styles.categoryIconForAttachmentText,
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText
                                ]}

                            >
                                {t("chatProfileAttachedFiles")}
                            </Text>
                            <Image
                                source={
                                    hideAttachmentFiles
                                        ? require("../../assets/arrow-down-s-line-icon.png")
                                        : require("../../assets/arrow-up-s-line-icon.png")
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
                                                    source={require("../../assets/file-text-fill-icon.png")}
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
                                                    source={require("../../assets/download-2-line-icon.png")}
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
                                source={require("../../assets/image-fill-icon.png")}
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
                                style={[styles.categoryIconForAttachmentText,
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText
                                ]}
                            >
                                {t("image")}
                            </Text>
                            <Image
                                source={
                                    hideImages
                                        ? require("../../assets/arrow-down-s-line-icon.png")
                                        : require("../../assets/arrow-up-s-line-icon.png")
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
                                                onPress={() => handleDownloadFile(image.link, image.name)}
                                            >
                                                <Image
                                                    source={require("../../assets/download-2-line-icon.png")}
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
                </ScrollView>

                
            </SafeAreaView>

            {showFullScreenImageMessage && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showFullScreenImageMessage !== null}
                    >
                        <ImageViewer
                            imageUrls={[
                                { url: showFullScreenImageMessage.link },
                            ]}
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
                                                    source={require("../../assets/arrow-left-s-line-icon.png")}
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
                                                    source={require("../../assets/download-2-line-icon.png")}
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
