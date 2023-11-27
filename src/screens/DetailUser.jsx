import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { SCREEN_NAME } from "../constants/screens";
const DetailUser = ({ route, navigation }) => {
  const { idUser } = route.params;
  console.log("idUser : >>>>>", idUser?._id);

  return (
    <View>
      <TouchableOpacity
        style={{ marginTop: 50 }}
        onPress={() => {
          navigation.navigate(SCREEN_NAME.CHAT, {
            idRevived: idUser?._id,
          });
        }}
      >
        <Text>Nhắn tin</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailUser;
