import { Alert } from "react-native";

export const showAlert = (text, anwser) => {
    Alert.alert(
      text,
      anwser,
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Thêm từ vựng',
          // onPress: onDelete,
          style: 'destructive',
        },
      ],

    );
  };

