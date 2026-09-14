document.addEventListener('DOMContentLoaded', function () {
  const texCorrections = new Map([
    ['x_1,ldots,x_{n-1}', 'x_1,\\ldots,x_{n-1}'],
    ['x_n=x-sum_{i<n}x_i', 'x_n=x-\\sum_{i<n}x_i'],
    ['mathbf z=(1,x,u,v,y)', '\\mathbf z=(1,x,u,v,y)'],
    ['(0,1,0,0,0)mathbf zcdot(0,1,0,0,0)mathbf z=(0,0,1,0,0)mathbf z,', '(0,1,0,0,0)\\mathbf z\\cdot(0,1,0,0,0)\\mathbf z=(0,0,1,0,0)\\mathbf z,'],
    ['(0,0,1,0,0)mathbf zcdot(0,1,0,0,0)mathbf z=(0,0,0,1,0)mathbf z,', '(0,0,1,0,0)\\mathbf z\\cdot(0,1,0,0,0)\\mathbf z=(0,0,0,1,0)\\mathbf z,'],
    ['(5,1,0,1,0)mathbf zcdot(1,0,0,0,0)mathbf z=(0,0,0,0,1)mathbf z.', '(5,1,0,1,0)\\mathbf z\\cdot(1,0,0,0,0)\\mathbf z=(0,0,0,0,1)\\mathbf z.'],
    ['vk_{mathbf x}=IC_0+sum_{i=1}^{ell}x_iIC_i', 'vk_{\\mathbf x}=\\mathrm{IC}_0+\\sum_{i=1}^{\\ell}x_i\\mathrm{IC}_i'],
    ['A,Cin G_1', 'A,C\\in G_1'],
    ['Bin G_2', 'B\\in G_2'],
    ['\\forall f\\in F,quad f\\in T', '\\forall f\\in F,\\quad f\\in T'],
    ['T={0,1,ldots,255}', 'T=\\{0,1,\\ldots,255\\}'],
    ['\t' + 'heta', '\\theta'],
    ['(a,b,c)mapsto a+\t' + 'heta b+\t' + 'heta^2c', '(a,b,c)\\mapsto a+\\theta b+\\theta^2c'],
    ['mathbb Z_{2^k}', '\\mathbb Z_{2^k}'],
    ['lambda', '\\lambda'],
    ["mathbf z'=mathbf z_1+rmathbf z_2", "\\mathbf z'=\\mathbf z_1+r\\mathbf z_2"],
    ['mathbf E', '\\mathbf E'],
    ['C_f=mathsf{Commit}(f)', 'C_f=\\mathsf{Commit}(f)'],
    ['pi_r', '\\pi_r'],
    ['mathsf{Verify}(C_f,r,v,pi_r)=1', '\\mathsf{Verify}(C_f,r,v,\\pi_r)=1'],
    ['mathcal F_{mathrm{PSI}}', '\\mathcal F_{\\mathrm{PSI}}'],
    ['mathcal F_{mathrm{PSI\t' + 'ext{-}CA}}', '\\mathcal F_{\\mathrm{PSI\\text{-}CA}}'],
    ['|mathcal C|', '|\\mathcal C|'],
    ['1/|mathcal C|', '1/|\\mathcal C|'],
    ['alpha', '\\alpha']
  ]);
  document.querySelectorAll('[data-tex]').forEach(function (element) {
    const source = texCorrections.get(element.dataset.tex) || element.dataset.tex;
    if (source !== element.dataset.tex) element.dataset.tex = source;
    katex.render(source, element, {
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
