const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
  storageBucket: "pwa-5719b.firebasestorage.app",
  messagingSenderId: "1077986382281",
  appId: "1:1077986382281:web:f1cca2531b3b05ac199818",
  measurementId: "G-1NPPL3P4HF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Add Task
addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task) {
    const li = document.createElement("li");
    li.textContent = task;
    taskList.appendChild(li);
    taskInput.value = "";
  }
});
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

// error handling
window.addEventListener("error", function (event) {
  console.error("Error occurred: ", event.message);
});
