import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AgoraUIKit, { DualStreamMode, StreamFallbackOptions } from 'agora-rn-uikit';
import { AGORA_APP_ID } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { IUserInConversation } from "../../configs/interfaces";
import { setIsInCall } from "../../redux_toolkit/slices/isInCall.slice";

export interface VideoCallProps {
    navigation: any,
    route: any,
}

export default function VideoCall({ navigation, route }: VideoCallProps) {

    const conversationId = route.params.conversationId as string;
    const isGroup = route.params.isGroup as boolean;
    const callInComing = route.params.callInComing as boolean;
    const connectionData = {
      appId: AGORA_APP_ID,
      channel: conversationId,
      token: null,
    };
    const [quantityUsers, setQuantityUsers] = useState(1);
    const wasGreatThanEqualTwo = useRef(false);
    const socket = useSelector((state: IRootState) => state.socketIo.socket);
    const userEndCallIdRef = useRef<string | null>(null);
    const userInfo = useSelector((state: IRootState) => state.userInfo);
    const dispatch = useDispatch();

    const rtcCallbacks = {
        EndCall: onEndCall,
        UserJoined: onUserJoined,
        UserOffline: onUserOffline,
    };

    function onUserJoined(...rest: any) {
        console.log('UserJoined', ...rest);
        if (quantityUsers + 1 >= 2){
            wasGreatThanEqualTwo.current = true;
        }
        setQuantityUsers(quantityUsers + 1);
    }
    function onUserOffline(...rest: any) {
        console.log('UserOffline', ...rest);
        setQuantityUsers(quantityUsers - 1);
    }
    function onEndCall(...rest: any) {
        socket.emit("endCall", {
            sender: userInfo.user,
            _id: conversationId,
        })
        dispatch(setIsInCall(false))
        if (callInComing){
            navigation.pop(2)
        } else {
            navigation.goBack();
        }
    }   

    useEffect(()=>{
        if (wasGreatThanEqualTwo.current && quantityUsers < 2 && !isGroup){
            if (callInComing){
                navigation.pop(2)
            } else {
                navigation.goBack();
            }
        }
    }, [quantityUsers])

    useEffect(()=>{
        dispatch(setIsInCall(true))
    }, [])
    

    

    return (
        <View style={{ flex: 1 }}>
            <AgoraUIKit 
                settings={{
                    displayUsername: true,
                    activeSpeaker: true,
                    
                }}
                connectionData={connectionData} rtcCallbacks={rtcCallbacks} 
            />
        </View>
    )
}
