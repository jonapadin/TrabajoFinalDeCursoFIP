document.addEventListener("DOMContentLoaded", () => {
    console.log("script cargado");
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