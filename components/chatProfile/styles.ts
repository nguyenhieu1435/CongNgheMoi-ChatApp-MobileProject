import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    chatProfileWrapper:{
        flex: 1,
    },
    chatProfileBoxClose:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    chatProfileHeaderBox:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingHorizontal: 10
    },
    chatProfileAvatarImage:{
        width: 95,
        height: 95,
        borderRadius: 100,
        marginBottom: 10,
    },
    chatProfileUsernameText:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    chatProfileActivityBox:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },
    chatProfileActivityText:{
        fontSize: 15,

    },
    chatProfileActivityIcon:{
        width: 8,
        height: 8,
        borderRadius: 50,

    },
    chatProfileScrollBox:{
        flexGrow: 1,
        padding: 10,
    },
    chatProfileDescriptionText:{
        fontSize: 15,
        lineHeight: 20,
    },
    chatDetailCollapsibleBox:{
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 4,
        marginTop: 10,
    },
    chatProfileToggleDetailBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    chatProfileToggleDetailLeft:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 6,
    },
    chatProfileColabsibleIconLeft:{
        width: 18,
        height: 18,
        resizeMode: "contain",
    },
    chatProfileColabsibleText:{
        fontSize: 15,
        fontWeight: "500"
    },
    chatProfileColabsibleIconRight:{
        width: 18,
        height: 18,
        resizeMode: "contain",
    },
    chatProfileAboutItemBox:{
        flexDirection: "column",
        paddingBottom: 5,
        marginBottom: 10
    },
    chatProfileAboutItemTitle:{
        fontSize: 15,
        marginBottom: 2,
    },
    chatProfileAboutItemValue:{
        fontSize: 15,
        fontWeight: "500"
    },
    chatProfileFilesList:{
        flexDirection: "column"
    },
    chatProfileFilesItem:{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 8,
        gap: 10,
    },
    chatProfileFilesItemImgBox:{
        width: 48,
        height: 48,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    chatProfileFilesItemInfoBox:{
        flexGrow: 1,
    },
    chatProfileFilesItemFileName:{
        fontSize: 15,
        fontWeight: "500"
    },
    chatProfileFilesItemFileSize:{
        fontSize: 14,
        fontWeight: "500"
    },
    chatProfileSecondIcon:{
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    chatProfileMemberList:{
        flexDirection: "column",
        marginBottom: 10,
    },
    chatProfileMemberItem:{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        gap: 10,
    },
    chatProfileMemberAvatar:{
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    chatProfileMemberName:{
        fontSize: 15,
        fontWeight: "500"
    },
    chatProfileMemberRole:{
        fontSize: 12,
        fontWeight: "500",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    }
})