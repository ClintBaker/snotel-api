const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyCOl_hj-8XcJwhfUi8GEeUEf985BkHI_M4",
  authDomain: "snotel-5ef80.firebaseapp.com",
  databaseURL: "https://snotel-5ef80.firebaseio.com",
  projectId: "snotel-5ef80",
  storageBucket: "",
  messagingSenderId: "927854479654"
};

const firebaseVar = firebase.initializeApp(config);
const firebaseRef = firebase.database().ref();

module.exports = { firebase: firebaseVar, firebaseRef }
