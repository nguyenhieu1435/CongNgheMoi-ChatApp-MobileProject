import { View, Text, StatusBar, SafeAreaView, Image, Pressable, KeyboardAvoidingView, Button, TouchableHighlight, TouchableNativeFeedback, GestureResponderEvent, Dimensions } from 'react-native'
import { styles } from './styles'
import { useSelector } from 'react-redux'
import { IRootState } from '../../redux_toolkit/store'
import { useTranslation } from 'react-i18next'
import { lightMode } from '../../redux_toolkit/slices/theme.slice'
import commonStyles from '../../CommonStyles/commonStyles'
import { ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons';
import OutsidePressHandler from 'react-native-outside-press';
import { useEffect, useRef, useState } from 'react'
import { set } from 'react-hook-form'
import { LinearGradient } from 'expo-linear-gradient'
const {TypingAnimation} = require('react-native-typing-animation');


interface Props {
    navigation: any
}

type PropsTouchableOpacity = {
    onPress: (event: GestureResponderEvent) => void
}

type PositionMessageActionType = {
    top?: number | string;
    left?: number;
    right?: number;
    bottom?: number | string;
}
const {width : WIDTH, height : HEIGHT} = Dimensions.get("screen");

export default function ChatDetail({navigation} : Props) {
    const theme = useSelector((state: IRootState) => state.theme.theme)
    const {t} = useTranslation();
    const [showModalSearch, setShowModalSearch] = useState(false)
    const [textSearch, setTextSearch] = useState("")
    const [showMoreAction, setShowMoreAction] = useState(false);
    const [indexMessageAction, setIndexMessageAction] = useState(-1);
    const [positionMessageAction, setPositionMessageAction] = useState<PositionMessageActionType>({});
    const scrollViewRef = useRef<ScrollView>(null);
    
    function handleOpenMoreActionOnMessage(evt : GestureResponderEvent, id: number) : void {
        
        if (indexMessageAction === -1){
            const {pageX, pageY} = evt.nativeEvent;
            const objectStyles : PositionMessageActionType = {}
            if (pageX > WIDTH / 2){
                objectStyles.right = 0;
            } else {
                objectStyles.left = 0;
            }
            if (pageY > HEIGHT / 2){
                objectStyles.bottom = 23;
            } else {
                objectStyles.top = "100%";
            }
            // console.log("objectStyles", objectStyles)
            setPositionMessageAction(objectStyles);
            setIndexMessageAction(id);
        }
    }
 
    useEffect(()=>{
        scrollViewRef.current?.scrollToEnd({ animated: true })
    },[])

    return (
        <View
            style={[
                styles.chatDetailWrapper,
                theme === lightMode
                ?
                commonStyles.lightPrimaryBackground
                :
                commonStyles.darkPrimaryBackground
            ]}
        >
            <StatusBar/>
            <SafeAreaView
                style={[
                    styles.chatDetailContainer
                ]}
            >
                <View
                    style={[
                        styles.chatDetailNavbar,
                        {
                            borderBottomColor: theme === lightMode
                            ?
                            commonStyles.chatNavbarBorderBottomColorLight.color
                            :
                            commonStyles.chatNavbarBorderBottomColorDark.color,
                            zIndex: 20
                        }
                    ]}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.goBack()}
                        style={[
                            styles.btnGoback
                        ]}
                    >
                        <FontAwesome name="angle-left" size={20} color={
                                theme === lightMode
                                ?
                                commonStyles.lightSecondaryText.color
                                :
                                commonStyles.darkSecondaryText.color
                            }
                        />

                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            styles.chatDetailNavbarUsernameBox
                        ]}
                    >
                        <Image
                            source={{uri: "https://avatar.iran.liara.run/public/44"}}
                            resizeMode='cover'
                            style={{
                                width: 36, height: 36, borderRadius: 50
                            }}
                        />
                        <Text
                            style={[
                                styles.chatDetailUsernameText,
                                theme === lightMode
                                ?
                                commonStyles.lightPrimaryText
                                :
                                commonStyles.darkPrimaryText
                            ]}
                        >
                            Doris Brown
                        </Text>
                        <View
                            style={[
                                styles.activityIcon,
                                {
                                    backgroundColor: commonStyles.activeOnlineColor.color
                                }
                            ]}
                        >

                        </View>
                    </TouchableOpacity>

                    <View
                        style={[
                            styles.chatDetailNavbarBaseActions
                        ]}
                    >
                        <OutsidePressHandler
                            onOutsidePress={() => {
                                setShowModalSearch(false)
                            }}
                            style={[
                                styles.chatDetailNavbarBaseActionItemBox,
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setShowModalSearch(!showModalSearch)
                                }}
                            >
                                <Image
                                    source={require("../../assets/search-line-icon.png")}
                                    resizeMode='contain'
                                    style={{
                                        width: 23, height: 23
                                    }}
                                    tintColor={
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    }
                                />
                            </TouchableOpacity>
   
                            {
                                showModalSearch
                                &&

                                    <View
                                        style={[
                                            styles.chatDetailNavbarBaseActionItemPopup,
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
                                            <TextInput
                                                placeholder={t("chatDetailSearchPlaceholder")}
                                                placeholderTextColor={
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText.color
                                                    :
                                                    commonStyles.darkSecondaryText.color
                                                }
                                                style={[
                                                    styles.chatDetailNavbarBaseActionItePopupInput,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightTertiaryBackground
                                                    :
                                                    commonStyles.darkTertiaryBackground,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightTertiaryText
                                                    :
                                                    commonStyles.darkTertiaryText,
                                                        
                                                ]}     
                                            /> 
                                    </View>
                                
                            }
                        </OutsidePressHandler>

                        <TouchableOpacity>
                            <Image
                                source={require("../../assets/phone-line-icon.png")}
                                resizeMode='contain'
                                style={{
                                    width: 23, height: 23
                                }}
                                tintColor={
                                    theme === lightMode
                                    ?
                                    commonStyles.lightSecondaryText.color
                                    :
                                    commonStyles.darkSecondaryText.color
                                }
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image
                                source={require("../../assets/vidicon-line-icon.png")}
                                resizeMode='contain'
                                style={{
                                    width: 23, height: 23
                                }}
                                tintColor={
                                    theme === lightMode
                                    ?
                                    commonStyles.lightSecondaryText.color
                                    :
                                    commonStyles.darkSecondaryText.color
                                }
                            />
                        </TouchableOpacity>

                        <OutsidePressHandler
                            onOutsidePress={() => {
                                setShowMoreAction(false)
                            }}
                            style={[
                                styles.chatDetailNavbarBaseActionItemBox
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setShowMoreAction(!showMoreAction)
                                }}
                            >
                                <Image
                                    source={require("../../assets/more-line-icon.png")}
                                    resizeMode='contain'
                                    style={{
                                        width: 23, height: 23
                                    }}
                                    tintColor={
                                        theme === lightMode
                                        ?
                                        commonStyles.lightSecondaryText.color
                                        :
                                        commonStyles.darkSecondaryText.color
                                    }
                                />
                            </TouchableOpacity>
                            {
                                showMoreAction
                                &&
                                <View
                                    style={[
                                        styles.chatDetailNavbarBaseActionMoreItemPopup,
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
                                    <TouchableOpacity
                                        onPress={()=>{
                                            navigation.navigate("ChatProfile")
                                        }}
                                        style={[
                                            styles.chatDetailNavbarBaseActionMoreItem
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                theme === lightMode
                                                ?
                                                commonStyles.lightTertiaryText
                                                :
                                                commonStyles.darkTertiaryText,
                                                styles.navbarActionMoreItemText
                                            ]}
                                        >{t("chatDetaildMoreViewProfileTitle")}</Text>
                                        <Image
                                            source={require("../../assets/user-chatlist-bottom-tab.png")}
                                            resizeMode='contain'
                                            style={{
                                                width: 17, height: 17
                                            }}
                                            tintColor={
                                                theme === lightMode
                                                ?
                                                commonStyles.lightSecondaryText.color
                                                :
                                                commonStyles.darkSecondaryText.color
                                            }
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.chatDetailNavbarBaseActionMoreItem
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                theme === lightMode
                                                ?
                                                commonStyles.lightTertiaryText
                                                :
                                                commonStyles.darkTertiaryText,
                                                styles.navbarActionMoreItemText
                                            ]}
                                        >{t("chatDetailMoreMuteTitle")}</Text>
                                        <Image
                                            source={require("../../assets/volume-mute-line-icon.png")}
                                            resizeMode='contain'
                                            style={{
                                                width: 17, height: 17
                                            }}
                                            tintColor={
                                                theme === lightMode
                                                ?
                                                commonStyles.lightSecondaryText.color
                                                :
                                                commonStyles.darkSecondaryText.color
                                            }
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.chatDetailNavbarBaseActionMoreItem
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                theme === lightMode
                                                ?
                                                commonStyles.lightTertiaryText
                                                :
                                                commonStyles.darkTertiaryText,
                                                styles.navbarActionMoreItemText
                                            ]}
                                        >{t("chatDetailMoreDeleteTitle")}</Text>
                                        <Image
                                            source={require("../../assets/delete-bin-line-icon.png")}
                                            resizeMode='contain'
                                            style={{
                                                width: 17, height: 17
                                            }}
                                            tintColor={
                                                theme === lightMode
                                                ?
                                                commonStyles.lightSecondaryText.color
                                                :
                                                commonStyles.darkSecondaryText.color
                                            }
                                        />
                                    </TouchableOpacity>
                                </View>
                            }
                        </OutsidePressHandler>
                       
                    </View>
                </View>
                <View
                    style={[
                        styles.chatDetailHistoryListWrapper
                    ]}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                    >
                        <View
                            style={[
                                styles.chatDetailMessageFromOpponentBox
                            ]}
                        >
                            <Image
                                source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                resizeMode='contain'
                                style={[
                                    styles.chatDetailAvatarImg
                                ]}
                            />
                            <View
                                style={[
                                    styles.chatDetailMessageFromOpponentMainWrapper
                                ]}
                            >
                                <View
                                    style={[
                                        styles.chatDetailMessageFromOpponentMainContainer
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.chatDetailMessageFromOpponentInfoBox,
                                        
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentInfoTextBox
                                            ]}
                                        >
                                            <Text
                                                    style={[
                                                        styles.chatDetailMessageFromOpponentInfoText,
                                                    
                                                    ]}
                                            >
                                                Good morning aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                            </Text>

                                        </View>
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentTimeInfoBox,
                                            ]}
                                        >
                                            <Image
                                                source={require("../../assets/time-line-icon.png")}
                                                resizeMode='contain'
                                                style={[
                                                    styles.chatDetailMessageFromOpponentTimeInfoClockImg
                                                ]}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatDetailMessageFromOpponentTimeInfoClockMilesStone
                                                ]}
                                            >10:00</Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentTriangle,
                                            ]}
                                        >

                                        </View>
                                    </View>

                                    <Text
                                        style={[
                                            styles.chatDetailMessageFromOpponentUsername,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightTertiaryText
                                            :
                                            commonStyles.darkTertiaryText
                                        ]}
                                    >Doris Brown</Text>
                                </View>
                              
                                <View
                                   onTouchStart={(event)=>{
                                    // 0 is id or index or chat item
                                    handleOpenMoreActionOnMessage(event, 0)
                                   }}
                                   style={[
                                    styles.chatDetailMessageFromOpponentMoreActionBox
                                   ]}
                                >
                                    <Image
                                        
                                        source={require("../../assets/more-vertical-line-icon.png")}
                                        resizeMode='contain'
                                        style={{
                                            width: 18, height: 18,
                                            tintColor:
                                            theme === lightMode
                                            ?
                                            commonStyles.lightIconColor.color
                                            :
                                            commonStyles.darkIconColor.color 
                                        }}
                                    />
                                    {
                                        indexMessageAction === 0
                                        &&
                                        <MessagePopupAction
                                            style={positionMessageAction}
                                            theme={theme}
                                            setIndexMessageAction={setIndexMessageAction}
                                        />

                                    }
                                </View>
                            </View>
                           
                        </View>
                        <View
                            style={[
                                styles.chatDetailMessageFromMeBox
                            ]}
                        >
                            <View
                                style={[
                                    styles.chatDetailMessageFromMeMainWrapper
                                ]}
                            >
                                <View
                                   onTouchStart={(event)=>{
                                    // 1 is id or index or chat item
                                    handleOpenMoreActionOnMessage(event, 1)
                                   }}
                                   style={[
                                    styles.chatDetailMessageFromMeMoreActionBox
                                   ]}
                                >
                                    <Image
                                        
                                        source={require("../../assets/more-vertical-line-icon.png")}
                                        resizeMode='contain'
                                        style={{
                                            width: 18, height: 18,
                                            tintColor:
                                            theme === lightMode
                                            ?
                                            commonStyles.lightIconColor.color
                                            :
                                            commonStyles.darkIconColor.color 
                                        }}
                                    />
                                    {
                                        indexMessageAction === 1
                                        &&
                                        <MessagePopupAction
                                            style={positionMessageAction}
                                            theme={theme}
                                            setIndexMessageAction={setIndexMessageAction}
                                        />

                                    }
                                </View>
                                <View
                                    style={[
                                        styles.chatDetailMessageFromOpponentMainContainer
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.chatDetailMessageFromMeInfoBox,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightTertiaryBackground
                                            :
                                            commonStyles.darkTertiaryBackground
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentInfoTextBox
                                            ]}
                                        >
                                            <Text
                                                    style={[
                                                        styles.chatDetailMessageFromOpponentInfoText,
                                                        {
                                                            color: theme === lightMode
                                                            ?
                                                            commonStyles.lightPrimaryText.color
                                                            :
                                                            commonStyles.darkPrimaryText.color
                                                        }
                                                    
                                                    ]}
                                            >
                                                Good morning aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                            </Text>

                                        </View>
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromMeTimeInfoBox,
                                            ]}
                                        >
                                            <Image
                                                source={require("../../assets/time-line-icon.png")}
                                                resizeMode='contain'
                                                style={[
                                                    styles.chatDetailMessageFromOpponentTimeInfoClockImg,
                                                    {
                                                        tintColor: theme === lightMode
                                                        ?
                                                        commonStyles.lightSecondaryText.color
                                                        :
                                                        commonStyles.darkSecondaryText.color
                                                    }
                                                ]}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatDetailMessageFromOpponentTimeInfoClockMilesStone,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText
                                                    :
                                                    commonStyles.darkSecondaryText
                                                ]}
                                            >10:00</Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromMeTriangle,
                                                {
                                                    borderBottomColor: theme === lightMode
                                                    ?
                                                    commonStyles.lightTertiaryBackground.backgroundColor
                                                    :
                                                    commonStyles.darkTertiaryBackground.backgroundColor
                                                }
                                            ]}
                                        >

                                        </View>
                                    </View>

                                    <Text
                                        style={[
                                            styles.chatDetailMessageFromMeUsername,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightTertiaryText
                                            :
                                            commonStyles.darkTertiaryText
                                        ]}
                                    >Doris Brown</Text>
                                </View>
                            </View>
                            <Image
                                source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                resizeMode='contain'
                                style={[
                                    styles.chatDetailAvatarImg
                                ]}
                            />
                        </View>
                        <View
                            style={[
                                styles.chatDetailMessageFromMeBox
                            ]}
                        >
                            <View
                                style={[
                                    styles.chatDetailMessageFromMeMainWrapper
                                ]}
                            >
                                <View
                                   onTouchStart={(event)=>{
                                    // 1 is id or index or chat item
                                    handleOpenMoreActionOnMessage(event, 2)
                                   }}
                                   style={[
                                    styles.chatDetailMessageFromMeMoreActionBox
                                   ]}
                                >
                                    <Image
                                        
                                        source={require("../../assets/more-vertical-line-icon.png")}
                                        resizeMode='contain'
                                        style={{
                                            width: 18, height: 18,
                                            tintColor:
                                            theme === lightMode
                                            ?
                                            commonStyles.lightIconColor.color
                                            :
                                            commonStyles.darkIconColor.color 
                                        }}
                                    />
                                    {
                                        indexMessageAction === 2
                                        &&
                                        <MessagePopupAction
                                            style={positionMessageAction}
                                            theme={theme}
                                            setIndexMessageAction={setIndexMessageAction}
                                        />

                                    }
                                </View>
                                <View
                                    style={[
                                        styles.chatDetailMessageFromOpponentMainContainer
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.chatDetailMessageFromMeInfoBox,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightTertiaryBackground
                                            :
                                            commonStyles.darkTertiaryBackground
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentInfoTextBox
                                            ]}
                                        >
                                            <Text
                                                    style={[
                                                        styles.chatDetailMessageFromOpponentInfoText,
                                                        {
                                                            color: theme === lightMode
                                                            ?
                                                            commonStyles.lightPrimaryText.color
                                                            :
                                                            commonStyles.darkPrimaryText.color
                                                        }
                                                    
                                                    ]}
                                            >
                                                Wow that's great
                                            </Text>

                                        </View>
                                        
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromMeTimeInfoBox,
                                            ]}
                                        >
                                            <Image
                                                source={require("../../assets/time-line-icon.png")}
                                                resizeMode='contain'
                                                style={[
                                                    styles.chatDetailMessageFromOpponentTimeInfoClockImg,
                                                    {
                                                        tintColor: theme === lightMode
                                                        ?
                                                        commonStyles.lightSecondaryText.color
                                                        :
                                                        commonStyles.darkSecondaryText.color
                                                    }
                                                ]}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatDetailMessageFromOpponentTimeInfoClockMilesStone,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText
                                                    :
                                                    commonStyles.darkSecondaryText
                                                ]}
                                            >10:00</Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromMeTriangle,
                                                {
                                                    borderBottomColor: theme === lightMode
                                                    ?
                                                    commonStyles.lightTertiaryBackground.backgroundColor
                                                    :
                                                    commonStyles.darkTertiaryBackground.backgroundColor
                                                }
                                            ]}
                                        >

                                        </View>
                                    </View>

                                    <Text
                                        style={[
                                            styles.chatDetailMessageFromMeUsername,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightTertiaryText
                                            :
                                            commonStyles.darkTertiaryText
                                        ]}
                                    >Doris Brown</Text>
                                </View>
                            </View>
                            <Image
                                source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                resizeMode='contain'
                                style={[
                                    styles.chatDetailAvatarImg
                                ]}
                            />
                        </View>
                        <View
                            style={[
                                styles.timeLineBox
                            ]}
                        >
                            <Text
                                style={[
                                    styles.timeLineText,
                                    theme === lightMode
                                    ?
                                    commonStyles.lightTertiaryText
                                    :
                                    commonStyles.darkTertiaryText,
                                    {
                                        backgroundColor: theme === lightMode
                                        ?
                                        commonStyles.chatNavbarBorderBottomColorLight.color
                                        :
                                        commonStyles.chatNavbarBorderBottomColorDark.color
                                    }
                                ]}
                            >
                                19/01/2024
                            </Text>
                            <View style={[
                                styles.timeLineLine,
                                {
                                    backgroundColor:
                                    theme === lightMode
                                    ?
                                    commonStyles.chatNavbarBorderBottomColorLight.color
                                    :
                                    commonStyles.chatNavbarBorderBottomColorDark.color
                                }
                            ]}></View>
                        </View>
                        <View
                            style={[
                                styles.chatDetailMessageFromOpponentBox
                            ]}
                        >
                            <Image
                                source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                resizeMode='contain'
                                style={[
                                    styles.chatDetailAvatarImg
                                ]}
                            />
                            <View
                                style={[
                                    styles.chatDetailMessageFromOpponentMainWrapper
                                ]}
                            >
                                <View
                                    style={[
                                        styles.chatDetailMessageFromOpponentMainContainer
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.chatDetailMessageFromOpponentInfoBox,
                                        
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentInfoTextBox
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.chatDetailMessageFromOpponentInfoText,

                                                    
                                                ]}
                                            >
                                                Good morning
                                            </Text>

                                        </View>
                                        
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentImageBox,
                                            ]}
                                        >
                                            <View
                                                style={[styles.chatDetailMessageFromOpponentImageItem]}
                                            >
                                                <Image
                                                    source={require("../../assets/image-in-chat-history.jpg")}
                                                    resizeMode='contain'
                                                    style={[
                                                        styles.imageInChatHistory,
                                                        {
                                                            borderColor: 
                                                            theme === lightMode
                                                            ?
                                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                                            :
                                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                                        }
                                                    ]}
                                                />
                                                <View
                                                    style={[
                                                        styles.actionsWithImageInChatHistoryBox,
                                                    ]}
                                                >
                                                    <TouchableOpacity>
                                                        <Image
                                                            source={require("../../assets/download-2-line-icon.png")}
                                                            style={[
                                                                styles.actionWithImageInChatHistoryImg
                                                            ]}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <Image
                                                            source={require('../../assets/more-fill-icon.png')}
                                                            style={[
                                                                styles.actionWithImageInChatHistoryImg
                                                            ]}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View
                                                style={[styles.chatDetailMessageFromOpponentImageItem]}
                                            >
                                                <Image
                                                    source={require("../../assets/image-in-chat-history.jpg")}
                                                    resizeMode='contain'
                                                    style={[
                                                        styles.imageInChatHistory,
                                                        {
                                                            borderColor: 
                                                            theme === lightMode
                                                            ?
                                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                                            :
                                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                                        }
                                                    ]}
                                                />
                                                <View
                                                    style={[
                                                        styles.actionsWithImageInChatHistoryBox,
                                                    ]}
                                                >
                                                    <TouchableOpacity>
                                                        <Image
                                                            source={require("../../assets/download-2-line-icon.png")}
                                                            style={[
                                                                styles.actionWithImageInChatHistoryImg
                                                            ]}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <Image
                                                            source={require('../../assets/more-fill-icon.png')}
                                                            style={[
                                                                styles.actionWithImageInChatHistoryImg
                                                            ]}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentTimeInfoBox,
                                            ]}
                                        >
                                            <Image
                                                source={require("../../assets/time-line-icon.png")}
                                                resizeMode='contain'
                                                style={[
                                                    styles.chatDetailMessageFromOpponentTimeInfoClockImg
                                                ]}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatDetailMessageFromOpponentTimeInfoClockMilesStone
                                                ]}
                                            >10:00</Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentTriangle,
                                            ]}
                                        >

                                        </View>
                                    </View>

                                    <Text
                                        style={[
                                            styles.chatDetailMessageFromOpponentUsername,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightTertiaryText
                                            :
                                            commonStyles.darkTertiaryText
                                        ]}
                                    >Doris Brown</Text>
                                </View>
                              
                                <View
                                   onTouchStart={(event)=>{
                                    // 0 is id or index or chat item
                                    handleOpenMoreActionOnMessage(event, 3)
                                   }}
                                   style={[
                                    styles.chatDetailMessageFromOpponentMoreActionBox
                                   ]}
                                >
                                    <Image
                                        
                                        source={require("../../assets/more-vertical-line-icon.png")}
                                        resizeMode='contain'
                                        style={{
                                            width: 18, height: 18,
                                            tintColor:
                                            theme === lightMode
                                            ?
                                            commonStyles.lightIconColor.color
                                            :
                                            commonStyles.darkIconColor.color 
                                        }}
                                    />
                                    {
                                        indexMessageAction === 3
                                        &&
                                        <MessagePopupAction
                                            style={positionMessageAction}
                                            theme={theme}
                                            setIndexMessageAction={setIndexMessageAction}
                                        />

                                    }
                                </View>
                            </View>
                           
                        </View>
                        <View
                            style={[
                                styles.chatDetailMessageFromMeBox
                            ]}
                        >
                            <View
                                style={[
                                    styles.chatDetailMessageFromMeMainWrapper
                                ]}
                            >
                                <View
                                   onTouchStart={(event)=>{
                                    // 1 is id or index or chat item
                                    handleOpenMoreActionOnMessage(event, 4)
                                   }}
                                   style={[
                                    styles.chatDetailMessageFromMeMoreActionBox
                                   ]}
                                >
                                    <Image
                                        
                                        source={require("../../assets/more-vertical-line-icon.png")}
                                        resizeMode='contain'
                                        style={{
                                            width: 18, height: 18,
                                            tintColor:
                                            theme === lightMode
                                            ?
                                            commonStyles.lightIconColor.color
                                            :
                                            commonStyles.darkIconColor.color 
                                        }}
                                    />
                                    {
                                        indexMessageAction === 4
                                        &&
                                        <MessagePopupAction
                                            style={positionMessageAction}
                                            theme={theme}
                                            setIndexMessageAction={setIndexMessageAction}
                                        />

                                    }
                                </View>
                                <View
                                    style={[
                                        styles.chatDetailMessageFromOpponentMainContainer
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.chatDetailMessageFromMeInfoBox,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightTertiaryBackground
                                            :
                                            commonStyles.darkTertiaryBackground
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentInfoTextBox
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.chatDetailMessageFromOpponentInfoText,
                                                    {
                                                        color: theme === lightMode
                                                        ?
                                                        commonStyles.lightPrimaryText.color
                                                        :
                                                        commonStyles.darkPrimaryText.color
                                                    }
                                                    
                                                ]}
                                            >
                                                Good morning
                                            </Text>

                                        </View>
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentImageBox,
                                            ]}
                                        >
                                            <View
                                                style={[styles.chatDetailMessageFromOpponentImageItem]}
                                            >
                                                <Image
                                                    source={require("../../assets/image-in-chat-history.jpg")}
                                                    resizeMode='contain'
                                                    style={[
                                                        styles.imageInChatHistory,
                                                        {
                                                            borderColor: 
                                                            theme === lightMode
                                                            ?
                                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                                            :
                                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                                        }
                                                    ]}
                                                />
                                                <View
                                                    style={[
                                                        styles.actionsWithImageInChatHistoryBox,
                                                    ]}
                                                >
                                                    <TouchableOpacity>
                                                        <Image
                                                            source={require("../../assets/download-2-line-icon.png")}
                                                            style={[
                                                                styles.actionWithImageInChatHistoryImg
                                                            ]}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <Image
                                                            source={require('../../assets/more-fill-icon.png')}
                                                            style={[
                                                                styles.actionWithImageInChatHistoryImg
                                                            ]}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View
                                                style={[styles.chatDetailMessageFromOpponentImageItem]}
                                            >
                                                <Image
                                                    source={require("../../assets/image-in-chat-history.jpg")}
                                                    resizeMode='contain'
                                                    style={[
                                                        styles.imageInChatHistory,
                                                        {
                                                            borderColor: 
                                                            theme === lightMode
                                                            ?
                                                            commonStyles.chatNavbarBorderBottomColorLight.color
                                                            :
                                                            commonStyles.chatNavbarBorderBottomColorDark.color
                                                        }
                                                    ]}
                                                />
                                                <View
                                                    style={[
                                                        styles.actionsWithImageInChatHistoryBox,
                                                    ]}
                                                >
                                                    <TouchableOpacity>
                                                        <Image
                                                            source={require("../../assets/download-2-line-icon.png")}
                                                            style={[
                                                                styles.actionWithImageInChatHistoryImg
                                                            ]}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <Image
                                                            source={require('../../assets/more-fill-icon.png')}
                                                            style={[
                                                                styles.actionWithImageInChatHistoryImg
                                                            ]}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromMeTimeInfoBox,
                                            ]}
                                        >
                                            <Image
                                                source={require("../../assets/time-line-icon.png")}
                                                resizeMode='contain'
                                                style={[
                                                    styles.chatDetailMessageFromOpponentTimeInfoClockImg,
                                                    {
                                                        tintColor: theme === lightMode
                                                        ?
                                                        commonStyles.lightSecondaryText.color
                                                        :
                                                        commonStyles.darkSecondaryText.color
                                                    }
                                                ]}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatDetailMessageFromOpponentTimeInfoClockMilesStone,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText
                                                    :
                                                    commonStyles.darkSecondaryText
                                                ]}
                                            >10:00</Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromMeTriangle,
                                                {
                                                    borderBottomColor: theme === lightMode
                                                    ?
                                                    commonStyles.lightTertiaryBackground.backgroundColor
                                                    :
                                                    commonStyles.darkTertiaryBackground.backgroundColor
                                                }
                                            ]}
                                        >

                                        </View>
                                    </View>

                                    <Text
                                        style={[
                                            styles.chatDetailMessageFromMeUsername,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightTertiaryText
                                            :
                                            commonStyles.darkTertiaryText
                                        ]}
                                    >Doris Brown</Text>
                                </View>
                            </View>
                            <Image
                                source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                resizeMode='contain'
                                style={[
                                    styles.chatDetailAvatarImg
                                ]}
                            />
                        </View>
                        <View
                            style={[
                                styles.chatDetailMessageFromMeBox
                            ]}
                        >
                            <View
                                style={[
                                    styles.chatDetailMessageFromMeMainWrapper
                                ]}
                            >
                                <View
                                   onTouchStart={(event)=>{
                                    // 1 is id or index or chat item
                                    handleOpenMoreActionOnMessage(event, 5)
                                   }}
                                   style={[
                                    styles.chatDetailMessageFromMeMoreActionBox
                                   ]}
                                >
                                    <Image
                                        
                                        source={require("../../assets/more-vertical-line-icon.png")}
                                        resizeMode='contain'
                                        style={{
                                            width: 18, height: 18,
                                            tintColor:
                                            theme === lightMode
                                            ?
                                            commonStyles.lightIconColor.color
                                            :
                                            commonStyles.darkIconColor.color 
                                        }}
                                    />
                                    {
                                        indexMessageAction === 5
                                        &&
                                        <MessagePopupAction
                                            style={positionMessageAction}
                                            theme={theme}
                                            setIndexMessageAction={setIndexMessageAction}
                                        />

                                    }
                                </View>
                                <View
                                    style={[
                                        styles.chatDetailMessageFromOpponentMainContainer
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.chatDetailMessageFromMeInfoBox,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightTertiaryBackground
                                            :
                                            commonStyles.darkTertiaryBackground
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentInfoTextBox
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.chatDetailMessageFromOpponentInfoText,
                                                    {
                                                        color: theme === lightMode
                                                        ?
                                                        commonStyles.lightPrimaryText.color
                                                        :
                                                        commonStyles.darkPrimaryText.color
                                                    }
                                                    
                                                ]}
                                            >
                                                Good morning
                                            </Text>

                                        </View>
                                        <View
                                            style={[
                                                styles.fileBoxInChatHistory,
                                                theme === lightMode
                                                ?
                                                commonStyles.lightPrimaryBackground
                                                :
                                                commonStyles.darkPrimaryBackground
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    styles.fileBoxInChatHistoryImgBox,
                                                    {
                                                        backgroundColor: 
                                                        theme === lightMode
                                                        ?
                                                        "#ECE1FC"
                                                        :
                                                        "#7269EF26"
                                                    }
                                                ]}
                                            >
                                                <Image
                                                    source={require("../../assets/file-text-fill-icon.png")}
                                                    resizeMode='contain'
                                                    style={{
                                                        width: 20, height: 20,
                                                        tintColor: commonStyles.primaryColor.color
                                                    }}
                                                />
                                            </View>
                                            <Text
                                                ellipsizeMode='tail'
                                                numberOfLines={1}
                                                style={[
                                                    styles.fileBoxInChatHistoryNameFile,

                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightPrimaryText
                                                    :
                                                    commonStyles.darkPrimaryText
                                                ]}
                                                
                                            >
                                                ThisIsFileABCBCBABABABA.txt
                                            </Text>
                                            <TouchableOpacity>
                                                <Image
                                                    source={require("../../assets/download-2-line-icon.png")}
                                                    style={
                                                        [styles.fileBoxInChatHistoryFileImageIcon,
                                                        {
                                                            tintColor:
                                                            theme === lightMode
                                                            ?
                                                            commonStyles.lightIconColor.color
                                                            :
                                                            commonStyles.darkIconColor.color
                                                        }]
                                                    }
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Image
                                                    source={require("../../assets/more-fill-icon.png")}
                                                    style={
                                                        [styles.fileBoxInChatHistoryFileImageIcon,
                                                            {
                                                                tintColor:
                                                                theme === lightMode
                                                                ?
                                                                commonStyles.lightIconColor.color
                                                                :
                                                                commonStyles.darkIconColor.color
                                                            }
                                                        ]
                                                    }
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromMeTimeInfoBox,
                                            ]}
                                        >
                                            <Image
                                                source={require("../../assets/time-line-icon.png")}
                                                resizeMode='contain'
                                                style={[
                                                    styles.chatDetailMessageFromOpponentTimeInfoClockImg,
                                                    {
                                                        tintColor: theme === lightMode
                                                        ?
                                                        commonStyles.lightSecondaryText.color
                                                        :
                                                        commonStyles.darkSecondaryText.color
                                                    }
                                                ]}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatDetailMessageFromOpponentTimeInfoClockMilesStone,
                                                    theme === lightMode
                                                    ?
                                                    commonStyles.lightSecondaryText
                                                    :
                                                    commonStyles.darkSecondaryText
                                                ]}
                                            >10:00</Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromMeTriangle,
                                                {
                                                    borderBottomColor: theme === lightMode
                                                    ?
                                                    commonStyles.lightTertiaryBackground.backgroundColor
                                                    :
                                                    commonStyles.darkTertiaryBackground.backgroundColor
                                                }
                                            ]}
                                        >

                                        </View>
                                    </View>

                                    <Text
                                        style={[
                                            styles.chatDetailMessageFromMeUsername,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightTertiaryText
                                            :
                                            commonStyles.darkTertiaryText
                                        ]}
                                    >Doris Brown</Text>
                                </View>
                            </View>
                            <Image
                                source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                resizeMode='contain'
                                style={[
                                    styles.chatDetailAvatarImg
                                ]}
                            />
                        </View>  
                        <View
                            style={[
                                styles.chatDetailMessageFromOpponentBox
                            ]}
                        >
                            <Image
                                source={{uri: "https://avatar.iran.liara.run/public/44"}}
                                resizeMode='contain'
                                style={[
                                    styles.chatDetailAvatarImg
                                ]}
                            />
                            <View
                                style={[
                                    styles.chatDetailMessageFromOpponentMainWrapper
                                ]}
                            >
                                <View
                                    style={[
                                        styles.chatDetailMessageFromOpponentMainContainer
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.chatDetailMessageFromOpponentInfoBox,
                                        
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentInfoTextBox
                                            ]}
                                        >
                                            <Text
                                                    style={[
                                                        styles.chatDetailMessageFromOpponentInfoText,
                                                    
                                                    ]}
                                            >
                                                typing
                                            </Text>
                                            <TypingAnimation
                                                dotColor={
                                                    commonStyles.darkPrimaryText.color
                                                }
                                                dotAmplitude={2}
                                                style={{
                                                    marginBottom: 15,
                                                }}
                                                dotStyles={{
                                                    fontSize: 3
                                                }}
                                                dotMargin={5}
                                                dotSpeed={0.3}
                                                dotRadius={2.5}
                                                dotX={12}
                                                dotY={6}
                                            />
                                        </View>
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentTimeInfoBox,
                                            ]}
                                        >
                                            <Image
                                                source={require("../../assets/time-line-icon.png")}
                                                resizeMode='contain'
                                                style={[
                                                    styles.chatDetailMessageFromOpponentTimeInfoClockImg
                                                ]}
                                            />
                                            <Text
                                                style={[
                                                    styles.chatDetailMessageFromOpponentTimeInfoClockMilesStone
                                                ]}
                                            >10:00</Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentTriangle,
                                            ]}
                                        >

                                        </View>
                                    </View>

                                    <Text
                                        style={[
                                            styles.chatDetailMessageFromOpponentUsername,
                                            theme === lightMode
                                            ?
                                            commonStyles.lightTertiaryText
                                            :
                                            commonStyles.darkTertiaryText
                                        ]}
                                    >Doris Brown</Text>
                                </View>
                              
                                <View
                                   onTouchStart={(event)=>{
                                    // 0 is id or index or chat item
                                    handleOpenMoreActionOnMessage(event, 0)
                                   }}
                                   style={[
                                    styles.chatDetailMessageFromOpponentMoreActionBox
                                   ]}
                                >
                                    <Image
                                        
                                        source={require("../../assets/more-vertical-line-icon.png")}
                                        resizeMode='contain'
                                        style={{
                                            width: 18, height: 18,
                                            tintColor:
                                            theme === lightMode
                                            ?
                                            commonStyles.lightIconColor.color
                                            :
                                            commonStyles.darkIconColor.color 
                                        }}
                                    />
                                    {
                                        indexMessageAction === 0
                                        &&
                                        <MessagePopupAction
                                            style={positionMessageAction}
                                            theme={theme}
                                            setIndexMessageAction={setIndexMessageAction}
                                        />

                                    }
                                </View>
                            </View>
                           
                        </View>      
                    </ScrollView>
                </View>
                <View
                    style={[
                        styles.chatDetailBottomWrapper,
                        {
                            borderTopColor: theme === lightMode
                            ?
                            commonStyles.chatNavbarBorderBottomColorLight.color
                            :
                            commonStyles.chatNavbarBorderBottomColorDark.color
                        }
                    ]}
                >
                    <View
                        style={[
                            styles.chatDetailBottomContainer
                        ]}
                    >
                        <TextInput
                            placeholder={t("chatDetailSendTextPlaceholder")}
                            style={[
                                styles.textInputMessage,
                                theme === lightMode
                                ?
                                commonStyles.lightTertiaryBackground
                                :
                                commonStyles.darkTertiaryBackground,
                                {
                                    color: theme === lightMode
                                    ?
                                    commonStyles.lightTertiaryText.color
                                    :
                                    commonStyles.darkTertiaryText.color
                                }
                            ]}
                            placeholderTextColor={
                                theme === lightMode
                                ?
                                commonStyles.lightTertiaryText.color
                                :
                                commonStyles.darkTertiaryText.color
                            }
                        />
                        <TouchableOpacity>
                            <Image
                                source={require("../../assets/emotion-happy-line-icon.png")}
                                resizeMode='contain'
                                style={[
                                    styles.bottomSecondActionImg,
                                    
                                ]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require("../../assets/attachment-line-icon.png")}
                                resizeMode='contain'
                                style={[
                                    styles.bottomSecondActionImg
                                ]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require("../../assets/image-fill-icon.png")}
                                resizeMode='contain'
                                style={[
                                    styles.bottomSecondActionImg
                                ]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.bottomSendActionBox
                            ]}
                        >
                            <Image
                                source={require("../../assets/send-plane-2-fill-icon.png")}
                                resizeMode='contain'
                                style={[
                                    styles.bottomSendActionImg,
                                ]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}
