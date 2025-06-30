import { obtenerProductos } from "./fetchProductos";
import { crearTarjeta, crearTitulo } from "./funciones";

document.addEventListener("DOMContentLoaded", async function () {

    // Seccion alimento, elementos
    const contenedor = document.getElementById("seccion-productos");
    contenedor.className = "seccionProductos";

    const seccionAlimento = document.createElement("section");
    seccionAlimento.className = "seccionAlimento";

    const tituloAlimentos = crearTitulo("Alimento", ['titulo']);
    contenedor.appendChild(tituloAlimentos);

    // Seccion Accesorios, elementos
    const contenedorAccesorios = document.getElementById('seccion-accesorios');
    contenedorAccesorios.className = "seccionProductos";

    const seccionAccesorios = document.createElement("section");
    seccionAccesorios.className = "seccionAlimento";

    const tituloAccesorios = crearTitulo("Accesorios", ["titulo"]);
    contenedorAccesorios.appendChild(tituloAccesorios);

    // Seccion Estetica e Higiene, elementos
    const contenedorEsteticaHigiene = document.getElementById('seccion-esteticaHigiene');

    const seccionEsteticaHigiene = document.createElement('section');
    seccionEsteticaHigiene.className = "seccionAlimento";

    const tituloEsteticaH = crearTitulo("Estetica e Higiene", ["titulo"]);
    contenedorEsteticaHigiene.appendChild(tituloEsteticaH);

    // Seccion salud, elementos
    const contenedorSalud = document.getElementById('seccion-salud');

    const seccionSalud = document.createElement('section');
    seccionSalud.className = "seccionAlimento";

    const tituloSalud = crearTitulo("Salud");
    tituloSalud.className = "titulo";
    contenedorSalud.appendChild(tituloSalud);

    // fetch a datos
    const dataProduct = await obtenerProductos();

    if (!dataProduct || !dataProduct.length) {
        console.log("no hay productos");
        return;
    }

    // Alimento
    const productosPerro = dataProduct[0]?.categoria?.Perro.Alimento;
    if (!productosPerro) {
        console.log("No se encontro la categoria Alimento");
        return;
    }
    productosPerro.forEach((producto, index) => {
        const idUnico = `btn-${producto.marca}-${index}`;
        const tarjeta = crearTarjeta(
            producto.marca,
            producto.descripcion,
            producto.opciones_pago.descripcion,
            producto.precio,
            producto.imagen,
            producto.marca,
            idUnico,
            producto.stock
        );
        seccionAlimento.appendChild(tarjeta);
        contenedor.appendChild(seccionAlimento);
    });

    // Accesorios
    const accesorios = dataProduct[0]?.categoria?.Perro.Accesorios;
    if (!accesorios) {
        console.warn("No se encontro la categoria Accesorios");
        return;
    }
    accesorios.forEach((producto, index) => {
        const idUnico = `btn-${producto.marca}-${index}`;
        const tarjeta = crearTarjeta(
            producto.marca,
            producto.descripcion,
            producto.opciones_pago.descripcion,
            producto.precio,
            producto.imagen,
            producto.marca,
            idUnico,
            producto.stock
        );
        seccionAccesorios.appendChild(tarjeta);
        contenedorAccesorios.appendChild(seccionAccesorios);
    });

    // Estetica e Higiene
    const productosEstetica = dataProduct[0]?.categoria?.Perro.Estética_e_Higiene;
    if (!productosEstetica) {
        console.warn("No se encontro la categoria Estetica e Higiene");
        return;
    }
    productosEstetica.forEach((producto, index) => {
        const idUnico = `btn-${producto.marca}-${index}`;
        const tarjeta = crearTarjeta(
            producto.marca,
            producto.descripcion,
            producto.opciones_pago.descripcion,
            producto.precio,
            producto.imagen,
            producto.marca,
            idUnico,
            producto.stock
        );
        seccionEsteticaHigiene.appendChild(tarjeta);
        contenedorEsteticaHigiene.appendChild(seccionEsteticaHigiene);
    });

    // Salud
    const productosSalud = dataProduct[0]?.categoria?.Perro.Salud;
    if (!productosSalud) {
        console.warn("No se encontro la categoria Salud");
        return;
    }
    productosSalud.forEach((producto, index) => {
        const idUnico = `btn-${producto.marca}-${index}`;
        const tarjeta = crearTarjeta(
            producto.marca,
            producto.descripcion,
            producto.opciones_pago.descripcion,
            producto.precio,
            producto.imagen,
            producto.marca,
            idUnico,
            producto.stock
        );
        seccionSalud.appendChild(tarjeta);
        contenedorSalud.appendChild(seccionSalud);
    });

    // Obtener todos los botones Comprar
    const botonesCompra = document.querySelectorAll(".btn-Compra");
    botonesCompra.forEach((boton) => {
        boton.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            const img = event.target.dataset.imagen;
            const marca = event.target.dataset.marca;
            const descripcion = event.target.dataset.descripcion;
            const precio = event.target.dataset.precio;
            let stockRestante = Number(event.target.dataset.stock);
            const stockTotal = Number(event.target.dataset.stockTotal);

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            const indexExistente = carrito.findIndex(item => item.id === id);

            if (indexExistente !== -1) {
                if (carrito[indexExistente].cantidad < stockTotal && stockRestante > 0) {
                    carrito[indexExistente].cantidad += 1;

                    const cantidad = carrito[indexExistente].cantidad;
                    const precio = carrito[indexExistente].precio;
                    const subtotal = cantidad * precio;

                    // Actualizar el subtotal si lo manejas en el objeto
                    carrito[indexExistente].subtotal = subtotal;

                    console.log("Cantidad actual:", cantidad);
                    console.log("Subtotal:", subtotal);
                } else {
                    alert("No se puede agregar más de este producto. Stock máximo alcanzado.");
                    return;
                }
            }
            else {
                carrito.push({
                    id,
                    img,
                    marca,
                    precio: precio,
                    descripcion: descripcion,
                    stock: stockTotal,
                    cantidad: 1,
                    subtotal: precio
                });
                stockRestante -= 1;
            }

            // Actualizar botón
            event.target.dataset.stock = stockRestante;
            event.target.textContent = stockRestante > 0
                ? `Comprar (${stockRestante} disponibles)`
                : "Sin stock";

            if (stockRestante <= 0) {
                event.target.disabled = true;
                const card = event.target.closest(".tarjeta-producto");
                if (card && !card.querySelector(".sin-stock")) {
                    card.classList.add("background-sin-stock");
                    const overlay = document.createElement("div");
                    overlay.classList.add("sin-stock");
                    overlay.textContent = "Producto Agotado!";
                    card.appendChild(overlay);
                }
            }

            // Guardar stock actualizado
            const stocksGuardados = JSON.parse(localStorage.getItem("stocks")) || {};
            stocksGuardados[id] = stockRestante;
            localStorage.setItem("stocks", JSON.stringify(stocksGuardados));

            // Guardar carrito actualizado
            localStorage.setItem("carrito", JSON.stringify(carrito));

            console.log("Producto agregado al carrito:", carrito[indexExistente] || carrito[carrito.length - 1]);
            console.log("Carrito actual:", carrito);
        });
    });


});
