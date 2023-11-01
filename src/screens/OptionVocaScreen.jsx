import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
const _ = require("lodash");
import { useVocabulary } from "../hooks/useVocabulary";
import { useSelector } from "react-redux";
import randomNumber from "../funcntionSupport/randomNumber";
import { Audio } from "expo-av";
import SvgIcon from "../assets/useSVG";
const OptionVocaScreen = () => {
  const [listVoCaTest, setListVocaTest] = useState([]);
  const [answer, setAnswer] = useState();
  const [listOption, setListOption] = useState([]);
  const [option, setOption] = useState();
  const [isSoundOn, setIsSoundOn] = useState(true);

  const { token } = useSelector((state) => state.auth);
  const { fetchListVocabularyLearnedTest } = useVocabulary();
  const { SoundOffSVG, SoundOnSVG } = SvgIcon;
  const lengthList = useRef(0);
  const listFourOption = useRef([]);
  const isCorrectAnsswer = useRef();
  const questionCurrent = useRef(0);
  useEffect(() => {
    (async () => {
      const dataLearned = await fetchListVocabularyLearnedTest(token);
      if (dataLearned) {
        lengthList.current = dataLearned?.data?.length;
        setListVocaTest(dataLearned?.data);
        setAnswer(dataLearned?.data[questionCurrent.current]);
        // console.log('dataLearned?.data[0]', dataLearned?.data[0]?.vie)
        setListOption((listOption) => [
          ...listOption,
          dataLearned?.data[0]?.vie,
        ]);
      }
    })();
  }, []);

  useEffect(() => {
    if (listVoCaTest) {
      // console.log('set anser')
      randomNumber(3, lengthList.current)?.map((item) => {
        setListOption((listOption) => [...listOption, listVoCaTest[item]?.vie]);

        isCorrectAnsswer.current = answer?.vie;
      });
    } else {
      console.log("data lỗi");
    }
  }, [answer]);

  listFourOption.current = _.shuffle(listOption?.slice(3, 7));

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  const handleOption = async (item) => {
    // console.log('item option : ', item)
    if (item === isCorrectAnsswer.current) {
      // console.log('chính xác')
      if (isSoundOn) {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/audio/congratulation.mp3")
        );
        await sound.playAsync();
      }
      questionCurrent.current = +questionCurrent.current + 1;
      // console.log(" questionCurrent.current : ", questionCurrent.current);
      // console.log(
      //   "listVoCaTest[questionCurrent.current]",
      //   listVoCaTest[questionCurrent.current]?.vie
      // );
      setAnswer(() => listVoCaTest[questionCurrent.current]);
      randomNumber(3, lengthList.current)?.map((item) => {
        setListOption((listOption) => [...listOption, listVoCaTest[item]?.vie]);
      });
      // console.log("list option >>>", listOption);
      listFourOption.current = _.shuffle(listOption?.slice(3, 7));
      setListOption([
        ...listFourOption.current,
        listVoCaTest[questionCurrent.current]?.vie,
      ]);
    } else {
      if (isSoundOn) {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/audio/fail.mp3")
        );
        // setSound(sound);
        await sound.playAsync();
      }
      return;
    }
  };

  return (
    <View>
      <ImageBackground
        source={require("../assets/bg.png")}
        resizeMode="cover"
        className=" w-screen h-screen "
      >
        <View className="flex justify-center items-center">
          <View className="mt-28 flex justify-center items-center">
            <View className="mb-4">
              <TouchableOpacity onPress={() => setIsSoundOn(!isSoundOn)}>
                {isSoundOn ? (
                  <SoundOnSVG width="65" height="65"></SoundOnSVG>
                ) : (
                  <SoundOffSVG width="65" height="65"></SoundOffSVG>
                )}
              </TouchableOpacity>
            </View>
            <Text className="font-bold text-[27px] text-colorBrownDarkLV2">
              Chọn nghĩa của từ:
            </Text>
            <Text className="text-[45px] my-6 text-colorBrownBold font-bold">
              {answer?.eng}
            </Text>
          </View>
          <View className="grid grid-cols-2 gap-4 ">
            {_.shuffle(listFourOption?.current).map((item, index) => {
              return (
                <View
                  key={index}
                  className="w-[240px] rounded-xl justify-center 
                items-center h-[50px] bg-colorBrownDarkLV2 mx-1"
                >
                  <TouchableOpacity onPress={() => handleOption(item)}>
                    <Text className="text-colorWhite font-bold text-[17px]">
                      {item}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OptionVocaScreen;
