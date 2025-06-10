document.addEventListener( "DOMContentLoaded",async function () {

    const contenedor=  document.getElementById("seccion-productos");
    const card= document.createElement("DIV");
    const imagenProducto = document.createElement("IMG");
    const titulo = document.createElement("H2");
    const descripcion= document.createElement("P");
    const btnCompra = document.createElement("BUTTON");

    contenedor.appendChild(card);
    



    
    
    const url= "/productos.json";
    async function obtenerProductos () {
        try {
            const response = await fetch (url);
            if (!response.ok){
                throw new Error (`Error de status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error.message);
        }
        
        
        
    } 
    const dataProduct = await obtenerProductos();
      console.log(dataProduct);
    
})