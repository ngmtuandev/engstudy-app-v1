import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import randomNumber from '../funcntionSupport/randomNumber'
import {useSelector} from 'react-redux'
import { useVocabulary } from '../hooks/useVocabulary'
const _ = require('lodash')


function removeDuplicates(arr) {
  return Array.from(new Set(arr.map(JSON.stringify))).map(JSON.parse)
}

const ConnectVocaGameScreen = () => {
  const [isStart, setIsStart] = useState(false)
  const [listVoCaTest, setListVocaTest] = useState([])
  const [listVocaTestCurrent, setListVocaTestCurrent] = useState([])
  const [listVocaTestCurrent2, setListVocaTestCurrent2] = useState([])
  const [chooseOne, setChooseOne] = useState('')
  const [chooseTwo, setChooseTwo] = useState('')
  const arrList = useRef()
  const arrList2 = useRef()
  // const [correct, setCorrect] = useState(false)
  const {token} = useSelector(state => state.auth)
  const {fetchListVocabularyLearnedTest} = useVocabulary()
  useEffect(() => {
    (async() => {
      const dataLearned = await fetchListVocabularyLearnedTest(token)
      // console.log('TỪ VỰNG ĐÃ HỌC : >>>>', dataLearned)
      if (dataLearned) {
        setListVocaTest(dataLearned?.data)
      }
    })()
  }, [])
  useEffect(() => {
    // console.log('listVoCaTest : ', listVoCaTest[0])
    arrList.current = randomNumber(8, listVoCaTest?.length)
    // console.log('arrList.current = randomNumber(8, listVoCaTest?.length)', arrList.current)
    // console.log(first)
    // console.log('array list >>>', arrList.current)
      arrList2.current =_.shuffle(arrList.current)
  }, [listVoCaTest])
  

  
  // console.log('arr list : ', arrList)
  // console.log('sufferArrray', arrList2.current)
  const handleStart = () => {
    setIsStart(true)
    let listVoca = []
    let listVocaTwo = []
    arrList.current?.map(item => {
      listVoca.push({...listVoCaTest[item], isCorrect : false})
    })
    // console.log('arr list 2 : ', arrList2.current)
    arrList2.current?.map(item => {

      listVocaTwo.push({...listVoCaTest[item], isCorrect : false})
    })
    // console.log('listVocaTwo >>>>', listVocaTwo)
      setListVocaTestCurrent(removeDuplicates(listVoca))
      setListVocaTestCurrent2(removeDuplicates(listVocaTwo))
      // console.log('listVocaTestCurrent : ', listVocaTestCurrent)
      
  }
  // console.log('setListVocaTestCurrent2 : ', listVocaTestCurrent.length)
  // console.log('listVocaTestCurrent >>>', listVocaTestCurrent[0])

  // console.log('chooseOne', chooseOne?.eng)
  // console.log('chooseTwo', chooseTwo?.eng)
  
  // const a = [{"__v": 0, "_id": "6532714c266ec04d3c4c448f", "createdAt": "2023-10-20T12:23:40.882Z", "eng": "cat", "isCorrect": false, "progress": 10, "status": true, "updatedAt": "2023-10-20T12:25:41.421Z", "user": "653270b2266ec04d3c4c447e", "vie": "meo"}, {"__v": 0, "_id": "6532714c266ec04d3c4c448f", "createdAt": "2023-10-20T12:23:40.882Z", "eng": "cat", "isCorrect": false, "progress": 10, "status": true, "updatedAt": "2023-10-20T12:25:41.421Z", "user": "653270b2266ec04d3c4c447e", "vie": "meo"}, {"__v": 0, "_id": "6532714c266ec04d3c4c448f", "createdAt": "2023-10-20T12:23:40.882Z", "eng": "cat", "isCorrect": false, "progress": 10, "status": true, "updatedAt": "2023-10-20T12:25:41.421Z", "user": "653270b2266ec04d3c4c447e", "vie": "meo"}]
  // console.log('test function removeDuplicates ::', removeDuplicates(a))
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
      // console.log('kết quả cuối cùng nè >>>>>>>>>>', objChooseOne)
    }
    else {
      console.log('fail')
    }
  }, [chooseOne,chooseTwo])

  const handleContinue = () => {
    arrList.current = randomNumber(8, listVoCaTest?.length)

    arrList2.current =_.shuffle(arrList.current)

    // console.log('arrList', arrList.current, 'arrList2', arrList2.current)

    let listVoca = []
    let listVocaTwo = []
    arrList.current?.map(item => {
      listVoca.push({...listVoCaTest[item], isCorrect : false})
    })
    // console.log('arr list 2 : ', arrList2.current)
    arrList2.current?.map(item => {

      listVocaTwo.push({...listVoCaTest[item], isCorrect : false})
    })
    // console.log('listVocaTwo >>>>', listVocaTwo)
      setListVocaTestCurrent(removeDuplicates(listVoca))
      setListVocaTestCurrent2(removeDuplicates(listVocaTwo))
  }

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
                    isStart ?  <View className='flex-col justify-center items-center'>
                      <View className='flex-row'>
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
                    </View>
                      <View className='w-[250px] rounded-3xl flex justify-center items-center h-[40px] bg-colorBrownBold mt-5'>
                        <TouchableOpacity onPress={handleContinue}>
                          <Text className='text-colorWhite text-[17px] font-bold'>Kiểm tra từ khác</Text>
                        </TouchableOpacity>
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