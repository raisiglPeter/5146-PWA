import { auth } from "./firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const signInBttn = document.getElementById("signIn");

const sw = new URL("service-worker.js", import.meta.url);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(sw.href, { scope: "/5146-PWA/" })
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

function signIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      localStorage.setItem("email", JSON.stringify(user.email));
      window.location = "recipes.html";
    })
    .catch((error) => {
      console.error("Sign-in error:", error.message);
    });
}

signInBttn.addEventListener("click", signIn);
