import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import RegisterScreen from "./src/screens/RegisterScreen";
import { Provider } from "react-redux";
import { store, persistor } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddVocaScreen from "./src/screens/AddVocaScreen";
import { useSelector } from "react-redux";
import LearnVocaScreen from "./src/screens/LearnVocaScreen";
import PostScreen from "./src/screens/PostScreen";
import TestVocaScreen from "./src/screens/TestVocaScreen";
import ChartScreen from "./src/screens/ChartScreen";
import { SCREEN_NAME } from "./src/constants/screens";
import LearnItemVocaOne from "./src/screens/LearnItemVocaOne";
import ConnectVocaGameScreen from "./src/screens/ConnectVocaGameScreen";
import OptionVocaScreen from "./src/screens/OptionVocaScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "./src/screens/ProfileScreen";
import { logout } from "./src/store/authSlice";
import LogoutScreen from "./src/screens/LogoutScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import EditProfile from "./src/screens/EditProfile";
import EditInfo from "./src/screens/EditInfo";
import DetailPostScreen from "./src/screens/DetailPostScreen";
import MatchAlphabetScreen from "./src/screens/MatchAlphabetScreen";
import ChatScreen from "./src/screens/ChatScreen";
import DetailUser from "./src/screens/DetailUser";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function App() {
  const [tokenLogin, setTokenLogin] = useState(null);
  // const {dataUser, token} = useSelector(state => state.auth)
  // console.log('tk >>', tk)
  useEffect(() => {
    (async () => {
      const getToken = await AsyncStorage.getItem("USER_LOGIN");
      setTokenLogin(getToken);
    })();
    // console.log('token login >>>', tokenLogin)
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View className="flex-1">
          <NavigationContainer>
            {
              <Stack.Navigator initialRouteName={SCREEN_NAME.LOGIN}>
                <Stack.Screen
                  name={SCREEN_NAME.ADDVOCA}
                  component={AddVocaScreen}
                  options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen
                  name={SCREEN_NAME.CHAT}
                  component={ChatScreen}
                  options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen
                  name={SCREEN_NAME.WELCOME}
                  component={WelcomeScreen}
                  options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen
                  name={SCREEN_NAME.LOGIN}
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SCREEN_NAME.REGISTER}
                  component={RegisterScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SCREEN_NAME.EDIT}
                  component={EditInfo}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SCREEN_NAME.LEARN}
                  component={LearnVocaScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SCREEN_NAME.DETAIL_POST}
                  component={DetailPostScreen}
                  options={{ headerShown: true }}
                />
                <Stack.Screen
                  name={SCREEN_NAME.POST}
                  component={PostScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SCREEN_NAME.TEST}
                  component={TestVocaScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SCREEN_NAME.CHART}
                  component={ChartScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SCREEN_NAME.MATCH_ALPHABET}
                  component={MatchAlphabetScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="EditProfile"
                  component={EditProfile}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SCREEN_NAME.ITEM_VOCA}
                  component={LearnItemVocaOne}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SCREEN_NAME.CONNECT_VOCA}
                  component={ConnectVocaGameScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SCREEN_NAME.OPTION_VOCA}
                  component={OptionVocaScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SCREEN_NAME.DETAIL_USER}
                  component={DetailUser}
                  options={{ headerShown: false }}
                />
                {/* <Drawer.Screen
                  options={{ headerShown: false }}
                  name="Logout"
                  // options={{
                  //   drawerLabel: "Logout",
                  // }}
                  component={LogoutScreen} */}
                {/* /> */}
              </Stack.Navigator>
            }
          </NavigationContainer>
          <StatusBar style="auto" />
        </View>
      </PersistGate>
    </Provider>
  );
}
