document.addEventListener('DOMContentLoaded', function () {
  var tocDesktop = document.getElementById('toc-desktop');
  var articleContent = document.getElementById('article-content');
  if (!tocDesktop || !articleContent) return;

  var headings = articleContent.querySelectorAll('h2[id]');
  if (headings.length === 0) return;

  // Wrap sections for mobile sticky headings
  wrapSections(articleContent);

  // Desktop: IntersectionObserver for active section highlighting
  setupDesktopHighlighting(headings);

  // Desktop: smooth scroll on TOC link click
  setupDesktopSmoothScroll();

  // Mobile: click handlers for sticky h2 -> overlay
  setupMobileOverlay();
});

function wrapSections(articleContent) {
  var children = Array.from(articleContent.children);
  var fragment = document.createDocumentFragment();
  var currentSection = null;

  children.forEach(function (child) {
    if (child.tagName === 'H2') {
      currentSection = document.createElement('section');
      currentSection.className = 'toc-section';
      fragment.appendChild(currentSection);
      currentSection.appendChild(child);
    } else if (currentSection) {
      currentSection.appendChild(child);
    } else {
      fragment.appendChild(child);
    }
  });

  articleContent.innerHTML = '';
  articleContent.appendChild(fragment);
}

function setupDesktopHighlighting(headings) {
  var tocLinks = document.querySelectorAll('.toc-desktop .toc-link');
  if (tocLinks.length === 0) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Remove active class from all links
        tocLinks.forEach(function (link) {
          link.classList.remove('toc-active');
        });

        // Add active class to the corresponding link
        var activeLink = document.querySelector(
          '.toc-desktop a[href="#' + entry.target.id + '"]'
        );
        if (activeLink) {
          activeLink.classList.add('toc-active');
        }

        // Also update mobile overlay active state
        var overlayLinks = document.querySelectorAll('.toc-overlay-link');
        overlayLinks.forEach(function (link) {
          link.classList.remove('toc-active');
        });
        var activeOverlayLink = document.querySelector(
          '.toc-overlay a[href="#' + entry.target.id + '"]'
        );
        if (activeOverlayLink) {
          activeOverlayLink.classList.add('toc-active');
        }
      }
    });
  }, {
    rootMargin: '-10% 0px -80% 0px'
  });

  headings.forEach(function (heading) {
    observer.observe(heading);
  });
}

function setupDesktopSmoothScroll() {
  var links = document.querySelectorAll('.toc-desktop .toc-link');
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = link.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function setupMobileOverlay() {
  var overlay = document.getElementById('toc-overlay');
  var closeBtn = document.getElementById('toc-overlay-close');
  if (!overlay) return;

  // Click on sticky h2 headings opens the overlay (only on mobile/tablet)
  var sectionHeadings = document.querySelectorAll('.toc-section h2');
  sectionHeadings.forEach(function (h2) {
    h2.addEventListener('click', function () {
      if (window.matchMedia('(max-width: 1100px)').matches) {
        overlay.classList.add('active');
      }
    });
  });

  // Close overlay via X button
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      overlay.classList.remove('active');
    });
  }

  // Close overlay by clicking backdrop
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });

  // Overlay links: scroll to section and close
  var overlayLinks = document.querySelectorAll('.toc-overlay-link');
  overlayLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      overlay.classList.remove('active');
      var targetId = link.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);
      if (target) {
        setTimeout(function () {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    });
  });
}
