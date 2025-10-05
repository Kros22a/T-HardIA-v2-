<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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
  const db = getFirestore(app);

  console.log("🔥 Firebase conectado:", app.name);

  const form = document.getElementById("contact-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      nombre: form.nombre.value,
      email: form.email.value,
      opinion: form.opinion.value,
      contenido: form.contenido.value,
      hardware: form.hardware.value,
      satisfaccion: form.satisfaccion.value,
      recomendacion: form.recomendacion.value,
      fecha: new Date().toISOString()
    };

    try {
      const docRef = await addDoc(collection(db, "contactos"), data);
      alert("✅ ¡Formulario enviado con éxito! ID: " + docRef.id);
      form.reset();
    } catch (err) {
      console.error("Error al guardar:", err);
      alert("❌ Error al enviar formulario. Revisa la consola.");
    }
  });
</script>

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







