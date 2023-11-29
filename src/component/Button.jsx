import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const Button = ({ title, onSubmit, stateRegister, isLoading }) => {
  const handlePress = () => {
    onSubmit();
  };

  return (
    <View
      className={`${
        stateRegister ? "w-[100%]" : "w-[100%]"
      } px-form h-[40px] my-5 rounded-lg bg-colorYellowMain mt-4 flex justify-center items-center text-center`}
    >
      <TouchableOpacity onPress={handlePress}>
        <Text className="text-gray-50 text-[18px] font-semibold">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
