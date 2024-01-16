import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import InitialScreen from './components/initialScreen';
import "./i18n/i18n.config"
import { Provider } from 'react-redux';
import { store } from './redux_toolkit/store';
import { useTranslation } from 'react-i18next';
import OpenScreen from './components/openScreen';
import Login from './components/login';
import { StepOneRegister, StepTwoRegister, StepThreeRegister} from './components/register';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // change the language follow up settings saved in the device
  // const {t, i18n} = useTranslation();
  // useEffect, i18n.changeLanguage('en')


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='OpenScreen'>
          <Stack.Screen name='OpenScreen' component={OpenScreen}/>
          <Stack.Screen name="InitialScreen" component={InitialScreen} />
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='StepOneRegister' component={StepOneRegister}/>
          <Stack.Screen name='StepTwoRegister' component={StepTwoRegister}/>
          <Stack.Screen name='StepThreeRegister' component={StepThreeRegister}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

