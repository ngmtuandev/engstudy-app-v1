import { View, Text, TextInput, TouchableOpacity, Pressable, Image, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Button from './Button'
import { useAuth } from '../hooks/useAuth'
import axios from 'axios'
import actionAsyncLogin from '../store/actionAsyncLogin'
import {useDispatch, useSelector} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { validateEmail } from '../funcntionSupport/validateEmail'
import ErrorValidate from './ErrorValidate'
import SvgIcon from '../assets/useSVG'
const FormInput = ({isRegister, toLogin, setShowLogo}) => {
    const dispatch = useDispatch()
    const {fetchRegister, fetchLogin} = useAuth()
    const {isRememberAuth, dataUser} = useSelector(state => state.auth)
    const {CheckSVG} = SvgIcon
    const [dataForm, setDataForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '', 
        confirmpassword: '',
        remember: false
    })
    const [errForm, setErrForm] = useState({
        email: true,
        password: true,
        firstName: true,
        lastName: true, 
        confirmpassword: true,
    })
    const [stateRegister, setStateRegister] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [avoidKeyboard, setAvoidKeyBoard] = useState(false)
    const [isHandleLogin, setIsHandleLogin] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmitRegister = async () => {
      try {
        // console.log('data >>>', dataForm)
        setIsLoading(true)
        const response = await fetchRegister(dataForm)
        setIsLoading(false)
        // console.log('response >>>', response)
        if (+response['status'] === 0) {
          setStateRegister(true)
        }
      } catch (error) {
        console.log('Error:', error);
      }
      }
    
    const handleSubmitLogin = async () => {
      setIsHandleLogin(!isHandleLogin)
      try {
        // dispatch(rememberAuth())
        // if (!errForm.confirmpassword || !errForm.email || !errForm.password) {
        //   Alert.alert(
        //     'EngStudy thông báo !',
        //     'Thông tin bạn nhập không chính xác',
        //     [
        //       {
        //         text: isRegister ? 'Tạo lại' : 'Đăng nhập lại',
        //         style: 'cancel',
        //       },
        //     ],
        //     {
        //       cancelable: true,
        //       onDismiss: () =>
        //         Alert.alert(
        //           'This alert was dismissed by tapping outside of the alert dialog.',
        //         ),
        //     },
        //   );
        // }
        // else {
          if (isChecked === false) {
            setIsLoading(false)
            const data = {...dataForm, remember: false, password: dataForm?.password}
            dispatch(actionAsyncLogin(data))
            setIsLoading(true)
          }
          else {
              setIsLoading(false)
              const data = {...dataForm, remember: true, password: dataForm?.password}
              dispatch(actionAsyncLogin(data))
              setIsLoading(true)
          }
        // }
        
        
      } catch (error) {
        console.log('Error:', error);
      }
    }

    const handleCheckBox = () => {
      setIsChecked(!isChecked)
    }
    
    const data_user_login = dataUser?.data
    // console.log('data_user_login >>>', data_user_login)
      useEffect(() => {
        (async() => {
            if (isRememberAuth === true) {
              // console.log('ghi nhớ')
              setDataForm({
                email: data_user_login?.email,
                password: dataUser?.password,
                firstName: data_user_login?.firstName,
                lastName: data_user_login?.lastName, 
                confirmpassword: dataUser?.password,
                remember: true
            })
            }
            else if (isRememberAuth === false) {
              // console.log('không ghi nhớ')
              setDataForm({
                email: '',
                password: '',
                firstName: '',
                lastName: '', 
                confirmpassword: '',
                remember: false
            })
            }
            
          })()
      }, [isRememberAuth, isHandleLogin])

      const handleCheckEmail = (email) => {
        const checkemail = validateEmail(email)
          if (checkemail === null) {
            setErrForm({...errForm, email: false})
            // setTimeout(() => {
            //   setErrForm({...errForm, email: true})
            // }, 3000)
          }
      }

      const handleCheckConfirmPassword = (pass, confirmpass) => {
          if (pass.toString() !== confirmpass.toString()) {
            setErrForm({...errForm, confirmpassword: false})
            // setTimeout(() => {
            //   setErrForm({...errForm, email: true})
            // }, 3000)
          }
      }

      const handleValidatePassword = (password) => {
        if (password.length < 8) {
          setErrForm({...errForm, password: false})
          // setTimeout(() => {
          //   setErrForm({...errForm, password: true})
          // }, 3000)
        }
      }

  return (
    <View className=''>
    
      <View className={`flex gap-4 ${avoidKeyboard ? '-mt-[60px]' : 'mt-[2px]'}`}>
        <TextInput 
        onChangeText={(text) => {
            setDataForm({...dataForm, email : text})
        }}
        onFocus={() => {
          setErrForm({...errForm, email: true})
        }}
        onBlur={() => {
          handleCheckEmail(dataForm.email)
        }}
        className='w-[300px] h-[40px] rounded-lg border border-x-colorBorder px-[14px] text-colorBrownBold' 
        placeholder='Email của bạn' value={dataForm?.email}></TextInput>
        {
          !errForm.email && <ErrorValidate err={'Trường này phải là email'}></ErrorValidate>
        }
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
          setErrForm({...errForm, confirmpassword: true})
        }}
        onBlur={() => {
          setAvoidKeyBoard(false)
          setShowLogo(false)
          handleValidatePassword(dataForm.password)
        }}
        className='w-[300px] h-[40px] rounded-lg border border-x-colorBorder px-[14px] text-colorBrownBold' 
        placeholder='Mật khẩu' value={dataForm?.password}></TextInput>
        {
          !errForm.confirmpassword && <ErrorValidate err={'Mật khẩu phải dài hơn 8 kí tự'}></ErrorValidate>
        }
        <TextInput 
        onChangeText={(text) => {
            setDataForm({...dataForm, confirmpassword : text})
        }}
        onFocus={() => {
          setAvoidKeyBoard(true)
          setShowLogo(true)
          setErrForm({...errForm, confirmpassword: true})
        }}
        onBlur={() => {
          setAvoidKeyBoard(false)
          setShowLogo(false)
          handleCheckConfirmPassword(dataForm.password, dataForm.confirmpassword)
        }}
        className='w-[300px] h-[40px] rounded-lg border border-x-colorBorder px-[14px] text-colorBrownBold' 
        placeholder='Xác nhận mật khẩu' value={dataForm?.confirmpassword}></TextInput>
        {
          !errForm.confirmpassword && <ErrorValidate err={'Mật khẩu xác nhận không đúng'}></ErrorValidate>
        }
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
                    isChecked && <CheckSVG className='absolute' width="20" height="20"></CheckSVG>
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
          isLoading={isLoading}
          stateRegister={stateRegister}
          title= {isRegister ? 'Đăng ký' : 'Đăng nhập'} 
          onSubmit = {isRegister ? handleSubmitRegister : handleSubmitLogin}></Button>
    </View>
  )
}

export default FormInput