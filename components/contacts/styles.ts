import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    contactDetailWrapper: {
        flex: 1,
        position: "relative"
    },
    contactDetailContainer:{
        flex: 1,
        position: "relative",
        paddingVertical: 10,
        paddingBottom: 0,
    },
    contactDetailHeaderBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    contactDetailHeaderTitleName:{
        fontSize: 24,
        fontWeight: "500",
    },
    contactDetailHeaderIconAddFriend:{
        width: 24,
        height: 24,
    },
    contactDetailBoxSearch: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 4,
    },
    iconSearchMsgAndUser:{
        paddingHorizontal: 10,
    },
    textInputSearchMsgOrUser: {
        paddingVertical: 10,
        flex: 1,
        fontSize: 15,
    },
    contactDetailBoxSearchWrapper:{
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingBottom: 0,
    },
    contactDetailTypeFilterBox:{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        borderBottomWidth: 1,
    },
    contactDetailTypeFilterBtn:{
        paddingVertical: 10,
        minWidth: 100,
        alignItems: "center",
        borderBottomWidth: 1,
    },
    contactDetailTypeFilterBtnText:{
        fontSize: 16,
        fontWeight: '500',
    },
    contactDetailFriendListOrGroupListWrapper:{
        flexGrow: 1,
        flexShrink: 1, 
    },
    contactDetailFriendAnotherActionContainer:{
        flexDirection: "column",
        gap: 20,
        paddingHorizontal: 20,
    },
    contactDetailFriendAnotherActionBtn:{
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    contactDetailFriendAnotherActionImageBox:{
        width: 45,
        height: 45,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: commonStyles.primaryColor.color
    },
    contactDetailFriendAnotherActionImage:{
        width: 24,
        height: 24,
        resizeMode: "contain"
    },
    contactDetailFriendAnotherActionBtnTitle:{
        fontSize: 18,
    },
    contactDetailFriendAnotherActionBtnDesc:{
        fontSize: 16,   
    },
    contactDetailFriendBreakLine:{
        height: 8,
        width: "100%",
        marginTop: 15
    },
    contactDetailFriendListWrapper:{

    },
    contactDetailFriendListFilterBox:{
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        gap: 15,
        paddingVertical: 10,
    },
    contactDetailFriendListFilterBtn:{
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20
    },
    contactDetailFriendListFilterBtnText:{
        fontSize: 17,
        textAlign: "center"
    },
    contactDetailFriendItemBox:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 10,
        zIndex: 1,
    },
    contactDetailFriendItemAvatar:{
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    contactDetailFriendItemName:{
        fontSize: 18,
        fontWeight: "500",
        flexGrow: 1,
        flexShrink: 1,
    },
    contactDetailFriendItemActionsBox:{
        flexDirection: "row",
        alignItems: "center",
        gap: 18,
        zIndex: 1,
    },
    contactDetailFriendItemActionIcon:{
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
    contactDetailFriendItemActionPopupWrapper:{
        position: "relative",
        zIndex: 19,
    },
    contactDetailFriendItemActionPopup:{
        // position: "absolute",
        // right: 10,
        // bottom: "70%",
        width: 160,
        paddingVertical: 10,
        paddingHorizontal: 15,
        zIndex: 20,
        borderRadius: 4,
        
    },
    contactDetailFriendActionPopupBtnItem:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 5,
        justifyContent: "space-between"
    },
    contactDetailFriendActionPopupBtnItemText:{
        fontSize: 16,
    },
    contactDetailFriendItemActionBtnImage:{
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    contactDetailFriendListCharacterClassification:{
        fontSize: 19,
        fontWeight: "500",
        color: commonStyles.primaryColor.color
    },
    contactDetailFriendCreateNewGroupBtn:{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 20,
    },
    contactDetailFriendCreateNewGroupBtnImageBox:{
        width: 53,
        height: 53,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    contactDetailFriendCreateNewGroupBtnImage:{
        width: 24,
        height: 24,
        resizeMode: "contain",
        tintColor: commonStyles.primaryColor.color
    },
    contactDetailFriendCreateNewGroupBtnText:{
        fontSize: 18,
        fontWeight: "500",
        color: commonStyles.primaryColor.color
    },
    contactDetailGroupItemWrapper:{
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    contactDetailFriendHeaderGroupFilterBox:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 10
    },
    contactDetailFriendHeaderGroupFilterLeftText:{
        fontSize: 16,
        fontWeight: "500",
    },
    contactDetailFriendHeaderGroupFilterRightBox:{
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    contactDetailFriendHeaderGroupFilterRightImage:{
        width: 15,
        height: 15,
        resizeMode: "contain"
    },
    contactDetailFriendHeaderGroupFilterRightText:{
        fontSize: 13,
    },
    contactDetailGroupItemBox:{
        flexDirection: "row",
        alignItems: "center",
        gap: 13,
        marginVertical: 10
    },
    contactDetailGroupItemAvatar:{
        width: 53,
        height: 53,
        borderRadius: 50,
    },
    contactDetailGroupItemContentBox:{
        flexGrow: 1,
        flexShrink: 1,
    },
    contactDetailGroupItemFirstTitleBox:{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginBottom: 2,
    },
    contactDetailGroupItemFirstTitleLeftText:{
        fontSize: 18,
        fontWeight: "500",
        flexShrink: 1,
        flexGrow: 1,
    },
    contactDetailGroupItemFirstTitleRightText:{
        fontSize: 15,
        fontWeight: "500"
    },
    contactDetailGroupItemSecondPreviewText:{
        fontSize: 16,
    }
})