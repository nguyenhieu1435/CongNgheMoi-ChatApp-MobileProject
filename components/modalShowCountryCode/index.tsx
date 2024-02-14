import { View, Text, Modal, SectionList, TextInput, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../../redux_toolkit/store'
import { useTranslation } from 'react-i18next'
import { lightMode } from '../../redux_toolkit/slices/theme.slice'
import commonStyles from '../../CommonStyles/commonStyles'
import { styles } from './styles'
import { ICountryList, countrys, ICountryItem } from '../../data/countrys';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

interface ModalShowCountryCodeProps {
    visibleModal: boolean,
    setVisibleModal: (value: boolean) => void
    currentCountry?: ICountryItem,
    setCurrentCountry: (value: ICountryItem) => void
}

export default function ModalShowCountryCode({visibleModal, setVisibleModal, currentCountry, setCurrentCountry} : ModalShowCountryCodeProps) {
    const theme = useSelector((state : IRootState) => state.theme.theme)
    const {t} = useTranslation();
    const [countryData, setCountryData] = useState<ICountryList[]>(countrys);
    const [search, setSearch] = useState("");

    useEffect(()=>{
        if (!search.trim()){
          setCountryData(countrys);
        }
      }, [search])

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

    return (
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
              <TouchableOpacity
                onPress={()=> setVisibleModal(false)}
              >
                <AntDesign name="close" size={22} 
                  style={[styles.iconCloseModal]}
                  color={commonStyles.darkPrimaryText.color}
                />
              </TouchableOpacity>
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
    )
}