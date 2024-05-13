import { StyleSheet } from 'react-native';
import commonStyles from '../../CommonStyles/commonStyles';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerSafeArea:{
        flex: 1,
        position: "relative"
    },
    imageBackground:{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: -1,
    },
    callingContainer:{
        flex: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    callingGroupContainer:{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    avatar:{
        width: 120,
        height: 120,
        borderRadius: 60,

    },
    actionContainer:{
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 30
    },
    callingTitle:{
        fontSize: 16,
        marginTop: 20,
        marginBottom: 5
    },
    callingUsername:{
        fontSize: 22,
        fontWeight: "bold",

    },
    speakerAndMicIconBtnStyle:{
        width: 50,
        height: 50,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    speakerAndMicIconStyle:{
        width: 30,
        height: 30,
        resizeMode: "contain",
    },
    endCallBtnStyle:{
        width: 75,
        height: 75,
        backgroundColor: commonStyles.redPrimaryColor.color,
        alignItems: "center",
        justifyContent:"center",
        borderRadius: 50,
    },
    endCallBtnIconStyle:{
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
    avatarInCall:{
        width: 75,
        height: 75,
        borderRadius: 60,
    },
    inCallHeader:{
        paddingHorizontal: 40,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    inCallTitle: {
        fontSize: 14,
        color: "#0ae695",
        marginTop: 25,
        marginBottom: 5,
        fontWeight: "500"
    },
    arrowRightContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 0
    },
    arrowRightStyle:{
        tintColor: commonStyles.darkPrimaryText.color,
        width: 10,
        height: 30,
        padding: 0,
        margin: 0,
    },
    arrowRightStyleFirst:{
        opacity: 1
    },
    arrowRightStyleSecond:{
        opacity: 0.7
    },
    arrowRightStyleThird:{
        opacity: 0.4
    },
    backToPreviousBtnImg:{
        width: 30,
        height: 30,
        resizeMode: "contain",
    },
    backToPreviousBtnText:{
        fontSize: 18,
        fontWeight: "500",

    },
    userInCallContainerItem:{
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        borderRadius: 30,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        width: "100%",
        marginBottom: 15
    },
    avatarInGroupCall:{
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    callingUsernameInGroup:{
        fontSize: 17,
        fontWeight: "500",
        flexShrink: 1,
        flexGrow: 1,
    }

})