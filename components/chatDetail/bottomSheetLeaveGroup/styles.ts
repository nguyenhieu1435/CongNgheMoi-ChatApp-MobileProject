import { StyleSheet } from "react-native";
import commonStyles from "../../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    contentContainer:{
        paddingHorizontal: 15,
        flex: 1,
    },
    chooseAdminBeforeLeaveGroupTitle:{
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600"
    },
    searchUserContainer:{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 6,
        borderWidth: 1,
        marginTop: 15
    },
    searchUserIcon:{
        width: 20,
        height: 20,
        marginHorizontal: 10,
    },
    searchUserTextInput:{
        fontSize: 16,
        paddingVertical: 2
    },
    groupBtnControlContainer:{
        marginTop: 15,
        width: "100%",
        gap: 20
    },
    chooseAndContinueBtn:{
        alignContent: "center",
        backgroundColor: commonStyles.primaryColor.color,
        marginHorizontal: 20,
        borderRadius: 20
    },
    chooseAndContinueBtnText:{
        textAlign: "center",
        fontSize: 17,
        color: commonStyles.darkPrimaryText.color,
        paddingVertical: 10,
        fontWeight: "500"
    },
    chooseCancelBtn:{
        marginHorizontal: "auto",
        width: "30%",
        alignSelf: "center",
        alignItems: "center"
    },
    chooseCancelBtnText:{
        textAlign: "center",
        paddingVertical: 10,
        fontWeight: "500",
        fontSize: 16,
    },
    userInListItem:{ 
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 12
    },
    userInListItemAvatar:{
        width: 50,
        height: 50,
        borderRadius: 50

    },
    userInListItemName:{
        flexShrink: 1,
        flexGrow: 1,
        fontSize: 16,
    },
    leavingGroupBtn:{
        backgroundColor: commonStyles.redPrimaryColor.color,
        borderRadius: 20
    },
    leavingGroupBtnText:{
        textAlign: "center",
        fontSize: 17,
        color: commonStyles.darkPrimaryText.color,
        paddingVertical: 10,
        fontWeight: "500"
    },
    contentContainerHeader:{
        marginBottom: 15,
        position: "relative",
    },
    backToPreviousStepBtn:{
        left: 0,
        top: 0,
        position: "absolute",
        zIndex: 201
    },
    backToPreviousStepIcon:{
        width: 28,
        height: 28,
        tintColor: "black"
    },
    leavingGroupInSlientContainer:{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15
    },
    leavingGroupInSlientTitle:{
        flexShrink: 1,
        flexGrow: 1,
        fontSize: 16
    }
})