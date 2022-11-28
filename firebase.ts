import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDV0bn7eq1NFBaXToHBq9EctB_OpaNp7Vo",
  authDomain: "klajdilh-test.firebaseapp.com",
  projectId: "klajdilh-test",
  storageBucket: "klajdilh-test.appspot.com",
  messagingSenderId: "753558164841",
  appId: "1:753558164841:web:dfc19f6e3d665b092419f8",
  measurementId: "G-BSHLNY4MMP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
