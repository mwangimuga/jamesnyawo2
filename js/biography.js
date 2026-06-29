/* ============================================================
   BIOGRAPHY PAGE — Enhanced Smooth Scroll
   ============================================================ */

'use strict';

(function() {
  // ── Reading Progress Bar ──
  function initProgressBar() {
    const bar = document.createElement('div');
    bar.className = 'bio-progress-bar';
    document.body.appendChild(bar);

    const updateBar = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    };

    window.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  }

  // ── Smooth Scroll for anchor links ──
  function initSmoothLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  // ── Bio Article Reveal ──
  function initBioReveal() {
    const article = document.querySelector('.bio-article');
    if (!article) return;

    const children = Array.from(article.children);
    children.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s`;
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });

    children.forEach(el => io.observe(el));
  }

  // ── Milestone Sidebar Reveal ──
  function initMilestones() {
    const items = document.querySelectorAll('.milestones-list li');
    if (!items.length) return;

    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-14px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.09}s, transform 0.5s ease ${i * 0.09}s`;
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    items.forEach(el => io.observe(el));
  }

  // ── Parallax on bio hero ──
  function initBioHeroParallax() {
    const hero = document.querySelector('.bio-hero');
    if (!hero) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        hero.style.transform = `translateY(${scrollY * 0.25}px)`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Init ──
  document.addEventListener('DOMContentLoaded', () => {
    initProgressBar();
    initSmoothLinks();
    initBioReveal();
    initMilestones();
    initBioHeroParallax();
  });
})();
