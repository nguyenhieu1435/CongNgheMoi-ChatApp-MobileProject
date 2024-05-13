import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import { useState } from "react";
import { CustomRadioButton } from "../register/stepFourRegister";
import DatePicker from "react-native-date-picker";
import { LINK_USER_METHOD } from "@env";
import { setUserInfo, updateOnlyUserInfo, userInfoInterfaceDetailI, userInfoInterfaceI } from "../../redux_toolkit/slices/userInfo.slice";

interface IEditProfileProps {
    navigation: any;
    route: any;
}

export default function EditProfile({ navigation, route }: IEditProfileProps) {
    const { t } = useTranslation();
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const userInfo = useSelector((state: IRootState) => state.userInfo);

    const [name, setName] = useState<string>(userInfo.user?.name || "");
    const [gender, setGender] = useState<string>(
        userInfo.user?.gender.toLowerCase() || "male"
    );
    const [dob, setDob] = useState<Date>(
        new Date(userInfo.user?.dateOfBirth || "")
    );
    const [openDob, setOpenDob] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    
    

    // convert Date value to dd-mm-yyyy if value < 10 then add 0 before value
    function convertDate(date: Date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return `${day < 10 ? "0" + day : day}-${
            month < 10 ? "0" + month : month
        }-${year}`;
    }

    function handleExitNotSaveChanges() {
        Alert.alert(t("notificationTitle"), t("alertExitWithoutSave"), [
            {
                text: t("cancel"),
                style: "cancel",
            },
            {
                text: t("ok"),
                onPress: () => navigation.goBack(),
            },
        ]);
    }
    async function handleSaveChanges() {
        if (!name.trim()){
            return;
        }        
        try {
            setIsLoading(true);
            const resp = await fetch(LINK_USER_METHOD, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
                body: JSON.stringify({
                    name,
                    gender,
                    dateOfBirth: dob.toISOString(),
                })
            })
            if (resp.ok) {
                const data = await resp.json() as userInfoInterfaceDetailI;
                dispatch(updateOnlyUserInfo(data))
                setIsLoading(false);
                navigation.goBack();
            }
        } catch (error) {
            console.log(error);            
        }
        setIsLoading(false);
    }

    return (
        <View
            style={[
                theme === lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
                styles.editProfileWrapper,
            ]}
        >
            <StatusBar />
            <SafeAreaView style={[styles.editProfileContainer]}>
                <Text
                    style={[
                        styles.editProfileTitle,
                        theme === lightMode
                            ? commonStyles.lightPrimaryText
                            : commonStyles.darkPrimaryText,
                    ]}
                >
                    {t("editProfileTitle")}
                </Text>
                <Text
                    style={[
                        styles.editProfileDescription,
                        theme === lightMode
                            ? commonStyles.lightSecondaryText
                            : commonStyles.darkSecondaryText,
                    ]}
                >
                    {t("editProfileDescription")}
                </Text>

                <Text
                    style={[
                        styles.editProfileGeneralInformation,
                        theme === lightMode
                            ? commonStyles.lightSecondaryText
                            : commonStyles.darkSecondaryText,
                    ]}
                >
                    {t("profileGeneralInformation")}
                </Text>

                <View
                    style={[
                        styles.editProfileGeneralInformationBox,
                        {
                            borderColor:
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
                    <Text
                        style={[
                            styles.editProfileGeneralInformationInputTitle,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                            theme === lightMode
                                ? commonStyles.lightPrimaryBackground
                                : commonStyles.darkPrimaryBackground,
                        ]}
                    >
                        {t("profileName")}
                    </Text>
                    <TextInput
                        style={[
                            styles.editProfileGeneralInformationInput,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>

                <View
                    style={[
                        styles.editProfileGeneralInformationBox,
                        {
                            borderColor:
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
                    <Text
                        style={[
                            styles.editProfileGeneralInformationInputTitle,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                            theme === lightMode
                                ? commonStyles.lightPrimaryBackground
                                : commonStyles.darkPrimaryBackground,
                        ]}
                    >
                        {t("profileGender")}
                    </Text>

                    <View style={[styles.editProfileRadioButtonBox]}>
                        <CustomRadioButton
                            onPress={() => setGender("male")}
                            selected={gender === "male"}
                            value={"male"}
                        />
                        <Text
                            style={[
                                styles.editProfileGeneralInformationGenderName,
                                theme === lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {t("male")}
                        </Text>

                        <CustomRadioButton
                            onPress={() => setGender("female")}
                            selected={gender === "female"}
                            value={"female"}
                        />
                        <Text
                            style={[
                                styles.editProfileGeneralInformationGenderName,
                                theme === lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {t("female")}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => setOpenDob(true)}
                    style={[
                        styles.editProfileGeneralInformationBox,
                        {
                            borderColor:
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
                    <Text
                        style={[
                            styles.editProfileGeneralInformationInputTitle,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                            theme === lightMode
                                ? commonStyles.lightPrimaryBackground
                                : commonStyles.darkPrimaryBackground,
                        ]}
                    >
                        {t("dateOfBirth")}
                    </Text>

                    <Text
                        style={[
                            styles.editProfileDateOfBirthTitle,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {convertDate(dob)}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.editProfileGeneralInformationGeneralBtn]}
                    onPress={handleSaveChanges}
                    disabled={isLoading}
                >
                    {
                        isLoading
                        ?
                        <ActivityIndicator size="small" color={commonStyles.darkPrimaryText.color} 
                            style={{
                                backgroundColor: commonStyles.primaryColor.color,
                                paddingVertical: 12,
                                borderRadius: 6,
                                width: "100%",
                            }}
                        />
                        :
                        <Text
                            style={[
                                styles.editProfileGeneralInformationGeneralSaveBtn,
                                commonStyles.darkPrimaryText,
                                {
                                    backgroundColor:
                                        commonStyles.primaryColor.color,
                                },
                            ]}
                        >
                            {t("saveChanges")}
                        </Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleExitNotSaveChanges}
                    style={[styles.editProfileGeneralInformationGeneralBtn]}
                >
                    <Text
                        style={[
                            styles.editProfileGeneralInformationGeneralCancelBtn,
                            commonStyles.darkPrimaryText,
                            {
                                backgroundColor:
                                    commonStyles.redPrimaryColor.color,
                            },
                        ]}
                    >
                        {t("cancel")}
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>

            <DatePicker
                mode="date"
                modal
                open={openDob}
                date={dob}
                onConfirm={(date) => {
                    let age = new Date().getFullYear() - date.getFullYear();

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
                        return;
                    }
                    console.log(date);
                    setOpenDob(false);
                    setDob(date);
                }}
                onCancel={() => {
                    setOpenDob(false);
                }}
            />
        </View>
    );
}
