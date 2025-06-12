


    // funcion para obtner productos
    const url = "/productos.json";
   export async function obtenerProductos() {
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
  