import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import Home from '../app/screen/authentication/tabHome';
import {MainScreen} from './authen';
import {createStackNavigator} from '@react-navigation/stack';

const RootStackNavigator = createStackNavigator();

export const RootNavigator = () => {
  return (
    <RootStackNavigator.Navigator headerMode={'none'} screenOptions={{}}>
      <RootStackNavigator.Screen name={'MainScreen'} component={MainScreen} />
    </RootStackNavigator.Navigator>
  );
};
