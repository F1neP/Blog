(function () {
  const storageKey = 'frieren-theme';
  const root = document.documentElement;

  function currentTheme() {
    return root.dataset.theme === 'dark' ? 'dark' : 'light';
  }

  function syncButtons() {
    const dark = currentTheme() === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      const nextTheme = dark ? '浅色' : '深色';
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', '切换为' + nextTheme + '模式');
      button.title = '切换为' + nextTheme + '模式';
      const label = button.querySelector('[data-theme-label]');
      if (label) label.textContent = nextTheme;
    });
  }

  function setTheme(theme, persist) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    if (nextTheme === currentTheme()) return;

    function applyTheme() {
      root.dataset.theme = nextTheme;
      if (persist) {
        try {
          localStorage.setItem(storageKey, root.dataset.theme);
        } catch (_) {}
      }
      syncButtons();
      document.dispatchEvent(new CustomEvent('frieren-theme-change', {
        detail: { theme: root.dataset.theme }
      }));
    }

    const reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (document.startViewTransition && !reduceMotion) {
      document.startViewTransition(applyTheme);
      return;
    }

    root.classList.add('theme-transitioning');
    applyTheme();
    window.setTimeout(function () {
      root.classList.remove('theme-transitioning');
    }, 420);
  }

  document.addEventListener('DOMContentLoaded', function () {
    syncButtons();
    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.addEventListener('click', function () {
        setTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
      });
    });
  });

  window.FrierenTheme = {
    get: currentTheme,
    set: function (theme) { setTheme(theme, true); }
  };
})();
