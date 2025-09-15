// Configuración Supabase
const SUPABASE_URL = "https://gopqohhhzowohixbgtfp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcHFvaGhoem93b2hpeGJndGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDgzNDIsImV4cCI6MjA3MzQ4NDM0Mn0.8lutM3tR0KkUA3dN5UcDkf84XoDRIUJFnYwz0O7v42E";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ----------- LOGIN -----------
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      alert("❌ Error al iniciar sesión: " + error.message);
    } else {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "dashboard.html";
    }
  });
}

// ----------- PROTEGER RUTAS -----------
if (window.location.pathname.includes("dashboard.html")) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "index.html";
  } else {
    document.getElementById("username").textContent = user.user_metadata?.username || "Usuario";
  }
}

// ----------- LOGOUT -----------
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await client.auth.signOut();
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
}

const logoutBtnMobile = document.getElementById("logout-btn-mobile");
if (logoutBtnMobile) {
  logoutBtnMobile.addEventListener("click", async () => {
    await client.auth.signOut();
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
}

// ----------- MENÚ HAMBURGUESA -----------
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });
}




