//import { validarUsuario } from "./funciones";

document.addEventListener("DOMContentLoaded", function () {
    const formularioRegistro = document.getElementById("formulario");
    const mensaje = document.getElementById("mensaje");

    function validarCampos(nombre, apellido, edad, email, password) {
    const errores = [];

    if (nombre.length < 3) {
        errores.push("El nombre debe tener al menos 3 caracteres.");
    }
    if (apellido.length < 3) {
        errores.push("El apellido debe tener al menos 3 caracteres.");
    }

    if (!/^\d+$/.test(edad) || parseInt(edad) < 18) {
        errores.push("Debes ingresar una edad valida (mayor de 18).");
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        errores.push("El correo electronico no es valido.");
    }

    if (password.length < 8) {
        errores.push("La contraseña debe tener al menos 8 caracteres.");
    }
    if (!/[A-Z]/.test(password)) {
        errores.push("La contraseña debe incluir al menos una letra mayuscula.");
    }
    if (!/[a-z]/.test(password)) {
        errores.push("La contraseña debe incluir al menos una letra minuscula.");
    }
    if (!/[0-9]/.test(password)) {
        errores.push("La contraseña debe incluir al menos un numero.");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
        errores.push("La contraseña debe incluir al menos un caracter especial.");
    }

    return errores;
}




    formularioRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        mensaje.textContent = "";

        const inputNombre = document.getElementById('nombre').value.trim();
        const inputApellido = document.getElementById('apellido').value.trim();
        const inputEdad = document.getElementById('edad').value.trim();
        const inputClave = document.getElementById('pass').value.trim();
        const inputReclave = document.getElementById('repass').value.trim();
        const inputCorreo = document.getElementById('email').value.trim();
        console.log(inputNombre, inputApellido, inputEdad, inputClave, inputReclave, inputCorreo);

        const errores = validarCampos(inputNombre, inputApellido, inputEdad, inputCorreo, inputClave);
          
        if (errores.length > 0) {
            mensaje.innerHTML = errores.join("<br>");
            return;
        }

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