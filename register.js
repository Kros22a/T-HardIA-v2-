import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Tu configuración de Supabase
const SUPABASE_URL = "https://gopqohhhzowohixbgtfp.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcHFvaGhoem93b2hpeGJndGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDgzNDIsImV4cCI6MjA3MzQ4NDM0Mn0.8lutM3tR0KkUA3dN5UcDkf84XoDRIUJFnYwz0O7v42E"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Capturamos el formulario
const registerForm = document.getElementById("register-form")

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const username = document.getElementById("username").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  // 1. Crear usuario en Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    alert("Error al registrar: " + error.message)
    return
  }

  // 2. Guardar el nombre de usuario en la tabla `profiles`
  const userId = data.user.id

  await supabase.from("profiles").insert([
    { id: userId, username }
  ])

  // 3. Guardar en localStorage el nombre de usuario para mostrar en el menú
  localStorage.setItem("username", username)

  // 4. Redirigir al inicio
  window.location.href = "index.html"
})
