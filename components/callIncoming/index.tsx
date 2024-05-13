import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import commonStyles from "../../CommonStyles/commonStyles";

interface CallIncomingProps {
    navigation: any,
    route: any,

}

export default function CallIncoming({ navigation, route }: CallIncomingProps) {
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
                        source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbI-_7c6jmIW-XA6pbBuXZyb0TVmrmvBp8rQeh92r_Kw&s"}}
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
                        Incoming call
                    </Text>
                    <Text
                        style={[
                            styles.callIncomingUsername,
                            commonStyles.darkPrimaryText
                        ]}
                    >
                        User Name
                    </Text>
                </View>
                <View
                    style={[
                        styles.callIncomingFooter
                    ]}
                >
                    <TouchableOpacity
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
