// seccion que mostramos al cargar el dom
function mostrarSeccion(nombre) {
      document.getElementById("seccionUsuarios").style.display = "none";
      document.getElementById("seccionMascotas").style.display = "none";
      document.getElementById("seccionTurnos").style.display = "none";
      document.getElementById("seccionChat").style.display = "none";
      document.getElementById("seccionVentas").style.display = "none";

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

    // Mostrar seccion usuarios al cargar
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
  tbody.innerHTML = "";
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
  bootstrap.Modal.getInstance(document.getElementById('modalUsuario')).hide(); // Cerrar modal
  this.reset(); // Limpiar formulario
});

function editarUsuario(id) {
  const u = obtenerDeStorage("usuarios").find(u => u.id === id);
  if (!u) return;
  document.getElementById("usuarioId").value = u.id;
  document.getElementById("nombreUsuario").value = u.nombre;
  document.getElementById("emailUsuario").value = u.email;
  document.getElementById("modalUsuarioLabel").textContent = "Editar Usuario";
  new bootstrap.Modal(document.getElementById("modalUsuario")).show();
}

function eliminarUsuario(id) {
  if (confirm("¿Eliminar este usuario?")) {
    const usuarios = obtenerDeStorage("usuarios").filter(u => u.id !== id);
    guardarEnStorage("usuarios", usuarios);
    cargarUsuarios();
  }
}

// seccion mascotas
function cargarMascotas() {
  const cargarMascotas = obtenerDeStorage("cargarMascotas");
  const tbody = document.getElementById("tablaMascotas");
  tbody.innerHTML = "";
  mascotas.forEach(mascotas => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${m.nombre}</td>
      <td>${m.especie}</td>
      <td>${m.idDuenio}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-2" onclick="editarMascota('${m.idDuenio}')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarMascota('${m.idDuenio}')"><i class="bi bi-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("formUsuario").addEventListener("submit", function (e) {
  e.preventDefault();
  const id = document.getElementById("usuarioId").value; // El id solo se usa si se edita un usuario
  const nombre = document.getElementById("nombreUsuario").value;
  const email = document.getElementById("emailUsuario").value;
  const rol = document.getElementById("rolUsuario").value;
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
    usuarios.push({ id: nuevoId, nombre, email});
  }

  guardarEnStorage("usuarios", usuarios);
  cargarUsuarios(); // Recargamos la lista de usuarios
  bootstrap.Modal.getInstance(document.getElementById('modalUsuario')).hide(); // Cerrar modal
  this.reset(); // Limpiar formulario
});

function editarUsuario(id) {
  const u = obtenerDeStorage("usuarios").find(u => u.id === id);
  if (!u) return;
  document.getElementById("usuarioId").value = u.id;
  document.getElementById("nombreUsuario").value = u.nombre;
  document.getElementById("emailUsuario").value = u.email;
  document.getElementById("modalUsuarioLabel").textContent = "Editar Usuario";
  new bootstrap.Modal(document.getElementById("modalUsuario")).show();
}

function eliminarUsuario(id) {
  if (confirm("¿Eliminar este usuario?")) {
    const usuarios = obtenerDeStorage("usuarios").filter(u => u.id !== id);
    guardarEnStorage("usuarios", usuarios);
    cargarUsuarios();
  }
}

function cargarChat() {
const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatBox = document.getElementById('chatBox');

    function addMessage(text, sender = 'user') {
      const msg = document.createElement('div');
      msg.classList.add('message', sender);
      msg.textContent = text;
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = messageInput.value.trim();
      if (text !== '') {
        addMessage(text, 'user');
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
  const carrito = obtenerDeStorage("carrito");
  const tbody = document.getElementById("tablaVentas");
  tbody.innerHTML = "";
  carrito.forEach(carrito => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${carrito.nombre}</td>
      <td>${carrito.email}</td>
      <td>${carrito.id}</td>
      <td>${carrito.id}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-2" onclick="editarCarrito('${carrito.id}')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarCarrito('${carrito.id}')"><i class="bi bi-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}