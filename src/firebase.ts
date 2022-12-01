import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
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
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
//init service
const db = getFirestore();

//db refs
export const usersRef = collection(db, "users");
export const getUserRef = (id: any) => doc(db, "users", id);

export const restaurantsRef = collection(db, "restaurants");
export const getRestaurantRef = (id: any) => doc(db, "restaurants", id);

export const menusRef = collection(db, "menus");
export const getMenuRef = (id: any) => doc(db, "menus", id);

export const foodItemsRef = collection(db, "foodItems");
export const getFoodItemRef = (id: any) => doc(db, "foodItems", id);

export const ordersRef = collection(db, "orders");
export const getOrderRef = (id: any) => doc(db, "orders", id);
//getdocs
