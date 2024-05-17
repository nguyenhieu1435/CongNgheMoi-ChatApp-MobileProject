import { StyleSheet } from 'react-native';
import commonStyles from '../../../CommonStyles/commonStyles';
export const styles = StyleSheet.create({
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
        flexGrow: 1,
    },
    boxPhoneContainer: {
        flexDirection: 'row',
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
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formModal: {
        width: '85%',
        backgroundColor: commonStyles.lightPrimaryBackground.backgroundColor,
        padding: 20,
    },
    titleModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: commonStyles.lightIconColor.color,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '500',
        paddingBottom: 10,
        width: '100%',
    },
    contentModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        fontSize: 15,
    },
    formConfirm: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    contentFormConfirm: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    cancelButton: { fontWeight: '500' },
    confirmButton: {
        fontWeight: '600',
        color: commonStyles.primaryColor.color,
    },
});
