(function () {
  const storageKey = 'frieren-theme';
  const root = document.documentElement;

  function currentTheme() {
    return root.dataset.theme === 'dark' ? 'dark' : 'light';
  }

  function upgradeControls() {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (legacyButton) {
      const group = document.createElement('div');
      group.className = 'blog-theme-switch';
      group.setAttribute('role', 'group');
      group.setAttribute('aria-label', '页面颜色主题');
      group.innerHTML = [
        '<button type="button" data-theme-option="dark"><span class="theme-symbol" aria-hidden="true">☾</span>BLACK</button>',
        '<button type="button" data-theme-option="light"><span class="theme-symbol" aria-hidden="true">☀</span>WHITE</button>'
      ].join('');
      legacyButton.replaceWith(group);
    });
  }

  function syncButtons() {
    const theme = currentTheme();
    document.querySelectorAll('[data-theme-option]').forEach(function (button) {
      const active = button.dataset.themeOption === theme;
      const themeName = button.dataset.themeOption === 'dark' ? '深色模式' : '浅色模式';
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', (active ? '当前为' : '切换为') + themeName);
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
    upgradeControls();
    syncButtons();
    document.querySelectorAll('[data-theme-option]').forEach(function (button) {
      button.addEventListener('click', function () {
        setTheme(button.dataset.themeOption, true);
      });
    });
  });

  window.FrierenTheme = {
    get: currentTheme,
    set: function (theme) { setTheme(theme, true); }
  };
})();
