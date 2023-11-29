import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import BottomTab from "../component/BottomTab";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVocabulary } from "../hooks/useVocabulary";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import BoxInChart from "../component/BoxInChart";
import Drawer from "../component/Drawer";

const ChartScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const currentScreenName = route.name;
  const { token } = useSelector((state) => state.auth);
  // const totalVoca = useRef(0);
  // const totalVocaFinish = useRef(0);
  // const totalVocaLearning = useRef(0);
  const [totalVoca, setTotalVoca] = useState(0);
  const [totalVocaFinish, setTotalVocaFinish] = useState(0);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [totalVocaLearning, setTotalVocaLearning] = useState(0);
  const { fetchListVocabulary, fetchListVocabularyLearnedTest } =
    useVocabulary();

  useEffect(() => {
    (async () => {
      const data = await fetchListVocabulary(token);
      if (data) {
        setTotalVoca(data?.data.length);
        setTotalVocaLearning(
          data?.data.filter((item) => item?.status === false)?.length
        );
      }
      const vocaFinish = await fetchListVocabularyLearnedTest(token);
      if (vocaFinish) {
        setTotalVocaFinish(vocaFinish?.data.length);
      }
      // console.log("vocaFinish >>>>", vocaFinish?.data.length);
    })();
  }, []);

  // console.log("totalVocaFinish.current", totalVocaFinish.current);
  // console.log("totalVoca.current", totalVoca.current);
  console.log("totalVocaLearning.current", totalVocaLearning.current);

  useEffect(() => {
    (async () => {
      const dt = await AsyncStorage.getItem("USER_LOGIN");
      // console.log("dttt : ", dt);
    })();
  }, []);
  console.log("total - finish", totalVoca - totalVocaFinish);
  return (
    <View>
      <View className="w-screen relative h-screen  bg-red-400">
        <ImageBackground
          source={require("../assets/bg.png")}
          resizeMode="cover"
          className=" w-screen h-screen"
        >
          {/* {isOpenDrawer && <Drawer></Drawer>} */}
          <View className="flex-col mt-28 items-center flex-1">
            {/* <View>
              <TouchableOpacity
                onPress={() => {
                  setIsOpenDrawer(true);
                }}
              >
                <Text>Open drawer</Text>
              </TouchableOpacity>
            </View> */}
            <View className="flex justify-center items-center">
              <Text className="text-[28px] font-bold text-gray-800 mb-5">
                Biểu đồ thống kê
              </Text>
              <View className="flex-row text-black justify-between">
                <BoxInChart
                color = 'black'
                  data={totalVocaFinish}
                  text={"Từ đã thuộc"}
                ></BoxInChart>
                <BoxInChart data={totalVoca} text={"Từ đã thêm"}></BoxInChart>
              </View>
              <LineChart
                data={{
                  labels: ["Tổng từ", "Đã thuộc", "Đang học", "Mục tiêu"],
                  datasets: [
                    {
                      data: [
                        totalVoca !== 0 ? totalVoca : 20,
                        totalVocaFinish !== 0 ? totalVocaFinish : 20,
                        totalVocaLearning !== 0 ? totalVocaLearning : 20,
                        50,
                      ],
                    },
                  ],
                }}
                width={380} // from react-native
                height={220}
                // yAxisLabel="$"
                yAxisSuffix=" từ"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#765827",
                  backgroundGradientFrom: "#C8AE7D",
                  backgroundGradientTo: "#765827",
                  decimalPlaces: 0, // optional, defaults to 2dp 2 => 10.00
                  color: (opacity = 2) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                    padding: 20,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
            <BottomTab currentScreenName={currentScreenName}></BottomTab>
          </View>
        </ImageBackground>
      </View>
      <Text>ChartScreen</Text>
    </View>
  );
};

export default ChartScreen;
