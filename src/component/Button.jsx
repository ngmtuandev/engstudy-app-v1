import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';


const Button = ({title, onSubmit, stateRegister, isLoading}) => {
  
  const handlePress = () => {
    onSubmit()
  }

  return (
    <View className={`${stateRegister ? 'w-[92%]' : 'w-[100%]'} px-form h-[40px] my-5 rounded-lg bg-colorBrownBold mt-4 flex justify-center items-center text-center`}>
      <TouchableOpacity onPress={handlePress}>
        <Text className='text-colorBrownSlightLV2 text-[16px] font-semibold'>{!isLoading ? title : 
        <LottieView 
        source={require('../assets/loading/loading_1.json')} 
        style={{
          width: 20,
          height: 20,
        }}
        autoPlay loop />}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Button