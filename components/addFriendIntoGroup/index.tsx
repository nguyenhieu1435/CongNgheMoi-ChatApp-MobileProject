import {
    ActivityIndicator,
    Image,
    ScrollView,
    SectionList,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { useTranslation } from "react-i18next";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { IConversation, IGroupConversation, IUserResultSearch } from "../../configs/interfaces";
import { LINK_GET_MY_FRIENDS, LINK_GROUP } from "@env";
import classificationFriendListByName from "../../utils/classificationFriendByName";
import { CustomRadioButton } from "../register/stepFourRegister";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";

export interface ISectionMyFriend {
    title: string;
    data: IUserResultSearch[];
}

export default function AddFriendIntoGroup({
    navigation, route
}: {
    navigation: any;
    route: any
}) {
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { t } = useTranslation();
    const [textSearch, setTextSearch] = useState<string>("");
    const [isKeyboardDefault, setIsKeyBoardDefault] = useState(true);
    const [selectedFriends, setSelectedFriends] = useState<IUserResultSearch[]>(
        []
    );
    const [sectionMyFriend, setSectionMyFriend] = useState<ISectionMyFriend[]>(
        []
    );
    const userInfo = useSelector((state: IRootState) => state.userInfo);
    const [isLoading, setIsLoading] = useState(false);
    const conversation = route.params.conversation as IConversation;
    const socket = route.params.socket as Socket<DefaultEventsMap, DefaultEventsMap>;
    const setConversation = route.params.setConversation as React.Dispatch<React.SetStateAction<IConversation>>;

    async function getFriendList() {
        try {
            const response = await fetch(LINK_GET_MY_FRIENDS, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                let newDataFiltered = [] as IUserResultSearch[];
                if (Array.isArray(data.friends)){
                    let userIdsInGroup = conversation.users.map(user => user._id);

                    newDataFiltered = data.friends.filter((user: IUserResultSearch) => {
                        return !userIdsInGroup.includes(user._id)
                    }) as IUserResultSearch[];
                }
                const finalData = classificationFriendListByName(
                    newDataFiltered
                );
                setSectionMyFriend(finalData);
            } else {
                setSectionMyFriend([]);
            }
        } catch (error) {
            console.log("error", error);
            setSectionMyFriend([]);
        }
    }
    function addAndRemoveUserSelected(userSelected: IUserResultSearch) {
        const isExist = selectedFriends.find(
            (user) => user._id === userSelected._id
        );
        if (isExist) {
            setSelectedFriends(
                selectedFriends.filter((user) => user._id !== userSelected._id)
            );
        } else {
            setSelectedFriends([...selectedFriends, userSelected]);
        }
    }

    function renderFriendItem(item: IUserResultSearch) {
        return (
            <TouchableOpacity
                key={item._id}
                style={[styles.createGroupSelectedMemberContainer]}
                onPress={() => addAndRemoveUserSelected(item)}
            >
                <CustomRadioButton
                    onPress={() => {
                        addAndRemoveUserSelected(item);
                    }}
                    selected={selectedFriends.some(
                        (user) => user._id === item._id
                    )}
                    value={item._id}
                />
                <Image
                    source={{
                        uri: item.avatar,
                    }}
                    style={[styles.createGroupSelectedMemberAvatar]}
                />
                <View style={[styles.createGroupSelectedMemberInfo]}>
                    <Text
                        style={[
                            styles.createGroupSelectedMemberName,
                            theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText,
                        ]}
                    >
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    useEffect(() => {
        getFriendList();
    }, []);

    function filterByTextSearch() {
        let newSectionMyFriend = [] as ISectionMyFriend[];
        sectionMyFriend.forEach((section) => {
            const newData = section.data.filter((user) => {
                return user.name
                    .toLowerCase()
                    .includes(textSearch.toLowerCase());
            });
            if (newData.length > 0) {
                newSectionMyFriend.push({
                    title: section.title,
                    data: newData,
                });
            }
        });
        return newSectionMyFriend;
    }

    async function handleAddFriendIntoGroup() {
        try {
            setIsLoading(true);
            const userIds = selectedFriends.map((user) => user._id);
            const response = await fetch(`${LINK_GROUP}/${conversation._id}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
                body: JSON.stringify({
                    userIds: userIds
                })
            })
            if (response.ok){
                const data = await response.json();
                console.log("data response add member: ", data);

                socket.emit("addOrUpdateConversation", {
                    conversation: data,
                    userIds: userIds
                })
                setConversation(data as IConversation)
                setIsLoading(false);
                navigation.goBack();
            }
        } catch (error) {
            console.log("error", error);
        }
        setIsLoading(false);
    }
    

    return (
        <View
            style={[
                styles.addFriendIntoGroupWrapper,
                theme == lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
            ]}
        >
            <StatusBar />
            <SafeAreaView style={[styles.addFriendIntoGroupContainer]}>
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
                        onPress={() => navigation.goBack()}
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
                            <Text>{selectedFriends.length}</Text>
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

                    <SectionList
                        style={{
                            paddingHorizontal: 20,
                        }}
                        contentContainerStyle={{
                            paddingBottom: 170,
                        }}
                        sections={
                            textSearch.trim()
                                ? filterByTextSearch()
                                : sectionMyFriend
                        }
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => renderFriendItem(item)}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text
                                style={{
                                    fontSize: 19,
                                    fontWeight: "500",
                                    color: commonStyles.primaryColor.color,
                                }}
                            >
                                {title}
                            </Text>
                        )}
                    />
                </View>
                {selectedFriends.length > 0 && (
                    <View
                        style={[
                            styles.createGroupUserListSelectedPopup,
                            theme === lightMode
                                ? commonStyles.lightPrimaryBackground
                                : commonStyles.darkPrimaryBackground,
                            {
                                shadowColor:
                                    theme === lightMode
                                        ? commonStyles.lightPrimaryText.color
                                        : commonStyles.darkPrimaryText.color,
                                shadowOffset: {
                                    width: 0,
                                    height: 7,
                                },
                                shadowOpacity: 0.43,
                                shadowRadius: 9.51,

                                elevation: 15,
                            },
                        ]}
                    >
                        <ScrollView
                            horizontal={true}
                            style={[styles.createGroupSelectedMemberList]}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={true}
                        >
                            {selectedFriends
                                .filter((item) => selectedFriends.includes(item))
                                .map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() =>
                                                addAndRemoveUserSelected(item)
                                            }
                                            style={[
                                                styles.createGroupSelectedMemberRemoveBtnContainer,
                                            ]}
                                        >
                                            <Image
                                                source={{
                                                    uri: item.avatar,
                                                }}
                                                style={[
                                                    styles.createGroupSelectedMemberAvatar,
                                                ]}
                                            />
                                            <View
                                                style={[
                                                    styles.createGroupSelectedMemberRemoveBtn,
                                                    theme === lightMode
                                                        ? commonStyles.lightTertiaryBackground
                                                        : commonStyles.darkTertiaryBackground,
                                                ]}
                                            >
                                                <Image
                                                    source={require("../../assets/close-line-icon.png")}
                                                    style={[
                                                        styles.createGroupSelectedMemberRemoveBtnImage,
                                                        {
                                                            tintColor:
                                                                theme ===
                                                                lightMode
                                                                    ? commonStyles
                                                                          .lightPrimaryText
                                                                          .color
                                                                    : commonStyles
                                                                          .darkPrimaryText
                                                                          .color,
                                                        },
                                                    ]}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                        </ScrollView>
                        <TouchableOpacity
                            onPress={handleAddFriendIntoGroup}
                            style={[
                                styles.createGroupUserListNextStepBtn,
                                {
                                    opacity:
                                        selectedFriends.length > 0
                                            ? 1
                                            : 0.5,
                                },
                            ]}
                            disabled={
                                selectedFriends.length < 1 ||
                                isLoading
                            }
                        >
                            {isLoading ? (
                                <ActivityIndicator
                                    size={"small"}
                                    color={commonStyles.darkPrimaryText.color}
                                />
                            ) : (
                                <Image
                                    source={require("../../assets/arrow-right-line-icon.png")}
                                    style={[
                                        styles.createGroupUserListNextStepBtnImage,
                                    ]}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
}
