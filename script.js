// ==============================
// Conexión con Supabase
// ==============================
const SUPABASE_URL = "https://gopqohhhzowohixbgtfp.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcHFvaGhoem93b2hpeGJndGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDgzNDIsImV4cCI6MjA3MzQ4NDM0Mn0.8lutM3tR0KkUA3dN5UcDkf84XoDRIUJFnYwz0O7v42E";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ==============================
// LOGIN
// ==============================
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
      alert("⚠️ Por favor ingresa correo y contraseña.");
      return;
    }

    try {
      const { data, error } = await _supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("❌ Error al iniciar sesión: " + error.message);
      } else {
        // Guardamos al usuario en localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "dashboard.html";
      }
    } catch (err) {
      console.error("Error inesperado en login:", err);
      alert("❌ Ocurrió un error inesperado.");
    }
  });
}

// ==============================
// LOGOUT
// ==============================
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await _supabase.auth.signOut();
      localStorage.removeItem("user");
      window.location.href = "index.html";
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      alert("❌ Ocurrió un error al cerrar sesión.");
    }
  });
}

// ==============================
// MOSTRAR NOMBRE DE USUARIO EN DASHBOARD
// ==============================
async function showUsername() {
  const userData = localStorage.getItem("user");
  if (!userData) return;

  const user = JSON.parse(userData);

  // Extraer el nombre de usuario de los metadatos
  const username =
    user.user_metadata && user.user_metadata.username
      ? user.user_metadata.username
      : user.email;

  const usernameDisplay = document.getElementById("username-display");
  if (usernameDisplay) {
    usernameDisplay.textContent = username;
  }
}

document.addEventListener("DOMContentLoaded", showUsername);

