document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("datosUsuario");
  const mensaje = document.getElementById("mensaje");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener los valores del formulario
    const emailIngresado = document.getElementById("email").value.trim().toLowerCase();
    const passIngresado = document.getElementById("password").value.trim();

    // Obtener los usuarios registrados desde localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar el usuario por email
    const usuarioEncontrado = usuarios.find(usuario =>
      usuario.email.trim().toLowerCase() === emailIngresado
    );

    // Validación: email no registrado
    if (!usuarioEncontrado) {
      mensaje.textContent = "Correo no registrado.";
      mensaje.style.color = "red";
      return;
    }

    // Validación: contraseña incorrecta
    if (usuarioEncontrado.password !== passIngresado) {
      mensaje.textContent = "Usuario o contraseña incorrecta.";
      mensaje.style.color = "red";
      return;
    }

    // Login exitoso
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
    localStorage.setItem("usuarioAutenticado", "true");

    // Limpiar formulario
    formulario.reset();

    // Redirigir al panel de usuario
    window.location.href = "http://localhost:5173/pages/usuario.html"; // Asegurate que esta ruta sea la correcta
  });
});
