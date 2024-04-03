import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Linking,
    Modal,
    SectionList,
    Alert,
    ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import commonStyles from "../../../CommonStyles/commonStyles";
import { lightMode } from "../../../redux_toolkit/slices/theme.slice";
import { IRootState } from "../../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import Checkbox from "expo-checkbox";
import { LINK_USING_TERM, LINK_SOCIAL_TERM, LINK_CREATE_OTP } from "@env";
import { useForm, Controller} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {  useState } from "react";

interface Props {
    navigation: any;
    route: any;
}

interface IFormData2 {
    contact: string;
    isCheckTerm?: boolean;
    isCheckSocialTerm?: boolean;
}

export default function StepTwoRegister({ navigation, route }: Props) {
    const { t } = useTranslation();
    const theme = useSelector((state: IRootState) => state.theme?.theme);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [schema, setSchema] = useState<yup.ObjectSchema<IFormData2>>(
        (): yup.ObjectSchema<IFormData2> => {
            const formSchema: yup.ObjectSchema<IFormData2> = yup
                .object()
                .shape({
                    contact: yup
                        .string()
                        .required(" ")
                        .matches(
                            /(^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)|(^\+\d{1,2}\d{9}$|^0\d{9}$)/,
                            t("registerPhoneValidate")
                        ),
                    isCheckTerm: yup.boolean().required().oneOf([true]),
                    isCheckSocialTerm: yup.boolean().required().oneOf([true]),
                });
            return formSchema;
        }
    );

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setValue,
        setError
    } = useForm<IFormData2>({
        resolver: yupResolver(schema),
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            contact: "",
            isCheckTerm: false,
            isCheckSocialTerm: false,
        },
    });

    const handleSubmitForm = async (data: IFormData2) => {
        if (isValid) {
            try {
                setIsLoading(true);
                const response = await fetch(LINK_CREATE_OTP, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contact: data.contact,
                    }),
                })
                if (response.ok){
                  Alert.alert(t("registerEmailSendOTPCodeNotificationTitle"), t("registerEmailSendOTPCodeNotificationDesc"), [
                      {
                          text: "OK",
                          onPress: () => {
                              setIsLoading(false);
                              navigation.navigate("StepTwoPointFiveRegister", {
                                  username: route.params.username,
                                  contact: data.contact,
                              });
                          },
                      },
                  
                  ])
                } else {
                  setError("contact", {
                      type: "custom",
                      message: t("registerEmailExistMsg")
                  })
                } 
            } catch (error) {
              console.log("error", error)
            }
            setIsLoading(false);
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
            <View style={[styles.navigationTabBox]}>
                <TouchableOpacity
                    style={styles.btnReturnPreviousPage}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome
                        name="angle-left"
                        size={28}
                        color={commonStyles.darkPrimaryText.color}
                    />
                </TouchableOpacity>
                <Text style={[styles.currentTabName]}>
                    {t("registerCreateAccount")}
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
                    {t("reigsterEmailAddressDesc")}
                </Text>

                <View style={[styles.formPhoneContainer]}>
                    <View style={[styles.boxPhoneContainer]}>
                        <View style={[styles.boxInputZaloName]}>
                            <Controller
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <TextInput
                                        keyboardType="default"
                                        placeholder={t(
                                            "registerPhonePlaceHolder"
                                        )}
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
                                        onChangeText={(text) => {
                                          setError("contact", {
                                              type: "custom",
                                              message: ""
                                          })
                                          onChange(text)
                                        }}
                                    />
                                )}
                                name="contact"
                            />
                            {watch("contact").trim() && (
                                <AntDesign
                                    name="close"
                                    size={20}
                                    onPress={() => setValue("contact", "")}
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
                    {errors.contact &&
                        errors.contact.message?.trim() && (
                            <Text style={[styles.textErrMsg]}>
                                {errors.contact.message}
                            </Text>
                        )}

                    <View style={[styles.listCheckBoxGroup]}>
                        <View style={[styles.itemCheckBox]}>
                            <Controller
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <Checkbox
                                        style={styles.checkBox}
                                        value={value}
                                        onValueChange={onChange}
                                        color={
                                            value
                                                ? commonStyles.primaryColor
                                                      .color
                                                : undefined
                                        }
                                    />
                                )}
                                name="isCheckTerm"
                            />
                            <Text
                                style={[
                                    styles.textDescCheckBox,
                                    theme == lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText,
                                ]}
                            >
                                {t("registerPhoneAgreeTitle")}{" "}
                                <Text
                                    style={styles.linkDescCheckBox}
                                    onPress={() =>
                                        Linking.openURL(LINK_USING_TERM)
                                    }
                                >
                                    {t("registerPhoneTerms")}
                                </Text>
                            </Text>
                        </View>

                        <View style={[styles.itemCheckBox]}>
                            <Controller
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <Checkbox
                                        style={styles.checkBox}
                                        onValueChange={onChange}
                                        value={value}
                                        color={
                                            value
                                                ? commonStyles.primaryColor
                                                      .color
                                                : undefined
                                        }
                                    />
                                )}
                                name="isCheckSocialTerm"
                            />

                            <Text
                                style={[
                                    styles.textDescCheckBox,
                                    theme == lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText,
                                ]}
                            >
                                {t("registerPhoneAgreeTitle")}{" "}
                                <Text
                                    style={styles.linkDescCheckBox}
                                    onPress={() =>
                                        Linking.openURL(LINK_SOCIAL_TERM)
                                    }
                                >
                                    {t("registerPhoneSocialTerms")}
                                </Text>
                            </Text>
                        </View>
                    </View>
                    <View style={styles.boxNextToStepTwo}>
                        <TouchableOpacity
                            style={[
                                styles.btnNextToStepTwo,
                                watch("isCheckSocialTerm") &&
                                watch("isCheckTerm") &&
                                watch("contact").trim()
                                    ? styles.btnNextToStepTwoActive
                                    : null,
                            ]}
                            onPress={handleSubmit(handleSubmitForm)}
                        >
                            {
                              isLoading
                              ?
                              <ActivityIndicator size="small" color={commonStyles.darkPrimaryText.color} />
                              :
                              <AntDesign
                                  name="arrowright"
                                  size={24}
                                  color={commonStyles.darkPrimaryText.color}
                              />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
