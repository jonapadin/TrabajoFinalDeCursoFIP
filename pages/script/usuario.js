  //Script seccion de usuario

  //funcionalidad de la lupa
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');

  searchBtn.addEventListener('click', () => {
    searchBtn.style.display = 'none'; // Ocultar lupa
    searchInput.style.display = 'inline-block'; // Mostrar input
    searchInput.focus();
  });

  // Ocultar input si se hace click fuera o se presiona Escape
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