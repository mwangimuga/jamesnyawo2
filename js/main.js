/* ============================================================
   DR. JAMES NYAWO — MAIN JAVASCRIPT
   Navigation, animations, scroll reveal, interactions
   ============================================================ */

'use strict';

/* ── Utility ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Navigation ── */
function initNav() {
  const nav = $('.site-nav');
  const hamburger = $('.nav-hamburger');
  const mobileMenu = $('.nav-mobile');
  const links = $$('.nav-links a, .nav-mobile ul a');

  // Scroll state
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  // Active link
  const currentPage = location.pathname.replace(/\/$/, '') || '/index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (currentPage.endsWith(href.replace('.html', '')) || href === currentPage)) {
      link.classList.add('active');
    }
  });

  // Close mobile on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger) hamburger.classList.remove('open');
      if (mobileMenu) mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── Scroll Reveal ── */
function initReveal() {
  const els = $$('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

/* ── Counter Animation ── */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target || el.textContent);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = $$('.stat-number[data-target]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
}

/* ── Biography Smooth Scroll (Lenis-style via CSS + JS) ── */
function initBioSmoothScroll() {
  const bioContainer = $('.bio-smooth-container');
  if (!bioContainer) return;

  // Use native smooth scrolling + enhanced scroll behavior for bio page
  // Add parallax-like effect to bio article sections
  const bioSections = $$('.bio-article > *');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  bioSections.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s`;
    io.observe(el);
  });

  // Milestone highlight on scroll
  const milestones = $$('.milestones-list li');
  if (milestones.length) {
    const milestoneIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }
      });
    }, { threshold: 0.3 });

    milestones.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-12px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
      milestoneIO.observe(el);
    });
  }
}

/* ── Ticker Pause on Hover ── */
function initTicker() {
  const track = $('.ticker-track');
  if (!track) return;
  // Already handled by CSS :hover pause
}

/* ── Book 3D Tilt ── */
function initBookTilt() {
  const book = $('.book-3d');
  if (!book) return;

  book.addEventListener('mousemove', (e) => {
    const rect = book.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    book.style.transform = `perspective(1000px) rotateY(${-15 + dx * 8}deg) rotateX(${3 - dy * 4}deg)`;
  });

  book.addEventListener('mouseleave', () => {
    book.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(3deg)';
  });
}

/* ── Form Handling ── */
function initForms() {
  const forms = $$('form.booking-form, form.contact-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Sending…';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'Message Sent ✓';
          btn.style.background = '#2a6e3f';
          form.reset();
        }, 1200);
      }
    });
  });
}

/* ── Cursor Enhancement ── */
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 8px; height: 8px; border-radius: 50%;
    background: rgba(201,168,76,0.8);
    transform: translate(-50%, -50%);
    transition: transform 0.15s ease, opacity 0.3s;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(cursor);

  const ring = document.createElement('div');
  ring.className = 'custom-cursor-ring';
  ring.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9998;
    width: 32px; height: 32px; border-radius: 50%;
    border: 1px solid rgba(201,168,76,0.35);
    transform: translate(-50%, -50%);
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), width 0.3s, height 0.3s, opacity 0.3s;
  `;
  document.body.appendChild(ring);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    ring.style.left = mx + 'px';
    ring.style.top = my + 'px';
  });

  $$('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '48px';
      ring.style.height = '48px';
      ring.style.borderColor = 'rgba(201,168,76,0.6)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = 'rgba(201,168,76,0.35)';
    });
  });
}

/* ── Page Transition ── */
function initPageTransition() {
  const main = $('main');
  if (main) main.classList.add('page-transition');
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initCounters();
  initBioSmoothScroll();
  initTicker();
  initBookTilt();
  initForms();
  initCursor();
  initPageTransition();
});
