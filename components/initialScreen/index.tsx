
import { useTranslation } from 'react-i18next'
import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import { useColorScheme } from 'react-native';


export default function InitialScreen() {
    const {t, i18n} = useTranslation();
    
    return (
        <View>
            <StatusBar/>
            <SafeAreaView>
                <Text>{t('initialScreenLogin')}</Text>
            </SafeAreaView>
        </View>
    )
}