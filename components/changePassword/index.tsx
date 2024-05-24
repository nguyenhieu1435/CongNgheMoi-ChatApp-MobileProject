import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, TextInput, Image, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { LINK_AUTH_METHOD } from "@env";
import { deleteTableByName, getDBConnection } from "../../utils/sqlite";

interface ChangePasswordProps {
    navigation: any;
    route: any;
}

interface IFormData{
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export default function ChangePassword({
    navigation,
    route,
}: ChangePasswordProps) {
    const {t} = useTranslation()
    const theme = useSelector((state : IRootState) => state.theme.theme)
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const userInfo = useSelector((state: IRootState) => state.userInfo)

    const [schema, setSchema] = useState<yup.ObjectSchema<IFormData>>(
        (): yup.ObjectSchema<IFormData> => {
            const formSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
                oldPassword: yup.string().required(" "),
                newPassword: yup.string().required(" ")
                .min(6, t("registerPasswordValidationAtLeast"))
                .max(32, t("registerPasswordValidationMaxLength"))
                .matches(/^(?=.*\d)(?=.*[a-zA-Z]).{6,32}$/, t("registerPasswordValidationCommonRequire")),
                confirmNewPassword: yup.string().required(" ")
                .oneOf([yup.ref("newPassword")], t("registerPasswordValidationNotMatch"))
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
        setError
    } = useForm<IFormData>({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    })

    async function handleSubmitForm(data: IFormData){
        if (isValid){
            setIsLoading(true)
            try {
                const resp = await fetch(LINK_AUTH_METHOD + "/changePassword", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + userInfo.accessToken,
                    },
                    body: JSON.stringify({
                        oldPassword: data.oldPassword,
                        newPassword: data.newPassword
                    })
                })
                console.log("Status:::::     ", resp.status);
                if (resp.status >= 400 && resp.status < 500){
                    setError("oldPassword", {
                        type: "manual",
                        message: t("oldPasswordValidation"),
                    })

                } else if (resp.status === 200){
                    setIsLoading(false)        
                    const db = getDBConnection()
                    await deleteTableByName(db, "user_info")
                    navigation.navigate("InitialScreen")  
                }
                
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false)
        }
    }

