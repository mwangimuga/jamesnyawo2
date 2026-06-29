/* ============================================================
   SHARED COMPONENTS — Nav & Footer injection
   Handles both root (index.html) and pages/ subdirectory
   ============================================================ */

'use strict';

function injectComponents() {
  const isRoot = !location.pathname.includes('/pages/');
  const base = isRoot ? '' : '../';

  const NAV_HTML = `
<nav class="site-nav" id="site-nav">
  <div class="nav-inner">
    <a href="${base}index.html" class="nav-logo">
      <div class="nav-logo-mark">JN</div>
      <span class="nav-logo-text">Dr. James Nyawo</span>
    </a>
    <ul class="nav-links">
      <li><a href="${base}index.html">Home</a></li>
      <li><a href="${base}pages/biography.html">Biography</a></li>
      <li><a href="${base}pages/research.html">Research</a></li>
      <li><a href="${base}pages/speaking.html">Speaking</a></li>
      <li><a href="${base}pages/humanitarian.html">Humanitarian</a></li>
      <li><a href="${base}pages/services.html">Services</a></li>
      <li><a href="${base}pages/contact.html">Contact</a></li>
    </ul>
    <a href="${base}pages/services.html#book" class="nav-cta">Book Dr. Nyawo</a>
    <button class="nav-hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="nav-mobile" id="nav-mobile">
  <ul>
    <li><a href="${base}index.html">Home</a></li>
    <li><a href="${base}pages/biography.html">Biography</a></li>
    <li><a href="${base}pages/research.html">Research</a></li>
    <li><a href="${base}pages/speaking.html">Speaking</a></li>
    <li><a href="${base}pages/humanitarian.html">Humanitarian</a></li>
    <li><a href="${base}pages/services.html">Services</a></li>
    <li><a href="${base}pages/contact.html">Contact</a></li>
  </ul>
  <a href="${base}pages/services.html#book" class="mobile-cta">Book Dr. Nyawo</a>
</div>`;

  const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-kente"></div>
  <div class="footer-inner">
    <div class="footer-brand">
      <p class="display-heading" style="font-size:1.6rem;">Dr. James Nyawo</p>
      <p class="tagline">Scholar of International Law &amp; Relations. UN humanitarian practitioner. Lecturer at Strathmore University, Nairobi. Re-membering mother Africa, one argument at a time.</p>
    </div>
    <div>
      <p class="footer-col-title">Navigate</p>
      <ul class="footer-nav-list">
        <li><a href="${base}index.html">Home</a></li>
        <li><a href="${base}pages/biography.html">Biography</a></li>
        <li><a href="${base}pages/research.html">Research</a></li>
        <li><a href="${base}pages/speaking.html">Speaking</a></li>
        <li><a href="${base}pages/humanitarian.html">Humanitarian</a></li>
        <li><a href="${base}pages/services.html">Services</a></li>
        <li><a href="${base}pages/contact.html">Contact</a></li>
      </ul>
    </div>
    <div>
      <p class="footer-col-title">Contact</p>
      <address class="footer-contact">
        PO Box 43844, Nairobi, 00100, Kenya<br>
        <a href="tel:+254208710901">+254 208 710 901</a><br>
        <a href="mailto:james@nyawo.ke">james@nyawo.ke</a><br>
        <a href="https://twitter.com/james_nyawo" target="_blank" rel="noreferrer">@james_nyawo</a>
      </address>
    </div>
  </div>
  <div class="footer-bottom">
    &copy; 2025 Dr. James Nyawo &middot; All Rights Reserved
  </div>
</footer>
<a href="https://wa.me/254208710901" target="_blank" rel="noreferrer" class="whatsapp-fab" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>`;

  // Inject nav
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) {
    navPlaceholder.outerHTML = NAV_HTML;
  }

  // Inject footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = FOOTER_HTML;
  }
}

// Run immediately (synchronous DOM injection before DOMContentLoaded)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectComponents);
} else {
  injectComponents();
}
