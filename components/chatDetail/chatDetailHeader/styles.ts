import { StyleSheet } from "react-native";
import commonStyles from "../../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    btnGoback:{
        padding: 10,
        marginRight: 10
    },
    chatDetailNavbarContainer:{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
    chatDetailNavbar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        paddingVertical: 7
    },
    chatDetailNavbarUsernameBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flexShrink: 1,
        flexGrow: 1,
        
    },
    chatDetailUsernameTextBox:{
        flexShrink: 1,
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    chatDetailUsernameText:{
        fontSize: 16,
        fontWeight: "500",  
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
    pinnedMessageIcon:{
        width: 27,
        height: 27,
        resizeMode: "contain",
        tintColor: commonStyles.primaryColor.color
    },
    pinnedMessageContainer:{
        width: "100%",
        zIndex: 1
    },
    pinnedMessagePreviewBox:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderBottomWidth: 1
    },
    pinnedContentMessageBox:{
        flexShrink: 1,
        flexGrow: 1,
    },
    pinnedMessageOtherActionBox:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    pinnedMessageMoreActionImg:{
        width: 22,
        height: 22,
        resizeMode: "contain"
    },
    pinnedMessageSeeMorePinMessageBtn:{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: commonStyles.primaryColor.color,
        paddingHorizontal: 10
    },
    itemInMessageFromOpponentPopupAction:{
        paddingHorizontal: 10,
        marginVertical: 3
    },
    itemInMessageFromOpponentPopupActionText:{
        fontSize: 15
    }

})

