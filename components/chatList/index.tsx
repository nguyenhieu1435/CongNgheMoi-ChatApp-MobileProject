import { View, Text, StatusBar, SafeAreaView, TextInput, Image, Dimensions, TouchableOpacity } from 'react-native'
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux_toolkit/store';
import { useTranslation } from 'react-i18next';
import { lightMode } from '../../redux_toolkit/slices/theme.slice';
import commonStyles from '../../CommonStyles/commonStyles';
import { EvilIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
const {TypingAnimation} = require('react-native-typing-animation');

type Props = {
    navigation: any
}
const WIDTH = Dimensions.get("window").width;

export default function ChatList({navigation} : Props) {
    const theme = useSelector((state: IRootState) => state.theme.theme)
    const {t} = useTranslation();
    const [textSearch, setTextSearch] = useState("");
    

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
                    <Text
                        style={[styles.chatListTitleName,
                            theme === lightMode
                            ? commonStyles.lightPrimaryText
                            : commonStyles.darkPrimaryText
                        ]}
                    >{t("chatListTitle")}</Text>
                    <View
                        style={[styles.chatListBoxSearch,
                            theme === lightMode
                            ? commonStyles.lightSecondaryBackground
                            : commonStyles.darkSecondaryBackground
                        ]}
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
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        
                        showsHorizontalScrollIndicator={false}
                        style={[
                            styles.friendsActiveListBox
                        ]}
                    >
                        <View
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
                        </View>     
                        <View
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
                        </View>     
                        <View
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
                        </View>     
                        <View
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
                        </View>     
                        <View
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
                        </View>     
                        <View
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
                        </View>     
                        <View
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
                        </View>     
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
                            activeOpacity={1}
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
                        <View
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
                        </View>
                        <View
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
                        </View>       
                        <View
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
                        </View>
                        <View
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
                        </View>
                        <View
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
                        </View>
                        <View
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
                        </View>       
                        <View
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
                        </View>
                        <View
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
                        </View>
                        <View
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
                        </View>
                        <View
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
                        </View>       
                        <View
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
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )
}