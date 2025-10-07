/* app.js — inicializa Firebase (compat) y expone helpers globales
   Coloca este archivo en la raíz del proyecto: T-HardIA/app.js
*/

(function () {
  // ---------- Configuración Firebase (usa tu proyecto t-hardia) ----------
  const firebaseConfig = {
    apiKey: "AIzaSyClzzRrxUOTwd_dfOBE6dVv3V1G6xrTXuE",
    authDomain: "t-hardia.firebaseapp.com",
    projectId: "t-hardia",
    storageBucket: "t-hardia.firebasestorage.app",
    messagingSenderId: "462770565143",
    appId: "1:462770565143:web:d6de124051899b9c742c52",
  };

  // Inicializar (compat)
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const auth = firebase.auth();
  const db = firebase.firestore();

  // exportar globalmente
  window.appAuth = auth;
  window.appDB = db;

  // ---------- Registro ----------
  window.appRegister = async (username, email, password) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await user.updateProfile({ displayName: username });
      await db.collection("usuarios").doc(user.uid).set({
        username,
        email,
        role: "user",
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
      try { await user.sendEmailVerification(); } catch(e){ /* no bloquear */ }
      return { success: true, uid: user.uid };
    } catch (err) {
      console.error("Register error", err);
      return { success: false, error: err.message || err };
    }
  };

  // ---------- Login ----------
  window.appSignIn = async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      // no forzamos emailVerified, opcional
      return { success: true, uid: user.uid };
    } catch (err) {
      console.error("SignIn error", err);
      return { success: false, error: err.message || err };
    }
  };

  // ---------- Logout ----------
  window.appSignOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "index.html";
    } catch (e) {
      console.warn("SignOut error", e);
    }
  };

  // ---------- Protege ruta ----------
  window.appProtectRoute = (opts = {}) => {
    // Si no hay usuario redirige
    const redirect = opts.redirect || "index.html";
    const check = () => {
      const user = auth.currentUser;
      if (!user) window.location.href = redirect;
    };
    // si no está listo, esperar al onAuthStateChanged
    if (!auth.currentUser) {
      auth.onAuthStateChanged((u) => {
        if (!u) window.location.href = redirect;
      });
    } else check();
  };

  // ---------- Usuario actual ----------
  window.appCurrentUser = () => auth.currentUser || null;

  // ---------- Mostrar nombre ----------
  window.appLoadUserName = async () => {
    const user = auth.currentUser;
    if (!user) return null;
    try {
      const doc = await db.collection("usuarios").doc(user.uid).get();
      const username = (doc.exists && doc.data().username) ? doc.data().username : (user.displayName || user.email);
      const el = document.getElementById("username");
      if (el) el.textContent = username;
      return username;
    } catch (e) {
      console.warn(e);
      return user.displayName || user.email;
    }
  };

  // ---------- Guardar contacto/feedback ----------
  window.appSaveContact = async (data) => {
    try {
      await db.collection("contactos").add({
        ...data,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
      return { success: true };
    } catch (err) {
      console.error("Save contact error", err);
      return { success: false, error: err.message || err };
    }
  };

  // ---------- Guardar comparacion (cuando el usuario compara y quieres guardar) ----------
  window.appSaveComparison = async (docData) => {
    try {
      await db.collection("comparaciones").add({
        ...docData,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
      return { success: true };
    } catch (err) {
      console.error("Save comparison error", err);
      return { success: false, error: err.message || err };
    }
  };

  // ---------- Fetch componentes (tipo) ----------
  window.appFetchComponents = async (type) => {
    try {
      const snap = await db.collection("componentes").where("tipo", "==", type).get();
      const arr = [];
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      return arr;
    } catch (err) {
      console.warn("Fetch components error", err);
      return [];
    }
  };

  // ---------- Fetch articulos ----------
  window.appFetchArticles = async () => {
    try {
      const snap = await db.collection("articles").orderBy("fecha", "desc").get();
      const arr = []; snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      return arr;
    } catch (err) {
      console.warn("Fetch articles error", err);
      return [];
    }
  };

  // ---------- ADMIN helpers ----------
  window.appFetchContacts = async () => {
    try {
      const snap = await db.collection("contactos").orderBy("created_at", "desc").get();
      const arr = []; snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      return arr;
    } catch (err) {
      console.error("Fetch contacts error", err);
      return [];
    }
  };

  window.appFetchComparisons = async () => {
    try {
      const snap = await db.collection("comparaciones").orderBy("created_at", "desc").get();
      const arr = []; snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      return arr;
    } catch (err) {
      console.error("Fetch comparisons error", err);
      return [];
    }
  };

  window.appFetchUsers = async () => {
    try {
      const snap = await db.collection("usuarios").orderBy("created_at", "desc").get();
      const arr = []; snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      return arr;
    } catch (err) {
      console.error("Fetch users error", err);
      return [];
    }
  };

  window.appSetUserRole = async (uid, role) => {
    try {
      await db.collection("usuarios").doc(uid).update({ role });
      return { success: true };
    } catch (err) {
      console.error("Set role error", err);
      return { success: false, error: err.message || err };
    }
  };

  // Listener básico (para debugging)
  auth.onAuthStateChanged((u) => {
    // no hacemos redirecciones automáticas aquí
  });

})();
