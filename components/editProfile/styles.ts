import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    editProfileWrapper:{
        flex: 1,
        
    },
    editProfileContainer:{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    editProfileTitle:{
        fontSize: 20,
        fontWeight: "500"
    },
    editProfileDescription:{
        fontSize: 15,
    },
    editProfileGeneralInformation:{
        marginTop: 25,
        fontSize: 15,
        marginBottom: 20
    },
    editProfileGeneralInformationBox:{
        marginBottom: 30,
        position: "relative",
        borderWidth: 1,
    },
    editProfileGeneralInformationInputTitle:{
        position: "absolute",
        top: -10,
        left: 10,
        zIndex: 1,
        paddingHorizontal: 4
    },
    editProfileGeneralInformationInput:{
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 15,
        borderRadius: 6
    },
    editProfileRadioButtonBox:{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 12
    },
    editProfileGeneralInformationGenderName:{
        fontSize: 15,
        marginLeft: 10,
        marginRight: 20
    },
    editProfileDateOfBirthTitle:{
        paddingHorizontal: 10,
        paddingVertical: 12
    },
    editProfileGeneralInformationGeneralBtn:{
        width: "100%",
        alignItems: "center",
        marginBottom: 15
    },
    editProfileGeneralInformationGeneralSaveBtn:{
        textAlign: "center",
        fontSize: 17,
        fontWeight: "500",
        width: "100%",
        paddingVertical: 10,
        borderRadius: 6,
    },
    editProfileGeneralInformationGeneralCancelBtn:{
        textAlign: "center",
        fontSize: 17,
        fontWeight: "500",
        width: "100%",
        paddingVertical: 10,
        borderRadius: 6,
    }
})