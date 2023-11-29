import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "../constants/screens";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
const Drawer = ({ setIsShowDrawer }) => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userCurrent, setUserCurrent] = useState();
  const { fetchUserCurrent } = useAuth();
  useEffect(() => {
    (async () => {
      const rs = await fetchUserCurrent(token);
      if (rs) {
        setUserCurrent(rs?.data);
      }
    })();
  }, []);
  console.log(userCurrent);
  return (
    <View className="absolute h-screen w-screen flex-1 flex-row left-0 z-10">
      <View className="w-[70%] shadow-xl bg-gray-100 rounded-tr-[50px] rounded-br-[50px] h-screen">
        <View className="mt-10">
          <View className="bg-colorYellowMain h-[150px] rounded-tr-[50px] -mt-10">
            <View className="flex-row mt-10 ml-3 items-center">
              <Image
                className="w-[70px] h-[70px] rounded-full mr-4"
                source={{ uri: userCurrent?.avatar }}
              ></Image>
              <View>
                <Text className="text-[14px] text-gray-700">Xin chào,</Text>
                <Text className="text-[24px] text-gray-800 font-bold">{`${userCurrent?.firstName} ${userCurrent?.lastName}`}</Text>
              </View>
            </View>
          </View>
          <View className="mt-5">
            <View className="my-2 w-[95%] h-[40px] flex justify-center items-center rounded-md">
              <Pressable
                onPress={() => {
                  navigation.navigate(SCREEN_NAME.EDIT);
                }}
              >
                <Text className="text-[16px] font-semibold">
                  Cập nhập thông tin
                </Text>
              </Pressable>
            </View>
            <View className="my-2 w-[95%] h-[40px] flex justify-center items-center rounded-md">
              <Pressable
                onPress={() => {
                  navigation.navigate(SCREEN_NAME.EDIT);
                }}
              >
                <Text className="text-[16px] font-semibold">Khóa học</Text>
              </Pressable>
            </View>
            <View className="my-2 w-[95%] h-[40px] flex justify-center items-center rounded-md">
              <Pressable
                onPress={() => {
                  navigation.navigate(SCREEN_NAME.CHAT);
                }}
              >
                <Text className="text-[16px] font-semibold">Chat</Text>
              </Pressable>
            </View>
            <View className="my-2 w-[95%] h-[40px] flex justify-center items-center rounded-md">
              <Pressable
                onPress={() => {
                  dispatch(logout());
                  navigation.navigate(SCREEN_NAME.TEST);
                }}
              >
                <Text className="text-[16px] font-semibold">
                  Kiểm tra từ đã học
                </Text>
              </Pressable>
            </View>
            <View className="my-2 w-[95%] h-[40px] flex justify-center items-center rounded-md">
              <Pressable>
                <Text className="text-[16px] font-semibold">
                  Luyện đề toeic
                </Text>
              </Pressable>
            </View>
            <View className="my-2 w-[95%] h-[40px] flex justify-center items-center rounded-md">
              <Pressable>
                <Text className="text-[16px] font-semibold">
                  Đăng ký luyện thi
                </Text>
              </Pressable>
            </View>
            <View className="my-2 w-[95%] h-[40px] flex justify-center items-center rounded-md">
              <Pressable
                onPress={() => {
                  dispatch(logout());
                  navigation.navigate(SCREEN_NAME.LOGIN);
                }}
              >
                <Text className="text-[16px] font-semibold">Đăng xuất</Text>
              </Pressable>
            </View>
          </View>
          <View className="mt-11 text-center flex justify-center items-center">
            <Text className="font-semibold text-[16px] text-gray-600">
              Chính sách bảo mật quyền riêng tư ?
            </Text>
          </View>
        </View>
      </View>
      <Pressable
        className="flex-1 h-screen "
        onPress={() => setIsShowDrawer(false)}
      ></Pressable>
    </View>
  );
};

export default Drawer;
