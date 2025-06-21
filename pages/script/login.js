document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("datosUsuario");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const usuario = {
            email: "PepitoGonzalez@gmail.com",
            contrasenia: "12154hola"
        }

        const email = document.getElementById("email").value.trim();
        const pass = document.getElementById("password").value.trim();


        if (usuario.email !== email || usuario.contrasenia !== pass) {
            console.log("Usuario o contraseña incorrectos");
            return;
        }
       
        window.location.href = "http://localhost:5173/pages/usuario"
        

    });



    
});