// firebase
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

// AI import
import { GoogleGenerativeAI } from "@google/generative-ai";
let apiKey, genAI, model;

const stepInput = document.getElementById("recipe-steps");
const addStepButton = document.querySelector(".recipe-step-button");
const stepsPreview = document.querySelector(".steps-preview ol");
const tagInput = document.getElementById("recipe-tags");
const addTagButton = document.querySelector(".recipe-tag-button");
const tagsPreview = document.querySelector(".tags-preview p");
const resetButton = document.getElementById("add-modal-reset-button");
const showModalButton = document.getElementById("show-modal-button");
const addModal = document.querySelector(".add-modal");
const addRecipeButton = document.getElementById("submit-recipe");
const homeButton = document.getElementById("home-button");
const favouriteButton = document.getElementById("favourite-button");
const recipeListDiv = document.querySelector(".recipe-list");
// AI HTML
const chatHistory = document.getElementById("chat-history");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// temporary memory
let recipeList = [];
let tagMemory = [];
let stepMemory = [];

// get firestore recipes
async function loadRecipes() {
  const data = await getDocs(collection(db, "recipes"));
  recipeList = [];
  data.forEach((doc) => {
    recipeList.push({ id: doc.id, ...doc.data() });
  });
  renderRecipes(recipeList);
}

