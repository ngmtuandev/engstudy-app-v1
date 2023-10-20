import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import BottomTab from '../component/BottomTab'
import { useSelector } from 'react-redux';
import { useVocabulary } from '../hooks/useVocabulary';
import { showAlert } from '../funcntionSupport/showAlert';
// var Sound = require('react-native-sound')
const LearnItemVocaOne = () => {
  const route = useRoute()
  const currentScreenName = route.name;
  const [listVoca, setListVoca] = useState([])
  const [vocabularyCurrent, setVocabularyCurrent] = useState()
  const indexCurrent = useRef(0)
  const {fetchListVocabularyNoLearned} = useVocabulary()
  const {token} = useSelector(state => state.auth)
  const {fetchLearnVoca} = useVocabulary()
  useEffect(() => {
    (async() => {
        const dataVocaNotLearn = await fetchListVocabularyNoLearned(token)
        if (dataVocaNotLearn) {
            setListVoca(dataVocaNotLearn?.data)
            setVocabularyCurrent(dataVocaNotLearn?.data[indexCurrent.current])
        }
    })()
  }, [indexCurrent.current])

  useEffect(() => {
    // console.log('re-render')
    setVocabularyCurrent(listVoca[indexCurrent.current])
  }, [indexCurrent.current])

  // Sound.setCategory('Playback');
  // const sound = new Sound('../assets/audio/congratulation.mp3', Sound.MAIN_BUNDLE, (error) => {
  //   if (error) {
  //     console.log('Error loading sound: ', error);
  //   }
  // });

  

  const handleLearnVoca = async () => {
    if (listVoca?.length === 0) {
      showAlert('Bạn đã hoàn thành bộ từ vựng này', 'Bạn có muốn làm bài kiểm tra không')
    }
    else {
      // sound.play((success) => {
      //   if (success) {
      //     console.log('Sound played successfully');
      //   } else {
      //     console.log('Error playing sound');
      //   }
      // });
      
      await fetchLearnVoca(vocabularyCurrent?.eng, token)
      indexCurrent.current = +indexCurrent.current < listVoca?.length-1 ? +indexCurrent.current + 1 : 0
      setVocabularyCurrent(listVoca[indexCurrent.current])
      console.log('vocabularyCurrent?.progress : ', vocabularyCurrent?.progress)
    }
  }

  const convertPercent = (number) => {
    return ((number * 320) / 10)
  }
  console.log(convertPercent(vocabularyCurrent?.progress))
  return (
    <View>
      <View className='w-screen relative h-screen  bg-red-400'>
            <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" 
            className=' w-screen h-screen'>
                <View className='flex-col flex-1 px-screen mt-12'>
                  <View className='flex justify-center items-center'>
                    <Text className='font-bold text-colorBorder text-[16px]'>Từ chưa thuộc: {listVoca?.length}</Text>
                  </View>
                  <View className='flex-row justify-between mt-16'>
                    <View className='w-[190px] h-[200px] flex-col justify-center'>
                        <Text className='text-[37px] text-colorBrownSlightLV3 font-bold'>
                            {vocabularyCurrent?.eng}
                        </Text>
                        <Text className='text-colorBrownSlightLV3 flex justify-center font-bold text-[20px]'>
                            {vocabularyCurrent?.vie}
                        </Text>
                    </View>
                    <View className='w-[320px] h-[200px] flex justify-center'>
                        <Text className={`${vocabularyCurrent ? 'text-[50px]' : ' text-[25px]'} text-colorBrownSlightLV3 font-bold`}>{
                        vocabularyCurrent ? `${(+vocabularyCurrent?.progress / 10) * 10}0%`: 'Bạn đã hoàn thành bộ từ vựng này'
                      }</Text>
                    </View>
                  </View>
                  <View className='w-[320px] shadow-md relative h-5 rounded-xl bg-colorBrownDarkLV2 mt-7'>
                    <View className={`absolute w-[${convertPercent(vocabularyCurrent?.progress)}px] h-5 rounded-xl bg-colorBrownSlightLV2`}></View>
                  </View>
                  <View className='w-[100%] flex-row justify-between h-5 mt-16'>
                    <View className='w-[49.5%] flex justify-center bg-colorBrownDarkLV2 items-center h-[40px] rounded-tl-md rounded-bl-md border-[2px] border-colorBrownDarkLV2'>
                        <TouchableOpacity>
                            <Text className='text-colorWhite text-[17px] font-bold]'>Đã thuộc</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='w-[49.5%] flex justify-center bg-colorBrownDarkLV2 items-center h-[40px] border-[2px] border-colorBrownDarkLV2 rounded-tr-md rounded-br-md'>
                        <TouchableOpacity 
                        onPress={() => {
                          handleLearnVoca()
                        }}>
                            <Text className='text-colorWhite text-[17px] font-bold]'>Tiếp tục học</Text>
                        </TouchableOpacity>
                    </View>
                  </View>
                  <BottomTab currentScreenName={currentScreenName}></BottomTab>
                </View>
            </ImageBackground>
        </View>
    </View>
  )
}

export default LearnItemVocaOne