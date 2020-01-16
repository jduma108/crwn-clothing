import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCMVUQCRkabo7h6B6eGMXmFitDd1_Hp8iw",
    authDomain: "clothing-website-aabf7.firebaseapp.com",
    databaseURL: "https://clothing-website-aabf7.firebaseio.com",
    projectId: "clothing-website-aabf7",
    storageBucket: "clothing-website-aabf7.appspot.com",
    messagingSenderId: "1092049955967",
    appId: "1:1092049955967:web:fbb8c2b872db69bd4c234a",
    measurementId: "G-4F3VVSYF9P"
  };

  export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    //if snap shot does not exists, create one 
    if (!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email, 
          createdAt, 
          ...additionalData
        })
      } catch (error){
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const credential = () => auth.signInWithCredential();
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
