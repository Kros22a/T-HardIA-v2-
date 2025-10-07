<script type="module">
  // === IMPORTS DE FIREBASE ===
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
  } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
  import { 
    getFirestore, 
    collection, 
    addDoc, 
    setDoc, 
    doc, 
    getDoc 
  } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

  // === CONFIGURACIÓN DE FIREBASE ===
  const firebaseConfig = {
    apiKey: "AIzaSyClzzRrxUOTwd_dfOBE6dVv3V1G6xrTXuE",
    authDomain: "t-hardia.firebaseapp.com",
    projectId: "t-hardia",
    storageBucket: "t-hardia.firebasestorage.app",
    messagingSenderId: "462770565143",
    appId: "1:462770565143:web:d6de124051899b9c742c52",
    measurementId: "G-YQ9D6T371T"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  console.log("🔥 Firebase conectado:", app.name);

  // === REGISTRO DE USUARIO ===
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("register-username").value;
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardamos datos del usuario en Firestore
        await setDoc(doc(db, "usuarios", user.uid), {
          username,
          email,
          createdAt: new Date().toISOString()
        });

        alert("✅ Registro exitoso. ¡Bienvenido!");
        window.location.href = "index.html";
      } catch (error) {
        alert("❌ Error al registrarse: " + error.message);
      }
    });
  }

  // === LOGIN ===
  const loginForm = document.getElementById("login-form");
  if






