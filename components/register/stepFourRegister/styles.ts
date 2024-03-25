import { StyleSheet } from "react-native";
import commonStyles from "../../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    wrapperAllBox: {
        flex: 1,
    },
    boxContainer: {
        flex: 1
    },
    flex1: {
        flex: 1
    },
    navigationTabBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: commonStyles.primaryColor.color
    },
    currentTabName: {
        color: commonStyles.darkPrimaryText.color,
        fontSize: 18,
        fontWeight: "500",
        marginLeft: 10,
        paddingVertical: 10,
    },
    boxChooseGender: {
        paddingHorizontal: 10,
        marginTop: 20
    },
    textChooseGenderDesc: {
        fontSize: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    textGenderTitle: {
        fontSize: 15,
        fontWeight: "500"
    },
    boxBtnChooseGender: {
        width: "100%",
        height: 200,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    btnChooseGender: {

    },
    boxImageChooseGender: {
        position: "relative",
       alignItems: "center",
    },
    imageChooseGender:{
        width: 100,
        height: 100,
    },
    btnRadioChooseRender: {
        position: "absolute",
        bottom: -8,
    },
    titleGenderName: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center"
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
    textDateOfBirthTitle: {
        fontSize: 15,
        fontWeight: "500",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    borderTopBox: {
        borderTopWidth: 5,
        borderTopColor: "#ccc",
    }
})