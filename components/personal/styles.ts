import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    personalHeaderWrapper:{
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30
    },
    personalHeaderMorePopup:{
        position: "absolute",
        right: 0,
        width: 130,
        top: "100%",
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    personalHeaderMorePopupItemText:{
        paddingVertical: 5,
        fontSize: 15,
    },
    personalHeaderWrapperMore:{
        width: 20,
        height: 20,
    },
    personalHeaderWrapperTitle:{
        fontSize: 22,
        fontWeight: "bold"
    },
    personalWrapper:{
        flex: 1,
    },
    personalBoxClose:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    personalHeaderBox:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingHorizontal: 10
    },
    editNewAvatarBtn:{
        position: "relative"
    },
    personalAvatarImage:{
        width: 95,
        height: 95,
        borderRadius: 100,
        marginBottom: 10,
        borderWidth: 2,
    },
    personalEditAvatarIconBox:{
        position: "absolute",   
        bottom: 10,
        right: 5,
        padding: 5,
        borderRadius: 30
    },
    personalEditAvatarIcon:{
        width: 17,
        height: 17,
        borderRadius: 15,
        resizeMode: "contain",
    },
    personalUsernameText:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    personalActivityBox:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },
    personalActivityText:{
        fontSize: 15,

    },
    personalActivityIcon:{
        width: 8,
        height: 8,
        borderRadius: 50,

    },
    personalScrollBox:{
        flexGrow: 1,
        padding: 10,
    },
    personalDescriptionText:{
        fontSize: 15,
        lineHeight: 20,
    },
    chatDetailCollapsibleBox:{
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 4,
        marginTop: 10,
    },
    personalToggleDetailBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    personalToggleDetailLeft:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 6,
    },
    personalColabsibleIconLeft:{
        width: 18,
        height: 18,
        resizeMode: "contain",
    },
    personalColabsibleText:{
        fontSize: 15,
        fontWeight: "500"
    },
    personalColabsibleIconRight:{
        width: 18,
        height: 18,
        resizeMode: "contain",
    },
    personalAboutItemBox:{
        flexDirection: "column",
        paddingBottom: 5,
        marginBottom: 10
    },
    personalAboutItemTitle:{
        fontSize: 15,
        marginBottom: 2,
    },
    personalAboutItemValue:{
        fontSize: 15,
        fontWeight: "500"
    },
    personalFilesList:{
        flexDirection: "column"
    },
    personalFilesItem:{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 8,
        gap: 10,
    },
    settingItem:{
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 8,
        gap: 10,
    },
    personalFilesItemImgBox:{
        width: 48,
        height: 48,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    personalFilesItemInfoBox:{
        flexGrow: 1,
    },
    personalFilesItemFileName:{
        fontSize: 15,
        fontWeight: "500"
    },
    personalFilesItemFileSize:{
        fontSize: 14,
        fontWeight: "500"
    },
    personalSecondIcon:{
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    personalMemberList:{
        flexDirection: "column",
        marginBottom: 10,
    },
    personalMemberItem:{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        gap: 10,
    },
    personalMemberAvatar:{
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    personalMemberName:{
        fontSize: 15,
        fontWeight: "500"
    },
    personalMemberRole:{
        fontSize: 12,
        fontWeight: "500",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    personalSettingThemeTextTitle:{
        fontSize: 15,
        fontWeight: "500"
    }
})