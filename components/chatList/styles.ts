import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    chatListWrapper: {
        flex: 1
    },
    chatListContainer: {
        flex: 1,
        padding: 10,
    },
    chatListHeader: {
        padding: 10,
    },
    chatListTitleName: {
        marginBottom: 20, 
        fontSize: 21,
        fontWeight: "500",
    },
    chatListBoxSearch: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 4,
        marginBottom: 18,
    },
    textInputSearchMsgOrUser: {
        paddingVertical: 10,
        flex: 1,
        fontSize: 15,
    },
    iconSearchMsgAndUser:{
        paddingHorizontal: 10,

    },
    friendActiveItemImageBox: {
        position: "relative",
    },
    friendActiveItemIconOnline:{
        position: "absolute",
        right: 2,
        bottom: 1,
        width: 10,
        height: 10,
        backgroundColor: commonStyles.activeOnlineColor.color,
        borderRadius: 50,
        borderWidth: 2,
    },
    friendActiveItemChild: {
        width: 75,
        alignItems: "center",
        position: "relative"
    },
    activeOnlineUserName: {
        fontSize: 14,
        fontWeight: "500",
        marginTop: 6
    },
    friendActiveItemLayout: {
        position: "absolute",
        width: "100%",
        height: 51,
        borderRadius: 6,
        top: 20,
    },
    friendActiveMainContentBox: {
        zIndex: 10
    },
    friendActiveItem: {
        height: 75,
        paddingHorizontal: 8
    },
    friendsActiveListBox: {
        marginHorizontal: -8
    },
    chatListHistoryBox: {
        padding: 10,
        flexGrow: 1,
    },
    chatListHistoryTitle:{
        fontSize: 17,
        fontWeight: "500",
        paddingVertical: 10
    },
    chatListHistoryScroll:{
     
    },
    chatListHistoryItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        marginBottom: 15
    },
    chatListHistoryUserName: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 2,
    },
    chatListHistoryPrevContentBox:{
        flexDirection: "row",
        gap: 4,
        alignItems: "center"
    },
    chatListHistoryPrevContent:{
        fontSize: 15,
    },
    chatListHistoryMainCol: {
        flexGrow: 1
    },
    chatListHistoryTime:{
        fontSize: 13,
        marginBottom: 3,
    },
    chatListHistoryMsgNumber: {
        fontSize: 13,
        textAlign: "center",
        color: commonStyles.redPrimaryColor.color,
        backgroundColor: commonStyles.redPrimaryBackground.backgroundColor,
        width: 30, 
        borderRadius: 8,
        paddingVertical: 1,
    },

    
})