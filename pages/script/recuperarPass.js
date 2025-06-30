const btnRecuperar = document.getElementById("btn-enviar").addEventListener("click", () => {

    const modal = document.createElement("DIV");
    modal.className = ("containerMensaje");

    const mensaje = document.createElement("H2");
    mensaje.textContent = "📩 Correo enviado exitosamente"

    modal.appendChild(mensaje);


    document.body.appendChild(modal);

    setTimeout(() => {
        modal.remove();
    }, 1500);



});