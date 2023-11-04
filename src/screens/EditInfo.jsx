import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
// import { TouchableOpacity } from "react-native-gesture-handler";
const EditInfo = () => {
  let selectedImage = null;
  const { fetchUpdateUser } = useAuth();
  const { token } = useSelector((state) => state.auth);
  const [dataInput, setDataInput] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const selectImage = async () => {
    let rs = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!rs.canceled) {
      // formData.append("image", {
      //   uri: rs.assets[0].uri,
      //   name: "image.jpg",
      //   type: "image/jpg",
      // });

      /// Test
      selectedImage = rs;

      // const postImg = await fetchPostImg(id, token, formData);
      // console.log("postImg", postImg);
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
    // const newPost = await fetchCreatePost(newPostData, token);
    // if (+newPost?.status === 0) {
    //   showAlert(
    //     "Bạn đã tạo bài đăng thành công",
    //     "Mời bạn tiếp tục sử dụng ứng dụng"
    //   );
    //   const allListPost = await fetchGetAllPost();
    //   // console.log('allListPost : >>>>>', allListPost)
    //   if (allListPost) {
    //     setListAllPost(allListPost?.data?.reverse());
    //   }
    // }
  };
  return (
    <View className="h-screen w-[300px] bg-gray-100">
      <View className="mt-8">
        <Button title="Chọn hình ảnh" onPress={selectImage} />
      </View>
      <TextInput
        className="border-[2px]"
        onChangeText={(value) =>
          setDataInput({ ...dataInput, firstName: value })
        }
      ></TextInput>
      <TextInput
        className="border-[2px]"
        onChangeText={(value) =>
          setDataInput({ ...dataInput, lastName: value })
        }
      ></TextInput>
      <TextInput
        className="border-[2px]"
        onChangeText={(value) => setDataInput({ ...dataInput, phone: value })}
      ></TextInput>

      <View>
        <TouchableOpacity onPress={handleUpdateProfile}>
          <Text>Cập nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditInfo;
