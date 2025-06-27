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

    //Seccion Estetica e Higiene, elementos
    const contenedorEsteticaHigiene = document.getElementById('seccion-esteticaHigiene');

    const seccionEsteticaHigiene = document.createElement('section');
    seccionEsteticaHigiene.className = "seccionAlimento";

    const tituloEsteticaH = crearTitulo("Estetica e Higiene", ["titulo"]);
    contenedorEsteticaHigiene.appendChild(tituloEsteticaH);

    //Seccion salud, elementos
    const contenedorSalud = document.getElementById('seccion-salud');

    const seccionSalud = document.createElement('section');
    seccionSalud.className = "seccionAlimento";

    const tituloSalud = crearTitulo("Salud");
    tituloSalud.className = "titulo"

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

    // **Asignar evento click a todos los botones Comprar (que ya existen en el DOM)**
    const botonesCompra = document.querySelectorAll(".btn-Compra");
    botonesCompra.forEach((boton) => {
        boton.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            const img = event.target.dataset.imagen
            const marca = event.target.dataset.marca;
            const precio = event.target.dataset.precio;
            const stock = event.target.dataset.stock;

            const productoComprado = {
                id,
                img,
                marca,
                precio: Number(precio), // convierte a número por si acaso
                stock: Number(stock),
                cantidad: 1, // por ejemplo, cantidad inicial 1
            };
            // Obtener carrito actual o iniciar uno vacío
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            // Verificar si producto ya existe en carrito para aumentar cantidad
            const indexExistente = carrito.findIndex(item => item.id === id);
            if (indexExistente !== -1) {
                carrito[indexExistente].cantidad += 1;
            } else {
                carrito.push(productoComprado);
            }

            // Guardar carrito actualizado en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));

            console.log("Producto agregado al carrito:", productoComprado);
            console.log("Carrito actual:", carrito);
        });
    });

})






