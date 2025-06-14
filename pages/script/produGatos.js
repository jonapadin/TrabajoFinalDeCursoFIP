import { obtenerProductos } from "./fetchProductos"; 
import { crearTarjeta } from "./funciones";
document.addEventListener("DOMContentLoaded", async function () {

    const contenedor = document.getElementById("seccion-alimentos");
    contenedor.className="seccionProductos" ;

    const seccionAlimento = document.createElement("section");
    seccionAlimento.className ="seccionAlimento";

    const contenedorAccesorios = document.getElementById("seccion-accesorios");
    contenedorAccesorios.className= "seccionAccesorios";
    
    
      const dataProduct = await obtenerProductos();


    if (!dataProduct || !dataProduct.length) {
        console.log("no hay productos");
        return
    }


    //acceder a la esctructura
    const alimentos = dataProduct[0]?.categoria?.Gato?.Alimento;
    const accesorios = dataProduct[0]?.categoria?.Gato?.Accesorios;

    if (!alimentos) {
        console.log("No hay alimentos ");
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


    if (!accesorios) {
        console.log("No hay accesorios ");
        return

    }

    accesorios.array.forEach(accesorio => {
        const cardAccesorios = crearTarjeta(
            accesorio.marca,
            accesorio.descripcion,
            accesorio.opciones_pago,
            accesorio.imagen,
            accesorio.marca // para alt de imagen
        )

        contenedorAccesorios.appendChild(cardAccesorios);
    });


})