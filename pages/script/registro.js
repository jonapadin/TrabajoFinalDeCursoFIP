//import { validarUsuario } from "./funciones";

document.addEventListener("DOMContentLoaded", function () {
    const formularioRegistro = document.getElementById("formulario");


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
            console.log("las contraseñas deben coincidir")
            return false;
        }

        const usuario = {
            nombre: inputNombre,
            apellido: inputApellido,
            edad: inputEdad,
            password: inputClave,
            email: inputCorreo
        }



        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));


       console.log("datos guardados")

       

    })
})