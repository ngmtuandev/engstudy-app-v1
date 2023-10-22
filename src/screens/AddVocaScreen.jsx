import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import BottomTab from "../component/BottomTab";
import { useRoute } from "@react-navigation/native";
import SvgIcon from "../assets/useSVG";
const CATEGORY_VOCABULARY = ["Adj", "Adv", "Noun", "Verb"];
import { useVocabulary } from "../hooks/useVocabulary";
const AddVocaScreen = ({ navigation }) => {
  const [eng, setEng] = useState("");
  const [vie, setVie] = useState("");
  const [showEng, setShowEng] = useState(false);
  const [showVie, setShowVie] = useState(false);
  const [example, setExample] = useState("");
  const [category, setCategory] = useState("");

  const route = useRoute();
  const currentScreenName = route.name;
  const dispatch = useDispatch();
  const { dataUser, token } = useSelector((state) => state.auth);
  console.log("dataUser", dataUser);
  const { FlagEngSVG, FlagVieSVG, PlusSVG } = SvgIcon;

  const { fetchAddVocabulary } = useVocabulary();

  const handleChooseCategoryVoca = (type) => {
    setCategory(type);
  };

  const showAlert = (text, anwser) => {
    Alert.alert(text, anwser, [
      {
        text: "Không",
        style: "cancel",
      },
      {
        text: "Thêm từ vựng",
        //  onPress: onDelete,
        style: "destructive",
      },
    ]);
  };

  const handleAddVocabulary = async () => {
    try {
      const newVocabulary = await fetchAddVocabulary({ eng, vie }, token);
      console.log("new vocabulary >>>>", newVocabulary);
      if (+newVocabulary?.status === 0) {
        showAlert(
          "Bạn đã thêm từ vựng thành công",
          "Bạn có muốn tiếp tục thêm từ vựng không ?"
        );
      } else {
        showAlert(
          "Từ vựng này đã tồn tại",
          "Vui lòng chọn từ vựng khác chưa có trong từ điển"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <View className="w-screen relative h-screen  bg-red-400">
        <ImageBackground
          source={require("../assets/bg.png")}
          resizeMode="cover"
          className=" w-screen h-screen"
        >
          <View className="flex-col flex-1">
            <View className="flex-col mt-20 justify-center items-center ">
              <View>
                <Text className="mb-2 text-colorBrownDarkLV2 font-bold text-[18px]">
                  Từ loại
                </Text>
                <View
                  className="w-[300px] flex-row items-center justify-around 
                      rounded-md grid-cols-4 h-[50px] bg-colorBrownSlightLV2"
                >
                  {CATEGORY_VOCABULARY.map((item, index) => {
                    return (
                      <Pressable
                        key={index}
                        onPress={() => handleChooseCategoryVoca(item)}
                        className={`w-[60px] rounded-md flex justify-center items-center 
                                    h-[30px] ${
                                      category === item
                                        ? "bg-colorBrownBold"
                                        : "bg-colorBrownSlightLV3"
                                    }`}
                      >
                        <Text className="font-bold text-colorWhite">
                          {item}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
              <View className="mt-6">
                <Text className="mb-2 text-colorBrownDarkLV2 font-bold text-[18px]">
                  Từ Vựng
                </Text>
                <View
                  className="w-[300px] flex-row my-[5px] items-center justify-between 
                      rounded-md grid-cols-4 h-[50px] border-[1px] border-colorBrownDarkLV2"
                >
                  <FlagEngSVG></FlagEngSVG>
                  <TextInput
                    onChangeText={(text) => setEng(text)}
                    className="text-colorBrownDarkLV2 font-bold text-[17px] w-[54%] h-[80%]"
                    placeholder="Tiếng Anh"
                  ></TextInput>
                  <TouchableOpacity
                    onPress={() => setShowEng(true)}
                    className="w-[50px] flex justify-center rounded-md 
                          items-center h-[50px] bg-colorBrownDarkLV2"
                  >
                    <PlusSVG width="30" height="30"></PlusSVG>
                  </TouchableOpacity>
                </View>
                {/* ============== */}
                <View
                  className="w-[300px] flex-row my-[5px] items-center justify-between 
                      rounded-md grid-cols-4 h-[50px] border-[1px] border-colorBrownDarkLV2"
                >
                  <FlagVieSVG></FlagVieSVG>
                  <TextInput
                    onChangeText={(text) => setVie(text)}
                    className="text-colorBrownDarkLV2 font-bold text-[17px] w-[54%] h-[80%]"
                    placeholder="Tiếng Việt"
                  ></TextInput>
                  <TouchableOpacity
                    onPress={() => setShowVie(true)}
                    className="w-[50px] flex justify-center rounded-md 
                          items-center h-[50px] bg-colorBrownDarkLV2"
                  >
                    <PlusSVG width="30" height="30"></PlusSVG>
                  </TouchableOpacity>
                </View>
                <View
                  className="w-[300px] flex-row my-[5px] items-center justify-between 
                      rounded-md grid-cols-4 h-[50px] "
                >
                  <TextInput
                    onChangeText={(text) => setExample(text)}
                    className=" w-[94%] pl-[5px] text-[16px]"
                    placeholder="Nhập ví dụ..."
                  ></TextInput>
                </View>
              </View>
              <View className="w-[300px] grid-cols-2 flex-row justify-between ">
                <View className="w-[170px] ">
                  <Text className="text-[20px] font-bold text-colorBrownDarkLV2">
                    {showEng && ` ${eng}`}
                  </Text>
                  <Text className="ml-1 text-colorBrownSlightLV3">{`${
                    category && `(${category})`
                  }`}</Text>
                  <Text className="text-[18px] mt-1 text-colorBrownDarkLV2 font-bold">
                    {showVie && ` ${vie}`}
                  </Text>
                </View>
                {/* <View className='w-[70px] bg-red-700'><Text>dsadsadsad</Text></View> */}
              </View>
            </View>
            <View className="flex-col flex-1 mt-16">
              <View className=" bg-slate-800">
                <TouchableOpacity
                  onPress={() => {
                    dispatch(logout());
                    navigation.navigate("Login");
                  }}
                >
                  <Text>Logout</Text>
                </TouchableOpacity>
              </View>
              <BottomTab currentScreenName={currentScreenName}></BottomTab>
            </View>
            <BottomTab
              onAddVocabulary={handleAddVocabulary}
              currentScreenName={currentScreenName}
            ></BottomTab>
          </View>
        </ImageBackground>
      </View>
      <Text>AddVocaScreen</Text>
    </View>
  );
};

export default AddVocaScreen;

{
  /* <View className='w-72 ml-24 h-16 mt-[80px]'>
                        <Image className='object-contain w-[70%] h-[70%]' source={require('../assets/logo.png')}></Image>
                    </View>
                    <TouchableOpacity onPress={() => {
                        dispatch(logout())
                        navigation.navigate('Login')
                    }}>
                      <Text>Logout</Text>
                    </TouchableOpacity> */
}
