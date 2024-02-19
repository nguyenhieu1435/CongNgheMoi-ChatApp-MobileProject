import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import InitialScreen from './components/initialScreen';
import "./i18n/i18n.config"
import { Provider } from 'react-redux';
import { store } from './redux_toolkit/store';
import { useTranslation } from 'react-i18next';
import OpenScreen from './components/openScreen';
import Login from './components/login';
import { StepOneRegister, StepTwoRegister, StepThreeRegister} from './components/register';
import StepFourRegister from './components/register/stepFourRegister';
import StepFiveRegister from './components/register/stepFiveRegister';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import PrimaryBottomTab from './components/primaryBottomTab';
import ChatDetail from './components/chatDetail';
import { EventProvider } from 'react-native-outside-press';
import Personal from './components/personal';
import ChatProfile from './components/chatProfile';
import AddFriend from './components/addFriend';
import AddFriendInvitation from './components/addFriendInvitation';
import AddFriendInvitationSetting from './components/addFriendInvitationSetting';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // change the language follow up settings saved in the device
  // const {t, i18n} = useTranslation();
  // useEffect, i18n.changeLanguage('en')


  return (
    <Provider store={store}>
      <EventProvider style={{ flex: 1 }}>
        <ActionSheetProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='AddFriendInvitationSetting'
            
            >
              <Stack.Screen name='OpenScreen' component={OpenScreen}/>
              <Stack.Screen name="InitialScreen" component={InitialScreen} />
              <Stack.Screen name='Login' component={Login}/>
              <Stack.Screen name='StepOneRegister' component={StepOneRegister}/>
              <Stack.Screen name='StepTwoRegister' component={StepTwoRegister}/>
              <Stack.Screen name='StepThreeRegister' component={StepThreeRegister}/>
              <Stack.Screen name='StepFourRegister' component={StepFourRegister}/>
              <Stack.Screen name='StepFiveRegister' component={StepFiveRegister}/>
              <Stack.Screen name='PrimaryBottomTab' component={PrimaryBottomTab}/>
              <Stack.Screen name='ChatProfile' component={ChatProfile}/>
              <Stack.Screen name='AddFriend' component={AddFriend}/>
              <Stack.Screen name='ChatDetail' component={ChatDetail}
                options={{
                  cardStyleInterpolator: ({ current, layouts }) => {
                    return {
                      cardStyle: {
                        transform: [
                          {
                            translateX: current.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [layouts.screen.width, 0],
                            }),
                          },
                        ],
                      },
                    };
                  },
                }}
              />
              <Stack.Screen name='AddFriendInvitation' component={AddFriendInvitation}/>
              <Stack.Screen name='AddFriendInvitationSetting' component={AddFriendInvitationSetting}/>
            </Stack.Navigator>
          </NavigationContainer>
        </ActionSheetProvider>
      </EventProvider>
    </Provider>
  );
}

