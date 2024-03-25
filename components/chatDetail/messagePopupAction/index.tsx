import { TFunction } from "i18next";
import { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles"
import { lightMode } from "../../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../../CommonStyles/commonStyles";

interface MessagePopupActionProps {
    theme: string;
    translation: TFunction<"translation", undefined>;
}

function MessagePopupAction({theme, translation: t}: MessagePopupActionProps) {

    return (
        <View>
            <View
                style={[
                    styles.chatDetailMessageFromOpponentPopupActionBox,
                    theme === lightMode
                        ? commonStyles.lightFourBackground
                        : commonStyles.darkFourBackground,
                ]}
            >
                <TouchableOpacity
                    onPress={() => {
                        console.log("a");
                    }}
                    style={[styles.itemInMessageFromOpponentPopupAction]}
                >
                    <Text
                        style={[
                            styles.itemInMessageFromOpponentPopupActionText,
                            theme === lightMode
                                ? commonStyles.lightTertiaryText
                                : commonStyles.darkTertiaryText,
                        ]}
                    >
                        {t("chatDetailMessageCopyAction")}
                    </Text>
                    <Image
                        source={require("../../../assets/file-copy-line-icon.png")}
                        resizeMode="contain"
                        style={[
                            styles.itemInMessageFromOpponentPopupActionImg,
                            {
                                tintColor:
                                    theme === lightMode
                                        ? commonStyles.lightTertiaryText.color
                                        : commonStyles.darkTertiaryText.color,
                            },
                        ]}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.itemInMessageFromOpponentPopupAction]}
                >
                    <Text
                        style={[
                            styles.itemInMessageFromOpponentPopupActionText,
                            theme === lightMode
                                ? commonStyles.lightTertiaryText
                                : commonStyles.darkTertiaryText,
                        ]}
                    >
                        {t("chatDetailMessageSaveAction")}
                    </Text>
                    <Image
                        source={require("../../../assets/save-line-icon.png")}
                        resizeMode="contain"
                        style={[
                            styles.itemInMessageFromOpponentPopupActionImg,
                            {
                                tintColor:
                                    theme === lightMode
                                        ? commonStyles.lightTertiaryText.color
                                        : commonStyles.darkTertiaryText.color,
                            },
                        ]}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.itemInMessageFromOpponentPopupAction]}
                >
                    <Text
                        style={[
                            styles.itemInMessageFromOpponentPopupActionText,
                            theme === lightMode
                                ? commonStyles.lightTertiaryText
                                : commonStyles.darkTertiaryText,
                        ]}
                    >
                        {t("chatDetailMessageForwardAction")}
                    </Text>
                    <Image
                        source={require("../../../assets/chat-forward-line-icon.png")}
                        resizeMode="contain"
                        style={[
                            styles.itemInMessageFromOpponentPopupActionImg,
                            {
                                tintColor:
                                    theme === lightMode
                                        ? commonStyles.lightTertiaryText.color
                                        : commonStyles.darkTertiaryText.color,
                            },
                        ]}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.itemInMessageFromOpponentPopupAction]}
                >
                    <Text
                        style={[
                            styles.itemInMessageFromOpponentPopupActionText,
                            theme === lightMode
                                ? commonStyles.lightTertiaryText
                                : commonStyles.darkTertiaryText,
                        ]}
                    >
                        {t("chatDetailMessageDeleteAction")}
                    </Text>
                    <Image
                        source={require("../../../assets/delete-bin-line-icon.png")}
                        resizeMode="contain"
                        style={[
                            styles.itemInMessageFromOpponentPopupActionImg,
                            {
                                tintColor:
                                    theme === lightMode
                                        ? commonStyles.lightTertiaryText.color
                                        : commonStyles.darkTertiaryText.color,
                            },
                        ]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default memo(MessagePopupAction)