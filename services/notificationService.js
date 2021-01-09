import PushNotification from 'react-native-push-notification';

/* 
 Here are the methods for local notifications, it relies on react-ative-push-notifications, please see the docs for more details.
*/

export const createNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'mysensor', // (required)
      channelName: 'mysensor', // (required)
      channelDescription: 'mysensor NOTIFICATIONS', // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};

export const createPersistentNotification = (title, message, id) => {
  PushNotification.localNotification({
    /* Android Only Properties */
    channelId: 'mysensor',
    id: id,

    /* iOS and Android properties */
    title: title, // (optional)
    message: message, // (required)
    playSound: false, // (optional) default: true
    vibrate: false,
  });
};

export const createNotification = (title, message) => {
  PushNotification.localNotification({
    /* Android Only Properties */
    channelId: 'mysensor',

    /* iOS and Android properties */
    title: title, // (optional)
    message: message, // (required)
    playSound: true, // (optional) default: true
    vibrate: true,
  });
};

export const updatePersistentNotification = (title, message, id) => {
  PushNotification.cancelLocalNotifications({id: id});
  createPersistentNotification(title, message, id);
};
