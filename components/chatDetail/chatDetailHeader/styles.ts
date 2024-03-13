import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
})

