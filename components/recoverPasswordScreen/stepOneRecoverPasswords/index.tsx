import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    Alert,
    Pressable,
    StatusBar,
    Text,
    Touchable,
    View,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import commonStyles from '../../../CommonStyles/commonStyles';
import { lightMode } from '../../../redux_toolkit/slices/theme.slice';
import { IRootState } from '../../../redux_toolkit/store';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../redux_toolkit/slices/userInfo.slice';
import {
    LINK_CREATE_OTP,
    LINK_SEARCH_USER,
    LINK_SEND_OTP_FORGOT_PASSWORD,
    SQLITE_DB_NAME,
} from '@env';
import {
    createUserInfoTable,
    deleteTableByName,
    getDBConnection,
    insertUserInfo,
} from '../../../utils/sqlite';
import Modal from 'react-native-modal';
interface Props {
    navigation: any;
    route: any;
}
interface IFormData {
    phoneNumber: string;
}

export default function StepOneRecoverPasswords({ navigation, route }: Props) {
    const { t } = useTranslation();
    const theme = useSelector((state: IRootState) => state.theme?.theme);
    const phoneErrorMessage = t('registerPhoneValidate');
    const emailValidate = t('emailValidate');
    const [schema, setSchema] = useState<yup.ObjectSchema<IFormData>>(
        (): yup.ObjectSchema<IFormData> => {
            const formSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
                phoneNumber: yup
                    .string()
                    .required(emailValidate)
                    .matches(
                        /(^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)|(^\+\d{1,2}\d{9}$|^0\d{9}$)/,
                        phoneErrorMessage,
                    ),
            });
            return formSchema;
        },
    );
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setValue,
        setError,
    } = useForm<IFormData>({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            phoneNumber: '',
        },
    });
    const phoneNumber = watch('phoneNumber');
    const disabled = useMemo(() => phoneNumber.length < 6, [phoneNumber]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const showModal = (action: string) => {
        setModalAction(action);
        setIsModalVisible(true);
    };
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const hideModal = () => {
        setIsModalVisible(false);
    };

    const onSubmitForm = (data: IFormData) => {
        const handleSubmitForm = async (data: IFormData) => {
            console.log('handleSubmitForm');

            if (isValid) {
                try {
                    setIsLoading(true);
                    console.log('fetch');
                    //
                    const res = await fetch(LINK_SEND_OTP_FORGOT_PASSWORD, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            contact: data.phoneNumber,
                        }),
                    });

                    // Handle user not found
                    if (res.status === 409) {
                        setError('phoneNumber', {
                            type: 'custom',
                            message: t('registerEmailNotExistMsg'),
                        });
                        return;
                    }

                    console.log('res.ok: ', res.ok);
                    if (res.ok) {
                        Alert.alert(
                            t('registerEmailSendOTPCodeNotificationTitle'),
                            t('registerEmailSendOTPCodeNotificationDesc'),
                            [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        setIsLoading(false);
                                        navigation.navigate(
                                            'StepTwoRecoverPasswords',
                                            {
                                                contact: data.phoneNumber,
                                            },
                                        );
                                    },
                                },
                            ],
                        );

                        return;
                    }

                    setError('phoneNumber', {
                        type: 'custom',
                        message: t('requestError'),
                    });
                    return;
                } catch (error) {
                    console.log('error', error);
                }
                setIsLoading(false);
            }
        };

        handleSubmitForm(data);
    };
    return (
        <View
            style={[
                styles.wrapperAll,
                theme === lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
            ]}
        >
            <StatusBar />
            <View style={[styles.navigationTabBox]}>
                <TouchableOpacity
                    style={styles.btnReturnInitialPage}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome
                        name='angle-left'
                        size={28}
                        color={commonStyles.darkPrimaryText.color}
                    />
                </TouchableOpacity>
                <Text style={[styles.currentTabName]}>
                    {t('initialRecoverScreen')}
                </Text>
            </View>
            <View
                style={[
                    styles.mainContentContainer,
                    theme == lightMode
                        ? commonStyles.lightPrimaryBackground
                        : commonStyles.darkPrimaryBackground,
                ]}
            >
                <Text
                    style={[
                        styles.descriptionForThisPage,
                        theme == lightMode
                            ? commonStyles.lightPrimaryText
                            : commonStyles.darkPrimaryText,
                        theme == lightMode
                            ? commonStyles.lightSecondaryBackground
                            : commonStyles.darkSecondaryBackground,
                    ]}
                >
                    {t('recoverDesc')}
                </Text>
                <View style={[styles.formPhoneContainer]}>
                    <View style={[styles.boxPhoneContainer]}>
                        {/* , isFocus ? styles.boxInputZaloNameActive : null */}
                        <View style={[styles.boxInputZaloName]}>
                            <Controller
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <TextInput
                                        placeholder={t('loginPhonePlaceHolder')}
                                        placeholderTextColor={
                                            theme === lightMode
                                                ? commonStyles
                                                      .lightSecondaryText.color
                                                : commonStyles.darkSecondaryText
                                                      .color
                                        }
                                        style={[
                                            styles.inputZaloName,
                                            theme === lightMode
                                                ? commonStyles.lightPrimaryText
                                                : commonStyles.darkPrimaryText,
                                        ]}
                                        value={value}
                                        onChangeText={onChange}
                                        autoFocus
                                    />
                                )}
                                name='phoneNumber'
                            />
                            {watch('phoneNumber').trim() && (
                                <AntDesign
                                    name='close'
                                    size={20}
                                    onPress={() => setValue('phoneNumber', '')}
                                    color={
                                        theme == lightMode
                                            ? commonStyles.lightPrimaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color
                                    }
                                    style={styles.btnDeleteTextInputZaloName}
                                />
                            )}
                        </View>
                    </View>
                    {errors.phoneNumber &&
                        errors.phoneNumber.message?.trim() && (
                            <Text style={[styles.textErrMsg]}>
                                {errors.phoneNumber.message}
                            </Text>
                        )}
                </View>
                <View style={styles.boxNextToStepTwo}>
                    <TouchableOpacity
                        style={[
                            styles.btnNextToStepTwo,
                            disabled ? { opacity: 0.7 } : { opacity: 1 },
                        ]}
                        disabled={isLoadingLogin}
                        onPress={handleSubmit(onSubmitForm)}
                    >
                        {isLoadingLogin ? (
                            <ActivityIndicator
                                color={commonStyles.darkPrimaryText.color}
                                size={'small'}
                            />
                        ) : (
                            <AntDesign
                                name='arrowright'
                                size={24}
                                color={commonStyles.darkPrimaryText.color}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
