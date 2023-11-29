import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { TouchableOpacity, Text, ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { auth, database } from "../untils/configFireBase";
import { useNavigation } from "@react-navigation/native";

export default function Chat({ route }) {
  const [messages, setMessages] = useState([]);
  const [userCurrent, setUserCurrent] = useState();
  const { token } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const { fetchUserCurrent } = useAuth();
  useEffect(() => {
    (async () => {
      const rs = await fetchUserCurrent(token);
      if (rs) {
        setUserCurrent(rs?.data);
      }
    })();
  }, []);
  const { idRevived } = route.params;
  console.log("idRevived : ", idRevived);
  console.log("idSend : ", userCurrent?._id);

  useEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsubscribe");
      const updatedMessages = querySnapshot.docs.map((doc) => ({
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      }));
      setMessages(updatedMessages);
    });

    return () => {
      console.log("unsubscribe");
      unsubscribe();
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    // setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
      receiverId: idRevived, // 6559f886d0c119b915dea65a // 655afc2ed6096fe20dd78e20
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={(messages) => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
      textInputStyle={{
        backgroundColor: "#fff",
        borderRadius: 20,
      }}
      user={{
        _id: userCurrent?._id, // 655afc2ed6096fe20dd78e20 // 6559f886d0c119b915dea65a
        avatar: userCurrent?.avatar || "https://i.pravatar.cc/300",
      }}
    />
  );
}
