document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-tex]').forEach(function (element) {
    katex.render(element.dataset.tex, element, {
      displayMode: element.classList.contains('math-line'),
      throwOnError: false,
      strict: false
    });
  });

  const shareButton = document.getElementById('share-button');
  const toast = document.getElementById('action-toast');
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  document.addEventListener('frieren-theme-change', function (event) {
    showToast(event.detail.theme === 'dark' ? '已切换为深色模式' : '已切换为浅色模式');
  });

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    if (!copied) throw new Error('copy failed');
  }

  if (shareButton) {
    shareButton.addEventListener('click', async function () {
      const canonical = document.querySelector('link[rel="canonical"]');
      const url = canonical ? canonical.href : window.location.href;
      const shareData = { title: document.title, text: document.body.dataset.shareTitle || document.title, url: url };
      if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
        try { await navigator.share(shareData); return; }
        catch (error) { if (error && error.name === 'AbortError') return; }
      }
      try { await copyText(url); showToast('公开链接已复制'); }
      catch (_) { window.prompt('复制下面的公开链接：', url); }
    });
  }
});
