import firebase from "firebase";

const Config = {
    apiKey: "AIzaSyBdd5rQ0nOy9LgTokc9iofTQJUZC2xJ0Oc",
    authDomain: "svigufomanha-5d892.firebaseapp.com",
    databaseURL: "https://svigufomanha-5d892.firebaseio.com",
    projectId: "svigufomanha-5d892",
    storageBucket: "svigufomanha-5d892.appspot.com",
    messagingSenderId: "649454044777",
    appId: "1:649454044777:web:2b088de8bc612de1"
  };

  firebase.initializeApp(Config);

  export default firebase;