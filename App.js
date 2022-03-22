import React, {useEffect} from 'react';
import {Button, StyleSheet, View, Alert} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    getFcmToken();
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage', JSON.stringify(remoteMessage));
      displayNotification(remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
  };

  const getFcmToken = async () => {
    await messaging()
      .getToken()
      .then(token => {
        console.log('fcm token ', token);
      });
  };

  async function displayNotification(remoteMessage) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      badge: true,
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage?.notification?.title,
      body: remoteMessage?.notification?.body,
      android: {
        channelId,
        // Reference the name created (Optional, defaults to 'ic_launcher')
        smallIcon: 'ic_small_icon',
        // Set color of icon (Optional, defaults to white)
        // color: '#9c27b0',
      },
    });
  }

  async function localDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title="Display Notification"
        onPress={() => localDisplayNotification()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
