import { StyleSheet } from "react-native";

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
    }
})