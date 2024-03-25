import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    contactsInPhoneWrapper:{
        flex: 1,
    },
    contactsInPhoneContainer:{
        flex: 1,
    },
    contactsInPhoneHeader:{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        gap: 10,
        borderBottomWidth: 1,

    },
    contactsInPhoneBackBtn:{
        paddingVertical: 10,
    },
    contactsInPhoneBackBtnIcon:{
        width: 28,
        height: 28,
    },
    contactsInPhoneContainerTitle:{
        flexGrow: 1,
        flexShrink: 1,
        fontSize: 20,
        fontWeight: "500"
    },
    contactsInPhoneLatestUpdateContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: "center"
    },
    contactsInPhoneLatestUpdateLeftContainer:{
        flexDirection: "column",

    },
    contactsInPhoneLatestUpdateLeftFlowRow:{
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    latestUpdateLeftFlowRowText:{
        fontSize: 17,
    },
    latestUpdateLeftFlowRowInfoIcon:{
        width: 18,
        height: 18,
        resizeMode: "contain"
    },
    latestUpdateLeftTimeText:{
        fontSize: 18,
        fontWeight: "500"
    },
    contactsInPhoneLatestUpdateBtn:{
        width: 44,
        height: 44,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    contactsInPhoneLatestUpdateBtnIcon:{
        width: 23,
        height: 23,
        resizeMode: "contain"
    },
    contactsInPhoneLineBreak:{
        width: "100%",
        height: 8,

    },
    contactsInPhoneListContainer:{
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    contactsInPhoneListHeader:{
        gap: 20,
        paddingHorizontal: 20,
    },
    contactsInPhoneListSearchBox:{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        borderRadius: 6,
        gap: 10,
    },
    contactsInPhoneListSearchIcon:{
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    contactsInPhoneListSearchInput:{
        paddingVertical: 7,
        flexGrow: 1,
        flexShrink: 1,
        fontSize: 16
    },
    contactsInPhoneListFilterContainer:{
        flexDirection: "row",
        gap: 15,
        alignItems: "center"
    },
    contactsInPhoneListFilterBtn:{
        borderRadius: 25,
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderWidth: 1,
    },
    contactsInPhoneListFilterBtnText:{
        fontSize: 17,
        fontWeight: "500"
    },
    contactsInPhoneListContactItem:{
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    contactsInPhoneListContactAvatar:{
        width: 53,
        height: 53,
        borderRadius: 50,
        resizeMode: "cover"
    },
    contactsInPhoneListContactInfo:{
        flexGrow: 1,
        flexShrink: 1,
    },
    contactsInPhoneNameInDevice:{
        fontSize: 17,
        fontWeight: "500",
        marginBottom: 2,
    },
    contactsInPhoneNameInApp:{
        fontSize: 16,

    },
    contactsInPhoneAddFriendBtn:{
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 40,
    },
    contactsInPhoneBackBtnText:{
        fontSize: 16,
        fontWeight: "500"
    },
    contactsInPhoneListSectionTitle:{
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: 18,
        fontWeight: "500",
    }
})