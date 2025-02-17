// test data
const recipeList = [
  {
    title: "Spaghetti Carbonara",
    description:
      "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
    steps: [
      "Boil spaghetti",
      "Cook pancetta",
      "Mix eggs and cheese",
      "Combine all ingredients",
    ],
    tags: ["pasta", "Italian", "comfort food"],
    favourite: true,
  },
  {
    title: "Chicken Stir-Fry",
    description:
      "A quick and easy stir-fry recipe with chicken, vegetables, and a savory sauce.",
    steps: [
      "Prepare vegetables",
      "Cook chicken",
      "Stir-fry vegetables",
      "Add sauce and combine",
    ],
    tags: ["Asian", "quick meal", "healthy"],
    favourite: false,
  },
  {
    title: "Chocolate Chip Cookies",
    description: "Delicious homemade cookies with gooey chocolate chips.",
    steps: ["Mix ingredients", "Scoop dough onto baking sheet", "Bake cookies"],
    tags: ["dessert", "cookies", "baking"],
    favourite: true,
  },
  {
    title: "Caesar Salad",
    description:
      "A fresh and crisp salad with romaine lettuce, croutons, and Caesar dressing.",
    steps: [
      "Chop lettuce",
      "Prepare croutons",
      "Mix dressing",
      "Combine all ingredients",
    ],
    tags: ["salad", "healthy", "easy"],
    favourite: false,
  },
  {
    title: "Beef Tacos",
    description:
      "Tasty tacos with seasoned beef, fresh toppings, and a soft tortilla.",
    steps: ["Cook beef with seasoning", "Prepare toppings", "Assemble tacos"],
    tags: ["Mexican", "quick meal", "comfort food"],
    favourite: true,
  },
];

// firebase
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

// FIRESTORE
async function loadRecipes() {
  const data = await getDocs(collection(db, "recipes"));
  const recipes = [];
  data.forEach((doc) => {
    recipes.push({ id: doc.id, ...doc.data() });
  });
  renderRecipes(recipes);
}

// service worker
const sw = new URL("service-worker.js", import.meta.url);
if ("serviceWorker" in navigator) {
  const s = navigator.serviceWorker;
  s.register(sw.href, {
    scope: "/5146-PWA/",
  })
    .then(() =>
      console.log(
        "Service Worker Registered for scope:",
        sw.href,
        "with",
        import.meta.url
      )
    )
    .catch((err) => console.error("Service Worker Error:", err));
}

// adding HTML elements and event listeners on load
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

  // FIXME:
  // const tagFilter = document.getElementById("tag-filter");
  // render all tags
  // tagFilter.innerHTML =
  //   `Filter: ` +
  //   recipeList
  //     .flatMap((recipe) => recipe.tags)
  //     .map((tag) => `<button class="filter-button">${tag}</button>`)
  //     .join("");

  // render recipes HTML
  function renderRecipes(recipes) {
    recipeListDiv.innerHTML = "";
    recipes.forEach((recipe, index) => {
      const recipeCard = document.createElement("div");
      const editButton = recipeCard.querySelector(".edit-btn");
      const deleteButton = recipeCard.querySelector(".delete-btn");
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

      editButton.addEventListener("click", () => {
        document.getElementById("recipe-title").value = recipe.title;
        document.getElementById("recipe-description").value =
          recipe.description;
        document.getElementById("recipe-favourite").checked = recipe.favourite;

        stepMemory.length = 0;
        stepsPreview.innerHTML = "";
        recipe.steps.forEach((step) => {
          stepMemory.push(step);
          const newStep = document.createElement("li");
          newStep.textContent = step;
          stepsPreview.appendChild(newStep);
        });

        tagMemory.length = 0;
        tagsPreview.textContent = "";
        recipe.tags.forEach((tag) => {
          tagMemory.push(tag);
        });
        tagsPreview.textContent = tagMemory.join(", ");

        addModal.style.display = "flex";
        showModalButton.style.backgroundColor = "#f49cbb";
      });

      deleteButton.addEventListener("click", () => {
        recipeList.splice(index, 1);
        renderRecipes(recipeList);
      });

      recipeListDiv.appendChild(recipeCard);
    });
  }

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

    if (title && description) {
      const newRecipe = {
        title,
        description,
        steps: [...stepMemory],
        tags: [...tagMemory],
        favourite,
        createdAt: new Date(),
      };

      // recipeList.push(newRecipe);
      // renderRecipes(recipeList);

      // FIRESTORE ADD RECIPE
      await addDoc(collection(db, "recipes"), newRecipe);
      loadRecipes();

      // Reset input fields after adding recipe
      resetButton.click();
      addModal.style.display = "none";
      showModalButton.style.backgroundColor = "#f4f4f4";
    }
  });

  // Show/hide modal and change button color
  showModalButton.addEventListener("click", () => {
    if (addModal.style.display === "none" || addModal.style.display === "") {
      addModal.style.display = "flex";
      showModalButton.style.backgroundColor = "#f49cbb";
    } else {
      addModal.style.display = "none";
      showModalButton.style.backgroundColor = "#f4f4f4";
    }
  });

  // home button
  homeButton.addEventListener("click", () => {
    addModal.style.display = "none";
    showModalButton.style.backgroundColor = "#f4f4f4";
    renderRecipes(recipeList); // Render full recipe list
  });

  // Favourite button event listener
  favouriteButton.addEventListener("click", () => {
    const favouriteRecipes = recipeList.filter((recipe) => recipe.favourite);
    renderRecipes(favouriteRecipes); // Render only favourite recipes
  });

  renderRecipes(recipeList); // Initial render
});
