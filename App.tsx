import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import InitialScreen from './components/initialScreen';
import './i18n/i18n.config';
import { IRootState, store } from './redux_toolkit/store';
import { useTranslation } from 'react-i18next';
import OpenScreen from './components/openScreen';
import Login from './components/loginScreen';
import { StepOneRegister, StepTwoRegister, StepThreeRegister} from './components/register';
import StepFourRegister from './components/register/stepFourRegister';
import StepFiveRegister from './components/register/stepFiveRegister';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import PrimaryBottomTab from './components/primaryBottomTab';
import ChatDetail from './components/chatDetail';
import { EventProvider } from 'react-native-outside-press';

import ChatProfile from './components/chatProfile';
import AddFriend from './components/addFriend';
import AddFriendInvitation from './components/addFriendInvitation';
import AddFriendInvitationSetting from './components/addFriendInvitationSetting';
import ContactsInPhone from './components/contactsInPhone';
import SearchHistoryModification from './components/searchHistoryModification';
import CreateGroup from './components/createGroup';
import StepTwoPointFiveRegister from './components/register/stepTwoPointFiveRegister';
import AddFriendIntoGroup from './components/addFriendIntoGroup';
import { ManagingGroup } from './components/managingGroup';
import ShowMembersInGroup from './components/showMembersInGroup';
import ChatOptional from './components/chatDetail/chatOptional';
import { useEffect } from 'react';
import VideoCall from './components/videoCall';
import AudioCall from './components/audioCall';


const Stack = createStackNavigator();

export default function App() {
    // change the language follow up settings saved in the device
    // const {t, i18n} = useTranslation();
    // useEffect, i18n.changeLanguage('en')
    useEffect(()=>{
      console.log("abc")
    })


  return (
    <Provider store={store}>
      <EventProvider style={{ flex: 1 }}>
        <ActionSheetProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='OpenScreen'
            
            >
              <Stack.Screen name='OpenScreen' component={OpenScreen}/>
              <Stack.Screen name="InitialScreen" component={InitialScreen} />
              <Stack.Screen name='StepOneRegister' component={StepOneRegister}/>
              <Stack.Screen name='StepTwoRegister' component={StepTwoRegister}/>
              <Stack.Screen name='StepTwoPointFiveRegister' component={StepTwoPointFiveRegister}/>
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
              <Stack.Screen name='ContactsInPhone' component={ContactsInPhone}/>
              <Stack.Screen name='SearchHistoryModification' component={SearchHistoryModification}/>
              <Stack.Screen name='CreateGroup' component={CreateGroup}/>
              <Stack.Screen name='Login' component={Login}/>
              <Stack.Screen name='AddFriendIntoGroup' component={AddFriendIntoGroup}/>
              <Stack.Screen name='ManagingGroup' component={ManagingGroup}/>
              <Stack.Screen name='ShowMembersInGroup' component={ShowMembersInGroup}/>
              <Stack.Screen name='ChatOptional' component={ChatOptional}/>
              <Stack.Screen name='VideoCall' component={VideoCall}/>
              <Stack.Screen name='AudioCall' component={AudioCall}/>
            </Stack.Navigator>
          </NavigationContainer>
        </ActionSheetProvider>
      </EventProvider>
    </Provider>
  )
}
