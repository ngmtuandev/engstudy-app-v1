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
import { useAuth } from "../hooks/useAuth";
import { SCREEN_NAME } from "../constants/screens";
const PostScreen = ({ navigation }) => {
  const route = useRoute();
  const currentScreenName = route.name;
  const { UploadSVG, UserSVG, LikeSVG, CommentSVG, ShareSVG, LikedSVG } =
    SvgIcon;
  const [isShowPost, setIsShowPost] = useState(false);
  const [dataInput, setDataInput] = useState({
    text: "",
  });
  const [comment, setComment] = useState("");
  const [listAllPost, setListAllPost] = useState([]);
  const [userCurrent, setUserCurrent] = useState();
  const [allComment, setAllComment] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [commentMatchPost, setCommentMatchPost] = useState([]);
  const { fetchUserCurrent } = useAuth();
  const { fetchCreatePost, fetchGetAllPost, fetchLikePost, fetchPostImg } =
    usePost();
  const { fetchCreateComment, fetchAllCommentItem } = useComment();
  let selectedImage = null;
  const { token } = useSelector((state) => state.auth);
  console.log("listAllPost", listAllPost);

  useEffect(() => {
    (async () => {
      showAlert(
        "Vì một cộng đồng cải thiện Tiếng Anh",
        "Hy vọng các bạn hạn chế bình luận, đăng bài sử dụng Tiếng Việt để tránh bị khóa tài khoản. EngStudy xin lỗi vì sự bất tiện này.",
        "Đồng ý"
      );
      const allListPost = await fetchGetAllPost();
      if (allListPost) {
        const dataListPost = allListPost?.data.reverse();
        setListAllPost(dataListPost);
      }
      const rs = await fetchUserCurrent(token);
      if (rs) {
        setUserCurrent(rs?.data);
      }
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/lofi.mp3")
      );
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
      if (allListPost) {
        setListAllPost(allListPost?.data?.reverse());
      }
    }
  };

  /// Test Function

  const handleLikePost = async (id) => {
    console.log("id post new >>>>", id);
    const likePostItem = await fetchLikePost(id, token);
    console.log("like post >>>>", likePostItem);
    const allListPost = await fetchGetAllPost();
    if (allListPost) {
      setListAllPost(allListPost?.data?.reverse());
    }
  };

  const handleComment = async (pid) => {
    // console.log('----')

    const dataComment = await fetchCreateComment({ text: comment }, token, pid);
    console.log("data comment : ", dataComment);
  };

  const getAllComment = async (pid) => {
    console.log("hellloo");
    const comments = await fetchAllCommentItem();
    const commentMatch = comments?.data?.filter((item) => item?.post === pid);
    setCommentMatchPost(commentMatch);
    setShowComment(!showComment);
  };

  const selectImage = async () => {
    let rs = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!rs.canceled) {
      selectedImage = rs;
    }
  };

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
                      className="w-[380px] p-[10px] rounded-xl
                          min-h-[180px] bg-white mb-3"
                    >
                      <View>
                        <View className="flex-row flex items-center mt-2">
                          {item?.user?.avatar ? (
                            <Image
                              className="w-[50px] h-[50px] mr-3 rounded-full"
                              source={{ uri: item?.user?.avatar }}
                            ></Image>
                          ) : (
                            <UserSVG
                              width="40"
                              height="40"
                              className="mr-2"
                            ></UserSVG>
                          )}
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
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate(SCREEN_NAME.DETAIL_POST, {
                            post: item,
                          });
                        }}
                      >
                        {item?.img[0] && (
                          <Image
                            className="w-[100%] h-[250px] my-3"
                            source={{ uri: item?.img[0] }}
                          ></Image>
                        )}
                      </TouchableOpacity>
                      <View className="flex-row my-1">
                        <TouchableOpacity
                          onPress={() => handleLikePost(item?._id)}
                          className="mr-6 flex justify-center items-center"
                        >
                          {item?.likes.includes(userCurrent?._id) ? (
                            <LikedSVG width="30" height="30"></LikedSVG>
                          ) : (
                            <LikeSVG width="30" height="30"></LikeSVG>
                          )}
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
