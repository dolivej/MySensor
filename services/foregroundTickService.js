import BackgroundTimer from 'react-native-background-timer';

/* 
 Here are the methods for the timer, it relies on the package react-native-background-timer, please see the docs for more info
*/

//general timer (DOESNT WORK WITH FUNCTIONAL COMPONENT USESTATE, ONLY WORKS WITH CLASS COMPONENTS STATE)
export const startForegroundTick = (listener, time) => {
  BackgroundTimer.runBackgroundTimer(() => {
    listener();
  }, time);
};

export const endForegroundTick = () => {
  BackgroundTimer.stopBackgroundTimer();
};

//specific timers, whith IDs for starting and stopping
