import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyABPvPs3FFWTK_ljY7mrPC4mA5C6_Pch8M',

  authDomain: 'olx-clone-fb085.firebaseapp.com',

  projectId: 'olx-clone-fb085',

  storageBucket: 'olx-clone-fb085.appspot.com',

  messagingSenderId: '451436605648',

  appId: '1:451436605648:web:435d542901457323616ed5',

  measurementId: 'G-SE81Z5ZG6Q',
};

const Firebase = firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });

export default Firebase;
