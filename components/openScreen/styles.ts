import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        position: "relative"
    },
    logoText:{
        backgroundColor: "transparent",
        position: "absolute",
        fontSize: 55,
        fontWeight: "bold",
        top: "50%",
        left: "50%",
        transform: [{translateX: -50}, {translateY: -50}]
    },
})