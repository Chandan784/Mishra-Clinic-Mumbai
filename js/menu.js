/* =========================================================
   MOBILE MENU TOGGLE
   ========================================================= */
(function () {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (!menuToggle || !navLinks) return;

  /* ---------- Open / Close helpers ---------- */
  function openMenu() {
    navLinks.classList.add('active');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* ---------- Toggle on hamburger click ---------- */
  menuToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* ---------- Close when a nav link is clicked ---------- */
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Close when clicking the overlay ---------- */
  navLinks.addEventListener('click', (e) => {
    if (e.target === navLinks) closeMenu();
  });

  /* ---------- Close on Escape key ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      closeMenu();
    }
  });

  /* ---------- Auto-close when resizing to desktop ---------- */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) closeMenu();
  });
})();