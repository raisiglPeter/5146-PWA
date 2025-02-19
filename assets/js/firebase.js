// firebase.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCdNAkePR48BW0AdSOONp7sOfIirYdRv0",
  authDomain: "pwa-5719b.firebaseapp.com",
  projectId: "pwa-5719b",
  storageBucket: "pwa-5719b.firebasestorage.app",
  messagingSenderId: "1077986382281",
  appId: "1:1077986382281:web:f1cca2531b3b05ac199818",
  measurementId: "G-1NPPL3P4HF",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// returns the recipes from firestore
async function loadRecipes() {
  const data = await getDocs(collection(db, "recipes"));
  let recipeList = [];
  data.forEach((doc) => {
    recipeList.push({ id: doc.id, ...doc.data() });
  });
  return recipeList;
}

// adds document to firestore
async function addRecipe(newRecipe) {
  await addDoc(collection(db, "recipes"), newRecipe);
}

// deletes recipe from firestore
async function deleteRecipe(recipeId) {
  await deleteDoc(doc(db, "recipes", recipeId));
}

// gets the Google API key from firestore
async function getApiKey() {
  let snapshot = await getDoc(doc(db, "apikey", "googlegenai"));
  return snapshot.data().key;
}

export const auth = getAuth();
export { db, loadRecipes, addRecipe, deleteRecipe, getApiKey };
