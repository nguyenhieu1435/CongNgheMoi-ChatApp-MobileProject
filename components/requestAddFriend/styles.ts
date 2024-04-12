import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    requestAddFriendContainer:{
        flex: 1,

    },
    requestAddFriendSafeArea:{
        flex: 1,
    },
    requestAddFriendHeader:{
        flexDirection: "row",
        alignContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 10,
        backgroundColor: commonStyles.primaryColor.color
    },
    requestAddFriendCloseIcon:{
        width: 27,
        height: 27,
        resizeMode: "contain",
        tintColor: commonStyles.darkPrimaryText.color
    },
    requestAddFriendPageTitle:{
        fontSize: 20,
        fontWeight: "500",
        flex: 1,
        color: commonStyles.darkPrimaryText.color
    },
    requestAddFriendBody:{
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    requestAddFriendUser:{
        flexDirection :"row",
        alignItems: "center",
        gap: 15,
        marginBottom: 15
    },
    requestAddFriendUserAvatar:{
        width: 55,
        height: 55,
        borderRadius: 25,
        resizeMode: "cover"
    },
    requestAddFriendUserName:{
        fontWeight: "500",
        fontSize: 18
    },
    requestAddFriendInputContainer:{
        position: "relative",

    },
    requestAddFriendTextInput:{
        fontSize: 18,
        textAlignVertical: "top",
        marginRight: 20
    },
    requestAddFriendClearTextBtn:{
        position: "absolute",
        right: 0,
        top: 5
    },
    requestAddFriendClearTextIcon:{
        padding: 5,
        resizeMode: "contain"
    },
    requestAddFriendTextLength:{
        width: "100%",
        textAlign: "right",
        fontSize: 15
    },
    requestAddFriendSendRequestBtn:{
        marginTop: 15,
        width: "80%",
        alignSelf: "center",
    },
    requestAddFriendSendRequestText:{
        textAlign: "center",
        padding: 10,
        fontSize: 18,
        fontWeight: "500",
        color: commonStyles.lightPrimaryText.color,
        borderRadius: 20
    }

})