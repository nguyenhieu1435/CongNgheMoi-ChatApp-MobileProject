import { StyleSheet } from "react-native";
import commonStyles from "../../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    wrapperAllBox: {
        flex: 1
    },
    boxContainer: {
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
    chooseAvatarDesc: {
        fontSize: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    flex1:{ 
        flex: 1
    },
    boxChooseAvatar: {
        flex: 7,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    boxContainBtnNavigation: {
        flex: 3,
    },
    boxImageAvatar: {
        position: "relative",
        width: 90,
        height: 90,
    },
    imgAvatar: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#ccc"
    },
    btnIconEditAvatar: {
        width: 30,
        height: 30,
        position: "absolute",
        bottom: 0,
        borderRadius: 50,
        right: 0,
        backgroundColor: commonStyles.primaryColor.color,
        justifyContent: "center",
        alignItems: "center",
    },
    descChooseAvatarTitle: {
        textAlign: "center",
        marginTop: 10,
    },
    boxWrapperChooseAvatarBtn: {
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    btnChooseAvatarNow: {
        width: "50%",
        paddingVertical: 10,
        borderRadius: 20,
    },
    textChooseAvatarNow:{
        textAlign: "center",
        color: commonStyles.primaryColor.color,
        fontWeight: "500"
    },
    btnContinueWrapper: {
        width: "100%",
        alignItems: "center",
        marginTop: "auto",
        marginBottom: 30,
    },
    btnContinueBox: {
        width: "50%",
        paddingVertical: 10,
        backgroundColor: commonStyles.primaryColor.color,
        borderRadius: 20,
        opacity: 0.6
    },
    btnContinueBoxActive: {
        opacity: 1
    },
    textBtnContinueBox:{
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500",

    },
})