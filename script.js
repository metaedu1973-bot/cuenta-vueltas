import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCaoe6R_Qbjl7TACUGgLxPd5oWfKp8oW-o",
  authDomain: "cuenta-vueltas-59c99.firebaseapp.com",
  projectId: "cuenta-vueltas-59c99",
  storageBucket: "cuenta-vueltas-59c99.firebasestorage.app",
  messagingSenderId: "425422890967",
  appId: "1:425422890967:web:874535c5dc1e44c5c2cd92",
  measurementId: "G-F5EE9VRLHB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase conectado");

async function iniciarSesion() {
  const correo = document.getElementById("correo").value;
  const clave = document.getElementById("clave").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, correo, clave);
    const uid = userCredential.user.uid;

    const docRef = doc(db, "usuarios", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const datos = docSnap.data();

      alert("Bienvenido " + datos.nombre);

      window.usuarioRol = datos.role || datos.rol;

      const login = document.getElementById("loginPanel");
      const sistema = document.getElementById("sistemaPanel");

      if (login) login.style.display = "none";
      if (sistema) sistema.style.display = "block";

      validarPermisos();
    } else {
      alert("Usuario sin permisos");
    }

  } catch (error) {
    console.error(error);
    alert("Correo o contraseña incorrectos");
  }
}

function validarPermisos() {
  if (window.usuarioRol !== "admin") {
    const btnBorrar = document.getElementById("btnBorrarCarrera");
    if (btnBorrar) {
      btnBorrar.style.display = "none";
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const sistema = document.getElementById("sistemaPanel");
  if (sistema) sistema.style.display = "none";

  const btnLogin = document.getElementById("btnLogin");
  if (btnLogin) {
    btnLogin.addEventListener("click", iniciarSesion);
  }
});