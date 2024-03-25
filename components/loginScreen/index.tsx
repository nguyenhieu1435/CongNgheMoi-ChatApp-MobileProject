import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import commonStyles from '../../CommonStyles/commonStyles';
import { lightMode } from '../../redux_toolkit/slices/theme.slice';
import { IRootState } from '../../redux_toolkit/store';
import { styles } from './styles';
interface Props {
    navigation: any;
}
interface IFormData {
    phoneNumber: string;
    password: string;
}
export default function Login({ navigation }: Props) {
    const { t } = useTranslation();
    const theme = useSelector((state: IRootState) => state.theme?.theme);
    const [isFocus, setIsFocus] = useState(false);
    const [isShow, setIsShow] = useState(t('show'));
    const phoneErrorMessage = t('registerPhoneValidate');
    const [showError, setShowError] = useState(false);

    const [schema, setSchema] = useState<yup.ObjectSchema<IFormData>>(
        (): yup.ObjectSchema<IFormData> => {
            const formSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
                phoneNumber: yup
                    .string()
                    .required()
                    .matches(/^(?!0\d)\d{9}$|^0\d{9}$/, phoneErrorMessage),
                password: yup
                    .string()
                    .required()
                    .matches(/^(?=.*\d)(?=.*[a-zA-Z]).{6,32}$/),
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
            phoneNumber: '',
        },
    });

    const phoneNumber = watch('phoneNumber');
    const password = watch('password');
    const disabled = useMemo(
        () => phoneNumber.length < 6 || password.length < 6,
        [phoneNumber, password],
    );
    console.log('🚀 ~ Login ~ disabled:', disabled);

    const onSubmitForm = async (data: IFormData) => {
        console.log('🚀 ~ onSubmitForm ~ data:', data);
        if (disabled) return;

        setShowError(false);

        try {
            const response = await fetch(
                'https://homeless-eadith-vunguyendev.koyeb.app/api/v1/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phone: data.phoneNumber,
                        password: data.password,
                    }),
                },
            );
            if (response.ok) {
                navigation.navigate('InitialScreen');
            } else {
                setShowError(true);
            }
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
                                        keyboardType='numeric'
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
                    {(showError || Object.keys(errors)) && (
                        <Text style={[styles.textErrMsg]}>
                            {t('loginError')}
                        </Text>
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
                        onPress={handleSubmit(onSubmitForm)}
                    >
                        <AntDesign
                            name='arrowright'
                            size={24}
                            color={commonStyles.darkPrimaryText.color}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
