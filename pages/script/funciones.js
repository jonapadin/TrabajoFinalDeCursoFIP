export function crearTarjeta(titulo, descripcion, infPago, precio, imagenSrc, altImg, idUnico, stock) {
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
    const stockNum = Number(stock) || 0;  // Validar stock para que sea número

    btnCompra.textContent = stockNum > 0 ? `Comprar (${stockNum} disponibles)` : "Sin stock";
    btnCompra.className = "btn-Compra";

    // Asignar atributos data-* para info del producto
    btnCompra.dataset.id = idUnico;
    btnCompra.dataset.imagen = imagenSrc;
    btnCompra.dataset.marca = titulo;
    btnCompra.dataset.precio = precio;
    btnCompra.dataset.stock = stockNum;       // stock restante (inicial)
    btnCompra.dataset.stockTotal = stockNum;  // stock original

    // Si no hay stock, deshabilitar botón
    if (stockNum <= 0) {
        btnCompra.disabled = true;
    }

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

