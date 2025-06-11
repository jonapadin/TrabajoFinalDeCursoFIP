
document.addEventListener("DOMContentLoaded", async function () {

    const contenedor = document.getElementById("seccion-productos");








    const url = "/productos.json";
    async function obtenerProductos() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error de status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error.message);
        }



    }
    const dataProduct = await obtenerProductos();
    console.log(dataProduct);

    if (!dataProduct || !dataProduct.length) {
        console.log("no hay productos");
        return
    }



    const productosPerro = dataProduct[0]?.categoria?.Perro;

    if (!productosPerro) {
        console.log("No se encontro la categoria perros");
        return

    }

    for (const subCategoria in productosPerro) {
        const productos = productosPerro[subCategoria];
        productos.forEach(producto => {
            const card = document.createElement("DIV");
            const imagenProducto = document.createElement("IMG");
            imagenProducto.src=producto.imagen;
            imagenProducto.alt=`${productos.marca}`;

            const titulo = document.createElement("H2");
            titulo.textContent= producto.marca;

            const descripcion = document.createElement("P");
            descripcion.textContent = producto.descripcion;

            const btnCompra = document.createElement("BUTTON");
            btnCompra.textContent= `Comprar`;

            // agrega datos a la card
            card.appendChild(imagenProducto);
            card.appendChild(titulo);
            card.appendChild(descripcion);
            card.appendChild(btnCompra);
            // agrega la cara del contenedor
            contenedor.appendChild(card);


        });
    }



})