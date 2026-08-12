const path = require('path');
const http = require('http');
const fs = require('fs');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..', '..');
const ports = { value: 41739 };
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2'
};

function cleanPath(url) {
  const requestPath = decodeURIComponent(new URL(url, 'http://localhost').pathname);
  const normalized = path.normalize(requestPath.replace(/^\/+/, ''));
  const absolute = path.resolve(root, normalized || 'index.html');
  return absolute.startsWith(root) ? absolute : null;
}

const server = http.createServer((request, response) => {
  let file = cleanPath(request.url);
  if (!file) {
    response.writeHead(403).end('Forbidden');
    return;
  }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  fs.readFile(file, (error, data) => {
    if (error) {
      response.writeHead(404).end('Not found');
      return;
    }
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    response.end(data);
  });
});

(async () => {
  await new Promise(resolve => server.listen(ports.value, '127.0.0.1', resolve));
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const pages = fs.readdirSync(path.join(root, 'posts'))
    .filter(file => file.endsWith('.html'))
    .map(file => 'posts/' + file);
  const selectedPages = process.env.CHECK_PAGES
    ? pages.filter(file => process.env.CHECK_PAGES.split(',').some(name => file.includes(name.trim())))
    : pages;
  const allViewports = [{ width: 360, height: 800 }, { width: 768, height: 900 }, { width: 1440, height: 1000 }];
  const viewports = process.env.CHECK_WIDTH
    ? allViewports.filter(viewport => viewport.width === Number(process.env.CHECK_WIDTH))
    : allViewports;
  const failures = [];
  let checks = 0;

  for (const file of selectedPages) {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport });
      const errors = [];
      page.on('pageerror', error => errors.push('pageerror: ' + error.message));
      page.on('console', message => {
        if (message.type() === 'error' && !/ERR_NETWORK_ACCESS_DENIED/.test(message.text())) {
          errors.push('console: ' + message.text());
        }
      });
      const response = await page.goto(`http://127.0.0.1:${ports.value}/${file}`, { waitUntil: 'load' });
      await page.waitForTimeout(80);
      const result = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        const article = document.querySelector('.article-content');
        const overflow = Math.max(root.scrollWidth, body ? body.scrollWidth : 0) - root.clientWidth;
        const brokenMath = Array.from(document.querySelectorAll('[data-tex]')).filter(el => !el.querySelector('.katex')).length;
        const offenders = Array.from(document.querySelectorAll('body *'))
          .map(el => ({
            tag: el.tagName.toLowerCase(),
            cls: el.className && typeof el.className === 'string' ? el.className : '',
            width: Math.round(el.getBoundingClientRect().width),
            scroll: el.scrollWidth
          }))
          .filter(item => item.width > root.clientWidth + 1 || item.scroll > root.clientWidth + 1)
          .sort((a, b) => Math.max(b.width, b.scroll) - Math.max(a.width, a.scroll))
          .slice(0, 8);
        return {
          title: document.title,
          overflow,
          brokenMath,
          hasContract: Boolean(document.querySelector('.learning-contract')),
          hasReview: Boolean(Array.from(document.querySelectorAll('h2,h3')).find(h => /复习|自测|思考题|检查理解/.test(h.textContent || ''))),
          standard: article ? article.dataset.learningStandard || '' : ''
          ,offenders
        };
      });
      if (process.env.SCREENSHOT_DIR) {
        fs.mkdirSync(process.env.SCREENSHOT_DIR, { recursive: true });
        await page.screenshot({
          path: path.join(process.env.SCREENSHOT_DIR, path.basename(file, '.html') + '-' + viewport.width + '.png'),
          fullPage: false
        });
      }
      checks += 1;
      if (!response || !response.ok()) errors.push('http: ' + (response ? response.status() : 'no response'));
      if (result.overflow > 1) errors.push('overflow: ' + result.overflow + 'px');
      if (result.brokenMath) errors.push('unrendered math: ' + result.brokenMath);
      if (errors.length) failures.push({ file, viewport, result, errors });
      await page.close();
    }
  }

  console.log(JSON.stringify({ pages: selectedPages.length, checks, failures }, null, 2));
  await browser.close();
  server.close();
  process.exitCode = failures.length ? 1 : 0;
})().catch(error => {
  console.error(error);
  server.close();
  process.exitCode = 1;
});
