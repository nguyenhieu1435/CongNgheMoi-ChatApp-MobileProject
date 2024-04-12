import { TFunction } from "i18next";
import { Dispatch, memo, useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles"
import { lightMode } from "../../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../../CommonStyles/commonStyles";
import { IMessageItem } from "../../../configs/interfaces";
import { userInfoInterfaceI } from "../../../redux_toolkit/slices/userInfo.slice";
import { LINK_DELETE_MESSAGE_SIDE_ALL, LINK_DELETE_MESSAGE_SIDE_ME, LINK_GET_MESSAGE_HISTORY } from "@env";
import Spinner from "react-native-loading-spinner-overlay";

interface MessagePopupActionProps {
    theme: string;
    translation: TFunction<"translation", undefined>;
    messageItem: IMessageItem;
    userInfo: userInfoInterfaceI;
    setMessageHistory: Dispatch<React.SetStateAction<IMessageItem[]>>;
    setIndexMessageAction: (index: number) => void;
}

function MessagePopupAction({theme, translation: t, messageItem, userInfo, setMessageHistory, setIndexMessageAction}: MessagePopupActionProps) {
    const [isLoading, setIsLoading] = useState(false)

    async function handleDeleteSideMe(){
        try {
            setIsLoading(true)
            const response = await fetch(LINK_DELETE_MESSAGE_SIDE_ME,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.accessToken}`
                },
                body: JSON.stringify({
                    messageId: messageItem._id
                })
            })
            if (response.ok) {
                console.log("Delete message successfully")
                setIsLoading(false)
                setIndexMessageAction(-1)
                getNewestMessageHistory()
            } else {
                Alert.alert("Error", "Delete message failed")
            }
        } catch (error) {
            console.log("Error when delete message: ", error)
        }
        setIsLoading(false)
    }

    async function handleDeleteSideAll(){
        try {
            setIsLoading(true)
            const response = await fetch(LINK_DELETE_MESSAGE_SIDE_ALL,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.accessToken}`
                },
                body: JSON.stringify({
                    messageId: messageItem._id
                })
            })
            if (response.ok) {
                console.log("Delete message successfully")
                setIsLoading(false)
                setIndexMessageAction(-1)
                getNewestMessageHistory()
                
            }else {
                Alert.alert("Error", "Delete message failed")
            }
        } catch (error) {
            console.log("Error when delete message: ", error)
        }
        setIsLoading(false)
    }

    async function getNewestMessageHistory(){
        const conversationID = messageItem.conversation._id
        try {
        
            const response = await fetch(LINK_GET_MESSAGE_HISTORY + conversationID, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.accessToken}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log("Get message history successfully", data)
                setMessageHistory(data)
            } 
        } catch (error) {
            console.log("Error when get message history: ", error)
        }
        
    }
   

    return (
        <View>
            <Spinner
                visible={isLoading}
                textContent={t("loading")}
                textStyle={{color: "#FFF"}}
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
                {
                    userInfo.user?._id === messageItem.sender._id && (
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
                                                ? commonStyles.lightTertiaryText.color
                                                : commonStyles.darkTertiaryText.color,
                                    },
                                ]}
                            />
                        </TouchableOpacity>
                    )
                }
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

export default memo(MessagePopupAction)