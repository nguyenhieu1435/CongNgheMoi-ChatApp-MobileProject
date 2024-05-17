import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TFunction } from "i18next";
import ReadMore from "@fawazahmed/react-native-read-more";
import {
    LINK_GET_ADD_FRIEND_ACCEPT,
    LINK_GET_ADD_FRIEND_REJECT,
    LINK_GET_MY_CONVERSATIONS,
    LINK_MESSAGE_NOTIFICATION,
    LINK_REQUEST_FRIEND_LIST,
    LINK_REQUEST_FRIEND_WAIT_RESPONSE,
    LINK_REVOCATION_REQUEST_FRIEND,
} from "@env";
import {
    IConversation,
    IMessageItem,
    IReceivedRequestFriendList,
    IRequestFriendList,
} from "../../configs/interfaces";
import {
    handleConvertDateStrToDateFormat,
} from "../../utils/date";
import { io, Socket } from "socket.io-client";
import Spinner from "react-native-loading-spinner-overlay";
import { socket } from "../../configs/socket-io";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { userInfoInterfaceI } from "../../redux_toolkit/slices/userInfo.slice";

interface AddFriendInvitationProps {
    navigation: any;
}
const TypeFilter = {
    RECEIVED: "RECEIVED",
    SENT: "SENT",
};
export default function AddFriendInvitation({
    navigation,
}: AddFriendInvitationProps) {
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { t } = useTranslation();
    const [typeFilterSelected, setTypeFilterSelected] = useState(
        TypeFilter.RECEIVED
    );
    const userInfo = useSelector((state: IRootState) => state.userInfo);

    useEffect(()=>{
        
    }, [])

    return (
        <View
            style={[
                styles.addFriendInvitationWrapper,
                theme === lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
            ]}
        >
            <StatusBar />
            <SafeAreaView style={[styles.addFriendInvitationContainer]}>
                <View
                    style={[
                        styles.addFriendInvitationHeader,
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
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Contacts", {
                            isBackChildLayout: true
                        })}
                        style={[styles.addFriendInvitationHeaderBackButton]}
                    >
                        <Image
                            source={require("../../assets/arrow-left-s-line-icon.png")}
                            style={[
                                styles.addFriendInvitationHeaderIconImage,
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
                            styles.addFriendInvitationHeaderTitle,
                            {
                                color:
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText.color
                                        : commonStyles.darkPrimaryText.color,
                            },
                        ]}
                    >
                        {t("searchDetailContactAddFriendInvitation")}
                    </Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("AddFriendInvitationSetting")
                        }
                        style={[styles.addFriendInvitationHeaderSettingButton]}
                    >
                        <Image
                            source={require("../../assets/settings-icon-bottom-tab.png")}
                            style={[
                                styles.addFriendInvitationHeaderIconImage,
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
                </View>
                <View
                    style={[
                        styles.addFriendInvitationChooseTypeBox,
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
                    <TouchableOpacity
                        onPress={() =>
                            setTypeFilterSelected(TypeFilter.RECEIVED)
                        }
                        style={[
                            styles.addFriendInvitationChooseTypeItem,
                            typeFilterSelected === TypeFilter.RECEIVED
                                ? styles.addFriendInvitationChooseTypeItemActive
                                : null,
                        ]}
                    >
                        <Text
                            style={[
                                styles.addFriendInvitationChooseTypeItemText,
                                {
                                    fontWeight:
                                        typeFilterSelected ===
                                        TypeFilter.RECEIVED
                                            ? "500"
                                            : "400",
                                },
                                theme === lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {`${t("addFriendInvitationReceivedTitle")}`}
                            
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setTypeFilterSelected(TypeFilter.SENT)}
                        style={[
                            styles.addFriendInvitationChooseTypeItem,
                            typeFilterSelected === TypeFilter.SENT
                                ? styles.addFriendInvitationChooseTypeItemActive
                                : null,
                        ]}
                    >
                        <Text
                            style={[
                                styles.addFriendInvitationChooseTypeItemText,
                                {
                                    fontWeight:
                                        typeFilterSelected === TypeFilter.SENT
                                            ? "500"
                                            : "400",
                                },
                                theme === lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {`${t("addFriendInvitationSentTitle")}`}
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {typeFilterSelected === TypeFilter.RECEIVED && (
                        <AddFriendInvitationReceivedList
                            theme={theme}
                            translation={t}
                            socket={socket}
                            userInfo={userInfo}
                           
                        />
                    )}
                    {typeFilterSelected === TypeFilter.SENT && (
                        <AddFriendInvitationSentList
                            theme={theme}
                            translation={t}
                            socket={socket}
                            userInfo={userInfo}
                           
                        />
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
interface AddFriendInvitationReceivedListProps {
    theme: string;
    translation: TFunction<"translation", undefined>;
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    userInfo: userInfoInterfaceI;
}

function AddFriendInvitationReceivedList({
    theme,
    translation: t,
    socket,
    userInfo,
}: AddFriendInvitationReceivedListProps) {
    const [requestReceived, setRequestReceived] = useState<
        IReceivedRequestFriendList[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchRequestReceived() {
        try {
            setIsLoading(true);
            const response = await fetch(LINK_REQUEST_FRIEND_WAIT_RESPONSE, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.accessToken,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setRequestReceived(data as IReceivedRequestFriendList[]);
            } else {
                setRequestReceived([]);
            }
        } catch (error) {
            console.log(error);
            setRequestReceived([]);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchRequestReceived();
    }, []);

    async function getConversationAfterAcceptFriend(friendId: string) {
        try {
            const conversationResponse = await fetch(LINK_GET_MY_CONVERSATIONS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.accessToken}`,
                },
                body: JSON.stringify({
                    receiverUserId: friendId
                })
            })
            if (conversationResponse.ok){
                const conversationData = await conversationResponse.json() as IConversation
                return conversationData._id
            } else {
                throw new Error("Error get conversation")
            }
        } catch (error) {
            console.log("error", error)
            throw new Error("Error get conversation")
        }
    }

    async function handleAcceptRequest(item: IReceivedRequestFriendList) {
        try {
            console.log("Accept friend link", LINK_GET_ADD_FRIEND_ACCEPT);
            const response = await fetch(LINK_GET_ADD_FRIEND_ACCEPT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + userInfo.accessToken
                },
                body: JSON.stringify({friendId: item.sender_id._id})
            })
            if (response.ok){
                console.log("Accept friend success", item.sender_id._id);
                const data = await response.json();
                console.log("Accept friend success", JSON.stringify(data));
                const conversationId = await getConversationAfterAcceptFriend(item.sender_id._id); 
                handleAddAcceptFriendNotification(conversationId);

                // socket.emit("acceptFriend", item.sender_id._id);
                setRequestReceived(requestReceived.filter((request) => request._id !== item._id));
            } else {
                console.log("Error status: " + response.status);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function handleAddAcceptFriendNotification(conversationId: string) {
        try {
            const resp =  await fetch(LINK_MESSAGE_NOTIFICATION, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + userInfo.accessToken
                },
                body: JSON.stringify({
                    conversationId: conversationId,
                    type: "ACCEPT_FRIEND"
                })
            })
            if (resp.ok){
                const data = await resp.json() as IMessageItem;
                socket.emit("sendMessage", data)
                console.log("Send add friend notification success")
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function handleDeclineRequest(item: IReceivedRequestFriendList) {
        try {
            const response = await fetch(LINK_GET_ADD_FRIEND_REJECT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + userInfo.accessToken
                },
                body: JSON.stringify({friendId: item.sender_id._id})
            })
            if (response.ok){

                setRequestReceived(requestReceived.filter((request) => request._id !== item._id));
            } else {
                console.log("Error status: " + response.status);
            }
        } catch (error) {
            
        }
    }

    function renderSectionItem({
        item,
        index,
    }: {
        item: IReceivedRequestFriendList;
        index: number;
    }) {
        return (
            <>
                <View
                    key={index}
                    style={[styles.addFriendInvitationReceivedItemSection]}
                >
                    <Image
                        source={{
                            uri: item.sender_id.avatar,
                        }}
                        style={[styles.addFriendInvitationAvatarImage]}
                    />
                    <View
                        style={[
                            styles.addFriendInvitationReceivedItemMainContent,
                        ]}
                    >
                        <Text
                            style={[
                                styles.addFriendInvitationReceivedItemRealName,
                                theme === lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {item.sender_id.name}
                        </Text>
                        <Text
                            style={[
                                styles.addFriendInvitationReceivedItemAddDate,
                                theme === lightMode
                                    ? commonStyles.lightTertiaryText
                                    : commonStyles.darkTertiaryText,
                            ]}
                        >
                            {handleConvertDateStrToDateFormat(item.createdAt)}
                        </Text>
                        <View
                            style={[
                                styles.addFriendInvitationReceivedItemMessageBox,
                                {
                                    borderColor:
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color,
                                },
                            ]}
                        >
                            <ReadMore
                                numberOfLines={2}
                                seeMoreText={t("addFriendInvitationSeeMore")}
                                seeLessText={t("addFriendInvitationSeeLess")}
                                style={[
                                    styles.addFriendInvitationReceivedMessage,
                                    theme === lightMode
                                        ? commonStyles.lightSecondaryText
                                        : commonStyles.darkSecondaryText,
                                ]}
                                seeMoreStyle={{
                                    fontWeight: "500",
                                    color:
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color,
                                }}
                                seeLessStyle={{
                                    fontWeight: "500",
                                    color:
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color,
                                }}
                            >
                                {item.message}
                            </ReadMore>
                        </View>
                        <View
                            style={[
                                styles.addFriendInvitationReceivedItemActionBox,
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => handleDeclineRequest(item)}
                                style={[
                                    styles.addFriendInvitationReceivedItemActionItem,
                                    {
                                        backgroundColor:
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
                                <Text
                                    style={[
                                        styles.addFriendInvitationReceivedItemActionItemText,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    {t("addFriendInvitationDecline")}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=> handleAcceptRequest(item)}
                                style={[
                                    styles.addFriendInvitationReceivedItemActionItem,
                                    commonStyles.primaryColorBackground,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.addFriendInvitationReceivedItemActionItemText,
                                        commonStyles.primaryColor,
                                    ]}
                                >
                                    {t("addFriendInvitationAccept")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View
                    style={[
                        styles.addFriendInvitationReceivedBreakLine,
                        {
                            backgroundColor:
                                theme === lightMode
                                    ? commonStyles.lightTertiaryBackground
                                          .backgroundColor
                                    : commonStyles.darkTertiaryBackground
                                          .backgroundColor,
                        },
                    ]}
                ></View>
            </>
        );
    }

    return (
        <View>
            <Spinner
                visible={isLoading}
                textContent={t("loading")}
                textStyle={{ color: "#FFF" }}
            />
            {requestReceived && requestReceived.length > 0 ? (
                <View style={[]}>
                    <View
                        style={[styles.addFriendInvitationReceivedListSection]}
                    >
                        {requestReceived.map((item, index) =>
                            renderSectionItem({ item, index })
                        )}
                    </View>

                    {/* <View
                            style={[
                                styles.addFriendInvitationReceivedMayBeYouKnowBox
                            ]}
                        >
                            <Text
                                style={[
                                    styles.addFriendInvitationReceivedMayBeYouKnowTitle,
                                    {
                                        color:
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText.color
                                        :
                                        commonStyles.darkPrimaryText.color
                                    }
                                ]}
                            >{t("addFriendInvitationMayBeYouKnow")}</Text>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    marginTop: 15,
                                   
                                }}
                                contentContainerStyle={{
                                    gap: 12
                                }}
                            >
                                <View
                                    style={[
                                        styles.addFriendInvitationReceivedMayBeYouKnowItem,
                                        {
                                            borderColor:
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText.color
                                            :
                                            commonStyles.darkSecondaryText.color
                                        }
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButton
                                        ]}
                                    >
                                        <Image
                                            source={require("../../assets/close-line-icon.png")}
                                            style={[
                                                styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButtonIcon,
                                                {
                                                    tintColor:
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText.color
                                                    :
                                                    commonStyles.darkSecondaryText.color
                                                }
                                            ]}
                                        />
                                    </TouchableOpacity>
                                    <Image
                                        source={{uri: "https://www.w3schools.com/w3images/avatar2.png"}}
                                        style={[
                                            styles.addFriendInvitationAvatarImage,
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            styles.addFriendInvitationReceivedMayBeKnownItemRealName,
                                            {
                                                color:
                                                theme === lightMode
                                                ?
                                                commonStyles.lightPrimaryText.color
                                                :
                                                commonStyles.darkPrimaryText.color
                                            }
                                        ]}
                                    >John Doe</Text>
                                    <TouchableOpacity
                                        style={[
                                            styles.addFriendInvitationReceivedMayBeYouKnowItemAddButton,
                                            commonStyles.primaryColorBackground
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                commonStyles.primaryColor,
                                                styles.addFriendInvitationReceivedMayBeYouKnowItemText
                                            ]}
                                        >{t("addFriendInvitationAdd")}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={[
                                        styles.addFriendInvitationReceivedMayBeYouKnowItem,
                                        {
                                            borderColor:
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText.color
                                            :
                                            commonStyles.darkSecondaryText.color
                                        }
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButton
                                        ]}
                                    >
                                        <Image
                                            source={require("../../assets/close-line-icon.png")}
                                            style={[
                                                styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButtonIcon,
                                                {
                                                    tintColor:
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText.color
                                                    :
                                                    commonStyles.darkSecondaryText.color
                                                }
                                            ]}
                                        />
                                    </TouchableOpacity>
                                    <Image
                                        source={{uri: "https://www.w3schools.com/w3images/avatar2.png"}}
                                        style={[
                                            styles.addFriendInvitationAvatarImage,
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            styles.addFriendInvitationReceivedMayBeKnownItemRealName,
                                            {
                                                color:
                                                theme === lightMode
                                                ?
                                                commonStyles.lightPrimaryText.color
                                                :
                                                commonStyles.darkPrimaryText.color
                                            }
                                        ]}
                                    >John Doe</Text>
                                    <TouchableOpacity
                                        style={[
                                            styles.addFriendInvitationReceivedMayBeYouKnowItemAddButton,
                                            commonStyles.primaryColorBackground
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                commonStyles.primaryColor,
                                                styles.addFriendInvitationReceivedMayBeYouKnowItemText
                                            ]}
                                        >{t("addFriendInvitationAdd")}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={[
                                        styles.addFriendInvitationReceivedMayBeYouKnowItem,
                                        {
                                            borderColor:
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText.color
                                            :
                                            commonStyles.darkSecondaryText.color
                                        }
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButton
                                        ]}
                                    >
                                        <Image
                                            source={require("../../assets/close-line-icon.png")}
                                            style={[
                                                styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButtonIcon,
                                                {
                                                    tintColor:
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText.color
                                                    :
                                                    commonStyles.darkSecondaryText.color
                                                }
                                            ]}
                                        />
                                    </TouchableOpacity>
                                    <Image
                                        source={{uri: "https://www.w3schools.com/w3images/avatar2.png"}}
                                        style={[
                                            styles.addFriendInvitationAvatarImage,
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            styles.addFriendInvitationReceivedMayBeKnownItemRealName,
                                            {
                                                color:
                                                theme === lightMode
                                                ?
                                                commonStyles.lightPrimaryText.color
                                                :
                                                commonStyles.darkPrimaryText.color
                                            }
                                        ]}
                                    >John Doe</Text>
                                    <TouchableOpacity
                                        style={[
                                            styles.addFriendInvitationReceivedMayBeYouKnowItemAddButton,
                                            commonStyles.primaryColorBackground
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                commonStyles.primaryColor,
                                                styles.addFriendInvitationReceivedMayBeYouKnowItemText
                                            ]}
                                        >{t("addFriendInvitationAdd")}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={[
                                        styles.addFriendInvitationReceivedMayBeYouKnowItem,
                                        {
                                            borderColor:
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText.color
                                            :
                                            commonStyles.darkSecondaryText.color
                                        }
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButton
                                        ]}
                                    >
                                        <Image
                                            source={require("../../assets/close-line-icon.png")}
                                            style={[
                                                styles.addFriendInvitationReceivedMayBeYouKnowItemCloseButtonIcon,
                                                {
                                                    tintColor:
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText.color
                                                    :
                                                    commonStyles.darkSecondaryText.color
                                                }
                                            ]}
                                        />
                                    </TouchableOpacity>
                                    <Image
                                        source={{uri: "https://www.w3schools.com/w3images/avatar2.png"}}
                                        style={[
                                            styles.addFriendInvitationAvatarImage,
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            styles.addFriendInvitationReceivedMayBeKnownItemRealName,
                                            {
                                                color:
                                                theme === lightMode
                                                ?
                                                commonStyles.lightPrimaryText.color
                                                :
                                                commonStyles.darkPrimaryText.color
                                            }
                                        ]}
                                    >John Doe</Text>
                                    <TouchableOpacity
                                        style={[
                                            styles.addFriendInvitationReceivedMayBeYouKnowItemAddButton,
                                            commonStyles.primaryColorBackground
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                commonStyles.primaryColor,
                                                styles.addFriendInvitationReceivedMayBeYouKnowItemText
                                            ]}
                                        >{t("addFriendInvitationAdd")}</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View> */}
                </View>
            ) : (
                <View style={[styles.addFriendInvitationEmptyList]}>
                    <Image
                        source={require("../../assets/addInvitationEmptyListImage.png")}
                        style={[styles.addFriendInvitationEmptyListImage]}
                    />
                    <Text
                        style={[
                            styles.addFriendInvitationEmptyListText,
                            theme === lightMode
                                ? commonStyles.lightSecondaryText
                                : commonStyles.darkSecondaryText,
                        ]}
                    >
                        {t("addFriendInvitationReceivedEmpty")}
                    </Text>
                </View>
            )}
        </View>
    );
}

interface AddFriendInvitationSentListProps {
    theme: string;
    translation: TFunction<"translation", undefined>;
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    userInfo: userInfoInterfaceI;
}
function AddFriendInvitationSentList({
    theme,
    translation: t,
    socket,
    userInfo,
}: AddFriendInvitationSentListProps) {
    const [requestSent, setRequestSent] = useState<IRequestFriendList[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchRequestSent() {
        try {
            setIsLoading(true);
            const response = await fetch(LINK_REQUEST_FRIEND_LIST, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.accessToken,
                },
            });
            if (response.ok) {
                const data = await response.json()
                setRequestSent(data as IRequestFriendList[]);
            } else {
                setRequestSent([]);
            }
        } catch (error) {
            console.log(error);
            setRequestSent([]);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchRequestSent();
    }, []);

    async function handleUndoRequest(item: IRequestFriendList) {
        try {
            const response = await fetch(LINK_REVOCATION_REQUEST_FRIEND, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + userInfo.accessToken,
                },
                body: JSON.stringify({
                    friendId: item.receiver_id._id,
                }),
            });
            if (response.ok) {
                fetchRequestSent();
            }
        } catch (error) {
            console.log(error);
        }
    }

    function renderFlatItem({
        item,
        index,
    }: {
        item: IRequestFriendList;
        index: number;
    }) {
        return (
            <>
                <View
                    key={index}
                    style={[styles.addFriendInvitationSentFlatItem]}
                >
                    <Image
                        source={{ uri: item.receiver_id.avatar }}
                        style={[styles.addFriendInvitationAvatarImage]}
                    />
                    <View
                        style={[styles.addFriendInvitationSentItemMainContent]}
                    >
                        <Text
                            style={[
                                styles.addFriendInvitationReceivedItemRealName,
                                theme === lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {item.receiver_id.name}
                        </Text>
                        <Text
                            style={[
                                styles.addFriendInvitationReceivedItemAddDate,
                                theme === lightMode
                                    ? commonStyles.lightTertiaryText
                                    : commonStyles.darkTertiaryText,
                            ]}
                        >
                            {handleConvertDateStrToDateFormat(item.createdAt)}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleUndoRequest(item)}
                        style={[
                            styles.addFriendInvitationSentItemActionUndoButton,
                            {
                                backgroundColor:
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
                        <Text
                            style={[
                                styles.addFriendInvitationSentItemActionUndoButtonText,
                                {
                                    color:
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                                  .color
                                            : commonStyles.darkPrimaryText
                                                  .color,
                                },
                            ]}
                        >
                            {t("addFriendInvitationSentUndo")}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={[
                        styles.addFriendInvitationReceivedBreakLine,
                        {
                            backgroundColor:
                                theme === lightMode
                                    ? commonStyles.lightTertiaryBackground
                                          .backgroundColor
                                    : commonStyles.darkTertiaryBackground
                                          .backgroundColor,
                        },
                    ]}
                ></View>
            </>
        );
    }

    return (
        <View>
            <Spinner
                visible={isLoading}
                textContent={t("loading")}
                textStyle={{ color: "#FFF" }}
            />
            {requestSent && requestSent.length > 0 ? (
                <View>
                    {requestSent.map((item, index) =>
                        renderFlatItem({ item, index })
                    )}
                </View>
            ) : (
                <View style={[styles.addFriendInvitationEmptyList]}>
                    <Image
                        source={require("../../assets/addInvitationEmptyListImage.png")}
                        style={[styles.addFriendInvitationEmptyListImage]}
                    />
                    <Text
                        style={[
                            styles.addFriendInvitationEmptyListText,
                            theme === lightMode
                                ? commonStyles.lightSecondaryText
                                : commonStyles.darkSecondaryText,
                        ]}
                    >
                        {t("addFriendInvitationSentEmpty")}
                    </Text>
                </View>
            )}
        </View>
    );
}
