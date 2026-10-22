// prova dello zoom libero della Sala agenti: pulsanti, Ctrl + rotella, trascinamento, tastiera, telefono
const puppeteer = require('puppeteer-core');
const { CHROME, URL_DEMO } = require('./config');
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const p = await b.newPage(); const errs = [], esiti = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const ok = (n, c, d = '') => esiti.push(`${c ? 'OK ' : 'NO '} ${n}${d ? ' :: ' + d : ''}`);
  const pausa = ms => new Promise(r => setTimeout(r, ms));
  await p.setViewport({ width: 1440, height: 1000 });
  await p.goto(process.argv[2] || URL_DEMO, { waitUntil: 'networkidle0' }); await p.evaluate(() => document.fonts.ready);
  try {
  await p.evaluate(() => { AZ_.modo('sala'); SALA.stato.pausa = true; }); await pausa(500);
  const cam = () => p.evaluate(() => ({ t: document.querySelector('#scena').style.transform, k: +getComputedStyle(document.querySelector('#scena')).getPropertyValue('--k'), liv: document.querySelector('#zoom-liv').textContent }));
  ok('comandi di zoom sulla scena', await p.evaluate(() => document.querySelectorAll('.zoom-ctrl [data-a="sala-zoom"]').length === 3));
  ok('all\'inizio 100%, meno e tutto spenti', await p.evaluate(() => document.querySelector('#zoom-liv').textContent === '100%' && document.querySelector('[data-v="meno"]').disabled && document.querySelector('[data-v="tutto"]').disabled));
  await p.click('.zoom-ctrl [data-v="piu"]'); await pausa(700); let c = await cam();
  ok('+ avvicina', /scale\(1\.4\)/.test(c.t) && c.liv === '140%', c.t + ' ' + c.liv);
  const sc = await p.evaluate(() => { const r = document.querySelector('.scena-vista').getBoundingClientRect(); return [r.left + r.width * .3, r.top + r.height * .6]; });
  await p.mouse.move(sc[0], sc[1]); await p.keyboard.down('Control'); for (let i = 0; i < 5; i++) { await p.mouse.wheel({ deltaY: -120 }); await pausa(40); } await p.keyboard.up('Control'); await pausa(300); c = await cam();
  ok('Ctrl + rotella avvicina dove punti', c.k > 2.2, `${c.k.toFixed(2)} ${c.t}`);
  const prima = await p.evaluate(() => SALA.stato.cam && { ...SALA.stato.cam });
  await p.mouse.move(sc[0], sc[1]); await p.mouse.down(); await p.mouse.move(sc[0] + 120, sc[1] + 60, { steps: 8 }); await p.mouse.up(); await pausa(200);
  const dopo = await p.evaluate(() => ({ ...SALA.stato.cam, sel: SALA.stato.sel, stanza: SALA.stato.stanza }));
  ok('trascinando ci si sposta, senza aprire niente', dopo.tx !== prima.tx && dopo.ty !== prima.ty && !dopo.sel && !dopo.stanza, JSON.stringify(dopo));
  { const h = await p.evaluate(() => document.querySelector('#badges .badge-ag .nome').getBoundingClientRect().height); ok('nomi degli agenti: crescono poco, restano leggibili', h > 18 && h < 40, h.toFixed(1) + ' px a 400%'); }
  ok('scena senza buchi ai bordi', await p.evaluate(() => { if (!document.querySelector('#scena svg')) return false; const v = document.querySelector('.scena-vista').getBoundingClientRect(), s = document.querySelector('#scena svg').getBoundingClientRect(); return s.left <= v.left + 1 && s.right >= v.right - 1 && s.top <= v.top + 1 && s.bottom >= v.bottom - 1; }));
  await p.screenshot({ path: __dirname + '/shots/zoom-vicino.png' });
  await p.mouse.wheel({ deltaY: -120 }); await pausa(100); ok('rotella senza Ctrl: mostra l\'aiuto, la pagina scorre', await p.evaluate(() => document.querySelector('#zoom-aiuto').classList.contains('vedi')));
  await p.keyboard.press('0'); await pausa(700); c = await cam(); ok('tasto 0: tutto l\'ufficio', c.t === 'none' && c.liv === '100%', c.t);
  await p.keyboard.press('+'); await pausa(700); c = await cam(); ok('tasto +: avvicina', c.liv === '140%');
  await p.click('.zoom-ctrl [data-v="tutto"]'); await pausa(700); c = await cam(); ok('pulsante Tutto l\'ufficio', c.t === 'none');
  await p.evaluate(() => document.querySelector('[data-a="sala-stanza"][data-v="oper"]').click()); await pausa(700); c = await cam();
  ok('stanza a fuoco come prima', /scale\(1\.55\)/.test(c.t) && c.liv === '155%', c.t);
  await p.click('.zoom-ctrl [data-v="piu"]'); await pausa(700); c = await cam(); ok('zoom anche sulla stanza a fuoco', c.liv === '217%', c.liv);
  await p.click('.zoom-ctrl [data-v="tutto"]'); await pausa(700); c = await cam(); ok('tutto l\'ufficio esce anche dal fuoco', c.t === 'none' && await p.evaluate(() => !SALA.stato.stanza));
  // telefono: due dita per lo zoom, da vicino tornano i nomi
  await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true }); await p.waitForFunction(() => typeof AZ_ !== 'undefined' && document.fonts.status === 'loaded'); await p.evaluate(() => { AZ_.modo('sala'); SALA.stato.pausa = true; }); await pausa(500);
  await p.evaluate(() => { const v = document.querySelector('.scena-vista'), r = v.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const ev = (t, id, x, y) => v.dispatchEvent(new PointerEvent(t, { bubbles: true, pointerId: id, pointerType: 'touch', clientX: x, clientY: y, isPrimary: id === 1 }));
    ev('pointerdown', 1, cx - 20, cy); ev('pointerdown', 2, cx + 20, cy); for (let i = 1; i <= 10; i++) { ev('pointermove', 1, cx - 20 - i * 6, cy); ev('pointermove', 2, cx + 20 + i * 6, cy); } ev('pointerup', 1, cx - 80, cy); ev('pointerup', 2, cx + 80, cy); });
  await pausa(300); c = await cam(); ok('telefono: due dita avvicinano', c.k > 2, c.liv);
  ok('telefono: da vicino si leggono i nomi', await p.evaluate(() => document.querySelector('#scena').classList.contains('vicino') && getComputedStyle(document.querySelector('#badges .badge-ag .testo')).display !== 'none'));
  ok('telefono: niente scorrimento laterale', await p.evaluate(() => document.documentElement.scrollWidth <= 390));
  await p.screenshot({ path: __dirname + '/shots/zoom-telefono.png' });
  } catch (e) { esiti.push('NO  ECCEZIONE ' + e.message.slice(0, 160)); }
  console.log(esiti.join('\n')); console.log('ERRORI:', errs.length ? errs : 'nessuno');
  await b.close();
})();
