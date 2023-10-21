import { View, Text, ImageBackground, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomTab from '../component/BottomTab'
import { useRoute } from '@react-navigation/native'
import SvgIcon from '../assets/useSVG'
import { usePost } from '../hooks/usePost'
import { useSelector } from 'react-redux'
import { showAlert } from '../funcntionSupport/showAlert'
const PostScreen = () => {
  const route = useRoute()
  const currentScreenName = route.name;
  const {UploadSVG} = SvgIcon
  const [isShowPost, setIsShowPost] = useState(false)
  const [dataInput, setDataInput] = useState({
    text : ''
  })
  const [listAllPost, setListAllPost] = useState([])


  const { fetchCreatePost, fetchGetAllPost } = usePost()

  const {token} = useSelector(state => state.auth)


  useEffect(() => {
    (async() => {
      const allListPost = await fetchGetAllPost()
      // console.log('allListPost : >>>>>', allListPost)
      if (allListPost) {
        setListAllPost(allListPost?.data)
      }
    })()
  }, [])

  const handlePost = async () => {
    const newPost = await fetchCreatePost(dataInput, token)
    if (+newPost?.status === 0) {
      showAlert('Bạn đã tạo bài đăng thành công', 'Mời bạn tiếp tục sử dụng ứng dụng')
    }
  }
  console.log('listAllPost >>>>>', listAllPost)
  return (
    <View>
      <View className='w-screen relative h-screen  bg-red-400'>
            <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" 
            className=' w-screen h-screen'>
                <View className='flex-row flex-1 justify-center'>
                  <View className='flex-col'>
                    <View className='flex-row mt-12'>
                      {
                        isShowPost ? <View>
                        <TextInput 
                        onChangeText={(value) => setDataInput({...value, text: value})}
                        className='w-[300px] h-[60px] rounded-3xl 
                        text-[18px] px-[10px] mr-2 bg-colorWhite shadow-xl text-text-gray' placeholder='Nội dung bài viết'></TextInput>
                      </View> : ''
                      // <View className='mr-3'>
                      //   <Text className='text-[20px] text-colorBrownBold font-bold'>Tạo bài đăng</Text>
                      // </View>
                      }
                      <TouchableOpacity onPress={() => {
                        if (dataInput.text !== '') {
                          handlePost()
                        }
                        else {
                          setIsShowPost(!isShowPost)
                        }
                      }}>
                        <View className='w-[60px] h-[60px] shadow-2xl bg-colorWhite rounded-full flex justify-center items-center '>
                        <UploadSVG 
                        className={`${currentScreenName === 'Learn' && 'bg-colorBrownSlightLV2 rounded-full text-white border-1 border-red-500 absolute'}`}
                        width="30" height="30"></UploadSVG>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View className='mt-10'>
                      {
                        listAllPost?.map(item => {
                          return <View className='w-[380px] min-h-[50px] bg-colorBrownSlightLV2 mb-3'>
                            <Text>{item?.text}</Text>
                          </View>
                        })
                      }
                    </View>
                  </View>
                  <BottomTab currentScreenName={currentScreenName}></BottomTab>
                </View>
            </ImageBackground>
        
        </View>
      <Text>PostScreen</Text>
    </View>
  )
}

export default PostScreen