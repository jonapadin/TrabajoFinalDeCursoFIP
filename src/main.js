document.addEventListener("DOMContentLoaded", () => {

    const usuarioAutenticado = localStorage.getItem("usuarioAutenticado");
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (usuarioAutenticado === "true" && usuarioActivo) {
    const template = document.getElementById("nav-auth");
    const contenedorAuth = document.getElementById("contenedorNav");

    if (template && contenedorAuth) {
      const contenido = template.content.cloneNode(true);

      // Cambiar nombre del usuario
      const nombreUsuario = contenido.querySelector("#nombreUsuario");
      if (nombreUsuario) {
        nombreUsuario.textContent = usuarioActivo.nombre ?? "Usuario";
      }

      // Cambiar link del menú según el rol
      const linkMenu = contenido.querySelector("a");
      if (linkMenu) {
        if (usuarioActivo.rol === "admin") {
          linkMenu.href = "/pages/admin.html";
          linkMenu.textContent = "Panel Admin";
        } else {
          linkMenu.href = "/pages/usuario.html";
          linkMenu.textContent = "MENU  ";
        }
      }

      contenedorAuth.appendChild(contenido);
    }
  }

    const btnMenu = document.getElementById("btn-menu");
    const btnCloseMenu = document.getElementById('btn-close');
    const menu = document.getElementById("menu-desplegable");

    btnMenu.addEventListener("click", () => {
        const isHidden = menu.hasAttribute("hidden");
        if (isHidden) {
            menu.removeAttribute("hidden");
        } else {
            menu.setAttribute("hidden", "");
        }
    });


    btnCloseMenu.addEventListener("click", () => {
        menu.setAttribute("hidden", "");
    });


})