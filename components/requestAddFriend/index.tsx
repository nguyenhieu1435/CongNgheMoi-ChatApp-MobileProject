import { useTranslation } from "react-i18next";
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { styles } from "./styles";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import { useState } from "react";
import { LINK_REQUEST_ADD_FRIEND } from "@env";
import { IUserResultSearch } from "../searchDetailPopup";

interface IProps {
    navigation: any;
    route: any;
}

export default function RequestAddFriend({ navigation, route }: IProps) {
    const { t } = useTranslation();
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const userInfo = useSelector((state: IRootState) => state.userInfo.user);

    const [note, setNote] = useState(`Xin chào tôi là ${userInfo?.name}, tôi muốn kết bạn với bạn!`);
    const TEXT_LIMIT = 150;
    const avatar = route.params?.themInfo;
    const name = route.params?.name;
    const [isSending, setIsSending] = useState(false);

    const handleSendRequestAddFriend = async() =>{
        try {
            setIsSending(true);
            const response = await fetch(LINK_REQUEST_ADD_FRIEND, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0aGFvYW5oaGFhMUBnbWFpbC5jb20iLCJpYXQiOjE3MTI0MjA3MzgsImV4cCI6MTcxMzAyNTUzOH0.jZxEOK29PUy0ySlMzgFD8RpcZw3kKDyvvc_OKqb81iU",
                },
                body: JSON.stringify({
                    friendId: route.params?._id,
                    note: note
                }),
            });
        } catch (error) {
            
        }
        setIsSending(false);
    }

    return (
        <View
            style={[
                styles.requestAddFriendContainer,
                {
                    backgroundColor:
                        lightMode == theme
                            ? commonStyles.chatNavbarBorderBottomColorLight
                                  .color
                            : commonStyles.chatNavbarBorderBottomColorDark
                                  .color,
                },
            ]}
        >
            <StatusBar />
            <SafeAreaView style={[styles.requestAddFriendSafeArea]}>
                <View style={[styles.requestAddFriendHeader]}>
                    <TouchableOpacity
                        onPress={()=> navigation.goBack()}
                    >
                        <Image
                            source={require("../../assets/close-line-icon.png")}
                            style={[styles.requestAddFriendCloseIcon]}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.requestAddFriendPageTitle]}>
                        {t("contactInPhoneAddFriendTitle")}
                    </Text>
                </View>
                <View
                    style={[
                        styles.requestAddFriendBody,
                        theme == lightMode
                            ? commonStyles.lightPrimaryBackground
                            : commonStyles.darkPrimaryBackground,
                    ]}
                >
                    <View
                        style={[
                            styles.requestAddFriendUser,
                            {
                                borderBottomWidth: 1,
                                borderBottomColor:
                                    theme == lightMode
                                        ? commonStyles
                                              .chatNavbarBorderBottomColorLight
                                              .color
                                        : commonStyles
                                              .chatNavbarBorderBottomColorDark
                                              .color,
                                paddingBottom: 10,
                            },
                        ]}
                    >
                        <Image
                            source={{
                                uri: avatar,
                            }}
                            style={[styles.requestAddFriendUserAvatar]}
                        />
                        <Text
                            style={[
                                styles.requestAddFriendUserName,
                                theme == lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {name}
                        </Text>
                    </View>
                    <View>
                        <View style={[styles.requestAddFriendInputContainer]}>
                            <TextInput
                                multiline={true}
                                numberOfLines={5}
                                value={note}
                                onChangeText={(text) => {
                                    if (text.length <= TEXT_LIMIT) {
                                        setNote(text);
                                    }
                                }}

                                style={[
                                    styles.requestAddFriendTextInput,
                                    {
                                        color:
                                            theme == lightMode
                                                ? commonStyles.lightPrimaryText
                                                      .color
                                                : commonStyles.darkPrimaryText
                                                      .color,
                                    },
                                ]}
                                placeholderTextColor={
                                    theme == lightMode
                                        ? commonStyles.lightSecondaryText.color
                                        : commonStyles.darkSecondaryText.color
                                }
                            />
                            <TouchableOpacity
                                style={[styles.requestAddFriendClearTextBtn]}
                                onPress={() => setNote("")}
                            >
                                <Image
                                    source={require("../../assets/close-line-icon.png")}
                                    style={[
                                        styles.requestAddFriendClearTextIcon,
                                        {
                                            tintColor:
                                                theme == lightMode
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
                        </View>
                        <Text
                            style={[
                                styles.requestAddFriendTextLength,
                                {
                                    color:
                                        theme == lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color,
                                },
                            ]}
                        >
                            {`${note.length}/${TEXT_LIMIT}`}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.requestAddFriendSendRequestBtn]}
                    disabled={isSending}
                >
                    {
                        isSending
                        ?
                        <ActivityIndicator
                            size={"small"}
                            color={
                                commonStyles.darkPrimaryText.color
                            }
                        />
                        :
                        <Text
                            style={[
                                styles.requestAddFriendSendRequestText,
                                {
                                    backgroundColor:
                                        commonStyles.primaryColor.color,
                                    color: commonStyles.darkPrimaryText.color,
                                },
                            ]}
                        >
                            {t("requestAddFriendSendRequest")}
                        </Text>
                        }
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}
