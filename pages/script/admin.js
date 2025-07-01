// seccion que mostramos al cargar el dom
function mostrarSeccion(nombre) {
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
      }  else if (nombre === "chat") {
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
      <td>${usuario.id}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-2" onclick="editarUsuario('${usuario.id}')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarUsuario('${usuario.id}')"><i class="bi bi-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Evento al enviar el formulario de usuario (crear o editar)
document.getElementById("formUsuario").addEventListener("submit", function (e) {
  e.preventDefault();
  const id = document.getElementById("usuarioId").value; // El id solo se usa si se edita un usuario
  const nombre = document.getElementById("nombreUsuario").value;
  const email = document.getElementById("emailUsuario").value;
  const usuarios = obtenerDeStorage("usuarios");

  if (id) {
    // Si ya existe un id, significa que es una edición
    const u = usuarios.find(u => u.id === id);
    if (u) {
      u.nombre = nombre;
      u.email = email;
    }
  } else {
    // Si no existe el id, es un nuevo usuario, generamos uno nuevo con randomUUID
    const nuevoId = window.crypto.randomUUID();
    usuarios.push({ id: nuevoId, nombre, email });
  }

  guardarEnStorage("usuarios", usuarios);
  cargarUsuarios(); // Recargamos la lista de usuarios
  bootstrap.Modal.getInstance(document.getElementById('modalUsuario')).hide(); // Cierra el modal
  this.reset(); // Limpia el formulario
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
  if (confirm("¿Eliminar este usuario?")) {
    const usuarios = obtenerDeStorage("usuarios").filter(u => u.id !== id);
    guardarEnStorage("usuarios", usuarios);
    cargarUsuarios();
  }
}

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
document.getElementById("formMascota").addEventListener("submit", function (e) {
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
    mascotas.push({ id:nuevoId,nombre, especie, raza , edad, peso, descripcion ,emailDuenio });
  }

  guardarEnStorage("mascotas", mascotas);
  cargarMascotas(); // Recargamos la lista de mascotas
  bootstrap.Modal.getInstance(document.getElementById('modalMascota')).hide(); // Cierra el modal
  this.reset(); // Limpia el formulario
});

// Carga un usuario en el formulario para edita
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

// Elimina un usuario luego de confirmación
function eliminarMascota(id) {
  if (confirm("¿Eliminar esta mascota?")) {
    const mascotas = obtenerDeStorage("mascotas").filter(u => u.id !== id);
    guardarEnStorage("mascotas", mascotas);
    cargarMascotas();
  }
}



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
      <td>${t.hora}</td>
      <td>${t.motivo}</td>
      <td>${t.idDuenio}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-2" onclick="editarTurno('${t.idDuenio}')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarTurno('${t.idDuenio}')"><i class="bi bi-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}



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
  const carrito = obtenerDeStorage("compraInvitado"); // Carga el historial de ventas desde el carrito guardado
  const tbody = document.getElementById("tablaVentas");
  tbody.innerHTML = "";
  carrito.forEach(carrito => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${carrito.nombre}</td>
      <td>${carrito.email}</td>
      <td>${carrito.fechaCompra}</td>
      <td>${carrito.direccion}</td>
      <td>${carrito.direccion}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-2" onclick="editarCarrito('${carrito.dni}')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarCarrito('${carrito.dni}')"><i class="bi bi-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}


// Cierra sesión eliminando los datos del usuario activo
function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  localStorage.removeItem("perfilUsuario");
  window.location.href = "/pages/login/login.html";
}