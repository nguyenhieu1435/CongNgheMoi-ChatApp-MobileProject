import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    addFriendSettingWrapper:{
        flex: 1,
    },
    addFriendSettingContainer:{
        flex: 1,
    },
    addFriendSettingHeaderBox:{
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
    },
    addFriendSettingHeaderBackButton:{
        paddingVertical: 10,
    },
    addFriendSettingHeaderBackButtonImage:{
        width: 28,
        height: 28,
        resizeMode: "contain"
    },
    addFriendSettingHeaderTitle:{
        fontWeight: "500",
        fontSize: 20,
        flexGrow: 1,
        flexShrink: 1,
    },
    addFriendSettingAllowAddFriendByPhonePermissionBox:{
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    addFriendSettingAllowAddFriendByPhonePermissionBoxMainContent:{
        flexGrow: 1,
        flexShrink: 1,
    },
    addFriendSettingAllowAddFriendByPhonePermissionBoxTitle:{
        fontSize: 18,
        marginBottom: 5
    },
    addFriendSettingAllowAddFriendByPhonePermissionBoxTel:{
        fontSize: 17,
    },
    addFriendSettingBreakLine:{
        height: 8,
        width: "100%"
    },
    addFriendSettingAnotherPermissionBox: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    addFriendSettingAnotherPermissionBoxTitle:{
        fontSize: 17,
        fontWeight: "700",
        color: commonStyles.primaryColor.color,
        marginBottom: 20
    },
    addFriendSettingAnotherPermissionBoxDesc:{
        fontSize: 16,
        marginBottom: 20
    },
    addFriendSettingAnotherPermissionBtn:{
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginBottom: 20
    },
    addFriendSettingAnotherPermissionBtnText:{
        fontSize: 18
    }


})