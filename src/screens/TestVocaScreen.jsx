import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import BottomTab from '../component/BottomTab'
import { useRoute } from '@react-navigation/native'
import { SCREEN_NAME } from '../constants/screens'

const TestVocaScreen = ({navigation}) => {
  const route = useRoute()
  const currentScreenName = route.name;
  return (
    <View>
      <View className='w-screen relative h-screen  bg-red-400'>
            <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" 
            className=' w-screen h-screen'>
                <View className='flex-col flex-1 items-center justify-center'>
                  <View className='flex-col justify-center items-center'>
                    <Text className='text-[28px] shadow-xl font-bold text-colorBrownDarkLV2'>Chọn hình thức kiểm tra</Text>
                    <Text className='text-[14px] mt-2 text-colorBrownBold font-bold'>{`(Chọn hình thức phù hợp để cải thiện nhanh hơn)`}</Text>
                  </View>
                  <View className='flex-row item justify-between mt-10'>
                    <TouchableOpacity 
                    onPress={() => {navigation.navigate(SCREEN_NAME.OPTION_VOCA)}}
                    className='w-[110px] flex justify-center mx-2 shadow-xl items-center h-[30px] rounded-3xl bg-colorBrownDarkLV2'>
                      <Text className='text-colorWhite font-bold text-[16px]'>Chọn nghĩa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => {navigation.navigate(SCREEN_NAME.CONNECT_VOCA)}}
                    className='w-[110px] flex justify-center mx-2 shadow-xl items-center h-[30px] rounded-3xl bg-colorBrownDarkLV2'>
                      <Text className='text-colorWhite font-bold text-[16px]'>Nối từ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='w-[110px] flex justify-center mx-2 shadow-xl items-center h-[30px] rounded-3xl bg-colorBrownDarkLV2'>
                      <Text className='text-colorWhite font-bold text-[16px]'>Chơi Game</Text>
                    </TouchableOpacity>
                  </View>
                  <BottomTab currentScreenName={currentScreenName}></BottomTab>
                </View>
            </ImageBackground>
        
        </View>
      <Text>TestVocaScreen</Text>
    </View>
  )
}

export default TestVocaScreen