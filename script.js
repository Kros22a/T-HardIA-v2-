// ====== Config Supabase (se usa para read-only UI checks) ======
const SUPABASE_URL = "https://gopqohhhzowohixbgtfp.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcHFvaGhoem93b2hpeGJndGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDgzNDIsImV4cCI6MjA3MzQ4NDM0Mn0.8lutM3tR0KkUA3dN5UcDkf84XoDRIUJFnYwz0O7v42E";

// createClient is provided by the CDN script included in each HTML
const APP_SUPABASE = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
window.APP_SUPABASE = APP_SUPABASE;

// ====== Menu hamburguesa ======
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.querySelector("ul").classList.toggle("active");
    });

    // cerrar menu si se pulsa fuera
    document.addEventListener("click", (e) => {
      const ul = navMenu.querySelector("ul");
      if (!navMenu.contains(e.target) && ul.classList.contains("active")) {
        ul.classList.remove("active");
      }
    });
  }

  // Mostrar nombre de usuario si hay sesión (usando localStorage o Supabase)
  updateUserDisplay();
});

// ====== Muestra usuario en menú y en dashboard ======
async function updateUserDisplay() {
  const userSpanMenu = document.getElementById("menu-username");
  const welcomeSpan = document.getElementById("welcome-username");
  const highlight = document.querySelector(".username-highlight");

  // Primero intentar desde localStorage (guardamos al iniciar sesión)
  let stored = localStorage.getItem("user");
  let username = null;

  if (stored) {
    try {
      const userObj = JSON.parse(stored);
      username = (userObj?.user_metadata?.username) || userObj?.email || null;
    } catch (e) {
      console.warn("Error parseando user en localStorage:", e);
      stored = null;
    }
  }

  // Si no hay stored, intentar obtener user desde Supabase SDK (si sesión activa en cookie)
  if (!username) {
    try {
      const res = await APP_SUPABASE.auth.getUser();
      if (res?.data?.user) {
        username = (res.data.user.user_metadata?.username) || res.data.user.email;
        // guardar en localStorage para uso inmediato
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (err) {
      console.warn("No session activa o error al obtener user:", err);
    }
  }

  if (userSpanMenu) {
    userSpanMenu.textContent = username ? `👤 ${username}` : "";
  }
  if (welcomeSpan) {
    welcomeSpan.textContent = username ? username : "Usuario";
  }
  // si hay highlight element, lo rellenamos y le damos estilo de fondo llamativo
  if (highlight) {
    highlight.textContent = username ? username : "Usuario";
    if (username) {
      highlight.style.background = "linear-gradient(90deg,#002b4d,#005784)";
      highlight.style.padding = "6px 12px";
      highlight.style.borderRadius = "999px";
      highlight.style.color = "#eaffff";
    } else {
      highlight.style.background = "transparent";
    }
  }
}

// ====== Logout global (si hay botón) ======
document.addEventListener("click", (e) => {
  const target = e.target;
  if (target && (target.id === "logout-btn" || target.id === "logout" || target.id === "logoutBtn")) {
    e.preventDefault();
    (async () => {
      try {
        await APP_SUPABASE.auth.signOut();
      } catch (err) {
        console.warn("Error al cerrar sesión (supabase):", err);
      }
      localStorage.removeItem("user");
      // redirigir a login
      window.location.href = "index.html";
    })();
  }
});



