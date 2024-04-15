import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { Dispatch, memo, SetStateAction, useState } from "react";
import { styles } from "./styles";
import commonStyles from "../../../CommonStyles/commonStyles";
import { lightMode } from "../../../redux_toolkit/slices/theme.slice";
import { FontAwesome } from "@expo/vector-icons";
import OutsidePressHandler from "react-native-outside-press";
import { TFunction } from "i18next";
import debounce from "debounce";
import {
    IConversation,
    IMessageItem,
    IUserInConversation,
} from "../../../configs/interfaces";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux_toolkit/store";
import Tooltip from "react-native-walkthrough-tooltip";
import { saveToClipboard } from "../../../utils/clipboard";
import { LINK_UNPIN_MESSAGE } from "@env";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";
import { socket } from "../../../configs/socket-io";
import CreateGroupAvatarWhenAvatarIsEmpty from "../../../utils/createGroupAvatarWhenAvatarIsEmpty";

interface ChatDetailHeaderProps {
    theme: string;
    navigation: any;
    translation: TFunction<"translation", undefined>;
    textSearch: string;
    setTextSearch: (text: string) => void;
    conversation: IConversation;
    setConversation: Dispatch<SetStateAction<IConversation>>;
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

function ChatDetailHeader({
    theme,
    navigation,
    translation: t,
    textSearch,
    setTextSearch,
    conversation,
    setConversation,
}: ChatDetailHeaderProps) {
    const [showModalSearch, setShowModalSearch] = useState(false);
    const [showMoreAction, setShowMoreAction] = useState(false);
    const userInfo = useSelector((state: IRootState) => state.userInfo);
    const [isShowPinAction, setIsShowPinAction] = useState(-1);
    const [showMore, setShowMore] = useState(false);

    function setTextDebounce(text: string) {
        debounce(() => {
            setTextSearch(text);
        }, 500);
    }

    function getUserConversation() {
        return conversation.users.find(
            (user) => user._id != userInfo.user?._id
        );
    }

    function handleUnpinMessage(message: IMessageItem) {
        setIsShowPinAction(-1);
        fetch(LINK_UNPIN_MESSAGE + message._id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    const newPinnedMessage = conversation.pinnedMessages.filter(
                        (item) => item._id !== message._id
                    );
                    setConversation({
                        ...conversation,
                        pinnedMessages: newPinnedMessage,
                    });
                    console.log("calling unpin");
                    
                    socket.emit("unpinMessage", {
                        users: conversation.users,
                        message: message,
                        userId: userInfo.user?._id,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function handleGetMessageContent(message: IMessageItem) : string {
     
        if (message.messages.length > 0){
            console.log("Message PINNEDaaaaaaaa: ", message);
            return message.messages
            .map(
                (
                    messageDetail
                ) => {
                    return messageDetail.type ===
                        "text"
                        ? messageDetail.content
                        : "@" +
                              messageDetail.content;
                }
            )
            .join("")
        } else if (message.files.some((file) => file.type.includes("image"))) {
            return t("chatDetailImageTitle")
        } else if (message.files.some((file) => file.type.includes("video") || file.type.includes("application"))) {
            return t("chatDetailFileTitle")
        } else {
            return t("chatDetailFileTitle")
        }
    }

    return (
        <View style={[styles.chatDetailNavbarContainer]}>
            <View
                style={[
                    styles.chatDetailNavbar,
                    {
                        borderBottomColor:
                            theme === lightMode
                                ? commonStyles.chatNavbarBorderBottomColorLight
                                      .color
                                : commonStyles.chatNavbarBorderBottomColorDark
                                      .color,
                        zIndex: 20,
                    },
                ]}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("ChatList")}
                    style={[styles.btnGoback]}
                >
                    <FontAwesome
                        name="angle-left"
                        size={24}
                        color={
                            theme === lightMode
                                ? commonStyles.lightSecondaryText.color
                                : commonStyles.darkSecondaryText.color
                        }
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.chatDetailNavbarUsernameBox]}
                >
                    {
                        !conversation.isGroup
                        ?
                        <Image
                            source={{ uri: conversation.picture }}
                            resizeMode="cover"
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 50,
                            }}
                        />
                        :
                        conversation.picture
                            ?
                            <Image
                                source={{ uri: conversation.picture }}
                                resizeMode="cover"
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 50,
                                }}
                            />
                            :
                            CreateGroupAvatarWhenAvatarIsEmpty(conversation)
                    }
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.chatDetailUsernameText,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {conversation.name}
                    </Text>
                    <View
                        style={[
                            styles.activityIcon,
                            {
                                backgroundColor:
                                    commonStyles.activeOnlineColor.color,
                            },
                        ]}
                    ></View>
                </TouchableOpacity>

                <View style={[styles.chatDetailNavbarBaseActions]}>
                    <OutsidePressHandler
                        onOutsidePress={() => {
                            setShowModalSearch(false);
                        }}
                        style={[styles.chatDetailNavbarBaseActionItemBox]}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setShowModalSearch(!showModalSearch);
                            }}
                        >
                            <Image
                                source={require("../../../assets/search-line-icon.png")}
                                resizeMode="contain"
                                style={{
                                    width: 23,
                                    height: 23,
                                }}
                                tintColor={
                                    theme === lightMode
                                        ? commonStyles.lightSecondaryText.color
                                        : commonStyles.darkSecondaryText.color
                                }
                            />
                        </TouchableOpacity>

                        {showModalSearch && (
                            <View
                                style={[
                                    styles.chatDetailNavbarBaseActionItemPopup,
                                    theme === lightMode
                                        ? commonStyles.lightFourBackground
                                        : commonStyles.darkFourBackground,
                                    {
                                        shadowColor: "#0F223A",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.12,
                                        shadowRadius: 4,
                                        elevation: 4,
                                    },
                                ]}
                            >
                                <TextInput
                                    placeholder={t(
                                        "chatDetailSearchPlaceholder"
                                    )}
                                    value={textSearch}
                                    onChangeText={(text) =>
                                        setTextDebounce(text)
                                    }
                                    placeholderTextColor={
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color
                                    }
                                    style={[
                                        styles.chatDetailNavbarBaseActionItePopupInput,
                                        theme === lightMode
                                            ? commonStyles.lightTertiaryBackground
                                            : commonStyles.darkTertiaryBackground,
                                        theme === lightMode
                                            ? commonStyles.lightTertiaryText
                                            : commonStyles.darkTertiaryText,
                                    ]}
                                />
                            </View>
                        )}
                    </OutsidePressHandler>

                    {
                        conversation.isGroup
                        ?
                        <TouchableOpacity
                            onPress={()=> navigation.navigate("AddFriendIntoGroup", {
                                conversation: conversation,
                                socket: socket,
                                setConversation: setConversation,
                            })}
                        >
                            <Image
                                source={require("../../../assets/user-add-line.png")}
                                resizeMode="contain"
                                style={{
                                    width: 23,
                                    height: 23,
                                }}
                                tintColor={
                                    theme === lightMode
                                        ? commonStyles.lightSecondaryText.color
                                        : commonStyles.darkSecondaryText.color
                                }
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity>
                            <Image
                                source={require("../../../assets/phone-line-icon.png")}
                                resizeMode="contain"
                                style={{
                                    width: 23,
                                    height: 23,
                                }}
                                tintColor={
                                    theme === lightMode
                                        ? commonStyles.lightSecondaryText.color
                                        : commonStyles.darkSecondaryText.color
                                }
                            />
                        </TouchableOpacity>
                    }

                    <TouchableOpacity>
                        <Image
                            source={require("../../../assets/vidicon-line-icon.png")}
                            resizeMode="contain"
                            style={{
                                width: 23,
                                height: 23,
                            }}
                            tintColor={
                                theme === lightMode
                                    ? commonStyles.lightSecondaryText.color
                                    : commonStyles.darkSecondaryText.color
                            }
                        />
                    </TouchableOpacity>

                    <OutsidePressHandler
                        onOutsidePress={() => {
                            setShowMoreAction(false);
                        }}
                        style={[styles.chatDetailNavbarBaseActionItemBox]}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setShowMoreAction(!showMoreAction);
                            }}
                        >
                            <Image
                                source={require("../../../assets/more-line-icon.png")}
                                resizeMode="contain"
                                style={{
                                    width: 23,
                                    height: 23,
                                }}
                                tintColor={
                                    theme === lightMode
                                        ? commonStyles.lightSecondaryText.color
                                        : commonStyles.darkSecondaryText.color
                                }
                            />
                        </TouchableOpacity>
                        {showMoreAction && (
                            <View
                                style={[
                                    styles.chatDetailNavbarBaseActionMoreItemPopup,
                                    theme === lightMode
                                        ? commonStyles.lightFourBackground
                                        : commonStyles.darkFourBackground,
                                    {
                                        shadowColor: "#0F223A",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.12,
                                        shadowRadius: 4,
                                        elevation: 4,
                                    },
                                ]}
                            >
                                {
                                    conversation.isGroup
                                    ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("ManagingGroup", {
                                                conversation: conversation,
                                                socket: socket,
                                                setConversation: setConversation,
                                            });
                                        }}
                                        style={[
                                            styles.chatDetailNavbarBaseActionMoreItem,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                theme === lightMode
                                                    ? commonStyles.lightTertiaryText
                                                    : commonStyles.darkTertiaryText,
                                                styles.navbarActionMoreItemText,
                                            ]}
                                        >
                                            {t("chatDetaildMoreViewSettingGroup")}
                                        </Text>
                                        <Image
                                            source={require("../../../assets/settings-4-line-icon.png")}
                                            resizeMode="contain"
                                            style={{
                                                width: 17,
                                                height: 17,
                                            }}
                                            tintColor={
                                                theme === lightMode
                                                    ? commonStyles
                                                        .lightSecondaryText.color
                                                    : commonStyles.darkSecondaryText
                                                        .color
                                            }
                                        />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("ChatProfile");
                                        }}
                                        style={[
                                            styles.chatDetailNavbarBaseActionMoreItem,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                theme === lightMode
                                                    ? commonStyles.lightTertiaryText
                                                    : commonStyles.darkTertiaryText,
                                                styles.navbarActionMoreItemText,
                                            ]}
                                        >
                                            {t("chatDetaildMoreViewProfileTitle")}
                                        </Text>
                                        <Image
                                            source={require("../../../assets/user-chatlist-bottom-tab.png")}
                                            resizeMode="contain"
                                            style={{
                                                width: 17,
                                                height: 17,
                                            }}
                                            tintColor={
                                                theme === lightMode
                                                    ? commonStyles
                                                        .lightSecondaryText.color
                                                    : commonStyles.darkSecondaryText
                                                        .color
                                            }
                                        />
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity
                                    style={[
                                        styles.chatDetailNavbarBaseActionMoreItem,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            theme === lightMode
                                                ? commonStyles.lightTertiaryText
                                                : commonStyles.darkTertiaryText,
                                            styles.navbarActionMoreItemText,
                                        ]}
                                    >
                                        {t("chatDetailMoreMuteTitle")}
                                    </Text>
                                    <Image
                                        source={require("../../../assets/volume-mute-line-icon.png")}
                                        resizeMode="contain"
                                        style={{
                                            width: 17,
                                            height: 17,
                                        }}
                                        tintColor={
                                            theme === lightMode
                                                ? commonStyles
                                                      .lightSecondaryText.color
                                                : commonStyles.darkSecondaryText
                                                      .color
                                        }
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.chatDetailNavbarBaseActionMoreItem,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            theme === lightMode
                                                ? commonStyles.lightTertiaryText
                                                : commonStyles.darkTertiaryText,
                                            styles.navbarActionMoreItemText,
                                        ]}
                                    >
                                        {t("chatDetailMoreDeleteTitle")}
                                    </Text>
                                    <Image
                                        source={require("../../../assets/delete-bin-line-icon.png")}
                                        resizeMode="contain"
                                        style={{
                                            width: 17,
                                            height: 17,
                                        }}
                                        tintColor={
                                            theme === lightMode
                                                ? commonStyles
                                                      .lightSecondaryText.color
                                                : commonStyles.darkSecondaryText
                                                      .color
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    </OutsidePressHandler>
                </View>
            </View>
            {conversation.pinnedMessages &&
                conversation.pinnedMessages.length > 0 && (
                    <View
                        style={[
                            styles.pinnedMessageContainer,
                            {
                                backgroundColor:
                                    theme === lightMode
                                        ? commonStyles.lightFourBackground
                                              .backgroundColor
                                        : commonStyles.darkFourBackground
                                              .backgroundColor,
                            },
                        ]}
                    >
                        {showMore ? (
                            <View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: 10,
                                        paddingHorizontal: 15,
                                        paddingVertical: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: commonStyles.primaryColor
                                                .color,
                                        }}
                                    >
                                        {t("chatDetailMessagePin")}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowMore(!showMore);
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                color: commonStyles.primaryColor
                                                    .color,
                                            }}
                                        >
                                            {t("chatDetailMessagePinShowless")}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {conversation.pinnedMessages.map(
                                    (message, index) => {
                                        return (
                                            <View
                                                key={index}
                                                style={[
                                                    styles.pinnedMessagePreviewBox,
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
                                                <Image
                                                    source={require("../../../assets/icon-message-pin.png")}
                                                    style={[
                                                        styles.pinnedMessageIcon,
                                                    ]}
                                                />
                                                <View
                                                    style={[
                                                        styles.pinnedContentMessageBox,
                                                    ]}
                                                >
                                                    <Text numberOfLines={1}>
                                                        {
                                                            handleGetMessageContent(message)
                                                        }
                                                    </Text>
                                                    <Text numberOfLines={1}>
                                                        {`${t(
                                                            "chatDetailMessageTheMessageOf"
                                                        )} ${
                                                            message.sender.name
                                                        }`}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={[
                                                        styles.pinnedMessageOtherActionBox,
                                                    ]}
                                                >
                                                    <Tooltip
                                                        content={
                                                            <View
                                                                style={{
                                                                    backgroundColor:
                                                                        theme ===
                                                                        lightMode
                                                                            ? commonStyles
                                                                                  .lightFourBackground
                                                                                  .backgroundColor
                                                                            : commonStyles
                                                                                  .darkFourBackground
                                                                                  .backgroundColor,
                                                                    width: 150,
                                                                }}
                                                            >
                                                                <TouchableOpacity
                                                                    style={[
                                                                        styles.itemInMessageFromOpponentPopupAction,
                                                                    ]}
                                                                    onPress={() => {
                                                                        saveToClipboard(
                                                                            message
                                                                        );
                                                                        setIsShowPinAction(
                                                                            index
                                                                        );
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={[
                                                                            styles.itemInMessageFromOpponentPopupActionText,
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
                                                                        {t(
                                                                            "chatDetailMessageCopyAction"
                                                                        )}
                                                                    </Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                    style={[
                                                                        styles.itemInMessageFromOpponentPopupAction,
                                                                    ]}
                                                                    onPress={() =>
                                                                        handleUnpinMessage(
                                                                            message
                                                                        )
                                                                    }
                                                                >
                                                                    <Text
                                                                        style={[
                                                                            styles.itemInMessageFromOpponentPopupActionText,
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
                                                                        {t(
                                                                            "chatDetailMessageUnpinAction"
                                                                        )}
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        }
                                                        isVisible={
                                                            isShowPinAction ===
                                                            index
                                                        }
                                                        backgroundColor="transparent"
                                                        placement="bottom"
                                                        showChildInTooltip={
                                                            false
                                                        }
                                                        contentStyle={[
                                                            {
                                                                shadowColor:
                                                                    "#171717",
                                                                shadowOffset: {
                                                                    width: 0,
                                                                    height: 3,
                                                                },
                                                                shadowOpacity: 0.4,
                                                                shadowRadius: 2,
                                                                elevation: 3,
                                                                zIndex: 10,
                                                            },
                                                            theme === lightMode
                                                                ? commonStyles.lightFourBackground
                                                                : commonStyles.darkFourBackground,
                                                        ]}
                                                        onClose={() => {
                                                            setIsShowPinAction(
                                                                -1
                                                            );
                                                        }}
                                                        arrowSize={{
                                                            width: 0,
                                                            height: 0,
                                                        }}
                                                        arrowStyle={{
                                                            borderTopColor:
                                                                theme ===
                                                                lightMode
                                                                    ? commonStyles
                                                                          .lightFourBackground
                                                                          .backgroundColor
                                                                    : commonStyles
                                                                          .darkFourBackground
                                                                          .backgroundColor,
                                                        }}
                                                    >
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setIsShowPinAction(
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            <Image
                                                                source={require("../../../assets/more-line-icon.png")}
                                                                style={[
                                                                    styles.pinnedMessageMoreActionImg,
                                                                ]}
                                                                tintColor={
                                                                    theme ===
                                                                    lightMode
                                                                        ? commonStyles
                                                                              .lightSecondaryText
                                                                              .color
                                                                        : commonStyles
                                                                              .darkSecondaryText
                                                                              .color
                                                                }
                                                            />
                                                        </TouchableOpacity>
                                                    </Tooltip>
                                                </View>
                                            </View>
                                        );
                                    }
                                )}
                            </View>
                        ) : (
                            <View
                                style={[
                                    styles.pinnedMessagePreviewBox,
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
                                <Image
                                    source={require("../../../assets/icon-message-pin.png")}
                                    style={[styles.pinnedMessageIcon]}
                                />
                                <View style={[styles.pinnedContentMessageBox]}>
                                    <Text numberOfLines={1}>
                                        {
                                            handleGetMessageContent(
                                                conversation.pinnedMessages[0]
                                            )
                                        }
                                    </Text>
                                    <Text numberOfLines={1}>
                                        {`${t(
                                            "chatDetailMessageTheMessageOf"
                                        )} ${
                                            conversation.pinnedMessages[0]
                                                .sender.name
                                        }`}
                                    </Text>
                                </View>
                                <View
                                    style={[styles.pinnedMessageOtherActionBox]}
                                >
                                    <Tooltip
                                        content={
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        theme === lightMode
                                                            ? commonStyles
                                                                  .lightFourBackground
                                                                  .backgroundColor
                                                            : commonStyles
                                                                  .darkFourBackground
                                                                  .backgroundColor,
                                                    width: 150,
                                                }}
                                            >
                                                <TouchableOpacity
                                                    style={[
                                                        styles.itemInMessageFromOpponentPopupAction,
                                                    ]}
                                                    onPress={() => {
                                                        saveToClipboard(
                                                            conversation
                                                                .pinnedMessages[0]
                                                        );
                                                        setIsShowPinAction(0);
                                                    }}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.itemInMessageFromOpponentPopupActionText,
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
                                                        {t(
                                                            "chatDetailMessageCopyAction"
                                                        )}
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.itemInMessageFromOpponentPopupAction,
                                                    ]}
                                                    onPress={() =>
                                                        handleUnpinMessage(
                                                            conversation
                                                                .pinnedMessages[0]
                                                        )
                                                    }
                                                >
                                                    <Text
                                                        style={[
                                                            styles.itemInMessageFromOpponentPopupActionText,
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
                                                        {t(
                                                            "chatDetailMessageUnpinAction"
                                                        )}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                        isVisible={isShowPinAction == 0}
                                        backgroundColor="transparent"
                                        placement="bottom"
                                        showChildInTooltip={false}
                                        contentStyle={[
                                            {
                                                shadowColor: "#171717",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 3,
                                                },
                                                shadowOpacity: 0.4,
                                                shadowRadius: 2,
                                                elevation: 3,
                                                zIndex: 10,
                                            },
                                            theme === lightMode
                                                ? commonStyles.lightFourBackground
                                                : commonStyles.darkFourBackground,
                                        ]}
                                        onClose={() => {
                                            setIsShowPinAction(-1);
                                        }}
                                        arrowSize={{ width: 0, height: 0 }}
                                        arrowStyle={{
                                            borderTopColor:
                                                theme === lightMode
                                                    ? commonStyles
                                                          .lightFourBackground
                                                          .backgroundColor
                                                    : commonStyles
                                                          .darkFourBackground
                                                          .backgroundColor,
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                setIsShowPinAction(0);
                                            }}
                                        >
                                            <Image
                                                source={require("../../../assets/more-line-icon.png")}
                                                style={[
                                                    styles.pinnedMessageMoreActionImg,
                                                ]}
                                                tintColor={
                                                    theme === lightMode
                                                        ? commonStyles
                                                              .lightSecondaryText
                                                              .color
                                                        : commonStyles
                                                              .darkSecondaryText
                                                              .color
                                                }
                                            />
                                        </TouchableOpacity>
                                    </Tooltip>
                                    {conversation.pinnedMessages.length > 1 && (
                                        <TouchableOpacity
                                            style={[
                                                styles.pinnedMessageSeeMorePinMessageBtn,
                                            ]}
                                            onPress={() => {
                                                setShowMore(!showMore);
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    {
                                                        color: commonStyles
                                                            .primaryColor.color,
                                                    },
                                                ]}
                                            >
                                                {`${
                                                    conversation.pinnedMessages
                                                        .length - 1
                                                } ${t(
                                                    "chatDetailMoreActionPin"
                                                )}`}
                                            </Text>
                                            <Image
                                                source={require("../../../assets/arrow-down-s-line-icon.png")}
                                                style={{
                                                    width: 17,
                                                    height: 17,
                                                    tintColor:
                                                        commonStyles
                                                            .primaryColor.color,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        )}
                    </View>
                )}
        </View>
    );
}

export default memo(ChatDetailHeader);
