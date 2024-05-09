import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
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

    const rtcCallbacks = {
        EndCall: () => navigation.goBack(),
        UserJoined: (...rest : any) => console.log('UserJoined', ...rest),
        UserOffline: (...rest : any) => console.log('UserOffline', ...rest),
    };

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
