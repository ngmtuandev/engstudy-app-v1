import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { SCREEN_NAME } from "../constants/screens";
import format_date from "../funcntionSupport/formatDate";

const DetailUser = ({ route, navigation }) => {
  const { idUser } = route.params;
  console.log("idUser : >>>>>", idUser);

  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      resizeMode="cover"
      className=" w-[100%] h-[100%]"
    >
      <View className="flex-col w-[100%] h-[100%] justify-center content-center text-center items-center">
        <View className="flex-col w-[100%] h-[100%] justify-center content-center text-center items-center">
          <View className="w-[100px] border-[2px] border-gray-100 h-[100px] bg-pink-600 rounded-full"></View>
          <View>
            <Text className="mt-3 font-bold text-[20px]">
              {idUser?.firstName} {idUser?.lastName}
            </Text>
            <Text className="font-bold text-gray-50 text-[18px] ">
              Ngày tạo{format_date(idUser?.createdAt)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ marginTop: 50 }}
          onPress={() => {
            navigation.navigate(SCREEN_NAME.CHAT, {
              idRevived: idUser?._id,
            });
          }}
        >
          <View className="w-[100px] h-[40px] flex justify-center items-center bg-bgColorDark rounded-lg">
            <Text className="text-gray-50">Nhắn tin</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default DetailUser;
