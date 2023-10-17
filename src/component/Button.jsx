import { View, Text, Pressable } from 'react-native'
import React from 'react'

const Button = ({title, onSubmit}) => {
  
  const handlePress = () => {
    onSubmit()
  }

  return (
    <View className='w-[200px] h-[40px] rounded-3xl bg-colorGreenBold mt-4 flex justify-center items-center text-center'>
      <Pressable onPress={handlePress}>
        <Text className='text-colorWhite text-[17px] font-semibold'>{title}</Text>
      </Pressable>
    </View>
  )
}

export default Button