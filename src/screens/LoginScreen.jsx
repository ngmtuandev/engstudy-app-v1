import { View, Text, ImageBackground, SafeAreaView, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import FormInput from '../component/FormInput'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
const LoginScreen = () => { 
    const navigation = useNavigation()
    const [showLogo, setShowLogo] = useState(false)
    const {token} = useSelector(state => state.auth)
    // console.log('check token login >>>', token)
    // console.log('loading', isLoading)
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
                    
                </View>
            </ImageBackground>
        </View>
        
    </SafeAreaView>
  )
}

export default LoginScreen