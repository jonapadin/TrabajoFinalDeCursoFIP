document.addEventListener("DOMContentLoaded", () => {

  // Obtiene los elementos del DOM
  const container = document.getElementById('notifications');
  const counter = document.getElementById('unreadCounter');
  const footerNotifIcon = document.querySelector('a[href="notificaciones.html"] .bi');
  const markAllReadBtn = document.getElementById('markAllReadBtn');

  // Notificaciones de ejemplo, slas usamos si no hay datos previos en localStorage
  const sampleNotifications = [
    { id: "1", mensaje: "¡Recordatorio! Tienes un turno mañana a las 10:00 AM.", tipo: "turno", leida: false },
    { id: "2", mensaje: "Nueva vacuna disponible para tu mascota.", tipo: "producto", leida: false },
    { id: "3", mensaje: "Tu historia clínica fue actualizada.", tipo: "historia", leida: true },
    { id: "4", mensaje: "Bienvenido a la app de la veterinaria 🐶🐱", tipo: "general", leida: true }
  ];

  // Si no hay notificaciones en localStorage, guarda las que hicimos de ejemplo
  if (!localStorage.getItem("notifications")) {
    localStorage.setItem("notifications", JSON.stringify(sampleNotifications));
  }

  
  // Función que va vargar notificaciones desde localStorage
  function loadNotifications() {
    return JSON.parse(localStorage.getItem('notifications') || '[]');
  }

  // Función que guarda notificaciones en localStorage
  function saveNotifications(notifs) {
    localStorage.setItem('notifications', JSON.stringify(notifs));
  }

  //aplica los iconos segun el tipo de noti
  function getIconClass(tipo) {
    switch (tipo) {
      case "turno": return "bi-calendar-event-fill text-primary";
      case "producto": return "bi-capsule-pill text-success";
      case "historia": return "bi-file-earmark-medical text-info";
      default: return "bi-bell-fill text-warning";
    }
  }

   // Actualiza el contador de notificaciones no leídas y aplica estilo al ícono del footer pero no va a aparece hasta que lo acomodemos
  function updateUnreadCounter(notifs) {
    const unread = notifs.filter(n => !n.leida).length;
    counter.textContent = unread > 0 ? unread : '';
    counter.style.display = unread > 0 ? 'inline-block' : 'none';

    
    // Si no estamos en la página de notificaciones, resalta el ícono del footer
    if (!window.location.pathname.includes("notificaciones.html")) {
      footerNotifIcon?.classList.toggle("notification-alert", unread > 0);
    }
  }

  // Renderiza todas las notificaciones en el contenedor
  function renderNotifications(notifs) {
    container.innerHTML = ''; //limpiamos el contenido actuaol

    // Crea cada notificación en el DOM
    notifs.forEach(n => {
      const div = document.createElement('div');
      div.className = `list-group-item notification ${n.leida ? 'read' : 'unread'}`; //aplicamos la clase segun esta leido o no
      div.setAttribute('data-id', n.id);

      //Estructura del contenido
      div.innerHTML = `
        <div class="d-flex">
          <div class="notification-text-container">
            <i class="bi ${getIconClass(n.tipo)}"></i>
            <span class="notification-text">${n.mensaje}</span>
          </div>
          <div class="notification-buttons">
            <button class="btn btn-sm btn-outline-success btn-mark-read" title="Marcar como leída">
              <i class="bi ${n.leida ? 'bi-arrow-counterclockwise' : 'bi-check-circle'}"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger btn-delete" title="Eliminar">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>`;
      container.appendChild(div); // Añadimos al DOM
    });
    // Actualiza el contador después de renderizar
    updateUnreadCounter(notifs);
  }

  
  // Carga y renderiza notificaciones iniciales
  let notifs = loadNotifications();
  renderNotifications(notifs);

  
  // Manejador de eventos para interacciones dentro del contenedor de notificaciones, ya sea borrar o marcar como leida o sacarle
  container.addEventListener('click', e => {
    const notifItem = e.target.closest('.notification');
    const id = notifItem?.getAttribute('data-id');

    // Si se clickea el botón de marcar como leída/no leída
    if (e.target.closest('.btn-mark-read')) {
      const notif = notifs.find(n => n.id === id);
      if (notif) notif.leida = !notif.leida; //Cambia el estado de la noti
      saveNotifications(notifs);
      renderNotifications(notifs);
    }

    // Si se clickea el botón de eliminar
    if (e.target.closest('.btn-delete')) {
      notifs = notifs.filter(n => n.id !== id); //se elimina del arreglo
      saveNotifications(notifs);
      renderNotifications(notifs);
    }

    // Si se clickea la notificación (pero no un botón), la expande o colapsa para ver el contenido completo
    if (notifItem && !e.target.closest('button')) {
      notifItem.classList.toggle('expanded');
    }
  });

  // Maneja el clic en "Marcar todas como leídas"
  markAllReadBtn.addEventListener("click", () => {
    notifs.forEach(n => n.leida = true); //mascamos todas como leidas
    saveNotifications(notifs);
    renderNotifications(notifs);
  });
});