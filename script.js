document.addEventListener('DOMContentLoaded', function () {
  // Current year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Bootstrap ScrollSpy
  try {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 80
    });
  } catch (e) {
    // Bootstrap may not be available yet; ignore
  }

  // Collapse mobile navbar on link click
  var navContent = document.getElementById('navContent');
  if (navContent) {
    navContent.querySelectorAll('a.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        var bsCollapse = bootstrap.Collapse.getInstance(navContent);
        if (bsCollapse && window.getComputedStyle(navContent).display !== 'none') {
          bsCollapse.hide();
        }
      });
    });
  }

  // Back to top button
  var toTopBtn = document.getElementById('toTop');
  var toggleToTop = function () {
    if (!toTopBtn) return;
    if (window.scrollY > 200) {
      toTopBtn.classList.add('show');
    } else {
      toTopBtn.classList.remove('show');
    }
  };
  window.addEventListener('scroll', toggleToTop, { passive: true });
  toggleToTop();
  if (toTopBtn) {
    toTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Profile image fallback: try sujan.jpg if sujan.jpeg fails
  var img = document.getElementById('profile-photo');
  if (img) {
    img.addEventListener('error', function onErr() {
      if (!img.dataset.fallbackTried) {
        img.dataset.fallbackTried = '1';
        img.src = 'sujan.jpg';
      } else {
        // prevent infinite loop
        img.removeEventListener('error', onErr);
      }
    });
  }
});


