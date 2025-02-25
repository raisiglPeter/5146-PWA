// AI import
import { GoogleGenerativeAI } from "@google/generative-ai";
let apiKey, genAI, model;

// firebase imports
import { loadRecipes, addRecipe, deleteRecipe, getApiKey } from "./firebase.js";

// HTML
const addModal = document.querySelector(".add-modal");
const homeButton = document.getElementById("home-button");
const favouriteButton = document.getElementById("favourite-button");
const favouriteCheckbox = document.getElementById("recipe-favourite");
const signOutbutton = document.getElementById("signOutBttn");

const showModalButton = document.getElementById("show-modal-button");
const stepInput = document.getElementById("recipe-steps");
const tagInput = document.getElementById("recipe-tags");
const addStepButton = document.querySelector(".recipe-step-button");
const addTagButton = document.querySelector(".recipe-tag-button");
const stepsPreview = document.querySelector(".steps-preview ol");
const tagsPreview = document.querySelector(".tags-preview p");

const resetButton = document.getElementById("add-modal-reset-button");
const addRecipeButton = document.getElementById("submit-recipe");

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
    if (!model) {
      appendMessage("AI Error: Model not initialized.");
      return;
    }

    const apiResponse = await model.generateContent(request);
    const response = apiResponse.response;

    if (!response || !response.candidates || response.candidates.length === 0) {
      appendMessage("AI Error: No response from AI.");
      return;
    }

    const textResponse = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
      appendMessage("AI Error: No valid response. Try reloading the page.");
      return;
    }
    appendMessage(textResponse);
  } catch (error) {
    appendMessage("AI Error: Unable to process request. Error:", error);
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
  chatHistory.scrollTop = chatHistory.scrollHeight;
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

  showNotification("Added recipe: " + newRecipe.title);
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

// notification for added recipes
const notification = document.getElementById("notification");
function showNotification(message) {
  notification.textContent = message;
  notification.style.visibility = "visible";
  setTimeout(() => {
    notification.style.visibility = "hidden";
    notification.textContent = "";
  }, 3000);
}

// ONLOAD listeners and HTML
document.addEventListener("DOMContentLoaded", async () => {
  loadRecipes();

  await loadAndRenderRecipes();
  await setupAI();

  // enter key sends the AI chat message
  chatInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendBtn.click();
    }
  });
  // send AI chat message
  sendBtn.addEventListener("click", async () => {
    let prompt = chatInput.value.trim();

    if (!prompt) {
      appendMessage("Please enter a prompt");
      return;
    }
    if (prompt) {
      if (!ruleChatBot(prompt)) {
        askChatBot(prompt);
      }
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
    const titleInput = document.getElementById("recipe-title");
    const descInput = document.getElementById("recipe-description");
    const inputValidation = document.querySelector(".input-validation-message");

    const title = titleInput.value.trim();
    const description = descInput.value.trim();
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

      if (existingRecipe) {
        await deleteRecipe(existingRecipe.id);
        await addRecipe(updatedRecipe);
        showNotification("Updated recipe: " + title);
      } else {
        // Otherwise, add a new one
        await addRecipe(updatedRecipe);
        showNotification("Added recipe: " + title);
      }

      await addRecipe(newRecipe);

      // Reset input fields after adding recipe, show success notification
      inputValidation.style.display = "none";
      titleInput.classList.remove("recipe-input-highlight");
      descInput.classList.remove("recipe-input-highlight");
      resetButton.click();
      showNotification("Added recipe: " + newRecipe.title);
      toggleModal(false);
      loadAndRenderRecipes();
    } else {
      // input validation highlight
      inputValidation.style.display = "flex";
      if (!title) titleInput.classList.add("recipe-input-highlight");
      if (!description) descInput.classList.add("recipe-input-highlight");
    }
  });

  // NAVIGATION BUTTONS
  // Add nav button - Show/hide modal and change button color
  showModalButton.addEventListener("click", () => {
    const isModalOpen = addModal.style.display === "flex";
    toggleModal(!isModalOpen);
    showModalButton.focus();
  });
  // Home nav button
  homeButton.addEventListener("click", () => {
    loadAndRenderRecipes();
    toggleModal(false);
  });
  // Favourite nav button
  favouriteButton.addEventListener("click", async () => {
    const recipes = await loadRecipes();
    const favouriteRecipes = recipes.filter((recipe) => recipe.favourite);
    renderRecipes(favouriteRecipes);
    toggleModal(false);
  });
  // Press enter to check/uncheck the favourite checkbox
  favouriteCheckbox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents form submission if inside a form
      favouriteCheckbox.checked = !favouriteCheckbox.checked;
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

    // welcome message (only once)
    if (isClosed && !welcomeMessageShown) {
      appendMessage(
        `Welcome to the AI Chat! Commands: add recipe "Title; Description" will add recipe.\n` +
          `- delete recipe "Title" will remove a recipe.`
      );
      welcomeMessageShown = true;
    }
  });

  await loadAndRenderRecipes();
});
