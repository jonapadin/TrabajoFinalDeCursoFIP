document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("datosUsuario");

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailIngresado = document.getElementById("email").value.trim().toLowerCase();
        const passIngresado = document.getElementById("password").value.trim();

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


        const usuarioEncontrado = usuarios.find(usuario =>
            usuario.email.trim().toLowerCase() === emailIngresado
        );

        if (!usuarioEncontrado) {
            console.log("Correo no registrado");
            return;
        }

        if (!usuarioEncontrado || usuarioEncontrado.password !== passIngresado) {
            console.log("usuario o contraseña");
            return;
        }

        console.log("Usuario autenticado correctamente");
        window.location.href = "http://localhost:5173/pages/usuario";
    });
});
