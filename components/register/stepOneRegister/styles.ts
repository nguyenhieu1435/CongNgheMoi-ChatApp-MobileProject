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
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    zaloNameTitle:{
        fontWeight: "500",
        fontSize: 16,
    },
    boxInputZaloName: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    boxInputZaloNameActive: {
        borderBottomColor: commonStyles.primaryColor.color,
        borderBottomWidth: 1,
    },
    textErrMsg: {
        color: "red",
        fontSize: 14,
        marginBottom: 15,
    },
    inputZaloName: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: "500",
    },
    btnDeleteTextInputZaloName: {
        padding: 10,
    },
    nameTipsTitle: {
        fontSize: 15,
        marginBottom: 10
    },
    itemTipsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    tipContent: {
        fontSize: 15,
    },
    tipContentChild: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: "600"
    },
    boxNextToStepTwo:{
        marginTop: "auto",
        marginBottom: 20
    },
    btnNextToStepTwo:{
        width: 40,
        height: 40,
        marginLeft: "auto",
        backgroundColor: commonStyles.primaryColor.color,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        opacity: 0.7
    },
    btnNextToStepTwoActive: {
        opacity: 1
    }
   
})