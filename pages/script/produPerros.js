import { obtenerProductos } from "./fetchProductos";
import { crearTarjeta, crearTitulo } from "./funciones";
document.addEventListener("DOMContentLoaded", async function () {

    const btnMasInf = document.createElement('button');

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
        return
    }


    //acceder a la esctructura
    const productosPerro = dataProduct[0]?.categoria?.Perro.Alimento;

    if (!productosPerro) {
        console.log("No se encontro la categoria Alimento");
        return

    }
    // iterar sobre alimentos y crear las cards
    productosPerro.forEach((producto, index) => {
        const idUnico = `btn-${producto.marca}-${index}`; // Combina marca + índice
        const cardsAlimeto = crearTarjeta(
            producto.marca,
            producto.descripcion,
            producto.opciones_pago.descripcion,
            producto.precio,
            producto.imagen,
            producto.marca, // para alt de imagen
            idUnico
        );

        seccionAlimento.appendChild(cardsAlimeto);
        contenedor.appendChild(seccionAlimento);
    });

    const accesorios = dataProduct[0]?.categoria?.Perro.Accesorios

    if (!accesorios) {
        console.warn("No se encontro la categoria Accesorios");
        return

    }

    // crear cards seccion accesorios
    accesorios.forEach((producto, index) => {
        const idUnico = `btn-${producto.marca}-${index}`; // Combina marca + índice
        const cardsAccesorios = crearTarjeta(
            producto.marca,
            producto.descripcion,
            producto.opciones_pago.descripcion,
            producto.precio,
            producto.imagen,
            producto.marca, // para alt de imagen
            idUnico
        );
        seccionAccesorios.appendChild(cardsAccesorios);
        contenedorAccesorios.appendChild(seccionAccesorios);
    });

    const productosEstetica = dataProduct[0]?.categoria?.Perro.Estética_e_Higiene;
    if (!productosEstetica) {
        console.warn("No se encontro la categoria Estetica e Higiene");
        return

    }
    // crear cards seccion estetica
    productosEstetica.forEach((producto, index) => {
        const idUnico = `btn-${producto.marca}-${index}`; // Combina marca + índice
        const cardsesteticaHigiene = crearTarjeta(
            
            producto.marca,
            producto.descripcion,
            producto.opciones_pago.descripcion,
            producto.precio,
            producto.imagen,
            producto.marca, // para alt de imagen
            idUnico
        );

        seccionEsteticaHigiene.appendChild(cardsesteticaHigiene);
        contenedorEsteticaHigiene.appendChild(seccionEsteticaHigiene);
    });

    const productosSalud = dataProduct[0]?.categoria?.Perro.Salud;
    if (!productosSalud) {
        console.warn("No se encontro la categoria Salud")
    }


    // crear cards seccion salud
        productosSalud.forEach((producto, index) => {
        const idUnico = `btn-${producto.marca}-${index}`; // Combina marca + índice
        const cardSalud = crearTarjeta(
            
            producto.marca,
            producto.descripcion,
            producto.opciones_pago.descripcion,
            producto.precio,
            producto.imagen,
            producto.marca, // para alt de imagen
            idUnico
        );

        seccionSalud.appendChild(cardSalud);
        contenedorSalud.appendChild(seccionSalud);
    });

const botonesCompra = document.querySelectorAll(".btn-Compra");
console.log("Botones encontrados:", botonesCompra.length); 
botonesCompra.forEach(btn => {
    btn.addEventListener('click', (e) => {
        console.log("Botón clickeado:", e.target);
        console.log("ID:", e.target.id);
    });
});



})






