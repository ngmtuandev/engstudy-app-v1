import { View, Text } from 'react-native'
import React from 'react'

const ErrorValidate = ({err}) => {
  return (
    <View className='px-form mt-2 -mb-1'>
      <Text className='text-red-600 ml-2 font-semibold text-[14px]'>{err}</Text>
    </View>
  )
}

export default ErrorValidate