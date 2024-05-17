import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { lightMode } from '../../../redux_toolkit/slices/theme.slice';
import { useSelector } from 'react-redux';
import commonStyles from '../../../CommonStyles/commonStyles';
import { useTranslation } from 'react-i18next';
import { IRootState } from '../../../redux_toolkit/store';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { LINK_FORGOT_PASSWORD } from '@env';

interface Props {
    navigation: any;
    route: any;
}

interface IFormPassword {
    password: string;
}

export default function StepThreeRecoverPasswords({
    navigation,
    route,
}: Props) {
    const { t, i18n } = useTranslation();
    const theme = useSelector((state: IRootState) => state.theme?.theme);
    const [showPassword, setShowPassword] = useState(false);

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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    async function handleSubmitForm(data: IFormPassword) {
        console.log(`isValid`, isValid);

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
                        otp: route.params.otp, // Ensure OTP is sent
                        password: data.password, // Ensure new password is sent
                    }),
                });

                if (res.ok) {
                    const finalPassword = data.password;
                    // Log mật khẩu mới ra console
                    console.log('New Password:', data.password);
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
        }
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
                    {t('registerVerifyCodeTitle')}
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
                    {t('registerVerifyCodeDesc')}
                </Text>

                <View style={[styles.passwordContainer]}>
                    <View style={[styles.passwordContainerChild]}>
                        <Text
                            style={[
                                styles.passwordTitleText,
                                theme == lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {t('registerTitlePassword')}
                        </Text>
                        <View>
                            <View
                                style={[
                                    styles.passwordInputWrapperRow,
                                    {
                                        backgroundColor:
                                            theme === lightMode
                                                ? commonStyles
                                                      .chatNavbarBorderBottomColorLight
                                                      .color
                                                : commonStyles
                                                      .chatNavbarBorderBottomColorDark
                                                      .color,
                                    },
                                ]}
                            >
                                <Controller
                                    control={control}
                                    name='password'
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <TextInput
                                            onChangeText={onChange}
                                            secureTextEntry={!showPassword}
                                            placeholder={t(
                                                'registerPasswordPlaceholder',
                                            )}
                                            placeholderTextColor={
                                                theme == lightMode
                                                    ? commonStyles
                                                          .lightSecondaryText
                                                          .color
                                                    : commonStyles
                                                          .darkSecondaryText
                                                          .color
                                            }
                                            style={[
                                                styles.passwordInput,
                                                theme == lightMode
                                                    ? commonStyles.lightPrimaryText
                                                    : commonStyles.darkPrimaryText,
                                            ]}
                                        />
                                    )}
                                />
                                {watch('password') && (
                                    <TouchableOpacity
                                        onPress={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        style={[
                                            styles.boxIconToggleShowPassword,
                                        ]}
                                    >
                                        <Image
                                            source={
                                                showPassword
                                                    ? require('../../../assets/eye-off-icon.png')
                                                    : require('../../../assets/eye-open_icon.png')
                                            }
                                            style={[
                                                styles.iconToggleShowPassword,
                                                {
                                                    tintColor:
                                                        theme === lightMode
                                                            ? commonStyles
                                                                  .lightPrimaryText
                                                                  .color
                                                            : commonStyles
                                                                  .darkPrimaryText
                                                                  .color,
                                                },
                                            ]}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>

                            {errors.password &&
                                errors.password.message?.trim() && (
                                    <Text style={[styles.textErrMsg]}>
                                        {errors.password.message}
                                    </Text>
                                )}
                        </View>
                    </View>
                </View>

                <View style={styles.boxWrapperBtnNext}>
                    <TouchableOpacity
                        style={[
                            styles.btnNextPage,
                            theme == lightMode
                                ? commonStyles.lightTertiaryBackground
                                : commonStyles.darkTertiaryBackground,
                        ]}
                        onPress={handleSubmit(handleSubmitForm)}
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
        </View>
    );
}
