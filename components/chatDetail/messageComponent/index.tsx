import {
    Dispatch,
    memo,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Alert,
    Platform,
    Linking,
} from "react-native";
import {
    DataHistoryChatMessageInterface,
    DataHistoryChatMessageReactionInterface,
} from "../index";
import { styles } from "./styles";
import Tooltip from "react-native-walkthrough-tooltip";
import { TFunction, use } from "i18next";
import commonStyles from "../../../CommonStyles/commonStyles";
import { lightMode } from "../../../redux_toolkit/slices/theme.slice";
import MessagePopupAction from "../messagePopupAction";
import OutsidePressHandler from "react-native-outside-press";
import { IFileMessage, IMessageItem } from "../../../configs/interfaces";
import { convertDateStrToHourMinute } from "../../../utils/date";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import MapView, { Marker } from "react-native-maps";
import { Video, ResizeMode } from "expo-av";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux_toolkit/store";

interface MessageComponentProps {
    id: number;
    data: IMessageItem;
    theme: string;
    translation: TFunction<"translation", undefined>;
    indexMessageAction: number;
    setIndexMessageAction: (index: number) => void;
    indexShowListReaction: number;
    setIndexShowListReaction: (index: number) => void;
    setReplyItem: Dispatch<SetStateAction<IMessageItem | null>>;
    setMessageHistory: Dispatch<SetStateAction<IMessageItem[]>>;
}

const { height: HEIGHT, width: WIDTH } = Dimensions.get("screen");

