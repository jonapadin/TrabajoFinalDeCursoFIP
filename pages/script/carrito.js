document.addEventListener("DOMContentLoaded", () => {
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    const template = document.getElementById('template-producto');

    const productosStorage = JSON.parse(localStorage.getItem("carrito")) || [];

    console.log("Carrito desde storage:", productosStorage);

    productosStorage.forEach(producto => {
        const clone = template.content.cloneNode(true);

        // Rellenar el clon con datos del producto
        clone.querySelector("h3").textContent = producto.marca;
        clone.querySelector(".descripcion").textContent = `ID: ${producto.id}`;
        clone.querySelector(".precio").textContent = `$${producto.precio.toLocaleString()}`;

        // Asignar cantidad al input (valor, no placeholder)
        clone.querySelector("input").value = producto.cantidad;

        // Asignar la imagen
        const img = clone.querySelector("img");
        if (img) {
            img.src = producto.img;  // Usa la propiedad correcta
            img.alt = producto.marca;
        }

        // Insertar en el contenedor
        contenedorCarrito.appendChild(clone);
    });


});
