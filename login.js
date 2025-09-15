import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://gopqohhhzowohixbgtfp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcHFvaGhoem93b2hpeGJndGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDgzNDIsImV4cCI6MjA3MzQ4NDM0Mn0.8lutM3tR0KkUA3dN5UcDkf84XoDRIUJFnYwz0O7v42E";
const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert("Error en el login: " + error.message);
    return;
  }

  // Buscar el username en profiles
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", data.user.id)
    .single();

  if (profile) {
    localStorage.setItem("username", profile.username);
  }

  alert("Bienvenido de nuevo 🎉 " + (profile?.username || ""));
  window.location.href = "index.html";
});
