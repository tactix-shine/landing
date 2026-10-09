// Run: node check.cjs. Requires Playwright and an installed Google Chrome.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const pages = ['index.html', 'ndis-cleaning/index.html', 'house-cleaning/index.html', 'end-of-lease-cleaning/index.html', 'gallery/index.html'];

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('requestfailed', request => { if (request.failure()?.errorText !== 'net::ERR_ABORTED') errors.push(request.failure()?.errorText + ': ' + request.url()); });
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const titles = new Set(), descriptions = new Set(), layoutFailures = [];

    for (const file of pages) {
      const abs = path.join(__dirname, file);
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(pathToFileURL(abs).href);
      await page.evaluate(() => document.fonts.ready);
      const seo = await page.evaluate(() => ({
        h1: document.querySelectorAll('h1').length,
        title: document.title,
        description: document.querySelector('meta[name=description]')?.content || '',
        canonical: document.querySelector('link[rel=canonical]')?.href || '',
        ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
        jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent),
        missingAlt: [...document.images].filter(img => !img.hasAttribute('alt')).map(img => img.src),
        hashOk: [...document.querySelectorAll('a[href^="#"]')].every(a => document.getElementById(a.hash.slice(1))),
        links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => !/^(#|tel:|mailto:|https?:)/.test(h)),
      }));
      assert.equal(seo.h1, 1, `${file}: one h1`);
      assert.ok(seo.title.length >= 30 && seo.title.length <= 60, `${file}: title length ${seo.title.length}`);
      assert.ok(seo.description.length >= 120 && seo.description.length <= 160, `${file}: description length ${seo.description.length}`);
      assert.match(seo.canonical, /^https:\/\/tactixshine\.au\//, `${file}: canonical`);
      assert.ok(seo.ogImage.startsWith('https://'), `${file}: og:image`);
      assert.ok(seo.jsonld.length > 0, `${file}: JSON-LD present`);
      seo.jsonld.forEach(text => JSON.parse(text));
      assert.deepEqual(seo.missingAlt, [], `${file}: images without alt`);
      assert.ok(seo.hashOk, `${file}: in-page links resolve`);
      for (const href of seo.links) {
        const target = path.resolve(path.dirname(abs), href.split('#')[0]);
        assert.ok(fs.existsSync(target.endsWith('/') || !path.extname(target) ? path.join(target, 'index.html') : target), `${file}: broken link ${href}`);
      }
      assert.ok(!titles.has(seo.title) && !descriptions.has(seo.description), `${file}: duplicate title or description`);
      titles.add(seo.title); descriptions.add(seo.description);
      await page.evaluate(() => Promise.all([...document.images].filter(image => image.loading !== 'lazy' && image.getAttribute('src')).map(image => image.decode())));
      const captions = await page.locator('.gallery-list figcaption').evaluateAll(items => items.map(item => ({ text: item.textContent.trim(), width: item.getBoundingClientRect().width, height: item.getBoundingClientRect().height })));
      assert.equal(captions.length, await page.locator('.gallery-list img').count(), `${file}: each job image retains a caption`);
      assert.ok(captions.every(caption => caption.text && caption.width <= 1 && caption.height <= 1), `${file}: captions stay visually hidden`);
      assert.equal(await page.locator('script[src], .gallery-list a, dialog').count(), 0, `${file}: static photos without viewer scripts or links`);

      for (const width of [320, 390, 768, 769, 1024, 1199, 1200, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        const geometry = await page.evaluate(() => ({
          document: document.documentElement.scrollWidth,
          overflow: [...document.querySelectorAll('h1,h1 span,h2,h3,p,li,nav,.button,.contact-method')].filter(el => {
            const rect = el.getBoundingClientRect();
            return rect.right > innerWidth + 1 || rect.left < -1 || el.scrollWidth > el.clientWidth + 1;
          }).map(el => ({ element: el.className || el.tagName, text: el.textContent.slice(0, 70) })),
        }));
        if (geometry.document > width || geometry.overflow.length) layoutFailures.push({ file, width, geometry });

      }
      await page.setViewportSize({ width: 390, height: 844 });
      const menu = page.locator('.mobile-nav');
      assert.equal(await menu.evaluate(details => details.open), false, `${file}: mobile navigation starts collapsed`);
      assert.ok(await page.locator('.site-header').evaluate(header => header.getBoundingClientRect().height <= 80), `${file}: compact phone header`);
      await menu.locator('summary').focus();
      await page.keyboard.press('Enter');
      assert.equal(await menu.evaluate(details => details.open), true, `${file}: menu opens with keyboard`);
      for (const link of await menu.locator('a').all()) {
        assert.ok(await link.isVisible(), `${file}: mobile navigation link visible when open`);
        assert.ok(await link.evaluate(a => a.getBoundingClientRect().height >= 48), `${file}: menu tap target`);
      }
      await page.setViewportSize({ width: 320, height: 844 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${file}: open menu fits narrow phone`);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'NDIS cleaning', `${file}: keyboard reaches first menu link`);
      await menu.locator('summary').click();
      assert.equal(await menu.evaluate(details => details.open), false, `${file}: menu closes`);
      console.log(`Checked ${file}`);
    }
    assert.deepEqual(layoutFailures, [], JSON.stringify(layoutFailures, null, 2));

    for (const [file, name] of [['index.html', 'home'], ['ndis-cleaning/index.html', 'ndis'], ['gallery/index.html', 'gallery'], ['house-cleaning/index.html', 'house'], ['end-of-lease-cleaning/index.html', 'end-of-lease']]) {
      await page.goto(pathToFileURL(path.join(__dirname, file)).href);
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => { for (const img of document.querySelectorAll('img[src]')) { img.loading = 'eager'; await img.decode().catch(() => {}); } });
      await page.screenshot({ path: path.join(__dirname, `previews/${name}-desktop-full.png`), fullPage: true });
      if (name === 'home') await page.screenshot({ path: path.join(__dirname, 'previews/home-desktop.png') });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.reload();
      await page.evaluate(async () => { await document.fonts.ready; for (const img of document.querySelectorAll('img[src]')) { img.loading = 'eager'; await img.decode().catch(() => {}); } });
      await page.screenshot({ path: path.join(__dirname, `previews/${name}-phone-full.png`), fullPage: true });
      if (name === 'home') await page.screenshot({ path: path.join(__dirname, 'previews/home-phone.png') });
    }

    await page.goto(pathToFileURL(path.join(__dirname, 'gallery/index.html')).href);
    for (const [name, width] of [['desktop', 1440], ['phone', 390]]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(async () => { await document.fonts.ready; for (const img of document.querySelectorAll('#bathrooms img')) { img.loading = 'eager'; await img.decode(); } });
      await page.locator('#bathrooms').screenshot({ path: path.join(__dirname, `previews/gallery-feature-${name}.png`) });
    }
    assert.equal(await page.locator('.gallery-list img').count(), 20, 'all original job photos remain visible');
    const photoUrl = page.url();
    await page.locator('.gallery-list img').first().click();
    assert.equal(page.url(), photoUrl, 'clicking a photo stays on the page');
    assert.equal(await page.locator('dialog, .lg-container').count(), 0, 'no photo viewer');

    for (const file of ['index.html', 'gallery/index.html']) {
      const abs = path.join(__dirname, file);
      await page.goto(pathToFileURL(abs).href);
      assert.equal(await page.locator('#brochure img, #brochure iframe, #brochure embed').count(), 0, 'brochure strip has no preview');
      const download = page.locator('.brochure-download');
      assert.equal(await download.getAttribute('download'), 'Tactix-NDIS-cleaning-brochure.pdf');
      const pdf = path.resolve(path.dirname(abs), await download.getAttribute('href'));
      assert.equal(fs.readFileSync(pdf).subarray(0, 5).toString(), '%PDF-', 'brochure download points to a PDF');
    }

    for (const [name, width] of [['desktop', 1440], ['phone', 390]]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(pathToFileURL(path.join(__dirname, 'index.html')).href);
      await page.evaluate(async () => { document.activeElement?.blur(); await document.fonts.ready; for (const img of document.querySelectorAll('img[src]')) { img.loading = 'eager'; await img.decode(); } });
      for (const id of ['our-work', 'brochure']) {
        await page.locator('#' + id).screenshot({ path: path.join(__dirname, `previews/${id}-${name}.png`) });
      }
    }

    await page.goto(pathToFileURL(path.join(__dirname, 'index.html')).href);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Skip to content');
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'main', 'skip link moves keyboard focus to main content');
    for (const file of ['index.html', 'ndis-cleaning/index.html']) {
      await page.goto(pathToFileURL(path.join(__dirname, file)).href);
      const targets = await page.locator('.page-links a').evaluateAll(links => links.map(link => ({ height: link.getBoundingClientRect().height, name: link.textContent.trim() })));
      assert.equal(targets.length, 4, 'four direct links to key information');
      assert.ok(targets.every(target => target.height >= 48 && target.name), 'quick links have named 48px tap targets');
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    assert.deepEqual(errors, []);
    console.log('Five pages checked: SEO, links, image alternatives, 320–1440px reflow, static photos, brochure, keyboard skip link, quick links and reduced motion.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
