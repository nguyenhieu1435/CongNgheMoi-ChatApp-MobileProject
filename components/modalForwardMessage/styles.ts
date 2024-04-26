import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    modalContainer:{
        flex: 1
    },
    modalHeaderContainer:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    closeBtn:{
        width: 28,
        height: 28,
        resizeMode: "contain"
    },
    modalHeaderTitle:{
        fontSize: 20,
        fontWeight: "600"
    },
    modalHeaderSelectedNumberText:{
        fontSize: 15
    },
    modalBodyContainer:{
        flexShrink: 1,
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    searchInputContainer:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderRadius: 8,
        paddingHorizontal: 15
    },
    searchIcon:{
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    searchTextInput:{
        flexGrow: 1,
        flexShrink: 1,
        fontSize: 16,
        paddingVertical: 5
    },
    modalControlGroupContainer:{
        paddingBottom: 10
    },
    modalControlGroupTriggerContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    sendMessageBtn:{
        width: 50,
        height: 50,
        backgroundColor: commonStyles.primaryColor.color,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    messageText:{
        flexGrow: 1,
        flexShrink: 1,
        fontSize: 15
    },
    sendMessageBtnIcon:{
        width: 23,
        height: 23,
        resizeMode: "contain",
        tintColor: commonStyles.darkPrimaryText.color
    },
    createGroupSelectedMemberContainer:{
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginVertical: 12
    },
    createGroupSelectedMemberAvatar:{
        width: 48,
        height: 48,
        borderRadius: 100,
        resizeMode: "cover"
    },
    createGroupSelectedMemberInfo:{
        flexShrink: 1,
        flexGrow: 1,

    },
    createGroupSelectedMemberName:{
        fontSize: 18
    },
    contactDetailFriendListCharacterClassification:{
        fontSize: 19,
        fontWeight: "500",
        color: commonStyles.primaryColor.color
    },
    titleList:{
        fontSize: 17,
        fontWeight: "600",
        paddingVertical: 5
    }
})