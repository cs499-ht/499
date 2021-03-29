import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyALph0dwg84NTwu42majCLjEtaqMxtUpC4",
    authDomain: "habit-tracker-2864b.firebaseapp.com",
    projectId: "habit-tracker-2864b",
    storageBucket: "habit-tracker-2864b.appspot.com",
    messagingSenderId: "800502454957",
    appId: "1:800502454957:web:c7cba046f5987318a70424",
    measurementId: "G-GTMEL8RVSG"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
// As httpOnly cookies are to be used, do not persist any state client side.
// const persistance = firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export { db, auth, storage };