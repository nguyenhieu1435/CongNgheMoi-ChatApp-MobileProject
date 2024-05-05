import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    managingGroupHeaderBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        position: "relative",
        zIndex: 1,
        top: 0,
        right: 0,
        left: 0,
    },
    managingGroupHeaderGoBackBtn:{
        width: 30,
        height: 30,
    },
    managingGroupHeaderTitle:{
        fontSize: 20,
        fontWeight: "500",
    },
    attachmentFilesWrapper:{
        marginTop: 15,
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    toggleShowAndHideBox:{
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    categoryIconForAttachment:{
        width: 18,
        height: 18,
        resizeMode: "contain"
    },
    categoryIconForAttachmentText:{
        flexShrink: 1,
        flexGrow: 1,
        fontSize: 16,
        fontWeight: "500"
    },
    showAndHideIcon:{
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    boxContaineAttachmentFiles:{
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    boxAttachmentFileItem:{
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    iconForFileBox:{
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4
    },
    iconForFileItem:{
        width: 23,
        height: 23,
        resizeMode: "contain"
    },
    textForFileItem:{
        fontSize: 15,
        fontWeight: "500",
        flexShrink: 1,
        flexGrow: 1
    },
    iconDownloadFileItem:{
        width: 23,
        height: 23,
        resizeMode: "contain"
    },
    boxContaineAttachmentImages:{
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        flex: 1,
        width: "100%",
        gap: 10
    },
    boxContaineAttachmentImgBtn:{
        width: "30%",
        height: 110,
        position: "relative",
    },
    boxContainerImageStyle:{
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    iconDownloadImgItem:{
        width: 23,
        height: 23,
        resizeMode: "contain",
        position: "absolute",
        bottom: 5,
        right: 5
    },
    chatDetailModalImageFullscreenHeader:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "black",
        zIndex: 20,
        paddingHorizontal: 10,
    },
    chatDetailModalImageFullscreenHeaderLeft:{
        flexDirection: "row",
        alignItems :"center"
    },
    chatDetailModalImageFullscreenCloseBtn: {
        paddingVertical: 10,
        paddingHorizontal: 2

    },
    chatDetailAvatarImg:{
        width: 36,
        height: 36,
        borderRadius: 100
    },
    contactDetailGroupItemBox:{
        flexDirection: "row",
        alignItems: "center",
        gap: 13,
        marginVertical: 10
    },
    contactDetailGroupItemAvatar:{
        width: 53,
        height: 53,
        borderRadius: 50,
    },
    contactDetailGroupItemContentBox:{
        flexGrow: 1,
        flexShrink: 1,
    },
    contactDetailGroupItemFirstTitleBox:{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginBottom: 2,
    },
    contactDetailGroupItemFirstTitleLeftText:{
        fontSize: 18,
        fontWeight: "500",
        flexShrink: 1,
        flexGrow: 1,
    },
    contactDetailGroupItemFirstTitleRightText:{
        fontSize: 15,
        fontWeight: "500"
    },
    contactDetailGroupItemSecondPreviewText:{
        fontSize: 16,
    },
})