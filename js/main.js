(function() {
  'use strict';

  /* --- SERVICE TABS --- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      tabPanels.forEach(p => p.classList.toggle('active', p.id === 'tab-' + target));
    });
  });

  /* --- QUOTE FORM MULTI-STEP --- */
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    let step = 1;
    const maxSteps = 3;
    const steps = quoteForm.querySelectorAll('.form-step');
    const dots = quoteForm.querySelectorAll('.step-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    function showStep(n) {
      steps.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      steps[n-1].classList.add('active');
      for (let i = 0; i < n; i++) dots[i].classList.add('active');
      prevBtn.style.display = n === 1 ? 'none' : 'inline-flex';
      if (n === maxSteps) { nextBtn.classList.add('hidden'); submitBtn.classList.remove('hidden'); }
      else { nextBtn.classList.remove('hidden'); submitBtn.classList.add('hidden'); }
    }
    if (nextBtn) nextBtn.addEventListener('click', () => { if (step < maxSteps) { step++; showStep(step); } });
    if (prevBtn) prevBtn.addEventListener('click', () => { if (step > 1) { step--; showStep(step); } });
  }

  /* --- FAQ ACCORDION --- */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const a = q.nextElementSibling;
      const isOpen = a.classList.contains('open');
      document.querySelectorAll('.faq-a').forEach(el => el.classList.remove('open'));
      document.querySelectorAll('.faq-q').forEach(el => el.classList.remove('active'));
      if (!isOpen) { a.classList.add('open'); q.classList.add('active'); }
    });
  });

  /* --- MOBILE MENU --- */
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? 'none' : 'flex';
      navLinks.style.flexDirection = open ? '' : 'column';
      navLinks.style.position = open ? '' : 'absolute';
      navLinks.style.top = open ? '' : '80px';
      navLinks.style.left = open ? '' : '0';
      navLinks.style.right = open ? '' : '0';
      navLinks.style.background = open ? '' : '#fff';
      navLinks.style.padding = open ? '' : '24px';
      navLinks.style.boxShadow = open ? '' : '0 10px 25px rgba(0,0,0,0.1)';
      navLinks.style.zIndex = open ? '' : '99';
      navCta.style.display = open ? 'none' : 'flex';
      navCta.style.position = open ? '' : 'absolute';
      navCta.style.top = open ? '' : 'calc(80px + ' + navLinks.scrollHeight + 'px)';
      navCta.style.left = open ? '' : '24px';
    });
  }

  /* --- SCROLL REVEAL --- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* --- SMOOTH SCROLL FOR ANCHORS --- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id.length > 1) { const el = document.querySelector(id); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }
    });
  });

  /* --- STICKY NAV SHADOW --- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.08)' : 'none';
    });
  }
})();
