import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Image,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    ChannelProfileType,
    ClientRoleType,
    IRtcEngine,
    createAgoraRtcEngine,
} from 'react-native-agora';
import { styles } from './styles';

import { AGORA_APP_ID } from '@env';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import commonStyles from '../../CommonStyles/commonStyles';
import { IUserInConversation } from '../../configs/interfaces';
import { setIsInCall } from '../../redux_toolkit/slices/isInCall.slice';
import { IRootState } from '../../redux_toolkit/store';
import getAgoraUid from '../../utils/getAgoraUid';

const appId = AGORA_APP_ID;
const token = '';
const uid = 0;

interface AudioCallProps {
    navigation: any;
    route: any;
}

export default function AudioCall({ navigation, route }: AudioCallProps) {
    const conversationId = route.params.conversationId as string;
    const isGroup = route.params.isGroup as boolean;
    const users = route.params.users as IUserInConversation[];
    const conversationName = route.params.conversationName as string;
    const callInComing = route.params.callInComing as boolean;
    const channelName = conversationId;
    const userInfo = useSelector((state: IRootState) => state.userInfo);
    const uid = getAgoraUid(userInfo.user?._id || '');
    const opponentUser = !isGroup
        ? users.find((user) => user._id !== userInfo.user?._id)
        : null;

    const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
    const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
    const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
    const [message, setMessage] = useState(''); // Message to the user
    const { t } = useTranslation();
    const [micOn, setMicOn] = useState(true);
    const [speakerOn, setSpeakerOn] = useState(true);
    const [waitingLayout, setWaitingLayout] = useState(true);
    const refInterval = useRef<NodeJS.Timeout | null>(null);
    const [seconds, setSeconds] = useState(0);
    const [quantityOfUsersInCall, setQuantityOfUsersInCall] = useState(1);
    const wasQuantityGreaterThanEqualTwo = useRef(false);
    const socket = useSelector((state: IRootState) => state.socketIo.socket);
    const [usersInCallInGroup, setUsersInCallInGroup] = useState<
        IUserInConversation[]
    >([]);
    const userAcceptCaffIdRef = useRef<string | null>(null);
    const userEndCallIdRef = useRef<string | null>(null);
    const dispatch = useDispatch();

    function showMessage(msg: string) {
        setMessage(msg);
    }

    const getPermission = async () => {
        if (Platform.OS === 'android') {
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
                ChannelProfileType.ChannelProfileCommunication,
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
            showMessage('You left the channel');
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        // Initialize Agora engine when the app starts
        dispatch(setIsInCall(true));

        async function start() {
            await setupVoiceSDKEngine();
            await join();
        }
        start();
    }, [route.params]);

    const setupVoiceSDKEngine = async () => {
        try {
            // use the helper function to get permissions
            if (Platform.OS === 'android') {
                await getPermission();
            }
            agoraEngineRef.current = createAgoraRtcEngine();
            const agoraEngine = agoraEngineRef.current;
            agoraEngine.registerEventHandler({
                onJoinChannelSuccess: () => {
                    showMessage(
                        'Successfully joined the channel ' + channelName,
                    );
                    setIsJoined(true);
                },
                onUserJoined: (_connection, Uid) => {
                    console.log('Remote user joined');

                    showMessage('Remote user joined with uid ' + Uid);
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
                    showMessage('Remote user left the channel. uid: ' + Uid);
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

    useEffect(() => {
        if (
            wasQuantityGreaterThanEqualTwo.current &&
            quantityOfUsersInCall < 2 &&
            !isGroup
        ) {
            handleEndCall();
        }
    }, [quantityOfUsersInCall]);

    useEffect(() => {
        socket.on('acceptCall', onAcceptCall);
        socket.on('endCall', onEndCall);

        return () => {
            socket.off('acceptCall', onAcceptCall);
            socket.off('endCall', onEndCall);
        };
    }, [conversationId]);

    function onAcceptCall({
        receiver,
        _id,
    }: {
        receiver: IUserInConversation;
        _id: string;
    }) {
        if (receiver._id != userAcceptCaffIdRef.current) {
            userAcceptCaffIdRef.current = receiver._id;
            setUsersInCallInGroup((prev) => [...prev, receiver]);
        }
    }
    function onEndCall({
        sender,
        _id,
    }: {
        sender: IUserInConversation;
        _id: string;
    }) {
        if (sender._id != userEndCallIdRef.current) {
            userEndCallIdRef.current = sender._id;
            setUsersInCallInGroup((prev) =>
                prev.filter((user) => user._id !== sender._id),
            );
        }
    }

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
        dispatch(setIsInCall(false));
        socket.emit('endCall', {
            sender: userInfo.user,
            _id: conversationId,
        });
        leave();
        refInterval.current && clearInterval(refInterval.current);
        refInterval.current = null;
        setQuantityOfUsersInCall(1);
        wasQuantityGreaterThanEqualTwo.current = false;
        setSeconds(0);
        if (callInComing) {
            navigation.pop(2);
        } else {
            navigation.goBack();
        }
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
        return isGroup ? (
            <View style={[styles.callingContainer]}>
                <Image
                    source={{
                        uri: 'https://cdn1.iconfinder.com/data/icons/developer-set-2/512/users-512.png',
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
                    {t('audioCallCallingTitle')}
                </Text>

                <Text
                    style={[
                        styles.callingUsername,
                        {
                            color: commonStyles.darkPrimaryText.color,
                        },
                    ]}
                >
                    {conversationName}
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
                    {t('audioCallCallingTitle')}
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

    console.log('user number: ', quantityOfUsersInCall);

    function renderInCallLayout() {
        return isGroup ? (
            <View
                style={[styles.callingContainer, styles.callingGroupContainer]}
            >
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                    }}
                    onPress={handleEndCall}
                >
                    <View>
                        <Image
                            source={require('../../assets/arrow-left-s-line-icon.png')}
                            style={[
                                styles.backToPreviousBtnImg,
                                {
                                    tintColor:
                                        commonStyles.darkPrimaryText.color,
                                },
                            ]}
                        />
                    </View>
                    <Text
                        style={[
                            styles.backToPreviousBtnText,
                            {
                                color: commonStyles.darkPrimaryText.color,
                            },
                        ]}
                    >
                        {t('backToConversation')}
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        flexShrink: 1,
                        flexGrow: 1,
                        marginTop: 30,
                        width: '100%',
                        paddingHorizontal: 25,
                    }}
                >
                    <ScrollView
                        contentContainerStyle={{
                            width: '100%',
                        }}
                    >
                        <View style={[styles.userInCallContainerItem]}>
                            <Image
                                source={{
                                    uri: userInfo.user?.avatar,
                                }}
                                style={[styles.avatarInGroupCall]}
                            />
                            <Text
                                style={[
                                    styles.callingUsernameInGroup,
                                    {
                                        color: commonStyles.darkPrimaryText
                                            .color,
                                    },
                                ]}
                            >
                                {userInfo.user?.name}
                            </Text>
                        </View>

                        {usersInCallInGroup.map((user, index) => {
                            return (
                                <View
                                    style={[styles.userInCallContainerItem]}
                                    key={index}
                                >
                                    <Image
                                        source={{
                                            uri: user?.avatar,
                                        }}
                                        style={[styles.avatarInGroupCall]}
                                    />
                                    <Text
                                        style={[
                                            styles.callingUsernameInGroup,
                                            {
                                                color: commonStyles
                                                    .darkPrimaryText.color,
                                            },
                                        ]}
                                    >
                                        {user?.name}
                                    </Text>
                                </View>
                            );
                        })}
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
                            source={require('../../assets/arrow-right-s-line.png')}
                            style={[
                                styles.arrowRightStyle,
                                styles.arrowRightStyleFirst,
                            ]}
                        />
                        <Image
                            source={require('../../assets/arrow-right-s-line.png')}
                            style={[
                                styles.arrowRightStyle,
                                styles.arrowRightStyleSecond,
                            ]}
                        />
                        <Image
                            source={require('../../assets/arrow-right-s-line.png')}
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
                    {t('audioCallInCallWith')}
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
        return isGroup ? (
            <Image
                source={{
                    uri: 'https://cdn1.iconfinder.com/data/icons/developer-set-2/512/users-512.png',
                }}
                style={[styles.imageBackground]}
                blurRadius={15}
            />
        ) : (
            <Image
                source={{
                    uri: opponentUser?.avatar,
                }}
                style={[styles.imageBackground]}
                blurRadius={15}
            />
        );
    }
    console.log('conversation id: ', conversationId);

    return (
        <View style={[styles.container]}>
            <StatusBar />
            <SafeAreaView style={[styles.containerSafeArea]}>
                {renderBackgroundImage()}
                {
                    waitingLayout ? renderWaitingLayout() : renderInCallLayout()
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
                }

                <View style={[styles.actionContainer]}>
                    <TouchableOpacity
                        onPress={handleToggleSpeaker}
                        style={[styles.speakerAndMicIconBtnStyle]}
                    >
                        <Image
                            source={
                                speakerOn
                                    ? require('../../assets/volume-open-fill.png')
                                    : require('../../assets/volume-off-vibrate-fill.png')
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
                            source={require('../../assets/audio-phone-fill.png')}
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
                                    ? require('../../assets/mic-fill.png')
                                    : require('../../assets/mic-off-fill.png')
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
