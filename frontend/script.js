// script.js - controla el menú, paneles y slider de noticias
(function () {
  /* Menú y paneles */
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('open');
    });
  }

  document.querySelectorAll('.menu-item.has-panel').forEach(item => {
    const btn = item.querySelector('.menu-btn');
    const panel = item.querySelector('.panel');

    if (btn && panel) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        panel.classList.toggle('open');
        panel.setAttribute('aria-hidden', String(expanded));
      });
    }
  });

  document.addEventListener('click', (e) => {
    const insideNav = e.target.closest('.main-nav') || e.target.closest('#menu-toggle');
    if (!insideNav) {
      document.querySelectorAll('.panel.open').forEach(p => p.classList.remove('open'));
      document.querySelectorAll('.menu-btn[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded','false'));
    }
  });

  /* Slider de noticias */
  const slider = document.getElementById('slider'); // ahora usamos id="slider"
  if (!slider) return;

  const slidesContainer = slider.querySelector('.slides');
  const slides = Array.from(slidesContainer.querySelectorAll('.slide'));
  const indicators = Array.from(slider.querySelectorAll('.slider-nav button'));

  let current = 0;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 3000; // 5s

  function goTo(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    current = index;
    const offset = -index * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
    indicators.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // Botones indicadores
  indicators.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      goTo(index);
      resetAutoplay();
    });
  });

  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(next, AUTOPLAY_DELAY);
  }
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Pause on hover/focus
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin', stopAutoplay);
  slider.addEventListener('focusout', startAutoplay);

  // Initialize
  goTo(0);
  startAutoplay();

  // Keyboard navigation
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { prev(); resetAutoplay(); }
    if (e.key === 'ArrowRight') { next(); resetAutoplay(); }
  });
})();