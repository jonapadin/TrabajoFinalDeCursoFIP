document.addEventListener("DOMContentLoaded", () => {
    const contenedorCarrito = document.getElementById('contenedor-carrito');
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

            // Crear fondo oscuro (overlay)
            const overlay = document.createElement("div");
            overlay.id = "modal-compra";
            overlay.style.position = "fixed";
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            overlay.style.display = "flex";
            overlay.style.justifyContent = "center";
            overlay.style.alignItems = "center";
            overlay.style.zIndex = 9999;

            // Crear contenedor del modal
            const modal = document.createElement("div");
            modal.style.background = "#fff";
            modal.style.padding = "20px";
            modal.style.borderRadius = "8px";
            modal.style.width = "90%";
            modal.style.maxWidth = "400px";
            modal.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
            modal.style.textAlign = "center";

            // Título
            const titulo = document.createElement("h2");
            titulo.textContent = "Finalizar compra";
            modal.appendChild(titulo);

            // Input para correo
            const inputEmail = document.createElement("input");
            inputEmail.type = "email";
            inputEmail.placeholder = "Ingresar correo de usuario";
            inputEmail.style.width = "100%";
            inputEmail.style.margin = "10px 0";
            inputEmail.style.padding = "10px";
            inputEmail.style.border = "1px solid #ccc";
            inputEmail.style.borderRadius = "4px";
            modal.appendChild(inputEmail);

            // Botón de iniciar sesión
            const btnLogin = document.createElement("button");
            btnLogin.textContent = "Iniciar sesión";
            btnLogin.style.marginTop = "10px";
            btnLogin.style.width = "100%";
            btnLogin.style.padding = "10px";
            btnLogin.style.backgroundColor = "#4CAF50";
            btnLogin.style.color = "white";
            btnLogin.style.border = "none";
            btnLogin.style.borderRadius = "4px";
            btnLogin.addEventListener("click", () => {
                alert(`Iniciando sesión con: ${inputEmail.value}`);
                // Aquí podés redirigir o validar
                overlay.remove();
            });
            modal.appendChild(btnLogin);

            // Divider o texto
            const divider = document.createElement("p");
            divider.textContent = "o";
            divider.style.margin = "10px 0";
            modal.appendChild(divider);

            // Enlace para registrarse
            const linkRegistro = document.createElement("a");
            linkRegistro.href = "#";
            linkRegistro.textContent = "Registrar nueva cuenta";
            linkRegistro.style.display = "block";
            linkRegistro.style.marginBottom = "10px";
            linkRegistro.addEventListener("click", (e) => {
                e.preventDefault();
                alert("Redirigiendo a registro...");
                // window.location.href = "/registro.html"
                overlay.remove();
            });
            modal.appendChild(linkRegistro);

            // Botón para comprar como invitado
            const btnInvitado = document.createElement("button");
            btnInvitado.textContent = "Comprar como invitado";
            btnInvitado.style.width = "100%";
            btnInvitado.style.padding = "10px";
            btnInvitado.style.backgroundColor = "#007bff";
            btnInvitado.style.color = "white";
            btnInvitado.style.border = "none";
            btnInvitado.style.borderRadius = "4px";
            btnInvitado.addEventListener("click", () => {
                overlay.remove();
            });

            btnInvitado.addEventListener("click", () => {
                overlay.remove(); // Cierra el modal anterior

                // Crear segundo modal para datos de compra
                const modalCompra = document.createElement("div");
                modalCompra.style.position = "fixed";
                modalCompra.style.top = 0;
                modalCompra.style.left = 0;
                modalCompra.style.width = "100%";
                modalCompra.style.height = "100%";
                modalCompra.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                modalCompra.style.display = "flex";
                modalCompra.style.justifyContent = "center";
                modalCompra.style.alignItems = "center";
                modalCompra.style.zIndex = 9999;

                const contenido = document.createElement("div");
                contenido.style.background = "#fff";
                contenido.style.padding = "20px";
                contenido.style.borderRadius = "8px";
                contenido.style.width = "90%";
                contenido.style.maxWidth = "400px";
                contenido.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
                contenido.style.textAlign = "center";

                const titulo = document.createElement("h3");
                titulo.textContent = "Datos de envío";
                contenido.appendChild(titulo);

                // Campos de datos
                const inputNombre = document.createElement("input");
                inputNombre.placeholder = "Nombre completo";
                inputNombre.style.width = "100%";
                inputNombre.style.margin = "10px 0";
                inputNombre.style.padding = "10px";
                contenido.appendChild(inputNombre);

                const inputEmail = document.createElement("input");
                inputEmail.type = "email";
                inputEmail.placeholder = "Correo electrónico";
                inputEmail.style.width = "100%";
                inputEmail.style.marginBottom = "10px";
                inputEmail.style.padding = "10px";
                contenido.appendChild(inputEmail);

                const inputDireccion = document.createElement("input");
                inputDireccion.placeholder = "Dirección de entrega";
                inputDireccion.style.width = "100%";
                inputDireccion.style.marginBottom = "15px";
                inputDireccion.style.padding = "10px";
                contenido.appendChild(inputDireccion);

                const inputTelefono = document.createElement("input");
                inputTelefono.type = "tel";
                inputTelefono.placeholder = "Número de teléfono";
                inputTelefono.style.width = "100%";
                inputTelefono.style.marginBottom = "10px";
                inputTelefono.style.padding = "10px";
                contenido.appendChild(inputTelefono);

                // DNI
                const inputDNI = document.createElement("input");
                inputDNI.type = "text";
                inputDNI.placeholder = "DNI";
                inputDNI.style.width = "100%";
                inputDNI.style.marginBottom = "15px";
                inputDNI.style.padding = "10px";
                contenido.appendChild(inputDNI);

                // Botón finalizar
                const btnConfirmar = document.createElement("button");
                btnConfirmar.textContent = "Confirmar compra";
                btnConfirmar.style.width = "100%";
                btnConfirmar.style.padding = "10px";
                btnConfirmar.style.backgroundColor = "#28a745";
                btnConfirmar.style.color = "white";
                btnConfirmar.style.border = "none";
                btnConfirmar.style.borderRadius = "4px";
                btnConfirmar.addEventListener("click", () => {
                    const nombre = inputNombre.value.trim();
                    const email = inputEmail.value.trim();
                    const direccion = inputDireccion.value.trim();
                    const telefono = inputTelefono.value.trim();
                    const dni = inputDNI.value.trim();

                    if (!nombre || !email || !direccion || !telefono || !dni) {
                        alert("Por favor, completá todos los campos.");
                        return;
                    }

                    const datosInvitado = [{
                        nombre,
                        email,
                        direccion,
                        telefono,
                        dni,
                        fechaCompra: new Date().toISOString()
                    }];

                    localStorage.setItem("compraInvitado", JSON.stringify(datosInvitado));

                    alert("¡Gracias por tu compra! Tus datos fueron guardados.");

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
                modalCompra.appendChild(contenido);
                document.body.appendChild(modalCompra);
            });

            modal.appendChild(btnInvitado);

            // Botón cerrar (opcional)
            const btnCerrar = document.createElement("span");
            btnCerrar.textContent = "✖";
            btnCerrar.style.position = "absolute";
            btnCerrar.style.top = "15px";
            btnCerrar.style.right = "20px";
            btnCerrar.style.cursor = "pointer";
            btnCerrar.style.fontSize = "18px";
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
                    producto.cantidad += 1;
                    producto.subtotal = producto.precio * producto.cantidad;
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    renderCarrito();
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
