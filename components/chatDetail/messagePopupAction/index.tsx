import { exists, TFunction } from "i18next";
import { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { lightMode } from "../../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../../CommonStyles/commonStyles";
import { IConversation, IMessageItem } from "../../../configs/interfaces";
import { userInfoInterfaceI } from "../../../redux_toolkit/slices/userInfo.slice";
import {
    LINK_DELETE_MESSAGE_SIDE_ALL,
    LINK_DELETE_MESSAGE_SIDE_ME,
    LINK_GET_MESSAGE_HISTORY,
    LINK_PIN_MESSAGE,
} from "@env";
import Spinner from "react-native-loading-spinner-overlay";
import { saveToClipboard } from "../../../utils/clipboard";
import { Socket } from "socket.io-client";
import {DefaultEventsMap} from "@socket.io/component-emitter";


interface MessagePopupActionProps {
    theme: string;
    translation: TFunction<"translation", undefined>;
    messageItem: IMessageItem;
    userInfo: userInfoInterfaceI;
    handleUpdateAllMessageItem: (messageId: string) => void;
    handleRemoveMessageItem: (messageId: string) => void;
    setShowMoreAction: Dispatch<SetStateAction<boolean>>;
    conversation: IConversation;
    setConversation: Dispatch<SetStateAction<IConversation>>;
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    setShowForwardModal: Dispatch<SetStateAction<IMessageItem | null>>;
}

function MessagePopupAction({
    theme,
    translation: t,
    messageItem,
    userInfo,
    handleUpdateAllMessageItem,
    handleRemoveMessageItem,
    setShowMoreAction,
    conversation,
    setConversation,
    socket,
    setShowForwardModal
}: MessagePopupActionProps) {
    const [isLoading, setIsLoading] = useState(false);
    

    async function handleDeleteSideMe() {
        try {
            setIsLoading(true);
            const response = await fetch(LINK_DELETE_MESSAGE_SIDE_ME, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
                body: JSON.stringify({
                    messageId: messageItem._id,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Data delete side me: ", data);
                console.log("Delete message successfully");
                setIsLoading(false);
                setShowMoreAction(false);
                handleRemoveMessageItem(messageItem._id);
            } else {
                Alert.alert("Error", "Delete message failed");
            }
        } catch (error) {
            console.log("Error when delete message: ", error);
        }
        setIsLoading(false);
    }

    async function handleDeleteSideAll() {
        try {
            setIsLoading(true);
            const response = await fetch(LINK_DELETE_MESSAGE_SIDE_ALL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
                body: JSON.stringify({
                    messageId: messageItem._id,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setIsLoading(false);
                setShowMoreAction(false);
                handleUpdateAllMessageItem(messageItem._id);
            } else {
                Alert.alert("Error", "Delete message failed");
            }
        } catch (error) {
            console.log("Error when delete message: ", error);
        }
        setIsLoading(false);
    }

    function handlePinMessage(){
        setShowMoreAction(false);
        let isExist = false;
        isExist = conversation.pinnedMessages.some(messageItemPinned => messageItemPinned._id === messageItem._id)
        if (isExist){
            console.log("Existed")
            return;
        }

        fetch(LINK_PIN_MESSAGE + messageItem._id, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`
            }
        })
        .then(response => {
            if (response.ok){
                let pinnedMessages = conversation.pinnedMessages;
                if (pinnedMessages.length >= 3){
                    pinnedMessages.pop();
                }
                pinnedMessages.unshift(messageItem);
                setConversation({
                    ...conversation,
                    pinnedMessages: pinnedMessages
                });
                
                socket.emit("pinMessage", {
                    users: conversation.users,
                    message: messageItem,
                    userId: userInfo.user?._id
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleSaveMessageToClipboard = () => {
        saveToClipboard(messageItem);
        setShowMoreAction(false);
    }

    return (
        <View>
            <Spinner
                visible={isLoading}
                textContent={t("loading")}
                textStyle={{ color: "#FFF" }}
            />
            <View
                style={[
                    styles.chatDetailMessageFromOpponentPopupActionBox,
                    theme === lightMode
                        ? commonStyles.lightFourBackground
                        : commonStyles.darkFourBackground,
                ]}
            >
                <TouchableOpacity
                    onPress={handlePinMessage}
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
                        {t("chatDetailMorePinTitle")}
                    </Text>
                    <Image
                        source={require("../../../assets/pin-fill-icon.png")}
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
                    onPress={handleSaveMessageToClipboard}
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
                    onPress={() => {
                        setShowMoreAction(false);
                        setShowForwardModal(messageItem)
                    }}
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
                {userInfo.user?._id === messageItem.sender._id && (
                    <TouchableOpacity
                        style={[styles.itemInMessageFromOpponentPopupAction]}
                        onPress={handleDeleteSideAll}
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
                                            ? commonStyles.lightTertiaryText
                                                  .color
                                            : commonStyles.darkTertiaryText
                                                  .color,
                                },
                            ]}
                        />
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={[styles.itemInMessageFromOpponentPopupAction]}
                    onPress={handleDeleteSideMe}
                >
                    <Text
                        style={[
                            styles.itemInMessageFromOpponentPopupActionText,
                            theme === lightMode
                                ? commonStyles.lightTertiaryText
                                : commonStyles.darkTertiaryText,
                        ]}
                    >
                        {t("chatDetailMessageDeleteSideMeAction")}
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

export default memo(MessagePopupAction);
