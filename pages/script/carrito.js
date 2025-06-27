

export function agregarAlCarritoPorId(id, productosPerro, accesorios, productosEstetica, productosSalud) {
    const partes = id.split("-");
    const marca = partes[1];
    const index = parseInt(partes[2]);

    const buscarProducto = (lista) => {
        return lista.find((prod, i) => i === index && prod.marca === marca);
    };

    const producto = buscarProducto(productosPerro)
        || buscarProducto(accesorios)
        || buscarProducto(productosEstetica)
        || buscarProducto(productosSalud);

    if (producto) {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`Agregado al carrito: ${producto.marca}`);
    } else {
        console.warn("Producto no encontrado para ID:", id);
    }}
    document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.getElementById("contenedor-carrito"); 
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (!contenedor) {
        console.warn("No se encontró el contenedor del carrito.");
        return;
    }

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }

    carrito.forEach((producto) => {
        const div = document.createElement("div");
        div.className = "item-carrito";
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.marca}" width="80">
            <h3>${producto.marca}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
        `;
        contenedor.appendChild(div);
    });
});
