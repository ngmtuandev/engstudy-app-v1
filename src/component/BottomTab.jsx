import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import SvgIcon from '../assets/useSVG'
import { useNavigation } from '@react-navigation/native';
const BottomTab = ({currentScreenName, onAddVocabulary}) => {
  const navigation = useNavigation()
  const {GraphSVG, PostSVG, StudySVG, TestSVG, AddSVG} = SvgIcon
  const addVocabulary = () => {
    onAddVocabulary()
  }
  return (
    <View className='h-[100px] flex-row items-center justify-center w-screen  bottom-0 absolute bg-colorBrownSlightLV2'>
      
      <TouchableOpacity onPress={() => navigation.navigate('Test')}>
        <View className={`${currentScreenName === 'Test' && 'w-[80px] mb-24 flex justify-center items-center relative rounded-full h-[80px] bg-[#FEC]'}`}>
          <TestSVG 
          className={`${currentScreenName === 'Test' && 'bg-colorBrownSlightLV2 rounded-full text-white border-1 border-red-500 absolute'}`}
          width="65" height="65"></TestSVG>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Learn')}>
        <View className={`${currentScreenName === 'Learn' && 'w-[80px] mb-24 flex justify-center items-center relative rounded-full h-[80px] bg-[#FEC]'}`}>
         <StudySVG 
         className={`${currentScreenName === 'Learn' && 'bg-colorBrownSlightLV2 rounded-full text-white border-1 border-red-500 absolute'}`}
         width="65" height="65"></StudySVG>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => {
        if (currentScreenName === 'AddVoca') {
          addVocabulary()
        }
        else {
          navigation.navigate('AddVoca')
        }
      }}>
        <View className={`${currentScreenName === 'AddVoca' && 'w-[80px] mb-24 flex justify-center items-center relative rounded-full h-[80px] bg-[#FEC]'}`}>
          <AddSVG 
          className={`${currentScreenName === 'AddVoca' && 'bg-colorBrownSlightLV2 rounded-full text-white border-1 border-red-500 absolute'}`} 
          width="65" height="65"></AddSVG>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Post')}>
        <View className={`${currentScreenName === 'Post' && 'w-[80px] mb-24 flex justify-center items-center relative rounded-full h-[80px] bg-[#FEC]'}`}>
          <PostSVG 
          className={`${currentScreenName === 'Post' && 'bg-colorBrownSlightLV2 rounded-full text-white border-1 border-red-500 absolute'}`}
          width="65" height="65"></PostSVG>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Chart')}>
        <View className={`${currentScreenName === 'Chart' && 'w-[80px] mb-24 flex justify-center items-center relative rounded-full h-[80px] bg-[#FEC]'}`}>
          <GraphSVG 
          className={`${currentScreenName === 'Chart' && 'bg-colorBrownSlightLV2 rounded-full text-white border-1 border-red-500 absolute'}`}
          width="65" height="65"></GraphSVG>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default BottomTab