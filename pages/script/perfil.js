// Obtiene el formulario y todos sus inputs
const form = document.getElementById("perfilForm");
const inputs = form.querySelectorAll("input");
const botonesAccion = document.getElementById("botonesAccion"); //botones de editar, guardar y cancelar

//nos traemos los datos de usuario desdee localStorage
function cargarDatos() {
  let perfilData = JSON.parse(localStorage.getItem("perfilUsuario"));

  // Si no hay perfil guardado, lo creamos con datos del usuario activo
  if (!perfilData) {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo) {
      perfilData = {
        nombre: `${usuarioActivo.nombre} ${usuarioActivo.apellido}`.trim(),
        correo: usuarioActivo.email || "",
        telefono: usuarioActivo.telefono || ""
      };
      //Guardamos los datos generados en localStorage
      localStorage.setItem("perfilUsuario", JSON.stringify(perfilData));
    }
  }
  
  // Si hay datos, los muestramos en los campos del formulario
  if (perfilData) {
    document.getElementById("nombre").value = perfilData.nombre || "";
    document.getElementById("correo").value = perfilData.correo || "";
    document.getElementById("telefono").value = perfilData.telefono || "";
  }
}

//funcion que crea y muestra el botón "Editar"
function crearBotonEditar() {
  botonesAccion.innerHTML = `
    <button type="button" class="btn btn-primary w-100" id="editarBtn">
      <i class="bi bi-pencil me-2"></i>Editar
    </button>
  `;

  //Habilitamos la edicion cuando se hace click en el botón
  document.getElementById("editarBtn").addEventListener("click", habilitarEdicion);
}

//Función que habilita los inputs y reemplaza los botones por "Guardar" y "Cancelar"
function habilitarEdicion() {
  // Habilita todos los campos de entrada
  inputs.forEach(input => input.disabled = false);
  
  // Muestra los botones "Guardar" y "Cancelar"
  botonesAccion.innerHTML = `
    <button type="submit" class="btn btn-success w-100">
      <i class="bi bi-check-lg me-2"></i>Guardar
    </button>
    <button type="button" class="btn btn-secondary w-100" id="cancelarBtn">
      <i class="bi bi-x-circle me-2"></i>Cancelar
    </button>
  `;


  // Si se hace clic en "Cancelar", se restauran los datos originales
  document.getElementById("cancelarBtn").addEventListener("click", () => {
    inputs.forEach(input => input.disabled = true); // Vuelvemos a deshabilitar los inputs
    cargarDatos(); // Restaurar datos previos
    crearBotonEditar();// Vuelve a mostrar botón "Editar"
  });
}


// Cierra sesión eliminando los datos del usuario activo
function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  localStorage.removeItem("perfilUsuario");
  window.location.href = "/pages/login/login.html";
}

// Maneja el evento de envío del formulario (Guardar cambios)
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Si el formulario no es válido, muestra los errores y no continúa
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Obtiene los valores ingresados
  const data = {
    nombre: form.nombre.value.trim(),
    correo: form.correo.value.trim(),
    telefono: form.telefono.value.trim()
  };

  // Guardar datos actualizados
  localStorage.setItem("perfilUsuario", JSON.stringify(data));
  localStorage.setItem("usuarioActivo", JSON.stringify(data)); // temporal, luego se actualiza con nombre/apellido separados

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

  // Desactivamos inputs y mostramos el modal diseñado con bootstrap
  inputs.forEach(input => input.disabled = true);
  const modal = new bootstrap.Modal(document.getElementById('modalGuardado'));
  modal.show();

  
  // Vuelve a mostrar solo el botón "Editar"
  crearBotonEditar();
});

// Inicializar
cargarDatos(); // Carga los datos del usuario en los campos
crearBotonEditar(); // Muestra el botón inicial "Editar"