import { StyleSheet } from "react-native";
import commonStyles from "../../CommonStyles/commonStyles";

export const styles = StyleSheet.create({
    addFriendWrapper: {
        flex: 1,
    },
    addFriendHeaderBox:{
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    addFriendHeaderGoBackBtn:{
        width: 30,
        height: 30,
    },
    addFriendHeaderTitle:{
        fontSize: 20,
        fontWeight: "500",
    },
    addFriendMyQrCodeBoxContainer:{
        paddingVertical: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    addFriendMyQrCodeBox:{
        width: 230,
        height: 230,
        borderRadius: 20,
        position: "relative"
    },
    addFriendMyQrCodeBoxBackground:{
        width: "100%",
        height: "100%",
        borderRadius: 20,
    },
    addFriendMyQrCodeBoxCodeImg:{
        width: 130,
        height: 130,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{translateX: -64}, {translateY: -64}],
        borderRadius: 8,
        resizeMode: "contain"
    },
    addFriendMyQrCodeUsername:{
        position: "absolute",
        top: 15,
        textAlign: "center",
        width: "100%",
        fontWeight: "500",
        fontSize: 18,
    },
    addFriendMyQrCodeDesc:{
        position: "absolute",
        bottom: 15,
        textAlign: "center",
        width: "100%",
        fontSize: 14,
    },
    addFriendSearchTelAndChooseCountryContainer:{
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 15,
    },
    addFriendSearchTelAndChooseCountryBox:{
        borderRadius: 6,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        flexGrow: 1,
        position: "relative",
        height: 45,
        overflow: 'hidden',
    },
    addFriendSearchTelAndChooseCountryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        height: "100%",
        
    },
    addFriendSearchTelAndChooseCountryBtnText:{
        fontSize: 18,
        marginRight: 4
    },
    addFriendSearchTelAndChooseCountryBtnImage:{
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    addFriendSearchTelAndChooseCountryInput:{
        paddingHorizontal: 15,
        fontSize: 18,
    },
    addFriendSearchTelAndChooseCountryResetBtn:{
        position: "absolute",
        right: 8,
        top: "50%",
        transform: [{translateY: -10}]
    },
    addFriendSearchTelAndChooseCountryResetBtnImage:{
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    addFriendSearchTelAndChooseCountryNextStepBtn:{
        width: 45,
        height: 45,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    addFriendAnotherFeatureBox:{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        gap: 20,
        paddingVertical: 10,
    },
    addFriendAnotherFeatureBoxIcon:{
        width: 28,
        height: 28,
        tintColor: commonStyles.primaryColor.color
    },
    addFriendAnotherFeatureBoxText:{
        fontSize: 18,
    }
})