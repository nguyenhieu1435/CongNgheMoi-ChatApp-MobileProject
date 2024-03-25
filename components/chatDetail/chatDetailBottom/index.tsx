import { View, Text, TextInput, TouchableOpacity, Image, Animated, ScrollView, Easing } from "react-native";
import { styles } from "./styles";
import React, { memo, useEffect, useState } from "react";
import { TFunction } from "i18next";
import { lightMode } from "../../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../../CommonStyles/commonStyles";
import EmojiPicker from "rn-emoji-keyboard";
import { checkText } from "smile2emoji";

interface ChatDetailBottomProps {
    theme: string;
    translation : TFunction<"translation", undefined>;
    showMoreChatActions: boolean;
    setShowMoreChatActions: (show: boolean) => void;
    historyChatScrollViewRef: React.RefObject<ScrollView>;
    heightForMoreChatActions: number
}

function ChatDetailBottom({theme, translation: t, showMoreChatActions, setShowMoreChatActions, historyChatScrollViewRef,
    heightForMoreChatActions}: ChatDetailBottomProps) {
    const [textMessage, setTextMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [heightMessageMoreActions, setHeightMessageMoreActions] =
        useState<Animated.Value>(new Animated.Value(0));

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
                <View style={[styles.chatDetailBottomContainer]}>
                    <TextInput
                        value={textMessage}
                        onChangeText={(text) => setTextMessage(checkText(text))}
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
                                        ? commonStyles.lightTertiaryText.color
                                        : commonStyles.darkTertiaryText.color,
                            },
                        ]}
                        placeholderTextColor={
                            theme === lightMode
                                ? commonStyles.lightTertiaryText.color
                                : commonStyles.darkTertiaryText.color
                        }
                    />
                    <TouchableOpacity onPress={() => setShowEmojiPicker(true)}>
                        <Image
                            source={require("../../../assets/emotion-happy-line-icon.png")}
                            resizeMode="contain"
                            style={[styles.bottomSecondActionImg]}
                        />
                    </TouchableOpacity>
                    {!textMessage && (
                        <TouchableOpacity>
                            <Image
                                source={require("../../../assets/image-fill-icon.png")}
                                resizeMode="contain"
                                style={[styles.bottomSecondActionImg]}
                            />
                        </TouchableOpacity>
                    )}

                    {!textMessage && (
                        <TouchableOpacity>
                            <Image
                                source={require("../../../assets/mic-line-icon.png")}
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
                        <TouchableOpacity style={[styles.bottomSendActionBox]}>
                            <Image
                                source={require("../../../assets/send-plane-2-fill-icon.png")}
                                resizeMode="contain"
                                style={[styles.bottomSendActionImg]}
                            />
                        </TouchableOpacity>
                    )}
                </View>
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
                                <View
                                    style={[
                                        styles.chatDetailBottomActionWrapper,
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.chatDetailBottomActionBtn,
                                        ]}
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
                                <View
                                    style={[
                                        styles.chatDetailBottomActionWrapper,
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.chatDetailBottomActionBtn,
                                        ]}
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
                                <View
                                    style={[
                                        styles.chatDetailBottomActionWrapper,
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.chatDetailBottomActionBtn,
                                        ]}
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
                    setTextMessage(textMessage + emoji.emoji);
                }}
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
        </>
    );
}

export default memo(ChatDetailBottom);
