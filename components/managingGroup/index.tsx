import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import commonStyles from "../../CommonStyles/commonStyles";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import { IConversation } from "../../configs/interfaces";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";

export function ManagingGroup({
    navigation,
    route,
}: {
    navigation: any;
    route: any;
}) {
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { t } = useTranslation();
    const conversation = route.params.conversation as IConversation;
    const socket = route.params.socket as Socket<
        DefaultEventsMap,
        DefaultEventsMap
    >;
    const setConversation = route.params.setConversation as React.Dispatch<
        React.SetStateAction<IConversation>
    >;
   



    function createImageIfAvatarIsEmpty() {
        let users = conversation.users;
        if (users.length > 4) {
            users = users.slice(0, 4);
        }
        return (
            <View
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {users.map((user) => {
                    return (
                        <Image
                            source={{
                                uri: user.avatar,
                            }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                padding: 3,
                            }}
                        />
                    );
                })}
            </View>
        );
    }

    return (
        <View
            style={[
                {
                    flex: 1,
                },
                theme === lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
            ]}
        >
            <StatusBar />
            <SafeAreaView
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={[
                        styles.managingGroupHeaderBox,
                        {
                            borderBottomColor:
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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require("../../assets/arrow-left-s-line-icon.png")}
                            style={[
                                styles.managingGroupHeaderGoBackBtn,
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
                    <Text
                        style={[
                            styles.managingGroupHeaderTitle,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {t("managingGroupTitle")}
                    </Text>
                </View>
                <View>
                    <View
                        style={{
                            alignItems: "center",
                            marginTop: 35
                        }}
                    >
                        <View>
                            {conversation.picture ? (
                                <Image
                                    source={{ uri: conversation.picture }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 50,
                                    }}
                                />
                            ) : (
                                createImageIfAvatarIsEmpty()
                            )}
                        </View>
                        <View
                            style={{
                                width: "80%"
                            }}
                        >
                            <Text
                                style={{textAlign: "center",
                                    marginTop: 15,
                                    fontSize: 18,
                                    marginBottom: 10,
                                    fontWeight: "600"
                                }}
                            >{conversation.name}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 25,
                            justifyContent: "center",
                            marginTop: 25,
                            
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                gap: 5
                            }}
                            onPress={()=> navigation.navigate("AddFriendIntoGroup", {
                                conversation: conversation,
                                socket: socket,
                                setConversation: setConversation,
                            })}
                        >
                            <Image
                                source={require("../../assets/user-add-line.png")}
                                style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: "contain"
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >{t("managingGroupAddMember")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                gap: 5
                            }}
                            onPress={()=> {
                            
                                navigation.navigate("ShowMembersInGroup", {
                                    conversation: conversation,
                                    socket: socket,
                                    setConversation: setConversation,
                                }
                            )}}
                        >
                            <Image
                                source={require("../../assets/group-bottom-tab.png")}
                                style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: "contain"
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >{t("managingGroupShowMembers")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}
