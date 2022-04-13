import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Config from 'react-native-config';

const Home = () => {
  console.log('Config', Config);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontFamily: 'Updock-Regular',
          fontSize: 20,
          color: '#000',
        }}>
        tab home
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
