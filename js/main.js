(function() {
  'use strict';

  // =================== REVEAL ON SCROLL ===================
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    reveals.forEach(el => revealObserver.observe(el));
  }

  // =================== ANIMATED COUNTERS ===================
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 2000;
          const start = performance.now();
          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countObserver.observe(el));
  }

  // =================== SERVICE TABS ===================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.querySelector(`.tab-panel[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
  // Auto-activate first tab
  if (tabBtns.length && !document.querySelector('.tab-btn.active')) {
    tabBtns[0].classList.add('active');
    const firstPanel = document.querySelector(`.tab-panel[data-panel="${tabBtns[0].dataset.tab}"]`);
    if (firstPanel) firstPanel.classList.add('active');
  }

  // =================== MOBILE MENU ===================
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      mobileBtn.innerHTML = isOpen ? '&times;' : '&#9776;';
    });
  }

  // =================== BEFORE / AFTER SLIDER ===================
  const baWrap = document.querySelector('.before-after');
  if (baWrap) {
    const slider = baWrap.querySelector('.ba-slider');
    const afterImg = baWrap.querySelector('.after-img');
    let isDragging = false;

    function setSlider(x) {
      const rect = baWrap.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(5, Math.min(95, pct));
      slider.style.left = pct + '%';
      afterImg.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    }

    slider.addEventListener('mousedown', () => isDragging = true);
    slider.addEventListener('touchstart', () => isDragging = true, {passive:true});
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('touchend', () => isDragging = false);
    baWrap.addEventListener('mousemove', (e) => { if (isDragging) setSlider(e.clientX); });
    baWrap.addEventListener('touchmove', (e) => {
      if (isDragging) setSlider(e.touches[0].clientX);
    }, {passive:true});
    baWrap.addEventListener('click', (e) => setSlider(e.clientX));
  }

  // =================== MODAL FORM ===================
  const modalOverlay = document.getElementById('quoteModal');
  const modalCloseBtn = document.getElementById('modalClose');
  const modalTriggers = document.querySelectorAll('[data-modal]');

  function openModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Focus first input
    setTimeout(() => {
      const firstInput = modalOverlay.querySelector('input, select, textarea');
      if (firstInput) firstInput.focus();
    }, 100);
  }
  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // =================== FORM SUBMIT (Formspree) ===================
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      // Formspree handles the real submission; this adds a success overlay
      const btn = quoteForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'Sending...';
      }
    });
  }

  // =================== SMOOTH SCROLL FOR ANCHORS ===================
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
