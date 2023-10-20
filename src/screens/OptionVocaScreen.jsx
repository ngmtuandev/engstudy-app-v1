import { View, Text, ImageBackground } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
const _ = require('lodash')
import { useVocabulary } from '../hooks/useVocabulary'
import {useSelector} from 'react-redux'
import randomNumber from '../funcntionSupport/randomNumber'

const OptionVocaScreen = () => {

  const [listVoCaTest, setListVocaTest] = useState([])
  const [answer, setAnswer] = useState()
  const [listOption, setListOption] = useState([])
  const [option, setoption] = useState()
  const {token} = useSelector(state => state.auth)
  const {fetchListVocabularyLearnedTest} = useVocabulary()
  
  const lengthList = useRef(0)
  const listFourOption = useRef([])
  const isCorrectAnsswer = useRef()

  useEffect(() => {
    (async() => {
      const dataLearned = await fetchListVocabularyLearnedTest(token)
      // console.log('TỪ VỰNG ĐÃ HỌC : >>>>', dataLearned)
      if (dataLearned) {
        lengthList.current = dataLearned?.data?.length
        setListVocaTest(dataLearned?.data)
        setAnswer(dataLearned?.data[0])
        console.log('dataLearned?.data[0]', dataLearned?.data[0]?.vie)
        setListOption(listOption => [...listOption, dataLearned?.data[0]?.vie])
      }
    })()
  }, [])

  // console.log('answer current : ', answer?.eng)
  // console.log('length list : ', lengthList.current)
  console.log('random option : ', randomNumber(3, lengthList.current))
  useEffect(() => {
    
    if (listVoCaTest) {
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
  console.log('list option choose answer : ', listFourOption?.current)
  console.log('is correct : ', isCorrectAnsswer.current)

  return (
    <View>
      <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" 
      className=' w-screen h-screen'>

      </ImageBackground>
    </View>
  )
}

export default OptionVocaScreen