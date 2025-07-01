// Obtener el contenedor del acordeón
  const acordeonMascotas = document.getElementById("acordeonMascotas");

    // Intentar obtener las mascotas desde localStorage
  const mascotasGuardadas = localStorage.getItem("mascotas");

  // Parsear las mascotas si existen, si no usar arreglo vacío
  const mascotas = mascotasGuardadas ? JSON.parse(mascotasGuardadas) : [];
  // Recorre cada mascota y genera un item del acordeón
  mascotas.forEach((mascota, index) => {
    const collapseId = `mascota${index}`;
    const headerId = `cabecera${index}`;

    // Crea un div para la mascota con clases de estilo de Bootstrap
    const item = document.createElement("div");
    item.className = "accordion-item shadow-sm mb-3";
    // Define el contenido HTML del acordeón para esta mascota
    item.innerHTML = `
      <h2 class="accordion-header" id="${headerId}">
        <button class="accordion-button collapsed" type="button"
          data-bs-toggle="collapse" data-bs-target="#${collapseId}"
          aria-expanded="false" aria-controls="${collapseId}">
                    ${mascota.especie === "Perro" ? "🐶" : mascota.especie === "Gato" ? "🐱" : mascota.especie === "Ave" ? "🐦" : "🐾"} ${mascota.nombre} - ${mascota.especie}
        </button>
      </h2>
      <div id="${collapseId}" class="accordion-collapse collapse"
        aria-labelledby="${headerId}" data-bs-parent="#acordeonMascotas">
        <div class="accordion-body">
          <ul class="list-unstyled mb-0">
            <li><strong>Nombre:</strong> ${mascota.nombre}</li>
            <li><strong>Especie:</strong> ${mascota.especie}</li>
            <li><strong>Raza:</strong> ${mascota.raza}</li>
            <li><strong>Edad:</strong> ${mascota.edad}</li>
            <li><strong>Peso:</strong> ${mascota.peso}</li>
            <li><strong>Historial médico:</strong> ${mascota.descripcion}</li>
          </ul>
        </div>
      </div>
    `;
    // Agrega el item del acordeón al contenedor
    acordeonMascotas.appendChild(item);
  });