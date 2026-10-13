/* =========================================================
   LIGHTBOX — fullscreen image viewer
   ========================================================= */
(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const btnClose = document.getElementById('lightboxClose');
  const btnPrev = document.getElementById('lightboxPrev');
  const btnNext = document.getElementById('lightboxNext');

  if (!lightbox || !lightboxImage) return;

  let images = [];
  let currentIndex = 0;

  function show() {
    const item = images[currentIndex];
    if (!item) return;
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt || '';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImage.src = '';
  }

  function next() {
    if (!images.length) return;
    currentIndex = (currentIndex + 1) % images.length;
    show();
  }

  function prev() {
    if (!images.length) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    show();
  }

  btnClose?.addEventListener('click', close);
  btnNext?.addEventListener('click', (e) => { e.stopPropagation(); next(); });
  btnPrev?.addEventListener('click', (e) => { e.stopPropagation(); prev(); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  window.Lightbox = {
    open(list, index) { images = list; currentIndex = index; show(); },
    close, next, prev,
  };
})();