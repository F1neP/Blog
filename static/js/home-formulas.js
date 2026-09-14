document.addEventListener('DOMContentLoaded', function () {
  if (!window.katex) return;

  document.querySelectorAll('.hero-orbit [data-tex]').forEach(function (element) {
    katex.render(element.dataset.tex, element, {
      displayMode: false,
      throwOnError: false,
      strict: false
    });
  });
});