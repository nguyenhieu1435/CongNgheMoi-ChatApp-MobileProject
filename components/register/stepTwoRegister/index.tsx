import { View, Text, TouchableOpacity, TextInput, Linking, Modal, SectionList, Alert} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useSelector} from 'react-redux';
import { styles } from "./styles";
import commonStyles from '../../../CommonStyles/commonStyles';
import { lightMode } from '../../../redux_toolkit/slices/theme.slice';
import { IRootState } from '../../../redux_toolkit/store';
import { useTranslation } from 'react-i18next';
import Checkbox from 'expo-checkbox';
import {LINK_USING_TERM, LINK_SOCIAL_TERM} from "@env"
import { useForm, Controller, set } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ICountryList, countrys, ICountryItem } from '../../../data/countrys';


interface Props {
  navigation: any,
  route: any,
}

interface IFormData2{
  phoneNumber: string
  isCheckTerm?: boolean,
  isCheckSocialTerm?: boolean
}

export default function StepTwoRegister({navigation, route} : Props) {
  const {t} = useTranslation();
  const theme = useSelector((state : IRootState) => state.theme?.theme)
  const [countryData, setCountryData] = useState<ICountryList[]>(countrys);
  const [search, setSearch] = useState("");
  const [currentCountry, setCurrentCountry] = useState<ICountryItem>({
    code: "VN",
    dial_code: "+84",
    name: "Vietnam"
  })
  const [visibleModal, setVisibleModal] = useState<boolean>(false);


  const [schema, setSchema] = useState<yup.ObjectSchema<IFormData2>>((): yup.ObjectSchema<IFormData2> => {
    const formSchema: yup.ObjectSchema<IFormData2> = yup.object().shape({
      phoneNumber: yup.string()
      .required(" ")
      .matches(/^(?!0\d)\d{9}$|^0\d{9}$/, t("registerPhoneValidate")),
      isCheckTerm: yup.boolean().required().oneOf([true]),
      isCheckSocialTerm: yup.boolean().required().oneOf([true])
    })
    return formSchema
  })

  const {control, handleSubmit, formState: { errors, isValid}, watch, setValue} = useForm<IFormData2>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      phoneNumber: "",
      isCheckTerm: false,
      isCheckSocialTerm: false
    }
  });

  useEffect(()=>{
    if (!search.trim()){
      setCountryData(countrys);
    }
  }, [search])

  const handleSubmitForm = (data : IFormData2)=>{
  
    if (isValid){
      Alert.alert(`${t("registerPhoneAlertTitle")} (${currentCountry.dial_code}) ${data.phoneNumber}?`
      , t("registerPhoneAlertMsg"),
        [
          {
            text: t("cancel"),
            onPress: ()=> console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: t("confirm"),
            onPress: ()=> {
              navigation.navigate("StepThreeRegister", {
                phoneNumber: data.phoneNumber,
                zaloName: route.params?.zaloName,
                country: currentCountry
              })
            },
            style: "default"
          }
        ]
      )
      
    }
  }

  const renderItemSectionList = (item : ICountryItem, index : number)=>{
    return (  
      <TouchableOpacity key={index}
        onPress={()=> {
          setCurrentCountry(item);
          setVisibleModal(false);
        }}
      >
        <View style={[styles.itemCountryBox, styles.itemSeperatorCom]}>

          <Text style={[styles.countryName
              , theme === lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText
            ]}>
              {item.name}
          </Text>

          <Text style={[styles.countryDialCode
              , theme === lightMode ? commonStyles.lightSecondaryText : commonStyles.darkSecondaryText
            ]}>
              {item.dial_code}
          </Text>

        </View>
      </TouchableOpacity>
    )
  }

  const handleFilterCountry = ()=>{
    let result : ICountryList[] = [];
    countryData.forEach((item)=>{
      let country : ICountryList = {
        title: item.title,
        data: []
      }
      item.data.forEach((item2)=>{
        if (item2.name.toLowerCase().includes(search.toLowerCase()) && item.title !== ""){
          country.data.push(item2);
        }
      })
      if (country.data.length > 0){
        result.push(country);
      }
    })
    return result;
  }

  return (
    <View style={[styles.wrapperAll
      , theme === lightMode ? commonStyles.lightPrimaryBackground : commonStyles.darkPrimaryBackground]}
    > 
      <View style={[styles.navigationTabBox]}>
          <TouchableOpacity style={styles.btnReturnPreviousPage}
            onPress={()=> navigation.goBack()}
          >
            <FontAwesome name="angle-left" size={28} color={commonStyles.darkPrimaryText.color} />
          </TouchableOpacity>
          <Text style={[styles.currentTabName]}>
              {t("registerCreateAccount")}
          </Text>
      </View>
      <View style={[styles.mainContentContainer, theme == lightMode ? commonStyles.lightPrimaryBackground : commonStyles.darkPrimaryBackground]}>
        
        <Text style={[
          styles.descriptionForThisPage,
          theme == lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText,
          theme == lightMode ? commonStyles.lightSecondaryBackground : commonStyles.darkSecondaryBackground
        ]}>
          {t("reigsterPhoneNumberDesc")}
        </Text>

        <View style={[styles.formPhoneContainer]}>
          <View style={[styles.boxPhoneContainer]}>

            <TouchableOpacity style={styles.boxChooseNational}
              onPress={()=>setVisibleModal(true)}
            >
              <Text style={[styles.currentNationalName
                , theme === lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText
              ]}>
                {currentCountry.code}
              </Text>
              <Octicons name="triangle-down" size={24} 
                color={theme === lightMode ? commonStyles.lightPrimaryText.color : commonStyles.darkPrimaryText.color}
              />
            </TouchableOpacity>
            {/* , isFocus ? styles.boxInputZaloNameActive : null */}
            <View style={[styles.boxInputZaloName]}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value}})=>(
                  <TextInput
                    keyboardType='numeric'
                    placeholder={t("registerPhonePlaceHolder")}
                    placeholderTextColor={theme === lightMode ? commonStyles.lightSecondaryText.color : commonStyles.darkSecondaryText.color}
                    style={[styles.inputZaloName, theme === lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText]}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
                name="phoneNumber"
              />
              {
                watch("phoneNumber").trim()
                &&
                <AntDesign name="close" size={20}     
                  onPress={()=> setValue("phoneNumber", "")}
                  color={theme == lightMode ? commonStyles.lightPrimaryText.color : commonStyles.darkSecondaryText.color}
                  style={styles.btnDeleteTextInputZaloName}
                />
              }
            </View>


          </View>
          {
            errors.phoneNumber && errors.phoneNumber.message?.trim() && 
            <Text style={[styles.textErrMsg]}>
              {errors.phoneNumber.message}
            </Text>
          }


          
          <View style={[styles.listCheckBoxGroup]}>

            <View style={[styles.itemCheckBox]}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value}})=>(
                  <Checkbox
                    style={styles.checkBox}
                    value={value}
                    onValueChange={onChange}
                    color={value ? commonStyles.primaryColor.color : undefined}
                  />  
                )}
                name='isCheckTerm'
              />
              <Text style={
                [
                  styles.textDescCheckBox,
                  theme == lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText
                ]
              }>
                {t("registerPhoneAgreeTitle")}
                {" "}
                <Text style={styles.linkDescCheckBox}
                  onPress={()=> Linking.openURL(LINK_USING_TERM)}
                >
                  {t("registerPhoneTerms")}
                </Text>
              </Text>
            </View>

            <View style={[styles.itemCheckBox]}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value}})=>(
                  <Checkbox
                    style={styles.checkBox}
                    onValueChange={onChange}
                    value={value}
                    color={value ? commonStyles.primaryColor.color : undefined}
                  />  
                )}
                name='isCheckSocialTerm'
              />
             
              <Text style={
                [
                  styles.textDescCheckBox,
                  theme == lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText
                ]
              }>
                {t("registerPhoneAgreeTitle")}
                {" "}
                <Text style={styles.linkDescCheckBox}
                  onPress={()=> Linking.openURL(LINK_SOCIAL_TERM)}
                >
                  {t("registerPhoneSocialTerms")}
                </Text>
              </Text>
            </View>
            
          </View>
          <View style={styles.boxNextToStepTwo}>
              <TouchableOpacity style={[styles.btnNextToStepTwo,
                watch("isCheckSocialTerm") && watch("isCheckTerm") &&
                watch("phoneNumber").trim() ? styles.btnNextToStepTwoActive : null]
              }
                onPress={handleSubmit(handleSubmitForm)}
              >
                <AntDesign name="arrowright" size={24} color={commonStyles.darkPrimaryText.color} />
              </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal presentationStyle="fullScreen"
        animationType='slide'
        visible={visibleModal}
      >
        <View style={[theme == lightMode ? commonStyles.lightPrimaryBackground : commonStyles.darkPrimaryBackground
          , styles.modalContaner
        ]}>
          <View>

            <View
              style={[styles.boxChooseTheCountryCode]}
            >
              <AntDesign name="close" size={22}
                style={[styles.iconCloseModal]}
                color={commonStyles.darkPrimaryText.color}
              />
              <Text style={[styles.chooseTheCountryCode, commonStyles.darkPrimaryText]}>
                {t("registerPhoneChooseCountry")}
              </Text>
            </View>
            <View style={styles.boxInputSearchCountryWrapper}>
              <View style={[styles.boxInputSearchCountry
                , lightMode === theme ? commonStyles.lightSecondaryBackground : commonStyles.darkSecondaryBackground]}
              >
                <EvilIcons name="search" size={24} color={
                  lightMode === theme ? commonStyles.lightIconColor.color : commonStyles.darkIconColor.color
                }
                  style={styles.iconSearchCountry}
                />
                <TextInput
                  style={[styles.inputSearchCountry, 
                    lightMode === theme ? commonStyles.lightTertiaryText : commonStyles.darkTertiaryText
                  ]}
                  placeholder={t("registerPhoneInputSearchPlaceholder")}
                  placeholderTextColor={
                    lightMode === theme ? commonStyles.lightSecondaryText.color : commonStyles.darkSecondaryText.color
                  }
                  value={search}
                  onChangeText={(text)=> setSearch(text)}
                />
              </View>
            </View>

          </View>
          <View style={[styles.boxWrapScrollView]}>
            <SectionList
              sections={
                search.trim()
                ?
                handleFilterCountry()
                :
                countryData
              }
              keyExtractor={(item , index) => item.dial_code + index}
              renderItem={({item, index})=> renderItemSectionList(item, index)}
              renderSectionHeader={({section: {title}})=>(
                search.trim()
                ?
                <></>
                :
                <Text style={[styles.titleSectionList
                  , theme === lightMode ? commonStyles.lightPrimaryText : commonStyles.darkPrimaryText
                ]}>
                    {title}
                </Text>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}