/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import store from './src/redux';
import notifee, {EventType, AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('Message handled in the background!', remoteMessage);
  DisplayNotification(remoteMessage);
});
async function DisplayNotification(remoteMessage) {
  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'default-outter',
    name: 'Default Channel outter',
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    android: {
      channelId,
    },
  });
}
notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    await notifee.cancelNotification(detail.notification?.id);
  } else if (type === EventType.DISMISSED) {
    await notifee.cancelNotification(detail.notification?.id);
  }
});

const MainApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => MainApp);
