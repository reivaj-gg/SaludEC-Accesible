const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Intentando exportar Home...');
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  await page.setBypassServiceWorker(true);
  
  try {
      await page.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  } catch (e) {
      console.log(`(Nota: Goto abortó o dio timeout, intentando extraer de todos modos)`);
  }
  
  try {
      await page.waitForSelector('#root', { timeout: 10000 });
      await new Promise(r => setTimeout(r, 2000));
      
      const html = await page.content();
      if (!fs.existsSync('prototipos_html')) fs.mkdirSync('prototipos_html');
      fs.writeFileSync(`prototipos_html/Home.html`, html);
      console.log(`✅ Home.html generado con éxito.`);
  } catch (e) {
      console.log(`❌ Error al extraer: ${e.message}`);
  }

  await browser.close();
})();