function MessageComponent({
    id,
    data,
    theme,
    translation: t,
    indexMessageAction,
    setIndexMessageAction,
    indexShowListReaction,
    setIndexShowListReaction,
    setReplyItem,
    setMessageHistory,
}: MessageComponentProps) {
    const [placement, setPlacement] = useState("top");
    const [placementReaction, setPlacementReaction] = useState("top");
    const [showReaction, setShowReaction] = useState(false);
    const [dataAfter, setDataAfter] = useState<IMessageItem>();
    const myId = "thaoanhhaa1@gmail.com";
    const [showFullScreenImageMessage, setShowFullScreenImageMessage] =
        useState<IFileMessage | null>(null);
    const [officeUrlSelected, setOfficeUrlSelected] = useState<string | null>(
        null
    );
    useEffect(() => {
        setDataAfter(data);
    }, []);
    const userInfo = useSelector((state: IRootState) => state.userInfo);

    function handleAddReaction(emoji: string, dataAfter: IMessageItem) {
        // setShowReaction(false);
        // const isMeReacted = dataAfter?.reactions?.findIndex(
        //     (item) => item.userID === 2
        // );
        // if (isMeReacted !== -1) {
        //     const newReactions = {
        //         userID: 2,
        //         emoji: emoji,
        //         userImg:
        //             "https://static.wikia.nocookie.net/vsbattles/images/f/f8/YujiroHanmaRenderMadeByRyukama-0.png/revision/latest?cb=20180106041211",
        //         userName: "me",
        //     };
        //     const reactions = dataAfter?.reactions?.filter(
        //         (item) => item.userID !== 2
        //     );
        //     setDataAfter({
        //         ...dataAfter,
        //         reactions: [...reactions, newReactions],
        //     });
        // } else {
        //     const newReactions = {
        //         userID: 2,
        //         emoji: emoji,
        //         userImg:
        //             "https://static.wikia.nocookie.net/vsbattles/images/f/f8/YujiroHanmaRenderMadeByRyukama-0.png/revision/latest?cb=20180106041211",
        //         userName: "me",
        //     };
        //     setDataAfter({
        //         ...dataAfter,
        //         reactions: [...dataAfter.reactions, newReactions],
        //     });
        // }
    }
    // function getReactionsNotDuplicateEmoji(
    //     dataAfter: IMessageItem
    // ): IMessageItem[] | undefined {
    //     // let key = (reaction: IMessageItem) =>
    //     //     reaction.emoji;
    //     // const reactions = [
    //     //     ...new Map(
    //     //         dataAfter.reactions.map((item) => [key(item), item])
    //     //     ).values(),
    //     // ];
    //     // return reactions;
    //     return dataAfter;
    // }

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

    const handleOpenMap = () => {
        const url = Platform.select({
            ios: `http://maps.apple.com/?ll=${37.78825},${-122.4324}`,
            android: `http://maps.google.com/?q=${37.78825},${-122.4324}`,
        });
        if (url) {
            Linking.canOpenURL(url)
                .then((supported) => {
                    if (supported) {
                        return Linking.openURL(url);
                    }
                })
                .catch((err) => {
                    console.error("An error occurred", err);
                });
        }
    };
    function getVideoFiles(files: IFileMessage[]) {
        return files.find(
            (file) => isVideoFile(file.name) && file.type.includes("video")
        );
    }
    function isVideoFile(fileName: string) {
        if (
            fileName.includes(".mp4") ||
            fileName.includes(".avi") ||
            fileName.includes(".mov") ||
            fileName.includes(".wmv") ||
            fileName.includes(".flv") ||
            fileName.includes(".3gp") ||
            fileName.includes(".mkv")
        ) {
            return true;
        } else {
            return false;
        }
    }

    return dataAfter ? (
        <>
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
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                gap: 10,
                                                alignItems: "center",
                                            }}
                                        >
                                            <Image
                                                source={{
                                                    uri: dataAfter.sender
                                                        .avatar,
                                                }}
                                                resizeMode="contain"
                                                style={[
                                                    styles.chatDetailAvatarImg,
                                                ]}
                                            />
                                            <Text
                                                style={{
                                                    color: commonStyles
                                                        .darkPrimaryText.color,
                                                    fontSize: 16,
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {dataAfter.sender.name}
                                            </Text>
                                        </View>
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
            {dataAfter?.sender._id === userInfo.user?._id ? (
                <View style={[styles.chatDetailMessageFromMeBox]}>
                    <View style={[styles.chatDetailMessageFromMeMainWrapper]}>
                        <View style={[styles.chatDetailAnotherActionWrapper]}>
                            {dataAfter.deleted != "2" ? (
                                <>
                                    <Tooltip
                                        arrowSize={
                                            styles.chatDetailTooltipPopupContentArrowNone
                                        }
                                        contentStyle={[
                                            styles.chatDetailTooltipPopupContent,
                                            theme === lightMode
                                                ? commonStyles.lightFourBackground
                                                : commonStyles.darkFourBackground,
                                        ]}
                                        onClose={() =>
                                            setIndexMessageAction(-1)
                                        }
                                        backgroundColor="transparent"
                                        isVisible={indexMessageAction === id}
                                        showChildInTooltip={false}
                                        placement={
                                            placement as
                                                | "top"
                                                | "left"
                                                | "right"
                                                | "bottom"
                                                | "center"
                                                | undefined
                                        }
                                        content={
                                            <MessagePopupAction
                                                theme={theme}
                                                translation={t}
                                                messageItem={dataAfter}
                                                userInfo={userInfo}
                                                setMessageHistory={
                                                    setMessageHistory
                                                }
                                                setIndexMessageAction={
                                                    setIndexMessageAction
                                                }
                                            />
                                        }
                                    >
                                        <TouchableOpacity
                                            onPress={(evt) => {
                                                // handleOpenMoreActionOnMessage(evt, 0)
                                                if (
                                                    evt.nativeEvent.pageY >
                                                    HEIGHT / 2
                                                ) {
                                                    setPlacement("top");
                                                } else {
                                                    setPlacement("bottom");
                                                }
                                                setIndexMessageAction(id);
                                            }}
                                            style={[
                                                styles.chatDetailMessageFromOpponentMoreActionBox,
                                            ]}
                                        >
                                            <Image
                                                source={require("../../../assets/more-vertical-line-icon.png")}
                                                resizeMode="contain"
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    tintColor:
                                                        theme === lightMode
                                                            ? commonStyles
                                                                  .lightIconColor
                                                                  .color
                                                            : commonStyles
                                                                  .darkIconColor
                                                                  .color,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </Tooltip>

                                    <Tooltip
                                        onClose={() => {}}
                                        backgroundColor="transparent"
                                        isVisible={showReaction}
                                        placement={
                                            placementReaction as
                                                | "top"
                                                | "left"
                                                | "right"
                                                | "bottom"
                                                | "center"
                                                | undefined
                                        }
                                        arrowSize={
                                            styles.chatDetailTooltipPopupContentArrowNone
                                        }
                                        contentStyle={[
                                            styles.chatDetailTooltipPopupContent,
                                            theme === lightMode
                                                ? commonStyles.lightFourBackground
                                                : commonStyles.darkFourBackground,
                                            {
                                                borderRadius: 25,
                                            },
                                        ]}
                                        content={
                                            <OutsidePressHandler
                                                onOutsidePress={() =>
                                                    setShowReaction(false)
                                                }
                                                style={[
                                                    styles.chatDetailReactChooseBox,
                                                    theme === lightMode
                                                        ? commonStyles.lightFourBackground
                                                        : commonStyles.darkFourBackground,
                                                ]}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleAddReaction(
                                                            "❤",
                                                            dataAfter
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        source={require("../../../assets/heart-reaction.png")}
                                                        resizeMode="contain"
                                                        style={[
                                                            styles.chatDetailReactChooseBoxBtnImg,
                                                        ]}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleAddReaction(
                                                            "😆",
                                                            dataAfter
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        source={require("../../../assets/haha-reaction.png")}
                                                        resizeMode="contain"
                                                        style={[
                                                            styles.chatDetailReactChooseBoxBtnImg,
                                                        ]}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleAddReaction(
                                                            "😮",
                                                            dataAfter
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        source={require("../../../assets/surprise-reaction.png")}
                                                        resizeMode="contain"
                                                        style={[
                                                            styles.chatDetailReactChooseBoxBtnImg,
                                                        ]}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleAddReaction(
                                                            "😢",
                                                            dataAfter
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        source={require("../../../assets/sad-reaction.png")}
                                                        resizeMode="contain"
                                                        style={[
                                                            styles.chatDetailReactChooseBoxBtnImg,
                                                        ]}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleAddReaction(
                                                            "😡",
                                                            dataAfter
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        source={require("../../../assets/aggry-reaction.png")}
                                                        resizeMode="contain"
                                                        style={[
                                                            styles.chatDetailReactChooseBoxBtnImg,
                                                        ]}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleAddReaction(
                                                            "👍",
                                                            dataAfter
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        source={require("../../../assets/like-reaction.png")}
                                                        resizeMode="contain"
                                                        style={[
                                                            styles.chatDetailReactChooseBoxBtnImg,
                                                        ]}
                                                    />
                                                </TouchableOpacity>
                                            </OutsidePressHandler>
                                        }
                                    >
                                        <TouchableOpacity
                                            onPress={(evt) => {
                                                if (
                                                    evt.nativeEvent.pageY >
                                                    HEIGHT / 2
                                                ) {
                                                    setPlacementReaction("top");
                                                } else {
                                                    setPlacementReaction(
                                                        "bottom"
                                                    );
                                                }
                                                setShowReaction(true);
                                            }}
                                            style={[
                                                styles.chatDetailMessageFromOpponentMoreActionBox,
                                            ]}
                                        >
                                            <Image
                                                source={require("../../../assets/emotion-happy-line-icon.png")}
                                                resizeMode="contain"
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    tintColor:
                                                        theme === lightMode
                                                            ? commonStyles
                                                                  .lightIconColor
                                                                  .color
                                                            : commonStyles
                                                                  .darkIconColor
                                                                  .color,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </Tooltip>
                                    <TouchableOpacity
                                        onPress={() => setReplyItem(dataAfter)}
                                        style={[
                                            styles.chatDetailMessageFromOpponentMoreActionBox,
                                        ]}
                                    >
                                        <Image
                                            source={require("../../../assets/reply-icon.png")}
                                            resizeMode="contain"
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor:
                                                    theme === lightMode
                                                        ? commonStyles
                                                              .lightIconColor
                                                              .color
                                                        : commonStyles
                                                              .darkIconColor
                                                              .color,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <></>
                            )}
                        </View>

                        <View
                            style={[
                                styles.chatDetailMessageFromOpponentMainContainer,
                            ]}
                        >
                            {dataAfter.deleted != "2" ? (
                                <View
                                    style={[
                                        styles.chatDetailMessageFromMeInfoBox,
                                        theme === lightMode
                                            ? commonStyles.lightTertiaryBackground
                                            : commonStyles.darkTertiaryBackground,
                                    ]}
                                >
                                    {dataAfter.reply &&
                                        (dataAfter.reply.deleted != "2" ? (
                                            <TouchableOpacity
                                                style={[
                                                    styles.replyOpponentMessageContainer,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryBackground
                                                        : commonStyles.darkPrimaryBackground,
                                                ]}
                                            >
                                                <View
                                                    style={[
                                                        styles.replyOpponentVerticalBar,
                                                    ]}
                                                ></View>
                                                <View
                                                    style={[
                                                        styles.replyOpponentMessageContainerMainContent,
                                                    ]}
                                                >
                                                    <Text
                                                        numberOfLines={1}
                                                        style={[
                                                            styles.replyOpponentMessageContainerMainContentUsername,
                                                            {
                                                                color:
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
                                                    >
                                                        {
                                                            dataAfter.reply
                                                                .sender.name
                                                        }
                                                    </Text>
                                                    <Text
                                                        numberOfLines={3}
                                                        style={[
                                                            styles.replyOpponentMessageContainerMainContentMessage,
                                                            {
                                                                color:
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
                                                    >
                                                        {dataAfter.reply.files.some(
                                                            (file) =>
                                                                file.type.includes(
                                                                    "image"
                                                                )
                                                        )
                                                            ? t(
                                                                  "chatDetailImageTitle"
                                                              )
                                                            : dataAfter.reply.files.some(
                                                                  (file) =>
                                                                      file.type.includes(
                                                                          "application"
                                                                      ) ||
                                                                      file.type.includes(
                                                                          "video"
                                                                      )
                                                              )
                                                            ? t(
                                                                  "chatDetailFileTitle"
                                                              )
                                                            : dataAfter.reply.messages.map(
                                                                  (message) =>
                                                                      message.type ===
                                                                      "text"
                                                                          ? message.content
                                                                          : "@" +
                                                                            message.content
                                                              )}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        ) : (
                                            <Text
                                                numberOfLines={3}
                                                style={[
                                                    styles.replyOpponentMessageContainerMainContentMessage,
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
                                                Tin nhắn đã bị thu hồi
                                            </Text>
                                        ))}
                                    {dataAfter.location && (
                                        <MapView
                                            onLongPress={handleOpenMap}
                                            style={{
                                                width: "100%",
                                                height: 200,
                                            }}
                                            initialRegion={{
                                                latitude:
                                                    dataAfter.location.coords
                                                        .lat,
                                                longitude:
                                                    dataAfter.location.coords
                                                        .lng,
                                                latitudeDelta: 0.005,
                                                longitudeDelta: 0.005,
                                            }}
                                        >
                                            <Marker
                                                coordinate={{
                                                    latitude:
                                                        dataAfter.location
                                                            .coords.lat,
                                                    longitude:
                                                        dataAfter.location
                                                            .coords.lng,
                                                }}
                                                title={dataAfter.location?.name}
                                            />
                                        </MapView>
                                    )}
                                    {getVideoFiles(dataAfter?.files)?.link && (
                                        <Video
                                            style={{
                                                width: "100%",
                                                height: 200,
                                            }}
                                            source={{
                                                uri:
                                                    getVideoFiles(
                                                        dataAfter?.files
                                                    )?.link || "",
                                            }}
                                            useNativeControls
                                            resizeMode={ResizeMode.CONTAIN}
                                            isLooping={false}
                                        />
                                    )}

                                    <View
                                        style={[
                                            styles.chatDetailMessageFromOpponentInfoTextBox,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.chatDetailMessageFromMeInfoText,
                                                theme === lightMode
                                                    ? commonStyles.lightPrimaryText
                                                    : commonStyles.darkPrimaryText,
                                            ]}
                                        >
                                            {dataAfter?.messages.map(
                                                (message, index) => {
                                                    if (
                                                        message.type === "text"
                                                    ) {
                                                        return (
                                                            <Text key={index}>
                                                                {
                                                                    message.content
                                                                }
                                                            </Text>
                                                        );
                                                    } else if (
                                                        message.type === "tag"
                                                    ) {
                                                        return (
                                                            <Text
                                                                style={
                                                                    commonStyles.tagColor
                                                                }
                                                                key={index}
                                                            >
                                                                {`@${message.content}`}
                                                            </Text>
                                                        );
                                                    }
                                                }
                                            )}
                                        </Text>
                                    </View>
                                    {dataAfter.files.some(
                                        (file) =>
                                            file.type.includes("application") ||
                                            file.type.includes("video")
                                    ) && (
                                        <View
                                            style={[
                                                styles.fileBoxInChatHistory,
                                                theme === lightMode
                                                    ? commonStyles.lightPrimaryBackground
                                                    : commonStyles.darkPrimaryBackground,
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    styles.fileBoxInChatHistoryImgBox,
                                                    {
                                                        backgroundColor:
                                                            theme === lightMode
                                                                ? "#ECE1FC"
                                                                : "#7269EF26",
                                                    },
                                                ]}
                                            >
                                                <Image
                                                    source={require("../../../assets/file-text-fill-icon.png")}
                                                    resizeMode="contain"
                                                    style={{
                                                        width: 20,
                                                        height: 20,
                                                        tintColor:
                                                            commonStyles
                                                                .primaryColor
                                                                .color,
                                                    }}
                                                />
                                            </View>
                                            <Text
                                                ellipsizeMode="tail"
                                                numberOfLines={1}
                                                style={[
                                                    styles.fileBoxInChatHistoryNameFile,

                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                {
                                                    dataAfter.files.find(
                                                        (file) =>
                                                            file.type.includes(
                                                                "application"
                                                            ) ||
                                                            file.type.includes(
                                                                "video"
                                                            )
                                                    )?.name
                                                }
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    handleDownloadFile(
                                                        dataAfter.files[0].link,
                                                        dataAfter.files[0].name
                                                    );
                                                }}
                                            >
                                                <Image
                                                    source={require("../../../assets/download-2-line-icon.png")}
                                                    style={[
                                                        styles.fileBoxInChatHistoryFileImageIcon,
                                                        {
                                                            tintColor:
                                                                theme ===
                                                                lightMode
                                                                    ? commonStyles
                                                                          .lightIconColor
                                                                          .color
                                                                    : commonStyles
                                                                          .darkIconColor
                                                                          .color,
                                                        },
                                                    ]}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity>
                                                <Image
                                                    source={require("../../../assets/more-fill-icon.png")}
                                                    style={[
                                                        styles.fileBoxInChatHistoryFileImageIcon,
                                                        {
                                                            tintColor:
                                                                theme ===
                                                                lightMode
                                                                    ? commonStyles
                                                                          .lightIconColor
                                                                          .color
                                                                    : commonStyles
                                                                          .darkIconColor
                                                                          .color,
                                                        },
                                                    ]}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    {dataAfter.files.some((file) =>
                                        file.type.includes("image")
                                    ) && (
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentImageBox,
                                            ]}
                                        >
                                            {dataAfter.files.map(
                                                (file, index) => {
                                                    return file.type.includes(
                                                        "image"
                                                    ) ? (
                                                        <TouchableOpacity
                                                            onPress={() =>
                                                                setShowFullScreenImageMessage(
                                                                    file
                                                                )
                                                            }
                                                            key={index}
                                                            style={[
                                                                styles.chatDetailMessageFromOpponentImageItem,
                                                            ]}
                                                        >
                                                            <Image
                                                                source={{
                                                                    uri: file.link,
                                                                }}
                                                                resizeMode="contain"
                                                                style={[
                                                                    styles.imageInChatHistory,
                                                                    {
                                                                        borderColor:
                                                                            theme ===
                                                                            lightMode
                                                                                ? commonStyles
                                                                                      .chatNavbarBorderBottomColorLight
                                                                                      .color
                                                                                : commonStyles
                                                                                      .chatNavbarBorderBottomColorDark
                                                                                      .color,
                                                                    },
                                                                ]}
                                                            />
                                                            <View
                                                                style={[
                                                                    styles.actionsWithImageInChatHistoryBox,
                                                                ]}
                                                            >
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
                                                                            styles.actionWithImageInChatHistoryImg,
                                                                        ]}
                                                                    />
                                                                </TouchableOpacity>

                                                                <TouchableOpacity>
                                                                    <Image
                                                                        source={require("../../../assets/more-fill-icon.png")}
                                                                        style={[
                                                                            styles.actionWithImageInChatHistoryImg,
                                                                        ]}
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </TouchableOpacity>
                                                    ) : (
                                                        <></>
                                                    );
                                                }
                                            )}
                                        </View>
                                    )}
                                    <View
                                        style={[
                                            styles.chatDetailMessageFromMeTimeInfoBox,
                                        ]}
                                    >
                                        <Image
                                            source={require("../../../assets/time-line-icon.png")}
                                            resizeMode="contain"
                                            style={[
                                                styles.chatDetailMessageFromOpponentTimeInfoClockImg,
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
                                        />
                                        <Text
                                            style={[
                                                styles.chatDetailMessageFromOpponentTimeInfoClockMilesStone,
                                                theme === lightMode
                                                    ? commonStyles.lightSecondaryText
                                                    : commonStyles.darkSecondaryText,
                                            ]}
                                        >
                                            {convertDateStrToHourMinute(
                                                new Date(
                                                    dataAfter.createdAt
                                                ).toISOString()
                                            )}
                                        </Text>
                                    </View>

                                    {/* {dataAfter.reactions &&
                                dataAfter.reactions.length > 0 ? (
                                    <TouchableOpacity
                                        onPress={() =>
                                            setIndexShowListReaction(id)
                                        }
                                        style={[
                                            styles.chatDetailMessageReactedForMsgBox,
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryBackground
                                                : commonStyles.darkPrimaryBackground,
                                        ]}
                                    >
                                        {getReactionsNotDuplicateEmoji(
                                            dataAfter
                                        )?.map((reaction, indexReaction) => {
                                            return (
                                                <Image
                                                    key={indexReaction}
                                                    source={
                                                        reaction.emoji === "❤"
                                                            ? require("../../../assets/heart-reaction.png")
                                                            : reaction.emoji ===
                                                              "😆"
                                                            ? require("../../../assets/haha-reaction.png")
                                                            : reaction.emoji ===
                                                              "😮"
                                                            ? require("../../../assets/surprise-reaction.png")
                                                            : reaction.emoji ===
                                                              "😢"
                                                            ? require("../../../assets/sad-reaction.png")
                                                            : reaction.emoji ===
                                                              "😡"
                                                            ? require("../../../assets/aggry-reaction.png")
                                                            : require("../../../assets/like-reaction.png")
                                                    }
                                                    resizeMode="contain"
                                                    style={[
                                                        styles.chatDetailReactedForMsgImg,
                                                    ]}
                                                />
                                            );
                                        })}
                                        {dataAfter.reactions.length > 1 ? (
                                            <Text
                                                style={[
                                                    styles.chatDetailMessageReactedForMsgCount,
                                                    theme === lightMode
                                                        ? commonStyles.lightSecondaryText
                                                        : commonStyles.darkSecondaryText,
                                                ]}
                                            >
                                                {dataAfter.reactions.length}
                                            </Text>
                                        ) : null}
                                    </TouchableOpacity>
                                ) : null} */}

                                    <View
                                        style={[
                                            styles.chatDetailMessageFromMeTriangle,
                                            {
                                                borderBottomColor:
                                                    theme === lightMode
                                                        ? commonStyles
                                                              .lightTertiaryBackground
                                                              .backgroundColor
                                                        : commonStyles
                                                              .darkTertiaryBackground
                                                              .backgroundColor,
                                            },
                                        ]}
                                    ></View>
                                </View>
                            ) : (
                                <View
                                    style={[
                                        styles.chatDetailMessageFromMeInfoBox,
                                        theme === lightMode
                                            ? commonStyles.lightTertiaryBackground
                                            : commonStyles.darkTertiaryBackground,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.chatDetailMessageFromMeInfoText,
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryText
                                                : commonStyles.darkPrimaryText,
                                        ]}
                                    >
                                        Tin nhắn đã bị thu hồi
                                    </Text>
                                </View>
                            )}

                            <Text
                                style={[
                                    styles.chatDetailMessageFromMeUsername,
                                    theme === lightMode
                                        ? commonStyles.lightTertiaryText
                                        : commonStyles.darkTertiaryText,
                                ]}
                            >
                                {dataAfter.sender.name}
                            </Text>
                        </View>
                    </View>
                    <Image
                        source={{
                            uri: dataAfter.sender.avatar,
                        }}
                        resizeMode="contain"
                        style={[styles.chatDetailAvatarImg]}
                    />
                </View>
            ) : (
                <View style={[styles.chatDetailMessageFromOpponentBox]}>
                    <Image
                        source={{
                            uri: dataAfter.sender.avatar,
                        }}
                        resizeMode="contain"
                        style={[styles.chatDetailAvatarImg]}
                    />
                    <View
                        style={[
                            styles.chatDetailMessageFromOpponentMainWrapper,
                        ]}
                    >
                        <View
                            style={[
                                styles.chatDetailMessageFromOpponentMainContainer,
                            ]}
                        >
                            {dataAfter.deleted != "2" ? (
                                <View
                                    style={[
                                        styles.chatDetailMessageFromOpponentInfoBox,
                                    ]}
                                >
                                    {dataAfter.reply &&
                                        (dataAfter.reply.deleted != "2" ? (
                                            <TouchableOpacity
                                                style={[
                                                    styles.replyOpponentMessageContainer,
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryBackground
                                                        : commonStyles.darkPrimaryBackground,
                                                ]}
                                            >
                                                <View
                                                    style={[
                                                        styles.replyOpponentVerticalBar,
                                                    ]}
                                                ></View>
                                                <View
                                                    style={[
                                                        styles.replyOpponentMessageContainerMainContent,
                                                    ]}
                                                >
                                                    <Text
                                                        numberOfLines={1}
                                                        style={[
                                                            styles.replyOpponentMessageContainerMainContentUsername,
                                                            {
                                                                color:
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
                                                    >
                                                        {dataAfter.sender.name}
                                                    </Text>
                                                    <Text
                                                        numberOfLines={3}
                                                        style={[
                                                            styles.replyOpponentMessageContainerMainContentMessage,
                                                            {
                                                                color:
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
                                                    >
                                                        {dataAfter.files.some(
                                                            (file) =>
                                                                file.type.includes(
                                                                    "image"
                                                                )
                                                        )
                                                            ? t(
                                                                  "chatDetailImageTitle"
                                                              )
                                                            : dataAfter.files.some(
                                                                  (file) =>
                                                                      file.type.includes(
                                                                          "application" ||
                                                                              "video"
                                                                      )
                                                              )
                                                            ? t(
                                                                  "chatDetailFileTitle"
                                                              )
                                                            : dataAfter.messages.map(
                                                                  (message) =>
                                                                      message.type ===
                                                                      "text"
                                                                          ? message.content
                                                                          : "@" +
                                                                            message.content
                                                              )}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        ) : (
                                            <View>
                                                <Text
                                                    numberOfLines={3}
                                                    style={[
                                                        styles.replyOpponentMessageContainerMainContentMessage,
                                                        {
                                                            color:
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
                                                >
                                                    Tin nhắn đã bị thu hồi
                                                </Text>
                                            </View>
                                        ))}
                                    {dataAfter.location && (
                                        <MapView
                                            onLongPress={handleOpenMap}
                                            style={{
                                                width: "100%",
                                                height: 200,
                                            }}
                                            initialRegion={{
                                                latitude:
                                                    dataAfter.location.coords
                                                        .lat,
                                                longitude:
                                                    dataAfter.location.coords
                                                        .lng,
                                                latitudeDelta: 0.005,
                                                longitudeDelta: 0.005,
                                            }}
                                        >
                                            <Marker
                                                coordinate={{
                                                    latitude:
                                                        dataAfter.location
                                                            .coords.lat,
                                                    longitude:
                                                        dataAfter.location
                                                            .coords.lng,
                                                }}
                                                title={dataAfter.location?.name}
                                            />
                                        </MapView>
                                    )}

                                    <View
                                        style={[
                                            styles.chatDetailMessageFromOpponentInfoTextBox,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.chatDetailMessageFromOpponentInfoText,
                                            ]}
                                        >
                                            {dataAfter.messages.map(
                                                (message, index) => {
                                                    if (
                                                        message.type === "text"
                                                    ) {
                                                        return (
                                                            <Text key={index}>
                                                                {
                                                                    message.content
                                                                }
                                                            </Text>
                                                        );
                                                    } else if (
                                                        message.type === "tag"
                                                    ) {
                                                        return (
                                                            <Text
                                                                style={
                                                                    commonStyles.tagColor
                                                                }
                                                                key={index}
                                                            >
                                                                {`@${message.content}`}
                                                            </Text>
                                                        );
                                                    }
                                                }
                                            )}
                                        </Text>
                                    </View>

                                    {dataAfter.files.some(
                                        (file) =>
                                            file.type.includes("application") ||
                                            file.type.includes("video")
                                    ) && (
                                        <TouchableOpacity
                                            onPress={() => {
                                                console.log("ababa");
                                                setOfficeUrlSelected(
                                                    dataAfter.files[0].link
                                                );
                                            }}
                                            style={[
                                                styles.fileBoxInChatHistory,
                                                theme === lightMode
                                                    ? commonStyles.lightPrimaryBackground
                                                    : commonStyles.darkPrimaryBackground,
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    styles.fileBoxInChatHistoryImgBox,
                                                    {
                                                        backgroundColor:
                                                            theme === lightMode
                                                                ? "#ECE1FC"
                                                                : "#7269EF26",
                                                    },
                                                ]}
                                            >
                                                <Image
                                                    source={require("../../../assets/file-text-fill-icon.png")}
                                                    resizeMode="contain"
                                                    style={{
                                                        width: 20,
                                                        height: 20,
                                                        tintColor:
                                                            commonStyles
                                                                .primaryColor
                                                                .color,
                                                    }}
                                                />
                                            </View>
                                            <Text
                                                ellipsizeMode="tail"
                                                numberOfLines={1}
                                                style={[
                                                    styles.fileBoxInChatHistoryNameFile,

                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText
                                                        : commonStyles.darkPrimaryText,
                                                ]}
                                            >
                                                {
                                                    dataAfter.files.find(
                                                        (file) =>
                                                            file.type.includes(
                                                                "application"
                                                            ) ||
                                                            file.type.includes(
                                                                "video"
                                                            )
                                                    )?.name
                                                }
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleDownloadFile(
                                                        dataAfter.files[0].link,
                                                        dataAfter.files[0].name
                                                    )
                                                }
                                            >
                                                <Image
                                                    source={require("../../../assets/download-2-line-icon.png")}
                                                    style={[
                                                        styles.fileBoxInChatHistoryFileImageIcon,
                                                        {
                                                            tintColor:
                                                                theme ===
                                                                lightMode
                                                                    ? commonStyles
                                                                          .lightIconColor
                                                                          .color
                                                                    : commonStyles
                                                                          .darkIconColor
                                                                          .color,
                                                        },
                                                    ]}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Image
                                                    source={require("../../../assets/more-fill-icon.png")}
                                                    style={[
                                                        styles.fileBoxInChatHistoryFileImageIcon,
                                                        {
                                                            tintColor:
                                                                theme ===
                                                                lightMode
                                                                    ? commonStyles
                                                                          .lightIconColor
                                                                          .color
                                                                    : commonStyles
                                                                          .darkIconColor
                                                                          .color,
                                                        },
                                                    ]}
                                                />
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    )}
                                    {dataAfter.files.some((file) =>
                                        file.type.includes("image")
                                    ) && (
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentImageBox,
                                            ]}
                                        >
                                            {dataAfter.files.map(
                                                (file, index) => {
                                                    return file.type.includes(
                                                        "image"
                                                    ) ? (
                                                        <TouchableOpacity
                                                            onPress={() =>
                                                                setShowFullScreenImageMessage(
                                                                    file
                                                                )
                                                            }
                                                            key={index}
                                                            style={[
                                                                styles.chatDetailMessageFromOpponentImageItem,
                                                            ]}
                                                        >
                                                            <Image
                                                                source={{
                                                                    uri: file.link,
                                                                }}
                                                                resizeMode="contain"
                                                                style={[
                                                                    styles.imageInChatHistory,
                                                                    {
                                                                        borderColor:
                                                                            theme ===
                                                                            lightMode
                                                                                ? commonStyles
                                                                                      .chatNavbarBorderBottomColorLight
                                                                                      .color
                                                                                : commonStyles
                                                                                      .chatNavbarBorderBottomColorDark
                                                                                      .color,
                                                                    },
                                                                ]}
                                                            />
                                                            <View
                                                                style={[
                                                                    styles.actionsWithImageInChatHistoryBox,
                                                                ]}
                                                            >
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
                                                                            styles.actionWithImageInChatHistoryImg,
                                                                        ]}
                                                                    />
                                                                </TouchableOpacity>

                                                                <TouchableOpacity>
                                                                    <Image
                                                                        source={require("../../../assets/more-fill-icon.png")}
                                                                        style={[
                                                                            styles.actionWithImageInChatHistoryImg,
                                                                        ]}
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </TouchableOpacity>
                                                    ) : (
                                                        <></>
                                                    );
                                                }
                                            )}
                                        </View>
                                    )}

                                    <View
                                        style={[
                                            styles.chatDetailMessageFromOpponentTimeInfoBox,
                                        ]}
                                    >
                                        <Image
                                            source={require("../../../assets/time-line-icon.png")}
                                            resizeMode="contain"
                                            style={[
                                                styles.chatDetailMessageFromOpponentTimeInfoClockImg,
                                            ]}
                                        />
                                        <Text
                                            style={[
                                                styles.chatDetailMessageFromOpponentTimeInfoClockMilesStone,
                                            ]}
                                        >
                                            {convertDateStrToHourMinute(
                                                new Date(
                                                    dataAfter.createdAt
                                                ).toISOString()
                                            )}
                                        </Text>
                                    </View>
                                    {/* 
                                {dataAfter.reactions &&
                                dataAfter.reactions.length > 0 ? (
                                    <TouchableOpacity
                                        onPress={() =>
                                            setIndexShowListReaction(id)
                                        }
                                        style={[
                                            styles.chatDetailMessageReactedForMsgBox,
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryBackground
                                                : commonStyles.darkPrimaryBackground,
                                        ]}
                                    >
                                        {getReactionsNotDuplicateEmoji(
                                            dataAfter
                                        )?.map((reaction, indexReaction) => {
                                            return (
                                                <Image
                                                    key={indexReaction}
                                                    source={
                                                        reaction.emoji === "❤"
                                                            ? require("../../../assets/heart-reaction.png")
                                                            : reaction.emoji ===
                                                              "😆"
                                                            ? require("../../../assets/haha-reaction.png")
                                                            : reaction.emoji ===
                                                              "😮"
                                                            ? require("../../../assets/surprise-reaction.png")
                                                            : reaction.emoji ===
                                                              "😢"
                                                            ? require("../../../assets/sad-reaction.png")
                                                            : reaction.emoji ===
                                                              "😡"
                                                            ? require("../../../assets/aggry-reaction.png")
                                                            : require("../../../assets/like-reaction.png")
                                                    }
                                                    resizeMode="contain"
                                                    style={[
                                                        styles.chatDetailReactedForMsgImg,
                                                    ]}
                                                />
                                            );
                                        })}
                                        {dataAfter.reactions.length > 1 ? (
                                            <Text
                                                style={[
                                                    styles.chatDetailMessageReactedForMsgCount,
                                                    theme === lightMode
                                                        ? commonStyles.lightSecondaryText
                                                        : commonStyles.darkSecondaryText,
                                                ]}
                                            >
                                                {dataAfter.reactions.length}
                                            </Text>
                                        ) : null}
                                    </TouchableOpacity>
                                ) : null} */}

                                    <View
                                        style={[
                                            styles.chatDetailMessageFromOpponentTriangle,
                                        ]}
                                    ></View>
                                </View>
                            ) : (
                                <View
                                    style={[
                                        styles.chatDetailMessageFromOpponentInfoBox,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.chatDetailMessageFromOpponentInfoText,
                                        ]}
                                    >
                                        Tin nhắn đã bị thu hồi
                                    </Text>
                                </View>
                            )}

                            <Text
                                style={[
                                    styles.chatDetailMessageFromOpponentUsername,
                                    theme === lightMode
                                        ? commonStyles.lightTertiaryText
                                        : commonStyles.darkTertiaryText,
                                ]}
                            >
                                {dataAfter.sender.name}
                            </Text>
                        </View>
                        <View style={[styles.chatDetailAnotherActionWrapper]}>
                            {dataAfter.deleted != "2" ? (
                                <>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setReplyItem(dataAfter);
                                        }}
                                        style={[
                                            styles.chatDetailMessageFromOpponentMoreActionBox,
                                        ]}
                                    >
                                        <Image
                                            source={require("../../../assets/reply-icon.png")}
                                            resizeMode="contain"
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor:
                                                    theme === lightMode
                                                        ? commonStyles
                                                              .lightIconColor
                                                              .color
                                                        : commonStyles
                                                              .darkIconColor
                                                              .color,
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <Tooltip
                                        onClose={() => {}}
                                        backgroundColor="transparent"
                                        isVisible={showReaction}
                                        placement={
                                            placementReaction as
                                                | "top"
                                                | "left"
                                                | "right"
                                                | "bottom"
                                                | "center"
                                                | undefined
                                        }
                                        arrowSize={
                                            styles.chatDetailTooltipPopupContentArrowNone
                                        }
                                        contentStyle={[
                                            styles.chatDetailTooltipPopupContent,
                                            theme === lightMode
                                                ? commonStyles.lightFourBackground
                                                : commonStyles.darkFourBackground,
                                            {
                                                borderRadius: 25,
                                            },
                                        ]}
                                        content={
                                            <OutsidePressHandler
                                                onOutsidePress={() =>
                                                    setShowReaction(false)
                                                }
                                                style={[
                                                    styles.chatDetailReactChooseBox,
                                                    theme === lightMode
                                                        ? commonStyles.lightFourBackground
                                                        : commonStyles.darkFourBackground,
                                                ]}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleAddReaction(
                                                            "❤",
                                                            dataAfter
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        source={require("../../../assets/heart-reaction.png")}
                                                        resizeMode="contain"
                                                        style={[
                                                            styles.chatDetailReactChooseBoxBtnImg,
                                                        ]}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleAddReaction(
                                                            "😆",
                                                            dataAfter
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        source={require("../../../assets/haha-reaction.png")}
                                                        resizeMode="contain"
                                                        style={[
                                                            styles.chatDetailReactChooseBoxBtnImg,
                                                        ]}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleAddReaction(
                                                            "😮",
                                                            dataAfter
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        source={require("../../../assets/surprise-reaction.png")}
                                                        resizeMode="contain"
                                                        style={[
                                                            styles.chatDetailReactChooseBoxBtnImg,
                                                        ]}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleAddReaction(
                                                            "😢",
                                                            dataAfter
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        source={require("../../../assets/sad-reaction.png")}
                                                        resizeMode="contain"
                                                        style={[
                                                            styles.chatDetailReactChooseBoxBtnImg,
                                                        ]}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleAddReaction(
                                                            "😡",
                                                            dataAfter
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        source={require("../../../assets/aggry-reaction.png")}
                                                        resizeMode="contain"
                                                        style={[
                                                            styles.chatDetailReactChooseBoxBtnImg,
                                                        ]}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleAddReaction(
                                                            "👍",
                                                            dataAfter
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        source={require("../../../assets/like-reaction.png")}
                                                        resizeMode="contain"
                                                        style={[
                                                            styles.chatDetailReactChooseBoxBtnImg,
                                                        ]}
                                                    />
                                                </TouchableOpacity>
                                            </OutsidePressHandler>
                                        }
                                    >
                                        <TouchableOpacity
                                            onPress={(evt) => {
                                                if (
                                                    evt.nativeEvent.pageY >
                                                    HEIGHT / 2
                                                ) {
                                                    setPlacementReaction("top");
                                                } else {
                                                    setPlacementReaction(
                                                        "bottom"
                                                    );
                                                }
                                                setShowReaction(true);
                                            }}
                                            style={[
                                                styles.chatDetailMessageFromOpponentMoreActionBox,
                                            ]}
                                        >
                                            <Image
                                                source={require("../../../assets/emotion-happy-line-icon.png")}
                                                resizeMode="contain"
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    tintColor:
                                                        theme === lightMode
                                                            ? commonStyles
                                                                  .lightIconColor
                                                                  .color
                                                            : commonStyles
                                                                  .darkIconColor
                                                                  .color,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </Tooltip>

                                    <Tooltip
                                        arrowSize={
                                            styles.chatDetailTooltipPopupContentArrowNone
                                        }
                                        contentStyle={[
                                            styles.chatDetailTooltipPopupContent,
                                            theme === lightMode
                                                ? commonStyles.lightFourBackground
                                                : commonStyles.darkFourBackground,
                                        ]}
                                        onClose={() =>
                                            setIndexMessageAction(-1)
                                        }
                                        backgroundColor="transparent"
                                        isVisible={indexMessageAction === id}
                                        showChildInTooltip={false}
                                        placement={
                                            placement as
                                                | "top"
                                                | "left"
                                                | "right"
                                                | "bottom"
                                                | "center"
                                                | undefined
                                        }
                                        content={
                                            <MessagePopupAction
                                                theme={theme}
                                                translation={t}
                                                messageItem={dataAfter}
                                                userInfo={userInfo}
                                                setMessageHistory={
                                                    setMessageHistory
                                                }
                                                setIndexMessageAction={
                                                    setIndexMessageAction
                                                }
                                            />
                                        }
                                    >
                                        <TouchableOpacity
                                            onPress={(evt) => {
                                                // handleOpenMoreActionOnMessage(evt, 0)
                                                if (
                                                    evt.nativeEvent.pageY >
                                                    HEIGHT / 2
                                                ) {
                                                    setPlacement("top");
                                                } else {
                                                    setPlacement("bottom");
                                                }
                                                setIndexMessageAction(id);
                                            }}
                                            style={[
                                                styles.chatDetailMessageFromOpponentMoreActionBox,
                                            ]}
                                        >
                                            <Image
                                                source={require("../../../assets/more-vertical-line-icon.png")}
                                                resizeMode="contain"
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    tintColor:
                                                        theme === lightMode
                                                            ? commonStyles
                                                                  .lightIconColor
                                                                  .color
                                                            : commonStyles
                                                                  .darkIconColor
                                                                  .color,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </Tooltip>
                                </>
                            ) : (
                                <></>
                            )}
                        </View>
                    </View>
                </View>
            )}
        </>
    ) : null;
}
export default memo(MessageComponent);
