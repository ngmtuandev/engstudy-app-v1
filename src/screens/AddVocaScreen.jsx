import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'
// import RNRestart from 'react-native-restart'
const AddVocaScreen = () => {
    const {dataUser, token} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    console.log('data user had login', dataUser, token)
  return (
    <View>
      <View className='w-screen h-screen bg-red-400'>
            <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" className='w-screen h-screen'>
                <View className='flex-col items-center mt-5'>
                
               
                <View className='w-72 ml-24 h-16 mt-[80px]'>
                        <Image className='object-contain w-[70%] h-[70%]' source={require('../assets/logo.png')}></Image>
                    </View>
                    <TouchableOpacity onPress={() => {
                        dispatch(logout())
                    }}>
                      <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        
        </View>
      <Text>AddVocaScreen</Text>
    </View>
  )
}

export default AddVocaScreen