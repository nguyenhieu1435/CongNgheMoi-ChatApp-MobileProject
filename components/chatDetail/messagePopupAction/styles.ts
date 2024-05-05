import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    chatDetailMessageFromOpponentPopupActionBox:{
        // position: "absolute",
        borderRadius: 8,
        paddingHorizontal: 4,
        paddingVertical: 6,
        width: 180,
        // zIndex: 35,
        // shadowColor: '#171717',
        // shadowOffset: {width: 0, height: 3},
        // shadowOpacity: 0.4,
        // shadowRadius: 2,
        // elevation: 3
    },
    itemInMessageFromOpponentPopupAction:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    itemInMessageFromOpponentPopupActionText:{
        fontSize: 15,
    },
    itemInMessageFromOpponentPopupActionImg:{
        width: 18,
        height: 18,
    }
})