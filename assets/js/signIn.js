import { auth } from "./firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const signInBttn = document.getElementById("signInButton");

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
