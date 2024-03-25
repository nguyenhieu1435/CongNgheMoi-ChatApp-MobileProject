import { useTranslation } from "react-i18next";
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux_toolkit/store";
import { lightMode } from "../../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../../CommonStyles/commonStyles";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import DatePicker from "@dietime/react-native-date-picker";
import { LINK_REGISTER_POST, SQLITE_DB_NAME } from "@env";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux_toolkit/slices/userInfo.slice";
import * as SQLite from "expo-sqlite";
import { createUserInfoTable, deleteTableByName, getDBConnection, insertUserInfo } from "../../../utils/sqlite";

interface Props {
    navigation: any;
    route: any;
}
interface ICustomRadioButton {
    value: string;
    selected: boolean;
    onPress: () => void;
    style?: object;
}

export function CustomRadioButton({
    value,
    selected,
    onPress,
    style,
}: ICustomRadioButton) {
    const theme = useSelector((state: IRootState) => state.theme.theme);

    return (
        <TouchableOpacity
            style={{
                height: 24,
                width: 24,
                borderRadius: 50,
                borderWidth: 2,
                borderColor:
                    theme === lightMode
                        ? commonStyles.lightSecondaryText.color
                        : commonStyles.darkSecondaryText.color,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: selected
                    ? commonStyles.primaryColor.color
                    : theme === lightMode
                    ? commonStyles.lightSecondaryBackground.backgroundColor
                    : commonStyles.darkSecondaryBackground.backgroundColor,
                ...style,
            }}
            activeOpacity={1}
            onPress={onPress}
        >
            {selected ? (
                <Feather
                    name="check"
                    size={18}
                    color={commonStyles.darkPrimaryText.color}
                />
            ) : (
                <></>
            )}
        </TouchableOpacity>
    );
}

