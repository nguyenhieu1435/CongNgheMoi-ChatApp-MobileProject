import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    changePasswordWrapper:{
        flex: 1,
    },
    changePasswordContainer:{
        flex: 1,
        paddingHorizontal: 25
    },
    changePasswordHeader:{
        flex: 7,
        justifyContent: "center",
    },
    changePasswordFooter:{
        flex: 3
    },
    changePasswordTitle:{
        fontSize: 22,
        fontWeight: "500",
        textAlign: "center",
        marginBottom: 25
    },
    changePasswordLabel:{
        fontWeight: "500",
        fontSize: 15,
        marginBottom: 1
    },
    changePasswordInputContainer:{
        position: "relative",
        marginBottom: 30
    },
    changePasswordInput:{
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 6
    },
    changePasswordEyeIconBtn:{
        position: "absolute",
        right: 10,
        top: 12
    },
    changePasswordEyeIcon:{
        width: 25,
        height: 25,
        resizeMode: "contain"
    },
    errMsgChangePassword:{
        fontSize: 14,
        position: "absolute",
        bottom: -20,
        left: 0,
        color: commonStyles.redPrimaryColor.color
    },
    changePasswordBtn:{
        paddingVertical: 10,
        borderRadius: 6,
        backgroundColor: commonStyles.primaryColor.color,
        alignItems: "center",
        marginBottom: 20
    },
    changePasswordBtnText:{
        color: commonStyles.darkPrimaryText.color,
        fontWeight: "500",
        fontSize: 18
    },
    changePasswordCancelBtn:{
        paddingVertical: 10,
        borderRadius: 6,
        backgroundColor: commonStyles.redPrimaryColor.color,
        alignItems: "center"
    },
    changePasswordCancelBtnText:{
        color: commonStyles.darkPrimaryText.color,
        fontWeight: "500",
        fontSize: 18
    }
})