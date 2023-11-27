import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
const ChatGPTScreen = () => {
  const [data, setData] = useState([]);
  const api_key = "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";
  const api_url =
    "https://api.openai.com/v1/engines/text-davinci-002/completions";
  const [dataTextInput, setDataTextInput] = useState("");
  const handleSendQuestion = async () => {
    const prompt = dataTextInput;
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
          Authorization: `Bearer ${api_key}`,
        },
      }
    );
    const text = rs.data.choices[0].text;
    setData([
      ...data,
      { type: "user", text: dataTextInput },
      { type: "bot", text: text },
    ]);
    setDataTextInput("");
  };
  return (
    <View>
      <View className="mt-7 justify-center flex ml-5">
        <Text className="text-red-600">ChatGPTScreen</Text>
      </View>
      <View>
        <ScrollView>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", padding: 10 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: item.type === "user" ? "green" : "red",
                  }}
                >
                  {item.type === "user" ? "Niza" : "Boot"}
                </Text>
                <Text>{item.text}</Text>
              </View>
            )}
          ></FlatList>
        </ScrollView>
        <View className="mt-80">
          <View>
            <TextInput
              value={dataTextInput}
              onChangeText={(value) => setDataTextInput(value)}
              placeholder="Assk me"
            ></TextInput>
          </View>
          <View>
            <TouchableOpacity onPress={handleSendQuestion}>
              <Text>Send ask</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatGPTScreen;
