import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    Pressable,
    StatusBar,
    Text,
    View,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import commonStyles from '../../CommonStyles/commonStyles';
import { lightMode } from '../../redux_toolkit/slices/theme.slice';
import { IRootState } from '../../redux_toolkit/store';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux_toolkit/slices/userInfo.slice';
import { SQLITE_DB_NAME } from '@env';
import {
    createUserInfoTable,
    deleteTableByName,
    getDBConnection,
    insertUserInfo,
} from '../../utils/sqlite';
interface Props {
    navigation: any;
}
interface IFormData {
    contact: string;
    password: string;
}
export default function Login({ navigation }: Props) {
    const { t } = useTranslation();
    const theme = useSelector((state: IRootState) => state.theme?.theme);
    const [isFocus, setIsFocus] = useState(false);
    const [isShow, setIsShow] = useState(t('show'));
    const phoneErrorMessage = t('registerPhoneValidate');
    const passwordErrorMessage= t("registerPasswordValidationCommonRequire")
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);
    const [errorText, setErrorText] = useState<string | undefined>('');

    const [schema, setSchema] = useState<yup.ObjectSchema<IFormData>>(
        (): yup.ObjectSchema<IFormData> => {
            const formSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
                contact: yup
                    .string()
                    .required()
                    .matches(
                        /(^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)|(^\+\d{1,2}\d{9}$|^0\d{9}$)/,
                        phoneErrorMessage
                    ),
                password: yup
                    .string()
                    .required()
                    .matches(
                        /^(?=.*\d)(?=.*[a-zA-Z]).{6,32}$/,
                        passwordErrorMessage,
                    ),
            });
            return formSchema;
        },
      
    );

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setValue,
    } = useForm<IFormData>({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            password: '',
            contact: '',
        },
    });
    useEffect(() => {
        const errPhone = errors.contact;
        if (errPhone && errPhone.message) {
            setErrorText(errPhone.message);
            return;
        }
        const errPwd = errors.password;
        if (errPwd && errPwd.message) {
            setErrorText(errPwd.message);
            return;
        }
        
        if (!errPhone?.message || !errPwd?.message) {
            setErrorText(undefined);
        }
    }, [errors]);

    const contact = watch('contact');
    const password = watch('password');
    const disabled = useMemo(
        () => contact.length < 6 || password.length < 6,
        [contact, password],
    );
    console.log('🚀 ~ Login ~ disabled:', disabled);

    const onSubmitForm = async (data: IFormData) => {
        console.log('🚀 ~ onSubmitForm ~ data:', data);
        if (disabled) return;

        setShowError(false);
        setIsLoadingLogin(true);
        try {
            const response = await fetch(
                'https://homeless-eadith-vunguyendev.koyeb.app/api/v1/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contact: data.contact,
                        password: data.password,
                    }),
                },
            );

            if (response.ok) {
                let data = await response.json();
                console.log(data);

                dispatch(
                    setUserInfo({
                        user: {
                            __v: data.user?.__v,
                            _id: data.user?._id,
                            avatar: data.user?.avatar,
                            background: data.user?.background,
                            createdAt: data.user?.createdAt,
                            dateOfBirth: data.user?.dateOfBirth,
                            deleted: data.user?.deleted,
                            gender: data.user?.gender,
                            status: data.user?.status,
                            name: data.user?.name,
                            password: data.user?.password,
                            qrCode: data.user?.qrCode,
                            updatedAt: data.user?.updatedAt,
                            friends: data.user?.friends,
                        },
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                    }),
                );
                if (SQLITE_DB_NAME) {
                    const db = getDBConnection();
                    try {
                        await createUserInfoTable(db);
                    } catch (error) {
                        console.log(error);
                    }
                    await deleteTableByName(db, 'user_info');
                    await insertUserInfo(
                        db,
                        data.user?._id,
                        data.user?.password,
                        data.accessToken,
                        data.refreshToken + '',
                    );
                }
                setIsLoadingLogin(false);
                navigation.navigate('PrimaryBottomTab');
            } else {
                setErrorText(t('loginError'));
                setShowError(true);
            }
            setIsLoadingLogin(false);
        } catch (error) {
            console.log('Error in login page', error);
            setShowError(true);
        }
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
                    {t('initialScreenLogin')}
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
                    {t('loginPhoneNumberDesc')}
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
                                        keyboardType='default'
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
                                name='contact'
                            />
                            {watch('contact').trim() && (
                                <AntDesign
                                    name='close'
                                    size={20}
                                    onPress={() => setValue('contact', '')}
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
                </View>
                <View style={styles.formPhoneContainer}>
                    <View
                        style={[
                            styles.boxInputZaloName,
                            isFocus ? styles.boxInputZaloName : null,
                        ]}
                    >
                        <Controller
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    placeholder={t('loginPasswordPlaceHolder')}
                                    placeholderTextColor={
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
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
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    secureTextEntry={isShow === t('show')}
                                />
                            )}
                            name='password'
                        />
                        <Pressable
                            onPress={() => {
                                isShow === t('show')
                                    ? setIsShow(t('hide'))
                                    : setIsShow(t('show'));
                            }}
                        >
                            <Text
                                style={[
                                    styles.inputZaloName,
                                    { color: '#7A809A' },
                                ]}
                            >
                                {isShow}
                            </Text>
                        </Pressable>
                        {watch('password').trim() && (
                            <AntDesign
                                name='close'
                                size={20}
                                onPress={() => setValue('password', '')}
                                color={
                                    theme == lightMode
                                        ? commonStyles.lightPrimaryText.color
                                        : commonStyles.darkSecondaryText.color
                                }
                                style={styles.btnDeleteTextInputZaloName}
                            />
                        )}
                    </View>
                    {(showError || Object.keys(errors)) && errorText && (
                        <Text style={[styles.textErrMsg]}>{errorText}</Text>
                    )}
                    <View>
                        <Text
                            style={[
                                styles.textDescCheckBox,
                                theme == lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {t('recoverPassword')}
                        </Text>
                    </View>
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
