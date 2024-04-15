import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    addFriendIntoGroupWrapper: {
        flex: 1
    },
    addFriendIntoGroupContainer:{
        flex: 1,
        position: "relative"
    },
    addFriendIntoGroupHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    addFriendIntoGroupHeaderBtnBack:{
        paddingHorizontal: 5,
        marginRight: 10
    },
    addFriendIntoGroupHeaderBtnBackImage:{
        width: 28,
        height: 28,
        resizeMode: "contain"
    },
    addFriendIntoGroupHeaderTitle:{
        fontSize: 20,
        fontWeight: "600"
    },
    addFriendIntoGroupHeaderText:{
        fontSize: 15,
    },
    addFriendIntoGroupSearchContainer:{
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 6,
        gap: 10,
        marginHorizontal: 10
    },
    addFriendIntoGroupSearchIcon:{
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    addFriendIntoGroupSearchInput:{
        flexGrow: 1,
        flexShrink: 1,
        fontSize: 18,
        paddingVertical: 6
    },
    addFriendIntoGroupClearInputBtn:{
        width: 23,
        height: 23,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    addFriendIntoGroupInputBtnImage:{
        width: 18,
        height: 18,
        resizeMode: "contain",
    },
    addFriendIntoGroupChooseTypeBtn:{
        borderRadius: 4,
        borderWidth: 1,
    },
    addFriendIntoGroupTypeBtnText:{
        fontSize: 12,
        paddingVertical: 1,
        paddingHorizontal: 3
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
    createGroupUserListSelectedPopup: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        paddingHorizontal: 15,
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 7
    },
    createGroupSelectedMemberList:{
        flexShrink: 1,
        flexGrow: 1,
    },
    createGroupSelectedMemberRemoveBtnContainer:{
        position: "relative",
        marginRight: 15
    },
    createGroupSelectedMemberRemoveBtn:{
        width: 20,
        height: 20,
        borderRadius: 100,
        position: "absolute",
        top: 0,
        right: -4,
        alignItems: "center",
        justifyContent: "center"
    },
    createGroupSelectedMemberRemoveBtnImage:{
        width: 16,
        height: 16,
        resizeMode: "contain",
        
    },
    createGroupUserListNextStepBtn:{
        width: 48,
        height: 48,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: commonStyles.primaryColor.color
    },
    createGroupUserListNextStepBtnImage:{
        width: 30,
        height: 30,
        resizeMode: "contain",
        tintColor: commonStyles.darkPrimaryText.color
    }
})