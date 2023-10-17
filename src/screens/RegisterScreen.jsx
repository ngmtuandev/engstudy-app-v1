import { View, Text, ImageBackground, SafeAreaView, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import FormInput from '../component/FormInput'

const RegisterScreen = ({navigation}) => {
    console.log('navigation >>>>', navigation)
  return (
    <View className='flex-1'>
        <View className='w-screen h-screen bg-red-400'>
            <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" className='w-screen h-screen'>
                <View className='flex-col mt-5 justify-center items-center'>
                    <View className='w-72 ml-24 h-16 mt-[80px]'>
                        <Image className='object-contain w-[70%] h-[70%]' source={require('../assets/logo.png')}></Image>
                    </View>
                    {/* <View className='flex-col justify-center items-center'>
                        <Text className='font-bold text-white text-[32px]'>EngStudy</Text>
                        <Text className='font-bold text-[32px] text-colorGreenSlight'>xin chào</Text>
                    </View> */}
                    <View>
                        <FormInput isRegister={true} toLogin = {navigation}></FormInput>
                    </View>
                    <View className='flex-row'>
                        <Text className='mr-1 text-gray-600 text-[12px]'>Bạn đã có tài khoản ?</Text>
                        <TouchableOpacity 
                            onPress={() => {navigation.navigate('Login')}}>
                            <View>
                                <Text className='font-bold text-gray-800 text-[12px]'>Đăng Nhập</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
        
    </View>
  )
}

export default RegisterScreen