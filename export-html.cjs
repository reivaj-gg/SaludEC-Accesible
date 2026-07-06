const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Iniciando exportación de páginas a HTML...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const routes = [
    { name: 'Home', url: 'http://localhost:5174/' },
    { name: 'Noticias', url: 'http://localhost:5174/noticias' },
    { name: 'Contacto', url: 'http://localhost:5174/contacto' },
    { name: 'Nosotros', url: 'http://localhost:5174/nosotros' },
    { name: 'Login', url: 'http://localhost:5174/admin/login' },
    { name: 'Accesibilidad', url: 'http://localhost:5174/accesibilidad' },
    { name: 'Nutricion', url: 'http://localhost:5174/atencion-primaria' }
  ];

  if (!fs.existsSync('prototipos_html')) {
    fs.mkdirSync('prototipos_html');
  }

  for (const route of routes) {
    console.log(`Exportando ${route.name}...`);
    try {
        await page.goto(route.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        const html = await page.content();
        fs.writeFileSync(`prototipos_html/${route.name}.html`, html);
        console.log(`✅ ${route.name}.html generado.`);
    } catch (e) {
        console.log(`❌ Error con ${route.name}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('¡Todas las páginas exportadas en la carpeta /prototipos_html!');
})();
