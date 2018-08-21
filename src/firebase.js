//Inside of firebase.js file
import firebase from 'firebase';

// Initialize Firebase
  const config = {
    apiKey: "AIzaSyBBpuLuv256zntQXoZA_9ONno1qHGVuEI8",
    authDomain: "dm-project-8db52.firebaseapp.com",
    databaseURL: "https://dm-project-8db52.firebaseio.com",
    projectId: "dm-project-8db52",
    storageBucket: "dm-project-8db52.appspot.com",
    messagingSenderId: "537523031186"
  };

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default firebase;
