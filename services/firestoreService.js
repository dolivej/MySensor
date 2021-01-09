import firestore from '@react-native-firebase/firestore';

/* 
 Here are the methods relating to Firestore
 It relies on Firebase, please see the docs for more details
*/

export const createUser = (name, email, docName) => {
  firestore()
    .collection('Users')
    .doc(docName)
    .set({
      name: name,
      email: email,
    })
    .then(() => {
      console.log('User added!');
    });
};

export const getUser = (docName) => {
  return firestore().collection('Users').doc(docName).get();
};

export const readDocument = () => {};

export const writeDocument = () => {};
