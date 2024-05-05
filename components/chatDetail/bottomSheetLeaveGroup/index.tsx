import {
    View,
    Text,
    Image,
    TextInput,
    Touchable,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
    IConversation,
    IMessageItem,
    IUserInConversation,
} from "../../../configs/interfaces";
import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { CustomRadioButton } from "../../register/stepFourRegister";
import { userInfoInterfaceI } from "../../../redux_toolkit/slices/userInfo.slice";
import { LINK_GROUP, LINK_MESSAGE_NOTIFICATION } from "@env";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";
import { getAccurancyDateVN } from "../../../utils/date";

interface BottomSheetLeaveGroupProps {
    conversation: IConversation;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: userInfoInterfaceI;
    navigation: any;
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    setMessageHistory: React.Dispatch<React.SetStateAction<IMessageItem[]>>;
}

export default function BottomSheetLeaveGroup({
    conversation,
    visible,
    setVisible,
    currentUser,
    navigation,
    socket,
    setMessageHistory
}: BottomSheetLeaveGroupProps) {
    const bottomSheetYieldRoleRef = useRef<BottomSheet>(null);
    const { t } = useTranslation();
    const [heightScrollView, setHeightScrollView] = useState<null | number>(
        300
    );
    const [userSelectedForAdminRole, setUserSelectedForAdminRole] =
        useState<IUserInConversation | null>(null);
    const bottomLeaveGroupRef = useRef<BottomSheet>(null);
    const [leavingInSilent, setLeavingInSilent] = useState<boolean>(false);
    const [userLeavingIsAdmin, setUserLeavingIsAdmin] = useState<boolean>(
        currentUser.user?._id == conversation.admin
    );
    const [showLeaveGroup, setShowLeaveGroup] = useState<boolean>(
        (currentUser.user?._id == conversation.admin) ? false : true
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [textSearch, setTextSearch] = useState<string>("")
    const messageIdRef = useRef<string>("")

    async function handleGrantAdminRole(user: IUserInConversation){
        try {
          
            const response = await fetch(`${LINK_GROUP}/${conversation._id}/users/${user._id}/role`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${currentUser.accessToken}`,
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
                handleCreateGrantAdminRoleNotification({
                    conversationId: conversation._id,
                    userIds: [user._id]
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleCreateGrantAdminRoleNotification({
        conversationId,
        userIds
    } : {conversationId: string, userIds: string[]}) {
        try {
            const resp = await fetch(LINK_MESSAGE_NOTIFICATION, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${currentUser.accessToken}`,
                },
                body: JSON.stringify({
                    conversationId: conversationId,
                    type: "CHANGE_OWNER",
                    userIds: userIds
                })
            })
            if (resp.ok){
                const data = await resp.json() as IMessageItem
                socket.emit("sendMessage", data);
                if (messageIdRef.current !== data._id){
                    setMessageHistory((prev) => [...prev, {
                        ...data,
                        createdAt: getAccurancyDateVN(data.createdAt),
                        updatedAt: getAccurancyDateVN(data.updatedAt),
                    }]);
                    messageIdRef.current = data._id
                }
                console.log("Create grant admin role notification successfully")
            }
        } catch (error) {
            console.log("Error create grant admin role notification: ", error);
        }
    }

    async function createLeaveGroupNotification({conversationId, type} : {
        conversationId: string, type: string
    }){
        try {
            const resp = await fetch(LINK_MESSAGE_NOTIFICATION, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${currentUser.accessToken}`,
                },
                body: JSON.stringify({
                    conversationId: conversationId,
                    type: type
                })
            })
            if (resp.ok){
                const data = await resp.json() as IMessageItem
                socket.emit("sendMessage", data);
                if (messageIdRef.current !== data._id){
                    setMessageHistory((prev) => [...prev, {
                        ...data,
                        createdAt: getAccurancyDateVN(data.createdAt),
                        updatedAt: getAccurancyDateVN(data.updatedAt),
                    }]);
                    messageIdRef.current = data._id
                }
                console.log("Create leave group notification successfully")
            }
        } catch (error) {
            console.log("Error create leave group notification: ", error);
        }
    }

    async function handleLeavingGroup(){
        try {
            setIsLoading(true)
            if (userLeavingIsAdmin && userSelectedForAdminRole){
                handleGrantAdminRole(userSelectedForAdminRole)

            } 
            const response = await fetch(LINK_GROUP+`/${conversation._id}/users/leave`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.accessToken}`
                }
            })
            if (response.ok){
                createLeaveGroupNotification({
                    conversationId: conversation._id,
                    type: "LEAVE_GROUP"
                })
                setVisible(false)
                setIsLoading(false)
                navigation.navigate("ChatList")
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)

    }

    function handleFilterUserByName(){
        return conversation.users.filter((user) => user.name.toLowerCase().includes(textSearch.toLowerCase()))
    }

    return !showLeaveGroup ? (
        <BottomSheet
            ref={bottomSheetYieldRoleRef}
            onChange={(index) => {
                if (index == 0) {
                    setHeightScrollView(300);
                } else {
                    setHeightScrollView(null);
                }
            }}
            snapPoints={[540, "100%"]}
            containerStyle={{ zIndex: 200, backgroundColor: "rgba(0,0,0,0.3)" }}
        >
            <BottomSheetView style={[styles.contentContainer]}>
                <Text style={[styles.chooseAdminBeforeLeaveGroupTitle]}>
                    {t("chatDetailBottomSheetYieldRoleTitle")}
                </Text>

                <View style={[styles.searchUserContainer]}>
                    <Image
                        source={require("../../../assets/search-line-icon.png")}
                        style={[styles.searchUserIcon]}
                    />
                    <TextInput
                        placeholder={t("registerPhoneInputSearchPlaceholder")}
                        style={[styles.searchUserTextInput]}
                        onChangeText={(text) => setTextSearch(text)}
                    />
                </View>
                <ScrollView
                    contentContainerStyle={{
                        marginTop: 15,
                    }}
                    style={{
                        height: heightScrollView,
                        maxHeight: heightScrollView,
                    }}
                >
                    {
                        textSearch.trim() 
                        ?
                        handleFilterUserByName().map((user, index) => {
                                return (
                                    <View
                                        style={[styles.userInListItem]}
                                        key={index}
                                    >
                                        <Image
                                            source={{
                                                uri: user.avatar,
                                            }}
                                            style={[styles.userInListItemAvatar]}
                                        />
                                        <Text style={[styles.userInListItemName]}>
                                            {user.name}
                                        </Text>
                                        <CustomRadioButton
                                            onPress={() => {
                                                setUserSelectedForAdminRole(user);
                                            }}
                                            selected={
                                                userSelectedForAdminRole?._id ==
                                                user._id
                                            }
                                            value={user._id}
                                        />
                                    </View>
                                );
                            })
                        :
                        conversation.users &&
                            conversation.users.map((user, index) => {
                                return (
                                    <View
                                        style={[styles.userInListItem]}
                                        key={index}
                                    >
                                        <Image
                                            source={{
                                                uri: user.avatar,
                                            }}
                                            style={[styles.userInListItemAvatar]}
                                        />
                                        <Text style={[styles.userInListItemName]}>
                                            {user.name}
                                        </Text>
                                        <CustomRadioButton
                                            onPress={() => {
                                                setUserSelectedForAdminRole(user);
                                            }}
                                            selected={
                                                userSelectedForAdminRole?._id ==
                                                user._id
                                            }
                                            value={user._id}
                                        />
                                    </View>
                                );
                            })
                    }
                </ScrollView>
                <View style={[styles.groupBtnControlContainer]}>
                    <TouchableOpacity style={[styles.chooseAndContinueBtn]}
                        disabled={userSelectedForAdminRole == null}
                        onPress={()=> setShowLeaveGroup(true)}
                    >
                        <Text style={[styles.chooseAndContinueBtnText]}>
                            {t(
                                "chatDetailBottomSheetYieldRoleChooseAndNextTitle"
                            )}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.chooseCancelBtn]}
                        onPress={()=> setVisible(false)}
                    >
                        <Text style={[styles.chooseCancelBtnText]}>
                            {t("cancel")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheet>
    ) : (
        <BottomSheet
            ref={bottomLeaveGroupRef}
            onChange={(index) => {}}
            snapPoints={[350, "100%"]}
            containerStyle={{ zIndex: 200, backgroundColor: "rgba(0,0,0,0.3)" }}
        >
            <BottomSheetView style={[styles.contentContainer]}>
                <View style={[styles.contentContainerHeader]}>
                    {
                        userLeavingIsAdmin &&
                        <TouchableOpacity style={[styles.backToPreviousStepBtn]}
                            onPress={()=> setShowLeaveGroup(false)}
                        >
                            <Image
                                source={require("../../../assets/arrow-left-s-line-icon.png")}
                                style={[styles.backToPreviousStepIcon]}
                            />
                        </TouchableOpacity>
                    }
                    <Text style={[styles.chooseAdminBeforeLeaveGroupTitle]}>
                        {t("chatDetailBottomSheetLeavingGroupTitle")}
                    </Text>
                </View>
                <View style={{ marginVertical: 25 }}>
                    <View style={[styles.leavingGroupInSlientContainer]}>
                        <Text style={[styles.leavingGroupInSlientTitle]}>
                            {t("chatDetailBottomSheetLeavingInSilent")}
                        </Text>
                        <CustomRadioButton
                            selected={leavingInSilent}
                            onPress={() => {
                                setLeavingInSilent(!leavingInSilent);
                            }}
                            value={leavingInSilent}
                        />
                    </View>
                </View>

                <View>
                    <TouchableOpacity style={[styles.leavingGroupBtn]}
                        onPress={handleLeavingGroup}
                        disabled={isLoading}
                    >
                        {
                            isLoading
                            ?
                            <ActivityIndicator
                                style={{paddingVertical: 10}}
                                color="white"
                                size="small"
                            />
                            :
                            <Text style={[styles.leavingGroupBtnText]}>
                                {t("chatDetailLeaveGroup")}
                            </Text>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.chooseCancelBtn]}
                        onPress={()=> setVisible(false)}
                    >
                        <Text style={[styles.chooseCancelBtnText]}>
                            {t("cancel")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheet>
    );
}
