import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    chatListWrapper: {
        flex: 1,
        position: "relative"
    },
    chatListContainer: {
        flex: 1,
        padding: 10,
        paddingBottom: 0,
        position: "relative",
    },
    chatListHeader: {
        padding: 10,
    },
    chatListTitleName: {
        fontSize: 24,
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
        paddingBottom: 0
    },
    chatListHistoryTitle:{
        fontSize: 17,
        fontWeight: "500",
        paddingVertical: 10
    },
    chatListHistoryScroll:{
        flex: 1,
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
        fontSize: 12,
        textAlign: "center",
        color: commonStyles.redPrimaryColor.color,
        backgroundColor: commonStyles.redPrimaryBackground.backgroundColor,
        width: 30, 
        borderRadius: 8,
        paddingVertical: 1,
    },
    chatListHeaderMain:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    chatListHeaderIconBox:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    chatListHeaderImgIcon:{
        width: 30,
        height: 30,
        borderRadius: 50,
    },
    chatListHeaderPopUpRightContainer:{
        position: "relative",
        zIndex: 20,
    },
    chatListHeaderPopUpRight:{
        position: "absolute",
        right: 0,
        top: "130%",
        padding: 10,
        borderRadius: 6,
        zIndex: 20,
        width: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    chatListHeaderPopUpRightText:{
        fontSize: 15,
        paddingVertical: 5,
        marginBottom: 4,
    },
    chatListHeaderPopUpRightTriangle:{
        position: "absolute",
        top: -8,
        right: 5,
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderLeftColor: "transparent",
        borderRightWidth: 10,
        borderRightColor: "transparent",
        borderBottomWidth: 10,
    },
    chatListHeaderPopUpRightBtn:{
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    chatListHeaderPopUpRightIcon:{
        width: 20,
        height: 20,
    },
    chatListModalScanQR:{
        flex: 1,
    },



    detailSearchPopUpWrapper:{
        position: "absolute",
        right: 0,
        left: 0,
        flex: 1,
        top: 0,
        bottom:0,
        marginTop: 93 + 10 + 15,
        backgroundColor: "red",
        zIndex: 20
    }
    
})