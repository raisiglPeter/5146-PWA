import { renderRecipes } from "./ui.js";
import { initializeAI, askChatBot } from "./chatbot.js";
import { addRecipe } from "./firestore.js";

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
      }
    });
});
