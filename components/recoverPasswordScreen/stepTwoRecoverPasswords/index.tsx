import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLayoutEffect, useRef, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../redux_toolkit/store';
import commonStyles from '../../../CommonStyles/commonStyles';
import { lightMode } from '../../../redux_toolkit/slices/theme.slice';
import { number } from 'yup';
import { LINK_CREATE_OTP, LINK_FORGOT_PASSWORD, LINK_VERTIFY_OTP } from '@env';
import DismissKeyboard from '../../dissmissKeyboard';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
interface IProps {
    navigation: any;
    route: any;
}
interface IFormPassword {
    password: string;
}
export default function StepTwoRecoverPasswords({ navigation, route }: IProps) {
    const { t } = useTranslation();
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const [expireTime, setExpireTime] = useState(299);
    const refIdTime = useRef<NodeJS.Timeout | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [isResendCode, setIsResendCode] = useState(false);
    const [isVerifyCode, setIsVerifyCode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isShow, setIsShow] = useState(t('show'));
    const [schema, setSchema] = useState(() => {
        return yup.object().shape({
            password: yup
                .string()
                .required(' ')
                .min(6, t('registerPasswordValidationAtLeast'))
                .max(32, t('registerPasswordValidationMaxLength'))
                .matches(
                    /^(?=.*\d)(?=.*[a-zA-Z]).{6,32}$/,
                    t('registerPasswordValidationCommonRequire'),
                ),
        });
    });
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setValue,
        setError,
    } = useForm<IFormPassword>({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            password: '',
        },
    });
    useLayoutEffect(() => {
        refIdTime.current = setInterval(() => {
            setExpireTime((prev) => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    clearInterval(refIdTime.current!);
                    return 0;
                }
            });
        }, 1000);
        return () => {
            if (refIdTime.current) {
                clearInterval(refIdTime.current);
            }
        };
    }, [expireTime]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState(false);
    const [errorText, setErrorText] = useState<string | undefined>('');
    async function handleSubmitForm(data: IFormPassword) {
        // console.log(`isValid`, isValid);

        if (isValid) {
            try {
                setIsLoading(true);

                const res = await fetch(LINK_FORGOT_PASSWORD, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contact: route.params.contact, // Ensure contact information is sent
                        otp: verifyCode, // Ensure OTP is sent
                        password: data.password, // Ensure new password is sent
                    }),
                });

                if (res.ok) {
                    const finalPassword = data.password;
                    // Log mật khẩu mới ra console
                    // console.log('New Password:', data.password);
                    setValue('password', '');
                    Alert.alert(
                        t('passwordChangeSuccessTitle'),
                        t('passwordChangeSuccessMessage'),
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    setIsLoading(false);
                                    navigation.navigate('Login', {
                                        username: route.params.username,
                                        contact: route.params.contact,
                                        password: finalPassword,
                                    });
                                },
                            },
                        ],
                    );
                } else {
                    // Log response to understand the error
                    const errorData = await res.json();
                    // console.log('Error response:', errorData);
                    setError('password', {
                        type: 'custom',
                        message: errorData.message || t('requestError'),
                    });
                    setIsLoading(false);
                }
            } catch (error) {
                console.log('error', error);
                setIsLoading(false);
            }
        }
    }
    async function handleSubmitVerifyCode(data: IFormPassword) {
        if (expireTime == 0) {
            setErrorMessage(t('registerVerifyExpireTimeOut'));
            return;
        }
        try {
            setIsLoading(true);
            setIsVerifyCode(true);
            const res = await fetch(LINK_FORGOT_PASSWORD, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contact: route.params.contact, // Ensure contact information is sent
                    otp: verifyCode, // Ensure OTP is sent
                    password: data.password, // Ensure new password is sent
                }),
            });
            if (res.ok) {
                clearInterval(refIdTime.current!);
                setIsVerifyCode(false);
                const finalPassword = data.password;
                // console.log('New Password:', data.password);
                setValue('password', '');
                Alert.alert(
                    t('passwordChangeSuccessTitle'),
                    t('passwordChangeSuccessMessage'),
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                setIsLoading(false);
                                navigation.navigate('Login', {
                                    username: route.params.username,
                                    contact: route.params.contact,
                                    password: finalPassword,
                                });
                            },
                        },
                    ],
                );
            } else {
                setErrorMessage(t('registerVerifyCodeValidate'));
                const errorData = await res.json();
                console.log('Error response:', errorData);
                setError('password', {
                    type: 'custom',
                    message: errorData.message || t('requestError'),
                });
                setIsLoading(false);
            }
        } catch (error) {
            console.log('error', error);
            setIsLoading(false);
        }
        setIsVerifyCode(false);
    }
    async function handleResendVerifyCode() {
        if (errorMessage.trim()) {
            setErrorMessage('');
        }
        try {
            setIsResendCode(true);
            const response = await fetch(LINK_CREATE_OTP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contact: route.params.contact,
                }),
            });
            if (response.ok) {
                clearInterval(refIdTime.current!);
                setExpireTime(300);
            } else {
                clearInterval(refIdTime.current!);
                setErrorMessage(t('registerVerifyResendError'));
            }
        } catch (error) {
            console.log(error);
        }
        setIsResendCode(false);
    }

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
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flex: 1 }}
                >
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
                            {t('registerVerifyHeaderTitle')}
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
                        <View
                            style={{
                                padding: 10,
                                justifyContent: 'center',
                            }}
                        >
                            <View
                                style={{
                                    paddingVertical: 16,
                                    paddingHorizontal: 40,
                                    backgroundColor: '#f1f0fd',
                                    borderRadius: 8,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        marginBottom: 4,
                                        color: '#343a40',
                                    }}
                                >
                                    {t('recoverOtpDesc')}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: '#554bda',
                                        fontWeight: '700',
                                    }}
                                >
                                    {route.params.contact}
                                </Text>
                                <View style={{}}>
                                    <DismissKeyboard>
                                        <TextInput
                                            keyboardType='number-pad'
                                            placeholder={t(
                                                'registerVerifyExpireInputPlaceholder',
                                            )}
                                            placeholderTextColor={
                                                theme === lightMode
                                                    ? commonStyles
                                                          .lightSecondaryText
                                                          .color
                                                    : commonStyles
                                                          .darkSecondaryText
                                                          .color
                                            }
                                            style={[
                                                styles.inputVerifyCode,
                                                {
                                                    borderColor:
                                                        theme === lightMode
                                                            ? commonStyles
                                                                  .lightTertiaryText
                                                                  .color
                                                            : commonStyles
                                                                  .darkTertiaryText
                                                                  .color,
                                                    color:
                                                        theme === lightMode
                                                            ? commonStyles
                                                                  .lightPrimaryText
                                                                  .color
                                                            : commonStyles
                                                                  .darkPrimaryText
                                                                  .color,
                                                },
                                            ]}
                                            value={verifyCode}
                                            onChangeText={(text) => {
                                                if (errorMessage.trim()) {
                                                    setErrorMessage('');
                                                }
                                                setVerifyCode(text);
                                            }}
                                        />
                                    </DismissKeyboard>
                                    {errorMessage.trim() && (
                                        <Text
                                            style={[
                                                styles.inputVerifyCodeErrMsg,
                                            ]}
                                        >
                                            {errorMessage}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </View>
                        {/* Copy */}
                        <View style={styles.formPhoneContainer}>
                            <View
                                style={[
                                    styles.boxInputZaloName,
                                    // isFocus ? styles.boxInputZaloName : null,
                                ]}
                            >
                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <TextInput
                                            placeholder={t(
                                                'recoverNewPasswordPlaceHolder',
                                            )}
                                            placeholderTextColor={
                                                theme === lightMode
                                                    ? commonStyles
                                                          .lightSecondaryText
                                                          .color
                                                    : commonStyles
                                                          .darkSecondaryText
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
                                            // onFocus={() => setIsFocus(true)}
                                            // onBlur={() => setIsFocus(false)}
                                            secureTextEntry={
                                                isShow === t('show')
                                            }
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
                                                ? commonStyles.lightPrimaryText
                                                      .color
                                                : commonStyles.darkSecondaryText
                                                      .color
                                        }
                                        style={
                                            styles.btnDeleteTextInputZaloName
                                        }
                                    />
                                )}
                            </View>
                            {(showError || Object.keys(errors)) &&
                                errorText && (
                                    <Text style={[styles.textErrMsg]}>
                                        {errorText}
                                    </Text>
                                )}
                        </View>
                        <View style={styles.boxWrapperBtnNext}>
                            <TouchableOpacity
                                style={[
                                    styles.btnNextPage,
                                    theme == lightMode
                                        ? commonStyles.lightTertiaryBackground
                                        : commonStyles.darkTertiaryBackground,
                                ]}
                                onPress={handleSubmit(handleSubmitVerifyCode)}
                            >
                                <Text
                                    style={[
                                        styles.textBtnNextPage,
                                        theme == lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    {t('next')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
