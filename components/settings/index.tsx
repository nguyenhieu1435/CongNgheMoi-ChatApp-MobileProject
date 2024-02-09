import { View, Text } from 'react-native'
import { styles } from './styles'
import { useSelector } from 'react-redux'
import { IRootState } from '../../redux_toolkit/store'
import { useTranslation } from 'react-i18next'

export default function Settings() {
    const theme = useSelector((state: IRootState) => state.theme.theme)
    const {t} = useTranslation();

    return (
        <View>
            <Text>index</Text>
        </View>
    )
}