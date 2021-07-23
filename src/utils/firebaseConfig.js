import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnwR4zuU4ewB7tkbS5ejlfbFSFlFQhQco",
  authDomain: "whizzcustomerfeedback.firebaseapp.com",
  projectId: "whizzcustomerfeedback",
  storageBucket: "whizzcustomerfeedback.appspot.com",
  messagingSenderId: "390399504028",
  appId: "1:390399504028:web:e4c3c88c9316b04af28759",
  measurementId: "G-MPP60E33FD"
};


// Configure FirebaseUI.
export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

export const dbInstance = firebase.firestore();

export default firebase;