import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

/*
  Auth Provider is a very simple React Context provider that provides the following:

  -> keeping track of the user logged in object
  -> keeping track of user name (for new account creation)
  -> Providing methods related to account like login, logout, reset etc. 


  The methods here rely on firebase auth, please see the docs for more details

  The methods here also make use of async storage for persisting the logged in state even when the app is closed
  **While the user object is stored in asyncStorage, it still needs to be passed through firebase auth again when the app re-opens, this is never done yet.** 
*/

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        name,
        setName,
        setUserAsync: (user) => {
          try {
            AsyncStorage.setItem('user', JSON.stringify(user));
            console.log(name);
          } catch (e) {
            console.log('AsyncStorage Failed to set User, Reason : ' + e);
          }
        },
        removeUserAsync: () => {
          try {
            AsyncStorage.removeItem('user');
          } catch (e) {
            console.log('AsyncStorage Failed to remove User, Reason : ' + e);
          }
        },
        loginGoogle: async () => {
          try {
            const {idToken} = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(
              idToken,
            );
            return auth().signInWithCredential(googleCredential);
          } catch (error) {
            console.log(error);
          }
        },
        loginEmailPass: (email, password) => {
          return auth().signInWithEmailAndPassword(email, password);
        },
        createAccount: async (email, password) => {
          return auth().createUserWithEmailAndPassword(email, password);
        },
        signOut: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log('Firebase failed to logout, Reason : ' + e);
          }
        },
        recoverPassword: (email) => {
          return auth().sendPasswordResetEmail(email);
        },
        verifyEmail: () => {
          return auth().currentUser.sendEmailVerification();
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
