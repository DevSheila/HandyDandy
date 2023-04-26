
import {initializeApp,getApps, getApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  // apiKey: "AIzaSyDZGL-lMzifvyNC7O8eC_4_ociajChFTRk",
  // authDomain: "tasker-5f0b6.firebaseapp.com",
  // projectId: "tasker-5f0b6",
  // storageBucket: "tasker-5f0b6.appspot.com",
  // messagingSenderId: "413167013097",
  // appId: "1:413167013097:web:598f36a816265929377478",
  // measurementId: "G-HN118ZP7V5"

  // API_KEY=AIzaSyBN8hv0LG77e1UJQVEt0-7OEbnTZ7ugQIk
  // AUTH_DOMAIN=chatapp-3e4ae.firebaseapp.com
  // PROJECT_ID=chatapp-3e4ae
  // STORAGE_BUCKET=chatapp-3e4ae.appspot.com
  // MESSAGING_SENDER_ID=107413651964
  // APP_ID=1:107413651964:web:57b13e59f65c040ec3b279

  apiKey: "AIzaSyC6Irh0Xs_Jrt_6IOUM2mz6vxZm3q52HoY",
  authDomain: "laundry-application-7f4c7.firebaseapp.com",
  projectId: "laundry-application-7f4c7",
  storageBucket: "laundry-application-7f4c7.appspot.com",
  messagingSenderId: "571088013444",
  appId: "1:571088013444:web:6a5e8ded1f44846994dad1"
};



const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export {auth,db};
