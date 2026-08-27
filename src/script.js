"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=script.js.map

const navBar = document.querySelector(".nav-bar");

const links = navBar.querySelectorAll("a");

links.forEach((link) => {
    link.addEventListener("click", () => {
        console.log(link.textContent);
    });
});