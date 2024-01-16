import { StyleSheet } from "react-native";
import commonStyles from "../../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    wrapperAll: {
        flex: 1
    },
    navigationTabBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: commonStyles.primaryColor.color
    },
    btnReturnInitialPage: {
        paddingVertical: 10,
        paddingHorizontal: 20, 
    },
    currentTabName: {
        color: commonStyles.darkPrimaryText.color,
        fontSize: 18,
        fontWeight: "500",
        marginLeft: 10,
    },
    mainContentContainer: {
        flexGrow: 1,
    },
    descriptionForThisPage:{
        fontSize: 15,
        paddingHorizontal: 15,
        paddingVertical: 12
    },
    boxDescStatusSendingMsg: {
        alignItems: "center",
        marginTop: 25
    },
    boxIconStatusSendMsg: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
    },
    iconStatusSendMsg: {
        fontSize: 35,
        color: commonStyles.primaryColor.color,
        padding: 5,
    },
    callingToTitle:{
        fontWeight: "500",
        fontSize: 17,
        marginTop: 20
    },
    callingToTips: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: "500"
    },
    boxListInputOTPWrapper: {
        marginTop: 25,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 30,
        justifyContent: "space-between"
    },
    boxInputOTP: {
        width: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    inputOneNumberInOTP: {
        textAlign: "center",
        width: "100%",
        fontSize: 15,
        paddingVertical: 10,
    },
    resendCodeWrapper:{
        marginTop: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    btnResendCodeBox:{

    },
    textBtnResendCode: {
        fontWeight: '500',
        fontSize: 17
    },
    textRemainTimeResend: {
        fontWeight: "700",
        color: commonStyles.primaryColor.color,
        fontSize: 17,
        marginLeft: 10
    },
    boxWrapperBtnNext: {
        width: "100%",
        alignItems: "center",
        marginTop: 30,
    },
    btnNextPage: {
        width: "55%",
        paddingVertical: 12,
        borderRadius: 25
    },
    textBtnNextPage: {
        textAlign: "center",
        fontSize: 18
    }
})