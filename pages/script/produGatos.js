import { obtenerProductos } from "./fetchProductos"; 
import { crearTarjeta } from "./funciones";
document.addEventListener("DOMContentLoaded", async function () {

    const contenedor = document.getElementById("seccion-productos");
    contenedor.className="seccionProductos" ;

    const seccionAlimento = document.createElement("section");
    seccionAlimento.className ="seccionAlimento";
    
    const titulo = document.createElement("H2");
    titulo.textContent="Alimento";
    titulo.className="titulo";
    contenedor.appendChild(titulo);
    
      const dataProduct = await obtenerProductos();


    if (!dataProduct || !dataProduct.length) {
        console.log("no hay productos");
        return
    }


    //acceder a la esctructura
    const alimentos = dataProduct[0]?.categoria?.Gato.Alimento;
    const accesorios = dataProduct[0]?.categoria?.Gato.Accesorios;

    if (!alimentos) {
        console.log("No se encontro la categoria Alimento");
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

})