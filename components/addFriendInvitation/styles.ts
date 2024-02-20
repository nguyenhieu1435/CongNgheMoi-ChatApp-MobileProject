import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    addFriendInvitationWrapper:{
        flex: 1,
    },
    addFriendInvitationContainer:{
        flex: 1,
    },
    addFriendInvitationHeader:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
    },
    addFriendInvitationHeaderBackButton:{
        paddingVertical: 10,
    },
    addFriendInvitationHeaderIconImage:{
        height: 28,
        width: 28,
        resizeMode: "contain",
    },
    addFriendInvitationHeaderSettingButton:{
        paddingVertical: 10,
    },
    addFriendInvitationHeaderTitle:{
        fontWeight: "500",
        fontSize: 20,
        flexGrow: 1,
        flexShrink: 1,
    },
    addFriendInvitationChooseTypeBox:{
        paddingHorizontal: 20,
        flexDirection: "row",
        gap: 30,
        alignItems: "center",
        borderBottomWidth: 1,
    },
    addFriendInvitationChooseTypeItem:{
        paddingVertical: 12,
        flex: 1,
    },
    addFriendInvitationChooseTypeItemActive:{
        borderBottomWidth: 2,
        borderBottomColor: commonStyles.primaryColor.color
    },
    addFriendInvitationChooseTypeItemText:{
        textAlign: "center",
        fontSize: 16,
    },
    addFriendInvitationReceivedListSection:{
        paddingVertical: 10,
        paddingHorizontal: 20,
        gap: 15
    },
    addFriendInvitationReceivedItemSection:{
        flexDirection: "row",
        gap: 10,
    },
    addFriendInvitationAvatarImage:{
        height: 53,
        width: 53,
        borderRadius: 50,
    },
    addFriendInvitationReceivedItemMainContent:{
        flexGrow: 1,
        flexShrink: 1,
    },
    addFriendInvitationReceivedItemRealName:{
        fontSize: 18,
        fontWeight: "500",
        letterSpacing: 0.5
    },
    addFriendInvitationReceivedItemAddDate:{
        fontSize: 17,
    },
    addFriendInvitationReceivedItemMessageBox:{
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 4,
        borderWidth: 1,
    },
    addFriendInvitationReceivedMessage:{
        fontSize: 17
    },
    addFriendInvitationReceivedItemActionBox:{
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
    },
    addFriendInvitationReceivedItemActionItem:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        borderRadius: 25
    },
    addFriendInvitationReceivedItemActionItemText:{
        fontSize: 17,
        fontWeight: "500"
    },
    addFriendInvitationReceivedBreakLine:{
        height: 8,
        width: "100%",
    },
    addFriendInvitationReceivedMayBeYouKnowBox:{
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    addFriendInvitationReceivedMayBeYouKnowTitle:{
        fontSize: 15,
        fontWeight: "500",
    },
    addFriendInvitationReceivedMayBeYouKnowItem:{
        position: "relative",
        borderRadius: 8,
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 7,
        width: 130,
        alignItems: "center",
    },
    addFriendInvitationReceivedMayBeYouKnowItemCloseButton:{
        position: "absolute",
        top: 0,
        right: 0,
        padding: 3,
        borderRadius: 50
    },
    addFriendInvitationReceivedMayBeYouKnowItemCloseButtonIcon:{
        height: 23,
        width: 23,
        resizeMode: "contain",
    },
    addFriendInvitationReceivedMayBeKnownItemRealName:{
        fontSize: 18,
        marginTop: 5,
        fontWeight: "500",
    },
    addFriendInvitationReceivedMayBeYouKnowItemAddButton:{
        width: "93%",
        paddingVertical: 6,
        alignItems: "center",
        borderRadius: 25,
        marginTop: 8
    },
    addFriendInvitationReceivedMayBeYouKnowItemText:{
        fontSize: 16,
        fontWeight: "500"
    },
    addFriendInvitationSentFlatItem:{
        flexDirection: "row",
        gap: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: "center"
    },
    addFriendInvitationSentItemMainContent:{
        flexGrow: 1,
        flexShrink: 1,
    },
    addFriendInvitationSentItemActionAddButton:{
        paddingHorizontal: 20,
        borderRadius: 25,
        paddingVertical: 6,
        backgroundColor: commonStyles.primaryColorBackground.backgroundColor,
    },
    addFriendInvitationSentItemActionAddButtonText:{
        color: commonStyles.primaryColor.color,
        fontSize: 17,
        fontWeight: "500",
        textAlign: "center"
    },
    addFriendInvitationSentItemActionUndoButton:{
        paddingHorizontal: 20,
        borderRadius: 25,
        paddingVertical: 6,
    },
    addFriendInvitationSentItemActionUndoButtonText:{
        fontSize: 17,
        fontWeight: "500",
        textAlign: "center"
    },
    addFriendInvitationEmptyList:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    addFriendInvitationEmptyListImage:{
        width: 80,
        height: 80,
        resizeMode: "contain",
        marginTop: 80,
        marginBottom: 30
    },
    addFriendInvitationEmptyListText:{
        fontSize: 17,
        
    }
})