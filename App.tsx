import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import InitialScreen from './components/initialScreen';
import './i18n/i18n.config';
import { IRootState, store } from './redux_toolkit/store';
import { useTranslation } from 'react-i18next';
import OpenScreen from './components/openScreen';
import Login from './components/loginScreen';
import {
    StepOneRegister,
    StepTwoRegister,
    StepThreeRegister,
} from './components/register';
import StepFourRegister from './components/register/stepFourRegister';
import StepFiveRegister from './components/register/stepFiveRegister';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import PrimaryBottomTab from './components/primaryBottomTab';
import ChatDetail from './components/chatDetail';
import { EventProvider } from 'react-native-outside-press';

import ChatProfile from "./components/chatProfile";
import AddFriend from "./components/addFriend";
import AddFriendInvitation from "./components/addFriendInvitation";
import AddFriendInvitationSetting from "./components/addFriendInvitationSetting";
import ContactsInPhone from "./components/contactsInPhone";
import SearchHistoryModification from "./components/searchHistoryModification";
import CreateGroup from "./components/createGroup";
import StepTwoPointFiveRegister from "./components/register/stepTwoPointFiveRegister";
import AddFriendIntoGroup from "./components/addFriendIntoGroup";
import { ManagingGroup } from "./components/managingGroup";
import ShowMembersInGroup from "./components/showMembersInGroup";
import ChatOptional from "./components/chatDetail/chatOptional";
import { useEffect, useRef, useState } from "react";
import VideoCall from "./components/videoCall";
import AudioCall from "./components/audioCall";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import StepOneRecoverPasswords from './components/recoverPasswordScreen/stepOneRecoverPasswords';
import StepTwoRecoverPasswords from './components/recoverPasswordScreen/stepTwoRecoverPasswords';
import StepThreeRecoverPasswords from './components/recoverPasswordScreen/stepThreeRecoverPasswords';
import CallIncoming from './components/callIncoming';
import EditProfile from './components/editProfile';
import ChangePassword from './components/changePassword';


const Stack = createStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function App() {
    // change the language follow up settings saved in the device
    // const {t, i18n} = useTranslation();
    // useEffect, i18n.changeLanguage('en')
    const [expoPushToken, setExpoPushToken] = useState('');
    const [channels, setChannels] = useState<
        Notifications.NotificationChannel[]
    >([]);
    const [notification, setNotification] = useState<
        Notifications.Notification | undefined
    >(undefined);
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    useEffect(() => {
        registerForPushNotificationsAsync().then(
            (token) => token && setExpoPushToken(token),
        );

        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync().then((value) =>
                setChannels(value ?? []),
            );
        }
        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response);
                },
            );

        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(
                    notificationListener.current,
                );
            responseListener.current &&
                Notifications.removeNotificationSubscription(
                    responseListener.current,
                );
        };
    }, []);

    return (
        <Provider store={store}>
            <EventProvider style={{ flex: 1 }}>
                <ActionSheetProvider>
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={{ headerShown: false }}
                            initialRouteName='OpenScreen'
                        >
                            <Stack.Screen
                                name='OpenScreen'
                                component={OpenScreen}
                            />
                            <Stack.Screen
                                name='InitialScreen'
                                component={InitialScreen}
                            />
                            <Stack.Screen
                                name='StepOneRegister'
                                component={StepOneRegister}
                            />
                            <Stack.Screen
                                name='StepTwoRegister'
                                component={StepTwoRegister}
                            />
                            <Stack.Screen
                                name='StepTwoPointFiveRegister'
                                component={StepTwoPointFiveRegister}
                            />
                            <Stack.Screen
                                name='StepThreeRegister'
                                component={StepThreeRegister}
                            />
                            <Stack.Screen
                                name='StepFourRegister'
                                component={StepFourRegister}
                            />
                            <Stack.Screen
                                name='StepFiveRegister'
                                component={StepFiveRegister}
                            />
                            <Stack.Screen
                                name='PrimaryBottomTab'
                                component={PrimaryBottomTab}
                            />
                            <Stack.Screen
                                name='ChatProfile'
                                component={ChatProfile}
                            />
                            <Stack.Screen
                                name='AddFriend'
                                component={AddFriend}
                            />
                            <Stack.Screen
                                name='ChatDetail'
                                component={ChatDetail}
                                options={{
                                    cardStyleInterpolator: ({
                                        current,
                                        layouts,
                                    }) => {
                                        return {
                                            cardStyle: {
                                                transform: [
                                                    {
                                                        translateX:
                                                            current.progress.interpolate(
                                                                {
                                                                    inputRange:
                                                                        [0, 1],
                                                                    outputRange:
                                                                        [
                                                                            layouts
                                                                                .screen
                                                                                .width,
                                                                            0,
                                                                        ],
                                                                },
                                                            ),
                                                    },
                                                ],
                                            },
                                        };
                                    },
                                }}
                            />
                            <Stack.Screen
                                name='AddFriendInvitation'
                                component={AddFriendInvitation}
                            />
                            <Stack.Screen
                                name='AddFriendInvitationSetting'
                                component={AddFriendInvitationSetting}
                            />
                            <Stack.Screen
                                name='ContactsInPhone'
                                component={ContactsInPhone}
                            />
                            <Stack.Screen
                                name='SearchHistoryModification'
                                component={SearchHistoryModification}
                            />
                            <Stack.Screen
                                name='CreateGroup'
                                component={CreateGroup}
                            />
                            <Stack.Screen name='Login' component={Login} />
                            <Stack.Screen
                                name='AddFriendIntoGroup'
                                component={AddFriendIntoGroup}
                            />
                            <Stack.Screen
                                name='ManagingGroup'
                                component={ManagingGroup}
                            />
                            <Stack.Screen
                                name='ShowMembersInGroup'
                                component={ShowMembersInGroup}
                            />
                            <Stack.Screen
                                name='ChatOptional'
                                component={ChatOptional}
                            />
                            <Stack.Screen
                                name='VideoCall'
                                component={VideoCall}
                            />
                            <Stack.Screen
                                name='AudioCall'
                                component={AudioCall}
                            />
                            <Stack.Screen 
                                name="CallIncoming"
                                component={CallIncoming}
                            />
                            <Stack.Screen 
                                name="EditProfile"
                                component={EditProfile}
                            />
                            <Stack.Screen
                                name="ChangePassword"
                                component={ChangePassword}
                            />
                            
                            <Stack.Screen
                                name='StepOneRecoverPasswords'
                                component={StepOneRecoverPasswords}
                            />
                            <Stack.Screen
                                name='StepTwoRecoverPasswords'
                                component={StepTwoRecoverPasswords}
                            />
                            <Stack.Screen
                                name='StepThreeRecoverPasswords'
                                component={StepThreeRecoverPasswords}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ActionSheetProvider>
            </EventProvider>
        </Provider>
    );
}

export async function schedulePushNotification(title: string, bodyStr: string) {
    console.log('body: ', bodyStr);
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: bodyStr,
            // data: { data: "goes here", test: { test1: "more data" } },
        },
        trigger: { seconds: 2 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            console.log('Failed to get push token for push notification!');
            return;
        }
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        // EAS projectId is used here.
        try {
            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ??
                Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error('Project ID not found');
            }
            token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log(token);
        } catch (e) {
            token = `${e}`;
        }
    } else {
        console.log('Must use physical device for Push Notifications');
    }

    return token;
}
