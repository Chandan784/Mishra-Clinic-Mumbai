/* =========================================================
   MAIN SCRIPT
   - Applies CLINIC_CONFIG to DOM
   - Renders services dynamically
   - Sets current year in footer
   ========================================================= */
(function () {
  const cfg = window.CLINIC_CONFIG;
  if (!cfg) {
    console.warn('CLINIC_CONFIG not loaded. Check js/config.js.');
    return;
  }

  /* ---------- Apply text config ---------- */
  document.querySelectorAll('[data-config]').forEach((el) => {
    const key = el.getAttribute('data-config');
    if (cfg[key] !== undefined) {
      el.textContent = cfg[key];
    }
  });

  /* ---------- Apply href config ---------- */
  document.querySelectorAll('[data-config-href]').forEach((el) => {
    const key = el.getAttribute('data-config-href');
    if (key === 'phone') {
      el.setAttribute('href', 'tel:' + cfg.phone);
    } else if (key === 'email') {
      el.setAttribute('href', 'mailto:' + cfg.email);
    }
  });

  /* ---------- Apply src config ---------- */
  document.querySelectorAll('[data-config-src]').forEach((el) => {
    const key = el.getAttribute('data-config-src');
    if (cfg[key]) {
      el.setAttribute('src', cfg[key]);
    }
  });

  /* ---------- Logo: keep span formatting ---------- */
  const logo = document.querySelector('.logo');
  if (logo && cfg.clinicName) {
    const parts = cfg.clinicName.split(' ');
    if (parts.length > 1) {
      const first = parts.slice(0, -1).join(' ');
      const last = parts.slice(-1)[0];
      logo.innerHTML = `${first} <span>${last}</span>`;
    } else {
      logo.textContent = cfg.clinicName;
    }
  }

  /* ---------- Render services ---------- */
  const servicesGrid = document.getElementById('servicesGrid');
  if (servicesGrid && Array.isArray(cfg.services)) {
    servicesGrid.innerHTML = cfg.services
      .map(
        (s, i) => `
      <div class="service-card fade-up delay-${(i % 3) + 1}">
        <div class="service-icon"><i class="fas ${s.icon}"></i></div>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
      </div>
    `
      )
      .join('');
  }


  

/* ---------- Render gallery ---------- */
const galleryGrid = document.getElementById('galleryGrid');
if (galleryGrid && Array.isArray(cfg.gallery)) {
  galleryGrid.innerHTML = cfg.gallery
    .map(
      (item, i) => `
    <div class="gallery-item fade-up delay-${(i % 3) + 1}" data-index="${i}">
      <img src="${item.src}" alt="${item.alt || 'Clinic photo ' + (i + 1)}" loading="lazy" />
    </div>
  `
    )
    .join('');

  galleryGrid.querySelectorAll('.gallery-item').forEach((el) => {
    el.addEventListener('click', () => {
      const index = parseInt(el.getAttribute('data-index'), 10);
      if (window.Lightbox) window.Lightbox.open(cfg.gallery, index);
    });
  });
}


/* ---------- Apply social links ---------- */
if (cfg.social) {
  const socialMap = {
    facebook: 'a[aria-label="Facebook"]',
    instagram: 'a[aria-label="Instagram"]',
    twitter: 'a[aria-label="Twitter"]',
    linkedin: 'a[aria-label="LinkedIn"]',
    whatsapp: 'a[aria-label="WhatsApp"]',
  };
  Object.entries(socialMap).forEach(([key, selector]) => {
    const el = document.querySelector(selector);
    if (el && cfg.social[key]) el.setAttribute('href', cfg.social[key]);
  });
}



  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();


