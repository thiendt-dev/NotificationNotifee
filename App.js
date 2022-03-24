import React, {useEffect} from 'react';
import {
  Button,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {localNotificationService} from './src/library/utils/firebase/LocalNotificationService';
import {fcmService} from './src/library/utils/firebase/FCMService';
import codePush from 'react-native-code-push';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};
const App = () => {
  const onButtonPress = () => {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  };

  useEffect(() => {
    onButtonPress();
    getFcmToken();
    requestUserPermission();
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   console.log('remoteMessage', JSON.stringify(remoteMessage));
    //   displayNotification(remoteMessage);
    //   bootstrap().then().catch(console.error);
    //   // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //   return notifee.onForegroundEvent(({type, detail}) => {
    //     switch (type) {
    //       case EventType.DISMISSED:
    //         // onPressNotification(detail.notification);
    //         console.log('detail EventType DISMISSED', detail);
    //         break;
    //       case EventType.PRESS:
    //         console.log('detail EventType PRESS', detail);

    //         // onDismissNotification(detail.notification);
    //         break;
    //     }
    //   });
    // });

    // return unsubscribe;
    // fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);

    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister: ', token);
    }

    function onNotification(remoteMessage) {
      console.log('[App] onNotification: ', remoteMessage);
      const notify = remoteMessage.notification;
      const options = {
        soundName: 'default',
        playSound: true,
        largeIcon: 'ic_notification',
        smallIcon: 'ic_notification',
        color: '#93b64c',
      };
      localNotificationService.showNotification(
        notify.messageId,
        notify.title,
        notify.body,
        notify,
        options,
        remoteMessage,
      );
    }

    async function onOpenNotification(remoteMessage) {
      console.log('[App] onOpenNotification: ', remoteMessage);
    }

    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);

  // Bootstrap sequence function
  // async function bootstrap() {
  //   const initialNotification = await notifee.getInitialNotification();

  //   if (initialNotification) {
  //     console.log(
  //       'Notification caused application to open',
  //       initialNotification.notification,
  //     );
  //     console.log(
  //       'Press action used to open the app',
  //       initialNotification.pressAction,
  //     );
  //   }
  // }

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
        // smallIcon: 'ic_small_icon',
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
      <Button
        title="Display Notification"
        onPress={() => localDisplayNotification()}
      />
      <Button
        title="Check for updates"
        onPress={() => onButtonPress()}></Button>
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

export default codePush(codePushOptions)(App);
