const btnRestablecer = document.getElementById("btn-restablecer").addEventListener("click", () => {

    const modal = document.createElement("DIV");
    modal.className = ("containerMensaje");

    const mensaje = document.createElement("H2");
    mensaje.textContent = "✅ Cambio de clave exitoso"

    modal.appendChild(mensaje);


    document.body.appendChild(modal);


    setTimeout(() => {
        modal.remove();

    }, 1500);


});