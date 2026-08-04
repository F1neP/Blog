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
    root.dataset.theme = theme === 'dark' ? 'dark' : 'light';
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
