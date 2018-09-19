//Inside of firebase.js file
import firebase from 'firebase';

// Initialize Firebase
  const config = {

  };

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default firebase;
