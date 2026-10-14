/* =========================================================
   MAIN SCRIPT
   - Applies CLINIC_CONFIG to DOM
   - Renders services, gallery, testimonials
   - Enquiry form → WhatsApp redirect
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
    if (cfg[key] !== undefined) el.textContent = cfg[key];
  });

  /* ---------- Apply href config ---------- */
  document.querySelectorAll('[data-config-href]').forEach((el) => {
    const key = el.getAttribute('data-config-href');
    if (key === 'phone') el.setAttribute('href', 'tel:' + cfg.phone);
    else if (key === 'email') el.setAttribute('href', 'mailto:' + cfg.email);
  });

  /* ---------- Apply src config ---------- */
  document.querySelectorAll('[data-config-src]').forEach((el) => {
    const key = el.getAttribute('data-config-src');
    if (cfg[key]) el.setAttribute('src', cfg[key]);
  });

  /* ---------- Logo formatting ---------- */
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

  /* ---------- Social links ---------- */
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

  /* ---------- Render services ---------- */
  const servicesGrid = document.getElementById('servicesGrid');
  if (servicesGrid && Array.isArray(cfg.services)) {
    servicesGrid.innerHTML = cfg.services
      .map((s, i) => `
        <div class="service-card fade-up delay-${(i % 3) + 1}">
          <div class="service-icon"><i class="fas ${s.icon}"></i></div>
          <h3>${s.title}</h3>
          <p>${s.description}</p>
        </div>
      `)
      .join('');
  }

  /* ---------- Render gallery ---------- */
  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid && Array.isArray(cfg.gallery)) {
    galleryGrid.innerHTML = cfg.gallery
      .map((item, i) => `
        <div class="gallery-item fade-up delay-${(i % 3) + 1}" data-index="${i}">
          <img src="${item.src}" alt="${item.alt || 'Clinic photo ' + (i + 1)}" loading="lazy" />
        </div>
      `)
      .join('');

    galleryGrid.querySelectorAll('.gallery-item').forEach((el) => {
      el.addEventListener('click', () => {
        const index = parseInt(el.getAttribute('data-index'), 10);
        if (window.Lightbox) window.Lightbox.open(cfg.gallery, index);
      });
    });
  }

  /* ---------- Render testimonials ---------- */
  const testimonialsGrid = document.getElementById('testimonialsGrid');
  if (testimonialsGrid && Array.isArray(cfg.testimonials)) {
    testimonialsGrid.innerHTML = cfg.testimonials
      .map((t, i) => {
        const initials = t.name.split(' ').map((n) => n[0]).join('').toUpperCase();
        const stars = '★'.repeat(t.stars) + '☆'.repeat(5 - t.stars);
        return `
          <div class="testimonial-card fade-up delay-${(i % 3) + 1}">
            <div class="testimonial-quote">“</div>
            <div class="testimonial-stars">${stars}</div>
            <p class="testimonial-text">${t.text}</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">${initials}</div>
              <div>
                <div class="testimonial-name">${t.name}</div>
                <div class="testimonial-role">${t.role}</div>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  /* ---------- Enquiry form → WhatsApp ---------- */
  const form = document.getElementById('enquiryForm');
  const note = document.getElementById('enquiryNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = form.name.value.trim();
      const phone   = form.phone.value.trim();
      const date    = form.date.value;
      const slot    = form.slot.value;
      const service = form.service.value;
      const message = form.message.value.trim();

      if (!name || !phone) {
        note.textContent = '❌ Please fill in your name and phone.';
        note.className = 'form-note error';
        return;
      }

      if (phone.replace(/\D/g, '').length < 8) {
        note.textContent = '❌ Please enter a valid phone number.';
        note.className = 'form-note error';
        return;
      }

      const lines = [
        `*New Appointment Enquiry*`,
        ``,
        `👤 *Name:* ${name}`,
        `📞 *Phone:* ${phone}`,
      ];
      if (date)    lines.push(`📅 *Preferred Date:* ${date}`);
      if (slot)    lines.push(`🕒 *Preferred Slot:* ${slot}`);
      if (service) lines.push(`🩺 *Service:* ${service}`);
      if (message) lines.push(`📝 *Message:* ${message}`);

      const text = encodeURIComponent(lines.join('\n'));
      const number = (cfg.whatsappNumber || cfg.phone || '').replace(/\D/g, '');
      const url = `https://wa.me/${number}?text=${text}`;

      note.textContent = '✅ Opening WhatsApp...';
      note.className = 'form-note success';

      window.open(url, '_blank');

      setTimeout(() => {
        form.reset();
        note.textContent = '';
        note.className = 'form-note';
      }, 1500);
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();


/* ---------- Hero slider ---------- */
const heroTrack = document.getElementById('heroSliderTrack');
const heroDots  = document.getElementById('heroSliderDots');

if (heroTrack && heroDots && Array.isArray(cfg.heroImages) && cfg.heroImages.length) {
  const images = cfg.heroImages;

  // Inject slides
  heroTrack.innerHTML = images
    .map(
      (img, i) => `
      <img src="${img.src}" alt="${img.alt || 'Slide ' + (i + 1)}"
           class="${i === 0 ? 'active' : ''}" loading="${i === 0 ? 'eager' : 'lazy'}" />
    `
    )
    .join('');

  // Inject dots
  heroDots.innerHTML = images
    .map((_, i) => `<button data-index="${i}" class="${i === 0 ? 'active' : ''}" aria-label="Go to slide ${i + 1}"></button>`)
    .join('');

  const slides = heroTrack.querySelectorAll('img');
  const dots   = heroDots.querySelectorAll('button');
  let current  = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() {
    goTo(current + 1);
  }

  function startAuto() {
    stopAuto();
    if (images.length > 1) timer = setInterval(next, 4000);
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
  }

  // Dot click
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index, 10));
      startAuto();
    });
  });

  // Pause on hover
  heroTrack.addEventListener('mouseenter', stopAuto);
  heroTrack.addEventListener('mouseleave', startAuto);

  // Pause when tab hidden (saves battery)
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAuto() : startAuto();
  });

  startAuto();
}