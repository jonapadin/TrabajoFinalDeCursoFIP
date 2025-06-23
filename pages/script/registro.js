document.addEventListener("DOMContentLoaded", function () {
    const formularioRegistro = document.getElementById("formulario");
    const btnRegistrar = document.getElementById('btnReg');
    const mensaje = document.getElementById("mensaje");

    // Referencias a los inputs
    const inputNombre = document.getElementById('nombre');
    const inputApellido = document.getElementById('apellido');
    const inputEdad = document.getElementById('edad');
    const inputClave = document.getElementById('pass');
    const inputReclave = document.getElementById('repass');
    const inputCorreo = document.getElementById('email');

    btnRegistrar.disabled = true;

    function validarFormulario() {
        const nombre = inputNombre.value.trim();
        const apellido = inputApellido.value.trim();
        const edad = inputEdad.value.trim();
        const clave = inputClave.value.trim();
        const reclave = inputReclave.value.trim();
        const correo = inputCorreo.value.trim();

        const completo = nombre && apellido && edad && clave && reclave && correo;
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

    // Ejecutar validación al escribir
    [inputNombre, inputApellido, inputEdad, inputClave, inputReclave, inputCorreo].forEach(input => {
        input.addEventListener('input', validarFormulario);
    });

    formularioRegistro.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = inputNombre.value.trim();
        const apellido = inputApellido.value.trim();
        const edad = inputEdad.value.trim();
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
            password: clave,
            email: correo
        };

        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        console.log("datos guardados");

        formularioRegistro.reset();
        window.location.href = "http://localhost:5173/pages/usuario";
    });
});
