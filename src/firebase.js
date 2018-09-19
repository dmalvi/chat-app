//Inside of firebase.js file
import firebase from 'firebase';
require('dotenv').config();

// Initialize Firebase
  const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: "dm-project-8db52.firebaseapp.com",
    databaseURL: "https://dm-project-8db52.firebaseio.com",
    projectId: "dm-project-8db52",
    storageBucket: "dm-project-8db52.appspot.com",
    messagingSenderId: process.env.REACT_APP_MSENDERID
  };

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default firebase;
