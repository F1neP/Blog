(function () {
  'use strict';

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderMath(node, tex, displayMode) {
    node.setAttribute('data-tex', tex);
    if (window.katex && typeof window.katex.render === 'function') {
      try {
        window.katex.render(tex, node, {
          displayMode: displayMode !== false,
          throwOnError: false,
          strict: false
        });
      } catch (_) {
        node.textContent = tex;
      }
    } else {
      node.textContent = tex;
    }
  }

  function renderRichText(node, value) {
    const source = String(value == null ? '' : value);
    const pattern = /\[\[([\s\S]*?)\]\]/g;
    let cursor = 0;
    let match;

    while ((match = pattern.exec(source)) !== null) {
      if (match.index > cursor) {
        node.appendChild(document.createTextNode(source.slice(cursor, match.index)));
      }
      const math = el('span', 'formal-inline-math');
      renderMath(math, match[1], false);
      node.appendChild(math);
      cursor = pattern.lastIndex;
    }

    if (cursor < source.length) {
      node.appendChild(document.createTextNode(source.slice(cursor)));
    }
  }

  function renderDefinition(item) {
    const row = el('div', 'formal-definition-row');
    row.appendChild(el('div', 'formal-definition-label', item.label));
    const body = el('div', 'formal-definition-body');
    if (item.tex) {
      const math = el('div', 'formal-definition-math');
      renderMath(math, item.tex, true);
      body.appendChild(math);
    }
    if (item.text) body.appendChild(el('span', 'formal-definition-note', item.text));
    row.appendChild(body);
    return row;
  }

  function renderTable(rows) {
    const wrap = el('div', 'formal-table-wrap');
    const table = el('table', 'formal-table');
    const head = document.createElement('thead');
    const headRow = document.createElement('tr');
    ['阶段', '发送方/执行方', '接收方', '发送内容或本地计算', '公开信息', '秘密状态', '验证目标/接受条件'].forEach(function (label) {
      headRow.appendChild(el('th', '', label));
    });
    head.appendChild(headRow);
    table.appendChild(head);

    const body = document.createElement('tbody');
    rows.forEach(function (row) {
      const tr = document.createElement('tr');
      const values = [row.phase, row.from, row.to, row.message, row.public, row.secret, row.check];
      values.forEach(function (value, index) {
        const cell = el('td', index === 1 || index === 2 ? 'formal-route' : '');
        renderRichText(cell, value);
        tr.appendChild(cell);
      });
      body.appendChild(tr);
    });
    table.appendChild(body);
    wrap.appendChild(table);
    return wrap;
  }

  function renderSequence(steps) {
    if (!steps || !steps.length) return null;
    const disclosure = el('details', 'formal-sequence-details');
    disclosure.appendChild(el('summary', '', '展开详细消息序列图'));
    const sequence = el('div', 'formal-sequence');
    steps.forEach(function (step) {
      const row = el('div', 'formal-sequence-step');
      row.appendChild(el('div', 'formal-party', step.from));
      row.appendChild(el('div', 'formal-arrow', step.from === step.to ? '↻' : '→'));
      row.appendChild(el('div', 'formal-party', step.to));
      const message = el('div', 'formal-message');
      message.appendChild(el('strong', '', step.label));
      if (step.note) message.appendChild(el('span', '', step.note));
      row.appendChild(message);
      sequence.appendChild(row);
    });
    disclosure.appendChild(sequence);
    return disclosure;
  }

  function renderCard(spec) {
    const card = el('section', 'formal-card');
    card.appendChild(el('h3', '', spec.title));
    if (spec.note) card.appendChild(el('p', 'formal-card-note', spec.note));
    const definitions = el('div', 'formal-definition');
    spec.definitions.forEach(function (item) { definitions.appendChild(renderDefinition(item)); });
    card.appendChild(definitions);
    card.appendChild(renderTable(spec.rows));
    const sequence = renderSequence(spec.sequence);
    if (sequence) card.appendChild(sequence);
    return card;
  }

  function addTocLink(article) {
    const toc = article.querySelector('.note-toc ol, .sc-toc ol, .gkr-toc ol, .pc-toc ol, nav ol');
    if (!toc || toc.querySelector('a[href="#formal-spec"]')) return;
    const li = document.createElement('li');
    const a = el('a', '', '形式化定义与消息表');
    a.href = '#formal-spec';
    li.appendChild(a);
    const finalItem = Array.from(toc.children).find(function (item) {
      return /最终记忆|速记总结|一句话总结/.test(item.textContent || '');
    });
    toc.insertBefore(li, finalItem || null);
  }

  function mount() {
    const slug = window.location.pathname.split('/').pop() || '';
    const page = window.FORMAL_PROTOCOLS && window.FORMAL_PROTOCOLS[slug];
    if (!page) return;
    const article = document.querySelector('.article-content');
    if (!article || document.getElementById('formal-spec')) return;

    const section = el('section', 'formal-spec');
    section.id = 'formal-spec';
    section.appendChild(el('h2', '', page.heading || '形式化定义、公开/秘密状态与消息流'));
    section.appendChild(el('p', 'formal-spec-intro', page.intro));
    page.specs.forEach(function (spec) {
      const renderedSpec = page.hideSequence ? Object.assign({}, spec, { sequence: [] }) : spec;
      section.appendChild(renderCard(renderedSpec));
    });

    const finalHeading = Array.from(article.querySelectorAll('h2')).find(function (heading) {
      return /最终记忆|速记总结/.test(heading.textContent || '');
    });
    const summaryBlock = article.querySelector('blockquote#summary') || Array.from(article.querySelectorAll('blockquote')).find(function (block) {
      return /一句话总结/.test(block.textContent || '');
    });
    const references = article.querySelector('.references');
    const insertionPoint = finalHeading || summaryBlock || references;
    if (insertionPoint) article.insertBefore(section, insertionPoint);
    else article.appendChild(section);
    addTocLink(article);
    if (window.location.hash === '#formal-spec') {
      window.requestAnimationFrame(function () { section.scrollIntoView({ block: 'start' }); });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
