document.addEventListener("DOMContentLoaded", function () {
    const formularioRegistro = document.getElementById("formulario");
    const btnRegistrar = document.getElementById('btnReg');
    const mensaje = document.getElementById("mensaje");

    // Referencias a los inputs
    const inputNombre = document.getElementById('nombre');
    const inputApellido = document.getElementById('apellido');
    const inputEdad = document.getElementById('edad');
    const inputTelefono = document.getElementById('telefono');
    const inputClave = document.getElementById('pass');
    const inputReclave = document.getElementById('repass');
    const inputCorreo = document.getElementById('email');

    btnRegistrar.disabled = true;

    function validarFormulario() {
        const nombre = inputNombre.value.trim();
        const apellido = inputApellido.value.trim();
        const edad = inputEdad.value.trim();
        const telefono = inputTelefono.value.trim();
        const clave = inputClave.value.trim();
        const reclave = inputReclave.value.trim();
        const correo = inputCorreo.value.trim();

        const completo = nombre && apellido && edad && telefono && clave && reclave && correo;
        const clavesCoinciden = clave === reclave;

        if (clave && reclave && !clavesCoinciden) {
            mensaje.textContent = "Las contraseñas deben coincidir.";
        } else {
            mensaje.textContent = "";
        }

        const habilitar = completo && clavesCoinciden;
        btnRegistrar.disabled = !habilitar;
        btnRegistrar.classList.toggle('disabled', !habilitar);
    }
    const inputs = [inputNombre, inputApellido, inputEdad, inputTelefono, inputClave, inputReclave, inputCorreo];

    // Ejecutar validación al escribir
    inputs.forEach(input => {
        input.addEventListener('input', validarFormulario);
    });

    formularioRegistro.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = inputNombre.value.trim();
        const apellido = inputApellido.value.trim();
        const edad = inputEdad.value.trim();
        const telefono = inputTelefono.value.trim();
        const clave = inputClave.value.trim();
        const correo = inputCorreo.value.trim();


        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const yaRegistrado = usuarios.some(usuario =>
            usuario.email.trim().toLowerCase() === correo.toLowerCase()
        );

        if (yaRegistrado) {
            mensaje.textContent = "El correo ya está registrado.";
            return;
        }

        const id = window.crypto.randomUUID();
        const usuario = {
            id,
            nombre,
            apellido,
            edad,
            telefono,
            password: clave,
            email: correo
        };

        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        console.log("datos guardados");

        // overlay confirmacion
        const overlaySucces = document.createElement('div');
        overlaySucces.classList.add('overlay-success');


        const contenidoOverlay = document.createElement('div');
        contenidoOverlay.classList.add('contenido-overlay');

        // Mensaje de éxito
        const mensajeSuccess = document.createElement('p');
        mensajeSuccess.textContent = "¡Gracias por registrarte!";


        const botonConfirm = document.createElement('button');
        botonConfirm.textContent = "OK";


        contenidoOverlay.appendChild(mensajeSuccess);
        contenidoOverlay.appendChild(botonConfirm);
        overlaySucces.appendChild(contenidoOverlay);
        document.body.appendChild(overlaySucces);

        botonConfirm.addEventListener('click', () => {
            overlaySucces.remove();
            formularioRegistro.reset();
            window.location.href = "http://localhost:5173/pages/login/login.html";
        });
    });
});
s