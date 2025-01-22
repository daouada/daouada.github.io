// main.js
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuButton = document.querySelector(".menu-button");
  const navMenu = document.querySelector(".nav-menu");

  if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Active nav link
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
