document.addEventListener("DOMContentLoaded", () => {
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    const template = document.getElementById('template-producto');

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const actualizarTotalCarrito = () => {
        const totalCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        const totalCarritoEl = document.getElementById("total-carrito");
        if (totalCarritoEl) {
            totalCarritoEl.textContent = `Total: $${totalCarrito.toLocaleString()}`;
        }
    };

    const renderCarrito = () => {
        contenedorCarrito.innerHTML = ""; // Limpiar contenido actual

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
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    renderCarrito();
                });

            }

            if (btnDecrementar) {
                btnDecrementar.addEventListener("click", () => {
                    if (producto.cantidad > 1) {
                        producto.cantidad -= 1;
                        localStorage.setItem("carrito", JSON.stringify(carrito));
                        renderCarrito();
                    } else {
                        // Eliminar si llega a 0
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

    renderCarrito(); // Mostrar productos al cargar
});
