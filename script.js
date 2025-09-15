// Conexión con Supabase
const SUPABASE_URL = "https://gopqohhhzowohixbgtfp.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcHFvaGhoem93b2hpeGJndGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDgzNDIsImV4cCI6MjA3MzQ4NDM0Mn0.8lutM3tR0KkUA3dN5UcDkf84XoDRIUJFnYwz0O7v42E";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ==== Login ====
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Error al iniciar sesión: " + error.message);
    } else {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "dashboard.html";
    }
  });
}

// ==== Dashboard (mostrar usuario y cerrar sesión) ====
const userWelcome = document.getElementById("user-welcome");
const usernameDisplay = document.getElementById("username-display");
const logoutBtn = document.getElementById("logout-btn");

if (userWelcome || usernameDisplay) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    userWelcome.textContent = user.user_metadata?.username || "Usuario";
    usernameDisplay.textContent =
      user.user_metadata?.username || user.email || "Usuario";
  }
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
}

// ==== Menú hamburguesa ====
const hamburger = document.getElementById("hamburger");
if (hamburger) {
  hamburger.addEventListener("click", () => {
    document.querySelector(".menu ul").classList.toggle("active");
  });
}
