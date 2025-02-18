import { loadRecipes, addRecipe, deleteRecipe } from "./firestore.js";

const recipeListDiv = document.querySelector(".recipe-list");

export async function renderRecipes() {
  const recipes = await loadRecipes();
  recipeListDiv.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
      <h2>${recipe.title} ${recipe.favourite ? "❤️" : ""}</h2>
      <p>${recipe.description}</p>
      <h3 class="recipe-list-h4">Steps:</h3>
      <ol class="ordered-list">
        ${recipe.steps.map((step, i) => `<li>${i + 1}. ${step}</li>`).join("")}
      </ol>
      <h4>Tags</h4>
      <p class="recipe-tags">${recipe.tags.join(", ")}</p>
      <div class="recipe-buttons">
        <button class="button recipe-button edit-btn">Edit</button>
        <button class="button recipe-button delete-btn">Delete</button>
      </div>
    `;

    const deleteButton = recipeCard.querySelector(".delete-btn");
    deleteButton.addEventListener("click", async () => {
      await deleteRecipe(recipe.id);
      renderRecipes();
    });

    recipeListDiv.appendChild(recipeCard);
  });
}
