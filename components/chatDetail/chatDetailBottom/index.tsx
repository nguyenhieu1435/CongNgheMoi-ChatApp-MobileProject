import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Animated,
    Easing,
    ActivityIndicator,
    Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "./styles";
import React, {
    Dispatch,
    memo,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { TFunction } from "i18next";
import { lightMode } from "../../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../../CommonStyles/commonStyles";
import EmojiPicker from "rn-emoji-keyboard";
import { checkText } from "smile2emoji";
import {
    IConversation,
    IMessageDetail,
    IMessageItem,
} from "../../../configs/interfaces";
import { handleOpenActionSheet } from "../../../utils/imagePicker";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as DocumentPicker from "expo-document-picker";
import { LINK_SEND_MESSAGE } from "@env";
import { IRootState } from "../../../redux_toolkit/store";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { getAccurancyDateVN } from "../../../utils/date";
import * as Location from "expo-location";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import stickerList from "../../../data/stickers";

interface ChatDetailBottomProps {
    theme: string;
    translation: TFunction<"translation", undefined>;
    showMoreChatActions: boolean;
    setShowMoreChatActions: (show: boolean) => void;
    historyChatScrollViewRef: React.RefObject<ScrollView>;
    heightForMoreChatActions: number;
    replyItem: IMessageItem | null;
    setReplyItem: Dispatch<SetStateAction<IMessageItem | null>>;
    socket: any;
    messageHistory: IMessageItem[];
    setMessageHistory: Dispatch<SetStateAction<IMessageItem[]>>;
    conversation: IConversation;
}

const {width : WIDTH} = Dimensions.get("window");

function ChatDetailBottom({
    theme,
    translation: t,
    showMoreChatActions,
    setShowMoreChatActions,
    historyChatScrollViewRef,
    heightForMoreChatActions,
    replyItem,
    setReplyItem,
    conversation,
    socket,
    setMessageHistory,
    messageHistory,
}: ChatDetailBottomProps) {
    const [textMessage, setTextMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [heightMessageMoreActions, setHeightMessageMoreActions] =
        useState<Animated.Value>(new Animated.Value(0));
    const [hasGalleryPermission, setHasGalleryPermission] = useState<
        null | boolean
    >(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<
        null | boolean
    >(null);
    const [imagesSelected, setImagesSelected] = useState<
        null | string | string[]
    >(null);
    const { showActionSheetWithOptions } = useActionSheet();
    const [documentSelected, setDocumentSelected] =
        useState<DocumentPicker.DocumentPickerAsset | null>(null);
    const userInfo = useSelector((state: IRootState) => state.userInfo);
    const [isLoading, setIsLoading] = useState(false);
    const [showModalEmoji, setShowModalEmoji] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [searchSticker, setSearchSticker] = useState<string>("");
    const [stickers, setStickers] = useState<any[]>(stickerList);

    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    useEffect(() => {
        if (showMoreChatActions) {
            historyChatScrollViewRef.current?.scrollToEnd({ animated: true });
        }

        Animated.timing(heightMessageMoreActions, {
            toValue: showMoreChatActions ? heightForMoreChatActions : 0,
            duration: 200,
            useNativeDriver: false,
            easing: showMoreChatActions
                ? Easing.out(Easing.exp)
                : Easing.in(Easing.exp),
        }).start();
    }, [showMoreChatActions, heightMessageMoreActions]);

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
            setImages: setImagesSelected,
            hasCameraPermission,
            setHasCameraPermission,
            isMultiple: true,
        });

        setDocumentSelected(null);
        if (showMoreChatActions) {
            setShowMoreChatActions(false);
        }
    }
    async function pickFile() {
        try {
            const file = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                copyToCacheDirectory: true,
            });
            if (!file.canceled) {
                setDocumentSelected(file.assets[0]);
                setImagesSelected(null);
                if (showMoreChatActions) {
                    setShowMoreChatActions(false);
                }
            } else {
                setDocumentSelected(null);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function convertTextMessageBeforeSend(text: string): IMessageDetail[] {
        let messages: IMessageDetail[] = [];

        let splitText = text.split(/(@\w+)/g);

        if (splitText[0] === "") {
            splitText.shift();
        }
        messages = splitText.map((text, index) => {
            let isTag = text.includes("@");
            let message: IMessageDetail = {
                content: text,
                type: isTag ? "tag" : "text",
            };
            if (isTag) {
                message._id = "thaoanhhaa1@gmail.com";
            }
            return message;
        });
        return messages;
    }

    async function handleSendTextMessage() {
        if (!textMessage.trim()) {
            return;
        }

        let messages = convertTextMessageBeforeSend(textMessage);

        try {
            setIsLoading(true);
            const requestBody: any = {
                conversationId: conversation._id,
                messages: messages,
                files: [],
            };
            if (replyItem) {
                requestBody["reply"] = replyItem._id;
            }
            const response = await fetch(LINK_SEND_MESSAGE, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                const data = await response.json();

                const messageItem: IMessageItem = {
                    _id: data.message._id,
                    sender: data.message.sender,
                    messages: data.message.messages,
                    conversation: data.message.conversation,
                    reply: data.message.reply,
                    files: data.message.files,
                    createdAt: getAccurancyDateVN(data.message.createdAt),
                    updatedAt: getAccurancyDateVN(data.message.updatedAt),
                    __v: data.message.__v,
                    statuses: data.message.statuses,
                    location: data.message.location,
                    deleted: data.message.deleted,
                    notification: data.message.notification,
                };

                setMessageHistory([...messageHistory, messageItem]);
                console.log("Emit message", data.message);
                socket.emit("sendMessage", data.message);
                setTextMessage("");

                if (replyItem) {
                    setReplyItem(null);
                }
            } else {
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.log("err", error);
        }
        setIsLoading(false);
    }

    async function handleSendLocaltionMessage() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return;
        }
        Location.enableNetworkProviderAsync();
        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        });
        console.log(location);
        try {
            setIsLoading(true);
            const response = await fetch(LINK_SEND_MESSAGE, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    conversationId: conversation._id,
                    messages: [],
                    files: [],
                    location: {
                        coords: {
                            lat: location.coords.latitude,
                            lng: location.coords.longitude,
                        },
                        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
                        name: "My Location",
                        vicinity: "My Location",
                    },
                }),
            });
            if (response.ok) {
                const data = await response.json();
                const messageItem: IMessageItem = {
                    _id: data.message._id,
                    sender: data.message.sender,
                    messages: data.message.messages,
                    conversation: data.message.conversation,
                    reply: data.message.reply,
                    files: data.message.files,
                    createdAt: getAccurancyDateVN(data.message.createdAt),
                    updatedAt: getAccurancyDateVN(data.message.updatedAt),
                    __v: data.message.__v,
                    statuses: data.message.statuses,
                    location: data.message.location,
                    deleted: data.message.deleted,
                    notification: data.message.notification,
                };
                setMessageHistory([...messageHistory, messageItem]);
                socket.emit("sendMessage", data.message);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    async function handleSendDocumentOrImages() {
        if (!imagesSelected && !documentSelected) {
            return;
        }

        let formData = new FormData();
        if (imagesSelected) {
            Array.isArray(imagesSelected) &&
                imagesSelected.forEach((imageUri, index) => {
                    let splitPath = imageUri.split("/");
                    let extName = splitPath[splitPath.length - 1]
                        .split(".")
                        .pop();
                    const file = {
                        uri: imageUri,
                        name: splitPath[splitPath.length - 1],
                        type: `image/${extName}`,
                    };
                    formData.append("files", file);
                });
        }

        if (documentSelected) {
            const file = {
                uri: documentSelected.uri,
                name: documentSelected.name,
                type: documentSelected.mimeType,
            };
            formData.append("files", file);
        }
        if (replyItem) {
            formData.append("reply", replyItem._id);
        }
        formData.append("conversationId", conversation._id);
        try {
            setIsLoading(true);
            const response = await fetch(LINK_SEND_MESSAGE, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();

                const messageItem: IMessageItem = {
                    _id: data.message._id,
                    sender: data.message.sender,
                    messages: data.message.messages,
                    conversation: data.message.conversation,
                    reply: data.message.reply,
                    files: data.message.files,
                    createdAt: getAccurancyDateVN(data.message.createdAt),
                    updatedAt: getAccurancyDateVN(data.message.updatedAt),
                    __v: data.message.__v,
                    statuses: data.message.statuses,
                    location: data.message.location,
                    deleted: data.message.deleted,
                    notification: data.message.notification,
                };
                setMessageHistory([...messageHistory, messageItem]);
                socket.emit("sendMessage", data.message);
                if (imagesSelected) {
                    setImagesSelected(null);
                }
                if (documentSelected) {
                    setDocumentSelected(null);
                }
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    async function handleSendSticker(stickerURL: string) {
        try {
            setShowModalEmoji(false);

            let formData = new FormData();
            if (replyItem) {
                formData.append("reply", replyItem._id);
            }
            formData.append("sticker", stickerURL);
            formData.append("conversationId", conversation._id);
            const response = await fetch(LINK_SEND_MESSAGE, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();

                const messageItem: IMessageItem = {
                    _id: data.message._id,
                    sender: data.message.sender,
                    messages: data.message.messages,
                    conversation: data.message.conversation,
                    reply: data.message.reply,
                    files: data.message.files,
                    createdAt: getAccurancyDateVN(data.message.createdAt),
                    updatedAt: getAccurancyDateVN(data.message.updatedAt),
                    __v: data.message.__v,
                    statuses: data.message.statuses,
                    location: data.message.location,
                    deleted: data.message.deleted,
                    notification: data.message.notification,
                    sticker: data.message.sticker,
                };
                setMessageHistory([...messageHistory, messageItem]);
                socket.emit("sendMessage", data.message);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <View
                style={[
                    styles.chatDetailBottomWrapper,
                    {
                        borderTopColor:
                            theme === lightMode
                                ? commonStyles.chatNavbarBorderBottomColorLight
                                      .color
                                : commonStyles.chatNavbarBorderBottomColorDark
                                      .color,
                    },
                    theme === lightMode
                        ? commonStyles.lightPrimaryBackground
                        : commonStyles.darkPrimaryBackground,
                ]}
            >
                {replyItem && (
                    <View style={[styles.chatDetailReplyMessageContainer]}>
                        <View
                            style={[styles.chatDetailReplyVerticalLeftLine]}
                        ></View>
                        <View
                            style={[styles.chatDetailReplyMessageContainerBox]}
                        >
                            <View
                                style={[
                                    styles.chatDetailReplyMessageContentHeader,
                                ]}
                            >
                                <Image
                                    source={require("../../../assets/reply-icon.png")}
                                    style={[
                                        styles.chatDetailReplyMessageContentHeaderImg,
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
                                        styles.chatDetailReplyMessageContentHeaderText,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    {t("chatDetailReplyToTitle")}
                                    <Text
                                        style={[
                                            styles.chatDetailReplyMessageContentHeaderUsername,
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryText
                                                : commonStyles.darkPrimaryText,
                                        ]}
                                    >
                                        {replyItem.sender?.name}
                                    </Text>
                                </Text>
                            </View>
                            <Text
                                style={[
                                    styles.chatDetailReplyMessageContentBody,
                                    theme === lightMode
                                        ? commonStyles.lightSecondaryText
                                        : commonStyles.darkSecondaryText,
                                ]}
                                numberOfLines={1}
                            >
                                {`${
                                    replyItem.files.some((file) =>
                                        file.type.includes("image")
                                    )
                                        ? t("chatDetailImageTitle")
                                        : replyItem.files.some((file) =>
                                              file.type.includes("application")
                                          )
                                        ? t("chatDetailFileTitle")
                                        : ""
                                }${
                                replyItem.sticker ? t("chatDetailStickerTitle") : ""
                                }${replyItem.messages.map((message, index) => {
                                    if (message.type === "text") {
                                        return message.content;
                                    } else {
                                        return " @" + message.content;
                                    }
                                })}`}
                            </Text>
                            <TouchableOpacity
                                style={[
                                    styles.chatDetailReplyMessageCloseReplyBtn,
                                ]}
                                onPress={() => setReplyItem(null)}
                            >
                                <Image
                                    source={require("../../../assets/close-line-icon.png")}
                                    style={[
                                        styles.chatDetailReplyMessageCloseReplyImg,
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
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {documentSelected || imagesSelected ? (
                    <View
                        style={[
                            styles.chatDetailBottomContainer,
                            {
                                justifyContent: "space-between",
                            },
                        ]}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setDocumentSelected(null);
                                setImagesSelected(null);
                            }}
                        >
                            <Image
                                source={require("../../../assets/arrow-left-s-line-icon.png")}
                                style={[
                                    styles.chatDetailBottomActionImg,
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
                        <Text style={[styles.chatDetailBottomActionText]}>
                            {t("chatDetailReadyUploadTitle")}
                        </Text>
                        <TouchableOpacity
                            style={[styles.bottomSendActionBox]}
                            onPress={handleSendDocumentOrImages}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator
                                    size={"small"}
                                    color={commonStyles.darkPrimaryText.color}
                                />
                            ) : (
                                <Image
                                    source={require("../../../assets/send-plane-2-fill-icon.png")}
                                    resizeMode="contain"
                                    style={[styles.bottomSendActionImg]}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={[styles.chatDetailBottomContainer]}>
                        <TextInput
                            value={textMessage}
                            onChangeText={(text) =>
                                setTextMessage(checkText(text))
                            }
                            onFocus={() => {
                                socket.emit("typing", {
                                    conversation: conversation,
                                    userId: userInfo.user?._id,
                                });
                            }}
                            onBlur={() => {
                                socket.emit("stopTyping", {
                                    conversation: conversation,
                                    userId: userInfo.user?._id,
                                });
                            }}
                            placeholder={t("chatDetailSendTextPlaceholder")}
                            onTouchStart={() => setShowMoreChatActions(false)}
                            style={[
                                styles.textInputMessage,
                                theme === lightMode
                                    ? commonStyles.lightTertiaryBackground
                                    : commonStyles.darkTertiaryBackground,
                                {
                                    color:
                                        theme === lightMode
                                            ? commonStyles.lightTertiaryText
                                                  .color
                                            : commonStyles.darkTertiaryText
                                                  .color,
                                },
                            ]}
                            placeholderTextColor={
                                theme === lightMode
                                    ? commonStyles.lightTertiaryText.color
                                    : commonStyles.darkTertiaryText.color
                            }
                        />
                        <TouchableOpacity
                            onPress={() => setShowEmojiPicker(true)}
                        >
                            <Image
                                source={require("../../../assets/emotion-happy-line-icon.png")}
                                resizeMode="contain"
                                style={[styles.bottomSecondActionImg]}
                            />
                        </TouchableOpacity>
                        {!textMessage && (
                            <TouchableOpacity onPress={handleOpenActionSheetFn}>
                                <Image
                                    source={require("../../../assets/image-fill-icon.png")}
                                    resizeMode="contain"
                                    style={[styles.bottomSecondActionImg]}
                                />
                            </TouchableOpacity>
                        )}

                        {!textMessage && (
                            <TouchableOpacity
                                onPress={() => setShowModalEmoji(true)}
                            >
                                <Image
                                    source={require("../../../assets/sticker-icon.png")}
                                    resizeMode="contain"
                                    style={[styles.bottomSecondActionImg]}
                                />
                            </TouchableOpacity>
                        )}

                        {!textMessage && (
                            <TouchableOpacity
                                onPress={() =>
                                    setShowMoreChatActions(!showMoreChatActions)
                                }
                            >
                                <Image
                                    source={require("../../../assets/more-fill-icon.png")}
                                    resizeMode="contain"
                                    style={[styles.bottomSecondActionImg]}
                                />
                            </TouchableOpacity>
                        )}

                        {textMessage && (
                            <TouchableOpacity
                                style={[styles.bottomSendActionBox]}
                                onPress={handleSendTextMessage}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator
                                        size={"small"}
                                        color={
                                            commonStyles.darkPrimaryText.color
                                        }
                                    />
                                ) : (
                                    <Image
                                        source={require("../../../assets/send-plane-2-fill-icon.png")}
                                        resizeMode="contain"
                                        style={[styles.bottomSendActionImg]}
                                    />
                                )}
                            </TouchableOpacity>
                        )}
                    </View>
                )}

                {showMoreChatActions && (
                    <Animated.View
                        style={[
                            {
                                height: heightMessageMoreActions,
                            },
                        ]}
                    >
                        <ScrollView
                            style={[
                                {
                                    height: "100%",
                                },
                            ]}
                        >
                            <View
                                style={[
                                    styles.chatDetailBottomMoreActionWrapper,
                                    {
                                        borderTopColor:
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
                                        styles.chatDetailBottomActionWrapper,
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.chatDetailBottomActionBtn,
                                        ]}
                                        onPress={handleSendLocaltionMessage}
                                    >
                                        <Image
                                            source={require("../../../assets/Circle-icons-location.svg.png")}
                                            style={[
                                                styles.chatDetailBottomActionImg,
                                            ]}
                                        />
                                        <Text
                                            style={[
                                                styles.chatDetailBottomActionText,
                                                theme === lightMode
                                                    ? commonStyles.lightSecondaryText
                                                    : commonStyles.darkSecondaryText,
                                            ]}
                                        >
                                            {t("messageMoreActionLocation")}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={[
                                        styles.chatDetailBottomActionWrapper,
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.chatDetailBottomActionBtn,
                                        ]}
                                        onPress={pickFile}
                                    >
                                        <Image
                                            source={require("../../../assets/Circle-icons-folder.svg.png")}
                                            style={[
                                                styles.chatDetailBottomActionImg,
                                            ]}
                                        />
                                        <Text
                                            style={[
                                                styles.chatDetailBottomActionText,
                                                theme === lightMode
                                                    ? commonStyles.lightSecondaryText
                                                    : commonStyles.darkSecondaryText,
                                            ]}
                                        >
                                            {t("messageMoreActionDocument")}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </Animated.View>
                )}
            </View>
            <EmojiPicker
                open={showEmojiPicker}
                onEmojiSelected={(emoji) => {
                    setTextMessage(prev => prev + emoji.emoji)
                }}
                allowMultipleSelections={true}
                onClose={() => setShowEmojiPicker(false)}
                enableSearchBar
                enableRecentlyUsed
                theme={
                    theme === lightMode
                        ? {
                              container:
                                  commonStyles.lightPrimaryBackground
                                      .backgroundColor,
                              header: commonStyles.lightPrimaryText.color,
                              search: {
                                  text: commonStyles.lightPrimaryText.color,
                                  placeholder:
                                      commonStyles.lightPrimaryText.color,
                                  icon: commonStyles.lightPrimaryText.color,
                              },
                          }
                        : {
                              container:
                                  commonStyles.darkPrimaryBackground
                                      .backgroundColor,
                              header: commonStyles.darkPrimaryText.color,
                              search: {
                                  text: commonStyles.darkPrimaryText.color,
                                  placeholder:
                                      commonStyles.darkPrimaryText.color,
                                  icon: commonStyles.darkPrimaryText.color,
                              },
                          }
                }
            />

            {showModalEmoji && (
                <BottomSheet
                    ref={bottomSheetRef}
                    onChange={handleSheetChanges}
                    snapPoints={[440, "100%"]}
                    enablePanDownToClose={true}
                    onClose={() => setShowModalEmoji(false)}
                
                    style={{
                        zIndex: 500,
                    }}
                    containerStyle={{
                        zIndex: 200,
                    }}
                >
                    <BottomSheetView
                        style={{
                            paddingHorizontal: 15,
                        }}
                    >
                        <View style={[styles.searchStickerContainer]}>
                            <Image
                                source={require("../../../assets/search-line-icon.png")}
                                style={[styles.searchStickerContainerImg]}
                            />
                            <TextInput
                                placeholder={t("searchStickerTitle")}
                                style={[styles.searchStickerContainerInput]}
                            />
                        </View>
                        <ScrollView
                            style={{
                                marginTop: 10,
                            }}
                        >
                            {Array.isArray(stickers) &&
                                stickers.map((stickerItem, index) => {
                                    return (
                                        <View
                                            key={index}  
                                        >
                                            <Text
                                                style={[
                                                    styles.stickerCategoryTitle,
                                                ]}
                                            >
                                                {stickerItem.name}
                                            </Text>

                                            <View
                                                style={[
                                                    styles.listStickerContainer,
                                                ]}
                                            >

                                                {
                                                    Array.isArray(stickerItem.stickers)
                                                    &&
                                                    stickerItem.stickers.map((stickerDetail : any, index2: number) => {
                                                        return (
                                                            <TouchableOpacity
                                                                onPress={() => handleSendSticker(stickerDetail.spriteURL)}
                                                                key={index2}
                                                                style={[
                                                                    styles.itemStickerBox,
                                                                    {
                                                                        width: (WIDTH - 30 - 15 - 10) / 4 
                                                                    }
                                                                ]}
                                                            >
                                                                <View
                                                                    style={{
                                                                        position: "relative",
                                                                        width: "100%",
                                                                        height: 80,
                                                                        overflow: "hidden",
                                                                    }}
                                                                >
                                                                    <Image
                                                                        source={{
                                                                            uri: stickerDetail?.spriteURL,
                                                                        }}
                                                                        style={[
                                                                            styles.itemStickerBoxImage,
                                                                        ]}
                                                                    />
                                                                </View>
                                                            </TouchableOpacity>
                                                        );
                                                    })
                                                }
                                                

                                            </View>
                                        </View>
                                    );
                                })}
                        </ScrollView>
                    </BottomSheetView>
                </BottomSheet>
            )}
        </>
    );
}

export default memo(ChatDetailBottom);
