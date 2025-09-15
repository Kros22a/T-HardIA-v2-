// Usa la instancia global APP_SUPABASE (creada en script.js)
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
      alert("Por favor ingresa correo y contraseña.");
      return;
    }

    try {
      const { data, error } = await APP_SUPABASE.auth.signInWithPassword({ email, password });
      if (error) {
        alert("Error iniciando sesión: " + error.message);
        return;
      }

      // data.user contiene user_metadata si existe
      const user = data.user;
      if (user) {
        // guardamos en localStorage para mostrar nombre en UI
        localStorage.setItem("user", JSON.stringify(user));
        // actualizar display inmediatamente
        await updateUserDisplay();
        // redirigir
        window.location.href = "dashboard.html";
      } else {
        alert("No se recibió información de usuario. Revisa tu cuenta o confirma tu correo.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Ocurrió un error al intentar iniciar sesión.");
    }
  });
}
