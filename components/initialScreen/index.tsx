import { useTranslation } from 'react-i18next';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
export default function InitialScreen() {
    const { t, i18n } = useTranslation();

    return (
        <View>
            <StatusBar />
            <SafeAreaView>
                <Text>{t('initialScreenLogin')}</Text>
            </SafeAreaView>
        </View>
    );
}