interface MessagePopupActionProps {
    theme: string;
    style: object;
    setIndexMessageAction: React.Dispatch<React.SetStateAction<number>>;
}
function MessagePopupAction(props: MessagePopupActionProps){
    const {theme, style, setIndexMessageAction} = props;
    const {t} = useTranslation();

    return (
        <OutsidePressHandler
                                        onOutsidePress={()=>{
            
                                            setIndexMessageAction(-1);
                                        }}
                                    >
                                        <View
                                            style={[
                                                styles.chatDetailMessageFromOpponentPopupActionBox,
                                                theme === lightMode
                                                ?
                                                commonStyles.lightFourBackground
                                                :
                                                commonStyles.darkFourBackground,
                                                style
                                            ]}
                                        >
                                            <TouchableOpacity
                                                style={[
                                                    styles.itemInMessageFromOpponentPopupAction
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.itemInMessageFromOpponentPopupActionText,
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.lightTertiaryText
                                                        :
                                                        commonStyles.darkTertiaryText
                                                    ]}
                                                >{t("chatDetailMessageCopyAction")}</Text>
                                                <Image
                                                    source={require("../../assets/file-copy-line-icon.png")}
                                                    resizeMode='contain'
                                                    style={[
                                                        styles.itemInMessageFromOpponentPopupActionImg,
                                                        {
                                                            tintColor: theme === lightMode
                                                            ?
                                                            commonStyles.lightTertiaryText.color
                                                            :
                                                            commonStyles.darkTertiaryText.color
                                                        }
                                                    ]}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[
                                                    styles.itemInMessageFromOpponentPopupAction
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.itemInMessageFromOpponentPopupActionText,
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.lightTertiaryText
                                                        :
                                                        commonStyles.darkTertiaryText
                                                    ]}
                                                >{t("chatDetailMessageSaveAction")}</Text>
                                                <Image
                                                    source={require("../../assets/save-line-icon.png")}
                                                    resizeMode='contain'
                                                    style={[
                                                        styles.itemInMessageFromOpponentPopupActionImg,
                                                        {
                                                            tintColor: theme === lightMode
                                                            ?
                                                            commonStyles.lightTertiaryText.color
                                                            :
                                                            commonStyles.darkTertiaryText.color
                                                        }
                                                    ]}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[
                                                    styles.itemInMessageFromOpponentPopupAction
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.itemInMessageFromOpponentPopupActionText,
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.lightTertiaryText
                                                        :
                                                        commonStyles.darkTertiaryText
                                                    ]}
                                                >{t("chatDetailMessageForwardAction")}</Text>
                                                <Image
                                                    source={require("../../assets/chat-forward-line-icon.png")}
                                                    resizeMode='contain'
                                                    style={[
                                                        styles.itemInMessageFromOpponentPopupActionImg,
                                                        {
                                                            tintColor: theme === lightMode
                                                            ?
                                                            commonStyles.lightTertiaryText.color
                                                            :
                                                            commonStyles.darkTertiaryText.color
                                                        }
                                                    ]}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[
                                                    styles.itemInMessageFromOpponentPopupAction
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.itemInMessageFromOpponentPopupActionText,
                                                        theme === lightMode
                                                        ?
                                                        commonStyles.lightTertiaryText
                                                        :
                                                        commonStyles.darkTertiaryText
                                                    ]}
                                                >{t("chatDetailMessageDeleteAction")}</Text>
                                                <Image
                                                    source={require("../../assets/delete-bin-line-icon.png")}
                                                    resizeMode='contain'
                                                    style={[
                                                        styles.itemInMessageFromOpponentPopupActionImg,
                                                        {
                                                            tintColor: theme === lightMode
                                                            ?
                                                            commonStyles.lightTertiaryText.color
                                                            :
                                                            commonStyles.darkTertiaryText.color
                                                        }
                                                    ]}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </OutsidePressHandler>       
    )
}