import { useTranslation } from "react-i18next";
import {
    View,
    Text,
    Modal,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    SectionList,
    ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux_toolkit/store";
import { lightMode } from "../../redux_toolkit/slices/theme.slice";
import commonStyles from "../../CommonStyles/commonStyles";
import {
    IConversation,
    IGroupConversation,
    IMessageItem,
    IUserResultSearch,
} from "../../configs/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CustomRadioButton } from "../register/stepFourRegister";
import { LINK_FORWARD_MESSAGE, LINK_GET_MY_CONVERSATIONS, LINK_GET_MY_FRIENDS, LINK_GROUP, LINK_OPEN_CONVERSATION } from "@env";
import classificationFriendListByName from "../../utils/classificationFriendByName";
import { ISectionMyFriend } from "../addFriendIntoGroup";
import CreateGroupAvatarWhenAvatarIsEmpty from "../../utils/createGroupAvatarWhenAvatarIsEmpty";
import { FlatList } from "react-native-gesture-handler";

interface IModalForwardMessageProps {
    conversation: IConversation;
    message: IMessageItem;
    setShowForwardModal: Dispatch<SetStateAction<IMessageItem | null>>;
}

export default function ModalForwardMessage({conversation, message, setShowForwardModal} : IModalForwardMessageProps) {
    const { t } = useTranslation();
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const [selectedFriends, setSelectedFriends] = useState<IUserResultSearch[]>(
        []
    );
    const [groupsSelected, setGroupsSelected] = useState<IGroupConversation[]>(
        []
    );
    const [myGroups, setMyGroups] = useState<IGroupConversation[]>([]);
    const [sectionFriendList, setSectionFriendList] = useState<
        ISectionMyFriend[]
    >([]);
    const userInfo = useSelector((state: IRootState) => state.userInfo);
    const [textSearch, setTextSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function getMyGroupList() {
        try {
            const response = await fetch(LINK_GROUP, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data as IGroupConversation[];
            } else {
                return [];
            }
        } catch (error) {
            console.log("error", error);
            return [];
        }
    }
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

                const finalData = classificationFriendListByName(
                    data.friends as IUserResultSearch[]
                );

                return finalData;
            } else {
                return [];
            }
        } catch (error) {
            console.log("error", error);
            return [];
        }
    }

    useEffect(() => {
        async function fetchDataPromiseAll() {
            const [friendList, groupList] = await Promise.all([
                getFriendList(),
                getMyGroupList(),
            ]);
            setSectionFriendList(friendList);
            setMyGroups(groupList);
        }
        fetchDataPromiseAll();
    }, []);

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

    function filterFriendByTextSearch() {
        let newSectionMyFriend = [] as ISectionMyFriend[];
        sectionFriendList.forEach((section) => {
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

    function addAndRemoveGroupSelected(groupSelected: IGroupConversation) {
        const isExist = groupsSelected.find(
            (group) => group._id === groupSelected._id
        );
        if (isExist) {
            setGroupsSelected(
                groupsSelected.filter(
                    (group) => group._id !== groupSelected._id
                )
            );
        } else {
            setGroupsSelected([...groupsSelected, groupSelected]);
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

    function renderGroupItem(item: IGroupConversation) {
        return (
            <TouchableOpacity
                key={item._id}
                style={[styles.createGroupSelectedMemberContainer]}
                onPress={() => addAndRemoveGroupSelected(item)}
            >
                <CustomRadioButton
                    onPress={() => {
                        addAndRemoveGroupSelected(item);
                    }}
                    selected={groupsSelected.some(
                        (group) => group._id === item._id
                    )}
                    value={item._id}
                />
                {
                    item.picture ? (
                    <Image
                        source={{
                            uri: item.picture,
                        }}
                        style={[styles.createGroupSelectedMemberAvatar]}
                    />
                    ) : (
                        CreateGroupAvatarWhenAvatarIsEmpty(item)
                    )
                }
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

    async function getConversationByIndividual(user: IUserResultSearch){
        try {
            const conversationResponse = await fetch(LINK_GET_MY_CONVERSATIONS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.accessToken}`,
                },
                body: JSON.stringify({
                    receiverUserId: user._id
                })
            })
            if (conversationResponse.ok){
                const conversationData = await conversationResponse.json()
                return conversationData as IConversation
            } else{
                throw new Error("Error when get conversation by individual")
            }
        } catch (error) {
            throw new Error("Error when get conversation by individual")
        }
    }

    async function handleForwardMessage(){
        setIsLoading(true)
        const listIndividualConversation = await Promise.all(selectedFriends.map((user) => {
            return getConversationByIndividual(user)
        }))
        const listGroupConversation = groupsSelected.map((group) => {
            return group._id
        })
        try {
            const response = await fetch(LINK_FORWARD_MESSAGE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.accessToken}`,
                },
                body: JSON.stringify({
                    messageId: message._id,
                    conversationIds: [
                        ...listGroupConversation,
                        ...listIndividualConversation.map((conversation) => conversation._id)
                    ]
                })
            })
            if (response.ok){
                console.log("Forward message success");
                setIsLoading(false)
                setShowForwardModal(null)
            }
        } catch (error) {
            console.log("error", error);
        }
        setIsLoading(false)
    }

    function handlePrintMessage(){
        if (message.messages.length > 0){
            return message.messages.map((messageDetail) => {
                if (messageDetail.type == "text"){
                    return messageDetail.content
                } else {
                    return "@"+messageDetail.content
                }
            }).join("")
        } else if (message.files.length > 0){
            return "[File]"
        } else if (message.location){
            return "[Location]"
        }
    }

    return (
        <Modal visible={true}>
            <View
                style={[
                    styles.modalContainer,
                    theme == lightMode
                        ? commonStyles.lightPrimaryBackground
                        : commonStyles.darkPrimaryBackground,
                ]}
            >
                <View
                    style={[
                        styles.modalHeaderContainer,
                        {
                            backgroundColor:
                                theme == lightMode
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
                        source={require("../../assets/close-line-icon.png")}
                        style={[styles.closeBtn]}
                    />
                    <View>
                        <Text style={[styles.modalHeaderTitle]}>
                            {t("forwardMessageTitle")}
                        </Text>
                        <Text style={[styles.modalHeaderSelectedNumberText]}>
                            {t("createGroupSelectedMember")}
                        </Text>
                    </View>
                </View>
                <View style={[styles.modalBodyContainer]}>
                    <View
                        style={[
                            styles.searchInputContainer,
                            {
                                backgroundColor:
                                    theme == lightMode
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
                            source={require("../../assets/search-line-icon.png")}
                            style={[styles.searchIcon]}
                        />
                        <TextInput
                            placeholder={t(
                                "registerPhoneInputSearchPlaceholder"
                            )}
                            style={[styles.searchTextInput]}
                            value={textSearch}
                            onChangeText={(text) => setTextSearch(text)}
                        />
                    </View>
                    <View
                        style={{
                            flexShrink: 1,
                            flexGrow: 1,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <Text
                                style={[
                                    styles.titleList
                                ]}
                            >Groups</Text>
                            <FlatList
                                data={myGroups}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => renderGroupItem(item)}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text
                                style={[
                                    styles.titleList
                                ]}
                            >Friends</Text>
                            <SectionList
                                style={{
                                    paddingHorizontal: 20,
                                }}
                                contentContainerStyle={{
                                    paddingBottom: 50,
                                }}
                                sections={
                                    textSearch.trim()
                                        ? filterFriendByTextSearch()
                                        : sectionFriendList
                                }
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) =>
                                    renderFriendItem(item)
                                }
                                renderSectionHeader={({
                                    section: { title },
                                }) => (
                                    <Text
                                        style={{
                                            fontSize: 19,
                                            fontWeight: "500",
                                            color: commonStyles.primaryColor
                                                .color,
                                        }}
                                    >
                                        {title}
                                    </Text>
                                )}
                            />
                        </View>
                    </View>
                    <View style={[styles.modalControlGroupContainer]}>
                        <ScrollView horizontal={true}></ScrollView>
                        <View
                            style={[styles.modalControlGroupTriggerContainer]}
                        >
                            <Text style={[styles.messageText]}>
                                Message: {handlePrintMessage()}
                            </Text>
                            <TouchableOpacity style={[styles.sendMessageBtn]}
                                disabled={(selectedFriends.length === 0 && groupsSelected.length === 0) || isLoading}
                                onPress={handleForwardMessage}
                            >
                                {
                                    isLoading
                                    ?
                                    <ActivityIndicator
                                        size="small"
                                        color={commonStyles.darkPrimaryText.color}
                                    />
                                    :
                                    <Image
                                        style={[styles.sendMessageBtnIcon]}
                                        source={require("../../assets/send-plane-2-fill-icon.png")}
                                    />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
