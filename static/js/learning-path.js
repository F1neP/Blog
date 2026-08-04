(function () {
  /**
   * Escape user-visible text before inserting it into innerHTML.
   */
  function escapeHTML(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  /**
   * Convert:
   *   posts/gkr-protocol-notes.html
   * into:
   *   gkr-protocol-notes.html
   *
   * Article pages are already inside posts/, so navigation only needs
   * the basename rather than the full posts/... path.
   */
  function postFileName(file) {
    return String(file).split('/').pop();
  }

  /**
   * Find one post by its numeric ID.
   */
  function findPost(postId) {
    return (window.posts || []).find(
      post => Number(post.id) === Number(postId)
    );
  }

  /**
   * Return metadata for one learning track.
   *
   * posts-data.js defines:
   *
   * window.learningTracks = {
   *   "proof-systems": {
   *     label: "证明系统与零知识证明",
   *     order: 1
   *   },
   *   "mpc": {
   *     label: "秘密共享与安全多方计算",
   *     order: 2
   *   }
   * };
   */
  function getLearningTrack(trackId) {
    if (!trackId) return null;

    const tracks = window.learningTracks || {};
    return tracks[trackId] || null;
  }

  /**
   * Render the previous / next navigation for one learning path.
   *
   * Important:
   * learningOrder is only meaningful inside the same learningTrack.
   *
   * Therefore we first locate the current post, read its learningTrack,
   * and then filter all lessons to that track before sorting.
   */
  function renderLearningNav(nav) {
    const postId = Number(nav.dataset.postId);

    if (!Number.isInteger(postId)) return;

    const currentPost = findPost(postId);

    if (!currentPost) return;

    const trackId = currentPost.learningTrack;

    /**
     * Articles without learningTrack are ordinary posts rather than
     * members of a formal learning path.
     */
    if (!trackId) return;

    const lessons = (window.posts || [])
      .filter(post =>
        post.learningTrack === trackId &&
        Number.isInteger(post.learningOrder)
      )
      .sort((a, b) => a.learningOrder - b.learningOrder);

    const currentIndex = lessons.findIndex(
      post => Number(post.id) === postId
    );

    if (currentIndex < 0) return;

    const previous = lessons[currentIndex - 1];
    const next = lessons[currentIndex + 1];

    const currentNumber = String(currentIndex + 1).padStart(2, '0');
    const total = String(lessons.length).padStart(2, '0');

    const track = getLearningTrack(trackId);
    const trackLabel = track && track.label
      ? track.label
      : trackId;

    const previousHTML = previous
      ? `
        <a
          class="lesson-link"
          href="${escapeHTML(postFileName(previous.file))}"
        >
          ← 上一课：${escapeHTML(
            previous.learningLabel || previous.title
          )}
        </a>
      `
      : '<span class="lesson-link">学习起点</span>';

    const nextHTML = next
      ? `
        <a
          class="lesson-link"
          href="${escapeHTML(postFileName(next.file))}"
        >
          下一课：${escapeHTML(
            next.learningLabel || next.title
          )} →
        </a>
      `
      : '<span class="lesson-link">当前路线终点</span>';

    nav.innerHTML = `
      <span class="lesson-position">
        LEARNING PATH ·
        ${escapeHTML(trackLabel)}
        · ${currentNumber} / ${total}
      </span>

      <div class="lesson-links">
        ${previousHTML}

        <span
          class="lesson-separator"
          aria-hidden="true"
        >
          ·
        </span>

        ${nextHTML}
      </div>
    `;

    nav.hidden = false;
  }

  /**
   * Render navigation for an independent article series.
   *
   * This remains separate from learningTrack.
   *
   * Example:
   *   DES → AES → ...
   *
   * Series navigation continues to use:
   *   series
   *   seriesOrder
   *   seriesLabel
   */
  function renderSeriesNav(nav) {
    const postId = Number(nav.dataset.postId);
    const series = nav.dataset.series;

    if (!Number.isInteger(postId) || !series) return;

    const lessons = (window.posts || [])
      .filter(post =>
        post.series === series &&
        Number.isInteger(post.seriesOrder)
      )
      .sort((a, b) => a.seriesOrder - b.seriesOrder);

    const currentIndex = lessons.findIndex(
      post => Number(post.id) === postId
    );

    if (currentIndex < 0) return;

    const previous = lessons[currentIndex - 1];
    const next = lessons[currentIndex + 1];

    const currentNumber = String(currentIndex + 1).padStart(2, '0');
    const total = String(lessons.length).padStart(2, '0');

    const previousHTML = previous
      ? `
        <a
          class="lesson-link"
          href="${escapeHTML(postFileName(previous.file))}"
        >
          ← 上一篇：${escapeHTML(
            previous.seriesLabel || previous.title
          )}
        </a>
      `
      : '<span class="lesson-link">专题起点</span>';

    const nextHTML = next
      ? `
        <a
          class="lesson-link"
          href="${escapeHTML(postFileName(next.file))}"
        >
          下一篇：${escapeHTML(
            next.seriesLabel || next.title
          )} →
        </a>
      `
      : '<span class="lesson-link">专题终点</span>';

    nav.innerHTML = `
      <span class="lesson-position">
        CLASSICAL CRYPTO · ${currentNumber} / ${total}
      </span>

      <div class="lesson-links">
        ${previousHTML}

        <span
          class="lesson-separator"
          aria-hidden="true"
        >
          ·
        </span>

        ${nextHTML}
      </div>
    `;

    nav.hidden = false;
  }

  /**
   * Initialize navigation after posts-data.js has been loaded.
   *
   * Required script order in each article:
   *
   *   posts-data.js
   *   learning-path.js
   */
  document.addEventListener('DOMContentLoaded', function () {
    document
      .querySelectorAll('[data-learning-nav]')
      .forEach(renderLearningNav);

    document
      .querySelectorAll('[data-series-nav]')
      .forEach(renderSeriesNav);
  });
})();