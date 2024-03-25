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
    passwordContainer:{
        width: "100%",
        alignItems: "center",

    },
    passwordContainerChild: {
        marginTop: 40,
        width: "80%",
        marginBottom: 20
    },
    passwordTitleText:{
        fontSize: 17,
    },
    passwordInputWrapperRow:{
        flexDirection: "row",
        marginTop: 16,
        position: "relative"
    },
    passwordInput:{
        fontSize: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1,
        paddingRight: 30
    },
    boxIconToggleShowPassword:{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10
    },
    iconToggleShowPassword:{
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    textErrMsg:{
        fontSize: 14,
        marginTop: 5,
        color: "red"
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