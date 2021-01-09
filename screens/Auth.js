/*

Auth Screens:
<LoginScreen/>
-> Login to an existing account or through a provider (ex google)

<SignUpScreen/>
-> Create a new account

<RecoverPasswordScreen/>
-> Recover their password

The screens in auth rely on the methods from the AuthProvider.js which have methods for using Firebase Auth
The screens also use the AuthContext for keeping track of extra aspects like name when creating an account (so it can be attatched to their account in firebase)

*/

import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FormInput} from '../components/';
import {AuthContext} from '../providers/AuthProvider';

// Login Screen, user either enters email and password or uses a provider
export const LoginScreen = ({navigation}) => {
  const {loginGoogle, loginEmailPass} = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <View
      style={{
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        height: SIZES.height,
      }}>
      <View
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="accusoft" size={100} color={COLORS.primary} light />
      </View>
      <View>
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={{
            padding: SIZES.base,
            backgroundColor: COLORS.primary,
            borderRadius: 5,
            marginTop: 15,
            ...styles.shadow,
            alignItems: 'center',
          }}
          onPress={() => {
            loginEmailPass(email, password);
          }}>
          <Text style={{color: COLORS.white, ...FONTS.h2}}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'center', marginTop: 20}}
          onPress={() => {
            navigation.navigate('RecoverPassword');
          }}>
          <Text style={{color: COLORS.secondary, ...FONTS.h3}}>
            Forgot Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'center', marginBottom: 20, marginTop: 5}}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={{color: COLORS.secondary, ...FONTS.h3}}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingVertical: SIZES.base,
          alignItems: 'center',
        }}>
        <Text style={{color: COLORS.primary, ...FONTS.h2}}>OR</Text>
      </View>

      <View>
        <TouchableOpacity
          style={{
            padding: SIZES.base,
            backgroundColor: COLORS.secondary,
            borderRadius: 5,
            marginTop: 15,
            ...styles.shadow,
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            loginGoogle();
          }}>
          <Icon name="google" size={20} color={COLORS.white} light />
          <Text style={{color: COLORS.white, ...FONTS.h2, paddingLeft: 16}}>
            LOGIN WITH GOOGLE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// User can sign up on this screen
export const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const {createAccount, name, setName} = useContext(AuthContext);

  useEffect(() => {
    setName(null);
  }, []);

  return (
    <View
      style={{
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        height: SIZES.height,
      }}>
      <View
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="accusoft" size={100} color={COLORS.primary} light />
      </View>
      <View>
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          labelValue={name}
          onChangeText={(userName) => setName(userName)}
          placeholderText="Name"
          iconType="address-card"
          keyboardType=""
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormInput
          labelValue={password2}
          onChangeText={(userPassword) => setPassword2(userPassword)}
          placeholderText="Confirm Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={{
            padding: SIZES.base,
            backgroundColor: COLORS.primary,
            borderRadius: 5,
            marginTop: 15,
            ...styles.shadow,
            alignItems: 'center',
          }}
          onPress={() => {
            createAccount(email, password);
          }}>
          <Text style={{color: COLORS.white, ...FONTS.h2}}>CREATE ACCOUNT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignItems: 'center', marginTop: 20}}
          onPress={() => {
            navigation.navigate('RecoverPassword');
          }}>
          <Text style={{color: COLORS.secondary, ...FONTS.h3}}>
            Forgot Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'center', marginTop: 10}}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={{color: COLORS.secondary, ...FONTS.h3}}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// User can enter their email and reset their password
export const RecoverPasswordScreen = ({navigation}) => {
  const {recoverPassword} = useContext(AuthContext);
  const [email, setEmail] = useState();

  return (
    <View
      style={{
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        height: SIZES.height,
      }}>
      <View
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="accusoft" size={100} color={COLORS.primary} light />
      </View>
      <View>
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={{
            padding: SIZES.base,
            backgroundColor: COLORS.primary,
            borderRadius: 5,
            marginTop: 15,
            ...styles.shadow,
            alignItems: 'center',
          }}
          onPress={() => {
            recoverPassword(email).then(() => {
              navigation.navigate('Login');
            });
          }}>
          <Text style={{color: COLORS.white, ...FONTS.h2}}>RESET PASSWORD</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignItems: 'center', marginTop: 20}}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={{color: COLORS.secondary, ...FONTS.h3}}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'center', marginTop: 10}}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={{color: COLORS.secondary, ...FONTS.h3}}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
