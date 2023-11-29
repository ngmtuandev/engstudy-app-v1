import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import FormInput from "../component/FormInput";
import { useSelector } from "react-redux";
const RegisterScreen = ({ navigation }) => {
  const [showLogo, setShowLogo] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigation.navigate("AddVoca");
    }
  }, [token]);
  return (
    <View className="flex-1">
      <View className="w-screen h-screen">
        <ImageBackground
          source={require("../assets/bgl.png")}
          resizeMode="cover"
          className="w-screen h-screen"
        >
          <View className="flex-col mt-5 justify-center items-center">
            {!showLogo && (
              <View className="w-72 ml-20 h-16 flex flex-row mt-[80px]">
                <Text className="text-colorYellowMain text-[50px] font-bold">
                  Eng
                </Text>
                <Text className="text-gray-900 text-[50px] font-bold">
                  Study
                </Text>
              </View>
            )}
            {/* <View className='flex-col justify-center items-center'>
                        <Text className='font-bold text-white text-[32px]'>EngStudy</Text>
                        <Text className='font-bold text-[32px] text-colorGreenSlight'>xin chào</Text>
                    </View> */}
            <View>
              <FormInput
                setShowLogo={setShowLogo}
                isRegister={true}
                toLogin={navigation}
              ></FormInput>
            </View>
            <View className="flex-row">
              <Text className="mr-1 text-gray-600 text-[12px]">
                Bạn đã có tài khoản ?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <View>
                  <Text className="font-bold text-colorYellowMain text-[12px]">
                    Đăng Nhập
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default RegisterScreen;
