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
      <View className="flex-1 shadow-xl bg-gray-100 h-screen">
        <View className="mt-10 ml-2">
          <View>
            <View className="flex-row items-center">
              <Image
                className="w-[50px] h-[50px] rounded-full mr-2"
                source={{ uri: userCurrent?.avatar }}
              ></Image>
              <View>
                <Text className="text-[14px]">Xin chào,</Text>
                <Text className="text-[16px]">{`${userCurrent?.firstName} ${userCurrent?.lastName}`}</Text>
              </View>
            </View>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate(SCREEN_NAME.EDIT);
            }}
          >
            <Text> Cập nhập thông tin</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              dispatch(logout());
              navigation.navigate(SCREEN_NAME.LOGIN);
            }}
          >
            <Text>Đăng xuất</Text>
          </Pressable>
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
