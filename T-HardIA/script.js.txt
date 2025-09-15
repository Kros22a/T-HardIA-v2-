// Configura tu Supabase
const SUPABASE_URL = "https://gopqohhhzowohixbgtfp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcHFvaGhoem93b2hpeGJndGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDgzNDIsImV4cCI6MjA3MzQ4NDM0Mn0.8lutM3tR0KkUA3dN5UcDkf84XoDRIUJFnYwz0O7v42E";

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let { user, error } = await supabaseClient.auth.signUp({ email, password });
  document.getElementById("message").innerText = error ? error.message : "Registro exitoso";
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    document.getElementById("message").innerText = error.message;
  } else {
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "dashboard.html";
  }
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

window.onload = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && document.getElementById("username")) {
    document.getElementById("username").innerText = `Usuario: ${user.email}`;
  }
};
