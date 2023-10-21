import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import BottomTab from '../component/BottomTab'
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
// import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const data = [
  { year: '2011', earnings: 13000 },
  { year: '2012', earnings: 16500 },
  { year: '2013', earnings: 14250 },
  { year: '2014', earnings: 19000 }
 ];


const ChartScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const currentScreenName = route.name;
  const dispatch = useDispatch()
  useEffect(() => {
    (async() => {
      const dt = await AsyncStorage.getItem('USER_LOGIN')
      console.log('dttt : ', dt)
    })()
  }, [])
  return (
    <View>
      <View className='w-screen relative h-screen  bg-red-400'>
            <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" 
            className=' w-screen h-screen'>
                  {/* <VictoryChart width={350} theme={VictoryTheme.material}>
                    <VictoryBar data={data} x="quarter" y="earnings" />
                  </VictoryChart> */}
            </ImageBackground>
        
        </View>
      <Text>ChartScreen</Text>
    </View>
  )
}




// <View className='flex-col flex-1 mt-16'>
//                   <View className=' bg-slate-800'>
//                     <TouchableOpacity onPress={() => {
//                         dispatch(logout())
//                         navigation.navigate('Login')
//                     }}>
//                       <Text>Logout</Text>
//                     </TouchableOpacity>
//                   </View>
//                   <BottomTab currentScreenName = {currentScreenName}></BottomTab>
//                 </View>

export default ChartScreen