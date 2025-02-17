console.log("script run");

// Firebase
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
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

async function loadRecipes() {
  const data = await getDocs(collection(db, "recipes"));
  const recipes = [];
  data.forEach((doc) => {
    recipes.push({ id: doc.id, ...doc.data() });
  });
  renderRecipes(recipes);
}

document.addEventListener("DOMContentLoaded", () => {
  loadRecipes();

  const recipeListDiv = document.querySelector(".recipe-list");
  const stepInput = document.getElementById("recipe-steps");
  const addStepButton = document.querySelector(".recipe-step-button");
  const stepsPreview = document.querySelector(".steps-preview ol");
  const tagInput = document.getElementById("recipe-tags");
  const addTagButton = document.querySelector(".recipe-tag-button");
  const tagsPreview = document.querySelector(".tags-preview p");
  const tagMemory = [];
  const stepMemory = [];
  const resetButton = document.getElementById("add-modal-reset-button");
  const showModalButton = document.getElementById("show-modal-button");
  const addModal = document.querySelector(".add-modal");
  const addRecipeButton = document.getElementById("submit-recipe");
  const homeButton = document.getElementById("home-button");
  const favouriteButton = document.getElementById("favourite-button");

  function renderRecipes(recipes) {
    recipeListDiv.innerHTML = "";
    recipes.forEach((recipe) => {
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe-card");
      recipeCard.innerHTML = `
          <h2>${recipe.title} ${recipe.favourite ? "❤️" : ""}</h2>
          <p>${recipe.description}</p>
          <h4 class="recipe-list-h4">Steps:</h4>
          <ol class="ordered-list">
            ${recipe.steps
              .map((step, i) => `<li>${i + 1}. ${step}</li>`)
              .join("")}
          </ol>
          <h5>Tags</h5>
          <p class="recipe-tags">${recipe.tags.join(", ")}</p>
          <div class="recipe-buttons">
            <button class="button recipe-button edit-btn">Edit</button>
            <button class="button recipe-button delete-btn">Delete</button>
          </div>
        `;

      const deleteButton = recipeCard.querySelector(".delete-btn");
      deleteButton.addEventListener("click", async () => {
        await deleteDoc(doc(db, "recipes", recipe.id));
        loadRecipes();
      });

      recipeListDiv.appendChild(recipeCard);
    });
  }

  addStepButton.addEventListener("click", () => {
    const stepValue = stepInput.value.trim();
    if (stepValue !== "") {
      stepMemory.push(stepValue);
      const newStep = document.createElement("li");
      newStep.textContent = stepValue;
      stepsPreview.appendChild(newStep);
      stepInput.value = "";
    }
  });

  addTagButton.addEventListener("click", () => {
    const tagValue = tagInput.value.trim();
    if (tagValue !== "" && !tagMemory.includes(tagValue)) {
      tagMemory.push(tagValue);
      tagsPreview.textContent = "Tags: " + tagMemory.join(", ");
      tagInput.value = "";
    }
  });

  resetButton.addEventListener("click", () => {
    document
      .querySelectorAll(".recipe-input")
      .forEach((input) => (input.value = ""));
    document.getElementById("recipe-favourite").checked = false;
    stepsPreview.innerHTML = "";
    tagMemory.length = 0;
    tagsPreview.textContent = "";
  });

  addRecipeButton.addEventListener("click", async () => {
    const title = document.getElementById("recipe-title").value.trim();
    const description = document
      .getElementById("recipe-description")
      .value.trim();
    const favourite = document.getElementById("recipe-favourite").checked;

    if (title && description) {
      const newRecipe = {
        title,
        description,
        steps: [...stepMemory],
        tags: [...tagMemory],
        favourite,
        createdAt: new Date(),
      };
      await addDoc(collection(db, "recipes"), newRecipe);
      loadRecipes();
      resetButton.click();
      addModal.style.display = "none";
      showModalButton.style.backgroundColor = "#f4f4f4";
    }
  });

  homeButton.addEventListener("click", () => {
    addModal.style.display = "none";
    showModalButton.style.backgroundColor = "#f4f4f4";
    loadRecipes();
  });

  favouriteButton.addEventListener("click", async () => {
    const data = await getDocs(collection(db, "recipes"));
    const favouriteRecipes = [];
    data.forEach((doc) => {
      const recipe = { id: doc.id, ...doc.data() };
      if (recipe.favourite) {
        favouriteRecipes.push(recipe);
      }
    });
    renderRecipes(favouriteRecipes);
  });
});
