/*

Device Screens:
-> <DeviceSummary/> (Dynamic screen that shows either scanning/connecting or device details based on if there is a connected device)

This is where the user will go to
-> Scan/Connect to BLE Devices
-> See details of connected BLE Devices
-> Read/Write to BLE devices

This section makes use the the methods found in bleService.js
The methods from bleService.js can be run anywhere

*/

import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {COLORS, FONTS, SIZES} from '../constants';
import {NavHeader} from '../components/';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  scan,
  stopScan,
  enable,
  isDeviceConnectedToApp,
} from '../services/bleService';
import {ProjectZero} from '../constants/deviceConfig';

const Stack = createStackNavigator();

// Device Summary section, if no device is connected shows a scan and connect screen, otherwise shows details about the connected device
// Makes use the the methods in bleService for connected/scanning and read/write to BLE devices
const DeviceSummary = ({navigation}) => {
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scannedDevices, setScannedDevices] = useState([]);

  const renderHeaderNoDevice = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          padding: SIZES.padding,
        }}>
        <Text style={{color: COLORS.primary, ...FONTS.h2}}>
          No Device Connected
        </Text>
        <View
          style={{
            marginTop: SIZES.padding,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              height: 40,
              width: 150,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              ...styles.shadow,
            }}
            onPress={() => {
              if (!scanning) {
                enable();
                scan((error, device) => {
                  if (device) {
                    setScannedDevices([...scannedDevices, device]);
                  }
                });
              } else {
                stopScan();
              }
              setScanning(!scanning);
            }}>
            <Text style={{color: COLORS.white, ...FONTS.h4}}>
              {scanning ? 'Stop Scanning' : 'Scan for Devices'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderScannedDevices = () => {
    const renderItem = (item) => {
      let device = item.item;
      return (
        <View
          style={{
            marginVertical: SIZES.padding,
            backgroundColor: COLORS.white,
            padding: SIZES.padding,
            borderRadius: 5,
            ...styles.shadow,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="robot" size={20} color={COLORS.primary} light />
            <Text style={{color: COLORS.primary, ...FONTS.h3, paddingLeft: 6}}>
              {device.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: SIZES.base,
            }}>
            <Text style={{color: COLORS.darkgray, ...FONTS.h3}}>
              {'ID: ' + device.id}
            </Text>
            <Text style={{color: COLORS.darkgray, ...FONTS.h3, paddingLeft: 6}}>
              {'RSSI: ' + device.rssi}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              paddingTop: SIZES.base,
              marginTop: SIZES.base,
              borderRadius: 5,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              ...styles.shadow,
            }}
            onPress={() => {
              isDeviceConnectedToApp(device.id).then((isConnected) => {
                if (isConnected) {
                  device
                    .discoverAllServicesAndCharacteristics()
                    .then((device) => {
                      setConnectedDevice(device);
                    });
                } else {
                  device.connect().then((device) => {
                    device
                      .discoverAllServicesAndCharacteristics()
                      .then((device) => {
                        setConnectedDevice(device);
                      });
                  });
                }
              });
            }}>
            <Text style={{color: COLORS.white, ...FONTS.h4, paddingBottom: 9}}>
              Connect
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.lightGray,
          padding: SIZES.padding,
          minHeight: SIZES.height * 0.7,
        }}>
        <View
          style={{flexDirection: 'row', display: scanning ? 'flex' : 'none'}}>
          <ActivityIndicator size="small" color={COLORS.darkgray} />
          <Text style={{colors: COLORS.darkgray, ...FONTS.h4, paddingLeft: 5}}>
            Scanning For Devices...
          </Text>
        </View>

        <View>
          <FlatList
            data={scannedDevices}
            renderItem={renderItem}
            keyExtractor={(item, index) => {
              return '' + index;
            }}
            numColumns={1}
          />
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    if (connectedDevice) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            padding: SIZES.padding,
          }}>
          <Text style={{color: COLORS.primary, ...FONTS.h2}}>
            {'Connected Device : ' + connectedDevice.name}
          </Text>
        </View>
      );
    }
    return <View></View>;
  };

  const renderDeviceDetails = () => {
    console.log([connectedDevice]);
    if (connectedDevice) {
      return (
        <View
          style={{
            flex: 1,
            padding: SIZES.padding,
            backgroundColor: COLORS.lightGray,
            minHeight: 0.7 * SIZES.height,
          }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 5,
              padding: SIZES.padding,
              ...styles.shadow,
              flexDirection: 'row',
              marginBottom: SIZES.base,
            }}>
            <Icon
              name="robot"
              size={20}
              color={COLORS.primary}
              light
              style={{
                width: 30,
              }}
            />
            <Text style={{color: COLORS.primary, ...FONTS.h3, paddingLeft: 10}}>
              {'Name : ' + connectedDevice.name}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 5,
              padding: SIZES.padding,
              ...styles.shadow,
              flexDirection: 'row',
              marginBottom: SIZES.base,
            }}>
            <Icon
              name="hashtag"
              size={20}
              color={COLORS.primary}
              light
              style={{
                width: 30,
              }}
            />
            <Text style={{color: COLORS.primary, ...FONTS.h3, paddingLeft: 10}}>
              {'ID : ' + connectedDevice.id}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 5,
              padding: SIZES.padding,
              ...styles.shadow,
              flexDirection: 'row',
              marginBottom: SIZES.base,
            }}>
            <Icon
              name="bluetooth-b"
              size={20}
              color={COLORS.primary}
              light
              style={{
                width: 30,
              }}
            />
            <Text style={{color: COLORS.primary, ...FONTS.h3, paddingLeft: 10}}>
              {'RSSI : ' + connectedDevice.rssi}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 5,
              padding: SIZES.padding,
              ...styles.shadow,
              marginBottom: SIZES.base,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="database"
                size={20}
                color={COLORS.primary}
                light
                style={{
                  width: 30,
                }}
              />
              <Text
                style={{color: COLORS.primary, ...FONTS.h3, paddingLeft: 10}}>
                {'Services : '}
              </Text>
            </View>

            {connectedDevice.name === 'ProjectZero' && (
              <View
                style={{
                  paddingTop: SIZES.padding,
                }}>
                <Text style={{color: COLORS.darkgray, ...FONTS.h4}}>
                  {ProjectZero.services[0].description}
                </Text>
                <View
                  style={{
                    paddingTop: SIZES.base,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View>
                    <Text style={{color: COLORS.darkgray, ...FONTS.h4}}>
                      {ProjectZero.services[0].Characteristics[0].description}
                    </Text>
                    <TouchableOpacity
                      style={{
                        padding: SIZES.base,
                        borderRadius: 5,
                        ...styles.shadow,
                        backgroundColor: COLORS.primary,
                      }}
                      onPress={() => {
                        connectedDevice
                          .readCharacteristicForService(
                            ProjectZero.services[0].uuid,
                            ProjectZero.services[0].Characteristics[0].uuid,
                          )
                          .then((Characteristic) => {
                            if (Characteristic.value != 'AA==') {
                              connectedDevice.writeCharacteristicWithoutResponseForService(
                                ProjectZero.services[0].uuid,
                                ProjectZero.services[0].Characteristics[0].uuid,
                                'AA==',
                              );
                            } else {
                              connectedDevice.writeCharacteristicWithoutResponseForService(
                                ProjectZero.services[0].uuid,
                                ProjectZero.services[0].Characteristics[0].uuid,
                                'AQ==',
                              );
                            }
                          });
                      }}>
                      <Text style={{color: COLORS.white}}>Toggle</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={{color: COLORS.darkgray, ...FONTS.h4}}>
                      {ProjectZero.services[0].Characteristics[1].description}
                    </Text>
                    <TouchableOpacity
                      style={{
                        padding: SIZES.base,
                        borderRadius: 5,
                        ...styles.shadow,
                        backgroundColor: COLORS.primary,
                      }}
                      onPress={() => {
                        connectedDevice
                          .readCharacteristicForService(
                            ProjectZero.services[0].uuid,
                            ProjectZero.services[0].Characteristics[1].uuid,
                          )
                          .then((Characteristic) => {
                            if (Characteristic.value != 'AA==') {
                              connectedDevice.writeCharacteristicWithoutResponseForService(
                                ProjectZero.services[0].uuid,
                                ProjectZero.services[0].Characteristics[1].uuid,
                                'AA==',
                              );
                            } else {
                              connectedDevice.writeCharacteristicWithoutResponseForService(
                                ProjectZero.services[0].uuid,
                                ProjectZero.services[0].Characteristics[1].uuid,
                                'AQ==',
                              );
                            }
                          });
                      }}>
                      <Text style={{color: COLORS.white}}>Toggle</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      );
    }
    return <View></View>;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.lightGray,
        }}>
        <View style={{display: connectedDevice ? 'none' : 'flex'}}>
          {/* Render Header */}
          {renderHeaderNoDevice()}
          {renderScannedDevices()}
        </View>
        <View style={{display: connectedDevice ? 'flex' : 'none'}}>
          {/* Render Header */}
          {renderHeader()}
          {renderDeviceDetails()}
        </View>
      </View>
    </ScrollView>
  );
};

// Stack view for the device section, use this to link to all device screens and customize the device section header
const Device = () => {
  return (
    <Stack.Navigator
      initalRouteName="Device View"
      headerMode="screen"
      screenOptions={({navigation, route}) => {
        return {
          headerStyle: {
            shadowColor: 'transparent',
            elevation: 0,
            height: 60,
          },
          headerTitle: () => (
            <NavHeader navigation={navigation} type="Device" route={route} />
          ),
          headerTitleContainerStyle: {
            left: 0,
            right: -15,
          },
        };
      }}>
      <Stack.Screen name="Device View" component={DeviceSummary} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default Device;
