//import { validarUsuario } from "./funciones";

document.addEventListener("DOMContentLoaded", function () {
    const formularioRegistro = document.getElementById("formulario");
    const mensaje = document.getElementById("mensaje");



    formularioRegistro.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputNombre = document.getElementById('nombre').value.trim();
        const inputApellido = document.getElementById('apellido').value.trim();
        const inputEdad = document.getElementById('edad').value.trim();
        const inputClave = document.getElementById('pass').value.trim();
        const inputReclave = document.getElementById('repass').value.trim();
        const inputCorreo = document.getElementById('email').value.trim();
        console.log(inputNombre, inputApellido, inputEdad, inputClave, inputReclave, inputCorreo);


        if (inputClave !== inputReclave) {
            mensaje.textContent = ("las contraseñas deben coincidir");
            return false;
        }
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

       
        const yaRegistrado = usuarios.some(usuario =>
            usuario.email.trim().toLowerCase() === inputCorreo.toLowerCase()
        );

        if (yaRegistrado) {
            mensaje.textContent = ("El correo ya está registrado.");
            return;
        }
         const usuario = {
            nombre: inputNombre,
            apellido: inputApellido,
            edad: inputEdad,
            password: inputClave,
            email: inputCorreo
        }



       
       usuarios.push(usuario);
       localStorage.setItem("usuarios", JSON.stringify(usuarios));
       localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        console.log("datos guardados")

        formularioRegistro.reset();
         window.location.href = "http://localhost:5173/pages/usuario";

    })
})