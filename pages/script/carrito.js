document.addEventListener("DOMContentLoaded", () => {
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    contenedorCarrito.classList.add('contenedor-carrito')
    const template = document.getElementById('template-producto');

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    console.log("productos carrito:", carrito);

    const actualizarTotalCarrito = () => {
        // Elimina total anterior si existe
        const totalExistente = document.getElementById("total-carrito");
        if (totalExistente) {
            totalExistente.remove();
        }

        // Calcular total
        const totalCarrito = carrito.reduce((acc, item) => acc + item.subtotal, 0);

        // Formatear como moneda en pesos argentinos
        const formateadorARS = new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2
        });

        // Crear nuevo elemento con el total
        const totalParrafo = document.createElement("p");
        totalParrafo.id = "total-carrito";
        totalParrafo.textContent = `Total: ${formateadorARS.format(totalCarrito)}`;
        totalParrafo.className = "total"
        contenedorCarrito.appendChild(totalParrafo);


        const btnFinalizar = document.createElement("button");
        btnFinalizar.id = "btn-finalizar";
        btnFinalizar.textContent = "Finalizar compra";
        btnFinalizar.className = "btn-finalizar-compra";


        btnFinalizar.addEventListener("click", () => {
            // Evitar que se creen múltiples modales
            if (document.getElementById("modal-compra")) return;

            // Crear overlay
            const overlay = document.createElement("div");
            overlay.id = "modal-compra";
            overlay.classList.add("modal-compra");

            // Crear contenedor del modal
            const modal = document.createElement("div");
            modal.classList.add("modal-contenido");



            // Título
            const titulo = document.createElement("h2");
            titulo.textContent = "Finalizar compra";
            modal.appendChild(titulo);

            // Input para correo
            const inputEmail = document.createElement("input");
            inputEmail.type = "email";
            inputEmail.placeholder = "Ingresar correo de usuario";
            inputEmail.classList.add("input-email");
            modal.appendChild(inputEmail);

            // Botón de iniciar sesión
            const btnLogin = document.createElement("button");
            btnLogin.textContent = "Iniciar sesión";
            btnLogin.classList.add("btn-login");
            modal.appendChild(btnLogin);


            // Separador
            const separador = document.createElement("p");
            separador.textContent = "o";
            separador.style.margin = "10px 0";
            modal.appendChild(separador);

            // Enlace para registrarse
            const linkRegistro = document.createElement("a");
            linkRegistro.href = "#";
            linkRegistro.textContent = "Registrar nueva cuenta";
            linkRegistro.classList.add("link-registro");
            modal.appendChild(linkRegistro);
            linkRegistro.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = "http://localhost:5173/pages/login/registro/registro.html"
                overlay.remove();
            });
            modal.appendChild(linkRegistro);

            // Botón para comprar como invitado
            const btnInvitado = document.createElement("button");
            btnInvitado.textContent = "Comprar como invitado";
            btnInvitado.classList.add('btn-invitado')
            btnInvitado.addEventListener("click", () => {
                overlay.remove();
            });

            btnInvitado.addEventListener("click", () => {

                // Modal para datos de compra
                const modalCompra = document.createElement("div");
                modalCompra.classList.add('modal-compra')
                const contenido = document.createElement("div");
                contenido.classList.add('modal-contenido')

                const titulo = document.createElement("h3");
                titulo.textContent = "Datos de envío";
                contenido.appendChild(titulo);

                // Campos de datos
                const inputNombre = document.createElement("input");
                inputNombre.placeholder = "Nombre completo";
                inputNombre.classList.add("input-datos-m");
                contenido.appendChild(inputNombre);

                const inputEmail = document.createElement("input");
                inputEmail.type = "email";
                inputEmail.placeholder = "Correo electrónico";
                inputEmail.classList.add("input-datos-m");
                contenido.appendChild(inputEmail);

                // Desplegable para seleccionar el correo de envío
                const selectCorreo = document.createElement("select");
                selectCorreo.classList.add("input-datos-m");

                const opcionesCorreo = ["Seleccione un correo", "Correo Argentino", "OCA", "Andreani"];
                opcionesCorreo.forEach(opcionTexto => {
                    const opcion = document.createElement("option");
                    opcion.value = opcionTexto.toLowerCase().replace(/\s+/g, '-');
                    opcion.textContent = opcionTexto;
                    selectCorreo.appendChild(opcion);
                });

                contenido.appendChild(selectCorreo);
                const inputTelefono = document.createElement("input");
                inputTelefono.type = "tel";
                inputTelefono.placeholder = "Número de teléfono";
                inputTelefono.classList.add("input-datos-m");
                contenido.appendChild(inputTelefono);

                const inputDNI = document.createElement("input");
                inputDNI.type = "text";
                inputDNI.placeholder = "DNI";
                inputDNI.classList.add("input-datos-m");
                contenido.appendChild(inputDNI);

                // Botón finalizar
                const btnConfirmar = document.createElement("button");
                btnConfirmar.textContent = "Confirmar compra";
                btnConfirmar.classList.add("btn-confirmar");
                contenido.appendChild(btnConfirmar);

                const btnCerrar = document.createElement("span");
                btnCerrar.textContent = "✖";
                btnCerrar.classList.add('btn-cerrar');
                btnCerrar.addEventListener("click", () => {
                    modalCompra.remove();
                });




                btnConfirmar.addEventListener("click", () => {
                    const nombre = inputNombre.value.trim();
                    const email = inputEmail.value.trim();
                    const correoSeleccionado = selectCorreo.value;
                    const telefono = inputTelefono.value.trim();
                    const dni = inputDNI.value.trim();

                    /*validaciones */

                    if (!nombre || !email || correoSeleccionado === "seleccione-un-correo" || !telefono || !dni) {

                        /*alert */
                        const messageWarn = document.createElement("p");
                        messageWarn.textContent = "Por favor, completá todos los campos."
                        messageWarn.style = "color: red"
                        contenido.appendChild(messageWarn)

                        setTimeout(() => {
                            messageWarn.remove()
                        }, 2000);
                        return;
                    }

                    const nombreValido = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s'-]+$/;

                    if (!nombreValido.test(nombre)) {
                        const messageWarn = document.createElement("p");
                        messageWarn.textContent = "El nombre y apellido no deben contener números ni caracteres especiales.";
                        messageWarn.style = "color: red";
                        contenido.appendChild(messageWarn);

                        setTimeout(() => {
                            messageWarn.remove()
                        }, 2000);
                        return;
                    }

                    const telefonoValido = /^\d{10,15}$/;

                    if (!telefonoValido.test(telefono)) {
                        const messageWarn = document.createElement("p");
                        messageWarn.textContent = "El teléfono debe contener solo números (entre 10 y 15 dígitos).";
                        messageWarn.style = "color: red";
                        contenido.appendChild(messageWarn);

                        setTimeout(() => {
                            messageWarn.remove()
                        }, 2000);
                        return;
                    }

                    const dniValido = /^\d{7,8}$/;

                    if (!dniValido.test(dni)) {
                        const messageWarn = document.createElement("p");
                        messageWarn.textContent = "El DNI debe contener solo números (7 u 8 dígitos).";
                        messageWarn.style = "color: red";
                        contenido.appendChild(messageWarn);

                        setTimeout(() => {
                            messageWarn.remove()
                        }, 2000);
                        return;
                    }

                    const datosInvitado = [{
                        nombre,
                        email,
                        correo: correoSeleccionado,
                        telefono,
                        dni,
                        fechaCompra: new Date().toISOString()
                    }];

                    localStorage.setItem("compraInvitado", JSON.stringify(datosInvitado));

                    // overlay confirmacion
                    const overlaySucces = document.createElement('div');
                    overlaySucces.classList.add('overlay-success');


                    const contenidoOverlay = document.createElement('div');
                    contenidoOverlay.classList.add('contenido-overlay');

                    // Mensaje de éxito
                    const mensajeSuccess = document.createElement('p');
                    mensajeSuccess.textContent = "¡Gracias por tu compra! Hemos guardado tus datos de envío y pronto recibirás un correo de confirmación.!";


                    const botonConfirm = document.createElement('button');
                    botonConfirm.classList.add('btn-confirm');
                    botonConfirm.textContent = "OK";

                    botonConfirm.addEventListener('click', () => {
                        overlaySucces.remove();
                    })

                    contenidoOverlay.appendChild(mensajeSuccess);
                    contenidoOverlay.appendChild(botonConfirm)
                    overlaySucces.appendChild(contenidoOverlay);
                    document.body.appendChild(overlaySucces);

                    // Vaciar carrito y DOM
                    localStorage.removeItem("carrito");
                    carrito = [];
                    const contenedorCarrito = document.getElementById("contenedor-carrito");
                    if (contenedorCarrito) contenedorCarrito.innerHTML = "";

                    if (typeof renderCarrito === "function") {
                        renderCarrito();
                    }

                    modalCompra.remove();
                });

                contenido.appendChild(btnConfirmar);
                contenido.appendChild(btnCerrar);
                modalCompra.appendChild(contenido);
                document.body.appendChild(modalCompra);

            });

            modal.appendChild(btnInvitado);

            // Botón cerrar
            const btnCerrar = document.createElement("span");
            btnCerrar.textContent = "✖";
            btnCerrar.classList.add('btn-cerrar')
            btnCerrar.addEventListener("click", () => {
                overlay.remove();
            });
            modal.appendChild(btnCerrar);

            overlay.appendChild(modal);
            document.body.appendChild(overlay);
        });

        contenedorCarrito.appendChild(btnFinalizar);
    };

    const renderCarrito = () => {
        contenedorCarrito.innerHTML = "";

        if (carrito.length === 0) {
            const mensajeVacio = document.createElement("p");
            mensajeVacio.textContent = "No hay productos en el carrito.";
            mensajeVacio.classList.add("mensaje-vacio");
            contenedorCarrito.appendChild(mensajeVacio);

            const totalCarritoEl = document.getElementById("total-carrito");
            if (totalCarritoEl) {
                totalCarritoEl.textContent = "Total: $0";
            }

            return;
        }

        carrito.forEach(producto => {
            const clone = template.content.cloneNode(true);

            // Mostrar datos
            clone.querySelector("h3").textContent = producto.marca;
            clone.querySelector(".descripcion").textContent = `Producto: ${producto.descripcion}`;
            clone.querySelector(".precio").textContent = `$${(producto.precio * producto.cantidad).toLocaleString()}`;
            clone.querySelector("input").value = producto.cantidad;

            const img = clone.querySelector("img");
            if (img) {
                img.src = producto.img;
                img.alt = producto.marca;
            }

            // Botones
            const btnDecrementar = clone.getElementById("btn-decrementar");
            const btnIncrementar = clone.getElementById("btn-incrementar");

            if (btnIncrementar) {
                btnIncrementar.addEventListener("click", () => {
                    if (producto.cantidad < producto.stock) {
                        producto.cantidad += 1;
                        producto.subtotal = producto.precio * producto.cantidad;
                        localStorage.setItem("carrito", JSON.stringify(carrito));
                        renderCarrito();
                    } else {
                        alert("No hay más stock disponible de este producto.");
                    }
                });
            }

            if (btnDecrementar) {
                btnDecrementar.addEventListener("click", () => {
                    if (producto.cantidad > 1) {
                        producto.cantidad -= 1;
                        producto.subtotal = producto.precio * producto.cantidad;
                        localStorage.setItem("carrito", JSON.stringify(carrito));
                        renderCarrito();
                    } else {
                        carrito = carrito.filter(p => p.id !== producto.id);
                        localStorage.setItem("carrito", JSON.stringify(carrito));
                        renderCarrito();
                    }
                });
            }


            contenedorCarrito.appendChild(clone);
        });

        actualizarTotalCarrito();
    };

    // Mostrar productos al cargar
    renderCarrito();
});