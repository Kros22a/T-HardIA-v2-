import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

import { 
  collection, 
  addDoc 
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const auth = window.firebaseAuth;
const db = window.firebaseDB;

// ======= REGISTRO =======
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "usuarios"), { username, email });
      alert("✅ Registro exitoso");
      window.location.href = "index.html";
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
  });
}

// ======= LOGIN =======
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("❌ Error al iniciar sesión: " + error.message);
    }
  });
}

// ======= LOGOUT =======
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
  });
}




