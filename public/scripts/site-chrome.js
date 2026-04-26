(function () {
  function fallbackCopy(text) {
    var input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  function setupCopyLinks() {
    var buttons = document.querySelectorAll('[data-copy-link]');
    if (!buttons.length) return;

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var url = button.getAttribute('data-copy-link');
        if (!url) return;

        var done = function () {
          button.classList.add('is-copied');
          window.setTimeout(function () {
            button.classList.remove('is-copied');
          }, 1600);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done).catch(function () {
            fallbackCopy(url);
            done();
          });
          return;
        }

        fallbackCopy(url);
        done();
      });
    });
  }

  function setupHeaderDrawer() {
    var toggles = document.querySelectorAll('[data-site-menu-toggle]');
    var backdrop = document.querySelector('[data-site-menu-close]');
    var drawer = document.getElementById('site-header-drawer');
    if (!toggles.length || !drawer) return;

    function setOpen(open) {
      document.body.classList.toggle('site-menu-open', open);
      toggles.forEach(function (toggle) {
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        setOpen(!document.body.classList.contains('site-menu-open'));
      });
    });

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        setOpen(false);
      });
    }

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupCopyLinks();
    setupHeaderDrawer();
  });
})();
