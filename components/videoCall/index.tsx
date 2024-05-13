import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AgoraUIKit from 'agora-rn-uikit';
import { AGORA_APP_ID } from "@env";
import { IConversation } from "../../configs/interfaces";

export interface VideoCallProps {
    navigation: any,
    route: any,
}

export default function VideoCall({ navigation, route }: VideoCallProps) {

    const conversation = route.params.conversation as IConversation;
    const connectionData = {
      appId: AGORA_APP_ID,
      channel: conversation._id,
      token: null,
    };
    const [quantityUsers, setQuantityUsers] = useState(1);
    const wasGreatThanEqualTwo = useRef(false);

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
        navigation.goBack();
    }   

    useEffect(()=>{
        if (wasGreatThanEqualTwo.current && quantityUsers < 2 && !conversation.isGroup){
            navigation.goBack();
        }
    }, [quantityUsers])

    

    

    return (
        <View style={{ flex: 1 }}>
            <AgoraUIKit 
                settings={{
                    displayUsername: true,
                }}
                connectionData={connectionData} rtcCallbacks={rtcCallbacks} 

            />
        </View>
    )
}
