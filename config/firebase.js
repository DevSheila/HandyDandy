import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';
// Firebase config
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  databaseURL: process.env.databaseURL
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
export {auth, database};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const databse = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
// });
// export {auth, databse};

