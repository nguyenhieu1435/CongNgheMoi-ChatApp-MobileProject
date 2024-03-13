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
        flexGrow: 1,
        flexShrink: 1,
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
    chatDetailMessageFromOpponentMainTypingContainer:{
        width: "45%",
    },
    chatDetailMessageFromOpponentInfoBox:{
        paddingHorizontal: 20,
        backgroundColor: commonStyles.secondColor.color,
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
        borderBottomColor: commonStyles.secondColor.color,
        left: 0,
        bottom: -8,
        transform: [{
            rotateX: "180deg"
        }]
    },
    chatDetailMessageFromOpponentMoreActionBox:{
       height: 25,
       position: "relative",
       zIndex: 400
    },
    chatDetailTooltipPopupContent:{
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 3
    },
    chatDetailTooltipPopupContentArrowNone:{
        width: 0,
        height: 0,
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
    },
    chatDetailBottomMoreActionWrapper:{
        width: "100%",
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    chatDetailBottomActionWrapper:{
        width: "25%",
        alignItems: "center",
        justifyContent: "center",
    },
    chatDetailBottomActionBtn:{
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 10
    },
    chatDetailBottomActionImg:{
        width: 35,
        height: 35,
        resizeMode: "contain",
        marginBottom: 4
    },
    chatDetailBottomActionText:{
        fontSize: 14,

    },
    chatDetailReactionListPopupWrapper:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    chatDetailReactionListPopupTitle:{
        fontWeight: "500",
        fontSize: 16,
    },
    chatDetailReactionListBtnClose:{
        width: 25,
        height: 25,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    chatDetailReactionListBtnCloseIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    chatDetailPopupReactionItem:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "100%"
    },
    chatDetailPopupReactionItemAvatar:{
        width: 38,
        height: 38,
        resizeMode: "contain",
        borderRadius: 50
    },
    chatDetailPopupReactionItemMainContent:{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        paddingVertical: 8,
    },
    chatDetailPopupReactionItemMainContentUsername:{
        fontWeight: "500",
        fontSize: 16
    },
    chatDetailPopupReactionItemMainContentRemove:{
        fontSize: 13
    },
    chatDetailPopupReactionItemMainContentIcon:{
        resizeMode: "contain",
        width: 25,
        height: 25,

    },
    chatDetailReactionListFilterWrapper:{
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        gap: 15,
        flexDirection: "row"
    },
    chatDetailReactionListFilterBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20
    },
    chatDetailReactionListFilterBtnText:{
        fontSize: 16,
        fontWeight: "500"
    }
})