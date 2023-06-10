import * as firebase from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: ''
};

/**
 * Firebase initializer
 */
let fb;
if (!firebase.getApps().length) {
  fb = firebase.initializeApp(firebaseConfig);
} else {
  fb = firebase.getApp(); // if already initialized, use that one
}

/**
 * Firebase Firestore initializer
 */
const db = initializeFirestore(fb, {});


/**
 * Firebase Auth
 */
export const auth = getAuth(fb);
// Get a reference to the storage service
export const storage = getStorage(fb);
export default db;
