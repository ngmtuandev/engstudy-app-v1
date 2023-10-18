import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RegisterScreen from './src/screens/RegisterScreen';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddVocaScreen from './src/screens/AddVocaScreen';
import { useSelector } from 'react-redux';
import LearnVocaScreen from './src/screens/LearnVocaScreen';
import PostScreen from './src/screens/PostScreen';
import TestVocaScreen from './src/screens/TestVocaScreen';
import ChartScreen from './src/screens/ChartScreen';
const Stack = createNativeStackNavigator();

export default function App() {
const [tokenLogin, setTokenLogin] = useState(null)
// const {dataUser, token} = useSelector(state => state.auth)
// console.log('tk >>', tk)
useEffect(() => {
  (async() => {
    const getToken = await AsyncStorage.getItem("USER_LOGIN")
    setTokenLogin(getToken)
  })()
  // console.log('token login >>>', tokenLogin)
}, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View className='flex-1'>
          <NavigationContainer>
            {
              <Stack.Navigator initialRouteName={tokenLogin ? 'AddVoca' : 'Login'}>
                <Stack.Screen name='AddVoca' component={AddVocaScreen} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Learn" component={LearnVocaScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Post" component={PostScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Test" component={TestVocaScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Chart" component={ChartScreen} options={{headerShown: false}}/>
              </Stack.Navigator> 
            }
          </NavigationContainer>
          <StatusBar style="auto" />
        </View>
      </PersistGate>
    </Provider>
  );
}


