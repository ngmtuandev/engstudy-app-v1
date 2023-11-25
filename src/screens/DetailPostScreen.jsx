import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import SvgIcon from "../assets/useSVG";
import { useComment } from "../hooks/useComment";
import { useState } from "react";
import format_date from "../funcntionSupport/formatDate";
const DetailPostScreen = ({ route }) => {
  const { post } = route.params;
  console.log("detail post : ", post);
  const [commentMatchPost, setCommentMatchPost] = useState([]);
  const { UploadSVG, UserSVG, LikeSVG, CommentSVG, ShareSVG, LikedSVG } =
    SvgIcon;
  const { fetchCreateComment, fetchAllCommentItem } = useComment();
  useEffect(() => {
    (async () => {
      const comments = await fetchAllCommentItem();
      const commentMatch = comments?.data?.filter(
        (item) => item?.post === post?._id
      );
      setCommentMatchPost(commentMatch);
    })();
  }, []);
  return (
    <View className="px-[12px] mt-2">
      <View>
        <View className="flex-row flex items-center mt-2">
          {post?.user?.avatar ? (
            <Image
              className="w-[50px] h-[50px] mr-3 rounded-full"
              source={{ uri: post?.user?.avatar }}
            ></Image>
          ) : (
            <UserSVG width="40" height="40" className="mr-2"></UserSVG>
          )}
          <View>
            <Text className="text-[20px] font-bold">
              {post?.user?.firstName + " " + post?.user?.lastName}
            </Text>
            <Text className="text-[14px] text-gray-900">
              {format_date(post?.updatedAt)}
            </Text>
          </View>
        </View>
      </View>
      <Text className="text-[22px] mt-2 text-gray-900">{post?.text}</Text>
      {post?.img[0] && (
        <Image
          className="w-[100%] rounded-md h-[250px] my-3"
          source={{ uri: post?.img[0] }}
        ></Image>
      )}
      <View className="flex-row justify-around my-1">
        <TouchableOpacity
          // onPress={() => handleLikePost(post?._id)}
          className="mr-6 flex justify-center items-center"
        >
          <LikeSVG width="30" height="30"></LikeSVG>

          <Text>{post?.likes.length} lượt thích</Text>
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
      <View className="max-h-[150px]">
        {commentMatchPost[0]?.post === post?._id && (
          <ScrollView className="mt-4">
            {commentMatchPost?.map((el) => {
              return (
                <View
                  className="my-1 border-b-[0.3px] pb-[5px] border-gray-400"
                  key={el?._id}
                >
                  <View className="flex-row flex items-center mt-2">
                    <UserSVG width="30" height="30" className="mr-2"></UserSVG>
                    <View>
                      <Text className="text-[16px] font-bold">
                        {post?.user?.firstName + " " + post?.user?.lastName}
                      </Text>
                      <Text className="text-[12px] text-gray-900">
                        {format_date(post?.updatedAt)}
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
    </View>
  );
};

export default DetailPostScreen;
