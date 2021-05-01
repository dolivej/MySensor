/*

Settings Section
-> Right now this is a place to put buttons to test certain features like notifications, logout, cloud calls etc. 
-> In the future it will be where users can handle their accounts and set account specific settings

-> The reason it is a class component and not a functional component has to do with the way react-timer works, see the docs for more details.
*/

import React, {useContext} from 'react';
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
import {createNotification, createNotificationChannel} from '../services/notificationService';
import {
  startForegroundTick,
  endForegroundTick,
} from '../services/foregroundTickService';
import {getUser} from '../services/firestoreService';
import {AuthContext} from '../providers/AuthProvider';

const Stack = createStackNavigator();

const LogoutButton = () => {
  const {signOut, verifyEmail} = useContext(AuthContext);

  return (
    <TouchableOpacity
      style={{
        padding: SIZES.base,
        backgroundColor: COLORS.primary,
        ...styles.shadow,
        marginVertical: SIZES.padding,
        borderRadius: 5,
      }}
      onPress={() => {
        signOut();
      }}>
      <Text style={{color: COLORS.white, ...FONTS.h3}}>Logout</Text>
    </TouchableOpacity>
  );
};

const VerifyEmailButton = () => {
  const {verifyEmail} = useContext(AuthContext);

  return (
    <TouchableOpacity
      style={{
        padding: SIZES.base,
        backgroundColor: COLORS.primary,
        ...styles.shadow,
        marginVertical: SIZES.padding,
        borderRadius: 5,
      }}
      onPress={() => {
        verifyEmail().then(() => {
          console.log('verification sent');
        });
      }}>
      <Text style={{color: COLORS.white, ...FONTS.h3}}>Verify Email</Text>
    </TouchableOpacity>
  );
};

class SettingsSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0, clicked: false};
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.lightGray2,
            padding: SIZES.padding,
            height: SIZES.height,
          }}>
          <Text style={{color: COLORS.primary, ...FONTS.h2}}>Settings</Text>
          <TouchableOpacity
            style={{
              padding: SIZES.base,
              backgroundColor: COLORS.primary,
              ...styles.shadow,
              marginVertical: SIZES.padding,
              borderRadius: 5,
            }}
            onPress={() => {
              createNotificationChannel()
              
              createNotification(
                'TEST NOTIFICATION',
                'THIS IS A TEST NOTIFICATION',
              );
            }}>
            <Text style={{color: COLORS.white, ...FONTS.h3}}>
              Test System Notification
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: SIZES.base,
              backgroundColor: COLORS.primary,
              ...styles.shadow,
              marginVertical: SIZES.padding,
              borderRadius: 5,
            }}
            onPress={() => {
              if (this.state.clicked) {
                endForegroundTick();
                this.setState({count: 0, clicked: false});
              } else {
                startForegroundTick(() => {
                  this.setState({count: this.state.count + 1});
                }, 1000);
                this.setState({clicked: true});
              }
            }}>
            <Text style={{color: COLORS.white, ...FONTS.h3}}>
              {'Test Foreground Tick : ' + this.state.count}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: SIZES.base,
              backgroundColor: COLORS.primary,
              ...styles.shadow,
              marginVertical: SIZES.padding,
              borderRadius: 5,
            }}>
            <Text style={{color: COLORS.white, ...FONTS.h3}}>
              Test Background Task (every 15 minutes)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: SIZES.base,
              backgroundColor: COLORS.primary,
              ...styles.shadow,
              marginVertical: SIZES.padding,
              borderRadius: 5,
            }}
            onPress={() => {
              getUser('a2ZvWByYRMS3ABpN3KA4').then((user) => {
                console.log(user._exists);
              });
            }}>
            <Text style={{color: COLORS.white, ...FONTS.h3}}>
              Get Cloud User
            </Text>
          </TouchableOpacity>

          <VerifyEmailButton />
          <LogoutButton />
        </View>
      </ScrollView>
    );
  }
}

const Settings = () => {
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
            <NavHeader navigation={navigation} type="Settings" route={route} />
          ),
          headerTitleContainerStyle: {
            left: 0,
            right: -15,
          },
        };
      }}>
      <Stack.Screen name="Settings" component={SettingsSummary} />
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

export default Settings;
