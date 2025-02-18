import { renderRecipes } from "./ui.js";
import { initializeAI, askChatBot } from "./chatbot.js";

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
});
