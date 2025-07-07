document.addEventListener("DOMContentLoaded", () => {

  // Verificación de rol de usuario
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const autenticado = localStorage.getItem("usuarioAutenticado");

  if (!autenticado || !usuario || usuario.rol !== "admin") {

    window.location.href = "/index.html";
    return;
  }

  mostrarSeccion("usuarios");

  const feriadosArg = [
    "2025-01-01",
    "2025-03-24",
    "2025-04-02",
    "2025-05-01",
    "2025-05-25",
    "2025-06-20",
    "2025-07-09",
    "2025-12-25",
  ];

  // Inicializar flatpickr para fecha de turnos
  flatpickr("#datepicker", {
    locale: "es",
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true,
      minDate: "today",
      defaultHour: 8,
      minuteIncrement: 30,
      disable: [
        (date) => date.getDay() === 0 || date.getDay() === 6,
        ...feriadosArg,
      ],
      minTime: "08:00",
      maxTime: "16:00",
      onChange: function (_, dateStr, instance) {
        const horariosOcupados = ["2025-07-08 09:00", "2025-07-08 11:30", "2025-07-08 13:30"]
        if (horariosOcupados.includes(dateStr)) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ese horario ya está reservado. Por favor selecciona otro.",
          });
          instance.clear();
        }
      },
  });

  // Inicializar flatpickr para fecha de ventas
  flatpickr("#fechaCompra", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true
  });
});


// seccion que mostramos al cargar el dom
function mostrarSeccion(nombre) {

  // Quitar clase 'active' de todos los enlaces de la sidebar
  document.querySelectorAll(".sidebar a").forEach((el) => el.classList.remove("active"));

  // Agregar clase 'active' al enlace clickeado
  const enlaces = document.querySelectorAll(".sidebar a");
  enlaces.forEach((enlace) => {
    if (enlace.getAttribute("onclick")?.includes(nombre)) {
      enlace.classList.add("active");
    }
  });

  // Oculta todas las secciones
  document.getElementById("seccionUsuarios").style.display = "none";
  document.getElementById("seccionMascotas").style.display = "none";
  document.getElementById("seccionTurnos").style.display = "none";
  document.getElementById("seccionChat").style.display = "none";
  document.getElementById("seccionVentas").style.display = "none";

  // Mostramos la sección indicada y carga sus datos
  if (nombre === "usuarios") {
    document.getElementById("seccionUsuarios").style.display = "block";
    cargarUsuarios();
  } else if (nombre === "mascotas") {
    document.getElementById("seccionMascotas").style.display = "block";
    cargarMascotas();
  } else if (nombre === "turnos") {
    document.getElementById("seccionTurnos").style.display = "block";
    cargarTurnos();
  } else if (nombre === "chat") {
    document.getElementById("seccionChat").style.display = "block";
    cargarChat();
  } else if (nombre === "ventas") {
    document.getElementById("seccionVentas").style.display = "block";
    cargarVentas();
  }
}

// Mostrar seccion usuarios por defecto
document.addEventListener("DOMContentLoaded", () => {
  mostrarSeccion("usuarios");
});

