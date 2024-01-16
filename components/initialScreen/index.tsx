
import { useTranslation } from 'react-i18next'
import { View, Text, SafeAreaView, StatusBar, Image, Dimensions, ScrollView, NativeScrollEvent, TouchableOpacity } from 'react-native'
import { useColorScheme } from 'react-native';
import {styles} from "./styles"
import commonStyles from '../../CommonStyles/commonStyles';
import { useRef, useState } from 'react';

interface SlideData {
    title: string,
    description: string,
    image: any // using NodeRequire but occur error with source so using any
}

const {width : WIDTH, height: HEIGHT} = Dimensions.get("window");

interface Props {
    navigation: any
}

export default function InitialScreen({navigation} : Props) {
    const {t, i18n} = useTranslation();
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeSlideHeader, setActiveSlideHeader] = useState(0);
    const headerSliderRef = useRef<ScrollView>(null);

   
   
    const imgDatas = {
        img1: require("../../assets/callvideo2.png"),
        img2: require("../../assets/groupchat.png"),
        img3: require("../../assets/sharingImage.png"),
        img4: require("../../assets/friendStory.png"),
        img5: require("../../assets/logo_zalo.png")
    }

    const slideDatas : SlideData[] = [
        {
          title: t("initialScreenSlider1.title"),
          description: t("initialScreenSlider1.description"),
          image: imgDatas.img1
        },
        {
          title: t("initialScreenSlider2.title"),
          description: t("initialScreenSlider2.description"),
          image: imgDatas.img2
        },
        {
          title: t("initialScreenSlider3.title"),
          description: t("initialScreenSlider3.description"),
          image: imgDatas.img3
        },
        {
          title: t("initialScreenSlider4.title"),
          description: t("initialScreenSlider4.description"),
          image: imgDatas.img4
        },
        {
          title: t("initialScreenSlider5.title"),
          description: t("initialScreenSlider5.description"),
          image: imgDatas.img5
        }
    ]

    const handleOnchangeLanguage = (language : string)=>{
        i18n.changeLanguage(language);
    }

    const handleOnChangeSlider = (nativeEvent : NativeScrollEvent)=>{
        if (nativeEvent){
            const slide = Math.ceil((nativeEvent.contentOffset.x - 100)  / nativeEvent.layoutMeasurement.width);
            if(slide !== activeSlide){
                if (slide > 3 && headerSliderRef){
                    headerSliderRef.current?.scrollTo({x: WIDTH, y: 0, animated: true});
                } else {
                    headerSliderRef.current?.scrollTo({x: 0, y: 0, animated: true});
                
                }
                setActiveSlide(slide);
            }
        }
    }
    
    return (
        <View style={[styles.wrapper, commonStyles.lightPrimaryBackground]}>
            <StatusBar/>
            <SafeAreaView style={[styles.container]}>
                <View style={[styles.boxImageBackground]}>
                    <Image
                        source={require("../../assets/honoiskyline.png")}
                        resizeMode='cover'
                    />
                </View>
                <View style={styles.topLayout}>
                    <ScrollView
                        scrollEnabled={false}
                        ref={headerSliderRef}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        horizontal
                        style={styles.boxLogoContainer}
                    >
                        <View style={styles.boxLogoHeader}>
                            <Image
                                source={require("../../assets/logo_zalo.png")}
                                style={styles.imgLogoHeader}
                            />
                        </View> 
                        <View style={styles.boxLogoHeader}>
                            
                        </View> 
                    </ScrollView>
                    <ScrollView
                        onScroll={({nativeEvent}) => handleOnChangeSlider(nativeEvent)}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        horizontal
                        style={styles.sliderContainer}
                    >
                        {
                            slideDatas
                            &&
                            slideDatas.map((slideItem, index)=>{
                                return (
                                    <View style={styles.itemSlide} key={index}>
                                        <Image
                                            source={slideItem.image}
                                            resizeMode='contain'
                                            style={styles.imageSlider}
                                        />
                                        <Text style={styles.titleSliderItem}>
                                            {slideItem.title}
                                        </Text>
                                        <Text style={styles.descriptionSliderItem}>
                                            {slideItem.description}
                                        </Text>
                                    </View>
                                )
                            })
                        }
                        
                        {/* <View style={styles.itemSlide}>
                            <Image
                                source={require("../../assets/callvideo2.png")}
                                resizeMode='cover'
                                style={styles.imageSlider}
                            />
                            <Text style={styles.titleSliderItem}>
                                Chat nhóm tiện lợi
                            </Text>
                            <Text style={styles.descriptionSliderItem}>
                            Trò chuyện thật đã với hình ảnh sắc nét, tiếng chất, âm chuẩn dưới mọi điều kiện mạng
                            </Text>
                        </View> */}
                    </ScrollView>
                    <View style={styles.listDotOfSlide}>
                        {
                            slideDatas
                            &&
                            slideDatas.map((slideItem, index)=>{
                                return (
                                    <Text key={index} style={[styles.dotOfSlide, activeSlide === index ? styles.activeDotOfSlide : null]}></Text>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={styles.botLayout}>
                    <View style={styles.boxBtnWrapper}>
                        <TouchableOpacity style={[styles.btnLogin]}
                            onPress={()=> navigation.navigate("Login")}
                        >
                            <Text style={styles.btnTextLogin}>{t("initialScreenLogin")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnRegister}
                            onPress={()=> navigation.navigate("StepOneRegister")}
                        >
                            <Text style={styles.btnTextRegister}>{t("initialScreenRegister")}</Text>
                        </TouchableOpacity>

                        <View style={styles.boxChooseLanguage}>
                            <TouchableOpacity style={styles.btnLanguage}
                                onPress={()=>handleOnchangeLanguage("vi")}
                            >
                                <Text style={[styles.btnTextLanguage, i18n.language == "vi" ? styles.languageActive : null]}>Tiếng Việt</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnLanguage}
                                onPress={()=>handleOnchangeLanguage("en")}
                            >
                                <Text style={[styles.btnTextLanguage, i18n.language == "en" ? styles.languageActive : null]}>English</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}