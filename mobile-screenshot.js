const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  
  const devices = [
    { name: 'iPhone-SE', width: 375, height: 667 },
    { name: 'iPhone-14', width: 390, height: 844 },
    { name: 'Pixel-7', width: 412, height: 915 }
  ];
  
  for (const device of devices) {
    const page = await browser.newPage();
    await page.setViewport({ width: device.width, height: device.height, deviceScaleFactor: 2, isMobile: true });
    await page.goto('http://localhost:8888/index.html', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `mobile-${device.name}.png`, fullPage: true });
    console.log(`Screenshot ${device.name} done`);
    await page.close();
  }
  
  await browser.close();
})();
