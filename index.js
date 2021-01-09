/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BackgroundFetch from 'react-native-background-fetch';
import {
  backgroundTask,
  backgroundTaskConfigure,
} from './services/backgroundService';

backgroundTaskConfigure();

BackgroundFetch.registerHeadlessTask(backgroundTask);
AppRegistry.registerComponent(appName, () => App);
