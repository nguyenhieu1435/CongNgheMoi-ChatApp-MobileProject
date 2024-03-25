import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import InitialScreen from './components/initialScreen';
import Login from './components/loginScreen';
import './i18n/i18n.config';
import { store } from './redux_toolkit/store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    // change the language follow up settings saved in the device
    // const {t, i18n} = useTranslation();
    // useEffect, i18n.changeLanguage('en')

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='login'
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen
                        name='InitialScreen'
                        component={InitialScreen}
                    />
                    <Stack.Screen name='login' component={Login} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
