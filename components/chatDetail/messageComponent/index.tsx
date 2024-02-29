import { memo, useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
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


interface MessageComponentProps {
    id: number;
    data: DataHistoryChatMessageInterface;
    theme: string;
    translation: TFunction<"translation", undefined>;
    indexMessageAction: number;
    setIndexMessageAction: (index: number) => void;
    indexShowListReaction: number;
    setIndexShowListReaction: (index: number) => void;
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
}: MessageComponentProps) {
    const [placement, setPlacement] = useState("top");
    const [placementReaction, setPlacementReaction] = useState("top");
    const [showReaction, setShowReaction] = useState(false);
    const [dataAfter, setDataAfter] =
        useState<DataHistoryChatMessageInterface>();

    useEffect(() => {
        setDataAfter(data);
    }, []);

    function handleAddReaction(
        emoji: string,
        dataAfter: DataHistoryChatMessageInterface
    ) {
        setShowReaction(false);

        const isMeReacted = dataAfter?.reactions?.findIndex(
            (item) => item.userID === 2
        );

        if (isMeReacted !== -1) {
            const newReactions = {
                userID: 2,
                emoji: emoji,
                userImg:
                    "https://static.wikia.nocookie.net/vsbattles/images/f/f8/YujiroHanmaRenderMadeByRyukama-0.png/revision/latest?cb=20180106041211",
                userName: "me",
            };
            const reactions = dataAfter?.reactions?.filter(
                (item) => item.userID !== 2
            );

            setDataAfter({
                ...dataAfter,
                reactions: [...reactions, newReactions],
            });
        } else {
            const newReactions = {
                userID: 2,
                emoji: emoji,
                userImg:
                    "https://static.wikia.nocookie.net/vsbattles/images/f/f8/YujiroHanmaRenderMadeByRyukama-0.png/revision/latest?cb=20180106041211",
                userName: "me",
            };
            setDataAfter({
                ...dataAfter,
                reactions: [...dataAfter.reactions, newReactions],
            });
        }
    }
    function getReactionsNotDuplicateEmoji(
        dataAfter: DataHistoryChatMessageInterface
    ): DataHistoryChatMessageReactionInterface[] | undefined {
        let key = (reaction: DataHistoryChatMessageReactionInterface) =>
            reaction.emoji;
        const reactions = [
            ...new Map(
                dataAfter.reactions.map((item) => [key(item), item])
            ).values(),
        ];
        return reactions;
    }

    return dataAfter ? (
        <>
            {dataAfter?.side === "me" ? (
                <View style={[styles.chatDetailMessageFromMeBox]}>
                    <View style={[styles.chatDetailMessageFromMeMainWrapper]}>
                        <View style={[styles.chatDetailAnotherActionWrapper]}>
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
                                onClose={() => setIndexMessageAction(-1)}
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
                                                          .lightIconColor.color
                                                    : commonStyles.darkIconColor
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
                                            setPlacementReaction("bottom");
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
                                                          .lightIconColor.color
                                                    : commonStyles.darkIconColor
                                                          .color,
                                        }}
                                    />
                                </TouchableOpacity>
                            </Tooltip>
                        </View>

                        <View
                            style={[
                                styles.chatDetailMessageFromOpponentMainContainer,
                            ]}
                        >
                            <View
                                style={[
                                    styles.chatDetailMessageFromMeInfoBox,
                                    theme === lightMode
                                        ? commonStyles.lightTertiaryBackground
                                        : commonStyles.darkTertiaryBackground,
                                ]}
                            >
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
                                                if (message.type === "text") {
                                                    return (
                                                        <Text key={index}>
                                                            {message.content}
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
                                {dataAfter.attachmentFile && (
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
                                                            .primaryColor.color,
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
                                            {dataAfter.attachmentFile.name}
                                        </Text>
                                        <TouchableOpacity>
                                            <Image
                                                source={require("../../../assets/download-2-line-icon.png")}
                                                style={[
                                                    styles.fileBoxInChatHistoryFileImageIcon,
                                                    {
                                                        tintColor:
                                                            theme === lightMode
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
                                                            theme === lightMode
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
                                {dataAfter.attachmentImages && (
                                    <View
                                        style={[
                                            styles.chatDetailMessageFromOpponentImageBox,
                                        ]}
                                    >
                                        {dataAfter.attachmentImages.map(
                                            (image, index) => {
                                                return (
                                                    <View
                                                        key={index}
                                                        style={[
                                                            styles.chatDetailMessageFromOpponentImageItem,
                                                        ]}
                                                    >
                                                        <Image
                                                            source={{
                                                                uri: image.url,
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
                                                            <TouchableOpacity>
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
                                                    </View>
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
                                        {dataAfter.time}
                                    </Text>
                                </View>

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
                                ) : null}

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

                            <Text
                                style={[
                                    styles.chatDetailMessageFromMeUsername,
                                    theme === lightMode
                                        ? commonStyles.lightTertiaryText
                                        : commonStyles.darkTertiaryText,
                                ]}
                            >
                                {dataAfter.name}
                            </Text>
                        </View>
                    </View>
                    <Image
                        source={{
                            uri: dataAfter.image,
                        }}
                        resizeMode="contain"
                        style={[styles.chatDetailAvatarImg]}
                    />
                </View>
            ) : (
                <View style={[styles.chatDetailMessageFromOpponentBox]}>
                    <Image
                        source={{
                            uri: dataAfter.image,
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
                            <View
                                style={[
                                    styles.chatDetailMessageFromOpponentInfoBox,
                                ]}
                            >
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
                                                if (message.type === "text") {
                                                    return (
                                                        <Text key={index}>
                                                            {message.content}
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
                                {dataAfter.attachmentFile && (
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
                                                            .primaryColor.color,
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
                                            {dataAfter.attachmentFile.name}
                                        </Text>
                                        <TouchableOpacity>
                                            <Image
                                                source={require("../../../assets/download-2-line-icon.png")}
                                                style={[
                                                    styles.fileBoxInChatHistoryFileImageIcon,
                                                    {
                                                        tintColor:
                                                            theme === lightMode
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
                                                            theme === lightMode
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
                                {dataAfter.attachmentImages && (
                                    <View
                                        style={[
                                            styles.chatDetailMessageFromOpponentImageBox,
                                        ]}
                                    >
                                        {dataAfter.attachmentImages.map(
                                            (image, index) => {
                                                return (
                                                    <View
                                                        key={index}
                                                        style={[
                                                            styles.chatDetailMessageFromOpponentImageItem,
                                                        ]}
                                                    >
                                                        <Image
                                                            source={{
                                                                uri: image.url,
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
                                                            <TouchableOpacity>
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
                                                    </View>
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
                                        {dataAfter.time}
                                    </Text>
                                </View>

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
                                ) : null}

                                <View
                                    style={[
                                        styles.chatDetailMessageFromOpponentTriangle,
                                    ]}
                                ></View>
                            </View>

                            <Text
                                style={[
                                    styles.chatDetailMessageFromOpponentUsername,
                                    theme === lightMode
                                        ? commonStyles.lightTertiaryText
                                        : commonStyles.darkTertiaryText,
                                ]}
                            >
                                {dataAfter.name}
                            </Text>
                        </View>
                        <View style={[styles.chatDetailAnotherActionWrapper]}>
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
                                            setPlacementReaction("bottom");
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
                                                          .lightIconColor.color
                                                    : commonStyles.darkIconColor
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
                                onClose={() => setIndexMessageAction(-1)}
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
                                                          .lightIconColor.color
                                                    : commonStyles.darkIconColor
                                                          .color,
                                        }}
                                    />
                                </TouchableOpacity>
                            </Tooltip>
                        </View>
                    </View>
                </View>
            )}
        </>
    ) : null;
}
export default memo(MessageComponent);
