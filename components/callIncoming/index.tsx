import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import commonStyles from "../../CommonStyles/commonStyles";
import { ISenderInCallComing, IUserInConversation } from "../../configs/interfaces";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

interface CallIncomingProps {
    navigation: any,
    route: any,
}

export default function CallIncoming({ navigation, route }: CallIncomingProps) {
    const sender = route.params.sender as ISenderInCallComing;
    const users = route.params.users as IUserInConversation[];
    const type = route.params.type as string;
    const _id = route.params._id as string;
    const conversationName = route.params.conversationName as string;
    const userInfo = useSelector((state: IRootState) => state.userInfo)
    const {t} = useTranslation();
    const socket = useSelector((state: IRootState) => state.socketIo.socket);

    function handleAcceptCall(){
        socket.emit("acceptCall", {
            receiver: userInfo.user,
            _id: _id,
        })
        
        
        if (type === "video"){
            navigation.navigate("VideoCall", {
                conversationId: _id,
                isGroup: isGroup(),
                conversationName: conversationName,
                users: users,
                callInComing: true
            })
        } else {
            navigation.navigate("AudioCall", {
                conversationId: _id,
                isGroup: isGroup(),
                conversationName: conversationName,
                users: users,
                callInComing: true
            })
        }
    }
    function handleRejectCall(){
        socket.emit("rejectCall", {
            sender: userInfo.user,
            _id: _id
        })
        navigation.goBack();
    }

    function isGroup(){
        return !users.some(user => user.name === conversationName) 
    }

    useEffect(()=>{
        socket.on("missedCall", onMissedCall);
        return () => {
            socket.off("missedCall", onMissedCall)
        }
    }, [])
    
    function onMissedCall({missedUserIds, _id, conversationName }: {
        missedUserIds: string[],
        _id: string,
        conversationName: string
    }){
        navigation.goBack();
    }

    return (
        <View
            style={{
                flex: 1
            }}
        >
            <StatusBar/>
            <SafeAreaView
                style={{
                    flex: 1,
                    position: "relative"
                }}
            >
                <Image
                    source={require("../../assets/callIncomingBg.jpg")}
                    style={[
                        styles.imageBackground
                    ]}
                    blurRadius={10}
                />

                <View
                    style={[
                        styles.callIncomingHeader
                    ]}
                >
                    <Image
                        source={{uri: sender.avatar}}
                        style={[
                            styles.callIncomingAvatarImg
                        ]}
                    />
                    <Text
                        style={[
                            styles.callIncomingTitle,
                            commonStyles.darkPrimaryText
                        ]}
                    >
                        {t("incomingCall")}
                    </Text>
                    <Text
                        style={[
                            styles.callIncomingUsername,
                            commonStyles.darkPrimaryText
                        ]}
                    >
                        {
                            !isGroup()
                            ? `${sender.name}` 
                            : `${sender.name} từ ${t("searchDetailGroupTitle")}: ${conversationName}`
                        }
                    </Text>
                </View>
                <View
                    style={[
                        styles.callIncomingFooter
                    ]}
                >
                    <TouchableOpacity
                        onPress={handleRejectCall}
                        style={[
                            styles.callIncomingActionBtn,
                            styles.callIncomingBtnReject
                        ]}
                    >
                        <Image
                            source={require("../../assets/call_reject.png")}
                            style={[
                                styles.callIncomingActionBtnImg,
                                {
                                    tintColor: commonStyles.darkPrimaryText.color
                                }
                            ]}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleAcceptCall}
                        style={[
                            styles.callIncomingActionBtn,
                            styles.callIncomingBtnAccept
                        ]}
                    >
                        <Image
                            source={require("../../assets/call_enablepng.png")}
                            style={[
                                styles.callIncomingActionBtnImg,
                                {
                                    tintColor: commonStyles.darkPrimaryText.color
                                }
                            ]}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
