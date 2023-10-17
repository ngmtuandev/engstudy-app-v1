import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Button from './Button'
import { useAuth } from '../hooks/useAuth'
import axios from 'axios'


const FormInput = ({isRegister, toLogin}) => {
    const {fetchRegister, fetchLogin} = useAuth()
    const [dataForm, setDataForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '', 
        confirmpassword: ''
    })
    const [stateRegister, setStateRegister] = useState(false)

    const handleSubmitRegister = async () => {
      try {
        console.log('data >>>', dataForm)
        const response = await fetchRegister(dataForm)
        console.log('response >>>', response)
        console.log(response['status'])
        if (+response['status'] === 0) {
          setStateRegister(true)
        }
      } catch (error) {
        console.log('Error:', error);
      }
      }
    
    const handleSubmitLogin = async () => {
      try {
        const response = await fetchLogin(dataForm)
        console.log('Response Login: >>>>', JSON.parse(response));
        console.log(JSON.parse(response).status)
      } catch (error) {
        console.log('Error:', error);
      }
    }

  return (
    <View className='flex items-center'>
    
      <View className='flex gap-4 mt-[2px]'>
        <TextInput 
        onChangeText={(text) => {
            setDataForm({...dataForm, email : text})
        }}
        className='w-[300px] h-[40px] rounded-3xl border border-colorWhite px-form text-colorWhite' 
        placeholder='Email của bạn' value={dataForm?.email}></TextInput>
        <TextInput 
          onChangeText={(text) => {
              setDataForm({...dataForm, firstName : text})
          }}
          className='w-[300px] h-[40px] rounded-3xl border border-colorWhite px-form text-colorWhite' 
          placeholder='Họ của bạn' value={dataForm?.firstName}></TextInput>
        <TextInput 
          onChangeText={(text) => {
            // console.log('text >>>', text)
              setDataForm({...dataForm, lastName : text})
          }}
          className='w-[300px] h-[40px] rounded-3xl border border-colorWhite px-form text-colorWhite' 
          placeholder='Tên của bạn' value={dataForm?.lastName}></TextInput>
        
        <TextInput 
        onChangeText={(text) => {
            setDataForm({...dataForm, password : text})
        }}
        className='w-[300px] h-[40px] rounded-3xl border border-colorWhite px-form text-colorWhite' 
        placeholder='Mật khẩu' value={dataForm?.password}></TextInput>
        <TextInput 
        onChangeText={(text) => {
            setDataForm({...dataForm, confirmpassword : text})
        }}
        className='w-[300px] h-[40px] rounded-3xl border border-colorWhite px-form text-colorWhite' 
        placeholder='Xác nhận mật khẩu' value={dataForm?.confirmpassword}></TextInput>
      </View> 
      {
        stateRegister ? <View className='flex-row flex-wrap justify-center mt-5'>
            <Text className='-mt-3'>Tin nhắn đã được gửi đến email của bạn. Vui lòng xác nhận và quay lại
            <TouchableOpacity 
            onPress={() => {toLogin.navigate('Login')}}>
              <View>
                <Text className='font-bold text-colorGreenBold'>Đăng Nhập</Text>
              </View>
            </TouchableOpacity>
            </Text>
            
        </View> : ''
      }
      <Button title= {isRegister ? 'Đăng kí' : 'Đăng nhập'} onSubmit = {isRegister ? handleSubmitRegister : handleSubmitLogin}></Button>
    </View>
  )
}

export default FormInput