import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import randomNumber from "../funcntionSupport/randomNumber";
import { useSelector } from "react-redux";
import { useVocabulary } from "../hooks/useVocabulary";
import Modal from "react-native-modal";
import { Audio } from "expo-av";
import LottieView from "lottie-react-native";
const _ = require("lodash");

function removeDuplicates(arr) {
  return Array.from(new Set(arr.map(JSON.stringify))).map(JSON.parse);
}

const ConnectVocaGameScreen = () => {
  const [isStart, setIsStart] = useState(false);
  const [listVoCaTest, setListVocaTest] = useState([]);
  const [listVocaTestCurrent, setListVocaTestCurrent] = useState([]);
  const [listVocaTestCurrent2, setListVocaTestCurrent2] = useState([]);
  const [chooseOne, setChooseOne] = useState("");
  const [chooseTwo, setChooseTwo] = useState("");
  // const [isShowErr, setIsShowErr] = useState(false);
  const arrList = useRef();
  const arrList2 = useRef();
  const { token } = useSelector((state) => state.auth);
  const { fetchListVocabularyLearnedTest } = useVocabulary();
  useEffect(() => {
    (async () => {
      const dataLearned = await fetchListVocabularyLearnedTest(token);
      if (dataLearned) {
        setListVocaTest(dataLearned?.data);
      }
    })();
  }, []);
  useEffect(() => {
    // setIsShowErr(false);
    arrList.current = randomNumber(8, listVoCaTest?.length);
    arrList2.current = _.shuffle(arrList.current);
  }, [listVoCaTest]);

  const handleStart = () => {
    setIsStart(true);
    // setIsShowErr(false);
    let listVoca = [];
    let listVocaTwo = [];
    arrList.current?.map((item) => {
      listVoca.push({ ...listVoCaTest[item], isCorrect: false });
    });
    arrList2.current?.map((item) => {
      listVocaTwo.push({ ...listVoCaTest[item], isCorrect: false });
    });
    setListVocaTestCurrent(removeDuplicates(listVoca));
    setListVocaTestCurrent2(removeDuplicates(listVocaTwo));
  };

  useEffect(() => {
    if (chooseOne?.vie === chooseTwo?.vie) {
      (async () => {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/audio/congratulation.mp3")
        );
        await sound.playAsync();
      })();
      const objChooseOne = listVocaTestCurrent.find(
        (item) => item?._id === chooseOne?._id
      );
      const objChooseTwo = listVocaTestCurrent2.find(
        (item) => item?._id === chooseTwo?._id
      );
      if (objChooseOne || chooseTwo) {
        objChooseOne.isCorrect = true;
        objChooseTwo.isCorrect = true;
      }
    } else {
      return;
    }
  }, [chooseOne, chooseTwo]);

  const handleContinue = () => {
    arrList.current = randomNumber(8, listVoCaTest?.length);

    arrList2.current = _.shuffle(arrList.current);

    let listVoca = [];
    let listVocaTwo = [];
    arrList.current?.map((item) => {
      listVoca.push({ ...listVoCaTest[item], isCorrect: false });
    });
    arrList2.current?.map((item) => {
      listVocaTwo.push({ ...listVoCaTest[item], isCorrect: false });
    });
    setListVocaTestCurrent(removeDuplicates(listVoca));
    setListVocaTestCurrent2(removeDuplicates(listVocaTwo));
  };

  return (
    <View>
      <View className="w-screen relative  bg-red-400">
        <ImageBackground
          source={require("../assets/bg.png")}
          resizeMode="cover"
          className=" w-screen h-screen"
        >
          <View className="flex-col flex-1 justify-center items-center mt-[20px]">
            {/* {isShowErr ? (
              <Text className="mb-2 text-[16px] text-red-600 font-semibold">
                Vui lòng chọn từ phù hợp
              </Text>
            ) : (
              <Text></Text>
            )} */}
            {isStart ? (
              <View className="flex-col justify-center items-center">
                <View className="flex-row">
                  <View>
                    {listVocaTestCurrent?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          className={`w-[140px] flex justify-center items-center my-2 h-[50px] ${
                            !!item?.isCorrect
                              ? "bg-colorBrownSlightLV3"
                              : "bg-colorBrownDarkLV2"
                          } rounded-md mx-2`}
                          onPress={() => {
                            // setIsShowErr(false);
                            setChooseOne(item);
                          }}
                          key={index}
                        >
                          <Text className="text-colorWhite text-[20px]">
                            {item?.eng}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <View>
                    {listVocaTestCurrent2?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          className={`w-[140px] flex justify-center items-center my-2 h-[50px] ${
                            !!item?.isCorrect
                              ? "bg-colorBrownSlightLV3"
                              : "bg-colorBrownDarkLV2"
                          } rounded-md mx-2`}
                          onPress={() => setChooseTwo(item)}
                          key={index}
                        >
                          <Text className="text-colorWhite text-[20px]">
                            {item?.vie}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                {/* <Modal isVisible={isModalVisible}>
                  <View>
                    <Text>Đáp án sai!</Text>
                    <TouchableOpacity onPress={toggleModal}>
                      <Text>Đóng</Text>
                    </TouchableOpacity>
                  </View>
                </Modal> */}
                <View className="w-[250px] rounded-3xl flex justify-center items-center h-[40px] bg-white mt-5">
                  <TouchableOpacity onPress={handleContinue}>
                    <Text className="text-colorYellowMain text-[17px] font-bold">
                      Kiểm tra từ khác
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View className="flex-col justify-center items-center">
                <View className="mb-4">
                  <LottieView
                    className="w-[280px] h-[280px]"
                    source={require("../assets/a2.json")}
                    autoPlay
                    loop
                  />
                </View>
                <TouchableOpacity
                  className="w-[160px] h-[44px] flex justify-center items-center shadow-md
                       bg-colorBrownDarkLV2 rounded-3xl"
                  onPress={handleStart}
                >
                  <Text className="text-colorWhite font-bold text-[23px]">
                    Bắt đầu
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ConnectVocaGameScreen;
