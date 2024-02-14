import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
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