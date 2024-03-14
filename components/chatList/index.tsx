import { View, Text, StatusBar, SafeAreaView, TextInput, Image
    , Dimensions, TouchableOpacity, Modal } from 'react-native'
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux_toolkit/store';
import { useTranslation } from 'react-i18next';
import { lightMode } from '../../redux_toolkit/slices/theme.slice';
import commonStyles from '../../CommonStyles/commonStyles';
import { EvilIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useRef, useState } from 'react';
import OutsidePressHandler from 'react-native-outside-press';
const {TypingAnimation} = require('react-native-typing-animation');
import { Camera, requestCameraPermissionsAsync } from 'expo-camera';
import SearchDetailPopup from '../searchDetailPopup';

type Props = {
    navigation: any
}
const WIDTH = Dimensions.get("window").width;

export default function ChatList({navigation} : Props) {

    const theme = useSelector((state: IRootState) => state.theme.theme)
    const {t} = useTranslation();
    const [textSearch, setTextSearch] = useState("");
    const [showHeaderMoreActionPopup, setShowHeaderMoreActionPopup] = useState(false);
    const [showModalScanQRCode, setShowModalScanQRCode] = useState(false)
    const [hasCameraPermission, setHasCameraPermission] = useState<null | boolean>(null);
    const [startCamera, setStartCamera] = useState(false);  
    const [heightPopup, setHeightPopup] = useState(0);
    const refTextInputSearch = useRef<TextInput>(null);
    const [isOutsideTextInput, setIsOutsideTextInput] = useState(false);

    async function handleToggleModalScanQRCode(){
        if (showModalScanQRCode){
            setShowModalScanQRCode(false);
        } else {
            setShowModalScanQRCode(true);
            if (!hasCameraPermission){
                const {status} = await Camera.requestCameraPermissionsAsync();
                setHasCameraPermission(status === 'granted');
                setStartCamera(status === 'granted');
            }

        }
    }

    return (
        <View
            style={[styles.chatListWrapper, 
                theme === lightMode ? commonStyles.lightPrimaryBackground : commonStyles.darkPrimaryBackground
            ]}
        >
            <StatusBar/>
            <SafeAreaView
                style={[styles.chatListContainer]}
            >
                <View
                    style={[styles.chatListHeader]}
                >
                   <View
                        style={[
                            styles.chatListHeaderMain
                        ]}
                    >
                        <Text
                            style={[styles.chatListTitleName,
                                theme === lightMode
                                ? commonStyles.lightPrimaryText
                                : commonStyles.darkPrimaryText
                            ]}
                        >{t("chatListTitle")}</Text>
                        <View
                            style={[
                                styles.chatListHeaderIconBox
                            ]}
                        >
                            <TouchableOpacity
                                onPress={handleToggleModalScanQRCode}
                            >
                                <Image
                                    source={require("../../assets/qr-code-line-icon.png")}
                                    style={[
                                        styles.chatListHeaderImgIcon,
                                        {
                                            tintColor: theme === lightMode
                                            ?
                                            commonStyles.lightIconColor.color
                                            :
                                            commonStyles.darkIconColor.color
                                        }
                                    ]}
                                />
                            </TouchableOpacity>
                            <OutsidePressHandler
                                onOutsidePress={()=> setShowHeaderMoreActionPopup(false)}
                                style={
                                    [
                                        styles.chatListHeaderPopUpRightContainer,
                                    
                                    ]
                                }
                            >
                                <TouchableOpacity
                                    onPress={() => setShowHeaderMoreActionPopup(!showHeaderMoreActionPopup)}
                                >
                                    <Image
                                        source={require("../../assets/add-fill-icon.png")}
                                        style={[
                                            styles.chatListHeaderImgIcon,
                                            {
                                                tintColor: theme === lightMode
                                                ?
                                                commonStyles.lightIconColor.color
                                                :
                                                commonStyles.darkIconColor.color
                                            }
                                        ]}
                                    />
                                </TouchableOpacity>
                                {
                                    showHeaderMoreActionPopup
                                    &&
                                    <View
                                        style={[
                                            styles.chatListHeaderPopUpRight,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightFourBackground
                                            :
                                            commonStyles.darkFourBackground,
                                            {
                                                shadowColor: '#0F223A',
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
                                        {/* <View
                                            style={[
                                                styles.chatListHeaderPopUpRightTriangle,
                                                {
                                                    borderBottomColor: theme === lightMode
                                                    ?
                                                    commonStyles.lightFourBackground.backgroundColor
                                                    :
                                                    commonStyles.darkFourBackground.backgroundColor,
                                                    shadowColor: '#0F223A',
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 2,
                                                    },
                                                    shadowOpacity: 0.12,
                                                    shadowRadius: 4,
                                                    elevation: 4, 
                                                }
                                                
                                            ]}
                                        >

                                        </View> */}
                                        <TouchableOpacity
                                            style={[
                                                styles.chatListHeaderPopUpRightBtn
                                            ]}
                                            onPress={() => navigation.navigate("AddFriend")}
                                        >
                                            <Image
                                                style={[
                                                    styles.chatListHeaderPopUpRightIcon,
                                                    {
                                                        tintColor: theme === lightMode
                                                        ?
                                                        commonStyles.lightPrimaryText.color
                                                        :
                                                        commonStyles.darkPrimaryText.color
                                                    }
                                                ]}
                                                source={require("../../assets/user-add-line.png")}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatListHeaderPopUpRightText,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >{t("chatListAddFriendTitle")}</Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity   
                                            style={[
                                                styles.chatListHeaderPopUpRightBtn
                                            ]}
                                            onPress={() => navigation.navigate("CreateGroup")}
                                        >
                                            <Image
                                                style={[
                                                    styles.chatListHeaderPopUpRightIcon,
                                                    {
                                                        tintColor: theme === lightMode
                                                        ?
                                                        commonStyles.lightPrimaryText.color
                                                        :
                                                        commonStyles.darkPrimaryText.color
                                                    }
                                                ]}
                                                source={require("../../assets/add-group-icon.png")}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatListHeaderPopUpRightText,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >{t("chatListCreateGroupTitle")}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.chatListHeaderPopUpRightBtn
                                            ]}
                                        >
                                            <Image
                                                style={[
                                                    styles.chatListHeaderPopUpRightIcon,
                                                    {
                                                        tintColor: theme === lightMode
                                                        ?
                                                        commonStyles.lightPrimaryText.color
                                                        :
                                                        commonStyles.darkPrimaryText.color
                                                    }
                                                ]}
                                                source={require("../../assets/cloud-line-icon.png")}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatListHeaderPopUpRightText,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >{t("chatListMyCloudTitle")}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.chatListHeaderPopUpRightBtn
                                            ]}
                                        >
                                            <Image
                                                style={[
                                                    styles.chatListHeaderPopUpRightIcon,
                                                    {
                                                        tintColor: theme === lightMode
                                                        ?
                                                        commonStyles.lightPrimaryText.color
                                                        :
                                                        commonStyles.darkPrimaryText.color
                                                    }
                                                ]}
                                                source={require("../../assets/calendar-2-line-icon.png")}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatListHeaderPopUpRightText,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >{t("chatListMyCloudCalender")}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.chatListHeaderPopUpRightBtn
                                            ]}
                                        >
                                            <Image
                                                style={[
                                                    styles.chatListHeaderPopUpRightIcon,
                                                    {
                                                        tintColor: theme === lightMode
                                                        ?
                                                        commonStyles.lightPrimaryText.color
                                                        :
                                                        commonStyles.darkPrimaryText.color
                                                    }
                                                ]}
                                                source={require("../../assets/vidicon-line-icon.png")}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatListHeaderPopUpRightText,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >{t("chatListCreateGroupCall")}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.chatListHeaderPopUpRightBtn
                                            ]}
                                        >
                                            <Image
                                                style={[
                                                    styles.chatListHeaderPopUpRightIcon,
                                                    {
                                                        tintColor: theme === lightMode
                                                        ?
                                                        commonStyles.lightPrimaryText.color
                                                        :
                                                        commonStyles.darkPrimaryText.color
                                                    }
                                                ]}
                                                source={require("../../assets/computer-line-icon.png")}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatListHeaderPopUpRightText,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                            >{t("chatListLoginDevices")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </OutsidePressHandler>
                        </View>
                    </View>
                    <OutsidePressHandler
                        onOutsidePress={() => setIsOutsideTextInput(true)}
                    >
                        <View
                            style={[styles.chatListBoxSearch,
                                theme === lightMode
                                ? commonStyles.lightSecondaryBackground
                                : commonStyles.darkSecondaryBackground
                            ]}
                            onTouchStart={() => setIsOutsideTextInput(false)}
                        >
                            <EvilIcons name="search" size={26} color={
                                theme === lightMode
                                ?
                                commonStyles.lightIconColor.color
                                :
                                commonStyles.darkIconColor.color
                                }
                                style={[styles.iconSearchMsgAndUser]}
                            />
                            <TextInput
                                ref={refTextInputSearch}
                                onPressIn={(evt) => {
                                    refTextInputSearch.current?.measure((fx, fy, width, height, px, py) => {
                                        !heightPopup && setHeightPopup(py + (height/2))
                                    })
                                }}
                                placeholder={t("chatListSearchPlaceholder")}
                                style={[styles.textInputSearchMsgOrUser,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightTertiaryText
                                    :
                                    commonStyles.darkTertiaryText
                                ]}
                                placeholderTextColor={
                                    theme === lightMode
                                    ?
                                    commonStyles.lightIconColor.color
                                    : 
                                    commonStyles.darkIconColor.color
                                }
                                value={textSearch}
                                onChangeText={setTextSearch}
                            />
                        </View>
                    </OutsidePressHandler>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        
                        showsHorizontalScrollIndicator={false}
                        style={[
                            styles.friendsActiveListBox
                        ]}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.friendActiveItem]}
                        >
                            <View
                                 style={[styles.friendActiveItemChild, {width: (WIDTH-40 - (16*3))/4}]}
                            >
                                <View
                                    style={[styles.friendActiveMainContentBox]}
                                >
                                    <View
                                        style={[styles.friendActiveItemImageBox]}
                                    >
                                        <Image
                                            source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                            resizeMode='contain'
                                            style={{width: 36, height: 36, borderRadius: 50}}
                                        />
                                        <View
                                            style={[styles.friendActiveItemIconOnline,
                                            {
                                                borderColor: theme == lightMode 
                                                ?
                                                commonStyles.lightPrimaryBackground.backgroundColor
                                                : 
                                                commonStyles.darkPrimaryBackground.backgroundColor
                                            }]}
                                        ></View>                         
                                    </View>
                                    <Text style={[styles.activeOnlineUserName
                                    , theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                    ]}>Mark</Text>
                                </View>
                                <View
                                    style={[styles.friendActiveItemLayout,
                                        theme == lightMode
                                        ?
                                        commonStyles.lightTertiaryBackground
                                        :
                                        commonStyles.darkTertiaryBackground
                                    ]}
                                >

                                </View>
                            </View>
                        </TouchableOpacity>     
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.friendActiveItem]}
                        >
                            <View
                                 style={[styles.friendActiveItemChild, {width: (WIDTH-40 - (16*3))/4}]}
                            >
                                <View
                                    style={[styles.friendActiveMainContentBox]}
                                >
                                    <View
                                        style={[styles.friendActiveItemImageBox]}
                                    >
                                        <Image
                                            source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                            resizeMode='contain'
                                            style={{width: 36, height: 36, borderRadius: 50}}
                                        />
                                        <View
                                            style={[styles.friendActiveItemIconOnline,
                                            {
                                                borderColor: theme == lightMode 
                                                ?
                                                commonStyles.lightPrimaryBackground.backgroundColor
                                                : 
                                                commonStyles.darkPrimaryBackground.backgroundColor
                                            }]}
                                        ></View>                         
                                    </View>
                                    <Text style={[styles.activeOnlineUserName
                                    , theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                    ]}>Mark</Text>
                                </View>
                                <View
                                    style={[styles.friendActiveItemLayout,
                                        theme == lightMode
                                        ?
                                        commonStyles.lightTertiaryBackground
                                        :
                                        commonStyles.darkTertiaryBackground
                                    ]}
                                >

                                </View>
                            </View>
                        </TouchableOpacity>     
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.friendActiveItem]}
                        >
                            <View
                                 style={[styles.friendActiveItemChild, {width: (WIDTH-40 - (16*3))/4}]}
                            >
                                <View
                                    style={[styles.friendActiveMainContentBox]}
                                >
                                    <View
                                        style={[styles.friendActiveItemImageBox]}
                                    >
                                        <Image
                                            source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                            resizeMode='contain'
                                            style={{width: 36, height: 36, borderRadius: 50}}
                                        />
                                        <View
                                            style={[styles.friendActiveItemIconOnline,
                                            {
                                                borderColor: theme == lightMode 
                                                ?
                                                commonStyles.lightPrimaryBackground.backgroundColor
                                                : 
                                                commonStyles.darkPrimaryBackground.backgroundColor
                                            }]}
                                        ></View>                         
                                    </View>
                                    <Text style={[styles.activeOnlineUserName
                                    , theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                    ]}>Mark</Text>
                                </View>
                                <View
                                    style={[styles.friendActiveItemLayout,
                                        theme == lightMode
                                        ?
                                        commonStyles.lightTertiaryBackground
                                        :
                                        commonStyles.darkTertiaryBackground
                                    ]}
                                >

                                </View>
                            </View>
                        </TouchableOpacity>     
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.friendActiveItem]}
                        >
                            <View
                                 style={[styles.friendActiveItemChild, {width: (WIDTH-40 - (16*3))/4}]}
                            >
                                <View
                                    style={[styles.friendActiveMainContentBox]}
                                >
                                    <View
                                        style={[styles.friendActiveItemImageBox]}
                                    >
                                        <Image
                                            source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                            resizeMode='contain'
                                            style={{width: 36, height: 36, borderRadius: 50}}
                                        />
                                        <View
                                            style={[styles.friendActiveItemIconOnline,
                                            {
                                                borderColor: theme == lightMode 
                                                ?
                                                commonStyles.lightPrimaryBackground.backgroundColor
                                                : 
                                                commonStyles.darkPrimaryBackground.backgroundColor
                                            }]}
                                        ></View>                         
                                    </View>
                                    <Text style={[styles.activeOnlineUserName
                                    , theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                    ]}>Mark</Text>
                                </View>
                                <View
                                    style={[styles.friendActiveItemLayout,
                                        theme == lightMode
                                        ?
                                        commonStyles.lightTertiaryBackground
                                        :
                                        commonStyles.darkTertiaryBackground
                                    ]}
                                >

                                </View>
                            </View>
                        </TouchableOpacity>     
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.friendActiveItem]}
                        >
                            <View
                                 style={[styles.friendActiveItemChild, {width: (WIDTH-40 - (16*3))/4}]}
                            >
                                <View
                                    style={[styles.friendActiveMainContentBox]}
                                >
                                    <View
                                        style={[styles.friendActiveItemImageBox]}
                                    >
                                        <Image
                                            source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                            resizeMode='contain'
                                            style={{width: 36, height: 36, borderRadius: 50}}
                                        />
                                        <View
                                            style={[styles.friendActiveItemIconOnline,
                                            {
                                                borderColor: theme == lightMode 
                                                ?
                                                commonStyles.lightPrimaryBackground.backgroundColor
                                                : 
                                                commonStyles.darkPrimaryBackground.backgroundColor
                                            }]}
                                        ></View>                         
                                    </View>
                                    <Text style={[styles.activeOnlineUserName
                                    , theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                    ]}>Mark</Text>
                                </View>
                                <View
                                    style={[styles.friendActiveItemLayout,
                                        theme == lightMode
                                        ?
                                        commonStyles.lightTertiaryBackground
                                        :
                                        commonStyles.darkTertiaryBackground
                                    ]}
                                >

                                </View>
                            </View>
                        </TouchableOpacity>     
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.friendActiveItem]}
                        >
                            <View
                                 style={[styles.friendActiveItemChild, {width: (WIDTH-40 - (16*3))/4}]}
                            >
                                <View
                                    style={[styles.friendActiveMainContentBox]}
                                >
                                    <View
                                        style={[styles.friendActiveItemImageBox]}
                                    >
                                        <Image
                                            source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                            resizeMode='contain'
                                            style={{width: 36, height: 36, borderRadius: 50}}
                                        />
                                        <View
                                            style={[styles.friendActiveItemIconOnline,
                                            {
                                                borderColor: theme == lightMode 
                                                ?
                                                commonStyles.lightPrimaryBackground.backgroundColor
                                                : 
                                                commonStyles.darkPrimaryBackground.backgroundColor
                                            }]}
                                        ></View>                         
                                    </View>
                                    <Text style={[styles.activeOnlineUserName
                                    , theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                    ]}>Mark</Text>
                                </View>
                                <View
                                    style={[styles.friendActiveItemLayout,
                                        theme == lightMode
                                        ?
                                        commonStyles.lightTertiaryBackground
                                        :
                                        commonStyles.darkTertiaryBackground
                                    ]}
                                >

                                </View>
                            </View>
                        </TouchableOpacity>     
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.friendActiveItem]}
                        >
                            <View
                                 style={[styles.friendActiveItemChild, {width: (WIDTH-40 - (16*3))/4}]}
                            >
                                <View
                                    style={[styles.friendActiveMainContentBox]}
                                >
                                    <View
                                        style={[styles.friendActiveItemImageBox]}
                                    >
                                        <Image
                                            source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                            resizeMode='contain'
                                            style={{width: 36, height: 36, borderRadius: 50}}
                                        />
                                        <View
                                            style={[styles.friendActiveItemIconOnline,
                                            {
                                                borderColor: theme == lightMode 
                                                ?
                                                commonStyles.lightPrimaryBackground.backgroundColor
                                                : 
                                                commonStyles.darkPrimaryBackground.backgroundColor
                                            }]}
                                        ></View>                         
                                    </View>
                                    <Text style={[styles.activeOnlineUserName
                                    , theme === lightMode
                                    ?
                                    commonStyles.lightPrimaryText
                                    :
                                    commonStyles.darkPrimaryText
                                    ]}>Mark</Text>
                                </View>
                                <View
                                    style={[styles.friendActiveItemLayout,
                                        theme == lightMode
                                        ?
                                        commonStyles.lightTertiaryBackground
                                        :
                                        commonStyles.darkTertiaryBackground
                                    ]}
                                >

                                </View>
                            </View>
                        </TouchableOpacity>     
                    </ScrollView>

                </View>
                <View
                    style={[
                        styles.chatListHistoryBox
                    ]}
                >
                    <Text
                        style={[
                            styles.chatListHistoryTitle,
                            theme === lightMode
                            ?
                            commonStyles.lightPrimaryText
                            :
                            commonStyles.darkPrimaryText
                        ]}
                    >
                        {t("chatListRecentTitle")}
                    </Text>
                    <ScrollView
                        style={[
                            styles.chatListHistoryScroll
                        ]}
                        showsVerticalScrollIndicator={false}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View
                                style={[styles.friendActiveItemImageBox]}
                            >
                                <Image
                                    source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                    resizeMode='contain'
                                    style={{width: 36, height: 36, borderRadius: 50}}
                                />
                                <View
                                    style={[styles.friendActiveItemIconOnline,
                                    {
                                        borderColor: theme == lightMode 
                                        ?
                                        commonStyles.lightPrimaryBackground.backgroundColor
                                        : 
                                        commonStyles.darkPrimaryBackground.backgroundColor,
                                        backgroundColor: commonStyles.activeOnlineColor.color
                                    }]}
                                ></View>                         
                            </View>
                            <View
                                style={[
                                    styles.chatListHistoryMainCol
                                ]}
                            >
                                <Text
                                    style={[styles.chatListHistoryUserName,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText
                                        :
                                        commonStyles.darkPrimaryText
                                    ]}
                                >Patrick Hendricks</Text>
                                <View
                                    style={[styles.chatListHistoryPrevContentBox]}
                                >
                                    <Text
                                        style={[styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText
                                            :
                                            commonStyles.darkSecondaryText
                                        ]}
                                    >Hey! there i'm available</Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >05 min</Text>
                                <Text
                                    style={[
                                        styles.chatListHistoryMsgNumber
                                    ]}
                                >02</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View
                                style={[styles.friendActiveItemImageBox]}
                            >
                                <Image
                                    source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                    resizeMode='contain'
                                    style={{width: 36, height: 36, borderRadius: 50}}
                                />
                                <View
                                    style={[styles.friendActiveItemIconOnline,
                                    {
                                        borderColor: theme == lightMode 
                                        ?
                                        commonStyles.lightPrimaryBackground.backgroundColor
                                        : 
                                        commonStyles.darkPrimaryBackground.backgroundColor,
                                        backgroundColor: commonStyles.busyOnlineColor.color
                                    }]}
                                ></View>                         
                            </View>
                            <View
                                style={[
                                    styles.chatListHistoryMainCol
                                ]}
                            >
                                <Text
                                    style={[styles.chatListHistoryUserName,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText
                                        :
                                        commonStyles.darkPrimaryText
                                    ]}
                                >Patrick Hendricks</Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox
                                    ]}
                                >
                                    <Image
                                        source={require("../../assets/image-fill-icon.png")}
                                        resizeMode='contain'
                                        style={{width: 15, height: 15}}
                                           tintColor={
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText.color
                                            :
                                            commonStyles.darkSecondaryText.color
                                        }
                                    />
                                    <Text
                                        style={[styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText
                                            :
                                            commonStyles.darkSecondaryText
                                        ]}
                                    >
                                    
                                        Images
                                    </Text>
                                </View>
                                
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >05 min</Text>
                                <Text
                                    style={[
                                        styles.chatListHistoryMsgNumber
                                    ]}
                                >02</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View
                                style={[styles.friendActiveItemImageBox]}
                            >
                                <Image
                                    source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                    resizeMode='contain'
                                    style={{width: 36, height: 36, borderRadius: 50}}
                                />
                                 
                            </View>
                            <View
                                style={[
                                    styles.chatListHistoryMainCol
                                ]}
                            >
                                <Text
                                    style={[styles.chatListHistoryUserName,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText
                                        :
                                        commonStyles.darkPrimaryText
                                    ]}
                                >Patrick Hendricks</Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox
                                    ]}
                                >
                                    
                                    <Text
                                        style={[styles.chatListHistoryPrevContent, commonStyles.primaryColor]}
                                    >
                                        Typing
                                    </Text>
                                    <TypingAnimation
                                        dotColor={commonStyles.primaryColor.color}
                                        dotAmplitude={2}
                                        style={{
                                            marginBottom: 15,
                                        }}
                                        dotStyles={{
                                            fontSize: 5
                                        }}
                                        dotMargin={5}
                                        dotSpeed={0.15}
                                        dotRadius={2.5}
                                        dotX={12}
                                        dotY={6}
                                    />
                                </View>
                                
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >05 min</Text>
                                <Text
                                    style={[
                                        styles.chatListHistoryMsgNumber
                                    ]}
                                >02</Text>
                            </View>
                        </TouchableOpacity>       
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View
                                style={[styles.friendActiveItemImageBox]}
                            >
                                <Image
                                    source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                    resizeMode='contain'
                                    style={{width: 36, height: 36, borderRadius: 50}}
                                />
                                <View
                                    style={[styles.friendActiveItemIconOnline,
                                    {
                                        borderColor: theme == lightMode 
                                        ?
                                        commonStyles.lightPrimaryBackground.backgroundColor
                                        : 
                                        commonStyles.darkPrimaryBackground.backgroundColor,
                                        backgroundColor: commonStyles.activeOnlineColor.color
                                    }]}
                                ></View>                         
                            </View>
                            <View
                                style={[
                                    styles.chatListHistoryMainCol
                                ]}
                            >
                                <Text
                                    style={[styles.chatListHistoryUserName,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText
                                        :
                                        commonStyles.darkPrimaryText
                                    ]}
                                >Patrick Hendricks</Text>
                                <View
                                    style={[styles.chatListHistoryPrevContentBox]}
                                >
                                    <Image
                                        source={require("../../assets/file-text-fill-icon.png")}
                                        resizeMode='contain'
                                        style={{width: 15, height: 15, borderRadius: 50}}
                                        tintColor={
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText.color
                                            :
                                            commonStyles.darkSecondaryText.color
                                        }
                                    />
                                    <Text
                                        style={[styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText
                                            :
                                            commonStyles.darkSecondaryText
                                        ]}
                                    >Admin-A.zip</Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >05 min</Text>
                                <Text
                                    style={[
                                        styles.chatListHistoryMsgNumber
                                    ]}
                                >02</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View
                                style={[styles.friendActiveItemImageBox]}
                            >
                                <Image
                                    source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                    resizeMode='contain'
                                    style={{width: 36, height: 36, borderRadius: 50}}
                                />
                                <View
                                    style={[styles.friendActiveItemIconOnline,
                                    {
                                        borderColor: theme == lightMode 
                                        ?
                                        commonStyles.lightPrimaryBackground.backgroundColor
                                        : 
                                        commonStyles.darkPrimaryBackground.backgroundColor,
                                        backgroundColor: commonStyles.activeOnlineColor.color
                                    }]}
                                ></View>                         
                            </View>
                            <View
                                style={[
                                    styles.chatListHistoryMainCol
                                ]}
                            >
                                <Text
                                    style={[styles.chatListHistoryUserName,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText
                                        :
                                        commonStyles.darkPrimaryText
                                    ]}
                                >Patrick Hendricks</Text>
                                <View
                                    style={[styles.chatListHistoryPrevContentBox]}
                                >
                                    <Text
                                        style={[styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText
                                            :
                                            commonStyles.darkSecondaryText
                                        ]}
                                    >Hey! there i'm available</Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >05 min</Text>
                                <Text
                                    style={[
                                        styles.chatListHistoryMsgNumber
                                    ]}
                                >02</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View
                                style={[styles.friendActiveItemImageBox]}
                            >
                                <Image
                                    source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                    resizeMode='contain'
                                    style={{width: 36, height: 36, borderRadius: 50}}
                                />
                                <View
                                    style={[styles.friendActiveItemIconOnline,
                                    {
                                        borderColor: theme == lightMode 
                                        ?
                                        commonStyles.lightPrimaryBackground.backgroundColor
                                        : 
                                        commonStyles.darkPrimaryBackground.backgroundColor,
                                        backgroundColor: commonStyles.busyOnlineColor.color
                                    }]}
                                ></View>                         
                            </View>
                            <View
                                style={[
                                    styles.chatListHistoryMainCol
                                ]}
                            >
                                <Text
                                    style={[styles.chatListHistoryUserName,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText
                                        :
                                        commonStyles.darkPrimaryText
                                    ]}
                                >Patrick Hendricks</Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox
                                    ]}
                                >
                                    <Image
                                        source={require("../../assets/image-fill-icon.png")}
                                        resizeMode='contain'
                                        style={{width: 15, height: 15}}
                                           tintColor={
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText.color
                                            :
                                            commonStyles.darkSecondaryText.color
                                        }
                                    />
                                    <Text
                                        style={[styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText
                                            :
                                            commonStyles.darkSecondaryText
                                        ]}
                                    >
                                    
                                        Images
                                    </Text>
                                </View>
                                
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >05 min</Text>
                                <Text
                                    style={[
                                        styles.chatListHistoryMsgNumber
                                    ]}
                                >02</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity   
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View
                                style={[styles.friendActiveItemImageBox]}
                            >
                                <Image
                                    source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                    resizeMode='contain'
                                    style={{width: 36, height: 36, borderRadius: 50}}
                                />
                                 
                            </View>
                            <View
                                style={[
                                    styles.chatListHistoryMainCol
                                ]}
                            >
                                <Text
                                    style={[styles.chatListHistoryUserName,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText
                                        :
                                        commonStyles.darkPrimaryText
                                    ]}
                                >Patrick Hendricks</Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox
                                    ]}
                                >
                                    
                                    <Text
                                        style={[styles.chatListHistoryPrevContent, commonStyles.primaryColor]}
                                    >
                                        Typing
                                    </Text>
                                    <TypingAnimation
                                        dotColor={commonStyles.primaryColor.color}
                                        dotAmplitude={2}
                                        style={{
                                            marginBottom: 15,
                                        }}
                                        dotStyles={{
                                            fontSize: 5
                                        }}
                                        dotMargin={5}
                                        dotSpeed={0.15}
                                        dotRadius={2.5}
                                        dotX={12}
                                        dotY={6}
                                    />
                                </View>
                                
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >05 min</Text>
                                <Text
                                    style={[
                                        styles.chatListHistoryMsgNumber
                                    ]}
                                >02</Text>
                            </View>
                        </TouchableOpacity>       
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View
                                style={[styles.friendActiveItemImageBox]}
                            >
                                <Image
                                    source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                    resizeMode='contain'
                                    style={{width: 36, height: 36, borderRadius: 50}}
                                />
                                <View
                                    style={[styles.friendActiveItemIconOnline,
                                    {
                                        borderColor: theme == lightMode 
                                        ?
                                        commonStyles.lightPrimaryBackground.backgroundColor
                                        : 
                                        commonStyles.darkPrimaryBackground.backgroundColor,
                                        backgroundColor: commonStyles.activeOnlineColor.color
                                    }]}
                                ></View>                         
                            </View>
                            <View
                                style={[
                                    styles.chatListHistoryMainCol
                                ]}
                            >
                                <Text
                                    style={[styles.chatListHistoryUserName,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText
                                        :
                                        commonStyles.darkPrimaryText
                                    ]}
                                >Patrick Hendricks</Text>
                                <View
                                    style={[styles.chatListHistoryPrevContentBox]}
                                >
                                    <Image
                                        source={require("../../assets/file-text-fill-icon.png")}
                                        resizeMode='contain'
                                        style={{width: 15, height: 15, borderRadius: 50}}
                                        tintColor={
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText.color
                                            :
                                            commonStyles.darkSecondaryText.color
                                        }
                                    />
                                    <Text
                                        style={[styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText
                                            :
                                            commonStyles.darkSecondaryText
                                        ]}
                                    >Admin-A.zip</Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >05 min</Text>
                                <Text
                                    style={[
                                        styles.chatListHistoryMsgNumber
                                    ]}
                                >02</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View
                                style={[styles.friendActiveItemImageBox]}
                            >
                                <Image
                                    source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                    resizeMode='contain'
                                    style={{width: 36, height: 36, borderRadius: 50}}
                                />
                                <View
                                    style={[styles.friendActiveItemIconOnline,
                                    {
                                        borderColor: theme == lightMode 
                                        ?
                                        commonStyles.lightPrimaryBackground.backgroundColor
                                        : 
                                        commonStyles.darkPrimaryBackground.backgroundColor,
                                        backgroundColor: commonStyles.activeOnlineColor.color
                                    }]}
                                ></View>                         
                            </View>
                            <View
                                style={[
                                    styles.chatListHistoryMainCol
                                ]}
                            >
                                <Text
                                    style={[styles.chatListHistoryUserName,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText
                                        :
                                        commonStyles.darkPrimaryText
                                    ]}
                                >Patrick Hendricks</Text>
                                <View
                                    style={[styles.chatListHistoryPrevContentBox]}
                                >
                                    <Text
                                        style={[styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText
                                            :
                                            commonStyles.darkSecondaryText
                                        ]}
                                    >Hey! there i'm available</Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >05 min</Text>
                                <Text
                                    style={[
                                        styles.chatListHistoryMsgNumber
                                    ]}
                                >02</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View
                                style={[styles.friendActiveItemImageBox]}
                            >
                                <Image
                                    source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                    resizeMode='contain'
                                    style={{width: 36, height: 36, borderRadius: 50}}
                                />
                                <View
                                    style={[styles.friendActiveItemIconOnline,
                                    {
                                        borderColor: theme == lightMode 
                                        ?
                                        commonStyles.lightPrimaryBackground.backgroundColor
                                        : 
                                        commonStyles.darkPrimaryBackground.backgroundColor,
                                        backgroundColor: commonStyles.busyOnlineColor.color
                                    }]}
                                ></View>                         
                            </View>
                            <View
                                style={[
                                    styles.chatListHistoryMainCol
                                ]}
                            >
                                <Text
                                    style={[styles.chatListHistoryUserName,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText
                                        :
                                        commonStyles.darkPrimaryText
                                    ]}
                                >Patrick Hendricks</Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox
                                    ]}
                                >
                                    <Image
                                        source={require("../../assets/image-fill-icon.png")}
                                        resizeMode='contain'
                                        style={{width: 15, height: 15}}
                                           tintColor={
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText.color
                                            :
                                            commonStyles.darkSecondaryText.color
                                        }
                                    />
                                    <Text
                                        style={[styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText
                                            :
                                            commonStyles.darkSecondaryText
                                        ]}
                                    >
                                    
                                        Images
                                    </Text>
                                </View>
                                
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >05 min</Text>
                                <Text
                                    style={[
                                        styles.chatListHistoryMsgNumber
                                    ]}
                                >02</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View
                                style={[styles.friendActiveItemImageBox]}
                            >
                                <Image
                                    source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                    resizeMode='contain'
                                    style={{width: 36, height: 36, borderRadius: 50}}
                                />
                                 
                            </View>
                            <View
                                style={[
                                    styles.chatListHistoryMainCol
                                ]}
                            >
                                <Text
                                    style={[styles.chatListHistoryUserName,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText
                                        :
                                        commonStyles.darkPrimaryText
                                    ]}
                                >Patrick Hendricks</Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox
                                    ]}
                                >
                                    
                                    <Text
                                        style={[styles.chatListHistoryPrevContent, commonStyles.primaryColor]}
                                    >
                                        Typing
                                    </Text>
                                    <TypingAnimation
                                        dotColor={commonStyles.primaryColor.color}
                                        dotAmplitude={2}
                                        style={{
                                            marginBottom: 15,
                                        }}
                                        dotStyles={{
                                            fontSize: 5
                                        }}
                                        dotMargin={5}
                                        dotSpeed={0.15}
                                        dotRadius={2.5}
                                        dotX={12}
                                        dotY={6}
                                    />
                                </View>
                                
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >05 min</Text>
                                <Text
                                    style={[
                                        styles.chatListHistoryMsgNumber
                                    ]}
                                >02</Text>
                            </View>
                        </TouchableOpacity>       
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatDetail")}
                            style={[styles.chatListHistoryItem]}
                        >
                            <View
                                style={[styles.friendActiveItemImageBox]}
                            >
                                <Image
                                    source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                    resizeMode='contain'
                                    style={{width: 36, height: 36, borderRadius: 50}}
                                />
                                <View
                                    style={[styles.friendActiveItemIconOnline,
                                    {
                                        borderColor: theme == lightMode 
                                        ?
                                        commonStyles.lightPrimaryBackground.backgroundColor
                                        : 
                                        commonStyles.darkPrimaryBackground.backgroundColor,
                                        backgroundColor: commonStyles.activeOnlineColor.color
                                    }]}
                                ></View>                         
                            </View>
                            <View
                                style={[
                                    styles.chatListHistoryMainCol
                                ]}
                            >
                                <Text
                                    style={[styles.chatListHistoryUserName,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightPrimaryText
                                        :
                                        commonStyles.darkPrimaryText
                                    ]}
                                >Patrick Hendricks</Text>
                                <View
                                    style={[styles.chatListHistoryPrevContentBox]}
                                >
                                    <Image
                                        source={require("../../assets/file-text-fill-icon.png")}
                                        resizeMode='contain'
                                        style={{width: 15, height: 15, borderRadius: 50}}
                                        tintColor={
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText.color
                                            :
                                            commonStyles.darkSecondaryText.color
                                        }
                                    />
                                    <Text
                                        style={[styles.chatListHistoryPrevContent,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightSecondaryText
                                            :
                                            commonStyles.darkSecondaryText
                                        ]}
                                    >Admin-A.zip</Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime,
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText
                                        :
                                        commonStyles.darkSecondaryText
                                    ]}
                                >05 min</Text>
                                <Text
                                    style={[
                                        styles.chatListHistoryMsgNumber
                                    ]}
                                >02</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
            <Modal visible={showModalScanQRCode}

            >
                {
                    startCamera
                    &&
                    <Camera
                        style={{flex: 1,}}
                    >

                    </Camera>
                }
            </Modal>
            <SearchDetailPopup textSearch={textSearch} setTextSearch={setTextSearch}
                isPressOutsideTextInput={isOutsideTextInput}
                heightFromHeaderToInput={heightPopup}
                setHeightFromHeaderToInput={setHeightPopup}
            />
        </View>
    )
}