(function () {
  function getPreferredTheme() {
    try {
      var stored = localStorage.getItem('site-theme');
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (error) {}

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
  }

  function persistTheme(theme) {
    try {
      localStorage.setItem('site-theme', theme);
    } catch (error) {}
  }

  function toggleTheme() {
    var current = document.documentElement.dataset.theme || getPreferredTheme();
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    persistTheme(next);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getPreferredTheme());

    var trigger = document.querySelector('[data-theme-toggle]');
    if (!trigger) return;

    trigger.addEventListener('click', toggleTheme);
  });
})();
