import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import FormInput from "../component/FormInput";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [showLogo, setShowLogo] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigation.navigate("AddVoca");
    }
  }, [token]);

  return (
    <SafeAreaView className="flex-1">
      <View className="w-screen h-screen bg-red-400">
        <ImageBackground
          source={require("../assets/bgl.png")}
          resizeMode="cover"
          className="w-screen h-screen"
        >
          <View className="flex-col items-center mt-12">
            {!showLogo && (
              <View className="w-72 ml-24 h-16 flex flex-row mt-[80px]">
                <Text className="text-colorYellowMain text-[50px] font-bold">
                  Eng
                </Text>
                <Text className="text-gray-900 text-[50px] font-bold">
                  Study
                </Text>
              </View>
            )}
            {/* <Pressable onPress={() => navigation.navigate('AddVoca')}>
                        <Text>Next</Text>
                    </Pressable> */}
            <View>
              <FormInput
                setShowLogo={setShowLogo}
                isRegister={false}
              ></FormInput>
            </View>
            <View className="flex-row">
              <Text className="mr-1 text-gray-600 text-[12px]">
                Bạn chưa có tài khoản ?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <View>
                  <Text className="font-bold text-colorYellowMain text-[12px]">
                    Đăng Ký
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex justify-center items-center">
            <LottieView
              className="w-[120px] h-[120px] mt-4 -ml-3 transition-all translate-x-4"
              source={require("../assets/a.json")}
              autoPlay
              loop
            />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
