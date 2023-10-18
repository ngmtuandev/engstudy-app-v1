import { View, Text, ImageBackground, SafeAreaView, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import FormInput from '../component/FormInput'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
const LoginScreen = () => { 
    const navigation = useNavigation()
    const [showLogo, setShowLogo] = useState(false)
    const {token} = useSelector(state => state.auth)
    
    

    useEffect(() => {
        if (token) {
            navigation.navigate('AddVoca')
        }
    }, [token])

    
  return (
    <SafeAreaView className='flex-1'>
        <View className='w-screen h-screen bg-red-400'>
            <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" className='w-screen h-screen'>
                <View className='flex-col items-center mt-5'>
                    {
                        !showLogo && 
                        <View className='w-72 ml-24 h-16 mt-[80px]'>
                            <Image className='object-contain w-[70%] h-[70%]' 
                            source={require('../assets/logo.png')}></Image>
                        </View>
                    }
                    {/* <Pressable onPress={() => navigation.navigate('AddVoca')}>
                        <Text>Next</Text>
                    </Pressable> */}
                    <View>
                        <FormInput setShowLogo = {setShowLogo} isRegister={false}></FormInput>
                    </View>
                    <View className='flex-row'>
                        <Text className='mr-1 text-gray-600 text-[12px]'>Bạn chưa có tài khoản ?</Text>
                        <TouchableOpacity 
                            onPress={() => {navigation.navigate('Register')}}>
                            <View>
                                <Text className='font-bold text-gray-800 text-[12px]'>Đăng Ký</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
        
    </SafeAreaView>
  )
}

export default LoginScreen