import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCRGHgTiwFWMgyTkrN0mVW_55MuAB-OYA4",
    authDomain: "financas-6ca92.firebaseapp.com",
    projectId: "financas-6ca92",
    storageBucket: "financas-6ca92.appspot.com",
    messagingSenderId: "1320637753",
    appId: "1:1320637753:web:6a78829a558915778d84e8",
    measurementId: "G-1ZGLN5KLD3"
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;

  