import { View, Text, TextInput, TouchableOpacity, Pressable, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Button from './Button'
import { useAuth } from '../hooks/useAuth'
import axios from 'axios'
import actionAsyncLogin from '../store/actionAsyncLogin'
import {useDispatch} from 'react-redux'
import { rememberAuth } from '../store/authSlice'

const FormInput = ({isRegister, toLogin, setShowLogo}) => {
    const dispatch = useDispatch()
    const {fetchRegister, fetchLogin} = useAuth()
    const [dataForm, setDataForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '', 
        confirmpassword: '',
        remember: false
    })
    const [stateRegister, setStateRegister] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [avoidKeyboard, setAvoidKeyBoard] = useState(false)
    const handleSubmitRegister = async () => {
      try {
        console.log('data >>>', dataForm)
        const response = await fetchRegister(dataForm)
        console.log('response >>>', response)
        if (+response['status'] === 0) {
          setStateRegister(true)
        }
      } catch (error) {
        console.log('Error:', error);
      }
      }
    
    const handleSubmitLogin = async () => {
      try {
        if (isChecked === false) {
          const data = {...dataForm, remember: false}
          dispatch(actionAsyncLogin(data))
        }
        else {
            const data = {...dataForm, remember: true}
            dispatch(actionAsyncLogin(data))
        }
        
        
      } catch (error) {
        console.log('Error:', error);
      }
    }

    const handleCheckBox = () => {
      setIsChecked(!isChecked)
      console.log('is checked >>>', isChecked)
    }

  return (
    <View className=''>
    
      <View className={`flex gap-4 ${avoidKeyboard ? '-mt-[60px]' : 'mt-[2px]'}`}>
        <TextInput 
        onChangeText={(text) => {
            setDataForm({...dataForm, email : text})
        }}
        className='w-[300px] h-[40px] rounded-lg border border-x-colorBorder px-[14px] text-colorBrownBold' 
        placeholder='Email của bạn' value={dataForm?.email}></TextInput>
        <TextInput 
          onChangeText={(text) => {
              setDataForm({...dataForm, firstName : text})
          }}
          className='w-[300px] h-[40px] rounded-lg border border-x-colorBorder px-[14px] text-colorBrownBold' 
          placeholder='Họ của bạn' value={dataForm?.firstName}></TextInput>
        <TextInput 
          onChangeText={(text) => {
            // console.log('text >>>', text)
              setDataForm({...dataForm, lastName : text})
          }}
          className='w-[300px] h-[40px] rounded-lg border border-x-colorBorder px-[14px] text-colorBrownBold' 
          placeholder='Tên của bạn' value={dataForm?.lastName}></TextInput>
        
        <TextInput 
        onChangeText={(text) => {
            setDataForm({...dataForm, password : text})
        }}
        onFocus={() => {
          setAvoidKeyBoard(true)
          setShowLogo(true)
        }}
        onBlur={() => {
          setAvoidKeyBoard(false)
          setShowLogo(false)
        }}
        className='w-[300px] h-[40px] rounded-lg border border-x-colorBorder px-[14px] text-colorBrownBold' 
        placeholder='Mật khẩu' value={dataForm?.password}></TextInput>
        <TextInput 
        onChangeText={(text) => {
            setDataForm({...dataForm, confirmpassword : text})
        }}
        onFocus={() => {
          setAvoidKeyBoard(true)
          setShowLogo(true)
        }}
        onBlur={() => {
          setAvoidKeyBoard(false)
          setShowLogo(false)
        }}
        className='w-[300px] h-[40px] rounded-lg border border-x-colorBorder px-[14px] text-colorBrownBold' 
        placeholder='Xác nhận mật khẩu' value={dataForm?.confirmpassword}></TextInput>
      </View> 

          {
            stateRegister ? <View className='flex-row flex-wrap w-[93%] justify-center mt-8'>
            <Text className='-mt-3 text-[14px] text-colorBrownDarkLV2 font-semibold'>
              Tin nhắn đã được gửi đến email của bạn. Vui lòng xác nhận và quay lại <Text className='font-bold text-colorBrownBold'>Đăng Nhập</Text>
            </Text>
            
            </View> : ''
          }
          {
            !isRegister && <View className='flex-row mt-4'>
              <View className='flex-row items-center j '>
                <Pressable onPress={handleCheckBox}>
                  <View className='w-[20px] h-[20px] border-[1.5px] rounded-md border-colorBorder'></View>
                  {
                    isChecked && <Image className='-mt-[18px] ml-[1px]' source={require('../assets/check.png')}></Image>
                  }
                </Pressable>
                <Text className='ml-1 text-colorBrownDarkLV2'>Ghi nhớ đăng nhập</Text>
              </View>
              <View className='mt-1'>
                <TouchableOpacity>
                  <Text className=' text-colorBrownDarkLV2 font-bold ml-12'>Quên mật khẩu ?</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          <Button 
          stateRegister={stateRegister}
          title= {isRegister ? 'Đăng ký' : 'Đăng nhập'} 
          onSubmit = {isRegister ? handleSubmitRegister : handleSubmitLogin}></Button>
    </View>
  )
}

export default FormInput