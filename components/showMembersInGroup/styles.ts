import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    managingGroupHeaderBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    managingGroupHeaderGoBackBtn:{
        width: 30,
        height: 30,
    },
    managingGroupHeaderTitle:{
        fontSize: 20,
        fontWeight: "500",
    },
    showMembersItem:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 5
    },
    showMembersAvatarContainer:{
        width: 65,
        height: 65,
        borderRadius: 50,
        position: "relative"
    },
    showMembersAvatarImage:{
        width: "100%",
        height: "100%",
    },
    showMembersAvatarKeyContainer:{
        position: "absolute",
        width: 20,
        height: 20,
        borderRadius: 20,
        bottom: 2,
        right: 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: commonStyles.chatNavbarBorderBottomColorLight.color
    },
    showMembersAvatarKeyImage:{
        height: 20,
        width: 20,
    },
    showMembersItemName:{
        fontSize: 18,
        fontWeight: "600"
    },
    showMembersActionBox:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    }
})