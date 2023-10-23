import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "../constants/screens";
const LogoutScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    return Alert.alert(
      "EngStudy thông báo",
      "Bạn có muốn đăng xuất tài khoản không ?",
      [
        {
          text: "Có",
          onPress: () => {
            dispatch(logout());
            navigation.navigate(SCREEN_NAME.LOGIN);
          },
        },
        {
          text: "Không",
          onPress: () => {
            navigation.navigate(SCREEN_NAME.ADDVOCA);
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }, []);
  return <View></View>;
};

export default LogoutScreen;
