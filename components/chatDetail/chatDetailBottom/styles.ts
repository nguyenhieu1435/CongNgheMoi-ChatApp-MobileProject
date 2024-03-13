import { StyleSheet } from "react-native";
import commonStyles from "../../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    chatDetailBottomWrapper:{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        borderTopWidth: 1,
    },
    chatDetailBottomContainer:{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 20,
        
    },
    textInputMessage:{
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 6,
        fontSize: 15,
        flexGrow: 1,
        flexShrink: 1,
    },
    bottomSecondActionImg:{
        width: 20, 
        height: 20,
        tintColor: commonStyles.primaryColor.color
    },
    bottomSendActionBox:{
        width: 48,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: commonStyles.primaryColor.color,
        borderRadius: 6
    },
    bottomSendActionImg:{
        width: 20,
        height: 20,
        tintColor: commonStyles.darkPrimaryText.color
    },
    chatDetailBottomMoreActionWrapper:{
        width: "100%",
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    chatDetailBottomActionWrapper:{
        width: "25%",
        alignItems: "center",
        justifyContent: "center",
    },
    chatDetailBottomActionBtn:{
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 10
    },
    chatDetailBottomActionImg:{
        width: 35,
        height: 35,
        resizeMode: "contain",
        marginBottom: 4
    },
    chatDetailBottomActionText:{
        fontSize: 14,

    }
})