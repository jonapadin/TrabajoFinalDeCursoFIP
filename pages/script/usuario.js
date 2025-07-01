// Validar sesión activa al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const usuarioAutenticado = localStorage.getItem("usuarioAutenticado");
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  // Si no está logueado, redirigir al login
  if (!usuarioAutenticado || usuarioAutenticado !== "true" || !usuarioActivo) {
    window.location.href = "/login.html"; // Cambiá la ruta si tu login está en otra ubicación
    return;
  }

  // Mostrar el nombre completo del usuario
  if (usuarioActivo.nombre && usuarioActivo.apellido) {
    const saludoUsuario = document.getElementById("saludoUsuario");
    saludoUsuario.textContent = `¡Hola, ${usuarioActivo.nombre} ${usuarioActivo.apellido}!`;
  }
});

// -------------------------
// Funcionalidad de búsqueda
// -------------------------
// Obtiene el botón de búsqueda (ícono de lupa) y el input donde se escribe la búsqueda
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');


// Al hacer clic en el botón de búsqueda (lupa)
searchBtn.addEventListener('click', () => {
  searchBtn.style.display = 'none'; // Ocultar lupa
  searchInput.style.display = 'inline-block'; // Mostrar input
  searchInput.focus();// Coloca el cursor automáticamente en el input
});


// Si el usuario hace clic fuera del campo de búsqueda y del botón, se oculta el input
document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && e.target !== searchBtn) {
    searchInput.style.display = 'none'; // Oculta el input
    searchBtn.style.display = 'inline-block'; // Muestra nuevamente la lupa
  }
});
// Si el usuario presiona la tecla Escape, se oculta el input de búsqueda
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    searchInput.style.display = 'none'; // Oculta el input
    searchBtn.style.display = 'inline-block';// Muestra nuevamente la lupa
  }
});

