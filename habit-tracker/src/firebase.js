import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// TODO USE .ENV VARIABLES INSTEAD OF HARDCODING
const app = firebase.initializeApp({
  apiKey: "AIzaSyALph0dwg84NTwu42majCLjEtaqMxtUpC4",
  authDomain: "habit-tracker-2864b.firebaseapp.com",
  projectId: "habit-tracker-2864b",
  storageBucket: "habit-tracker-2864b.appspot.com",
  messagingSenderId: "800502454957",
  appId: "1:800502454957:web:c7cba046f5987318a70424",
  measurementId: "G-GTMEL8RVSG",
});

// this is just auth
export const auth = app.auth();
export const db = firebase.firestore();

// this is entire firebase app
export default app;
