import { View, Text, TouchableOpacity, TextInput, Linking, StatusBar } from 'react-native'
import { useForm, Controller } from "react-hook-form";
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { AntDesign } from '@expo/vector-icons';
import {styles} from "./styles";
import {  useSelector } from 'react-redux';
import commonStyles from '../../../CommonStyles/commonStyles';
import { IRootState } from '../../../redux_toolkit/store';
import { lightMode } from '../../../redux_toolkit/slices/theme.slice';
import { useState } from 'react';
import {LINK_NAMED_POLICY} from "@env";

import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";


interface Props {
  navigation: any
}

interface IFormData {
  username: string
}



export default function StepOneRegister({navigation} : Props) {
  const {t, i18n} = useTranslation();
  const theme = useSelector((state: IRootState) => state.theme?.theme)
  const [isFocus, setIsFocus] = useState(false)


  const [schema, setSchema] = useState(()=>{
    return (
      yup.object().shape({
        username: yup.string()
        .required(" ")
        .min(2, t("registerZaloNameValidateMinLength"))
        .max(40, t("registerZaloNameValidateMaxLength"))
        // matches if string contains special character except space and vietnamese character
        .matches(/^[^!@#$%^&*(),.?":{}|<>]*$/, t("registerZaloNameValidateSpecialCharacter"))
        .matches(/^[^0-9]*$/, t("registerZaloNameValidateNumberCharacter"))
        
      })
    )
  }) 

  const {control, handleSubmit, formState: { errors, isValid}, watch, setValue} = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      username: ""
    }
  });

  const onSubmitForm = (data : IFormData) => {
    if (isValid){
      navigation.navigate("StepTwoRegister", {
        username: data.username.trim()
      })
    }
  }
 
  return (
  <View style={[styles.wrapperAll
    , theme === lightMode ? commonStyles.lightPrimaryBackground : commonStyles.darkPrimaryBackground]}
  >
      <StatusBar/>
      <View style={[styles.navigationTabBox]}>
          <TouchableOpacity style={styles.btnReturnInitialPage}
            onPress={()=> navigation.goBack()}
          >
            <FontAwesome name="angle-left" size={28} color={commonStyles.darkPrimaryText.color} />
          </TouchableOpacity>
          <Text style={[styles.currentTabName]}>
              {t("registerCreateAccount")}
          </Text>
      </View>

      <View style={[styles.mainContentContainer]}>
        <Text
          style={[styles.zaloNameTitle, theme === lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText]}
        >
          {t("registerZaloNameTitle")}
        </Text>
        <View style={[styles.boxInputZaloName, isFocus ? styles.boxInputZaloNameActive : null]}>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value}})=>(
              <TextInput
                placeholder={t("registerZaloNamePlaceholder")}
                placeholderTextColor={theme === lightMode ? commonStyles.lightSecondaryText.color : commonStyles.darkSecondaryText.color}
                style={[styles.inputZaloName, theme === lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText]}
                value={value}
                onChangeText={onChange}
                onFocus={()=> setIsFocus(true)}
                onBlur={()=> setIsFocus(false)}
              />
            )}
            name='username'
          />

          {
            watch("username")
            &&
            <AntDesign name="close" size={20} 
              onPress={()=> setValue("username", "")}
              color={theme == lightMode ? commonStyles.lightPrimaryText.color : commonStyles.darkSecondaryText.color}
              style={styles.btnDeleteTextInputZaloName}
            />
          }

        </View>
        {
          errors.username && errors.username.message?.trim() && 
          <Text style={[styles.textErrMsg]}>
            {errors.username.message}
          </Text>
        }
        
        <Text style={[styles.nameTipsTitle, lightMode == theme ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText]}>
          {t("registerNoticeWhenChooseZaloName")}
        </Text>

        <View style={[styles.itemTipsWrapper]}>
          <Entypo name="dot-single" size={24} 
            color={lightMode == theme ? commonStyles.lightPrimaryText.color : commonStyles.darkPrimaryText.color}
          />
          <Text 
            style={[styles.tipContent, lightMode == theme ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText]}
          >
            {t("registerNotViolate")} {""}
            <Text
              onPress={()=>  Linking.openURL(LINK_NAMED_POLICY)}
              style={[styles.tipContentChild, commonStyles.primaryColor]}
            >{t("registerPolicyChooseZaloNameTitle")}</Text>
          </Text>
        </View>

        <View style={[styles.itemTipsWrapper]}>
          <Entypo name="dot-single" size={24} 
            color={lightMode == theme ? commonStyles.lightPrimaryText.color : commonStyles.darkPrimaryText.color}
          />
          <Text 
            style={[styles.tipContent, lightMode == theme ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText]}
          >
            {t("registerShouldUseRealName")} {""}
          </Text>
          
        </View>

        <View style={styles.boxNextToStepTwo}>
          <TouchableOpacity style={[styles.btnNextToStepTwo, watch("username").trim() ? styles.btnNextToStepTwoActive : null]}
            onPress={handleSubmit(onSubmitForm)}
            disabled={!watch("username").trim()}
          >
            <AntDesign name="arrowright" size={24} color={commonStyles.darkPrimaryText.color} />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}