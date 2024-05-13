import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    imageBackground: {
        position: "absolute",
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        top: 0,
        zIndex: -1
    },
    callIncomingHeader:{
        flex: 7,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1
    },
    callIncomingAvatarImg:{
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 10,
        borderColor: "rgba(255, 255, 255, 0.7)",
    },
    callIncomingFooter:{
        flex: 3,
        zIndex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 40
    },
    callIncomingTitle:{
        marginTop: 15,
        fontSize: 16
    },
    callIncomingUsername:{
        fontSize: 20,
        marginTop: 5,
        fontWeight: "500"
    },
    callIncomingActionBtn:{
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center"
    },
    callIncomingActionBtnImg:{
        width: 40,
        height: 40.  
    },
    callIncomingBtnAccept:{
        backgroundColor: commonStyles.activeOnlineColor.color
    },
    callIncomingBtnReject:{
        backgroundColor: commonStyles.redPrimaryColor.color
    }
})