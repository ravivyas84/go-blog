(function () {
  var DEFAULTS = {
    size: 20,
    lineHeight: 1.65,
    width: 680,
    face: 'georgia'
  };

  var FACES = {
    georgia: 'Georgia, Cambria, "Times New Roman", Times, serif',
    charter: '"Charter", "Bitstream Charter", Georgia, serif',
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
  };

  function load(key, fallback) {
    try {
      var v = localStorage.getItem('reader-' + key);
      return v !== null ? v : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function save(key, value) {
    try { localStorage.setItem('reader-' + key, value); } catch (e) {}
  }

  function applyAll(prefs) {
    var root = document.documentElement;
    root.style.setProperty('--font-size-base', prefs.size + 'px');
    root.style.setProperty('--line-height-base', prefs.lineHeight);
    root.style.setProperty('--reading-width', prefs.width + 'px');
    root.style.setProperty('--font-body', FACES[prefs.face] || FACES.georgia);
  }

  // Read saved prefs immediately (before DOMContentLoaded) to prevent FOUC
  var prefs = {
    size: parseInt(load('size', DEFAULTS.size)),
    lineHeight: parseFloat(load('lineHeight', DEFAULTS.lineHeight)),
    width: parseInt(load('width', DEFAULTS.width)),
    face: load('face', DEFAULTS.face)
  };

  if (![18, 20, 22].includes(prefs.size)) prefs.size = DEFAULTS.size;
  if (![1.4, 1.65, 1.9].includes(prefs.lineHeight)) prefs.lineHeight = DEFAULTS.lineHeight;
  if (![560, 680, 800].includes(prefs.width)) prefs.width = DEFAULTS.width;
  if (!FACES[prefs.face]) prefs.face = DEFAULTS.face;

  applyAll(prefs);

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('font-size-btn');
    var panel = document.getElementById('font-size-panel');
    if (!btn || !panel) return;

    function syncActive() {
      panel.querySelectorAll('[data-size]').forEach(function (el) {
        el.classList.toggle('active', parseInt(el.dataset.size) === prefs.size);
      });
      panel.querySelectorAll('[data-lh]').forEach(function (el) {
        el.classList.toggle('active', parseFloat(el.dataset.lh) === prefs.lineHeight);
      });
      panel.querySelectorAll('[data-width]').forEach(function (el) {
        el.classList.toggle('active', parseInt(el.dataset.width) === prefs.width);
      });
      panel.querySelectorAll('[data-face]').forEach(function (el) {
        el.classList.toggle('active', el.dataset.face === prefs.face);
      });
    }

    syncActive();

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.classList.toggle('open');
    });

    panel.addEventListener('click', function (e) {
      var el = e.target.closest('.pref-option');
      if (!el) return;
      if (el.dataset.size)  { prefs.size = parseInt(el.dataset.size); save('size', prefs.size); }
      if (el.dataset.lh)    { prefs.lineHeight = parseFloat(el.dataset.lh); save('lineHeight', prefs.lineHeight); }
      if (el.dataset.width) { prefs.width = parseInt(el.dataset.width); save('width', prefs.width); }
      if (el.dataset.face)  { prefs.face = el.dataset.face; save('face', prefs.face); }
      applyAll(prefs);
      syncActive();
    });

    document.addEventListener('click', function (e) {
      var control = document.getElementById('font-size-control');
      if (control && !control.contains(e.target)) {
        panel.classList.remove('open');
      }
    });
  });
})();
