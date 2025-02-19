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

// Function to load recipes
async function loadRecipes() {
  const data = await getDocs(collection(db, "recipes"));
  let recipeList = [];
  data.forEach((doc) => {
    recipeList.push({ id: doc.id, ...doc.data() });
  });
  return recipeList;
}

// Function to add a recipe
async function addRecipe(newRecipe) {
  await addDoc(collection(db, "recipes"), newRecipe);
}

// Function to delete a recipe
async function deleteRecipe(recipeId) {
  await deleteDoc(doc(db, "recipes", recipeId));
}

// Function to get API key for AI
async function getApiKey() {
  let snapshot = await getDoc(doc(db, "apikey", "googlegenai"));
  return snapshot.data().key;
}

export { db, loadRecipes, addRecipe, deleteRecipe, getApiKey };
