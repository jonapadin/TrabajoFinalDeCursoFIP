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

    const tituloAccesorios = crearTitulo("Accesorios");

    contenedorAccesorios.appendChild(tituloAccesorios);
    contenedorAccesorios.className = "titulo";

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
    tituloSalud.className="titulo"

    contenedorSalud.appendChild(tituloSalud);

    // fetch a datos
    const dataProduct = await obtenerProductos();

    // validacion de datos
    if (!dataProduct || !dataProduct.length) {
        console.log("no hay productos");
        return
    }


    //acceder a la esctructura
    const alimentos = dataProduct[0]?.categoria?.Gato.Alimento;


    if (!alimentos) {
        console.warn("No se encontro la categoria Alimento");
        return

    }

    // iterar sobre alimentos y crear las cards
    alimentos.forEach(producto => {
        const cardsAlimeto = crearTarjeta(
            producto.marca,
            producto.descripcion,
            producto.opciones_pago.descripcion,
            producto.precio,
            producto.imagen,
            producto.marca // para alt de imagen
        );

        seccionAlimento.appendChild(cardsAlimeto);
        contenedor.appendChild(seccionAlimento);
    });

    const accesorios = dataProduct[0]?.categoria?.Gato.Accesorios;

    if (!accesorios) {
        console.warn("No se encontro la categoria Accesorios");
        return

    }

    // crear cards seccion accesorios
    accesorios.forEach(producto => {
        const cardsAccesorios = crearTarjeta(
            producto.marca,
            producto.descripcion,
            producto.opciones_pago.descripcion,
            producto.precio,
            producto.imagen,
            producto.marca // para alt de imagen
        );
        seccionAccesorios.appendChild(cardsAccesorios);
        contenedorAccesorios.appendChild(seccionAccesorios);
    });

    const productosEstetica = dataProduct[0]?.categoria?.Gato.Estética_e_Higiene;
    if (!productosEstetica) {
        console.warn("No se encontro la categoria Estetica e Higiene");
        return

    }
    // crear cards seccion estetica
    productosEstetica.forEach(producto => {
        const cardsesteticaHigiene = crearTarjeta(
            producto.marca,
            producto.descripcion,
            producto.opciones_pago.descripcion,
            producto.precio,
            producto.imagen,
            producto.marca // para alt de imagen
        );

        seccionEsteticaHigiene.appendChild(cardsesteticaHigiene);
        contenedorEsteticaHigiene.appendChild(seccionEsteticaHigiene);
    });

    const productosSalud = dataProduct[0]?.categoria?.Gato.Salud;
    if (!productosSalud) {
        console.warn("No se encontro la categoria Salud")
    }

    // crear cards seccion salud
    productosSalud.forEach(producto => {
       const cardSalud = crearTarjeta(
            producto.marca,
            producto.descripcion,
            producto.opciones_pago.descripcion,
            producto.precio,
            producto.imagen,
            producto.marca // para alt de imagen
        );

            seccionSalud.appendChild(cardSalud);
            contenedorSalud.appendChild(seccionSalud);
    })
})  