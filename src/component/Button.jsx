import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({title, onSubmit, stateRegister}) => {
  
  const handlePress = () => {
    onSubmit()
  }

  return (
    <View className={`${stateRegister ? 'w-[92%]' : 'w-[100%]'} px-form h-[40px] my-5 rounded-lg bg-colorBrownBold mt-4 flex justify-center items-center text-center`}>
      <TouchableOpacity onPress={handlePress}>
        <Text className='text-colorBrownSlightLV2 text-[16px] font-semibold'>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Button