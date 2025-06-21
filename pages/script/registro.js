

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

        function validar(obj) {
            for (const [campo, valor] of Object.entries(obj)) {
                if (!valor || valor.trim() === "") {
                    console.log(`El campo "${campo}" no debe estar vacío.`);
                    return false;
                }

                switch (campo) {
                  case "nombre":
                  case "apellido":
                    if (valor.length < 3) {
                      console.log(
                        `El ${campo} debe contener un mínimo de 3 caracteres`
                      );
                      return false;
                    }
                    break;

                  case "edad":
                    const edadNumero = parseInt(valor, 10);
                    if (isNaN(edadNumero)) {
                      console.log("La edad debe ser un número válido.");
                      return false;
                    }
                    if (edadNumero < 18) {
                      console.log("Debes tener al menos 18 años.");
                      return false;
                    }
                    break;

                  case "email":
                    if (!/^\S+@\S+\.\S+$/.test(valor)) {
                      console.log(
                        `El campo "${campo}" debe ser un correo válido.`
                      );
                      return false;
                    }
                    break;
                }
            }
            console.log("Todos los campos son válidos.");
            return true;
        }

        const usuario = {
            nombre: inputNombre,
            apellido: inputApellido,
            edad: inputEdad,
            pass: inputClave,
            email: inputCorreo
        }


       if( validar(usuario)) {
                    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
       }

       console.log("no hay datos para guardar")

    })
})