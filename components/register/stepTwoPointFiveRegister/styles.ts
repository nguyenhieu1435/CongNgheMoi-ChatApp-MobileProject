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
        flex: 1,
    },
    mainContentTopBox:{
        flex: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    mainContentTopBoxTitle:{
        fontSize: 24,
        fontWeight: "500",
        textAlign: "center",
        marginTop: 15,
    },
    mainContentTopBoxDesc:{
        width: "80%",
        textAlign: "center",
        fontSize: 16,
        marginTop: 14,
    },
    mainContentTopExpireTitle:{
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
        marginTop: 15,
    },
    mainContentBottomBox:{
        flex: 4,
        alignItems: "center",
    },
    inputVerifyCode:{
        paddingVertical: 10,
        width: "100%",
        textAlign: "center",
        borderWidth: 1,
        borderRadius: 4,
        fontSize: 16
    },
    inputVerifyCodeErrMsg:{
        position: "absolute",
        bottom: -38,
        fontSize: 14,
        color: commonStyles.redPrimaryColor.color,
        textAlign: "left",
        left: 0,
    },
    submitVerifyCodeBtn:{
        width: "80%",
        alignItems: "center",
        backgroundColor: commonStyles.primaryColor.color,
        borderRadius: 4,
        paddingVertical: 10,
    },
    submitVerifyCodeBtnText:{
        color: commonStyles.lightFourBackground.backgroundColor,
        fontSize: 16,
        width: "100%",
        textAlign: "center",
        borderRadius: 4,
        textTransform: "uppercase",
    }   
})