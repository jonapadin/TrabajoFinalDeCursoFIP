const form = document.getElementById("perfilForm");
const inputs = form.querySelectorAll("input");
const botonesAccion = document.getElementById("botonesAccion");

function cargarDatos() {
<<<<<<< HEAD
  let data = JSON.parse(localStorage.getItem("perfilUsuario"));

  // Si no hay perfil guardado, lo creamos con datos del usuario activo
  if (!data) {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo) {
      data = {
        nombre: `${usuarioActivo.nombre} ${usuarioActivo.apellido}`,
        correo: usuarioActivo.email || "",
        telefono: usuarioActivo.telefono || ""
      };
      localStorage.setItem("perfilUsuario", JSON.stringify(data));
    }
  }

=======
  const data = JSON.parse(localStorage.getItem("usuarioActivo"));
>>>>>>> main
  if (data) {
    document.getElementById("nombre").value = data.nombre || "";
    document.getElementById("correo").value = data.correo || "";
    document.getElementById("telefono").value = data.telefono || "";
  }
}

function crearBotonEditar() {
  botonesAccion.innerHTML = `
    <button type="button" class="btn btn-primary w-100" id="editarBtn">
      <i class="bi bi-pencil me-2"></i>Editar
    </button>
  `;

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
    cargarDatos(); // Restaurar datos previos
    crearBotonEditar();
  });
}

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  localStorage.removeItem("perfilUsuario");
  window.location.href = "/pages/login/login.html";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
<<<<<<< HEAD

  const data = {
=======
  // Guarda los datos en localStorage
   const data = {
>>>>>>> main
    nombre: form.nombre.value.trim(),
    correo: form.correo.value.trim(),
    telefono: form.telefono.value.trim()
  };
<<<<<<< HEAD

  // Guardar datos actualizados en perfilUsuario
  localStorage.setItem("perfilUsuario", JSON.stringify(data));
=======
  localStorage.setItem("usuarioActivo", JSON.stringify(data));
>>>>>>> main

  // También actualizar usuarioActivo (si existe)
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (usuarioActivo) {
    const nombrePartes = data.nombre.split(" ");
    usuarioActivo.nombre = nombrePartes[0] || "";
    usuarioActivo.apellido = nombrePartes.slice(1).join(" ") || "";
    usuarioActivo.email = data.correo;
    usuarioActivo.telefono = data.telefono;
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
  }

  // Desactivar inputs y mostrar modal
  inputs.forEach(input => input.disabled = true);
  const modal = new bootstrap.Modal(document.getElementById('modalGuardado'));
  modal.show();

<<<<<<< HEAD
=======

>>>>>>> main
  crearBotonEditar();
});

// Inicializar
cargarDatos();
crearBotonEditar();