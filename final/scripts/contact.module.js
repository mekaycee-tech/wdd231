// External JS module for Contact Page (No inline JavaScript allowed)
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}