const form = document.getElementById("perfilForm");
const inputs = form.querySelectorAll("input");
const botonesAccion = document.getElementById("botonesAccion");

function cargarDatos() {
  const data = JSON.parse(localStorage.getItem("perfilUsuario"));
  if (data) {
    document.getElementById("nombre").value = data.nombre;
    document.getElementById("correo").value = data.correo;
    document.getElementById("telefono").value = data.telefono;
  }
}

function crearBotonEditar() {
  botonesAccion.innerHTML = `
    <button type="button" class="btn btn-primary w-100" id="editarBtn">
      <i class="bi bi-pencil me-2"></i>Editar
    </button>
  `;

  // Asignar nuevamente el listener al nuevo botón
  document.getElementById("editarBtn").addEventListener("click", habilitarEdicion);
}

function habilitarEdicion() {
  inputs.forEach(input => input.disabled = false);

  botonesAccion.innerHTML = `
    <button type="submit" class="btn btn-success w-100">
      <i class="bi bi-check-lg me-2"></i>Guardar
    </button>
    <button type="button" class="btn btn-secondary w-100" id="cancelarBtn">
      <i class="bi bi-x-circle me-2"></i>Cancelar
    </button>
  `;

  document.getElementById("cancelarBtn").addEventListener("click", () => {
    inputs.forEach(input => input.disabled = true);
    cargarDatos(); // Restaurar datos
    crearBotonEditar();
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = {
    nombre: form.nombre.value.trim(),
    correo: form.correo.value.trim(),
    telefono: form.telefono.value.trim(),
  };
  localStorage.setItem("perfilUsuario", JSON.stringify(data));

  inputs.forEach(input => input.disabled = true);
  const modal = new bootstrap.Modal(document.getElementById('modalGuardado'));
  modal.show();


  crearBotonEditar();
});

// Inicializar
cargarDatos();
crearBotonEditar();