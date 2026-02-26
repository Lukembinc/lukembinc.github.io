/* ============================================================
   THEME — detect, apply, toggle
   ============================================================ */
(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  root.dataset.theme = theme;
})();

document.addEventListener('DOMContentLoaded', function () {

  /* -- Theme toggle button -- */
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    const root = document.documentElement;

    function updateIcon() {
      const isDark = root.dataset.theme === 'dark';
      toggle.textContent = isDark ? '☀' : '☽';
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    updateIcon();

    toggle.addEventListener('click', function () {
      const isDark = root.dataset.theme === 'dark';
      root.dataset.theme = isDark ? 'light' : 'dark';
      localStorage.setItem('theme', root.dataset.theme);
      updateIcon();
    });
  }

  /* ============================================================
     NAV — frosted glass on scroll
     ============================================================ */
  const nav = document.querySelector('.nav');
  if (nav) {
    function handleNavScroll() {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  /* ============================================================
     SCROLL ANIMATIONS — IntersectionObserver
     ============================================================ */
  const animatedEls = document.querySelectorAll('.animate-in');
  if (animatedEls.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    animatedEls.forEach(function (el) {
      observer.observe(el);
    });
  }

});
