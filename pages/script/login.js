document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("datosUsuario");
    const mensaje = document.getElementById("mensaje"); 

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailIngresado = document.getElementById("email").value.trim().toLowerCase();
        const passIngresado = document.getElementById("password").value.trim();

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


        const usuarioEncontrado = usuarios.find(usuario =>
            usuario.email.trim().toLowerCase() === emailIngresado
        );

      

        if (!usuarioEncontrado) {
              mensaje.textContent =("Correo no registrado");
            return;
        }

        if (!usuarioEncontrado || usuarioEncontrado.password !== passIngresado) {
              mensaje.textContent =("Usuario o Contraseña Incorrecta.");
            return;
        }

         localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

       formulario.reset();
     
        window.location.href = "http://localhost:5173/pages/usuario";
    });
});
