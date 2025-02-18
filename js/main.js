import { renderRecipes } from "./ui.js";
import { initializeAI, askChatBot } from "./chatbot.js";
import { addRecipe } from "./firestore.js";
import { openModal, closeModal, resetModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", async () => {
  await renderRecipes();
  await initializeAI();

  document.getElementById("send-btn").addEventListener("click", async () => {
    let prompt = document
      .getElementById("chat-input")
      .value.trim()
      .toLowerCase();
    if (prompt) {
      let response = await askChatBot(prompt);
      console.log(response);
    }
  });

  document
    .getElementById("submit-recipe")
    .addEventListener("click", async () => {
      const title = document.getElementById("recipe-title").value.trim();
      const description = document
        .getElementById("recipe-description")
        .value.trim();
      const favourite = document.getElementById("recipe-favourite").checked;

      if (title && description) {
        const newRecipe = {
          title,
          description,
          steps: [], // Empty for now
          tags: [],
          favourite,
          createdAt: new Date().toISOString(),
        };

        await addRecipe(newRecipe);
        renderRecipes();

        // Close the modal and reset form after adding a recipe
        resetModal();
        closeModal();
      }
    });
});

document.getElementById("show-modal-button").addEventListener("click", () => {
  const addModal = document.querySelector(".add-modal");
  if (addModal.style.display === "none" || addModal.style.display === "") {
    addModal.style.display = "flex";
    document.getElementById("show-modal-button").style.backgroundColor =
      "#f49cbb";
  } else {
    addModal.style.display = "none";
    document.getElementById("show-modal-button").style.backgroundColor =
      "#f4f4f4";
  }
});
