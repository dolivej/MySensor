/* 
 Here are the methods relating to BLE devices
 It relies on react-native-ble-plx, please see the docs for more details
*/

import {BleManager} from 'react-native-ble-plx';

/* Create new BleManager */
export const manager = new BleManager({
  restoreStateIdentifier: 'com.mysensor',
  restoreStateFunction: (restoredState) => {
    if (restoredState != null) {
      console.log('remembers devices');
    }
  },
});

///////// SCANNING ////////////
export const enable = () => {
  try {
    return manager.enable();
  } catch (error) {
    console.log(error);
  }
};

export const scan = (listener) => {
  try {
    manager.startDeviceScan(null, {scanMode: 'LowLatency'}, listener);
  } catch (error) {
    console.log(error);
  }
};

export const stopScan = () => {
  manager.stopDeviceScan();
};

///////// CONNECTING / DISCONNECTING ////////////
export const isDeviceConnectedToApp = (deviceId) => {
  return manager.isDeviceConnected(deviceId);
};

export const disconnectDevice = (deviceId) => {
  return manager.cancelDeviceConnection(deviceId);
};

export const connectDevice = (deviceId) => {
  return manager.connectToDevice(deviceId);
};

/////// SERVICES / CHARACTERISTICS /////////////
export const discoverSC = (deviceId) => {
  return manager.discoverAllServicesAndCharacteristicsForDevice(deviceId);
};

export const readSC = (deviceId, serviceUUID, charUUID) => {
  return manager.readCharacteristicForDevice(deviceId, serviceUUID, charUUID);
};

export const writeSC = (deviceId, serviceUUID, charUUID, value) => {
  return manager.writeCharacteristicWithoutResponseForDevice(
    deviceId,
    serviceUUID,
    charUUID,
    value,
  );
};
