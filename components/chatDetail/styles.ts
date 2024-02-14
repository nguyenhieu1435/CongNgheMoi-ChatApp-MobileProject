import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    chatDetailWrapper: {
        flex: 1,
        
    },
    chatDetailContainer: {
        flex: 1,
        position: "relative",
    },
    btnGoback:{
        padding: 10,
        marginRight: 10
    },
    chatDetailNavbar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        paddingVertical: 7
    },
    chatDetailNavbarUsernameBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    chatDetailUsernameText:{
        fontSize: 16,
        fontWeight: "500"
    },
    activityIcon: {
        width: 8,
        height: 8,
        borderRadius: 100,
    },
    chatDetailNavbarBaseActions:{
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        flexGrow: 1,
        marginLeft: 10,
        justifyContent: "flex-end"
    },
    chatDetailNavbarBaseActionItemBox: {
        position: "relative",

    },
    chatDetailNavbarBaseActionItemPopup: {
        borderRadius: 8,
        padding: 8,
        position: "absolute",
        right: 0,
        top: 40,
    },
    chatDetailNavbarBaseActionItePopupInput:{
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 6,
        width: 160,
        height: 40,
        fontSize: 15,
        zIndex: 999
    },
    chatDetailNavbarBaseActionMoreItemPopup:{
        position: "absolute",
        right: 0,
        top: 40,
        borderRadius: 4,
        paddingVertical: 10,
        gap: 12
    },
    chatDetailNavbarBaseActionMoreItem:{
        
        paddingHorizontal: 20,
        width: 159,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 4,
        justifyContent: "space-between"
    },
    navbarActionMoreItemText:{
        fontSize: 15,
    },
    chatDetailBottomWrapper:{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        borderTopWidth: 1,
    },
    chatDetailBottomContainer:{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 20,
        
    },
    textInputMessage:{
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 6,
        fontSize: 15,
        flexGrow: 1
    },
    bottomSecondActionImg:{
        width: 20, 
        height: 20,
        tintColor: commonStyles.primaryColor.color
    },
    bottomSendActionBox:{
        width: 48,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: commonStyles.primaryColor.color,
        borderRadius: 6
    },
    bottomSendActionImg:{
        width: 20,
        height: 20,
        tintColor: commonStyles.darkPrimaryText.color
    },
    chatDetailHistoryListWrapper:{
        flex: 1,
        paddingTop: 60,
        paddingBottom: 75,
        paddingHorizontal: 10
    },
    chatDetailAvatarImg:{
        width: 36,
        height: 36,
        borderRadius: 100
    },
    chatDetailMessageFromOpponentBox:{
        flexDirection: "row",
        alignItems: "flex-end",
        position: "relative",
        marginBottom: 10,
    },
    chatDetailMessageFromOpponentMainWrapper:{
        flexDirection: "row",
        marginTop: 10,
        marginRight: 43,
        marginLeft: 10,
        flex: 1,
        gap: 5,
    },
    chatDetailMessageFromOpponentMainContainer:{
       width: "100%",
    },
    chatDetailMessageFromOpponentInfoBox:{
        paddingHorizontal: 20,
        backgroundColor: commonStyles.primaryColor.color,
        paddingVertical: 10,
        borderRadius: 8,
        position: "relative",
        borderBottomLeftRadius: 0,
    },
    chatDetailMessageFromOpponentInfoTextBox:{
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    chatDetailMessageFromOpponentInfoText:{
        fontSize: 16,
        fontWeight: "500",
        color: commonStyles.darkPrimaryText.color
    },
    chatDetailMessageFromOpponentTimeInfoBox:{
        flexDirection: "row",
        marginLeft: "auto",
        alignItems: "center",
        marginTop: 4
    },
    chatDetailMessageFromOpponentTimeInfoClockImg:{
        width: 15,
        height: 15,
        tintColor: "#ffffff80"
    },
    chatDetailMessageFromOpponentTimeInfoClockMilesStone:{
        fontSize: 13,
        marginLeft: 5,
        color: "#ffffff80"
    },
    chatDetailMessageFromOpponentUsername:{
        fontSize: 15,
        fontWeight: "500",
        marginTop: 13
    },
    chatDetailMessageFromOpponentTriangle:{
        position: "absolute",
        width: 0,
        height: 0,
        borderLeftWidth: 0,
        borderRightWidth: 15,
        borderBottomWidth: 15,
        borderStyle: "solid",
        backgroundColor: "transparent",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: commonStyles.primaryColor.color,
        left: 0,
        bottom: -8,
        transform: [{
            rotateX: "180deg"
        }]
    },
    chatDetailMessageFromOpponentMoreActionBox:{
       height: 25,
       position: "relative",
        zIndex: 10
    },
    chatDetailMessageFromOpponentPopupActionBox:{
        position: "absolute",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 15,
        width: 180,
        zIndex: 35,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5
    },
    itemInMessageFromOpponentPopupAction:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    itemInMessageFromOpponentPopupActionText:{
        fontSize: 15,
    },
    itemInMessageFromOpponentPopupActionImg:{
        width: 18,
        height: 18,
    },
    chatDetailMessageFromMeBox:{
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 10,
        position: "relative",
        width: "100%"
    },
    chatDetailMessageFromMeMainWrapper:{
        flexDirection: "row",
        marginTop: 10,
        marginRight: 10,
        marginLeft: 43,
        flex: 1,
        gap: 5,
        justifyContent: "flex-end",
        width: "100%",
    },
    chatDetailMessageFromMeInfoBox:{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        borderBottomRightRadius: 0,
    },
    chatDetailMessageFromMeInfoText:{
        fontSize: 16,
        fontWeight: "500",
    },
    chatDetailMessageFromMeTimeInfoBox:{
        flexDirection: "row",
        marginRight: "auto",
        alignItems: "center",
        marginTop: 4
    },
    chatDetailMessageFromMeTimeInfoClockImg:{
        width: 15,
        height: 15,
    },
    chatDetailMessageFromMeTimeInfoClockMilesStone:{
        fontSize: 13,
        marginLeft: 5
    },
    chatDetailMessageFromMeUsername:{
        fontSize: 15,
        fontWeight: "500",
        marginTop: 13,
        textAlign: "right"
    },
    chatDetailMessageFromMeTriangle:{
        position: "absolute",
        width: 0,
        height: 0,
        borderLeftWidth: 15,
        borderRightWidth: 0,
        borderBottomWidth: 15,
        borderStyle: "solid",
        backgroundColor: "transparent",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        right: 0,
        bottom: -8,
        transform: [{
            rotateX: "180deg"
        }]
    },
    chatDetailMessageFromMeMoreActionBox:{
       height: 25,
       position: "relative",
       zIndex: 10,

    },
    timeLineBox: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    timeLineText: {
        fontSize: 14,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        zIndex: 1
    },
    timeLineLine: {
        position: "absolute",
        width: "100%",
        height: 1,
    },
    imageInChatHistory:{
        width: "100%",
        height: 140,
        borderRadius: 6,
        borderWidth: 1,
    },
    actionsWithImageInChatHistoryBox:{
        position: "absolute",
        right: 10,
        bottom: 10,
        flexDirection: "row",
        gap: 15,
    },
    actionWithImageInChatHistoryImg:{
        width: 20,
        height: 20,
        tintColor: commonStyles.darkPrimaryText.color
    },
    chatDetailMessageFromOpponentImageItem:{
        marginTop: 6,
        position: "relative",
    },
    chatDetailMessageFromOpponentImageBox:{
        flexDirection: "column"
    },
    fileBoxInChatHistory:{
        width: "100%",
        padding: 10,
        flexDirection: "row",
        borderRadius: 6,
        gap: 10,  
        alignItems: "center"
    },
    fileBoxInChatHistoryImgBox:{
        width: 48,
        height: 48,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    fileBoxInChatHistoryNameFile:{
        fontSize: 15,
        fontWeight: "500",
        flexShrink: 1,
    },
    fileBoxInChatHistoryFileImageIcon:{
        width: 20,
        height: 20,
    }
})