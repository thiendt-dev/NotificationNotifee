import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../app/screen/authentication/tabHome';
import Profile from '../../app/screen/authentication/tabProfile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

export const MainScreen = () => {
  return (
    <Tab.Navigator headerMode={'none'} screenOptions={{}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
