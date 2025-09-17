// Configuración de Supabase
const SUPABASE_URL = "https://gopqohhhzowohixbgtfp.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcHFvaGhoem93b2hpeGJndGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDgzNDIsImV4cCI6MjA3MzQ4NDM0Mn0.8lutM3tR0KkUA3dN5UcDkf84XoDRIUJFnYwz0O7v42E";
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
  if (
    !data.user && 
    !window.location.pathname.endsWith("index.html") && 
    !window.location.pathname.endsWith("register.html")
  ) {
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

// ======= FORMULARIO DE CONTACTO =======
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const opinion = document.getElementById("opinion").value;
    const contenido = document.getElementById("contenido").value;
    const interes = document.getElementById("hardware").value;
    const satisfaccion = document.getElementById("satisfaccion").value;
    const recomendacion = document.getElementById("recomendacion").value;

    const { error } = await supabaseClient
      .from("feedback")
      .insert([
        {
          nombre,
          email,
          opinion,
          contenido,
          hardware,
          satisfaccion,
          recomendacion
        },
      ]);

    if (error) {
      alert("❌ Error al enviar el formulario: " + error.message);
    } else {
      alert("✅ ¡Gracias por tu feedback!");
      contactForm.reset();
    }
  });
}






