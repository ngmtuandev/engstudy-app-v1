import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomTab from '../component/BottomTab'
import { useRoute } from '@react-navigation/native';
import { useVocabulary } from '../hooks/useVocabulary';
import { useSelector } from 'react-redux';
import NavigateTabTop from '../component/NavigateTabTop';
import { SCREEN_NAME } from '../constants/screens';
const LearnVocaScreen = () => {
  const route = useRoute()
  const currentScreenName = route.name;
  const [listVoca, setListVoca] = useState([])
    const {fetchListVocabulary} = useVocabulary()
  const {token} = useSelector(state => state.auth)
  useEffect(() => {
    (async() => {
            const listVocabulary = await fetchListVocabulary(token)
      if (listVocabulary) {
        setListVoca(listVocabulary?.data)
      }
    })()
  }, [])

  console.log(listVoca[0])

  return (
    <View>
      <View className='w-screen relative  bg-red-400'>
            <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" 
            className=' w-screen h-screen'>
                <View className='flex-row justify-between px-form mt-10'>
                  <NavigateTabTop text={'Kiểm tra từ vựng'}></NavigateTabTop>
                  <NavigateTabTop navigate = {SCREEN_NAME.ITEM_VOCA} text={'Học từ mới'}></NavigateTabTop>
                </View>
                <View className='flex-col flex-1 justify-center items-center mt-[60px]'>
                 <ScrollView showsVerticalScrollIndicator={false}>
                    {
                      listVoca?.map(el => {
                        return <View className='mb-6' key={el?._id}>
                          <View className='w-[250px] rounded-lg flex justify-center items-center my-[2px] h-[35px] bg-colorBrownDarkLV2'>
                            <Text className='text-colorWhite font-bold text-[17px]'>{el?.eng}</Text>
                          </View>
                          <View className='w-[250px] h-[35px] rounded-lg flex justify-center items-center my-[2px] bg-colorBrownSlightLV3'>
                            <Text className='text-colorWhite font-bold text-[17px]'>{el?.vie}</Text>
                          </View>
                        </View>
                      })
                    }
                  </ScrollView>
                  
                  <BottomTab currentScreenName={currentScreenName}></BottomTab>
                </View>
            </ImageBackground>
        
        </View>
      <Text>LearnVocaScreen</Text>
    </View>
  )
}

export default LearnVocaScreen