function guardarEnStorage(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

function obtenerDeStorage(clave) {
  return JSON.parse(localStorage.getItem(clave)) || [];
}

// seccion usuarios
function cargarUsuarios() {
  const usuarios = obtenerDeStorage("usuarios");
  const tbody = document.getElementById("tablaUsuarios");
  tbody.innerHTML = ""; //Borramos el contenido que tenga para ingresar los nuevos
  usuarios.forEach(usuario => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${usuario.nombre}</td>
      <td>${usuario.email}</td>
      <td>${usuario.telefono}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-2" onclick="editarUsuario('${usuario.id}')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarUsuario('${usuario.id}')"><i class="bi bi-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Evento al enviar el formulario de usuario (crear o editar)
const formUsuario = document.getElementById("formUsuario");

formUsuario.addEventListener("submit", function (e) {

  // Verificamos la validez del formulario
  if (!formUsuario.checkValidity()) {
    formUsuario.classList.add("was-validated"); // Activa validaciones visuales de Bootstrap
    return; // No sigue si el formulario es inválido
  }

  e.preventDefault();
  const id = document.getElementById("usuarioId").value; // El id solo se usa si se edita un usuario
  const nombre = document.getElementById("nombreUsuario").value;
  const email = document.getElementById("emailUsuario").value;
  const telefono = document.getElementById("telefonoUsuario").value;
  const usuarios = obtenerDeStorage("usuarios");

  if (id) {
    // Si ya existe un id, significa que es una edición
    const u = usuarios.find(u => u.id === id);
    if (u) {
      u.nombre = nombre;
      u.email = email;
      u.telefono = telefono;
    }
  } else {
    // Si no existe el id, es un nuevo usuario, generamos uno nuevo con randomUUID
    const nuevoId = window.crypto.randomUUID();
    usuarios.push({ id: nuevoId, nombre, email, telefono });
  }

  guardarEnStorage("usuarios", usuarios);
  cargarUsuarios(); // Recargamos la lista de usuarios
  bootstrap.Modal.getInstance(document.getElementById('modalUsuario')).hide(); // Cierra el modal
  formUsuario.reset(); // Limpia el formulario
  formUsuario.classList.remove("was-validated"); // Limpia validación visual para el siguiente uso
});


// Carga un usuario en el formulario para edita
function editarUsuario(id) {
  const u = obtenerDeStorage("usuarios").find(u => u.id === id);
  if (!u) return;
  document.getElementById("usuarioId").value = u.id;
  document.getElementById("nombreUsuario").value = u.nombre;
  document.getElementById("emailUsuario").value = u.email;
  document.getElementById("modalUsuarioLabel").textContent = "Editar Usuario";
  new bootstrap.Modal(document.getElementById("modalUsuario")).show();
}

// Elimina un usuario luego de confirmación
function eliminarUsuario(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      const usuarios = obtenerDeStorage("usuarios").filter(u => u.id !== id);
      guardarEnStorage("usuarios", usuarios);
      cargarUsuarios();

      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'El usuario ha sido eliminado.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

//Resetear el modal cuando se clickea fuera
const modalUsuario = document.getElementById("modalUsuario");

modalUsuario.addEventListener('hidden.bs.modal', function () {
  formUsuario.reset(); // Limpia los valores
  formUsuario.classList.remove('was-validated'); // Limpia los estilos de validación
  document.getElementById("usuarioId").value = ""; // Limpia el ID oculto
});

// seccion mascotas
function cargarMascotas() {
  const cargarMascotas = obtenerDeStorage("mascotas"); //No esta aplicado ya que no esta creado en localStorage
  const tbody = document.getElementById("tablaMascotas");
  tbody.innerHTML = "";
  cargarMascotas.forEach(m => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${m.nombre}</td>
      <td>${m.especie}</td>
      <td>${m.raza}</td>
      <td>${m.edad}</td>
      <td>${m.peso}</td>
      <td>${m.descripcion}</td>
      <td>${m.emailDuenio}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-2" onclick="editarMascota('${m.id}')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarMascota('${m.id}')"><i class="bi bi-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Evento al enviar el formulario de (crear o editar) mascota
const formMascota = document.getElementById("formMascota")

formMascota.addEventListener("submit", function (e) {

  // Verificamos la validez del formulario
  if (!formMascota.checkValidity()) {
    formMascota.classList.add("was-validated"); // Activa validaciones visuales de Bootstrap
    return; // No sigue si el formulario es inválido
  }

  e.preventDefault();
  const id = document.getElementById("mascotaId").value; // El id solo se usa si se edita un usuario
  const nombre = document.getElementById("nombreMascota").value;
  const especie = document.getElementById("especieMascota").value;
  const raza = document.getElementById("razaMascota").value;
  const edad = document.getElementById("edadMascota").value;
  const peso = document.getElementById("pesoMascota").value;
  const descripcion = document.getElementById("descripcionMascota").value;
  const emailDuenio = document.getElementById("emailDuenio").value;
  const mascotas = obtenerDeStorage("mascotas");

  if (id) {
    // Si ya existe un id, significa que es una edición
    const u = mascotas.find(u => u.id === id);
    if (u) {
      u.id = id;
      u.nombre = nombre;
      u.especie = especie;
      u.raza = raza;
      u.edad = edad;
      u.peso = peso;
      u.descripcion = descripcion;
      u.emailDuenio = emailDuenio;
    }
  } else {
    // Si no existe el id, es un nueva mascota, generamos uno nuevo con randomUUID
    const nuevoId = window.crypto.randomUUID();
    mascotas.push({ id: nuevoId, nombre, especie, raza, edad, peso, descripcion, emailDuenio });
  }

  guardarEnStorage("mascotas", mascotas);
  cargarMascotas(); // Recargamos la lista de mascotas
  bootstrap.Modal.getInstance(document.getElementById('modalMascota')).hide(); // Cierra el modal
  formMascota.reset(); // Limpia el formulario
  formMascota.classList.remove("was-validated"); // Limpia validación visual para el siguiente uso
});

// Carga una mascota en el formulario para edita
function editarMascota(id) {
  const m = obtenerDeStorage("mascotas").find(m => m.id === id);
  if (!m) return;
  document.getElementById("mascotaId").value = m.id;
  document.getElementById("nombreMascota").value = m.nombre;
  document.getElementById("especieMascota").value = m.especie;
  document.getElementById("razaMascota").value = m.raza;
  document.getElementById("edadMascota").value = m.edad;
  document.getElementById("pesoMascota").value = m.peso;
  document.getElementById("descripcionMascota").value = m.descripcion;
  document.getElementById("emailDuenio").value = m.emailDuenio;
  document.getElementById("modalMascotaLabel").textContent = "Editar Mascota";
  new bootstrap.Modal(document.getElementById("modalMascota")).show();
}

// Elimina una mascota luego de confirmación
function eliminarMascota(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      const mascotas = obtenerDeStorage("mascotas").filter(u => u.id !== id);
      guardarEnStorage("mascotas", mascotas);
      cargarMascotas();

      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'El turno ha sido eliminado.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

//Resetear el modal cuando se clickea fuera
const modalMascota = document.getElementById("modalMascota");

modalMascota.addEventListener('hidden.bs.modal', function () {
  formMascota.reset(); // Limpia los valores
  formMascota.classList.remove('was-validated'); // Limpia los estilos de validación
  document.getElementById("mascotaId").value = ""; // Limpia el ID que esta oculto
});

// seccion Turnos
function cargarTurnos() {
  const turnos = obtenerDeStorage("turnos");
  const tbody = document.getElementById("tablaTurnos");
  tbody.innerHTML = "";
  turnos.forEach(t => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.especie}</td>
      <td>${t.fecha}</td>
      <td>${t.motivo}</td>
      <td>${t.emailDuenio}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-2" onclick="editarTurno('${t.id}')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarTurno('${t.id}')"><i class="bi bi-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Evento al enviar el formulario de (crear o editar) turnos

const formTurno = document.getElementById("formTurno")
formTurno.addEventListener("submit", function (e) {

  // Verificamos la validez del formulario
  if (!formTurno.checkValidity()) {
    formTurno.classList.add("was-validated"); // Activa validaciones visuales de Bootstrap
    return; // No sigue si el formulario es inválido
  }

  e.preventDefault();
  const id = document.getElementById("turnoId").value; // El id solo se usa si se edita un usuario
  const especie = document.getElementById("tipoMascota").value;
  const fecha = document.getElementById("datepicker").value;
  const motivo = document.getElementById("tipoTurno").value;
  const emailDuenio = document.getElementById("emailTurno").value;
  const turnos = obtenerDeStorage("turnos");

  if (id) {
    // Si ya existe un id, significa que es una edición
    const t = turnos.find(t => t.id === id);
    if (t) {
      t.id = id;
      t.especie = especie;
      t.fecha = fecha;
      t.motivo = motivo;
      t.emailDuenio = emailDuenio;
    }
  } else {
    // Si no existe el id, es un nueva mascota, generamos uno nuevo con randomUUID
    const nuevoId = window.crypto.randomUUID();
    turnos.push({ id: nuevoId, especie, fecha, motivo, emailDuenio });
  }



  guardarEnStorage("turnos", turnos);
  cargarTurnos(); // Recargamos la lista de turnos
  bootstrap.Modal.getInstance(document.getElementById('modalTurno')).hide(); // Cierra el modal
  formTurno.reset(); // Limpia el formulario
  formTurno.classList.remove("was-validated"); // Limpia validación visual para el siguiente uso
});

// Carga un turno en el formulario para editar
function editarTurno(id) {
  const t = obtenerDeStorage("turnos").find(t => t.id === id);
  if (!t) return;
  document.getElementById("turnoId").value = t.id;
  document.getElementById("tipoMascota").value = t.especie;
  document.getElementById("datepicker").value = t.fecha;
  document.getElementById("tipoTurno").value = t.motivo;
  document.getElementById("emailTurno").value = t.emailDuenio;
  document.getElementById("modalTurnoLabel").textContent = "Editar Turno";
  new bootstrap.Modal(document.getElementById("modalTurno")).show();
}

// Elimina un turno luego de confirmación
function eliminarTurno(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      const turnos = obtenerDeStorage("turnos").filter(u => u.id !== id);
      guardarEnStorage("turnos", turnos);
      cargarTurnos();

      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'El turno ha sido eliminado.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

//Resetear el modal cuando se clickea fuera
const modalTurno = document.getElementById("modalTurno");

modalTurno.addEventListener('hidden.bs.modal', function () {
  formTurno.reset(); // Limpia los valores
  formTurno.classList.remove('was-validated'); // Limpia los estilos de validación
  document.getElementById("turnoId").value = ""; // Limpia el ID que esta oculto
});

// seccion chat
function cargarChat() { // Inicializa la funcionalidad de chat con respuestas automáticas
  const chatForm = document.getElementById('chatForm');
  const messageInput = document.getElementById('messageInput');
  const chatBox = document.getElementById('chatBox');

  // Agrega un mensaje al chat (usuario o bot)
  function addMessage(text, sender = 'user') {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight; //el área de chat se desplaza automáticamente hacia abajo para mostrar el último mensaje que se agregó
  }

  // Envío del mensaje
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (text !== '') {
      addMessage(text, 'user'); // Mensaje del usuario
      messageInput.value = '';

      // Simulación de respuesta automática
      setTimeout(() => {
        addMessage('¡Gracias por tu mensaje! Un profesional responderá pronto.', 'bot');
      }, 800);
    }
  });
}

// seccion ventas
function cargarVentas() {
  const carrito = obtenerDeStorage("compraInvitado");
  const tbody = document.getElementById("tablaVentas");
  tbody.innerHTML = "";

  carrito.forEach(venta => {

    const productosPedido = venta.carrito.map(producto => {
      return `Producto: ${producto.marca}, Descripción: ${producto.descripcion}, Cantidad: ${producto.cantidad}, Total: ${producto.subtotal}`;
    }).join("<br>"); 

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${venta.nombre}</td>
      <td>${venta.email}</td>
      <td>${venta.fechaCompra}</td>
      <td>${venta.telefono}</td>
      <td>${productosPedido}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-2" onclick="editarVentas('${venta.id}')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarVentas('${venta.id}')"><i class="bi bi-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Evento al enviar el formulario de ventas(crear o editar)
const formVentas = document.getElementById("formVentas");

formVentas.addEventListener("submit", function (e) {

  // Verificamos la validez del formulario
  if (!formVentas.checkValidity()) {
    formVentas.classList.add("was-validated"); // Activa validaciones visuales de Bootstrap
    return; // No sigue si el formulario es inválido
  }

  e.preventDefault();
  const id = document.getElementById("ventasId").value; // El id solo se usa si se edita un usuario
  const nombre = document.getElementById("nombreVenta").value;
  const email = document.getElementById("emailCompra").value;
  const fecha = document.getElementById("fechaCompra").value;
  const telefono = document.getElementById("telefonoCompra").value;
  const pedido = document.getElementById("pedidoCompra").value;
  const ventas = obtenerDeStorage("compraInvitado");

  if (id) {
    // Si ya existe un id, significa que es una edición
    const v = ventas.find(v => v.id === id);
    if (v) {
      v.nombre = nombre;
      v.email = email;
      v.fecha = fecha;
      v.telefono = telefono;
      v.pedido = pedido;
    }
  } else {
    // Si no existe el id, es un nuevo usuario, generamos uno nuevo con randomUUID
    const nuevoId = window.crypto.randomUUID();
    ventas.push({ id: nuevoId, nombre, email, fecha, telefono, pedido });
  }

  guardarEnStorage("ventas", ventas);
  cargarVentas(); // Recargamos la lista de usuarios
  bootstrap.Modal.getInstance(document.getElementById('modalVentas')).hide(); // Cierra el modal
  formVentas.reset(); // Limpia el formulario
  formVentas.classList.remove("was-validated"); // Limpia validación visual para el siguiente uso
  document.getElementById("ventasId").value = "";
});


// Carga un usuario en el formulario para edita
function editarVentas(id) {
  const v = obtenerDeStorage("ventas").find(v => v.id === id);
  if (!v) return;
  document.getElementById("ventasId").value = v.id;
  document.getElementById("nombreVenta").value = v.nombre;
  document.getElementById("emailCompra").value = v.email;
  document.getElementById("datepicker").value = v.fecha;
  document.getElementById("telefonoCompra").value = v.telefono;
  document.getElementById("pedidoCompra").value = v.pedido;
  document.getElementById("modalVentasLabel").textContent = "Editar Venta";
  new bootstrap.Modal(document.getElementById("modalVentas")).show();
}

// Elimina un usuario luego de confirmación
function eliminarVentas(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      const ventas = obtenerDeStorage("ventas").filter(u => u.id !== id);
      guardarEnStorage("ventas", ventas);
      cargarVentas();

      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'El turno ha sido eliminado.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

//Resetear el modal cuando se clickea fuera
const modalVentas = document.getElementById("modalVentas");

modalVentas.addEventListener('hidden.bs.modal', function () {
  formVentas.reset(); // Limpia los valores
  formVentas.classList.remove('was-validated'); // Limpia los estilos de validación
  document.getElementById("ventasId").value = ""; // Limpia el ID oculto
});

// Cierra sesión eliminando los datos del usuario activo
function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  localStorage.removeItem("perfilUsuario");
  window.location.href = "/pages/login/login.html";
}