import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RootNavigator} from './RootNavigator';
import Home from '../app/screen/authentication/tabHome';
import {NavigationContainer} from '@react-navigation/native';


const AppNavigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
