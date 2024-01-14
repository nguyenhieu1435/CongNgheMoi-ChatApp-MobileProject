import { Dimensions, StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    } ,
    container: {
        flex: 1,
        position: "relative"
    },
    boxImageBackground: {
        position: "absolute",
        width: "100%",
        height: 200,
        marginTop: 100,
        opacity: 0.4,
        alignItems: "center"
    },
    topLayout: {
        flex: 6,
        width: WIDTH,
    },
    botLayout: {
        flex: 4,
        width: WIDTH,
    },
    boxLogoContainer: {
        width: WIDTH,
        height: 80,
        flexGrow: 0
    },
    boxLogoHeader: {
        alignItems: "center",
        width: WIDTH,
    },
    imgLogoHeader: {
        width: 150,
        height: "100%",
        resizeMode: "cover",
    },
    sliderContainer: {
        marginTop: 30,
        flexGrow: 0,
        width: WIDTH,
    },
    itemSlide: {
        width: WIDTH,
        alignItems: "center"
    },
    imageSlider: {
        width: WIDTH * 0.9,
        height: 220,
        marginHorizontal: "auto"
    },
    titleSliderItem: {
        textAlign: "center",
        fontSize: 17,
        fontWeight: "500",
    },
    descriptionSliderItem: {
        fontSize: 15,
        marginTop: 10,
        textAlign: "center",
        paddingHorizontal: 30,
        color: "#666"
    },
    listDotOfSlide:{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20
    },
    dotOfSlide: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
        backgroundColor: "#ccc"
    },
    activeDotOfSlide:{
        backgroundColor: commonStyles.primaryColor.color
    },
    boxBtnWrapper:{
        marginTop: "auto",
        width: WIDTH,
        paddingHorizontal: 50
    },
    btnLogin: {
        backgroundColor: commonStyles.primaryColor.color,
        paddingVertical: 15,
        borderRadius: 25,
        marginBottom: 15
    },
    btnTextLogin: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 16
    },
    btnRegister: {
        backgroundColor: commonStyles.lightSecondaryBackground.backgroundColor,
        paddingVertical: 15,
        borderRadius: 25,
    },
    btnTextRegister: {
        color: commonStyles.lightPrimaryText.color,
        textAlign: "center",
        fontWeight: "500",
        fontSize: 16
    },
    boxChooseLanguage: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    btnLanguage: {
        paddingHorizontal: 10,
    },
    btnTextLanguage: {
        fontSize: 14,
        fontWeight: "500",
        color: "#999",
        paddingVertical: 10,
    },
    languageActive: {
        color: commonStyles.lightPrimaryText.color,
        borderBottomWidth: 1,
    }
})