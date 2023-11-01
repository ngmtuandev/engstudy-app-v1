import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SCREEN_NAME } from "../constants/screens";
const WelcomeScreen = ({ navigation }) => {
  const [tokenLogin, setTokenLogin] = useState(null);
  // const {dataUser, token} = useSelector(state => state.auth)
  // console.log('tk >>', tk)
  useEffect(() => {
    (async () => {
      const getToken = await AsyncStorage.getItem("USER_LOGIN");
      setTokenLogin(getToken);
      if (tokenLogin) {
        // console.log("tokenLogin : ", tokenLogin);
        setTimeout(() => {
          navigation.navigate(SCREEN_NAME.ADDVOCA);
        }, 4000);
      } else {
        setTimeout(() => {
          navigation.navigate(SCREEN_NAME.LOGIN);
        }, 4000);
      }
    })();
  }, [tokenLogin]);
  return (
    <View className="flex justify-center items-center w-screen h-screen bg-colorBrownDarkLV2">
      <Text className="text-[30px] text-colorBrownSlightLV2 font-bold mt-[80px]">
        EngStudy Xin Chào
      </Text>
    </View>
  );
};

export default WelcomeScreen;
