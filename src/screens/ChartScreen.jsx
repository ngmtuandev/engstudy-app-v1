import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import BottomTab from '../component/BottomTab'
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ChartScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const currentScreenName = route.name;
  const dispatch = useDispatch()
  useEffect(() => {
    (async() => {
      const dt = await AsyncStorage.getItem('USER_LOGIN')
      console.log('dttt : ', dt)
    })()
  }, [])
  return (
    <View>
      <View className='w-screen relative h-screen  bg-red-400'>
            <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" 
            className=' w-screen h-screen'>
                <View className='flex-col flex-1 mt-16'>
                  <View className=' bg-slate-800'>
                    <TouchableOpacity onPress={() => {
                        dispatch(logout())
                        navigation.navigate('Login')
                    }}>
                      <Text>Logout</Text>
                    </TouchableOpacity>
                  </View>
                  <BottomTab currentScreenName = {currentScreenName}></BottomTab>
                </View>
            </ImageBackground>
        
        </View>
      <Text>ChartScreen</Text>
    </View>
  )
}

export default ChartScreen