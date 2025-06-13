// main.js - Lógica para controlar o menu lateral

document.addEventListener('DOMContentLoaded', () => {
    const menuToggleButton = document.getElementById('menu-toggle-btn');
    const sideMenu = document.getElementById('side-menu');

    if (menuToggleButton && sideMenu) {
        menuToggleButton.onclick = () => {
            sideMenu.classList.toggle('open');
        };
    }
});