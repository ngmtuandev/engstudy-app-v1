import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const NavigateTabTop = ({text, navigate}) => {
  console.log('navigate >>>', navigate)
  const navigation = useNavigation()
  const handleNavigateScreen = () => {
    console.log('navigate >>>', navigate)
    navigation.navigate(navigate)
  }
  return (
    <TouchableOpacity 
    onPress={handleNavigateScreen}
    className='bg-colorBrownSlightLV3 justify-center items-center rounded-lg
    shadow-xl w-[140px] h-[35px]'>
        <Text className='text-colorWhite font-bold text-[16px]'>
            {text}
        </Text>
    </TouchableOpacity>
  )
}

export default NavigateTabTop