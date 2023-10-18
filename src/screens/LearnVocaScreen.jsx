import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import BottomTab from '../component/BottomTab'
import { useRoute } from '@react-navigation/native';

const LearnVocaScreen = () => {
  const route = useRoute()
  const currentScreenName = route.name;
  return (
    <View>
      <View className='w-screen relative h-screen  bg-red-400'>
            <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" 
            className=' w-screen h-screen'>
                <View className='flex-col flex-1'>
                  <View className=' bg-slate-800'>

                  </View>
                  <BottomTab currentScreenName={currentScreenName}></BottomTab>
                </View>
            </ImageBackground>
        
        </View>
      <Text>LearnVocaScreen</Text>
    </View>
  )
}

export default LearnVocaScreen