document.addEventListener("DOMContentLoaded", () => {
  let seleccion = "";

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

  const dateInput = document.querySelector("#datepicker");

  if (dateInput && typeof flatpickr !== "undefined") {
    flatpickr(dateInput, {
      locale: "es",
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      minDate: "today",
      time_24hr: true,
      defaultHour: 8,
      minuteIncrement: 30,
      disable: [
        (date) => date.getDay() === 0 || date.getDay() === 6,
        ...feriadosArg,
      ],
      minTime: "08:00",
      maxTime: "16:00",
      onChange: function (_, dateStr, instance) {
        const horariosOcupados = ["2025-06-01 09:00", "2025-06-02 11:30"];
        if (horariosOcupados.includes(dateStr)) {
          alert("Ese horario ya está reservado. Por favor selecciona otro.");
          instance.clear();
        }
      },
    });
  }

  function selectOption(selected) {
    document.querySelectorAll(".option-container button").forEach((btn) => {
      btn.classList.remove("option-selected");
    });
    selected.querySelector("button").classList.add("option-selected");
    seleccion = selected.querySelector(".option-label").innerText.toLowerCase();
  }

  window.selectOption = selectOption;

  function loadNotifications() {
    return JSON.parse(localStorage.getItem("notifications") || "[]");
  }

  function saveNotifications(notifs) {
    localStorage.setItem("notifications", JSON.stringify(notifs));
  }

  function generateId() {
    return "notif-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  }

  reservarBtn.addEventListener("click", function () {
  const fechaHora = dateInput.value;
  const motivo = document.getElementById("tipoTurno").value;
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!seleccion) {
    alert("Por favor selecciona una especie antes de reservar.");
    return;
  }

  if (!fechaHora) {
    alert("Selecciona una fecha y hora válida.");
    return;
  }

  if (!motivo) {
    alert("Selecciona un motivo válido.");
    return;
  }

  // Notificación
  const notifs = loadNotifications();
  const nuevaNotificacion = {
    id: generateId(),
    mensaje: `Reserva creada para tu ${seleccion} el ${fechaHora}`,
    leida: false
  };
  notifs.unshift(nuevaNotificacion);
  saveNotifications(notifs);

  // Turno
  const turnos = JSON.parse(localStorage.getItem("turnos") || "[]");
  const nuevoTurno = {
    id: crypto.randomUUID(),
    especie: seleccion,
    fecha: fechaHora,
    motivo: motivo,
    emailDuenio: usuarioActivo.email
  };
  turnos.push(nuevoTurno);
  localStorage.setItem("turnos", JSON.stringify(turnos));

  // Mostrar modal
  const modal = new bootstrap.Modal(document.getElementById('reservaModal'));
  modal.show();

  // Limpiar campos
  dateInput.value = "";
  document.getElementById("tipoTurno").value = "";
  document.querySelectorAll('.option-container button').forEach(btn => btn.classList.remove('option-selected'));
  seleccion = "";
});

});
