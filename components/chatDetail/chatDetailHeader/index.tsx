import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { memo, useState } from "react";
import { styles } from "./styles";
import commonStyles from "../../../CommonStyles/commonStyles";
import { lightMode } from "../../../redux_toolkit/slices/theme.slice";
import { FontAwesome } from "@expo/vector-icons";
import OutsidePressHandler from "react-native-outside-press";
import { TFunction } from "i18next";
import debounce from 'debounce';
import { IConversation, IUserInConversation } from "../../../configs/interfaces";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux_toolkit/store";

interface ChatDetailHeaderProps {
    theme: string;
    navigation: any;
    translation: TFunction<"translation", undefined>;
    textSearch: string;
    setTextSearch: (text: string) => void;
    conversation : IConversation;
}

function ChatDetailHeader({
    theme,
    navigation,
    translation: t,
    textSearch,
    setTextSearch,
    conversation,
}: ChatDetailHeaderProps) {
    const [showModalSearch, setShowModalSearch] = useState(false);
    const [showMoreAction, setShowMoreAction] = useState(false);
    const userInfo = useSelector((state: IRootState)=> state.userInfo)
    
    function setTextDebounce(text : string){
        debounce(()=>{
            setTextSearch(text)
            
        }, 500);
    }

    function getUserConversation(){
        return conversation.users.find(user => user._id != userInfo.user?._id)
    }

    return (
        <View
            style={[
                styles.chatDetailNavbar,
                {
                    borderBottomColor:
                        theme === lightMode
                            ? commonStyles.chatNavbarBorderBottomColorLight
                                  .color
                            : commonStyles.chatNavbarBorderBottomColorDark
                                  .color,
                    zIndex: 20,
                },
            ]}
        >
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[styles.btnGoback]}
            >
                <FontAwesome
                    name="angle-left"
                    size={24}
                    color={
                        theme === lightMode
                            ? commonStyles.lightSecondaryText.color
                            : commonStyles.darkSecondaryText.color
                    }
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                style={[styles.chatDetailNavbarUsernameBox]}
            >
                <Image
                    source={{ uri:  getUserConversation()?.avatar}}
                    resizeMode="cover"
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: 50,
                    }}
                />
                <Text
                    style={[
                        styles.chatDetailUsernameText,
                        theme === lightMode
                            ? commonStyles.lightPrimaryText
                            : commonStyles.darkPrimaryText,
                    ]}
                >
                    {getUserConversation()?.name}
                </Text>
                <View
                    style={[
                        styles.activityIcon,
                        {
                            backgroundColor:
                                commonStyles.activeOnlineColor.color,
                        },
                    ]}
                ></View>
            </TouchableOpacity>

            <View style={[styles.chatDetailNavbarBaseActions]}>
                <OutsidePressHandler
                    onOutsidePress={() => {
                        setShowModalSearch(false);
                    }}
                    style={[styles.chatDetailNavbarBaseActionItemBox]}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setShowModalSearch(!showModalSearch);
                        }}
                    >
                        <Image
                            source={require("../../../assets/search-line-icon.png")}
                            resizeMode="contain"
                            style={{
                                width: 23,
                                height: 23,
                            }}
                            tintColor={
                                theme === lightMode
                                    ? commonStyles.lightSecondaryText.color
                                    : commonStyles.darkSecondaryText.color
                            }
                        />
                    </TouchableOpacity>

                    {showModalSearch && (
                        <View
                            style={[
                                styles.chatDetailNavbarBaseActionItemPopup,
                                theme === lightMode
                                    ? commonStyles.lightFourBackground
                                    : commonStyles.darkFourBackground,
                                {
                                    shadowColor: "#0F223A",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.12,
                                    shadowRadius: 4,
                                    elevation: 4,
                                },
                            ]}
                        >
                            <TextInput
                                placeholder={t("chatDetailSearchPlaceholder")}
                                value={textSearch}
                                onChangeText={text => setTextDebounce(text)}
                                placeholderTextColor={
                                    theme === lightMode
                                        ? commonStyles.lightSecondaryText.color
                                        : commonStyles.darkSecondaryText.color
                                }
                                style={[
                                    styles.chatDetailNavbarBaseActionItePopupInput,
                                    theme === lightMode
                                        ? commonStyles.lightTertiaryBackground
                                        : commonStyles.darkTertiaryBackground,
                                    theme === lightMode
                                        ? commonStyles.lightTertiaryText
                                        : commonStyles.darkTertiaryText,
                                ]}
                            />
                        </View>
                    )}
                </OutsidePressHandler>

                <TouchableOpacity>
                    <Image
                        source={require("../../../assets/phone-line-icon.png")}
                        resizeMode="contain"
                        style={{
                            width: 23,
                            height: 23,
                        }}
                        tintColor={
                            theme === lightMode
                                ? commonStyles.lightSecondaryText.color
                                : commonStyles.darkSecondaryText.color
                        }
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        source={require("../../../assets/vidicon-line-icon.png")}
                        resizeMode="contain"
                        style={{
                            width: 23,
                            height: 23,
                        }}
                        tintColor={
                            theme === lightMode
                                ? commonStyles.lightSecondaryText.color
                                : commonStyles.darkSecondaryText.color
                        }
                    />
                </TouchableOpacity>

                <OutsidePressHandler
                    onOutsidePress={() => {
                        setShowMoreAction(false);
                    }}
                    style={[styles.chatDetailNavbarBaseActionItemBox]}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setShowMoreAction(!showMoreAction);
                        }}
                    >
                        <Image
                            source={require("../../../assets/more-line-icon.png")}
                            resizeMode="contain"
                            style={{
                                width: 23,
                                height: 23,
                            }}
                            tintColor={
                                theme === lightMode
                                    ? commonStyles.lightSecondaryText.color
                                    : commonStyles.darkSecondaryText.color
                            }
                        />
                    </TouchableOpacity>
                    {showMoreAction && (
                        <View
                            style={[
                                styles.chatDetailNavbarBaseActionMoreItemPopup,
                                theme === lightMode
                                    ? commonStyles.lightFourBackground
                                    : commonStyles.darkFourBackground,
                                {
                                    shadowColor: "#0F223A",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.12,
                                    shadowRadius: 4,
                                    elevation: 4,
                                },
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("ChatProfile");
                                }}
                                style={[
                                    styles.chatDetailNavbarBaseActionMoreItem,
                                ]}
                            >
                                <Text
                                    style={[
                                        theme === lightMode
                                            ? commonStyles.lightTertiaryText
                                            : commonStyles.darkTertiaryText,
                                        styles.navbarActionMoreItemText,
                                    ]}
                                >
                                    {t("chatDetaildMoreViewProfileTitle")}
                                </Text>
                                <Image
                                    source={require("../../../assets/user-chatlist-bottom-tab.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 17,
                                        height: 17,
                                    }}
                                    tintColor={
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color
                                    }
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.chatDetailNavbarBaseActionMoreItem,
                                ]}
                            >
                                <Text
                                    style={[
                                        theme === lightMode
                                            ? commonStyles.lightTertiaryText
                                            : commonStyles.darkTertiaryText,
                                        styles.navbarActionMoreItemText,
                                    ]}
                                >
                                    {t("chatDetailMoreMuteTitle")}
                                </Text>
                                <Image
                                    source={require("../../../assets/volume-mute-line-icon.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 17,
                                        height: 17,
                                    }}
                                    tintColor={
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color
                                    }
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.chatDetailNavbarBaseActionMoreItem,
                                ]}
                            >
                                <Text
                                    style={[
                                        theme === lightMode
                                            ? commonStyles.lightTertiaryText
                                            : commonStyles.darkTertiaryText,
                                        styles.navbarActionMoreItemText,
                                    ]}
                                >
                                    {t("chatDetailMoreDeleteTitle")}
                                </Text>
                                <Image
                                    source={require("../../../assets/delete-bin-line-icon.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 17,
                                        height: 17,
                                    }}
                                    tintColor={
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </OutsidePressHandler>
            </View>
        </View>
    );
}

export default memo(ChatDetailHeader);
