import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRbM4OkSG4VoVYCJQHF4z9mZo3GCdxpoc",
  authDomain: "wikitraining-fef9b.firebaseapp.com",
  projectId: "wikitraining-fef9b",
  storageBucket: "wikitraining-fef9b.appspot.com",
  messagingSenderId: "747871860850",
  appId: "1:747871860850:web:60d11a0f8dab98a45deaeb"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const google = new GoogleAuthProvider();
export const facebook = new FacebookAuthProvider();
export const dbFirestore = getFirestore();