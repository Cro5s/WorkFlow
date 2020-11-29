import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyCfYUM15jq0cWaqLfF0gz0DhzCHDxQNCgI",
  authDomain: "workflow-76371.firebaseapp.com",
  databaseURL: "https://workflow-76371.firebaseio.com",
  projectId: "workflow-76371",
  storageBucket: "workflow-76371.appspot.com",
  messagingSenderId: "259208194650",
  appId: "1:259208194650:web:ac150d574b44d26df18663",
  measurementId: "G-FEPMT6L6XF",
});

const db = firebaseApp.firestore();

export default db;
