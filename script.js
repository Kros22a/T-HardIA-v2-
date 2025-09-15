// Configuración de Supabase
const SUPABASE_URL = "https://TU_URL.supabase.co"; 
const SUPABASE_KEY = "TU_ANON_PUBLIC";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ======= LOGIN =======
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("❌ Error al iniciar sesión: " + error.message);
    } else {
      window.location.href = "dashboard.html";
    }
  });
}

// ======= LOGOUT =======
async function logout() {
  await supabaseClient.auth.signOut();
  window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logout-btn");
const logoutBtnMobile = document.getElementById("logout-btn-mobile");
if (logoutBtn) logoutBtn.addEventListener("click", logout);
if (logoutBtnMobile) logoutBtnMobile.addEventListener("click", logout);

// ======= PROTEGER RUTAS =======
async function protectRoute() {
  const { data } = await supabaseClient.auth.getUser();
  if (!data.user && !window.location.pathname.endsWith("index.html") && !window.location.pathname.endsWith("register.html")) {
    window.location.href = "index.html";
  }
}
protectRoute();

// ======= MOSTRAR USUARIO EN DASHBOARD =======
async function loadUser() {
  const { data } = await supabaseClient.auth.getUser();
  if (data.user) {
    const usernameSpan = document.getElementById("username");
    if (usernameSpan) {
      usernameSpan.textContent = data.user.user_metadata?.username || "Usuario";
    }
  }
}
loadUser();

// ======= MENÚ HAMBURGUESA =======
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
}




