(function () {
  function escapeHTML(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function postFileName(file) {
    return String(file).split('/').pop();
  }

  function renderLearningNav(nav) {
    const postId = Number(nav.dataset.postId);
    const lessons = (window.posts || [])
      .filter(post => Number.isInteger(post.learningOrder))
      .sort((a, b) => a.learningOrder - b.learningOrder);
    const currentIndex = lessons.findIndex(post => post.id === postId);

    if (currentIndex < 0) return;

    const previous = lessons[currentIndex - 1];
    const next = lessons[currentIndex + 1];
    const currentNumber = String(currentIndex + 1).padStart(2, '0');
    const total = String(lessons.length).padStart(2, '0');

    const previousHTML = previous
      ? `<a class="lesson-link" href="${escapeHTML(postFileName(previous.file))}">← 上一课：${escapeHTML(previous.learningLabel)}</a>`
      : '<span class="lesson-link">学习起点</span>';
    const nextHTML = next
      ? `<a class="lesson-link" href="${escapeHTML(postFileName(next.file))}">下一课：${escapeHTML(next.learningLabel)} →</a>`
      : '<span class="lesson-link">当前路线终点</span>';

    nav.innerHTML = `
      <span class="lesson-position">LEARNING PATH · ${currentNumber} / ${total}</span>
      <div class="lesson-links">
        ${previousHTML}
        <span class="lesson-separator">·</span>
        ${nextHTML}
      </div>
    `;
    nav.hidden = false;
  }

  function renderSeriesNav(nav) {
    const postId = Number(nav.dataset.postId);
    const series = nav.dataset.series;
    const lessons = (window.posts || [])
      .filter(post => post.series === series && Number.isInteger(post.seriesOrder))
      .sort((a, b) => a.seriesOrder - b.seriesOrder);
    const currentIndex = lessons.findIndex(post => post.id === postId);

    if (currentIndex < 0) return;

    const previous = lessons[currentIndex - 1];
    const next = lessons[currentIndex + 1];
    const currentNumber = String(currentIndex + 1).padStart(2, '0');
    const total = String(lessons.length).padStart(2, '0');
    const previousHTML = previous
      ? `<a class="lesson-link" href="${escapeHTML(postFileName(previous.file))}">← 上一篇：${escapeHTML(previous.seriesLabel)}</a>`
      : '<span class="lesson-link">专题起点</span>';
    const nextHTML = next
      ? `<a class="lesson-link" href="${escapeHTML(postFileName(next.file))}">下一篇：${escapeHTML(next.seriesLabel)} →</a>`
      : '<span class="lesson-link">专题终点</span>';

    nav.innerHTML = `
      <span class="lesson-position">CLASSICAL CRYPTO · ${currentNumber} / ${total}</span>
      <div class="lesson-links">
        ${previousHTML}
        <span class="lesson-separator">·</span>
        ${nextHTML}
      </div>
    `;
    nav.hidden = false;
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-learning-nav]').forEach(renderLearningNav);
    document.querySelectorAll('[data-series-nav]').forEach(renderSeriesNav);
  });
})();
