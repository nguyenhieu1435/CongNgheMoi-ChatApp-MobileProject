import { StyleSheet } from "react-native";

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
    }
})