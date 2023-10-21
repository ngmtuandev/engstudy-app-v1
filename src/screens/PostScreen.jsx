import { View, Text, ImageBackground, TouchableOpacity, TextInput, ScrollView } from 'react-native'
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
  const {UploadSVG, UserSVG, LikeSVG, CommentSVG, ShareSVG} = SvgIcon
  const [isShowPost, setIsShowPost] = useState(false)
  const [dataInput, setDataInput] = useState({
    text : ''
  })
  const [listAllPost, setListAllPost] = useState([])

  const { fetchCreatePost, fetchGetAllPost, fetchLikePost } = usePost()

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
      const allListPost = await fetchGetAllPost()
      // console.log('allListPost : >>>>>', allListPost)
      if (allListPost) {
        setListAllPost(allListPost?.data)
      }
    }
  }
  // console.log('listAllPost >>>>>', listAllPost[0])

  const handleLikePost = async (id) => {
    console.log('id post new >>>>', id)
    const likePostItem = await fetchLikePost(id, token)
    console.log('like post >>>>', likePostItem)
    const allListPost = await fetchGetAllPost()
      // console.log('allListPost : >>>>>', allListPost)
      if (allListPost) {
        setListAllPost(allListPost?.data)
      }
  }

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
                    <ScrollView className='mt-10 mb-24' showsVerticalScrollIndicator={false}>
                      {
                        listAllPost?.map((item, index) => {
                          return <View key={index} className='w-[380px] p-[10px] rounded-xl shadow-md
                          min-h-[180px] bg-colorBrownSlightLV2 mb-3'>
                            <View>
                              <View className='flex-row flex items-center mt-2'>
                                <UserSVG width="40" height="40" className='mr-2'></UserSVG>
                                <View>
                                  <Text className='text-[20px] font-bold'>{item?.user?.firstName + ' ' + item?.user?.lastName}</Text>
                                  <Text className='text-[14px] text-gray-900'>{item?.updatedAt}</Text>
                                </View>
                              </View>
                            </View>
                            <Text className='text-[24px] mt-2 text-gray-900'>{item?.text}</Text>
                            <View className='flex-row my-1'>
                              <TouchableOpacity 
                              onPress={() => handleLikePost(item?._id)}
                              className='mr-6 flex justify-center items-center'>
                                <LikeSVG width="30" height="30"></LikeSVG>
                                <Text>{item?.likes.length} lượt thích</Text>
                              </TouchableOpacity>
                              <TouchableOpacity className='mr-6 flex justify-center items-center'>
                                <CommentSVG width="30" height="30"></CommentSVG>
                                <Text>0 bình luận</Text>
                              </TouchableOpacity>
                              <TouchableOpacity className='mr-6 flex justify-center items-center'>
                                <ShareSVG width="30" height="30"></ShareSVG>
                                <Text>0 chia sẻ</Text>
                              </TouchableOpacity>
                            </View>
                            <View className='my-2 flex'>
                              <TextInput className='w-[80%] rounded-md h-[50px] px-form border border-colorBrownDarkLV2'
                              placeholder='Nhập bình luận của bạn'
                              ></TextInput>
                              <TouchableOpacity className='w-[80px] my-4 rounded-2xl h-[30px] flex justify-center items-center bg-black'>
                                <Text className=' text-[14px] text-colorWhite'>Bình luận</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        })
                      }
                    </ScrollView>
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