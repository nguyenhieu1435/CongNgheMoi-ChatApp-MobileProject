import { StyleSheet } from "react-native";
import commonStyles from "../../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    chatDetailBottomWrapper:{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        borderTopWidth: 1,
    },
    chatDetailReplyMessageContainer:{
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingBottom: 4,
        paddingTop: 8,
        width: "100%"
    },
    
    chatDetailReplyVerticalLeftLine:{
        height: "100%",
        marginRight: 10,
        width: 2,
        backgroundColor: commonStyles.primaryColor.color,
    },
    chatDetailReplyMessageContainerBox:{
        flexGrow: 1,
        flexShrink: 1,
        position: "relative"
    },
    chatDetailReplyMessageContentHeader:{
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    chatDetailReplyMessageContentHeaderImg:{
        width: 18, 
        height: 18,
        resizeMode: "contain",
    },
    chatDetailReplyMessageContentHeaderText:{
        fontSize: 15,
    },
    chatDetailReplyMessageContentHeaderUsername:{
        fontWeight: "600"
    },
    chatDetailReplyMessageContentBody:{
        fontSize: 15,
        marginTop: 2,
        marginRight: 10
    },
    chatDetailReplyMessageCloseReplyBtn:{
        position: "absolute",
        right: -15,
        top: 0,
        padding: 10
    },
    chatDetailReplyMessageCloseReplyImg:{
        width: 20,
        height: 20,
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
        fontSize: 15,

    },
    searchStickerContainer:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10
    },
    searchStickerContainerImg:{
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    searchStickerContainerInput:{
        fontSize: 15,
        paddingVertical: 2,
    },
    stickerCategoryTitle:{
        fontWeight: "500",
        fontSize: 16,
        marginBottom: 4
    },
    listStickerContainer:{
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        gap: 5
    },
    itemStickerBox:{
        // width: "23%",
        alignItems: "center",
        justifyContent: "center",
    },
    itemStickerBoxImage:{
        // width: 80,
        // height: 80,
        // position: "relative",
        // left: 0,
        // resizeMode: "cover",
        // top: 0,
        // objectFit: "cover",
        width: 120,
        height: 70,
        aspectRatio: 5,
        position: 'absolute',
        left: 0,
        top: 0,
    }
})