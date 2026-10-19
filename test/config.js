// percorsi per i test: Chrome installato e file della demo. Si cambiano con le variabili d'ambiente.
const path = require('path'), { pathToFileURL } = require('url'), fs = require('fs');
const CANDIDATI = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
].filter(Boolean);
const CHROME = CANDIDATI.find(p => fs.existsSync(p));
if (!CHROME) throw new Error('Chrome non trovato: impostate CHROME_PATH con il percorso dell\'eseguibile.');
const URL_DEMO = process.env.URL_DEMO || pathToFileURL(path.join(__dirname, '..', 'progesi.html')).href;
fs.mkdirSync(path.join(__dirname, 'shots'), { recursive: true });
module.exports = { CHROME, URL_DEMO };
