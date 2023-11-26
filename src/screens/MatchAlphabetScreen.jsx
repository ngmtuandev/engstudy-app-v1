import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
const _ = require("lodash");
import { useVocabulary } from "../hooks/useVocabulary";
import { useSelector } from "react-redux";
import useMatchVocaStore from "../store-zustand/MatchVocaStore";

const MatchAlphabetScreen = () => {
  const [listVoCaTest, setListVocaTest] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const { fetchListVocabularyLearnedTest } = useVocabulary();
  const lengthTest = useRef();
  const questionTest = useRef(0);
  const [curentAnwser, setCurentAnwser] = useState();
  const {
    selectAlphabetVocaChoose,
    alphabetVocaChoose,
    deleteAllSelectAlphabetVocaChoose,
  } = useMatchVocaStore();
  console.log("alphabetVocaChoose >>>>", alphabetVocaChoose);
  useEffect(() => {
    deleteAllSelectAlphabetVocaChoose();
    (async () => {
      const dataLearned = await fetchListVocabularyLearnedTest(token);
      if (dataLearned) {
        setListVocaTest(dataLearned?.data);
        lengthTest.current = dataLearned?.data.length;
      }
      setCurentAnwser(dataLearned?.data[questionTest.current]);
    })();
  }, []);
  useEffect(() => {
    if (alphabetVocaChoose.length === curentAnwser?.eng?.length) {
      if (alphabetVocaChoose.join("") === curentAnwser?.eng) {
        console.log("đúng");
        deleteAllSelectAlphabetVocaChoose();
        setCurentAnwser(listVoCaTest[questionTest.current++]);
      } else {
        Alert.alert("Từ bạn chọn sai", "Vui lòng nhập lại", [
          {
            text: "Hủy",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Kiểm tra lại",
            onPress: () => deleteAllSelectAlphabetVocaChoose(),
          },
        ]);
      }
    }
  }, [alphabetVocaChoose]);

  const handleAddReply = (item) => {
    selectAlphabetVocaChoose(item);
  };

  return (
    <View>
      <ImageBackground
        source={require("../assets/bg.png")}
        resizeMode="cover"
        className=" w-screen h-screen "
      >
        <View className="flex mt-44 justify-center items-center">

          <View>
            <Text lassName="text-[30px] font-semibold text-colorBrownDarkLV2">
              Chọn thêm {curentAnwser?.eng?.length - alphabetVocaChoose?.length}
              {" từ "}
              để đủ nghĩa
            </Text>
          </View>
          <View className="mb-4">
            <Text className="text-[40px] font-semibold text-colorBrownDarkLV2">
              {curentAnwser?.vie}
            </Text>
          </View>
          <View className="w-[100%] flex justify-center items-center">
            <TextInput
              value={alphabetVocaChoose.join("")}
              className="w-[90%] h-[40px] pl-[8px] text-[25px] border-[1px] border-gray-700 rounded-lg"
            ></TextInput>
          </View>
        </View>
        <View className="flex flex-row gap-6 flex-wrap justify-center items-center mt-5">
          {curentAnwser &&
            _.shuffle(curentAnwser?.eng.split(""))?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => handleAddReply(item)}
                  key={index}
                >
                  <View className="w-12 h-12 flex justify-center items-center rounded-md bg-colorBrownDarkLV2">
                    <Text className="text-gray-50 text-[26px]">{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
        <View className="flex-row gap-8 justify-center items-center mt-6">
          <TouchableOpacity
            onPress={() => deleteAllSelectAlphabetVocaChoose()}
            className="w-[100px] flex justify-center items-center rounded-md h-[40px] bg-colorBrownDarkLV2"
          >
            <Text className="text-[22px] text-gray-50">Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectAlphabetVocaChoose(curentAnwser?.eng)}
            className="w-[100px] flex justify-center items-center rounded-md h-[40px] bg-colorBrownDarkLV2"
          >
            <Text className="text-[22px] text-gray-50">Gợi ý</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default MatchAlphabetScreen;
