<!-- Firebase SDK -->
<script type="module">
  // ======= IMPORTAR LIBRERÍAS DE FIREBASE =======
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

  // ======= CONFIGURACIÓN DE FIREBASE =======
  const firebaseConfig = {
    apiKey: "AIzaSyClzzRrxUOTwd_dfOBE6dVv3V1G6xrTXuE",
    authDomain: "t-hardia.firebaseapp.com",
    projectId: "t-hardia",
    storageBucket: "t-hardia.firebasestorage.app",
    messagingSenderId: "462770565143",
    appId: "1:462770565143:web:d6de124051899b9c742c52",
    measurementId: "G-YQ9D6T371T"
  };

  // ======= INICIALIZAR FIREBASE =======
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  // ======= REGISTRO DE USUARIO =======
  const registerForm = document.getElementById("register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("register-username").value.trim();
      const email = document.getElementById("register-email").value.trim();
      const password = document.getElementById("register-password").value.trim();

      try {
        // Crear cuenta en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Agregar nombre de usuario al perfil
        await updateProfile(user, { displayName: username });

        // Guardar datos del usuario en Firestore
        await setDoc(doc(db, "usuarios", user.uid), {
          username,
          email,
          createdAt: new Date().toISOString()
        });

        alert("✅ Registro exitoso. ¡Bienvenido a T-HardIA!");
        window.location.href = "index.html";

      } catch (error) {
        alert("❌ Error al registrarse: " + error.message);
      }
    });
  }
</script>

