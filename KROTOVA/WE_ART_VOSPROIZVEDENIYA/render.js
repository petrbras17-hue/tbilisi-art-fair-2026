// node render.js  →  poster.png / poster@2x.png (в jpg конвертируем отдельно: quality 95, 4:4:4)
// Требуется playwright (npm i playwright) и установленный Chromium.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const [scale, name] of [[1, 'poster.png'], [2, 'poster@2x.png']]) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 853 }, deviceScaleFactor: scale });
    await page.goto('file://' + path.join(__dirname, 'poster.html'));
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(process.env.OUT_DIR || __dirname, name) });
    await page.close();
  }
  await browser.close();
})();
