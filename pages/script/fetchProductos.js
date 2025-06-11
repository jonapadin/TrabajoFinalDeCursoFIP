
document.addEventListener("DOMContentLoaded", async function () {

    const contenedor = document.getElementById("seccion-productos");
    contenedor.className="seccionProductos" ;

    const seccionAlimento = document.createElement("section");
    seccionAlimento.className ="seccionAlimento";
    
    const titulo = document.createElement("H2");
    titulo.textContent="Alimento";
    titulo.className="titulo";
    contenedor.appendChild(titulo);
    

    // funcion para obtner productos
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


    if (!dataProduct || !dataProduct.length) {
        console.log("no hay productos");
        return
    }


    //acceder a la esctructura
    const productosPerro = dataProduct[0]?.categoria?.Perro.Alimento;

    if (!productosPerro) {
        console.log("No se encontro la categoria perros");
        return

    }

    // iterar sobre alimentos y crear las cards

        productosPerro.forEach(producto => {
            const card = document.createElement("DIV");
            card.className="card";
            const imagenProducto = document.createElement("IMG");
            imagenProducto.className="imgProducto";
            imagenProducto.src=producto.imagen;
            imagenProducto.alt=`${producto.marca}`;

            
            const titulo = document.createElement("H2");
            titulo.textContent= producto.marca;             
            
            const descripcion = document.createElement("P");
            descripcion.textContent = producto.descripcion;
            
            const btnCompra = document.createElement("BUTTON");
            btnCompra.textContent= `Comprar`;
            btnCompra.className="btnCompra";
            
            const containerDesc = document.createElement("DIV");
            containerDesc.className="containerDesc"; 
            // agrega datos a la card
            card.appendChild(imagenProducto);
            card.appendChild(containerDesc);
            containerDesc.appendChild(titulo);
            containerDesc.appendChild(descripcion);
            containerDesc.appendChild(btnCompra);

            // agrega la cara del contenedor
            seccionAlimento.appendChild(card);
            contenedor.appendChild(seccionAlimento);



        });
    



})