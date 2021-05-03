import React, {useState, useEffect, useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {COLORS, FONTS, SIZES} from './constants/';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View} from 'react-native';

import {Home, Report, Device, Settings} from './screens/';
import {LoginScreen, SignUpScreen, RecoverPasswordScreen} from './screens/Auth';
import {AuthContext, AuthProvider} from './providers/AuthProvider';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser, createUser} from './services/firestoreService';

//Theme
const theme = {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

//Dummy sensor data, emulating what would be read from device
const sensors = [
  {
    id: 1,
    name: 'Temperature',
    icon: 'thermometer-half',
    color: COLORS.blue,
    details: {
      average: '19°C',
      high: {value: '23°C', time: '2:34pm', icon: 'thermometer-three-quarters'},
      low: {value: '15°C', time: '1:09am', icon: 'thermometer-quarter'},
    },
    readings: {
      unit: '°C',
      readings: [
        {id: '1', value: 16, time: '1:15am'},
        {id: '2', value: 19, time: '1:30am'},
        {id: '3', value: 21, time: '1:45am'},
        {id: '4', value: 22, time: '2:00am'},
        {id: '5', value: 25, time: '2:15am'},
        {id: '6', value: 14, time: '2:30am'},
        {id: '7', value: 13, time: '2:45am'},
      ],
      data: [16, 19, 21, 22, 25, 14, 13],
      round: true,
    },
  },
  {
    id: 2,
    name: 'Air Qaulity',
    icon: 'wind',
    color: COLORS.darkgreen,
    details: {
      average: '40/500',
      high: {
        value: '55/500',
        time: '6:34pm',
        icon: 'fan',
      },
      low: {
        value: '21/500',
        time: '4:09am',
        icon: 'fan',
      },
    },
    readings: {
      unit: '/500',
      readings: [
        {id: '1', value: 40, time: '1:15am'},
        {id: '2', value: 42, time: '1:30am'},
        {id: '3', value: 50, time: '1:45am'},
        {id: '4', value: 52, time: '2:00am'},
        {id: '5', value: 56, time: '2:15am'},
        {id: '6', value: 31, time: '2:30am'},
        {id: '7', value: 40, time: '2:45am'},
      ],
      data: [40, 42, 50, 52, 56, 31, 40],
      round: true,
    },
  },
  {
    id: 3,
    name: 'Barometric Pressure',
    icon: 'weight-hanging',
    color: COLORS.yellow,
    details: {
      average: '1atm',
      high: {value: '1.2atm', time: '2:30pm', icon: 'balance-scale-right'},
      low: {value: '0.9atm', time: '12:45am', icon: 'balance-scale-left'},
    },
    readings: {
      unit: 'atm',
      readings: [
        {id: '1', value: 0.9, time: '1:15am'},
        {id: '2', value: 1.0, time: '1:30am'},
        {id: '3', value: 1.1, time: '1:45am'},
        {id: '4', value: 1.2, time: '2:00am'},
        {id: '5', value: 1.0, time: '2:15am'},
        {id: '6', value: 1.0, time: '2:30am'},
        {id: '7', value: 0.9, time: '2:45am'},
      ],
      data: [0.9, 1.0, 1.1, 1.2, 1.0, 1.0, 0.9],
      round: false,
    },
  },
  {
    id: 4,
    name: 'Humidity',
    icon: 'hotjar',
    color: COLORS.peach,
    details: {
      average: 'Decent',
      high: {value: 'Sticky', time: '2:30pm', icon: 'fire-alt'},
      low: {value: 'Decent', time: '12:45am', icon: 'fire'},
    },
    readings: {
      unit: 'H',
      readings: [
        {id: '1', value: 5, time: '1:15am'},
        {id: '2', value: 6, time: '1:30am'},
        {id: '3', value: 4, time: '1:45am'},
        {id: '4', value: 7, time: '2:00am'},
        {id: '5', value: 8, time: '2:15am'},
        {id: '6', value: 5, time: '2:30am'},
        {id: '7', value: 5, time: '2:45am'},
      ],
      data: [5, 6, 4, 7, 8, 5, 5],
      round: true,
    },
  },
];

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

let Home1 = ({navigation}) => {
  return <Home sensors={sensors} navigation={navigation} />;
};

let Report1 = () => {
  return <Report sensor={sensors[0]} />;
};
let Report2 = () => {
  return <Report sensor={sensors[1]} />;
};
let Report3 = () => {
  return <Report sensor={sensors[2]} />;
};
let Report4 = () => {
  return <Report sensor={sensors[3]} />;
};

const AppDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerPosition="right">
      <Drawer.Screen
        options={{
          drawerIcon: () => {
            return (
              <View
                style={{
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name={'sticky-note'}
                  size={20}
                  color={COLORS.primary}
                  light
                />
              </View>
            );
          },
        }}
        name="Summary"
        component={Home1}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => {
            return (
              <View
                style={{
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name={sensors[0].icon}
                  size={20}
                  color={sensors[0].color}
                  light
                />
              </View>
            );
          },
        }}
        name="Temperature"
        component={Report1}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => {
            return (
              <View
                style={{
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name={sensors[1].icon}
                  size={20}
                  color={sensors[1].color}
                  light
                />
              </View>
            );
          },
        }}
        name="Air Qaulity"
        component={Report2}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => {
            return (
              <View
                style={{
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name={sensors[2].icon}
                  size={20}
                  color={sensors[2].color}
                  light
                />
              </View>
            );
          },
        }}
        name="Barometric Pressure"
        component={Report3}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => {
            return (
              <View
                style={{
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name={sensors[3].icon}
                  size={20}
                  color={sensors[3].color}
                  light
                />
              </View>
            );
          },
        }}
        name="Humidity"
        component={Report4}
      />
      <Drawer.Screen name="Device" component={Device} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator initalRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
    </Stack.Navigator>
  );
};

const AppLogic = () => {
  const {
    user,
    setUser,
    setUserAsync,
    removeUserAsync,
    setName,
    name,
  } = useContext(AuthContext);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (user && user.uid != null) {
      getUser(user.uid).then((document) => {
        if (!document._exists) {
          createUser(user.displayName || name, user.email, user.uid);
        } else {
          console.log('user exists');
        }
      });
      setUserAsync(user);
    } else {
      removeUserAsync();
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '394408075125-c9bno4ujsh7g4sombgi0i6b595v3jitv.apps.googleusercontent.com',
    });

    AsyncStorage.getItem('user').then((userString) => {
      if (userString) {
        setUser(JSON.parse(userString));
      }
    });

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [name]);

  return (
    <NavigationContainer theme={theme}>
      {user ? <AppDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppLogic />
    </AuthProvider>
  );
};

export default App;
