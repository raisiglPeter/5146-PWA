// import firebase, firestore
import { initializeApp } from "firebase/app";
import {
  doc,
  getDocs,
  addDoc,
  updateDoc,
  getFirestore,
  collection,
} from "firebase/firestore";
import log from "loglevel";

// initialize firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const recipeInput = document.getElementById("recipeInput");
const addRecipeButton = document.getElementById("addRecipeButton");
const recipeList = document.getElementById("recipeList");

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

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBCdNAkePR48BW0AdSOONp7sOfIirYdRv0",
  authDomain: "pwa-5719b.firebaseapp.com",
  projectId: "pwa-5719b",
  storageBucket: "pwa-5719b",
  messagingSenderId: "1077986382281",
  appId: "1:1077986382281:web:f1cca2531b3b05ac199818",
  measurementId: "G-1NPPL3P4HF",
};

window.addEventListener("load", () => {
  renderTasks();
});

// add task and save to firestore
addRecipeButton.addEventListener("click", async () => {
  // TODO: open add modal
  // more input fields

  if (task) {
    const recipeInput = document.getElementById("recipeInput");
    const taskText = sanitizeInput(task);

    if (taskText) {
      await addTaskToFirestore(taskText);
      renderTasks();
      recipeInput.value = "";
    }
    renderTasks();
  }
});

// TODO: edit recipe

// remove recipe
recipeList.addEventListener("click", async (e) => {
  if (e.target.tagName === "LI") {
    await updateDoc(doc(db, "todos", e.target.id), {
      completed: true,
    });
  }
  renderTasks();
});

// get tasks from firestore
async function renderTasks() {
  var recipes = await getTasksFromFirestore();
  recipeList.innerHTML = "";

  recipes.forEach((task) => {
    if (!task.data().completed) {
      const taskItem = document.createElement("li");
      taskItem.id = task.id;
      taskItem.textContent = task.data().text;
      recipeList.appendChild(taskItem);
    }
  });
}
// add task to firestore
async function addTaskToFirestore(taskText) {
  await addDoc(collection(db, "todos"), { text: taskText, completed: false });
}

async function getTasksFromFirestore() {
  var data = await getDocs(collection(db, "todos"));
  let userData = [];
  data.forEach((doc) => {
    userData.push(doc);
  });
  return userData;
}

// sanitize input
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// Error handling
window.addEventListener("error", function (event) {
  console.error("Error occurred: ", event.message);
});

// Set the log level (trace, debug, info, warn, error)
log.setLevel("info");

// Example logs
// log.info("Application started");
// log.debug("Debugging information");
// log.error("An error occurred");
