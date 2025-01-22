const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  doc,
  getDocs,
  addDoc,
  updateDoc,
  getFirestore,
  collection,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCdNAkePR48BW0AdSOONp7sOfIirYdRv0",
  authDomain: "pwa-5719b.firebaseapp.com",
  projectId: "pwa-5719b",
  storageBucket: "pwa-5719b",
  messagingSenderId: "1077986382281",
  appId: "1:1077986382281:web:f1cca2531b3b05ac199818",
  measurementId: "G-1NPPL3P4HF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to sanitize input
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// Add Task and save to Firestore
addTaskBtn.addEventListener("click", async () => {
  const taskInput = document.getElementById("taskInput");
  const taskText = sanitizeInput(taskInput.value.trim()); // Sanitize input

  if (taskText) {
    await addTaskToFirestore(taskText);
    renderTasks();
    taskInput.value = "";
  }
});

async function addTaskToFirestore(taskText) {
  await addDoc(collection(db, "todos"), {
    text: taskText,
    completed: false,
  });
}

// Fetch tasks from Firestore on load
async function renderTasks() {
  var tasks = await getTasksFromFirestore();
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    if (!task.data().completed) {
      const taskItem = document.createElement("li");
      taskItem.id = task.id;
      taskItem.textContent = task.data().text;
      taskList.appendChild(taskItem);
    }
  });
}

async function getTasksFromFirestore() {
  var data = await getDocs(collection(db, "todos"));
  let userData = [];
  data.forEach((doc) => {
    userData.push(doc);
  });
  return userData;
}

// Remove Task on Click
taskList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.remove();
  }
});

const sw = new URL("service-worker.js", import.meta.url);
if ("serviceWorker" in navigator) {
  const s = navigator.serviceWorker;
  s.register(sw.href, {
    scope: "/5146-PWA/",
  })
    .then((_) =>
      console.log(
        "Service Worker Registered for scope:",
        sw.href,
        "with",
        import.meta.url
      )
    )
    .catch((err) => console.error("Service Worker Error:", err));
}

// Error handling
window.addEventListener("error", function (event) {
  console.error("Error occurred: ", event.message);
});
