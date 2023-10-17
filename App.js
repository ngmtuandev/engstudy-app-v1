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
const Stack = createNativeStackNavigator();

export default function App() {
const [token, setToken] = useState(null)
useEffect(() => {
  (async() => {
    const getToken = await AsyncStorage.getItem("USER_LOGIN")
    setToken(getToken)
  })()
  console.log('token login >>>', token)
}, [token])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View className='flex-1'>
          <NavigationContainer>
            {
              token ? <Stack.Navigator initialRouteName='AddVoca'>
              <Stack.Screen name='AddVoca' component={AddVocaScreen} options={{headerShown: false}}></Stack.Screen>
            </Stack.Navigator> : <Stack.Navigator initialRouteName='Register'>
              <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
              <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            </Stack.Navigator> 
            }
          </NavigationContainer>
          <StatusBar style="auto" />
        </View>
      </PersistGate>
    </Provider>
  );
}


