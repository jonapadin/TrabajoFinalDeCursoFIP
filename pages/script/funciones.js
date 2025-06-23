
//Crear tarjetas
export function crearTarjeta(titulo, descripcion, infPago, precio, imagenSrc, altImg) {
    const card = document.createElement("DIV");
    card.className = "card";

    const imagenProducto = document.createElement("IMG");
    imagenProducto.className = "imgProducto";
    imagenProducto.src = imagenSrc;
    imagenProducto.alt = altImg;

    const h2 = document.createElement("H2");
    h2.textContent = titulo;

    const h4 = document.createElement("H4");
    h4.textContent = descripcion;

    const p = document.createElement("P");
    p.textContent = infPago;

    const span = document.createElement("SPAN");
    span.textContent = `$ ${precio}`;

    const btnCompra = document.createElement("BUTTON");
    btnCompra.textContent = "Comprar";
    btnCompra.className = "btnCompra";

    const containerDesc = document.createElement("DIV");
    containerDesc.className = "containerDesc";
    containerDesc.appendChild(h2);
    containerDesc.appendChild(h4);
    containerDesc.appendChild(p);
    containerDesc.appendChild(span);

    card.appendChild(imagenProducto);
    card.appendChild(containerDesc);
    card.appendChild(btnCompra);

    return card;

}


// crear titulo
export function crearTitulo(texto, clases = []) {
    const titulo = document.createElement("H2");
    titulo.textContent = texto;
    if (Array.isArray(clases)) {
        titulo.classList.add(...clases);
    }
    return titulo;
}


