const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("register-username").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();

    if (!username || !email || !password) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      // register: enviamos username en user_metadata
      const { data, error } = await APP_SUPABASE.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
      });

      if (error) {
        alert("Error en el registro: " + error.message);
        return;
      }

      // instruct user to confirm email
      alert("Registro exitoso ✅. Hemos enviado un correo de confirmación. Por favor revisa tu bandeja y confirma tu cuenta antes de iniciar sesión.");
      // opcionalmente redirigir al login
      window.location.href = "index.html";
    } catch (err) {
      console.error("Registro error:", err);
      alert("Ocurrió un error durante el registro.");
    }
  });
}
