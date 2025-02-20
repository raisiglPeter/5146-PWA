// AI import
import { GoogleGenerativeAI } from "@google/generative-ai";
let apiKey, genAI, model;

// firebase imports
import { loadRecipes, addRecipe, deleteRecipe, getApiKey } from "./firebase.js";

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
const signOutbutton = document.getElementById("signOutBttn");
const recipeListUl = document.querySelector(".recipe-list");
// AI HTML
const chatHistory = document.getElementById("chat-history");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const closeAI = document.getElementById("close-chat-btn");
const chatbotButtons = document.querySelector(".chatbot-buttons");
const chatbotContainer = document.getElementById("chatbot-container");
const chatInputLabel = document.getElementById("chat-input-label");

// temporary memory
let tagMemory = [];
let stepMemory = [];

// check for signin email
const email = JSON.parse(localStorage.getItem("email"));
if (!email) {
  window.location.href = "index.html";
}
// signout user if no email is found in local storage
signOutbutton.addEventListener("click", function () {
  localStorage.removeItem("email");
  window.location.href = "index.html";
});

// get firestore recipes
async function loadAndRenderRecipes() {
  const recipes = await loadRecipes();
  renderRecipes(recipes);
}

// toggle add recipe modal
function toggleModal(visible) {
  addModal.style.display = visible ? "flex" : "none";
  showModalButton.style.backgroundColor = visible ? "#f49cbb" : "#f4f4f4";
  showModalButton.innerText = visible ? "Close" : "Add";
  addModal.setAttribute("aria-hidden", visible ? "false" : "true");
}

// render recipes HTML
function renderRecipes(recipes) {
  recipeListUl.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("li");

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

      toggleModal(true);
    });

    deleteButton.addEventListener("click", async () => {
      await deleteRecipe(recipe.id);
      loadAndRenderRecipes();
    });

    recipeListUl.appendChild(recipeCard);
  });
}

// AI code
async function setupAI() {
  apiKey = await getApiKey();
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}
async function askChatBot(request) {
  try {
    const response = await model.generateContent(request);
    const textResponse =
      response.candidates[0]?.content.parts[0]?.text ||
      "AI Error: No response.";

    appendMessage(textResponse);
  } catch (error) {
    appendMessage("AI Error: Unable to process request.");
    console.error(error);
  }
}
// function to handle chatbot commands
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
      if (confirm(`Are you sure you want to delete "${title}"?`)) {
        deleteRecipeFromChat(title);
      }
    } else {
      appendMessage("Please specify the recipe title to delete.");
    }

    return true;
  }

  return false;
}
// display chatbot messages
function appendMessage(message) {
  let history = document.createElement("div");
  history.textContent = message;
  history.className = "history";
  chatHistory.appendChild(history);
  chatInput.value = "";
}
// adding a recipe with AI
async function addRecipeFromChat(title, description) {
  const newRecipe = {
    title,
    description,
    steps: [],
    tags: [],
    favourite: false,
    createdAt: new Date().toISOString(),
  };

  await addRecipe(newRecipe);

  loadAndRenderRecipes();
}
// remove recipe from AI chat
async function deleteRecipeFromChat(title) {
  let found = false;

  const recipes = await loadRecipes();
  for (let recipe of recipes) {
    if (recipe.title.toLowerCase() === title.toLowerCase()) {
      await deleteRecipe(recipe.id);
      found = true;
      break;
    }
  }
  if (found) {
    appendMessage(`Recipe "${title}" deleted.`);
    loadAndRenderRecipes();
  } else {
    appendMessage(`Recipe "${title}" not found.`);
  }
}

// ONLOAD listeners and HTML
document.addEventListener("DOMContentLoaded", async () => {
  loadRecipes();

  await loadAndRenderRecipes();
  await setupAI();

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
    tagMemory = [];
    stepMemory = [];
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
      await addRecipe(newRecipe);

      // Reset input fields after adding recipe
      resetButton.click();
      toggleModal(false);
    }
  });

  // NAVIGATION BUTTONS
  // Add nav button - Show/hide modal and change button color
  showModalButton.addEventListener("click", () => {
    const isModalOpen = addModal.style.display === "flex";
    toggleModal(!isModalOpen);
  });
  // Home nav button
  homeButton.addEventListener("click", () => {
    addModal.style.display = "none";
    showModalButton.style.backgroundColor = "#f4f4f4";
    loadAndRenderRecipes();
  });
  // Favourite nav button
  favouriteButton.addEventListener("click", async () => {
    const recipes = await loadRecipes();
    const favouriteRecipes = recipes.filter((recipe) => recipe.favourite);
    renderRecipes(favouriteRecipes);
  });
  // Press enter to check/uncheck the favourite checkbox
  favouriteButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let activeElement = document.activeElement;
      if (activeElement.type === "checkbox") {
        activeElement.checked = !activeElement.checked;
      }
    }
  });

  // CHATBOT BUTTONS
  // default state for the AI Chat button
  chatHistory.style.display = "none";
  chatInput.style.display = "none";
  chatInputLabel.style.display = "none";
  sendBtn.style.display = "none";
  closeAI.innerText = "AI Chat";
  chatbotButtons.style.justifyContent = "center";
  chatbotContainer.style.width = "auto";

  let welcomeMessageShown = false;

  // Open/close AI Chat window
  closeAI.addEventListener("click", () => {
    const isClosed = chatHistory.style.display === "none";

    chatbotContainer.style.width = isClosed ? "300px" : "auto";
    chatHistory.style.display = isClosed ? "block" : "none";
    chatInputLabel.style.display = isClosed ? "block" : "none";
    chatInput.style.display = isClosed ? "block" : "none";
    sendBtn.style.display = isClosed ? "block" : "none";
    closeAI.innerText = isClosed ? "Close" : "AI Chat";
    chatbotButtons.style.justifyContent = isClosed ? "space-between" : "center";

    // Chat welcome message (only once)
    if (isClosed && !welcomeMessageShown) {
      appendMessage(
        `Welcome to the AI Chat! Available commands:\n` +
          `- add recipe "Title; Description" → Add a recipe.\n` +
          `- delete recipe "Title" → Remove a recipe.`
      );
      welcomeMessageShown = true;
    }
  });

  await loadAndRenderRecipes();
});
