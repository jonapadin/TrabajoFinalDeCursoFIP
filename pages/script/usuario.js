
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


// Funcionalidad de búsqueda
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');


// Al hacer clic en el botón de búsqueda (lupa)
searchBtn.addEventListener('click', () => {
  searchBtn.style.display = 'none'; 
  searchInput.style.display = 'inline-block'; 
  searchInput.focus();
});



document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && e.target !== searchBtn) {
    searchInput.style.display = 'none'; 
    searchBtn.style.display = 'inline-block'; 
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    searchInput.style.display = 'none'; 
    searchBtn.style.display = 'inline-block';
  }
});

