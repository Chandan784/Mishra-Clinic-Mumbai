/* =========================================================
   SCROLL-BASED ANIMATIONS
   Re-triggers fade-up for sections on scroll
   ========================================================= */
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Pause animations initially until they enter viewport
  window.addEventListener('load', () => {
    document.querySelectorAll('.fade-up').forEach((el) => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  });
})();