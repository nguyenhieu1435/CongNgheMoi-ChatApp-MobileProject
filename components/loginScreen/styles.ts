import { StyleSheet } from 'react-native';
import commonStyles from '../../CommonStyles/commonStyles';
export const styles = StyleSheet.create({
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    navigationTabBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: commonStyles.primaryColor.color,
    },

    btnReturnInitialPage: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    wrapperAll: {
        flex: 1,
    },
    currentTabName: {
        color: commonStyles.darkPrimaryText.color,
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 10,
    },
    mainContentContainer: {
        flexGrow: 1,
    },
    descriptionForThisPage: {
        fontSize: 15,
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    formPhoneContainer: {
        paddingHorizontal: 15,
        marginTop: 25,
        // flexGrow: 1,
    },
    textDescCheckBox: {
        marginTop: 30,
        fontWeight: '500',
        color: commonStyles.primaryColor.color,
    },
    boxPhoneContainer: {
        flexDirection: 'row',
    },
    boxChooseNational: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginRight: 10,
        paddingVertical: 10,
    },
    currentNationalName: {
        fontSize: 15,
        marginRight: 8,
    },
    boxInputZaloName: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    inputZaloName: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: '500',
    },
    btnDeleteTextInputZaloName: {
        padding: 10,
    },
    textErrMsg: {
        color: 'red',
        fontSize: 14,
        marginTop: 15,
    },
    boxNextToStepTwo: {
        marginTop: 'auto',
        marginBottom: 20,
        marginRight: 20,
        alignItems: 'flex-end',
    },
    btnNextToStepTwo: {
        width: 40,
        height: 40,
        // marginLeft: 'auto',
        backgroundColor: commonStyles.primaryColor.color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    btnNextToStepTwoActive: {
        opacity: 1,
    },
});
