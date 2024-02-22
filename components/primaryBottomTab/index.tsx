import { View, Text, Image, TouchableOpacity, Dimensions, Platform, NativeModules } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatList from '../chatList';
import Contacts from '../contacts';
import Diarys from '../diary';
import Personal from '../personal';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux_toolkit/store';
import { useEffect, useRef, useState } from 'react';
import commonStyles from '../../CommonStyles/commonStyles';
import { lightMode } from '../../redux_toolkit/slices/theme.slice';
import Settings from '../settings';
import { styles } from './styles';


const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window")

interface Props {
    navigation: any
    
}

export default function PrimaryBottomTab({navigation} : Props) {
    const {t} = useTranslation();
    const theme = useSelector((state: IRootState) => state.theme.theme);
    const { StatusBarManager } = NativeModules;
    const [statusBarHeight, setStatusBarHeight] = useState(0);

    useEffect(() => {
        setStatusBarHeight(Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT)
    }, [])

    return (
        <View
            style={{
                width,
                height: height - statusBarHeight,
            }}
        >
            
            <Tab.Navigator
                tabBar={(props) => <TabBarCustomize  props={props} theme={theme} navigation={navigation}/>
                    
            }
            initialRouteName='Contacts'
                screenOptions={{headerShown: false,
                    tabBarStyle:{
                        height: 65,
                        backgroundColor: theme === lightMode ? commonStyles.lightPrimaryBackground.backgroundColor : commonStyles.darkTertiaryBackground.backgroundColor,
                    },
                    tabBarShowLabel: false,           
                }}
            >
                <Tab.Screen name="Personal" component={Personal}     
                />
                <Tab.Screen name="ChatList" options={{tabBarHideOnKeyboard: true}} component={ChatList} 
                />
                <Tab.Screen name="Diary" component={Diarys} 
                />
                <Tab.Screen name="Contacts" component={Contacts} 
                />
                <Tab.Screen name="Settings" component={Settings}
                />
            
            </Tab.Navigator>
        </View>
    )
}
interface TabBarCustomizeProps {
    props: any,
    theme: String,
    navigation: any

}
function TabBarCustomize(tabbarProps : TabBarCustomizeProps){
    const {props, theme, navigation} = tabbarProps;
    const {routeNames, index} = props.state;
    const {t} = useTranslation();
    const [toggleShowLogout, setToggleShowLogout] = useState(false);



    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={()=> setToggleShowLogout(false)}
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "nowrap",
                backgroundColor: theme == lightMode ? commonStyles.lightTertiaryBackground.backgroundColor : commonStyles.darkTertiaryBackground.backgroundColor,
                height: 60,
                shadowColor: 'rgba(0, 0, 0, 0.05)',
                shadowOffset: {
                width: 0,
                height: 6,
                },
                shadowOpacity: 1,
                shadowRadius: 24,
                elevation: 6, 
                borderWidth: 1,
                borderColor: 'rgba(0, 0, 0, 0.08)'
            }}
        >
            <View
                
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    height: "100%",
                
                }}
            >
                
                <TouchableOpacity
                    onPress={() => {
                        toggleShowLogout && setToggleShowLogout(false)
                        navigation.navigate("Personal")
                        
                    }}
                    activeOpacity={1}
                    style={{
                        width: 50, height: 48, borderRadius: 6,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: routeNames[index] === "Personal" 
                        ?
                        theme === lightMode ? commonStyles.lightBackgroundIconActive.backgroundColor : commonStyles.darkBackgroundIconActive.backgroundColor
                        :
                        "transparent"
                    }}
                >    
                    <Image
                        source={require("../../assets/user-chatlist-bottom-tab.png")}
                        tintColor={
                            routeNames[index] === "Personal"
                            ?
                            commonStyles.primaryColor.color
                            :
                            theme === lightMode ? commonStyles.lightIconColor.color : commonStyles.darkIconColor.color
                        }
                        
                    />
                    <Text
                        style={[
                            styles.txtTabbarItem,
                            routeNames[index] === "Personal"
                            ?
                            commonStyles.primaryColor
                            :
                            theme === lightMode ? commonStyles.lightIconColor : commonStyles.darkIconColor
                        ]}
                    >{t("tabbarProfile")}</Text>
                </TouchableOpacity>
               
            </View>
            <View
               
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    height: "100%"
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        toggleShowLogout && setToggleShowLogout(false)
                        navigation.navigate("ChatList")      
                        
                    }}
                    activeOpacity={1}
                    style={{
                        width: 50, height: 48, borderRadius: 6,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: routeNames[index] === "ChatList" 
                        ?
                        theme === lightMode ? commonStyles.lightBackgroundIconActive.backgroundColor : commonStyles.darkBackgroundIconActive.backgroundColor
                        :
                        "transparent"
                    }}
                >
                   
                    <Image
                        source={require("../../assets/message-icon-bottom-tab.png")}
                
                        tintColor={
                            routeNames[index] === "ChatList"
                            ?
                            commonStyles.primaryColor.color
                            :
                            theme === lightMode ? commonStyles.lightIconColor.color : commonStyles.darkIconColor.color
                        }
                    />
                    <Text
                        style={[
                            styles.txtTabbarItem,
                            routeNames[index] === "ChatList"
                            ?
                            commonStyles.primaryColor
                            :
                            theme === lightMode ? commonStyles.lightIconColor : commonStyles.darkIconColor
                        ]}
                    >{t("tabbarChat")}</Text>
                </TouchableOpacity>
            </View>
            <View
                
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    height: "100%",
                    
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        
                        toggleShowLogout && setToggleShowLogout(false)
                        navigation.navigate("Diary")
                    }}
                    activeOpacity={1}
                    style={{
                        width: 50, height: 48, borderRadius: 6,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: routeNames[index] === "Diary" 
                        ?
                        theme === lightMode ? commonStyles.lightBackgroundIconActive.backgroundColor : commonStyles.darkBackgroundIconActive.backgroundColor
                        :
                        "transparent"
                    }}
                >
                    <Image
                        source={require("../../assets/story-icon-bottom-tab.png")}
                     
                        tintColor={
                            routeNames[index] === "Diary"
                            ?
                            commonStyles.primaryColor.color
                            :
                            theme === lightMode ? commonStyles.lightIconColor.color : commonStyles.darkIconColor.color
                        }
                    />
                    <Text
                        style={[
                            styles.txtTabbarItem,
                            routeNames[index] === "Diary"
                            ?
                            commonStyles.primaryColor
                            :
                            theme === lightMode ? commonStyles.lightIconColor : commonStyles.darkIconColor
                        ]}
                    >{t("tabbarStory")}</Text>
                </TouchableOpacity>
            </View>
            <View
                
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    height: "100%",
                  
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        toggleShowLogout && setToggleShowLogout(false)
                        navigation.navigate("Contacts")
                    }}
                    activeOpacity={1}
                    style={{
                        width: 50, height: 48, borderRadius: 6,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: routeNames[index] === "Contacts" 
                        ?
                        theme === lightMode ? commonStyles.lightBackgroundIconActive.backgroundColor : commonStyles.darkBackgroundIconActive.backgroundColor
                        :
                        "transparent"
                    }}
                >
                    <Image
                        source={require("../../assets/contacts-icon-bottom-tab.png")}
                        tintColor={
                            routeNames[index] === "Contacts"
                            ?
                            commonStyles.primaryColor.color
                            :
                            theme === lightMode ? commonStyles.lightIconColor.color : commonStyles.darkIconColor.color
                        }
                    />
                    <Text
                        style={[
                            styles.txtTabbarItem,
                            routeNames[index] === "Contacts"
                            ?
                            commonStyles.primaryColor
                            :
                            theme === lightMode ? commonStyles.lightIconColor : commonStyles.darkIconColor
                        ]}
                    >{t("tabbarContact")}</Text>
                </TouchableOpacity>
            </View>
            <View
               
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    height: "100%",
                  
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        toggleShowLogout && setToggleShowLogout(false)
                        navigation.navigate("Settings")
                    }}
                    activeOpacity={1}
                    style={{
                        width: 50, height: 48, borderRadius: 6,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: routeNames[index] === "Settings" 
                        ?
                        theme === lightMode ? commonStyles.lightBackgroundIconActive.backgroundColor : commonStyles.darkBackgroundIconActive.backgroundColor
                        :
                        "transparent"
                    }}
                >
                    <Image
                        source={require("../../assets/settings-icon-bottom-tab.png")}
                        tintColor={
                            routeNames[index] === "Settings"
                            ?
                            commonStyles.primaryColor.color
                            :
                            theme === lightMode ? commonStyles.lightIconColor.color : commonStyles.darkIconColor.color
                        }
                    />
                    <Text
                        style={[
                            styles.txtTabbarItem,
                            routeNames[index] === "Settings"
                            ?
                            commonStyles.primaryColor
                            :
                            theme === lightMode ? commonStyles.lightIconColor : commonStyles.darkIconColor
                        ]}
                    >{t("tabbarSettings")}</Text>
                </TouchableOpacity>
            </View>
            <View
               
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    height: "100%",
                    position: "relative"
                  
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={{width: 50, height: 40}}
                    onPress={()=> setToggleShowLogout(!toggleShowLogout)}
                >
                    <Image
                        source={{uri: "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"}}
                        style={{width: "100%", height: "100%"}}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                {
                    toggleShowLogout
                    &&
                    <View
                        style={[{position: "absolute",
                            bottom: 55,
                            right: 10,
                            width: 140,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 4,
                            shadowColor: 'rgba(0, 0, 0, 0.05)',
                            shadowOffset: {
                            width: 0,
                            height: 6,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 24,
                            elevation: 6, 
                            borderWidth: 1,
                            borderColor: 'rgba(0, 0, 0, 0.08)'
                        },
                        theme === lightMode ? commonStyles.lightPrimaryBackground : commonStyles.darkPrimaryBackground
                        ]}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{flexDirection: "row", alignItems: "center"}}
                            onPress={()=>{
                                setToggleShowLogout(false)
                                navigation.navigate("InitialScreen")
                            
                            }}
                        >
                            <Text style={
                                [
                                    {fontSize: 15, marginRight: 6},
                                    theme === lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText
                                ]
                            }>{t("tabbarLogoutText")}</Text>
                            <Image
                                source={require("../../assets/logout-circle-r-line.png")}
                                style={{width: 20, height: 20}}
                                tintColor={
                                    theme === lightMode ? commonStyles.lightPrimaryText.color : commonStyles.darkPrimaryText.color
                                }
                            />
                        </TouchableOpacity>
                    </View>
                }
            </View>
         </TouchableOpacity>
    )
}
