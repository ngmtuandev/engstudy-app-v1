import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
const _ = require('lodash')
import { useVocabulary } from '../hooks/useVocabulary'
import {useSelector} from 'react-redux'
import randomNumber from '../funcntionSupport/randomNumber'

const OptionVocaScreen = () => {

  const [listVoCaTest, setListVocaTest] = useState([])
  const [answer, setAnswer] = useState()
  const [listOption, setListOption] = useState([])
  const [option, setOption] = useState()
  const {token} = useSelector(state => state.auth)
  const {fetchListVocabularyLearnedTest} = useVocabulary()
  
  const lengthList = useRef(0)
  const listFourOption = useRef([])
  const isCorrectAnsswer = useRef()
  const questionCurrent = useRef(0)
  useEffect(() => {
    (async() => {
      const dataLearned = await fetchListVocabularyLearnedTest(token)
      // console.log('TỪ VỰNG ĐÃ HỌC : >>>>', dataLearned)
      if (dataLearned) {
        lengthList.current = dataLearned?.data?.length
        setListVocaTest(dataLearned?.data)
        setAnswer(dataLearned?.data[questionCurrent.current])
        // console.log('dataLearned?.data[0]', dataLearned?.data[0]?.vie)
        setListOption(listOption => [...listOption, dataLearned?.data[0]?.vie])
      }
    })()
  }, [])

  // console.log('answer current : ', answer?.eng)
  // console.log('length list : ', lengthList.current)
  // console.log('random option : ', randomNumber(3, lengthList.current))
  useEffect(() => {
    
    if (listVoCaTest) {
      // console.log('set anser')
      randomNumber(3, lengthList.current)?.map(item => {
        setListOption(listOption => [...listOption, listVoCaTest[item]?.vie])
        // console.log('answer',answer?.vie)
        // return
        isCorrectAnsswer.current = answer?.vie
      })
    }
    else {
      console.log('data lỗi')
    }
  }, [answer])
  
  listFourOption.current = _.shuffle(listOption?.slice(3,7))
  
  // console.log('list option choose answer : ', _.shuffle(listFourOption?.current))
  // console.log('is correct : ', isCorrectAnsswer.current)
  // console.log('answer >>>>>', answer)

  //   const options = listVoCaTest?.map(item => {
  //     // _.shuffle(listFourOption?.current)?.filter(el => el === item._id)
  //     listFourOption.current.filter(el => el === item?._id)
  //   })

  // console.log(options)

  const handleOption = (item) => {
    // console.log('item option : ', item)
    if (item === isCorrectAnsswer.current)
    {
      // console.log('chính xác')
      console.log(listVoCaTest[4])
      questionCurrent.current = +questionCurrent.current + 1
      console.log(' questionCurrent.current : ',  questionCurrent.current)
      console.log('listVoCaTest[questionCurrent.current]', listVoCaTest[questionCurrent.current]?.vie)
      setAnswer(() => listVoCaTest[questionCurrent.current])
      randomNumber(3, lengthList.current)?.map(item => {
        setListOption(listOption => [...listOption, listVoCaTest[item]?.vie])
      })
      console.log('list option >>>', listOption)
      listFourOption.current = _.shuffle(listOption?.slice(3,7))
      setListOption([...listFourOption.current, listVoCaTest[questionCurrent.current]?.vie])
      console.log('list option new >>>', listOption)

    }
    else {
      return
      // console.log('sai rồi')
    }
  }

  return (
    <View>
      <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" 
      className=' w-screen h-screen '>
        <View className='flex justify-center items-center'>
          <View className='mt-44 flex justify-center items-center'>
            <Text className='font-bold text-[27px] text-colorBrownDarkLV2'>Chọn nghĩa của từ:</Text>
            <Text className='text-[45px] my-6 text-colorBrownBold font-bold'>{answer?.eng}</Text>
          </View>
          <View className='grid grid-cols-2 gap-4 '>
            {
              _.shuffle(listFourOption?.current).map((item, index) => {
                return <View key={index} className='w-[240px] rounded-xl justify-center 
                items-center h-[50px] bg-colorBrownDarkLV2 mx-1'>
                  <TouchableOpacity onPress={() => handleOption(item)}>
                    <Text className='text-colorWhite font-bold text-[17px]'>{item}</Text>
                  </TouchableOpacity>
                </View>
              })
            }
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default OptionVocaScreen