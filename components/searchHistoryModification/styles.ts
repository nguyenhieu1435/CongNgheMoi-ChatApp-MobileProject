import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    searchHistoryModificationWrapper:{
        flex: 1,
    },
    searchHistoryModificationContainer:{
        flex: 1,
    },
    searchHistoryModificationHeader:{
        flexDirection: "row",
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
    },
    searchHistoryModificationBackBtn:{
        paddingVertical: 10,
    },
    searchHistoryModificationBackIcon:{
        width: 27,
        height: 27,
        resizeMode: "contain"
    },
    searchHistoryModificationTitle:{
        flexGrow: 1,
        flexShrink: 1,
        fontSize: 20,
        fontWeight: '500',
    },
    searchHistoryBodyTitle:{
        fontSize: 18,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        fontWeight: "500"
    },
    searchHistoryBodySettingBox:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    searchHistoryBodySettingTitle:{
        fontSize: 17,
    },
    searchHistoryContactSearchedList:{
        flexDirection: "column",
        gap: 15,
        paddingHorizontal: 20,
    },
    searchHistoryContactSearchedItem:{
        flexDirection: "row",
        gap: 15,
        alignItems: "center"
    },
    searchHistoryContactSearchedAvatar:{
        width: 28,
        height: 28,
        resizeMode: "cover",
        borderRadius: 100,
    },
    searchHistoryContactSearchedName:{
        flexGrow: 1,
        flexShrink: 1,
        fontSize: 16,
    },
    searchHistoryContactSearchedRemoveBtn:{
        paddingVertical: 5,
        paddingLeft: 5
    },
    searchHistoryContactSearchedRemoveIcon:{
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    searchHistoryKeywordSearchedAvatar:{
        width: 20,
        height: 20,
        resizeMode: "contain",
        borderRadius: 100,
    }
})