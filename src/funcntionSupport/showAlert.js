import { Alert } from "react-native";

export const showAlert = (text, anwser, choose) => {
  Alert.alert(text, anwser, [
    // {
    //   text: "Không",
    //   style: "cancel",
    // },
    {
      text: choose ? choose : "Thêm từ vựng",
      // onPress: onDelete,
      style: "destructive",
    },
  ]);
};
