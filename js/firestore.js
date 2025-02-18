import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export async function loadRecipes() {
  const data = await getDocs(collection(db, "recipes"));
  let recipeList = [];
  data.forEach((doc) => {
    recipeList.push({ id: doc.id, ...doc.data() });
  });
  return recipeList;
}

export async function addRecipe(newRecipe) {
  await addDoc(collection(db, "recipes"), newRecipe);
}

export async function deleteRecipe(recipeId) {
  await deleteDoc(doc(db, "recipes", recipeId));
}

export async function getApiKey() {
  let snapshot = await getDoc(doc(db, "apikey", "googlegenai"));
  return snapshot.data().key;
}
