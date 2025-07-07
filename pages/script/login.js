import { loader } from "./funciones";

document.addEventListener("DOMContentLoaded", () => {


  const formulario = document.getElementById("datosUsuario");
  const mensaje = document.getElementById("mensaje");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailIngresado = document.getElementById("email").value.trim().toLowerCase();
    const passIngresado = document.getElementById("password").value.trim();

    //validar si es admin
    if (emailIngresado === "veterinaria@gmail.com" && passIngresado === "Admin") {
      localStorage.setItem("usuarioActivo", JSON.stringify({
        nombre: "Administrador",
        email: emailIngresado,
        rol: "admin"
      }));
      localStorage.setItem("usuarioAutenticado", "true");

      loader();
      setTimeout(() => {
        const el = document.querySelector('#loader');
        el?.classList.add('fade-out');

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }, 1000);
      return;
    }

    // Usuarios comunes
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(usuario =>
      usuario.email.trim().toLowerCase() === emailIngresado
    );

    if (!usuarioEncontrado) {
      mensaje.textContent = "No hemos encontrado una cuenta asociada a este correo electrónico.";
      mensaje.style.color = "red";
      return;
    }

    if (usuarioEncontrado.password !== passIngresado) {
      mensaje.textContent = "Usuario o contraseña incorrecta.";
      mensaje.style.color = "red";
      return;
    }

    // Login exitoso para usuarios comunes
    localStorage.setItem("usuarioActivo", JSON.stringify({
      ...usuarioEncontrado,
      rol: "usuario"
    }));
    localStorage.setItem("usuarioAutenticado", "true");

    loader(); // ⬅️ Mostramos el loader primero

    // No hace falta resetear el formulario si se va a redirigir
    setTimeout(() => {
      window.location.href = "/";
    }, 3000); // Podés ajustar este tiempo
  });
});
