document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("btn-menu");
    const menu = document.getElementById("menu-desplegable");

    btnMenu.addEventListener("click", () => {
    const isHidden = menu.hasAttribute("hidden");
    if (isHidden) {
        menu.removeAttribute("hidden");
    } else {
        menu.setAttribute("hidden", "");
    }
    });
})