export default function StepFourRegister({ navigation, route }: Props) {
    const { t, i18n } = useTranslation();
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const [selectedValue, setSelectedValue] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [isPosting, setIsPosting] = useState(false);
    const dispatch = useDispatch();

    const validateForm = (): boolean => {
        return selectedValue != "" && dateOfBirth < new Date();
    };

    async function handleSaveInfoToSQLite(jsonData: any) {
        const dbName = process.env.SQLITE_DB_NAME;
        if (dbName) {
            const db = getDBConnection()

            try {
                const resultCreateTable = await createUserInfoTable(db)
                const select = await db.execAsync([{ sql: 'SELECT * FROM user_info;', args: [] }], true)
                const obj = select[0]
                if ("rows" in obj && obj.rows.length > 0) {

                    await deleteTableByName(db, "user_info")    
                }
                const resultInsert = await insertUserInfo(db, jsonData.user.phone, jsonData.user.password, jsonData.accessToken + "", jsonData.refreshToken +"")
            } catch (error) {
                console.log(error)
            }
        }
    }
    async function handleNavigateLayout() {
        let age = new Date().getFullYear() - dateOfBirth.getFullYear();
        setIsPosting(true);
        if (age < 14) {
            Alert.alert(
                t("registerAgeValidateTitle"),
                t("registerAgeValidateDesc"),
                [
                    {
                        text: "OK",
                        onPress: () => {},
                    },
                ]
            );
        } else {
            try {
                let data = {
                    name: route.params.username,
                    phone: route.params.phoneNumber,
                    password: route.params.password,
                    dateOfBirth: dateOfBirth.toISOString().split("T")[0],
                    gender: selectedValue,
                };
                const result = await fetch(LINK_REGISTER_POST, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                const jsonData = await result.json();
                
                if (jsonData.error?.status == 400) {
                    Alert.alert(
                        t("registerPhoneNumberValidateTitle"),
                        t("registerPhoneNumberValidateDesc"),
                        [
                            {
                                text: "OK",
                                onPress: () => {},
                            },
                        ]
                    );
                    setIsPosting(false);
                    return;
                }
                console.log(jsonData);
                dispatch(
                    setUserInfo({
                        user: {
                            __v: jsonData.user?.__v,
                            _id: jsonData.user?._id,
                            avatar: jsonData.user?.avatar,
                            background: jsonData.user?.background,
                            createdAt: jsonData.user?.createdAt,
                            dateOfBirth: jsonData.user?.dateOfBirth,
                            deleted: jsonData.user?.deleted,
                            gender: jsonData.user?.gender,
                            name: jsonData.user?.name,
                            password: jsonData.user?.password,
                            phone: jsonData.user?.phone,
                            qrCode: jsonData.user?.qrCode,
                            updatedAt: jsonData.user?.updatedAt,
                            friends: jsonData.user?.friends,
                        },
                        accessToken: jsonData.accessToken,
                        refreshToken: jsonData.refreshToken,
                    })
                );
                handleSaveInfoToSQLite(jsonData);
                setIsPosting(false);
                navigation.navigate("StepFiveRegister", {
                    avatar: jsonData.user?.avatar,
                    _id: jsonData.user?._id,
                    accessToken: jsonData.accessToken,
                });
            } catch (error) {
                console.log(error);
            }
            setIsPosting(false);
        }
    }

    return (
        <View
            style={[
                styles.wrapperAllBox,
                theme === lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
            ]}
        >
            <StatusBar />
            <SafeAreaView style={[styles.boxContainer]}>
                <View style={[styles.flex1]}>
                    <View style={[styles.navigationTabBox]}>
                        <Text style={[styles.currentTabName]}>
                            {t("registerChooseDateAndGenderTitle")}
                        </Text>
                    </View>
                    <Text
                        style={[
                            styles.textChooseGenderDesc,
                            theme == lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                            theme == lightMode
                                ? commonStyles.lightSecondaryBackground
                                : commonStyles.darkSecondaryBackground,
                        ]}
                    >
                        {t("registerChooseDateAndGenderDesc")}
                    </Text>
                    <View style={[styles.boxChooseGender]}>
                        <Text
                            style={[
                                styles.textGenderTitle,
                                theme == lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {t("registerGenderTitle")}
                        </Text>
                        <View style={[styles.boxBtnChooseGender]}>
                            <TouchableOpacity
                                style={[styles.btnChooseGender]}
                                activeOpacity={1}
                                onPress={() => setSelectedValue("male")}
                            >
                                <View style={[styles.boxImageChooseGender]}>
                                    <Image
                                        source={require("../../../assets/gender_male.png")}
                                        style={[styles.imageChooseGender]}
                                        resizeMode="contain"
                                    />
                                    <CustomRadioButton
                                        value="male"
                                        selected={"male" === selectedValue}
                                        onPress={() => setSelectedValue("male")}
                                        style={styles.btnRadioChooseRender}
                                    />
                                </View>
                                <Text
                                    style={[
                                        styles.titleGenderName,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    {t("registerGenderMale")}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btnChooseGender]}
                                activeOpacity={1}
                                onPress={() => setSelectedValue("female")}
                            >
                                <View style={[styles.boxImageChooseGender]}>
                                    <Image
                                        source={require("../../../assets/gender_female.png")}
                                        style={[styles.imageChooseGender]}
                                        resizeMode="contain"
                                    />
                                    <CustomRadioButton
                                        value="female"
                                        selected={"female" === selectedValue}
                                        onPress={() =>
                                            setSelectedValue("female")
                                        }
                                        style={styles.btnRadioChooseRender}
                                    />
                                </View>
                                <Text
                                    style={[
                                        styles.titleGenderName,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    {t("registerGenderFemale")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[styles.flex1, styles.borderTopBox]}>
                    <Text
                        style={[
                            styles.textDateOfBirthTitle,
                            theme == lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {t("registerDateOfBirthTitle")}
                    </Text>
                    <DatePicker
                        height={220}
                        value={dateOfBirth}
                        fadeColor={
                            theme === lightMode
                                ? commonStyles.lightPrimaryBackground
                                      .backgroundColor
                                : commonStyles.darkSecondaryBackground
                                      .backgroundColor
                        }
                        onChange={(value) => {
                            setDateOfBirth(value);
                        }}
                        textColor={
                            theme === lightMode
                                ? commonStyles.lightPrimaryText.color
                                : commonStyles.darkPrimaryText.color
                        }
                    />
                    <View style={[styles.btnContinueWrapper]}>
                        <TouchableOpacity
                            style={[
                                styles.btnContinueBox,
                                validateForm()
                                    ? styles.btnContinueBoxActive
                                    : null,
                            ]}
                            activeOpacity={1}
                            disabled={!validateForm()}
                            onPress={handleNavigateLayout}
                        >
                            {isPosting ? (
                                <ActivityIndicator
                                    color={commonStyles.darkPrimaryText.color}
                                    size={"small"}
                                />
                            ) : (
                                <Text
                                    style={[
                                        styles.textBtnContinueBox,
                                        commonStyles.darkPrimaryText,
                                    ]}
                                >
                                    {t("next")}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}
