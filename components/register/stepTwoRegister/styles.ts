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
    btnReturnPreviousPage: {
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
    formPhoneContainer:{
        paddingHorizontal: 15,
        marginTop: 25,
        flexGrow: 1
    },
    boxInputZaloName: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    boxInputZaloNameActive: {
        borderBottomColor: commonStyles.primaryColor.color,
        borderBottomWidth: 1,
    },
    inputZaloName: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: "500",

    },
    textErrMsg: {
        color: "red",
        fontSize: 14,
        marginTop: 15,
    },
    btnDeleteTextInputZaloName: {
        padding: 10,
    },
    boxChooseNational: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginRight: 10,
        paddingVertical: 10,
    },
    currentNationalName: {
        fontSize: 15, 
        marginRight: 8
    },
    boxPhoneContainer: {
        flexDirection: 'row',
    },
    listCheckBoxGroup: {
        marginTop: 25,
       
    },
    itemCheckBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    checkBox:{
        borderRadius: 6,
        marginRight: 10,
    },
    textDescCheckBox: {
        fontSize: 15
    },
    linkDescCheckBox: {
        fontWeight: "500",
        color: commonStyles.primaryColor.color
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
    },
    modalContaner: {
        flex: 1
    },
    chooseTheCountryCode: {
        fontSize: 17,
        fontWeight: "500"
    },
    boxChooseTheCountryCode: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        backgroundColor: commonStyles.primaryColor.color,
        paddingVertical: 12,
    },
    iconCloseModal: {
        marginLeft: 15,

    },
    boxInputSearchCountry: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
        borderRadius: 6,
        backgroundColor: ""
    },
    inputSearchCountry: {
        flex: 1,
        paddingVertical: 5,
        fontSize: 15,
        fontWeight: "500",
    },
    iconSearchCountry: {
        marginHorizontal: 10,
    },
    boxInputSearchCountryWrapper: {
        paddingVertical: 10,
    },
    boxWrapScrollView: {
        flexGrow: 1,
        paddingBottom: 100,
    },
    itemCountryBox: {
        flexDirection: "row",
        marginHorizontal: 10,
        paddingVertical: 12
    },
    itemSeperatorCom: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    countryName: {
        fontSize: 15,
        flex: 1,
    },
    countryDialCode: {
        fontSize: 15,
    },
    titleSectionList: {
        fontSize: 15,
        fontWeight: "500",
        paddingHorizontal: 10,
        marginTop: 10,
    }
})