import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    detailSearchPopUpWrapper:{
        position: "absolute",
        right: 0,
        left: 0,
        flex: 1,
        top: 0,
        bottom:0,
        zIndex: 10,
    },
    detailSearchPopUpSearchEmptyWrapper:{
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    detailSearchPopupSearchEmptyTitle:{
        fontSize: 17,
        fontWeight: "500",
        marginBottom: 15,
    },
    detailSearchPopUpSearchEmptyContainer:{
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    detailSearchPopUpSearchEmptyUserSearched:{
        flexDirection: "column",
        alignItems: "center",
        width: 80,
    },
    detailSearchPopUpSearchEmptyUserSearchedAvatar:{
        width: 53,
        height: 53,
        borderRadius: 50,
        marginBottom: 10,
    },
    detailSearchPopUpSearchEmptyUserSearchedName:{
        fontSize: 15,
        textAlign: "center"
    },
    detailSearchPopUpSearchEmptyUserList:{
        gap: 20,
    },
    detailSearchPopUpSearchEmptyKeywordSearchedList:{
        flexDirection: "column",
        gap: 23,
    },
    detailSearchPopUpSearchEmptyKeywordSearchedItem:{
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    detailSearchPopUpSearchEmptyKeywordSearchedItemImage:{
        width: 22,
        height: 22,
        resizeMode: "contain"
    },
    detailSearchPopUpSearchEmptyKeywordSearchedItemText:{
        fontSize: 15,
    },
    detailSearchPopUpSearchEmptyBtnEditSearchHistory:{
        flexDirection: "row",
        marginTop: 15,
        alignItems: "center"
    },
    detailSearchPopUpSearchEmptyBtnEditSearchHistoryText:{
        fontSize: 15,
    },
    detailSearchPopUpSearchEmptyBtnEditSearchHistoryIcon:{
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    detailSearchPopUpSearchNotEmptyWrapper:{
        flex: 1,
        paddingVertical: 10,
    },
    detailSearchPopUpSearchNotEmptyTypeFilter:{
        flexDirection: "row",
        gap: 25,
        alignItems: "center",
        paddingHorizontal: 15
    },
    detailSearchPopUpSearchNotEmptyTypeFilterBtn:{

    },
    detailSearchPopUpSearchNotEmptyScrollWrapper:{
        flex: 1,
        
    },
    detailSearchPopupSearchEmptyAllWrapper:{
        marginTop: 10,
        paddingHorizontal: 15,
    },
    detailSearchPopupSearchEmptyTitleBtnText:{
        fontSize: 17,
        textTransform: "uppercase",
        fontWeight: "500",
        minWidth: 60,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "transparent",
    },
    detailSearchPopupSearchEmptyAllTitle:{
        fontSize: 17,
        fontWeight: "500",
        marginRight: 10,
        marginBottom: 5
    },
    detailSearchPopupSearchEmptyAllMatchedNumber:{

    },
    detailSearchPopUpSearchNotEmptyAllContactList:{
        flexDirection: "column",
    },
    detailSearchPopUpSearchNotEmptyAllContactItem:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    detailSearchPopUpSearchNotEmptyAllContactItemAvatar:{
        width: 53,
        height: 53,
        borderRadius: 50,
        resizeMode: "cover"
    },
    detailSearchPopUpSearchNotEmptyAllContactItemContent:{
        flexDirection: "column",
        gap: 5,
        flexGrow: 1,
        flexShrink: 1,
    },
    searchNotEmptyAllContactItemContentNameWrapper:{
        flexDirection: "row",
    },
    searchNotEmptyAllContactItemContentNameNormal:{
        fontSize: 18,
        fontWeight: "500",
    },
    searchNotEmptyAllContactItemContentNameMatched:{
        fontSize: 18,
        fontWeight: "500",
        color: commonStyles.primaryColor.color
    },
    searchNotEmptyAllContactItemContentLocation:{
        fontSize: 16,
    },
    detailSearchPopUpSearchNotEmptyContactItemCallBtn:{
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: commonStyles.primaryColorBackground.backgroundColor 
    },
    detailSearchPopUpSearchNotEmptyContactItemCallBtnIcon:{
        width: 22,
        height: 22,
        resizeMode: "contain",
        tintColor: commonStyles.primaryColor.color
    },
    detailSearchPopUpSearchNotEmptyContactItemAddFriendBtn:{
        paddingVertical: 5,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: commonStyles.primaryColorBackground.backgroundColor
    },
    detailSearchPopUpSearchNotEmptyContactItemAddFriendText:{
        fontSize: 16,
        fontWeight: "500",
        color: commonStyles.primaryColor.color
    },
    searchNotEmptyAllContactItemContentInGroupWrapper:{
        flexDirection: "row",
    },
    searchNotEmptyAllContactItemContentInGroupNormal:{
        fontSize: 16
    },
    searchNotEmptyAllContactItemContentInGroupMatched:{
        fontSize: 16,
        color: commonStyles.primaryColor.color,
        fontWeight: "500"
    },
    detailSearchPopUpSearchEmptyBtnSeeMore:{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        justifyContent: "center"
    },
    detailSearchPopUpSearchEmptyBtnSeeMoreText:{
        fontSize: 16,
        fontWeight: "500",
    },
    detailSearchPopUpSearchNotEmptyAllMessageList:{
        flexDirection: "column",
    },
    detailSearchPopUpSearchNotEmptyAllMessageItem:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    detailSearchPopUpSearchNotEmptyAllMessageItemAvatar:{
        width: 53,
        height: 53,
        borderRadius: 50,
        resizeMode: "cover"
    },
    detailSearchPopUpSearchNotEmptyAllMessageItemContent:{
        flexDirection: "column",
        flexGrow: 1,
        flexShrink: 1,
    },
    detailSearchPopUpSearchNotEmptyAllMessageItemName:{
        fontSize: 18,
    },
    detailSearchPopUpSearchNotEmptyAllMessageContent:{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 2,
    },
    detailSearchPopUpSearchNotEmptyAllMessageContentNormal:{
        fontSize: 16,
    },
    detailSearchPopUpSearchNotEmptyAllMessageContentMatched:{
        fontSize: 16,
        color: commonStyles.primaryColor.color,
        fontWeight: "600"
    },
    searchNotEmptyAllMessageMatchedResultWrapper:{
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        marginTop: 2,
    },
    detailSearchPopupSearchEmptyAllMatchedNumberTotal:{
        fontSize: 17,
        fontWeight: "500",
    },
    detailSearchPopupSearchEmptyAllMatchedNumberTitle:{
        fontSize: 16
    },
    detailSearchPopUpSearchNotEmptyAllMessageTime:{
        fontSize: 16,
    },
    detailSearchPopupSearchEmptyMessageWrapper:{
        flexDirection: "row",
        gap: 20,
        paddingHorizontal: 15,
        marginTop: 15
    },
    detailSearchPopupSearchEmptyMessageTypeFilter:{
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 25,
        borderRadius: 20,
    },
    detailSearchPopupSearchEmptyMessageTypeFilterCheckbox:{
        width: 26,
        height: 26,
        resizeMode: "contain",
        borderRadius: 50,
        fontSize: 14,
    },
    detailSearchPopupSearchEmptyMessageTypeFilterText:{
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 3,
    },
    detailSearchPopupSearchEmptyMessageList:{
        flexDirection: "column",
        marginTop: 10,
        paddingHorizontal: 15
    },
    searchNotEmptyMessageFilterLinkWrapper:{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderWidth: 1,
        gap: 5
    },
    searchNotEmptyMessageFilterLinkImage:{
        width: 45,
        height: 45,
        borderRadius: 4,
        resizeMode: "cover"
    },
    searchNotEmptyAllMessageItemContentNameWrapper:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 5,
    },
    searchNotEmptyMessageFilterLinkContent:{
        flexGrow: 1,
        flexShrink: 1,
    },
    searchNotEmptyMessageFilterLinkAddress:{
        fontSize: 17,
        fontWeight: "500",
        color: commonStyles.primaryColor.color
    },
    searchNotEmptyMessageFilterLinkDesc:{
        fontSize: 17,
        fontWeight: "500",
    },
    searchNotEmptyMessageFilterFileName:{
        fontSize: 18,

    },
    searchNotEmptyMessageFilterFileSize:{
        fontSize: 16,
    }
})