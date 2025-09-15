// Configuración de Supabase
const SUPABASE_URL = "https://TU_URL.supabase.co"; 
const SUPABASE_KEY = "TU_ANON_PUBLIC";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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
