import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { styles } from './styles'
import { IRootState } from '../../redux_toolkit/store'
import { useTranslation } from 'react-i18next'


export default function Diarys() {
    const theme = useSelector((state: IRootState) => state.theme.theme)
    const {t} = useTranslation();

    return (
        <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
            <Text>Developing</Text>
        </View>
    )
}