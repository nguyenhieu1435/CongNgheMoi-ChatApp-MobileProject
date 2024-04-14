import { Image, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function AddFriendIntoGroup({navigation}: {navigation: any}){
    const theme = useSelector((state: IRootState) => state.theme.theme)
    const {t} = useTranslation();
    const [textSearch, setTextSearch] = useState<string>("");
    const [isKeyboardDefault, setIsKeyBoardDefault] = useState(true);

    return (
        <View
        style={[
            styles.addFriendIntoGroupWrapper,
            theme == lightMode
                ? commonStyles.lightPrimaryBackground
                : commonStyles.darkPrimaryBackground,
        ]}
        >
            <StatusBar/>
            <SafeAreaView style={[
                styles.addFriendIntoGroupContainer
            ]}>
                <View
                    style={[
                        styles.addFriendIntoGroupHeader,
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
                    <TouchableOpacity
                        style={[styles.addFriendIntoGroupHeaderBtnBack]}
                        onPress={()=> navigation.goBack()}
                    >
                        <Image
                            source={require("../../assets/close-line-icon.png")}
                            style={[
                                styles.addFriendIntoGroupHeaderBtnBackImage,
                                {
                                    tintColor:
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                                  .color
                                            : commonStyles.darkPrimaryText
                                                  .color,
                                },
                            ]}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text
                            style={[
                                styles.addFriendIntoGroupHeaderTitle,
                                theme == lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {t("chatGroupAddMemberTitle")}
                        </Text>
                        <Text
                            style={[
                                styles.addFriendIntoGroupHeaderText,
                                theme == lightMode
                                    ? commonStyles.lightSecondaryText
                                    : commonStyles.darkSecondaryText,
                            ]}
                        >
                            {t("createGroupSelectedMember")}
                            <Text>{}</Text>
                        </Text>
                    </View>
                </View>
                <View>
                    <View
                        style={[
                            styles.addFriendIntoGroupSearchContainer,
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
                        <Image
                            style={[
                                styles.addFriendIntoGroupSearchIcon,
                                {
                                    tintColor:
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color,
                                },
                            ]}
                            source={require("../../assets/search-line-icon.png")}
                        />
                        <TextInput
                            value={textSearch}
                            onChangeText={setTextSearch}
                            placeholder={t("createGroupSearchPlaceholder")}
                            keyboardType={
                                isKeyboardDefault ? "default" : "number-pad"
                            }
                            placeholderTextColor={
                                theme === lightMode
                                    ? commonStyles.lightSecondaryText.color
                                    : commonStyles.darkSecondaryText.color
                            }
                            style={[
                                styles.addFriendIntoGroupSearchInput,
                                theme === lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        />
                        {textSearch ? (
                            <TouchableOpacity
                                onPress={() => setTextSearch("")}
                                style={[
                                    styles.addFriendIntoGroupClearInputBtn,
                                    {
                                        backgroundColor:
                                            theme === lightMode
                                                ? commonStyles.lightTertiaryText
                                                      .color
                                                : commonStyles.darkTertiaryText
                                                      .color,
                                    },
                                ]}
                            >
                                <Image
                                    style={[
                                        styles.addFriendIntoGroupInputBtnImage,
                                    ]}
                                    source={require("../../assets/close-line-icon.png")}
                                    tintColor={
                                        theme === lightMode
                                            ? commonStyles.darkPrimaryText.color
                                            : commonStyles.lightPrimaryText
                                                  .color
                                    }
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() =>
                                    setIsKeyBoardDefault(!isKeyboardDefault)
                                }
                                style={[
                                    styles.addFriendIntoGroupChooseTypeBtn,
                                    {
                                        borderColor:
                                            theme === lightMode
                                                ? commonStyles
                                                      .lightSecondaryText.color
                                                : commonStyles.darkSecondaryText
                                                      .color,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.addFriendIntoGroupTypeBtnText,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    {isKeyboardDefault ? "ABC" : "123"}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}