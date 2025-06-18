  const mascotas = [
    {
      nombre: "Rocky",
      especie: "Perro",
      raza: "Labrador",
      edad: "5 años",
      peso: "30 kg",
      historial: "Vacunas al día, última consulta en abril 2025"
    },
    {
      nombre: "Mia",
      especie: "Gato",
      raza: "Siamesa",
      edad: "3 años",
      peso: "4.5 kg",
      historial: "Esterilizada, controles anuales"
    }
    // 🔜 Acá agregar más mascotas
  ];

  const acordeonMascotas = document.getElementById("acordeonMascotas");

  mascotas.forEach((mascota, index) => {
    const collapseId = `mascota${index}`;
    const headerId = `cabecera${index}`;

    const item = document.createElement("div");
    item.className = "accordion-item shadow-sm mb-3";
    item.innerHTML = `
      <h2 class="accordion-header" id="${headerId}">
        <button class="accordion-button collapsed" type="button"
          data-bs-toggle="collapse" data-bs-target="#${collapseId}"
          aria-expanded="false" aria-controls="${collapseId}">
          ${mascota.especie === "Perro" ? "🐶" : mascota.especie === "Gato" ? "🐱" : "🐾"} ${mascota.nombre} - ${mascota.especie}
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
            <li><strong>Historial médico:</strong> ${mascota.historial}</li>
          </ul>
        </div>
      </div>
    `;
    acordeonMascotas.appendChild(item);
  });