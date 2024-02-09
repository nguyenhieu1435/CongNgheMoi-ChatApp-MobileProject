import { View, Text, StatusBar, SafeAreaView, TextInput, Image, Dimensions } from 'react-native'
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux_toolkit/store';
import { useTranslation } from 'react-i18next';
import { lightMode } from '../../redux_toolkit/slices/theme.slice';
import commonStyles from '../../CommonStyles/commonStyles';
import { EvilIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';


type Props = {
    navigation: any
}
const WIDTH = Dimensions.get("window").width;

export default function ChatList({navigation} : Props) {
    const theme = useSelector((state: IRootState) => state.theme.theme)
    const {t} = useTranslation();
    

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
                        style={[styles.chatListTitleName]}
                    >Chats</Text>
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
                            placeholder='Search messages or users'
                            style={[styles.textInputSearchMsgOrUser]}
                            placeholderTextColor={
                                theme === lightMode
                                ?
                                commonStyles.lightIconColor.color
                                : 
                                commonStyles.darkIconColor.color
                            }
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
                                    <Text style={[styles.activeOnlineUserName]}>Mark</Text>
                                </View>
                                <View
                                    style={[styles.friendActiveItemLayout,
                                        theme == lightMode
                                        ?
                                        commonStyles.lightSecondaryBackground
                                        :
                                        commonStyles.darkSecondaryBackground
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
                                    <Text style={[styles.activeOnlineUserName]}>Mark</Text>
                                </View>
                                <View
                                    style={[styles.friendActiveItemLayout,
                                        theme == lightMode
                                        ?
                                        commonStyles.lightSecondaryBackground
                                        :
                                        commonStyles.darkSecondaryBackground
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
                                    <Text style={[styles.activeOnlineUserName]}>Mark</Text>
                                </View>
                                <View
                                    style={[styles.friendActiveItemLayout,
                                        theme == lightMode
                                        ?
                                        commonStyles.lightSecondaryBackground
                                        :
                                        commonStyles.darkSecondaryBackground
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
                                    <Text style={[styles.activeOnlineUserName]}>Mark</Text>
                                </View>
                                <View
                                    style={[styles.friendActiveItemLayout,
                                        theme == lightMode
                                        ?
                                        commonStyles.lightSecondaryBackground
                                        :
                                        commonStyles.darkSecondaryBackground
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
                                    <Text style={[styles.activeOnlineUserName]}>Mark</Text>
                                </View>
                                <View
                                    style={[styles.friendActiveItemLayout,
                                        theme == lightMode
                                        ?
                                        commonStyles.lightSecondaryBackground
                                        :
                                        commonStyles.darkSecondaryBackground
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
                                    <Text style={[styles.activeOnlineUserName]}>Mark</Text>
                                </View>
                                <View
                                    style={[styles.friendActiveItemLayout,
                                        theme == lightMode
                                        ?
                                        commonStyles.lightSecondaryBackground
                                        :
                                        commonStyles.darkSecondaryBackground
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
                                    <Text style={[styles.activeOnlineUserName]}>Mark</Text>
                                </View>
                                <View
                                    style={[styles.friendActiveItemLayout,
                                        theme == lightMode
                                        ?
                                        commonStyles.lightSecondaryBackground
                                        :
                                        commonStyles.darkSecondaryBackground
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
                            styles.chatListHistoryTitle
                        ]}
                    >
                        Recent
                    </Text>
                    <ScrollView
                        style={[
                            styles.chatListHistoryScroll
                        ]}
                    >
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
                                    style={[styles.chatListHistoryUserName]}
                                >Patrick Hendricks</Text>
                                <View
                                    style={[styles.chatListHistoryPrevContentBox]}
                                >
                                    <Text
                                        style={[styles.chatListHistoryPrevContent]}
                                    >Hey! there i'm available</Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime
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
                                    style={[styles.chatListHistoryUserName]}
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
                                    />
                                    <Text
                                        style={[styles.chatListHistoryPrevContent]}
                                    >
                                    
                                        Images
                                    </Text>
                                </View>
                                
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime
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
                                    style={[styles.chatListHistoryUserName]}
                                >Patrick Hendricks</Text>
                                <View
                                    style={[
                                        styles.chatListHistoryPrevContentBox
                                    ]}
                                >
                                    <Image
                                        source={require("../../assets/file-text-fill-icon.png")}
                                        resizeMode='contain'
                                        style={{width: 15, height: 15}}
                                    />
                                    <Text
                                        style={[styles.chatListHistoryPrevContent]}
                                    >
                                        
                                        Admin-A.zip
                                    </Text>
                                </View>
                                
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.chatListHistoryTime
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