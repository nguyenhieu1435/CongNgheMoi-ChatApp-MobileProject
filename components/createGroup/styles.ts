import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    createGroupWrapper:{
        flex: 1,

    },
    createGroupContainer:{
        flex: 1,
        position: "relative"
    },
    createGroupHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    createGroupHeaderBtnBack:{
        paddingHorizontal: 5,
        marginRight: 10
    },  
    createGroupHeaderBtnBackImage:{
        width: 28,
        height: 28,
        resizeMode: "contain"
    },
    createGroupHeaderTitle:{
        fontSize: 20,
        fontWeight: "600"
    },
    createGroupSelectedMemberText:{
        fontSize: 15,
        
    },
    createGroupBodyMainScroll:{
        marginTop: 10,
        flexGrow: 1,
        flexShrink: 1,
    },
    createGroupChooseAvatarAndEnterNameContainer:{
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        paddingHorizontal: 10
    },
    createGroupChooseAvatarBtn:{
        width: 65,
        height: 65,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    createGroupChooseAvatarBtnImage:{
        width: 30,
        height: 30,
        resizeMode: "contain"
    },
    createGroupEnterNameContainer:{
        flexDirection: "row",
        alignItems: "center",
        flexShrink: 1,
        flexGrow: 1,
        gap: 15

    },
    createGroupEnterNameInputContainer:{
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        paddingVertical: 3
    },
    createGroupEnterNameInput:{
        fontSize: 18,
        flexGrow: 1,
        flexShrink: 1,
    },
    createGroupEnterNameEmojiBtn:{

    },
    createGroupEnterNameEmojiBtnImage:{
        width: 28,
        height: 28,
        resizeMode: "contain"
    },
    createGroupEnterNameConfirmBtn:{

    },
    createGroupEnterNameConfirmBtnImage:{
        width: 35,
        height: 35,
        resizeMode: "contain",
        tintColor: commonStyles.primaryColor.color
    },
    createGroupSearchContainer:{
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 6,
        gap: 10,
        marginHorizontal: 10
    },
    createGroupSearchIcon:{
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    createGroupSearchInput:{
        flexGrow: 1,
        flexShrink: 1,
        fontSize: 18,
        paddingVertical: 6
    },
    createGroupSearchChooseTypeBtn:{
        borderRadius: 4,
        borderWidth: 1,

    },
    createGroupSearchChooseTypeBtnText:{
        fontSize: 12,
        paddingVertical: 1,
        paddingHorizontal: 3
    },
    createGroupSearchClearInputBtn:{
        width: 23,
        height: 23,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",

    },
    createGroupSearchClearInputBtnImage:{
        width: 18,
        height: 18,
        resizeMode: "contain",
    },
    createGroupRecentAndContactFilterContainer:{
        width: "100%",
        borderBottomWidth: 1,
        flexDirection: "row",
        paddingHorizontal: 10,
        gap: 35,
        justifyContent: "center",
       
    },
    createGroupRecentAndContactFilterBtn:{
        flex: 1,
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "transparent"
    },
    createGroupRecentAndContactFilterBtnText:{
        paddingVertical: 12,
        fontSize: 16,
        fontWeight: "500"
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
    createGroupSelectedMemberActivityTime:{
        fontSize: 14
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