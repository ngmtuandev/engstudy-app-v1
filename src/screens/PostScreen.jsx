import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import BottomTab from "../component/BottomTab";
import { useRoute } from "@react-navigation/native";
import SvgIcon from "../assets/useSVG";
import { usePost } from "../hooks/usePost";
import { useComment } from "../hooks/useComment";
import { useSelector } from "react-redux";
import { showAlert } from "../funcntionSupport/showAlert";
import * as ImagePicker from "expo-image-picker";
import format_date from "../funcntionSupport/formatDate";
import { Audio } from "expo-av";

const PostScreen = () => {
  const route = useRoute();
  const currentScreenName = route.name;
  const { UploadSVG, UserSVG, LikeSVG, CommentSVG, ShareSVG } = SvgIcon;
  const [isShowPost, setIsShowPost] = useState(false);
  const [dataInput, setDataInput] = useState({
    text: "",
  });
  const [comment, setComment] = useState("");
  const [listAllPost, setListAllPost] = useState([]);
  const [allComment, setAllComment] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [commentMatchPost, setCommentMatchPost] = useState([]);
  const [sound, setSound] = useState();

  const { fetchCreatePost, fetchGetAllPost, fetchLikePost, fetchPostImg } =
    usePost();
  const { fetchCreateComment, fetchAllCommentItem } = useComment();
  let selectedImage = null;
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      showAlert(
        "Vì một cộng đồng cải thiện Tiếng Anh",
        "Hy vọng các bạn hạn chế bình luận, đăng bài sử dụng Tiếng Việt để tránh bị khóa tài khoản. EngStudy xin lỗi vì sự bất tiện này.",
        "Đồng ý"
      );
      const allListPost = await fetchGetAllPost();
      // console.log('allListPost : >>>>>', allListPost)
      if (allListPost) {
        const dataListPost = allListPost?.data.reverse();
        setListAllPost(dataListPost);
      }
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/lofi.mp3")
      );
      // setSound(sound);
      await sound.playAsync();
    })();
  }, []);

  const handlePost = async () => {
    const newPostData = new FormData();
    newPostData.append("text", dataInput.text); // Thêm dữ liệu văn bản

    if (selectedImage) {
      newPostData.append("image", {
        uri: selectedImage.assets[0].uri,
        name: "image.jpg",
        type: "image/jpg",
      });
    }

    const newPost = await fetchCreatePost(newPostData, token);
    if (+newPost?.status === 0) {
      showAlert(
        "Bạn đã tạo bài đăng thành công",
        "Mời bạn tiếp tục sử dụng ứng dụng"
      );
      const allListPost = await fetchGetAllPost();
      // console.log('allListPost : >>>>>', allListPost)
      if (allListPost) {
        setListAllPost(allListPost?.data?.reverse());
      }
    }
  };
  // console.log('listAllPost >>>>>', listAllPost[0])

  /// Test Function

  const handleLikePost = async (id) => {
    console.log("id post new >>>>", id);
    const likePostItem = await fetchLikePost(id, token);
    console.log("like post >>>>", likePostItem);
    const allListPost = await fetchGetAllPost();
    // console.log('allListPost : >>>>>', allListPost)
    if (allListPost) {
      setListAllPost(allListPost?.data?.reverse());
    }
  };

  const handleComment = async (pid) => {
    // console.log('----')
    // console.log(pid)
    // console.log('value comment : ', comment)
    const dataComment = await fetchCreateComment({ text: comment }, token, pid);
    console.log("data comment : ", dataComment);
  };

  const getAllComment = async (pid) => {
    console.log("hellloo");
    const comments = await fetchAllCommentItem();
    const commentMatch = comments?.data?.filter((item) => item?.post === pid);
    // console.log("comment metch : ", commentMatch);
    setCommentMatchPost(commentMatch);
    setShowComment(!showComment);
  };

  // console.log("listAllPost : ", listAllPost[1]);

  const selectImage = async () => {
    let rs = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!rs.canceled) {
      // formData.append("image", {
      //   uri: rs.assets[0].uri,
      //   name: "image.jpg",
      //   type: "image/jpg",
      // });

      /// Test
      selectedImage = rs;

      // const postImg = await fetchPostImg(id, token, formData);
      // console.log("postImg", postImg);
    }
  };

  // console.log("listAllPost >>>", listAllPost);

  // async function playSound() {
  //   const { sound } = await Audio.Sound.createAsync(
  //     require("../assets/audio/lofi.mp3")
  //   );
  //   // setSound(sound);
  //   await sound.playAsync();
  // }

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  return (
    <View>
      <View className="w-screen relative h-screen  bg-red-400">
        <ImageBackground
          source={require("../assets/bg.png")}
          resizeMode="cover"
          className=" w-screen h-screen"
        >
          <View className="flex-row flex-1 justify-center">
            <View className="flex-col">
              {/* <View>
                <Button title="Phát âm thanh" onPress={playSound} />
              </View> */}
              <View className="flex-row mt-16">
                {
                  isShowPost ? (
                    <View>
                      <TextInput
                        onChangeText={(value) =>
                          setDataInput({ ...value, text: value })
                        }
                        className="w-[300px] h-[60px] rounded-3xl 
                        text-[18px] px-[10px] mr-2 bg-colorWhite shadow-xl text-text-gray"
                        placeholder="Nội dung bài viết"
                      ></TextInput>
                      <View className="mt-8">
                        <Button title="Chọn hình ảnh" onPress={selectImage} />
                      </View>
                    </View>
                  ) : (
                    ""
                  )
                  // <View className='mr-3'>
                  //   <Text className='text-[20px] text-colorBrownBold font-bold'>Tạo bài đăng</Text>
                  // </View>
                }
                <TouchableOpacity
                  onPress={() => {
                    if (dataInput.text !== "") {
                      handlePost();
                    } else {
                      setIsShowPost(!isShowPost);
                    }
                  }}
                >
                  <View className="w-[60px] h-[60px] shadow-2xl bg-colorWhite rounded-full flex justify-center items-center ">
                    <UploadSVG
                      className={`${
                        currentScreenName === "Learn" &&
                        "bg-colorBrownSlightLV2 rounded-full text-white border-1 border-red-500 absolute"
                      }`}
                      width="30"
                      height="30"
                    ></UploadSVG>
                  </View>
                </TouchableOpacity>
              </View>
              <ScrollView
                className="mt-6 mb-24"
                showsVerticalScrollIndicator={false}
              >
                {listAllPost?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="w-[380px] p-[10px] rounded-xl shadow-md
                          min-h-[180px] bg-colorBrownSlightLV2 mb-3"
                    >
                      <View>
                        <View className="flex-row flex items-center mt-2">
                          <UserSVG
                            width="40"
                            height="40"
                            className="mr-2"
                          ></UserSVG>
                          <View>
                            <Text className="text-[20px] font-bold">
                              {item?.user?.firstName +
                                " " +
                                item?.user?.lastName}
                            </Text>
                            <Text className="text-[14px] text-gray-900">
                              {format_date(item?.updatedAt)}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Text className="text-[22px] mt-2 text-gray-900">
                        {item?.text}
                      </Text>
                      {item?.img[0] && (
                        <Image
                          className="w-[100%] h-[250px] my-3"
                          source={{ uri: item?.img[0] }}
                        ></Image>
                      )}
                      <View className="flex-row my-1">
                        <TouchableOpacity
                          onPress={() => handleLikePost(item?._id)}
                          className="mr-6 flex justify-center items-center"
                        >
                          <LikeSVG width="30" height="30"></LikeSVG>
                          <Text>{item?.likes.length} lượt thích</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="mr-6 flex justify-center items-center">
                          <CommentSVG width="30" height="30"></CommentSVG>
                          <Text>0 bình luận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="mr-6 flex justify-center items-center">
                          <ShareSVG width="30" height="30"></ShareSVG>
                          <Text>0 chia sẻ</Text>
                        </TouchableOpacity>
                      </View>
                      <View className="my-2 flex">
                        <TextInput
                          onChangeText={(value) => setComment(value)}
                          className="w-[80%] rounded-md h-[50px] px-form border border-colorBrownDarkLV2"
                          placeholder="Nhập bình luận của bạn"
                        ></TextInput>
                        {showComment ? (
                          <View className="max-h-[150px]">
                            {commentMatchPost[0]?.post === item?._id && (
                              <ScrollView className="mt-4">
                                {commentMatchPost?.map((el) => {
                                  return (
                                    <View
                                      className="my-1 border-b-[0.3px] pb-[5px] border-gray-400"
                                      key={el?._id}
                                    >
                                      <View className="flex-row flex items-center mt-2">
                                        <UserSVG
                                          width="30"
                                          height="30"
                                          className="mr-2"
                                        ></UserSVG>
                                        <View>
                                          <Text className="text-[16px] font-bold">
                                            {item?.user?.firstName +
                                              " " +
                                              item?.user?.lastName}
                                          </Text>
                                          <Text className="text-[12px] text-gray-900">
                                            {format_date(item?.updatedAt)}
                                          </Text>
                                        </View>
                                      </View>
                                      <Text className="my-1">{el?.text}</Text>
                                    </View>
                                  );
                                })}
                              </ScrollView>
                            )}
                          </View>
                        ) : (
                          ""
                        )}
                        <TouchableOpacity
                          onPress={() => getAllComment(item?._id)}
                          className=""
                        >
                          <Text className="my-2 text-[14px]">
                            Xem bình luận
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleComment(item?._id)}
                          className="w-[80px] my-1 rounded-2xl h-[30px] flex justify-center items-center bg-black"
                        >
                          <Text className=" text-[14px] text-colorWhite">
                            Bình luận
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <BottomTab currentScreenName={currentScreenName}></BottomTab>
          </View>
        </ImageBackground>
      </View>
      <Text>PostScreen</Text>
    </View>
  );
};

export default PostScreen;
