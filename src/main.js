document.addEventListener("DOMContentLoaded", () => {
  const usuarioAutenticado = localStorage.getItem("usuarioAutenticado");
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (usuarioAutenticado === "true" && usuarioActivo) {
    const template = document.getElementById("nav-auth");
    const contenedorAuth = document.getElementById("contenedorNav");

    if (template && contenedorAuth) {
      const contenido = template.content.cloneNode(true);

      const nombreUsuario = contenido.querySelector("#nombreUsuario");
      if (nombreUsuario) {
        nombreUsuario.textContent = usuarioActivo.nombre ?? "Usuario";
      }

      const linkMenu = contenido.querySelector("a");
      if (linkMenu) {
        if (usuarioActivo.rol === "admin") {
          linkMenu.href = "/pages/admin.html";
          linkMenu.textContent = "Panel Admin";
        } else {
          linkMenu.href = "/pages/usuario.html";
          linkMenu.textContent = "MENU";
        }
      }

      contenedorAuth.appendChild(contenido);
    }

    // Ocultar botones si está autenticado
    const ocultarAuth = document.getElementById("ocultar-auth");
    if (ocultarAuth) ocultarAuth.style.display = "none";

    const ocultarBotonAuth = document.getElementById("ocultar-boton-auth");
    if (ocultarBotonAuth) ocultarBotonAuth.style.display = "none";

    //  Ocultar "Ingresar", mostrar "Menu" y "Cerrar sesión"
    const itemLogin = document.getElementById("item-login");
    const itemMenu = document.getElementById("item-menu");
    const itemLogout = document.getElementById("item-logout");

    if (itemLogin) itemLogin.style.display = "none";
    if (itemMenu) itemMenu.style.display = "block";
    if (itemLogout) itemLogout.style.display = "block";

    // Evento para cerrar sesión
    const btnCerrarSesion = document.getElementById("cerrar-sesion");
    if (btnCerrarSesion) {
      btnCerrarSesion.addEventListener("click", () => {
        localStorage.removeItem("usuarioAutenticado");
        localStorage.removeItem("usuarioActivo");
        window.location.href = "/index.html"; 
      });
    }
  }

  // Menú mobile toggle
  const btnMenu = document.getElementById("btn-menu");
  const btnCloseMenu = document.getElementById("btn-close");
  const menu = document.getElementById("menu-desplegable");

  btnMenu?.addEventListener("click", () => {
    const isHidden = menu.hasAttribute("hidden");
    if (isHidden) {
      menu.removeAttribute("hidden");
    } else {
      menu.setAttribute("hidden", "");
    }
  });

  btnCloseMenu?.addEventListener("click", () => {
    menu.setAttribute("hidden", "");
  });
});
