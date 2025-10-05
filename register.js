<!-- Firebase SDK -->
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
    import { getAuth } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
    import { getFirestore } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

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

    // Exponemos las variables globalmente para script.js
    window.firebaseApp = app;
    window.firebaseAuth = auth;
    window.firebaseDB = db;
  </script>

  <script src="script.js" type="module"></script>
// ======= REGISTRO =======
const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });

    if (error) {
      alert("❌ Error al registrarse: " + error.message);
    } else {
      alert("✅ Registro exitoso. Revisa tu correo y confirma tu cuenta antes de iniciar sesión.");
      window.location.href = "index.html";
    }
  });
}
