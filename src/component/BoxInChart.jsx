import { View, Text } from "react-native";
import React from "react";

const BoxInChart = ({ data, text }) => {
  return (
    <View className="w-[180px] rounded-xl flex justify-center items-center h-[80px] mx-2 shadow-xl mb-8 bg-colorBrownBold">
      <View className="p-[2px] w-[60px] h-[30px] bg-colorWhite rounded-lg flex justify-center items-center">
        <Text className="text-gray-800 font-bold text-[22px]">{data}</Text>
      </View>
      <Text className="text-white font-bold mt-2 text-[19px]">{text}</Text>
    </View>
  );
};

export default BoxInChart;
