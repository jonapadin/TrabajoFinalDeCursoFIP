document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('notifications');
  const counter = document.getElementById('unreadCounter');
  const footerNotifIcon = document.querySelector('a[href="notificaciones.html"] .bi');
  const markAllReadBtn = document.getElementById('markAllReadBtn');

  const sampleNotifications = [
    { id: "1", mensaje: "¡Recordatorio! Tienes un turno mañana a las 10:00 AM.", tipo: "turno", leida: false },
    { id: "2", mensaje: "Nueva vacuna disponible para tu mascota.", tipo: "producto", leida: false },
    { id: "3", mensaje: "Tu historia clínica fue actualizada.", tipo: "historia", leida: true },
    { id: "4", mensaje: "Bienvenido a la app de la veterinaria 🐶🐱", tipo: "general", leida: true }
  ];

  if (!localStorage.getItem("notifications")) {
    localStorage.setItem("notifications", JSON.stringify(sampleNotifications));
  }

  function loadNotifications() {
    return JSON.parse(localStorage.getItem('notifications') || '[]');
  }

  function saveNotifications(notifs) {
    localStorage.setItem('notifications', JSON.stringify(notifs));
  }

  function getIconClass(tipo) {
    switch (tipo) {
      case "turno": return "bi-calendar-event-fill text-primary";
      case "producto": return "bi-capsule-pill text-success";
      case "historia": return "bi-file-earmark-medical text-info";
      default: return "bi-bell-fill text-warning";
    }
  }

  function updateUnreadCounter(notifs) {
    const unread = notifs.filter(n => !n.leida).length;
    counter.textContent = unread > 0 ? unread : '';
    counter.style.display = unread > 0 ? 'inline-block' : 'none';
    if (!window.location.pathname.includes("notificaciones.html")) {
      footerNotifIcon?.classList.toggle("notification-alert", unread > 0);
    }
  }

  function renderNotifications(notifs) {
    container.innerHTML = '';
    notifs.forEach(n => {
      const div = document.createElement('div');
      div.className = `list-group-item notification ${n.leida ? 'read' : 'unread'}`;
      div.setAttribute('data-id', n.id);
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
      container.appendChild(div);
    });
    updateUnreadCounter(notifs);
  }

  let notifs = loadNotifications();
  renderNotifications(notifs);

  container.addEventListener('click', e => {
    const notifItem = e.target.closest('.notification');
    const id = notifItem?.getAttribute('data-id');

    if (e.target.closest('.btn-mark-read')) {
      const notif = notifs.find(n => n.id === id);
      if (notif) notif.leida = !notif.leida;
      saveNotifications(notifs);
      renderNotifications(notifs);
    }

    if (e.target.closest('.btn-delete')) {
      notifs = notifs.filter(n => n.id !== id);
      saveNotifications(notifs);
      renderNotifications(notifs);
    }

    if (notifItem && !e.target.closest('button')) {
      notifItem.classList.toggle('expanded');
    }
  });

  markAllReadBtn.addEventListener("click", () => {
    notifs.forEach(n => n.leida = true);
    saveNotifications(notifs);
    renderNotifications(notifs);
  });
});