import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import TestVocaScreen from "../screens/TestVocaScreen";
import { SCREEN_NAME } from "../constants/screens";

const MyDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName={SCREEN_NAME.ADDVOCA}>
      <Drawer.Screen name={SCREEN_NAME.PROFILE} component={ProfileScreen} />
      <Drawer.Screen name={SCREEN_NAME.TEST} component={TestVocaScreen} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