    return (
        <View
            style={[
                styles.changePasswordWrapper,
                theme === lightMode
                ?
                commonStyles.lightPrimaryBackground
                :
                commonStyles.darkPrimaryBackground
            ]}
        >
            <StatusBar/>
            <SafeAreaView
                style={[
                    styles.changePasswordContainer
                ]}
            >
                <View
                    style={[
                        styles.changePasswordHeader
                    ]}
                >
                    <Text
                        style={[
                            styles.changePasswordTitle,
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText
                            :
                            commonStyles.darkPrimaryText
                        ]}
                    >{t("changePasswordTitle")}</Text>

                    <View>
                        <Text
                            style={[
                                styles.changePasswordLabel,
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText
                                :
                                commonStyles.darkPrimaryText
                            ]}
                        >{t("oldPassword")}</Text>
                        <View
                            style={[
                                styles.changePasswordInputContainer
                            ]}
                        >
                            <Controller
                                control={control}
                                name="oldPassword"
                                render={({ field: { onChange, onBlur, value}})=>(
                                    <TextInput
                                        onChangeText={onChange}
                                        secureTextEntry={!showOldPassword}
                                        onBlur={onBlur}
                                        style={[
                                            styles.changePasswordInput,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryBackground
                                            :
                                            commonStyles.darkSecondaryBackground,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightPrimaryText
                                            :
                                            commonStyles.darkPrimaryText
                                        ]}
                                    />
                                )}
                            />

                            <TouchableOpacity
                                onPress={() => setShowOldPassword(!showOldPassword)}
                                style={[
                                    styles.changePasswordEyeIconBtn
                                ]}
                            >
                                <Image
                                    source={showOldPassword
                                        ? require("../../assets/eye-off-icon.png")
                                        : require("../../assets/eye-open_icon.png")
                                    }
                                    style={[
                                        styles.changePasswordEyeIcon,
                                        {
                                            tintColor:
                                            theme === lightMode
                                            ?
                                            commonStyles.lightPrimaryText.color
                                            :
                                            commonStyles.darkPrimaryText.color
                                        }
                                    ]}
                                />
                            </TouchableOpacity>
                            {
                                errors.oldPassword &&
                                <Text
                                    style={[
                                        styles.errMsgChangePassword,
                                    ]}
                                >{errors.oldPassword?.message}</Text>
                            }
                        </View>

                    </View>

                    <View>
                        <Text
                            style={[
                                styles.changePasswordLabel,
                               
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText
                                :
                                commonStyles.darkPrimaryText
                            ]}
                        >{t("newPassword")}</Text>
                        <View
                            style={[
                                styles.changePasswordInputContainer
                            ]}
                        >
                            <Controller
                                control={control}
                                name="newPassword"
                                render={({ field: { onChange, onBlur, value}})=>(
                                    <TextInput
                                        onChangeText={onChange}
                                        secureTextEntry={!showNewPassword}
                                        onBlur={onBlur}
                                        style={[
                                            styles.changePasswordInput,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryBackground
                                            :
                                            commonStyles.darkSecondaryBackground,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightPrimaryText
                                            :
                                            commonStyles.darkPrimaryText
                                        ]}
                                    />

                                )}
                            />
                            
                            <TouchableOpacity
                                onPress={() => setShowNewPassword(!showNewPassword)}
                                style={[
                                    styles.changePasswordEyeIconBtn
                                ]}
                            >
                                <Image
                                    source={showNewPassword
                                        ? require("../../assets/eye-off-icon.png")
                                        : require("../../assets/eye-open_icon.png")}
                                    style={[
                                        styles.changePasswordEyeIcon,
                                        {
                                            tintColor:
                                            theme === lightMode
                                            ?
                                            commonStyles.lightPrimaryText.color
                                            :
                                            commonStyles.darkPrimaryText.color
                                        }
                                    ]}
                                />
                            </TouchableOpacity>
                            {
                                errors.newPassword &&
                                <Text
                                    style={[
                                        styles.errMsgChangePassword,
                                        
                                    ]}
                                >{errors.newPassword.message}</Text>
                            }
                        </View>

                    </View>
                    <View>
                        <Text
                            style={[
                                styles.changePasswordLabel,
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText
                                :
                                commonStyles.darkPrimaryText
                            ]}
                        >{t("confirmNewPassword")}</Text>
                        <View
                            style={[
                                styles.changePasswordInputContainer
                            ]}
                        >
                            <Controller
                                control={control}
                                name="confirmNewPassword"
                                render={({ field: { onChange, onBlur, value}})=>(
                                    <TextInput
                                        onChangeText={onChange}
                                        secureTextEntry={!showConfirmNewPassword}
                                        onBlur={onBlur}     
                                        style={[
                                            styles.changePasswordInput,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryBackground
                                            :
                                            commonStyles.darkSecondaryBackground,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightPrimaryText
                                            :
                                            commonStyles.darkPrimaryText
                                        ]}
                                    />
                                )}
                            />
                           

                            <TouchableOpacity
                                onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                style={[
                                    styles.changePasswordEyeIconBtn
                                ]}
                            >
                                <Image
                                    source={showConfirmNewPassword
                                        ? require("../../assets/eye-off-icon.png")
                                        : require("../../assets/eye-open_icon.png")}
                                    style={[
                                        styles.changePasswordEyeIcon,
                                        {
                                            tintColor:
                                            theme === lightMode
                                            ?
                                            commonStyles.lightPrimaryText.color
                                            :
                                            commonStyles.darkPrimaryText.color
                                        }
                                    ]}
                                />
                            </TouchableOpacity>
                            {
                                errors.confirmNewPassword &&
                                <Text
                                    style={[
                                        styles.errMsgChangePassword,
                                    ]}
                                >{
                                    errors.confirmNewPassword.message
                                }</Text>
                            }
                        </View>

                    </View>
                </View>

                <View
                    style={[
                        styles.changePasswordFooter
                    ]}
                >
                    <TouchableOpacity
                        onPress={handleSubmit(handleSubmitForm)}
                        style={[
                            styles.changePasswordBtn
                        ]}
                        disabled={isLoading}
                    >
                        {
                            isLoading
                            ?
                            <ActivityIndicator
                                size="small"
                                color={
                                    commonStyles.darkPrimaryText.color
                                }
                            />
                            :
                            <Text
                                style={[
                                    styles.changePasswordBtnText,
                                ]}
                            >{t("saveChanges")}</Text>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}

                        style={[
                            styles.changePasswordCancelBtn
                        ]}
                    >
                        <Text
                            style={[
                                styles.changePasswordCancelBtnText,
                            ]}
                        >{t("cancel")}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
