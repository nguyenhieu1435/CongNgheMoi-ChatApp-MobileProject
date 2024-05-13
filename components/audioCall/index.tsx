import React, { useRef, useState, useEffect } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { PermissionsAndroid, Platform } from "react-native";
import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    ChannelProfileType,
} from "react-native-agora";
import { styles } from "./styles";

import { AGORA_APP_ID } from "@env";
import { useTranslation } from "react-i18next";
import commonStyles from "../../CommonStyles/commonStyles";
import { IConversation } from "../../configs/interfaces";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import CreateGroupAvatarWhenAvatarIsEmpty from "../../utils/createGroupAvatarWhenAvatarIsEmpty";

const appId = AGORA_APP_ID;
const token = "";
const uid = 0;

interface AudioCallProps {
    navigation: any;
    route: any;
}

export default function AudioCall({ navigation, route }: AudioCallProps) {
    const conversation = route.params.conversation as IConversation;
    const channelName = conversation._id;
    const userInfo = useSelector((state: IRootState) => state.userInfo);
    const opponentUser = conversation.users.find(
        (user) => user._id !== userInfo.user?._id
    );
    const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
    const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
    const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
    const [message, setMessage] = useState(""); // Message to the user
    const { t } = useTranslation();
    const [micOn, setMicOn] = useState(true);
    const [speakerOn, setSpeakerOn] = useState(true);
    const [waitingLayout, setWaitingLayout] = useState(true);
    const refInterval = useRef<NodeJS.Timeout | null>(null);
    const [seconds, setSeconds] = useState(0);
    const [quantityOfUsersInCall, setQuantityOfUsersInCall] = useState(1);
    const wasQuantityGreaterThanEqualTwo = useRef(false);

    function showMessage(msg: string) {
        setMessage(msg);
    }

    const getPermission = async () => {
        if (Platform.OS === "android") {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);
        }
    };

    const join = async () => {
        if (isJoined) {
            return;
        }
        try {
            agoraEngineRef.current?.setChannelProfile(
                ChannelProfileType.ChannelProfileCommunication
            );
            agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            });
        } catch (e) {
            console.log(e);
        }
    };

    const leave = () => {
        try {
            agoraEngineRef.current?.leaveChannel();
            setRemoteUid(0);
            setIsJoined(false);
            showMessage("You left the channel");
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        // Initialize Agora engine when the app starts
        async function start(){
            await setupVoiceSDKEngine();
            await join();
        }
        start()
    }, [route.params]);

    const setupVoiceSDKEngine = async () => {
        try {
            // use the helper function to get permissions
            if (Platform.OS === "android") {
                await getPermission();
            }
            agoraEngineRef.current = createAgoraRtcEngine();
            const agoraEngine = agoraEngineRef.current;
            agoraEngine.registerEventHandler({
                onJoinChannelSuccess: () => {
                    showMessage(
                        "Successfully joined the channel " + channelName
                    );
                    setIsJoined(true);

                },
                onUserJoined: (_connection, Uid) => {
                    showMessage("Remote user joined with uid " + Uid);
                    setRemoteUid(Uid);
                    if (quantityOfUsersInCall + 1 >= 2) {
                        wasQuantityGreaterThanEqualTwo.current = true;
                    }
                    setQuantityOfUsersInCall((prev) => prev + 1);
                    setWaitingLayout(false);
                    if (!refInterval.current) {
                        refInterval.current = setInterval(() => {
                            setSeconds((prev) => prev + 1);
                        }, 1000);
                    }

                },
                onUserOffline: (_connection, Uid) => {
                    showMessage("Remote user left the channel. uid: " + Uid);
                    setRemoteUid(0);
                    setWaitingLayout(true);
                    clearInterval(refInterval.current!);
                    setSeconds(0);
                    setQuantityOfUsersInCall((prev) => prev - 1);
                },
            });
            agoraEngine.initialize({
                appId: appId,
            });
        } catch (e) {
            console.log(e);
        }
    };
    
    useEffect(()=>{
        if (wasQuantityGreaterThanEqualTwo.current && quantityOfUsersInCall < 2 && !conversation.isGroup) {
            handleEndCall();
        }
    }, [quantityOfUsersInCall])

    // console.log("showMessage: ", JSON.stringify(message));

    function handleToggleMic() {
        agoraEngineRef.current?.enableLocalAudio(!micOn);
        setMicOn(!micOn);
    }

    function handleToggleSpeaker() {
        agoraEngineRef.current?.setEnableSpeakerphone(!speakerOn);
        setSpeakerOn(!speakerOn);
    }

    function handleEndCall() {
        leave();
        refInterval.current && clearInterval(refInterval.current);
        refInterval.current = null;
        setQuantityOfUsersInCall(1);
        wasQuantityGreaterThanEqualTwo.current = false;
        setSeconds(0);
        navigation.goBack();
    }

    function formatSecondsToMinutesSeconds(totalSeconds: number) {
        let minutes = Math.floor(totalSeconds / 60); // Calculate whole minutes
        let seconds = totalSeconds % 60; // Calculate remaining seconds

        // Ensure seconds are always two digits
        let formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        // Combine minutes and formatted seconds into mm:ss format
        let formattedTime = `${minutes}:${formattedSeconds}`;

        return formattedTime;
    }

    function renderWaitingLayout() {
        return conversation.isGroup ? (
            <View style={[styles.callingContainer]}>
                {conversation.picture ? (
                    <Image
                        source={{
                            uri: conversation.picture,
                        }}
                        style={[styles.avatar]}
                    />
                ) : (
                    CreateGroupAvatarWhenAvatarIsEmpty(
                        conversation,
                        120,
                        120,
                        60
                    )
                )}
                <Text
                    style={[
                        styles.callingTitle,
                        {
                            color: commonStyles.darkPrimaryText.color,
                        },
                    ]}
                >
                    {t("audioCallCallingTitle")}
                </Text>

                <Text
                    style={[
                        styles.callingUsername,
                        {
                            color: commonStyles.darkPrimaryText.color,
                        },
                    ]}
                >
                    {conversation.name}
                </Text>
            </View>
        ) : (
            <View style={[styles.callingContainer]}>
                <Image
                    source={{
                        uri: opponentUser?.avatar,
                    }}
                    style={[styles.avatar]}
                />
                <Text
                    style={[
                        styles.callingTitle,
                        {
                            color: commonStyles.darkPrimaryText.color,
                        },
                    ]}
                >
                    {t("audioCallCallingTitle")}
                </Text>

                <Text
                    style={[
                        styles.callingUsername,
                        {
                            color: commonStyles.darkPrimaryText.color,
                        },
                    ]}
                >
                    {opponentUser?.name}
                </Text>
            </View>
        );
    }

    function renderInCallLayout() {
        return conversation.isGroup ? (
            <View style={[styles.callingContainer, styles.callingGroupContainer]}>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5
                    }}
                    onPress={handleEndCall}
                >
                    <View>
                        <Image
                            source={require("../../assets/arrow-left-s-line-icon.png")}
                            style={[
                                styles.backToPreviousBtnImg,
                                {
                                    tintColor: commonStyles.darkPrimaryText.color,
                                }
                            ]}
                        />
                    </View>
                    <Text
                        style={[
                            styles.backToPreviousBtnText,
                            {
                                color: commonStyles.darkPrimaryText.color,
                            }
                        ]}
                    >{t("backToConversation")}</Text>
                </TouchableOpacity>
                <View
                    style={{
                        flexShrink: 1,
                        flexGrow: 1,
                        marginTop: 30,
                        width: "100%",
                        paddingHorizontal: 25
                    }}
                >
                    <ScrollView
                        contentContainerStyle={{
                            width: "100%"
                        }}
                    >
                        <View
                            style={[
                                styles.userInCallContainerItem
                            ]}
                        >
                            <Image
                                source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnfAxGV-fZxGL9elM_hQ2tp7skLeSwMyUiwo4lMm1zyA&s"}}
                            
                                style={[
                                    styles.avatarInGroupCall
                                ]}
                            />
                            <Text
                                style={[
                                    styles.callingUsernameInGroup,
                                    {
                                        color: commonStyles.darkPrimaryText.color,
                                    }
                                ]}
                            >Nguyen Van A</Text>
                        </View>
                        
                    </ScrollView>
                </View>
            </View>
        ) : (
            <View style={[styles.callingContainer]}>
                <View style={[styles.inCallHeader]}>
                    <Image
                        source={{
                            uri: userInfo.user?.avatar,
                        }}
                        style={[styles.avatarInCall]}
                    />
                    <View style={[styles.arrowRightContainer]}>
                        <Image
                            source={require("../../assets/arrow-right-s-line.png")}
                            style={[
                                styles.arrowRightStyle,
                                styles.arrowRightStyleFirst,
                            ]}
                        />
                        <Image
                            source={require("../../assets/arrow-right-s-line.png")}
                            style={[
                                styles.arrowRightStyle,
                                styles.arrowRightStyleSecond,
                            ]}
                        />
                        <Image
                            source={require("../../assets/arrow-right-s-line.png")}
                            style={[
                                styles.arrowRightStyle,
                                styles.arrowRightStyleThird,
                            ]}
                        />
                    </View>
                    <Image
                        source={{
                            uri: opponentUser?.avatar,
                        }}
                        style={[styles.avatarInCall]}
                    />
                </View>

                <Text style={[styles.inCallTitle]}>
                    {t("audioCallInCallWith")}
                </Text>

                <Text
                    style={[
                        styles.callingUsername,
                        {
                            color: commonStyles.darkPrimaryText.color,
                        },
                    ]}
                >
                    {opponentUser?.name}
                </Text>

                <Text
                    style={[
                        styles.callingUsername,
                        {
                            color: commonStyles.darkPrimaryText.color,
                        },
                    ]}
                >
                    {formatSecondsToMinutesSeconds(seconds)}
                </Text>
            </View>
        );
    }
    function renderBackgroundImage() {
        return (
            conversation.isGroup ? (
                conversation.picture ? (
                    <Image
                        source={{
                            uri: conversation.picture,
                        }}
                        style={[styles.imageBackground]}
                        blurRadius={15}
                    />
                )
                :
                (
                    CreateGroupAvatarWhenAvatarIsEmpty(
                        conversation,
                        120,
                        120,
                        60
                    )
                )
            )
            :
            <Image
                source={{
                    uri: opponentUser?.avatar,
                }}
                style={[styles.imageBackground]}
                blurRadius={15}
            />
        )
    }
    console.log("conversation id: ", conversation._id)

    return (
        <View style={[styles.container]}>
            <StatusBar />
            <SafeAreaView style={[styles.containerSafeArea]}>
                {renderBackgroundImage()}
                {waitingLayout ? (
                    renderWaitingLayout()
                ) : (
                    renderInCallLayout()
                    // <View style={[styles.callingContainer]}>
                    //     <View style={[styles.inCallHeader]}>
                    //         <Image
                    //             source={{
                    //                 uri: userInfo.user?.avatar,
                    //             }}
                    //             style={[styles.avatarInCall]}
                    //         />
                    //         <View style={[styles.arrowRightContainer]}>
                    //             <Image
                    //                 source={require("../../assets/arrow-right-s-line.png")}
                    //                 style={[
                    //                     styles.arrowRightStyle,
                    //                     styles.arrowRightStyleFirst,
                    //                 ]}
                    //             />
                    //             <Image
                    //                 source={require("../../assets/arrow-right-s-line.png")}
                    //                 style={[
                    //                     styles.arrowRightStyle,
                    //                     styles.arrowRightStyleSecond,
                    //                 ]}
                    //             />
                    //             <Image
                    //                 source={require("../../assets/arrow-right-s-line.png")}
                    //                 style={[
                    //                     styles.arrowRightStyle,
                    //                     styles.arrowRightStyleThird,
                    //                 ]}
                    //             />
                    //         </View>
                    //         <Image
                    //             source={{
                    //                 uri: opponentUser?.avatar,
                    //             }}
                    //             style={[styles.avatarInCall]}
                    //         />
                    //     </View>

                    //     <Text style={[styles.inCallTitle]}>
                    //         {t("audioCallInCallWith")}
                    //     </Text>

                    //     <Text
                    //         style={[
                    //             styles.callingUsername,
                    //             {
                    //                 color: commonStyles.darkPrimaryText.color,
                    //             },
                    //         ]}
                    //     >
                    //         {opponentUser?.name}
                    //     </Text>

                    //     <Text
                    //         style={[
                    //             styles.callingUsername,
                    //             {
                    //                 color: commonStyles.darkPrimaryText.color,
                    //             },
                    //         ]}
                    //     >
                    //         {formatSecondsToMinutesSeconds(seconds)}
                    //     </Text>
                    // </View>
                )}

                <View style={[styles.actionContainer]}>
                    <TouchableOpacity
                        onPress={handleToggleSpeaker}
                        style={[styles.speakerAndMicIconBtnStyle]}
                    >
                        <Image
                            source={
                                speakerOn
                                    ? require("../../assets/volume-open-fill.png")
                                    : require("../../assets/volume-off-vibrate-fill.png")
                            }
                            style={[
                                styles.speakerAndMicIconStyle,
                                {
                                    tintColor:
                                        commonStyles.darkPrimaryText.color,
                                },
                            ]}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleEndCall}
                        style={[styles.endCallBtnStyle]}
                    >
                        <Image
                            source={require("../../assets/audio-phone-fill.png")}
                            style={[
                                styles.endCallBtnIconStyle,
                                {
                                    tintColor:
                                        commonStyles.darkPrimaryText.color,
                                },
                            ]}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.speakerAndMicIconBtnStyle]}
                        onPress={handleToggleMic}
                    >
                        <Image
                            source={
                                micOn
                                    ? require("../../assets/mic-fill.png")
                                    : require("../../assets/mic-off-fill.png")
                            }
                            style={[
                                styles.speakerAndMicIconStyle,
                                {
                                    tintColor:
                                        commonStyles.darkPrimaryText.color,
                                },
                            ]}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
