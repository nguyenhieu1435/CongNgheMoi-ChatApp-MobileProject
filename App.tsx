import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import InitialScreen from './components/initialScreen';
import "./i18n/i18n.config"
import { Provider } from 'react-redux';
import { store } from './redux_toolkit/store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={InitialScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

