import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import { TouchableOpacity } from "react-native";
import { IConversation, IUserInConversation } from "../../configs/interfaces";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import Tooltip from "react-native-walkthrough-tooltip";
import OutsidePressHandler from "react-native-outside-press";
import { LINK_GROUP } from "@env";
import Spinner from "react-native-loading-spinner-overlay";

export default function ShowMembersInGroup({
    navigation,
    route,
}: {
    navigation: any;
    route: any;
}) {
    
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { t } = useTranslation();
    const userInfo = useSelector((state: IRootState) => state.userInfo);
    const socket = route.params.socket as Socket<
    DefaultEventsMap,
    DefaultEventsMap
>;
    const conversation = route.params.conversation as IConversation;
    const setConversation = route.params.setConversation as React.Dispatch<
        React.SetStateAction<IConversation>
    >;
    const [conversationLocal, setConversationLocal] = useState<IConversation | null>(null)
    const [userIdSelectedToShowAction, setUserIdSelectedToShowAction] =
        useState<string>("");
    const myRole = handleGetRoleInGroup(userInfo.user?._id || "");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
   

    useEffect(()=>{
        if (conversation){
            setConversationLocal(conversation)
        }
    }, [route.params])

    function handleGetRoleInGroup(userId: string) {
        if (conversationLocal?.admin === userId) {
            return t("showMemberInGroupAdmin");
        } else if (conversationLocal?.deputy.includes(userId)) {
            return t("showMemberInGroupDeputy");
        } else {
            return "";
        }
    }

    async function handleRemoveMember(user: IUserInConversation) {
        try {
            setIsLoading(true);
            const response = await fetch(`${LINK_GROUP}/${conversation._id}/users/${user._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })
            if (response.ok){
                console.log("Remove user from conversation successfully")
                const data = await response.json();
                socket.emit("removeUserFromConversation", {
                    conversationId: conversation._id,
                    userId: user._id,
                })
                setUserIdSelectedToShowAction("")
                setConversationLocal(data as IConversation)
                setConversation(data as IConversation)
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }
    async function handleGrantAdminRole(user: IUserInConversation){
        try {
            setIsLoading(true);
            const response = await fetch(`${LINK_GROUP}/${conversation._id}/users/${user._id}/role`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
                body: JSON.stringify({
                    role: "owner"
                })
            })

            if (response.ok){
                console.log("Grant admin role to user successfully")
                let data = await response.json();
                data = data as IConversation
                socket.emit("addOrUpdateConversation", {
                    conversation: data as IConversation,
                    userIds: data.users.map((item : IUserInConversation) => item._id)
                })
                setUserIdSelectedToShowAction("")
                setConversationLocal(data as IConversation)
                setConversation(data as IConversation)
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }
    async function handleGrantDeputyRole(user: IUserInConversation){
        try {
            setIsLoading(true);
            const response = await fetch(`${LINK_GROUP}/${conversation._id}/users/${user._id}/role`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
                body: JSON.stringify({
                    role: "admin"
                })
            })
            if (response.ok){
                console.log("Grant deputy role to user successfully")
                const data = await response.json();
                socket.emit("addOrUpdateConversation", {
                    conversation: data as IConversation,
                    userIds: data.users.map((item : IUserInConversation) => item._id)
                })
                setUserIdSelectedToShowAction("")
                setConversationLocal(data as IConversation)
                setConversation(data as IConversation)
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }
    async function handleRemoveDeputyRole(user: IUserInConversation){
        try {
            setIsLoading(true);
            const response = await fetch(`${LINK_GROUP}/${conversation._id}/users/${user._id}/role`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.accessToken}`,
                }
            })
            if (response.ok){
                console.log("Remove deputy role to user successfully")
                const data = await response.json();
                socket.emit('removeUserFromConversation', { conversationId: data._id, userId: user._id })
                socket.emit("addOrUpdateConversation", {
                    conversation: data as IConversation,
                    userIds: data.users.map((item : IUserInConversation) => item._id)
                })
                setUserIdSelectedToShowAction("")
                setConversationLocal(data as IConversation)
                setConversation(data as IConversation)
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }
    function handleShowMoreAction(user: IUserInConversation) {
        const userSelectedRole = handleGetRoleInGroup(user._id);
        const isSelectedMe = user._id === userInfo.user?._id;

        if (!myRole || isSelectedMe) {
            return <></>;
        } else if (myRole === t("showMemberInGroupAdmin")) {
            if (isSelectedMe) {
                return <></>;
            } else {
                const userIsGrantedDeputyRole = conversationLocal?.deputy.includes(user._id);
                return (
                    <Tooltip
                        arrowSize={{
                            width: 0,
                            height: 0,
                        }}
                        isVisible={userIdSelectedToShowAction === user._id}
                        showChildInTooltip={false}
                        onClose={() => {}}
                        placement="bottom"
                        backgroundColor="transparent"
                        contentStyle={{
                            shadowColor: "#171717",
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.4,
                            shadowRadius: 2,
                            elevation: 3,
                            zIndex: 200,
                        }}
                        content={
                            <OutsidePressHandler
                                onOutsidePress={() =>
                                    setUserIdSelectedToShowAction("")
                                }
                                style={{
                                    paddingHorizontal: 15,
                                    paddingVertical: 10,
                                    width: 200,
                                    height: 140,
                                    zIndex: 400,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => handleRemoveMember(user)}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            paddingVertical: 5,
                                        }}
                                    >
                                        {t("showMemberRemoveMember")}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={()=> handleGrantAdminRole(user)}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            paddingVertical: 5,
                                        }}
                                    >
                                        {t("showMemberGrantAdmin")}
                                    </Text>
                                </TouchableOpacity>
                                {
                                    userIsGrantedDeputyRole
                                    ?
                                    <TouchableOpacity
                                        onPress={()=> handleRemoveDeputyRole(user)}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                paddingVertical: 5,
                                            }}
                                        >
                                            {t("showMemberRemoveDeputy")}
                                        </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={()=> handleGrantDeputyRole(user)}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                paddingVertical: 5,
                                            }}
                                        >
                                            {t("showMemberGrantDeputy")}
                                        </Text>
                                    </TouchableOpacity>
                                }
                                
                            </OutsidePressHandler>
                        }
                    >
                        <TouchableOpacity
                            onPress={() =>
                                setUserIdSelectedToShowAction(user._id)
                            }
                        >
                            <Image
                                source={require("../../assets/more-vertical-line-icon.png")}
                            />
                        </TouchableOpacity>
                    </Tooltip>
                );
            }
        } else {
            const isSelectedAdminOrDeputy = userSelectedRole === t("showMemberInGroupAdmin") || userSelectedRole === t("showMemberInGroupDeputy");
            if (isSelectedMe || isSelectedAdminOrDeputy){
                return <></>;
            } else {
                return (
                    <Tooltip
                        arrowSize={{
                            width: 0,
                            height: 0,
                        }}
                        isVisible={userIdSelectedToShowAction === user._id}
                        showChildInTooltip={false}
                        onClose={() => {}}
                        placement="bottom"
                        backgroundColor="transparent"
                        contentStyle={{
                            shadowColor: "#171717",
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.4,
                            shadowRadius: 2,
                            elevation: 3,
                            zIndex: 200,
                        }}
                        content={
                            <OutsidePressHandler
                                onOutsidePress={() =>
                                    setUserIdSelectedToShowAction("")
                                }
                                style={{
                                    paddingHorizontal: 15,
                                    paddingVertical: 10,
                                    width: 200,
                                    height: 140,
                                    zIndex: 400,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => handleRemoveMember(user)}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            paddingVertical: 5,
                                        }}
                                    >
                                        {t("showMemberRemoveMember")}
                                    </Text>
                                </TouchableOpacity>      
                            </OutsidePressHandler>
                        }
                    >
                        <TouchableOpacity
                            onPress={() =>
                                setUserIdSelectedToShowAction(user._id)
                            }
                        >
                            <Image
                                source={require("../../assets/more-vertical-line-icon.png")}
                            />
                        </TouchableOpacity>
                    </Tooltip>
                );
            }
        }
    }

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
                }}
            >
                <Spinner
                    visible={isLoading}
                    textContent={t("loading")}
                    color="#fff"
                />
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
                        {t("showMemberInGroupTitle")}
                    </Text>
                </View>
                <View
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                    }}
                >
                    <Text
                        style={{
                            color: commonStyles.primaryColor.color,
                            fontWeight: "500",
                            fontSize: 16,
                            marginBottom: 15,
                        }}
                    >
                        {t("showMemberInGroupMemberNumber")}
                    </Text>

                    {conversationLocal?.users.map((user, index) => {
                        return (
                            <View key={index} style={[styles.showMembersItem]}>
                                <View
                                    style={[styles.showMembersAvatarContainer]}
                                >
                                    <Image
                                        source={{ uri: user.avatar }}
                                        style={[styles.showMembersAvatarImage]}
                                    />
                                    {handleGetRoleInGroup(user._id) ? (
                                        <View
                                            style={[
                                                styles.showMembersAvatarKeyContainer,
                                            ]}
                                        >
                                            <Image
                                                source={require("../../assets/key-2-line-icon.png")}
                                                style={[
                                                    styles.showMembersAvatarKeyImage,
                                                    {
                                                        tintColor:
                                                            handleGetRoleInGroup(
                                                                user._id
                                                            ) == t("showMemberInGroupAdmin")
                                                                ? "#f1c40f"
                                                                : "#3498db",
                                                    },
                                                ]}
                                            />
                                        </View>
                                    ) : (
                                        <></>
                                    )}
                                </View>
                                <View
                                    style={[
                                        {
                                            flexGrow: 1,
                                            flexShrink: 1,
                                        },
                                    ]}
                                >
                                    <Text style={[styles.showMembersItemName]}>
                                        {user._id === userInfo.user?._id
                                            ? t("showMemberInGroupYou")
                                            : user.name}
                                    </Text>
                                    <Text
                                        style={{
                                            color: commonStyles.primaryColor
                                                .color,
                                            fontSize: 14,
                                        }}
                                    >
                                        {handleGetRoleInGroup(user._id)}
                                    </Text>
                                </View>
                                <View style={[styles.showMembersActionBox]}>
                                    {/* <TouchableOpacity>
                                        <Image
                                            source={require("../../assets/user-add-line.png")}
                                        />
                                    </TouchableOpacity> */}
                                    {handleShowMoreAction(user)}
                                </View>
                            </View>
                        );
                    })}
                </View>
            </SafeAreaView>
        </View>
    );
}
