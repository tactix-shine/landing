// Run with Node, Playwright and Google Chrome: node check-headers.cjs
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    for (const concept of [1,2,3]) {
      await page.goto(pathToFileURL(path.join(__dirname,'header-design.html')).href+'?concept='+concept);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('.concept:visible').count(),1);
      assert.equal(await page.locator('.concept:visible').getAttribute('data-concept'),String(concept));
      assert.ok(!(await page.locator('.study-header').innerText()).includes('Our approach'));
      assert.ok((await page.locator('h1').innerText()).startsWith('NDIS cleaning.'));
      const links=await page.locator('a[href]').evaluateAll(items=>items.map(a=>a.getAttribute('href')).filter(h=>!h.startsWith('#')&&!h.startsWith('tel:')));
      for(const href of links){const target=href.split('#')[0];assert.ok(fs.existsSync(path.join(__dirname,target.endsWith('/')?target+'index.html':target)),href);}
      for (const width of [320,390,768,769,1024,1200,1440]) {
        await page.setViewportSize({width,height:900});
        const overflow=await page.evaluate(()=>[...document.querySelectorAll('.concept:not([hidden]) a,.concept:not([hidden]) p,h1,.hero-description,.hero-note')].filter(el=>{
          const r=el.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left<0||(!el.classList.contains('brand')&&el.scrollWidth>el.clientWidth+1));
        }).map(el=>el.textContent));
        assert.deepEqual(overflow,[],`Concept ${concept}, width ${width}`);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Document overflow: ${concept}/${width}`);
      }
      for (const [name,width,height] of [['desktop',1440,790],['phone',390,844]]) {
        await page.setViewportSize({width,height});
        await page.reload();await page.evaluate(()=>document.fonts.ready);
        await page.screenshot({path:path.join(__dirname,`previews/header-${concept}-${name}.png`)});
      }
      console.log(`Header ${concept}: links and seven responsive widths passed.`);
    }
    await page.goto(pathToFileURL(path.join(__dirname,'header-options.html')).href);
    await page.setViewportSize({width:1440,height:1240});
    await page.getByRole('button',{name:'Phone',exact:true}).click();
    for(const frame of page.frames().slice(1))assert.equal(await frame.evaluate(()=>innerWidth),390);
    await page.screenshot({path:path.join(__dirname,'previews/header-options-phones.png')});
    await page.getByRole('button',{name:'Desktop',exact:true}).click();
    for(const frame of page.frames().slice(1))assert.equal(await frame.evaluate(()=>innerWidth),1440);
    assert.deepEqual(errors,[]);
    console.log('Desktop/phone comparison controls passed.');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