// render recipes HTML
function renderRecipes(recipes) {
  recipeListDiv.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");

    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
          <h2>${recipe.title} ${recipe.favourite ? "❤️" : ""}</h2>
          <p>${recipe.description}</p>
          <h3 class="recipe-list-h4">Steps:</h3>
          <ol class="ordered-list">
            ${recipe.steps
              .map((step, i) => `<li>${i + 1}. ${step}</li>`)
              .join("")}
          </ol>
          <h4>Tags</h4>
          <p class="recipe-tags">${recipe.tags.join(", ")}</p>
          <div class="recipe-buttons">
            <button class="button recipe-button edit-btn">Edit</button>
            <button class="button recipe-button delete-btn">Delete</button>
          </div>
        `;

    const editButton = recipeCard.querySelector(".edit-btn");
    const deleteButton = recipeCard.querySelector(".delete-btn");

    editButton.addEventListener("click", () => {
      document.getElementById("recipe-title").value = recipe.title;
      document.getElementById("recipe-description").value = recipe.description;
      document.getElementById("recipe-favourite").checked = recipe.favourite;

      // getting steps and tags
      const tempSteps = [...recipe.steps];
      const tempTags = [...recipe.tags];

      // steps preview
      stepsPreview.innerHTML = tempSteps
        .map((step) => `<li>${step}</li>`)
        .join("");

      // tags preview
      tagsPreview.textContent = tempTags.join(", ");

      addModal.style.display = "flex";
      showModalButton.style.backgroundColor = "#f49cbb";
    });

    deleteButton.addEventListener("click", async () => {
      await deleteDoc(doc(db, "recipes", recipe.id));
      loadRecipes();
    });

    recipeListDiv.appendChild(recipeCard);
  });
}

// FIXME: AI code
async function getApiKey() {
  let snapshot = await getDoc(doc(db, "apikey", "googlegenai"));
  apiKey = snapshot.data().key;
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}
async function askChatBot(request) {
  try {
    const response = await model.generateContent(request);
    const textResponse = response.response.text();
    appendMessage(textResponse);
  } catch (error) {
    appendMessage("AI Error: Unable to process request.");
    console.error(error);
  }
}

// Function to handle chatbot commands
function ruleChatBot(request) {
  if (request.startsWith("add recipe")) {
    let recipeDetails = request.replace("add recipe", "").trim();
    let parts = recipeDetails.split(";");

    if (parts.length < 2) {
      appendMessage(
        "Please specify a title and description using ';'. Example: 'add recipe Pancakes; A delicious breakfast.'"
      );
      return true;
    }

    let title = parts[0].trim();
    let description = parts[1].trim();

    if (title && description) {
      addRecipeFromChat(title, description);
      appendMessage(`Recipe "${title}" added successfully!`);
    } else {
      appendMessage(
        "Invalid recipe format. Please provide both a title and description."
      );
    }

    return true;
  } else if (request.startsWith("delete recipe")) {
    let title = request.replace("delete recipe", "").trim();

    if (title) {
      deleteRecipeFromChat(title);
    } else {
      appendMessage("Please specify the recipe title to delete.");
    }

    return true;
  }

  return false;
}
// Function to display chatbot messages
function appendMessage(message) {
  let history = document.createElement("div");
  history.textContent = message;
  history.className = "history";
  chatHistory.appendChild(history);
  chatInput.value = "";
}

async function addRecipeFromChat(title, description) {
  const newRecipe = {
    title,
    description,
    steps: [], // Empty by default, can be modified later
    tags: [],
    favourite: false,
    createdAt: new Date().toISOString(),
  };

  await addDoc(collection(db, "recipes"), newRecipe);
  loadRecipes();
}

async function deleteRecipeFromChat(title) {
  let found = false;

  for (let recipe of recipeList) {
    if (recipe.title.toLowerCase() === title.toLowerCase()) {
      await deleteDoc(doc(db, "recipes", recipe.id));
      found = true;
      break;
    }
  }

  if (found) {
    appendMessage(`Recipe "${title}" deleted.`);
    loadRecipes();
  } else {
    appendMessage(`Recipe "${title}" not found.`);
  }
}

// ONLOAD listeners and HTML
document.addEventListener("DOMContentLoaded", async () => {
  loadRecipes();

  await getApiKey();

  sendBtn.addEventListener("click", async () => {
    let prompt = chatInput.value.trim().toLowerCase();
    if (prompt) {
      if (!ruleChatBot(prompt)) {
        askChatBot(prompt);
      }
    } else {
      appendMessage("Please enter a prompt");
    }
  });

  // FIXME:
  // const tagFilter = document.getElementById("tag-filter");
  // render all tags
  // tagFilter.innerHTML =
  //   `Filter: ` +
  //   recipeList
  //     .flatMap((recipe) => recipe.tags)
  //     .map((tag) => `<button class="filter-button">${tag}</button>`)
  //     .join("");

  // MODAL BUTTONS
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
    if (tagValue !== "") {
      if (!tagMemory.includes(tagValue)) {
        tagMemory.push(tagValue);
      }
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
    // getting values from title, description and favourite checkbox
    const title = document.getElementById("recipe-title").value.trim();
    const description = document
      .getElementById("recipe-description")
      .value.trim();
    const favourite = document.getElementById("recipe-favourite").checked;

    // check input and create new recipe object
    if (title && description) {
      const newRecipe = {
        title,
        description,
        steps: [...stepMemory],
        tags: [...tagMemory],
        favourite,
        createdAt: new Date().toISOString(),
      };

      // FIRESTORE ADD RECIPE
      await addDoc(collection(db, "recipes"), newRecipe);
      loadRecipes();

      // Reset input fields after adding recipe
      resetButton.click();
      addModal.style.display = "none";
      showModalButton.style.backgroundColor = "#f4f4f4";
      tagMemory = [];
      stepMemory = [];
    }
  });

  // NAVIGATION BUTTONS
  // Add - Show/hide modal and change button color
  showModalButton.addEventListener("click", () => {
    if (addModal.style.display === "none" || addModal.style.display === "") {
      addModal.style.display = "flex";
      showModalButton.style.backgroundColor = "#f49cbb";
    } else {
      addModal.style.display = "none";
      showModalButton.style.backgroundColor = "#f4f4f4";
    }
  });
  // Home button
  homeButton.addEventListener("click", () => {
    addModal.style.display = "none";
    showModalButton.style.backgroundColor = "#f4f4f4";
    renderRecipes(recipeList);
  });
  // Favourite button
  favouriteButton.addEventListener("click", () => {
    const favouriteRecipes = recipeList.filter((recipe) => recipe.favourite);
    renderRecipes(favouriteRecipes);
  });

  renderRecipes(recipeList);
});
