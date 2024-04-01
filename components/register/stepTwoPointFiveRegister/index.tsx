import {
    ActivityIndicator,
    Image,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLayoutEffect, useRef, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux_toolkit/store";
import commonStyles from "../../../CommonStyles/commonStyles";
import { lightMode } from "../../../redux_toolkit/slices/theme.slice";
import { FontAwesome } from "@expo/vector-icons";
import { number } from "yup";
import { LINK_CREATE_OTP, LINK_VERTIFY_OTP } from "@env";
import DismissKeyboard from "../../dissmissKeyboard";

interface IProps {
    navigation: any;
    route: any;
}

export default function StepTwoPointFiveRegister({
    navigation,
    route,
}: IProps) {
    const { t } = useTranslation();
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const [expireTime, setExpireTime] = useState(299);
    const refIdTime = useRef<NodeJS.Timeout | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [isResendCode, setIsResendCode] = useState(false);
    const [isVerifyCode, setIsVerifyCode] = useState(false);

    useLayoutEffect(()=>{
        refIdTime.current = setInterval(() => {
            setExpireTime(prev => {
                if (prev > 0){
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
    }, [expireTime])

    async function handleResendVerifyCode(){
        
        if (errorMessage.trim()){
            setErrorMessage("");
        }
        try {
            setIsResendCode(true);
            const response = await fetch(LINK_CREATE_OTP, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone: route.params.emailAddress,
                }),
            })
            if (response.ok){
                clearInterval(refIdTime.current!);
                setExpireTime(300);
            } else {
                clearInterval(refIdTime.current!);
                setErrorMessage(t("registerVerifyResendError"));
            }

        } catch (error) {
            console.log(error);
        }
        setIsResendCode(false);
    }
    async function handleSubmitVerifyCode(){
        if (expireTime == 0){
            setErrorMessage(t("registerVerifyExpireTimeOut"));
            return;
        }
        try {
            setIsVerifyCode(true);
            const response = await fetch(LINK_VERTIFY_OTP, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone: route.params.emailAddress,
                    otp: verifyCode,
                }),

            })
            const data = await response.json();
            if (response.ok){
                clearInterval(refIdTime.current!);
                setIsVerifyCode(false);
                navigation.navigate("StepThreeRegister", {
                    emailAddress: route.params.emailAddress,
                    password: route.params.password,
                    username: route.params.username,
                });
            } else {
                setErrorMessage(t("registerVerifyCodeValidate"));
            }
        } catch (error) {
            console.log(error);
        }
        setIsVerifyCode(false);
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
                <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
                    <View style={[styles.navigationTabBox]}>
                        <TouchableOpacity
                            style={styles.btnReturnInitialPage}
                            onPress={() => navigation.goBack()}
                        >
                            <FontAwesome
                                name="angle-left"
                                size={28}
                                color={commonStyles.darkPrimaryText.color}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.currentTabName]}>
                            {t("registerVerifyHeaderTitle")}
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
                        <View style={[styles.mainContentTopBox]}>
                            <Image
                                source={require("../../../assets/image_vetify.png")}
                                style={{
                                    width: 140,
                                    height: 140,
                                    resizeMode: "contain",
                                }}
                            />
                            <Text
                                style={[
                                    styles.mainContentTopBoxTitle,
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText,
                                ]}
                            >
                                {t("registerVerifyBodyTitle")}
                            </Text>
                            <Text
                                style={[
                                    styles.mainContentTopBoxDesc,
                                    theme === lightMode
                                        ? commonStyles.lightSecondaryText
                                        : commonStyles.darkSecondaryText,
                                ]}
                            >{t("registerVerifyBodyDesc")}</Text>
                            <Text
                                style={[
                                    styles.mainContentTopExpireTitle,
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText
                                        : commonStyles.darkPrimaryText,
                                ]}
                            >{t("registerVerifyExpireTitle") + expireTime + " " + t("registerVerifyExpireTimeUnit")} </Text>
                        </View>
                        <View
                            style={[
                                styles.mainContentBottomBox,
                            
                            ]}
                        >
                            <View
                                style={{width: "80%", alignItems: "center", position: "relative",  marginBottom: 45}}
                            >
                                <DismissKeyboard>
                                    <TextInput
                                        keyboardType="number-pad"
                                        placeholder={t(
                                            "registerVerifyExpireInputPlaceholder"
                                        )}
                                        placeholderTextColor={
                                            theme === lightMode
                                                ? commonStyles.lightSecondaryText.color
                                                : commonStyles.darkSecondaryText.color
                                        }
                                        style={[
                                            styles.inputVerifyCode,
                                            {
                                                borderColor:
                                                    theme === lightMode
                                                        ? commonStyles.lightTertiaryText.color
                                                        : commonStyles.darkTertiaryText.color,
                                                color:
                                                    theme === lightMode
                                                        ? commonStyles.lightPrimaryText.color
                                                        : commonStyles.darkPrimaryText.color,
                                            }
                                        ]}
                                        value={verifyCode}
                                        onChangeText={(text)=>{
                                            if (errorMessage.trim()){
                                                setErrorMessage("");
                                            }
                                            setVerifyCode(text);
                                        }}
                                    />
                                </DismissKeyboard>
                                {
                                    errorMessage.trim() &&
                                    <Text style={[
                                        styles.inputVerifyCodeErrMsg
                                    ]}>{errorMessage}</Text>
                                }
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.submitVerifyCodeBtn,
                                ]}
                                onPress={handleSubmitVerifyCode}
                                disabled={isVerifyCode}
                            >
                                {
                                    isVerifyCode
                                    ?
                                    <ActivityIndicator size={"small"} color={commonStyles.darkPrimaryText.color}/>
                                    :
                                    <Text
                                        style={[
                                            styles.submitVerifyCodeBtnText,
                                        ]}
                                    >
                                        {t("registerVerifyBodyTitle")}
                                    </Text>
                                }
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    marginTop: 20,
                                    gap: 5
                                }}
                            >
                                <Text
                                    style={[
                                        {
                                            fontSize: 15,
                                            color:
                                                theme === lightMode
                                                    ? commonStyles.lightSecondaryText.color
                                                    : commonStyles.darkSecondaryText.color,
                                        },
                                    ]}
                                >
                                    {t("registerVerifyNotReceived")}
                                </Text>
                                <TouchableOpacity
                                    onPress={handleResendVerifyCode}
                                    disabled={isResendCode}
                                >
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: "600",
                                                color: commonStyles.primaryColor.color,
                                            }}
                                        >{t("registerVerifyResend")}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
