import { LINK_GET_MY_FRIENDS, LINK_GROUP } from '@env';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import OutsidePressHandler from 'react-native-outside-press';
import { useSelector } from 'react-redux';
import EmojiPicker from 'rn-emoji-keyboard';
import commonStyles from '../../CommonStyles/commonStyles';
import {
    IGroupConversation,
    IUserResultSearch,
} from '../../configs/interfaces';
import { lightMode } from '../../redux_toolkit/slices/theme.slice';
import { IRootState } from '../../redux_toolkit/store';
import { handleNavigateToChatDetail } from '../../utils/handleNavigateToChatDetail';
import { CustomRadioButton } from '../register/stepFourRegister';
import { styles } from './styles';

const typeSelectedEnum = {
    recent: 'recent',
    contact: 'contact',
};
interface ICreateGroupProps {
    navigation: any;
    route: any;
}

export default function CreateGroup({ navigation, route }: ICreateGroupProps) {
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { t } = useTranslation();
    const [usersSelected, setUsersSelected] = useState<IUserResultSearch[]>([]);
    const [isFocusInputName, setIsFocusInputName] = useState(false);
    const [isKeyboardDefault, setIsKeyBoardDefault] = useState(true);
    const [textSearch, setTextSearch] = useState('');
    const [groupName, setGroupName] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const { showActionSheetWithOptions } = useActionSheet();
    const [hasGalleryPermission, setHasGalleryPermission] = useState<
        null | boolean
    >(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<
        null | boolean
    >(null);
    const [groupAvatar, setGroupAvatar] = useState<null | string>(null);
    const userInfo = useSelector((state: IRootState) => state.userInfo);
    const [myFriends, setMyFriends] = useState<IUserResultSearch[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function handleChooseImageFromLibrary() {
        if (!hasGalleryPermission) {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(status === 'granted');
        }
        const newAvatar = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!newAvatar.canceled) {
            const firstElement = newAvatar.assets?.[0];
            if (firstElement.type === 'image') {
                setGroupAvatar(firstElement.uri || null);
            }
        }
    }

    async function handleTakePhotoFromCamera() {
        if (!hasCameraPermission) {
            const { status } =
                await ImagePicker.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        }
        let options = {
            allowsEditing: true,
            allowsMultipleSelection: false,
            cameraType: ImagePicker.CameraType.front,
            quantity: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        };
        const result = await ImagePicker.launchCameraAsync(options);

        if (!result.canceled) {
            const firstElement = result.assets?.[0];
            if (firstElement.type === 'image') {
                setGroupAvatar(firstElement.uri || null);
            }
        }
    }

    const handleOpenActionSheet = () => {
        const options = [
            t('registerChooseImageFromLibrary'),
            t('registerTakePhotoFromCamera'),
            t('cancel'),
        ];
        const cancelButtonIndex = 2;
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            (selectedIndex) => {
                switch (selectedIndex) {
                    case 0:
                        handleChooseImageFromLibrary();
                        break;
                    case 1:
                        handleTakePhotoFromCamera();
                        break;
                    case cancelButtonIndex:
                        break;
                    default:
                        break;
                }
            },
        );
    };

    async function getMyFriends() {
        try {
            const response = await fetch(LINK_GET_MY_FRIENDS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setMyFriends(data.friends as IUserResultSearch[]);
            } else {
                setMyFriends([]);
            }
        } catch (error) {
            console.log(error);
            setMyFriends([]);
        }
    }

    useEffect(() => {
        getMyFriends();
    }, []);

    function addAndRemoveUserSelected(userSelected: IUserResultSearch) {
        const isExist = usersSelected.find(
            (user) => user._id === userSelected._id,
        );
        if (isExist) {
            setUsersSelected(
                usersSelected.filter((user) => user._id !== userSelected._id),
            );
        } else {
            setUsersSelected([...usersSelected, userSelected]);
        }
    }

    async function handleCreateGroup() {
        console.log('Create group');
        const formData = new FormData();
        formData.append('name', groupName.trim());
        if (groupAvatar) {
            let splitPath = groupAvatar.split('/');
            let extName = splitPath[splitPath.length - 1].split('.').pop();
            formData.append('avatar', {
                uri:
                    Platform.OS === 'ios'
                        ? groupAvatar.replace('file://', '')
                        : groupAvatar,
                name: splitPath[splitPath.length - 1],
                type: `image/${extName}`,
            });
        }
        const friendsId = usersSelected.map((user) => user._id);
        formData.append('users', JSON.stringify(friendsId));

        try {
            setIsLoading(true);
            const response = await fetch(LINK_GROUP, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
                body: formData,
            });
            if (response.ok) {
                const data = (await response.json()) as IGroupConversation;
                console.log('Result create group: ', data);
                handleNavigateToChatDetail(
                    data,
                    setIsLoading,
                    userInfo,
                    navigation,
                );
            } else {
                const data = await response.json();
                console.log('Error create group: ', data);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    function renderUserByRecent(item: IUserResultSearch, index: number) {
        return (
            <TouchableOpacity
                key={index}
                style={[styles.createGroupSelectedMemberContainer]}
                onPress={() => addAndRemoveUserSelected(item)}
            >
                <CustomRadioButton
                    onPress={() => {
                        addAndRemoveUserSelected(item);
                    }}
                    selected={usersSelected.some(
                        (user) => user._id === item._id,
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
    function handleGoToBackScreen() {
        Alert.alert(t('createGroupGoBackTitle'), t('createGroupGoBackDesc'), [
            {
                text: t('cancel'),
                style: 'cancel',
            },
            {
                text: t('confirm'),
                onPress: () => navigation.navigate('Contacts'),
            },
        ]);
    }

    return (
        <View
            style={[
                styles.createGroupWrapper,
                theme == lightMode
                    ? commonStyles.lightPrimaryBackground
                    : commonStyles.darkPrimaryBackground,
            ]}
        >
            <StatusBar />
            <SafeAreaView style={[styles.createGroupContainer]}>
                <View
                    style={[
                        styles.createGroupHeader,
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
                        style={[styles.createGroupHeaderBtnBack]}
                        onPress={handleGoToBackScreen}
                    >
                        <Image
                            source={require('../../assets/close-line-icon.png')}
                            style={[
                                styles.createGroupHeaderBtnBackImage,
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
                                styles.createGroupHeaderTitle,
                                theme == lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        >
                            {t('createGroupTitle')}
                        </Text>
                        <Text
                            style={[
                                styles.createGroupSelectedMemberText,
                                theme == lightMode
                                    ? commonStyles.lightSecondaryText
                                    : commonStyles.darkSecondaryText,
                            ]}
                        >
                            {t('createGroupSelectedMember')}
                            <Text>{usersSelected.length}</Text>
                        </Text>
                    </View>
                </View>
                <View style={[styles.createGroupBodyMainScroll]}>
                    <View
                        style={[
                            styles.createGroupChooseAvatarAndEnterNameContainer,
                        ]}
                    >
                        <TouchableOpacity
                            onPress={handleOpenActionSheet}
                            style={[
                                styles.createGroupChooseAvatarBtn,
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
                            {groupAvatar ? (
                                <Image
                                    source={{ uri: groupAvatar }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'cover',
                                        borderRadius: 50,
                                    }}
                                />
                            ) : (
                                <Image
                                    style={[
                                        styles.createGroupChooseAvatarBtnImage,
                                        {
                                            tintColor:
                                                theme === lightMode
                                                    ? commonStyles
                                                          .lightSecondaryText
                                                          .color
                                                    : commonStyles
                                                          .darkSecondaryText
                                                          .color,
                                        },
                                    ]}
                                    source={require('../../assets/camera-fill-icon.png')}
                                />
                            )}
                        </TouchableOpacity>
                        <OutsidePressHandler
                            style={[styles.createGroupEnterNameContainer]}
                            onOutsidePress={() => setIsFocusInputName(false)}
                        >
                            <View
                                style={[
                                    styles.createGroupEnterNameInputContainer,
                                    {
                                        borderBottomColor: isFocusInputName
                                            ? commonStyles.primaryColor.color
                                            : 'transparent',
                                    },
                                ]}
                            >
                                <TextInput
                                    onFocus={() => setIsFocusInputName(true)}
                                    placeholderTextColor={
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color
                                    }
                                    value={groupName}
                                    onChangeText={setGroupName}
                                    placeholder={t(
                                        'createGroupInputGroupNamePlaceholder',
                                    )}
                                    style={[
                                        styles.createGroupEnterNameInput,
                                        theme === lightMode
                                            ? commonStyles.lightPrimaryText
                                            : commonStyles.darkPrimaryText,
                                    ]}
                                />
                                {isFocusInputName && (
                                    <TouchableOpacity
                                        style={[
                                            styles.createGroupEnterNameEmojiBtn,
                                        ]}
                                        onPress={() => setShowEmoji(!showEmoji)}
                                    >
                                        <Image
                                            style={[
                                                styles.createGroupEnterNameEmojiBtnImage,
                                                {
                                                    tintColor:
                                                        theme === lightMode
                                                            ? commonStyles
                                                                  .lightPrimaryText
                                                                  .color
                                                            : commonStyles
                                                                  .darkPrimaryText
                                                                  .color,
                                                },
                                            ]}
                                            source={require('../../assets/emoji-emotions-icon.png')}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                            {isFocusInputName && (
                                <TouchableOpacity
                                    onPress={() => setIsFocusInputName(false)}
                                    style={[
                                        styles.createGroupEnterNameConfirmBtn,
                                    ]}
                                >
                                    <Image
                                        style={[
                                            styles.createGroupEnterNameConfirmBtnImage,
                                        ]}
                                        source={require('../../assets/check-line-icon.png')}
                                    />
                                </TouchableOpacity>
                            )}
                            <EmojiPicker
                                open={showEmoji}
                                onEmojiSelected={(emoji) => {
                                    setIsFocusInputName(true);
                                    setGroupName(groupName + emoji.emoji);
                                }}
                                onClose={() => {
                                    setShowEmoji(false);
                                    setIsFocusInputName(true);
                                }}
                                enableSearchBar
                                enableRecentlyUsed
                                theme={
                                    theme === lightMode
                                        ? {
                                              container:
                                                  commonStyles
                                                      .lightPrimaryBackground
                                                      .backgroundColor,
                                              header: commonStyles
                                                  .lightPrimaryText.color,
                                              search: {
                                                  text: commonStyles
                                                      .lightPrimaryText.color,
                                                  placeholder:
                                                      commonStyles
                                                          .lightPrimaryText
                                                          .color,
                                                  icon: commonStyles
                                                      .lightPrimaryText.color,
                                              },
                                          }
                                        : {
                                              container:
                                                  commonStyles
                                                      .darkPrimaryBackground
                                                      .backgroundColor,
                                              header: commonStyles
                                                  .darkPrimaryText.color,
                                              search: {
                                                  text: commonStyles
                                                      .darkPrimaryText.color,
                                                  placeholder:
                                                      commonStyles
                                                          .darkPrimaryText
                                                          .color,
                                                  icon: commonStyles
                                                      .darkPrimaryText.color,
                                              },
                                          }
                                }
                            />
                        </OutsidePressHandler>
                    </View>
                    <View
                        style={[
                            styles.createGroupSearchContainer,
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
                                styles.createGroupSearchIcon,
                                {
                                    tintColor:
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                                  .color
                                            : commonStyles.darkSecondaryText
                                                  .color,
                                },
                            ]}
                            source={require('../../assets/search-line-icon.png')}
                        />
                        <TextInput
                            value={textSearch}
                            onChangeText={setTextSearch}
                            placeholder={t('createGroupSearchPlaceholder')}
                            keyboardType={
                                isKeyboardDefault ? 'default' : 'number-pad'
                            }
                            placeholderTextColor={
                                theme === lightMode
                                    ? commonStyles.lightSecondaryText.color
                                    : commonStyles.darkSecondaryText.color
                            }
                            style={[
                                styles.createGroupSearchInput,
                                theme === lightMode
                                    ? commonStyles.lightPrimaryText
                                    : commonStyles.darkPrimaryText,
                            ]}
                        />
                        {textSearch ? (
                            <TouchableOpacity
                                onPress={() => setTextSearch('')}
                                style={[
                                    styles.createGroupSearchClearInputBtn,
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
                                        styles.createGroupSearchClearInputBtnImage,
                                    ]}
                                    source={require('../../assets/close-line-icon.png')}
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
                                    styles.createGroupSearchChooseTypeBtn,
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
                                        styles.createGroupSearchChooseTypeBtnText,
                                        theme === lightMode
                                            ? commonStyles.lightSecondaryText
                                            : commonStyles.darkSecondaryText,
                                    ]}
                                >
                                    {isKeyboardDefault ? 'ABC' : '123'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {textSearch ? (
                        <View>
                            <FlatList
                                data={usersSelected.filter(
                                    (user) =>
                                        user.name
                                            .toLowerCase()
                                            .includes(
                                                textSearch.toLowerCase(),
                                            ) || user._id.includes(textSearch),
                                )}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item, index }) =>
                                    renderUserByRecent(item, index)
                                }
                                style={[
                                    {
                                        paddingHorizontal: 10,
                                        flexGrow: 1,
                                        flexShrink: 1,
                                        marginBottom:
                                            usersSelected.length > 0 ? 60 : 0,
                                    },
                                ]}
                            />
                        </View>
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            {/* <View
                                style={[
                                    styles.createGroupRecentAndContactFilterContainer,
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
                                <TouchableOpacity
                                    onPress={() =>
                                        setTypeSelected(typeSelectedEnum.recent)
                                    }
                                    style={[
                                        styles.createGroupRecentAndContactFilterBtn,
                                        {
                                            borderBottomColor:
                                                typeSelected ===
                                                typeSelectedEnum.recent
                                                    ? commonStyles.primaryColor
                                                          .color
                                                    : "transparent",
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.createGroupRecentAndContactFilterBtnText,
                                            {
                                                color:
                                                    typeSelected ===
                                                    typeSelectedEnum.recent
                                                        ? theme === lightMode
                                                            ? commonStyles
                                                                  .lightPrimaryText
                                                                  .color
                                                            : commonStyles
                                                                  .darkPrimaryText
                                                                  .color
                                                        : theme === lightMode
                                                        ? commonStyles
                                                              .lightSecondaryText
                                                              .color
                                                        : commonStyles
                                                              .darkSecondaryText
                                                              .color,
                                            },
                                        ]}
                                    >
                                        {t("createGroupRecentTitle")}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        setTypeSelected(
                                            typeSelectedEnum.contact
                                        )
                                    }
                                    style={[
                                        styles.createGroupRecentAndContactFilterBtn,
                                        {
                                            borderBottomColor:
                                                typeSelected ===
                                                typeSelectedEnum.contact
                                                    ? commonStyles.primaryColor
                                                          .color
                                                    : "transparent",
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.createGroupRecentAndContactFilterBtnText,
                                            {
                                                color:
                                                    typeSelected ===
                                                    typeSelectedEnum.contact
                                                        ? theme === lightMode
                                                            ? commonStyles
                                                                  .lightPrimaryText
                                                                  .color
                                                            : commonStyles
                                                                  .darkPrimaryText
                                                                  .color
                                                        : theme === lightMode
                                                        ? commonStyles
                                                              .lightSecondaryText
                                                              .color
                                                        : commonStyles
                                                              .darkSecondaryText
                                                              .color,
                                            },
                                        ]}
                                    >
                                        {t("createGroupContactTitle")}
                                    </Text>
                                </TouchableOpacity>
                            </View> */}

                            <FlatList
                                data={myFriends}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item, index }) =>
                                    renderUserByRecent(item, index)
                                }
                                style={[
                                    {
                                        paddingHorizontal: 10,
                                        flexGrow: 1,
                                        flexShrink: 1,
                                        marginBottom:
                                            usersSelected.length > 0 ? 60 : 0,
                                    },
                                ]}
                            />
                            {/* {typeSelected === typeSelectedEnum.recent ? (
                                <FlatList
                                    data={myFriends}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item, index }) =>
                                        renderUserByRecent(item, index)
                                    }
                                    style={[
                                        {
                                            paddingHorizontal: 10,
                                            flexGrow: 1,
                                            flexShrink: 1,
                                            marginBottom:
                                                usersSelected.length > 0
                                                    ? 60
                                                    : 0,
                                        },
                                    ]}
                                />
                            ) : (
                                <SectionList
                                    sections={usersByContact}
                                    keyExtractor={(item) => item.userID}
                                    renderItem={({ item, index }) =>
                                        renderUserByRecent(item, index, false)
                                    }
                                    renderSectionHeader={({
                                        section: { title },
                                    }) => (
                                        <Text
                                            style={[
                                                {
                                                    fontSize: 15,
                                                    fontWeight: "500",
                                                    paddingTop: 10,
                                                },
                                                theme === lightMode
                                                    ? commonStyles.lightSecondaryText
                                                    : commonStyles.darkSecondaryText,
                                            ]}
                                        >
                                            {title}
                                        </Text>
                                    )}
                                    renderSectionFooter={() => {
                                        return (
                                            <View
                                                style={{
                                                    height: 1,
                                                    backgroundColor:
                                                        theme === lightMode
                                                            ? commonStyles
                                                                  .chatNavbarBorderBottomColorLight
                                                                  .color
                                                            : commonStyles
                                                                  .chatNavbarBorderBottomColorDark
                                                                  .color,
                                                }}
                                            ></View>
                                        );
                                    }}
                                    style={[
                                        {
                                            paddingHorizontal: 10,
                                            flexGrow: 1,
                                            flexShrink: 1,
                                            marginBottom:
                                                usersSelected.length > 0
                                                    ? 60
                                                    : 0,
                                        },
                                    ]}
                                />
                            )} */}
                        </View>
                    )}
                </View>
                {usersSelected.length > 0 && (
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
                            {usersSelected
                                .filter((item) => usersSelected.includes(item))
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
                                                    source={require('../../assets/close-line-icon.png')}
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
                            onPress={handleCreateGroup}
                            style={[
                                styles.createGroupUserListNextStepBtn,
                                {
                                    opacity:
                                        usersSelected.length > 1 &&
                                        groupName.trim()
                                            ? 1
                                            : 0.5,
                                },
                            ]}
                            disabled={
                                usersSelected.length <= 1 ||
                                !groupName.trim() ||
                                isLoading
                            }
                        >
                            {isLoading ? (
                                <ActivityIndicator
                                    size={'small'}
                                    color={commonStyles.darkPrimaryText.color}
                                />
                            ) : (
                                <Image
                                    source={require('../../assets/arrow-right-line-icon.png')}
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
