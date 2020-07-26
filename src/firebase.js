import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi0zoRmW6Fx8XDRh-RZxB7uFQP6qVjGYs",
  authDomain: "authentication-with-react.firebaseapp.com",
  databaseURL: "https://authentication-with-react.firebaseio.com",
  projectId: "authentication-with-react",
  storageBucket: "authentication-with-react.appspot.com",
  messagingSenderId: "865472089638",
  appId: "1:865472089638:web:544213d4898f7513bfa0e7",
  measurementId: "G-FXN8102SHQ",
};


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = ()=>{
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData)=>{
  if(!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if(!snapshot.exists){
    const {email, displayName, photoURL} = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error Creating Document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid=>{
  if(!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    }
  } catch (error) {
    console.error('Error Fetching User', error);
  }
}