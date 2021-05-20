import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyBrPG4OCBOKet7jCbJlEDmYSSJQ3faD-_Y',
  authDomain: 'taskman-5e809.firebaseapp.com',
  projectId: 'taskman-5e809',
  storageBucket: 'taskman-5e809.appspot.com',
  messagingSenderId: '859041408653',
  appId: '1:859041408653:web:4e4e9742556899d49fe4c4'
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
// export const fb = firebase;

firebase.firestore().settings({ timestampsinSnapshots: true });
