import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import randomNumber from '../funcntionSupport/randomNumber'
import {useSelector} from 'react-redux'
import { useVocabulary } from '../hooks/useVocabulary'
const _ = require('lodash')

const ConnectVocaGameScreen = () => {
  const [isStart, setIsStart] = useState(false)
  const [listVoCaTest, setListVocaTest] = useState([])
  const [listVocaTestCurrent, setListVocaTestCurrent] = useState([])
  const [listVocaTestCurrent2, setListVocaTestCurrent2] = useState([])
  const [chooseOne, setChooseOne] = useState('')
  const [chooseTwo, setChooseTwo] = useState('')
  // const [correct, setCorrect] = useState(false)
  const {token} = useSelector(state => state.auth)
  const {fetchListVocabularyLearnedTest} = useVocabulary()
  useEffect(() => {
    (async() => {
      const dataLearned = await fetchListVocabularyLearnedTest(token)
      if (dataLearned?.data) {
        setListVocaTest(dataLearned?.data)
      }
    })()
  }, [])
  const arrList = randomNumber(8, listVoCaTest?.length)
  // console.log('array list >>>', arrList)
  const arrList2 =_.shuffle(arrList)
  console.log('arr list : ', arrList)
  console.log('sufferArrray', arrList2)
  const handleStart = () => {
    setIsStart(true)
    let listVoca = []
    let listVocaTwo = []
    arrList?.map(item => {
      listVoca.push({...listVoCaTest[item], isCorrect : false})
    })
    arrList2?.map(item => {
      listVocaTwo.push({...listVoCaTest[item], isCorrect : false})
    })
      setListVocaTestCurrent(listVoca)
      setListVocaTestCurrent2(listVocaTwo)
    
  }

  // console.log('listVocaTestCurrent >>>', listVocaTestCurrent[0])

  // console.log('chooseOne', chooseOne?.eng)
  // console.log('chooseTwo', chooseTwo?.eng)

  useEffect(() => {
    if (chooseOne?.vie === chooseTwo?.vie) {
      // listVocaTestCurrent?.map(item => {
      //   if (item?._id === chooseOne?._id) {
      //     setListVocaTestCurrent(listVocaTestCurrent => [...listVocaTestCurrent, {...item, item?.isCorrect : true}])
      //   }
      // })
      const objChooseOne = listVocaTestCurrent.find(item => item?._id === chooseOne?._id)
      const objChooseTwo = listVocaTestCurrent2.find(item => item?._id === chooseTwo?._id)
      // console.log('objChooseOne >>>', objChooseOne)
      if(objChooseOne || chooseTwo)
      {
        objChooseOne.isCorrect = true
        objChooseTwo.isCorrect = true
      }
      console.log('kết quả cuối cùng nè >>>>>>>>>>', objChooseOne)
    }
    else {
      console.log('fail')
    }
  }, [chooseOne,chooseTwo])

  return (
    <View>
      <View className='w-screen relative  bg-red-400'>
            <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" 
            className=' w-screen h-screen'>
                {/* <View className='flex-row justify-between px-form mt-10'>
                  <NavigateTabTop text={'Kiểm tra từ vựng'}></NavigateTabTop>
                  <NavigateTabTop navigate = {SCREEN_NAME.ITEM_VOCA} text={'Học từ mới'}></NavigateTabTop>
                </View> */}
                <View className='flex-col flex-1 justify-center items-center mt-[60px]'>
                  {
                    isStart ?  <View className='flex-row'>
                      <View>
                        {
                          listVocaTestCurrent?.map((item, index) => {
                            return <TouchableOpacity 
                            className = {`w-[140px] flex justify-center items-center my-2 h-[50px] ${!!item?.isCorrect ? 'bg-colorBrownSlightLV3' : 'bg-colorBrownDarkLV2'} rounded-md mx-2`}
                            onPress={() => setChooseOne(item)} 
                            key={index}>
                              <Text className='text-colorWhite text-[20px]'>{item?.eng}</Text>
                            </TouchableOpacity>
                          })
                        }
                      </View>
                      <View>
                        {
                          listVocaTestCurrent2?.map((item, index) => {
                            return <TouchableOpacity 
                            className = {`w-[140px] flex justify-center items-center my-2 h-[50px] ${!!item?.isCorrect ? 'bg-colorBrownSlightLV3' : 'bg-colorBrownDarkLV2'} rounded-md mx-2`}
                            onPress={() => setChooseTwo(item)}
                            key={index}>
                              <Text className='text-colorWhite text-[20px]'>{item?.vie}</Text>
                            </TouchableOpacity>
                          })
                        }
                      </View>
                    </View> : <View>
                      <TouchableOpacity 
                      className='w-[160px] h-[44px] flex justify-center items-center shadow-md
                       bg-colorBrownDarkLV2 rounded-3xl'
                      onPress={handleStart}>
                        <Text className='text-colorWhite font-bold text-[23px]'>Bắt đầu</Text>
                      </TouchableOpacity>
                    </View>
                  }
                </View>
            </ImageBackground>
        
        </View>
    </View>
  )
}

export default ConnectVocaGameScreen