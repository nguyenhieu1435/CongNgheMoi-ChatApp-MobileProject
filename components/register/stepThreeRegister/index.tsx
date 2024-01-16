import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import {styles} from "./styles";
import { lightMode } from '../../../redux_toolkit/slices/theme.slice';
import {  useSelector } from 'react-redux';
import commonStyles from '../../../CommonStyles/commonStyles';
import { useTranslation } from 'react-i18next';
import { IRootState } from '../../../redux_toolkit/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LegacyRef, useEffect, useLayoutEffect, useRef, useState } from 'react';

interface Props {
    navigation: any,
    route: any
}

const splitPhoneNumber = (phoneNumber: string) : string => { 
  let result = "";
  let i = 0;

  if (phoneNumber.split("")[0] === "0"){
    i = 1
  }

  for ( i ; i < phoneNumber.length; i++) {
    if (i % 3 == 0 && i != 0) {
      result += " ";
    }
    result += phoneNumber[i];
  }
  return result;
}
const REMAIN_SECONDS = 59;

export default function StepThreeRegister({navigation, route} : Props) {
  const {t, i18n} = useTranslation();
  const theme = useSelector((state: IRootState) => state.theme?.theme)

  const pin1Ref = useRef<TextInput | null>(null);
  const pin2Ref = useRef<TextInput | null>(null);
  const pin3Ref = useRef<TextInput | null>(null);
  const pin4Ref = useRef<TextInput | null>(null);
  const pin5Ref = useRef<TextInput | null>(null);
  const pin6Ref = useRef<TextInput | null>(null);

  const [pin1, setPin1] = useState<string>("")
  const [pin2, setPin2] = useState<string>("")
  const [pin3, setPin3] = useState<string>("")
  const [pin4, setPin4] = useState<string>("")
  const [pin5, setPin5] = useState<string>("")
  const [pin6, setPin6] = useState<string>("")
  const [isFullPin, setIsFullPin] = useState<boolean>(false)

  const [remainTime, setRemainTime] = useState<number>(REMAIN_SECONDS);
  const refRemainTime = useRef<number | null>(null)

  useLayoutEffect(()=>{
    if (remainTime == REMAIN_SECONDS){
      refRemainTime.current = setInterval(()=>{
        setRemainTime((prev)=> {
          if (prev === 0){
            clearInterval(refRemainTime.current || 0)
            return 0;
          }
          return prev - 1;
        })
      }, 1000)
    }
  }, [remainTime])

  useEffect(()=>{
    if (pin1 && pin2 && pin3 && pin4 && pin5 && pin6){
      setIsFullPin(true)
    } else {
      setIsFullPin(false)
    }
  }, [pin1, pin2, pin3, pin4, pin5, pin6])


  return (
    <View style={[styles.wrapperAll
      , theme === lightMode ? commonStyles.lightPrimaryBackground : commonStyles.darkPrimaryBackground]}
    >
        <View style={[styles.navigationTabBox]}>
            <TouchableOpacity style={styles.btnReturnInitialPage}
              onPress={()=> navigation.goBack()}
            >
              <FontAwesome name="angle-left" size={28} color={commonStyles.darkPrimaryText.color} />
            </TouchableOpacity>
            <Text style={[styles.currentTabName]}>
                {t("registerVerifyCodeTitle")}
            </Text>
        </View>
        <View style={[styles.mainContentContainer, theme == lightMode ? commonStyles.lightPrimaryBackground : commonStyles.darkPrimaryBackground]}>
          <Text style={[
            styles.descriptionForThisPage,
            theme == lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText,
            theme == lightMode ? commonStyles.lightSecondaryBackground : commonStyles.darkSecondaryBackground
          ]}>
            {t("registerVerifyCodeDesc")}
          </Text>
          <View style={[styles.boxDescStatusSendingMsg]}>
            <View style={[styles.boxIconStatusSendMsg]}>
              <MaterialCommunityIcons name="phone-return" size={30} color={commonStyles.primaryColor.color} />
            </View>
            <Text style={[styles.callingToTitle,
              theme == lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText
            ]}>
              {`${t("registerVerifyCodeCallTo")} (${route.params?.country?.dial_code}) ${splitPhoneNumber(route.params?.phoneNumber)}`}
            </Text>

            <Text style={[styles.callingToTips
              , theme == lightMode ? commonStyles.lightSecondaryText : commonStyles.darkSecondaryText
            ]}>
              {t("registerVerifyCodeTips")}
            </Text>
          </View>
          <View style={styles.boxListInputOTPWrapper}>

            <View style={styles.boxInputOTP}>
              <TextInput
                keyboardType='number-pad'
                maxLength={1}
                ref={pin1Ref}
                style={[styles.inputOneNumberInOTP,
                  theme == lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText]
                }
                onChange={(e)=>{
                  console.log(e)
                  setPin1(e.nativeEvent.text)
                  if (e.nativeEvent.text){
                    pin2Ref.current?.focus()
                  } 
                }}
              />
            </View>

            <View style={styles.boxInputOTP}>
              <TextInput
                keyboardType='number-pad'
                ref={pin2Ref}
                maxLength={1}
                style={[styles.inputOneNumberInOTP,
                  theme == lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText]
                }
                onChange={(e)=>{
                  setPin2(e.nativeEvent.text)
                  if (e.nativeEvent.text){
                    pin3Ref.current?.focus()
                  } else {
                    pin1Ref.current?.focus()
                  }
                }}
              />
            </View>

            <View style={styles.boxInputOTP}>
              <TextInput
                keyboardType='number-pad'
                ref={pin3Ref}
                maxLength={1}
                style={[styles.inputOneNumberInOTP,
                  theme == lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText]
                }
                onChange={(e)=>{
                  setPin3(e.nativeEvent.text)
                  if (e.nativeEvent.text){
                    pin4Ref.current?.focus()
                  } else {
                    pin2Ref.current?.focus()
                  }
                }}
              />
            </View>

            <View style={styles.boxInputOTP}>
              <TextInput
                keyboardType='number-pad'
                ref={pin4Ref}
                maxLength={1}
                style={[styles.inputOneNumberInOTP,
                  theme == lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText]
                }
                onChange={(e)=>{
                  setPin4(e.nativeEvent.text)
                  if (e.nativeEvent.text){
                    pin5Ref.current?.focus()
                  } else {
                    pin3Ref.current?.focus()
                  
                  }
                }}
              />
            </View>

            <View style={styles.boxInputOTP}>
              <TextInput
                keyboardType='number-pad'
                ref={pin5Ref}
                maxLength={1}
                style={[styles.inputOneNumberInOTP,
                  theme == lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText]
                }
                onChange={(e)=>{
                  setPin5(e.nativeEvent.text)
                  if (e.nativeEvent.text){
                    pin6Ref.current?.focus()
                  } else {
                    pin4Ref.current?.focus()
                  }
                }}
              />
            </View>

            <View style={styles.boxInputOTP}>
              <TextInput
                keyboardType='number-pad'
                ref={pin6Ref}
                maxLength={1}
                style={[styles.inputOneNumberInOTP,
                  theme == lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText]
                }
                onChange={(e)=>{
                  if (e.nativeEvent.text){
                    setPin6(e.nativeEvent.text)
                  } else {
                    pin5Ref.current?.focus()
                  }
                  
                }}
              />
            </View>

          </View>

          <View style={styles.resendCodeWrapper}>
            <TouchableOpacity style={[styles.btnResendCodeBox]}
              onPress={()=> {
                if (remainTime === 0){
                  clearInterval(refRemainTime.current || 0)
                  setRemainTime(REMAIN_SECONDS)
                }
              }}
              disabled={remainTime > 0}
            >
              <Text style={[styles.textBtnResendCode, 
                remainTime > 0
                ?
                theme == lightMode ? commonStyles.lightSecondaryText : commonStyles.darkSecondaryText
                :
                commonStyles.primaryColor
              ]}>
                {t("registerVerifyCodeResend")}
              </Text>
            </TouchableOpacity>
            {
              remainTime > 0
              &&
              <Text style={styles.textRemainTimeResend}>00:{`${remainTime < 10 ? "0": ""}${remainTime}`}</Text>
            }
          </View>

          <View style={styles.boxWrapperBtnNext}>
            <TouchableOpacity style={[
              styles.btnNextPage,
              theme == lightMode ? commonStyles.lightPrimaryBackground : commonStyles.darkTertiaryBackground
            ]}
              disabled={!isFullPin}
            >
              <Text style={[
                styles.textBtnNextPage,
                theme == lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText
              ]}>{t("next")}</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  )
}