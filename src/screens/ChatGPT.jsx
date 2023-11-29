import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

const ChatGPT = () => {
  const [data, setData] = useState([]);
  const [avoid, setAvoid] = useState(false);
  const api_url =
    "https://api.openai.com/v1/engines/text-davinci-002/completions";
  const [dataTextInput, setDataTextInput] = useState("");
  const handleSendQuestion = async () => {
    console.log("click");
    const prompt = dataTextInput;

    try {
      const rs = await axios.post(
        api_url,
        {
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
          },
        }
      );
      console.log("rs : ", rs);
      const text = rs.data.choices[0].text;
      console.log('text response : ', text)
      setData([
        ...data,
        { type: "user", text: dataTextInput },
        { type: "bot", text: text },
      ]);
      setDataTextInput("");
      setAvoid(false)
    } catch (error) {
      console.error("Error in API request:", error);
    }
  };
  return (
    <ImageBackground
          source={require("../assets/bgl.png")}
          resizeMode="cover"
          className="w-screen h-screen"
        >
    <View>
      <View className="mt-20 justify-center flex ml-5">
        <Text className="font-bold text-[30px] text-yellow-400">Học cùng EngStudy</Text>
        <Text className="text-[13px] mb-4">Trò chuyện cùng EngStudy ChatBoot để cải thiện ngôn ngữ</Text>
      </View>
      <View>
        <View className='h-[500px] '>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ScrollView>
              <View className='flex flex-row'>
              <Text
                style={{
                  fontWeight: "bold",
                  color: item.type === "user" ? "green" : "red",
                  marginRight: 10,
                }}
              >
                {item.type === "user" ? "Niza" : "EngStudy"}
              </Text>
              <Text>{item.text}</Text>
            </View>
            </ScrollView>
          )}
        ></FlatList>
        </View>
        <View className={`mt-[10px] w-[100%] flex-col justify-center items-center ${avoid && '-mt-[220px] '}`}>
          <View className='w-[350px] h-[50px] flex justify-center items-center border-[1px] rounded-md'>
            <TextInput
            onFocus={() => setAvoid(true)}
            onBlur={() => setAvoid(false)}
              className="pl-[4px]"
              value={dataTextInput}
              onChangeText={(value) => setDataTextInput(value)}
              placeholder="Hỏi EngStudy nhé"
            ></TextInput>
          </View>
          <View className='w-[350px] h-[40px] rounded-md mt-4 flex justify-center items-center bg-yellow-400'>
            <TouchableOpacity onPress={handleSendQuestion}>
              <Text className='text-gray-100 text-[22px]'>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    </ImageBackground>
  );
};

export default ChatGPT;
