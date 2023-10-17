import { View, Text, ImageBackground, SafeAreaView, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import FormInput from '../component/FormInput'

const RegisterScreen = ({navigation}) => {
    console.log('navigation >>>>', navigation)
  return (
    <View className='flex-1'>
        <View className='w-screen h-screen bg-red-400'>
            <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" className='w-screen h-screen'>
                <View className='flex-col items-center mt-5'>
                    <View className=''>
                        <Image source={require('../assets/logo.png')}></Image>
                    </View>
                    {/* <View className='mr-8 mt-4'>
                        <Image 
                        source={require('../assets/imgRegister.png')}></Image>
                    </View> */}
                    <View className='flex-col justify-center items-center'>
                        <Text className='font-bold text-white text-[32px]'>EngStudy</Text>
                        <Text className='font-bold text-[32px] text-colorGreenSlight'>xin chào</Text>
                    </View>
                    <View>
                        <FormInput isRegister={true} toLogin = {navigation}></FormInput>
                    </View>
                    
                </View>
            </ImageBackground>
        </View>
        
    </View>
  )
}

export default RegisterScreen