import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
const EditInfo = () => {
  let selectedImage = null;
  const { fetchUserCurrent, fetchUpdateUser } = useAuth();
  const { token } = useSelector((state) => state.auth);
  const [userCurrent, setUserCurrent] = useState();
  const [dataInput, setDataInput] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    (async () => {
      const rs = await fetchUserCurrent(token);
      if (rs) {
        setUserCurrent(rs?.data);
      }
    })();
  }, []);

  const selectImage = async () => {
    let rs = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!rs.canceled) {
      selectedImage = rs;
    }
  };

  const handleUpdateProfile = async () => {
    const newDataUser = new FormData();
    dataInput?.firstName !== "" &&
      newDataUser.append("firstName", dataInput?.firstName);
    dataInput?.lastName !== "" &&
      newDataUser.append("lastName", dataInput?.lastName);
    dataInput?.phone !== "" && newDataUser.append("phone", dataInput?.phone);

    if (selectedImage) {
      newDataUser.append("image", {
        uri: selectedImage.assets[0].uri,
        name: "image.jpg",
        type: "image/jpg",
      });
    }

    const userUpdated = await fetchUpdateUser(newDataUser, token);
    console.log("userUpdated: ", userUpdated);
  };
  return (
    <View className="h-screen flex-col justify-center items-center w-[100%] bg-gray-100">
      <View>
        <Image
          className="w-[150px] h-[150px] mb-9 rounded-full mr-4"
          source={{ uri: userCurrent?.avatar }}
        ></Image>
      </View>
      <View className="mb-6">
        <Button title="Chọn ảnh đại diện" onPress={selectImage} />
      </View>
      <TextInput
        placeholder="Tên của bạn"
        className="border-[1px] pl-[8px] rounded-md h-[34px] w-[90%] outline-none mb-4"
        onChangeText={(value) =>
          setDataInput({ ...dataInput, firstName: value })
        }
      ></TextInput>
      <TextInput
        placeholder="Họ của bạn"
        className="border-[1px] pl-[8px] rounded-md h-[34px] w-[90%] outline-none mb-4"
        onChangeText={(value) =>
          setDataInput({ ...dataInput, lastName: value })
        }
      ></TextInput>
      <TextInput
        placeholder="Số điện thoại"
        className="border-[1px] pl-[8px] rounded-md h-[34px] w-[90%] outline-none mb-4"
        onChangeText={(value) => setDataInput({ ...dataInput, phone: value })}
      ></TextInput>
      <View className="-mb-12">
        <LottieView
          className="w-[60px] h-[60px] ml-7 transition-all translate-x-4"
          source={require("../assets/a4.json")}
          autoPlay
          loop
        />
      </View>
      <View className="w-[200px] h-[40px] flex justify-center rounded-md items-center bg-colorBrownDarkLV2 my-12">
        <TouchableOpacity onPress={handleUpdateProfile}>
          <Text className="text-gray-50 text-[17px]">Cập nhập thông tin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditInfo;
