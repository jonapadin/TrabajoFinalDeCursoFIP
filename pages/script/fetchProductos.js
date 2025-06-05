document.addEventListener( "DOMContentLoaded",function () {
    const url= "/productos.json";
    async function obtenerProductos () {
        try {
            const response = await fetch (url);
            if (!response.ok){
                throw new Error (`Error de status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            
        } catch (error) {
            console.error(error.message);
        }

        
    }
    obtenerProductos();
})