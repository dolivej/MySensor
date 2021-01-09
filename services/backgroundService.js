import BackgroundFetch from 'react-native-background-fetch';
import {createNotification} from './notificationService';

/*

  Here are the methods relating to background tasks
  This makes use of the react-native-background-fetch library 

  The methods below are called in index.js and starts two different background tasks (one for when the app is in the foreground and one fore when the app is closed)

  See the docs for more details
  
*/

export const backgroundTaskConfigure = () => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
      // Android options
      forceAlarmManager: true, // <-- Set true to bypass JobScheduler.
      stopOnTerminate: false,
      startOnBoot: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
      requiresCharging: false, // Default
      requiresDeviceIdle: false, // Default
      requiresBatteryNotLow: false, // Default
      requiresStorageNotLow: false, // Default
      periodic: true,
      enableHeadless: true,
      stopOnTerminate: false,
    },
    async (taskId) => {
      console.log('[js] Received background-fetch event: ', taskId);
      createNotification('TestBackground', 'TestBackground');
      BackgroundFetch.finish(taskId);
    },
    (error) => {
      console.log('[js] RNBackgroundFetch failed to start');
    },
  );

  // Optional: Query the authorization status.
  BackgroundFetch.status((status) => {
    switch (status) {
      case BackgroundFetch.STATUS_RESTRICTED:
        console.log('BackgroundFetch restricted');
        break;
      case BackgroundFetch.STATUS_DENIED:
        console.log('BackgroundFetch denied');
        break;
      case BackgroundFetch.STATUS_AVAILABLE:
        console.log('BackgroundFetch is enabled');
        break;
    }
  });
};

export const backgroundTask = async (event) => {
  let taskId = event.taskId;
  console.log('[BackgroundFetch HeadlessTask] start: ', taskId);
  createNotification('Test Background Task', 'This is a test background task');
  BackgroundFetch.finish(taskId);
};
