import { Image, SafeAreaView, StatusBar, Text, View } from 'react-native'
import {styles} from "./styles"
import commonStyle from "../../CommonStyles/commonStyles"
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';


interface Props {
  navigation: any
}

export default function OpenScreen({navigation} : Props) {

    useEffect(()=>{
        // loading data insteaf of setTimeout
        setTimeout(()=>{
            navigation.navigate('InitialScreen')
        }, 2000)
    }, [])

    return (
        <View style={{flex: 1}}>
            <StatusBar/>
            <SafeAreaView style={[styles.container]}>
                <Image
                    source={require("../../assets/bg_zalo.png")}
                    style={{width: '100%', height: '100%'}}
                    resizeMode='cover'
                />
                <Text style={[styles.logoText, commonStyle.darkPrimaryText]}>Zalo</Text>
            </SafeAreaView>
        </View>
    )
}
