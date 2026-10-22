// giro di prova del gestionale, seguendo i riquadri "Prova" come chi presenta
const puppeteer = require('puppeteer-core');
const { CHROME, URL_DEMO } = require('./config');

(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const p = await b.newPage(); const errs = [], logs = [], esiti = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { logs.push(m.text()); if (m.type() === 'error' || m.type() === 'assert') errs.push(m.text()); });
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto(process.argv[2] || URL_DEMO, { waitUntil: 'networkidle0' }); await p.evaluate(() => document.fonts.ready);
  const pausa = ms => new Promise(r => setTimeout(r, ms));
  const nb = t => t.replace(/\u00a0|\u202f/g, ' ');
  const clic = async (sel, testo) => { try { await p.evaluate((sel, testo) => { const l = [...document.querySelectorAll(sel)].filter(e => !testo || e.textContent.includes(testo)); if (!l.length) throw new Error(`non trovo ${sel} ${testo || ''}`); l[0].click(); }, sel, testo); } catch (e) { esiti.push('NO  CLIC ' + e.message.split(' at ')[0]); } await pausa(350); };
  const vista = async () => nb(await p.evaluate(() => document.querySelector('#vista').innerText));
  const toast = async () => nb(await p.evaluate(() => document.querySelector('#toast-t').textContent));
  const prova = async () => nb(await p.evaluate(() => document.querySelector('#vista p.text-ambra')?.innerText || ''));
  const ok = (n, c, d = '') => esiti.push(`${c ? 'OK ' : 'NO '} ${n}${d ? ' :: ' + d : ''}`);
  const nav = t => clic('#nav .nav-i', t), ruolo = r => clic(`#profilo-menu [data-a="ruolo"][data-v="${r}"]`);
  const sub = (sel, f) => p.evaluate((sel, f) => { const x = document.querySelector(sel); for (const [k, v] of Object.entries(f)) x.querySelector(`[name="${k}"]`).value = v; x.requestSubmit(); }, sel, f).then(() => pausa(300));

  ok('console 44/44', logs.some(l => l.includes('44/44')));
  ok('home: prova', (await prova()).includes('Tecnico')); ok('home: 96.400', (await vista()).includes('96.400 €'));
  await clic('[data-a="dettaglio"][data-v="fatt"]'); ok('home: dettaglio', !!(await p.evaluate(() => document.querySelector('#modale-t')))); await clic('#modale [data-a="chiudi-modale"]');
  await ruolo('tec'); ok('tecnico: prova', (await prova()).includes('Cascina Rosa'));
  await clic('[data-a="chiudi-apri"][data-v="5"]'); ok('tecnico: 6 ore e documento', await p.evaluate(() => document.querySelector('#ore-5').value === '6' && document.querySelector('#doc-5').textContent.includes('Cascina Rosa')));
  await clic('[data-a="chiudi"]'); ok('tecnico: chiuso', (await toast()).includes('Chiuso con 6 ore')); ok('tecnico: un lavoro aperto', (await vista()).includes('Hai un lavoro aperto'));
  await ruolo('dir'); await nav('Prezzi e margini'); const v1 = await vista();
  ok('margini: chiuso adesso, 9%, 1.650', v1.includes('chiuso adesso') && /oltre 30 dipendenti questo servizio rende il 9%/.test(v1) && v1.includes('1.650 €'));
  await nav('Preventivi e ordini'); ok('ordini: prova Trafilerie', (await prova()).includes('Trafilerie Adda')); ok('ordini: Usa 1.650', (await vista()).includes('Usa 1.650 €'));
  await clic('[data-a="prev-giusto"]'); await clic('[data-a="prev-anteprima"]'); await clic('#modale [data-a="prev-invia"]'); ok('ordini: P-048 inviato', (await toast()).includes('P-2026-048'));
  await clic('[data-a="fattura"][data-v="5"]'); ok('ordini: FT 432', (await toast()).includes('FT 432'));
  await nav('Contratti ricorrenti'); ok('contratti: Proponi 2.400', (await vista()).includes('Proponi 2.400 €'));
  await clic('[data-a="proponi"]'); await clic('[data-a="esito"]', 'Accettata'); ok('contratti: accettata', (await toast()).includes('ha accettato'));
  await nav('Clienti'); ok('clienti: prova Salumificio', (await prova()).includes('Salumificio Crotti'));
  await clic('[data-a="cli-filtro"][data-v="potenziale"]'); await clic('#lista-cli [data-a="cliente"]', 'Salumificio');
  await sub('form[data-form="nota"]', { testo: 'Sopralluogo fissato.' }); ok('clienti: telefonata', (await vista()).includes('Sopralluogo fissato.'));
  await sub('form[data-form="prom"]', { testo: 'Richiamare per il preventivo' }); ok('clienti: promemoria', (await vista()).includes('Richiamare per il preventivo'));
  await nav('Trattative'); await clic('[data-a="prepara"][data-v="22|haccp|1"]'); ok('trattative: DVR e HACCP', await p.evaluate(() => S.prev.righe.map(r => r.serv).join('+')) === 'dvr+haccp');
  await clic('[data-a="prev-invia"]'); ok('trattative: P-049', (await toast()).includes('P-2026-049'));
  await ruolo('rt'); await nav('Pianificazione'); ok('resp. tecnico: Pianificazione', (await vista()).startsWith('Pianificazione'));
  await clic('[data-a="assegna-apri"]'); await p.evaluate(() => { const f = document.querySelector('form[data-form="assegna"]'); f.querySelector('[value="Sara"]').checked = true; f.querySelector('[name="data"]').selectedIndex = 2; f.requestSubmit(); }); await pausa(300);
  ok('pianificazione: Sara', (await toast()).includes('Sara'));
  await nav('Preventivi e ordini'); ok('ordini rt: prova Carpenteria', (await prova()).includes('Carpenteria Oglio'));
  await p.evaluate(() => { const t = document.querySelector('.tess[data-id="4"]'), c = document.querySelector('.col-k[data-stato="assegnato"]'), dt = new DataTransfer(); t.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer: dt })); c.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer: dt })); c.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer: dt })); }); await pausa(300);
  ok('ordini rt: trascinando si apre l\'assegnazione', (await p.evaluate(() => document.querySelector('#modale-t')?.textContent)) === 'Assegna il lavoro'); await p.evaluate(() => document.querySelector('form[data-form="assegna"]').requestSubmit()); await pausa(300);
  await ruolo('amm'); ok('amministrazione: si apre Contabilità', (await vista()).startsWith('Contabilità')); await nav('Incassi');
  await clic('[data-a="carica"]'); await pausa(1700); ok('incassi: abbinati', (await toast()).includes('4 abbinati da soli'));
  await clic('[data-a="inc"][data-v="426|ok"]'); ok('incassi: FT 426', (await toast()).includes('FT 426 incassata'));
  await nav('Ore e timbrature'); await clic('[data-a="ore-esempio"]'); await clic('[data-a="ore-ok"]'); ok('ore: 2 righe', (await vista()).includes('2 righe da guardare invece di 6'));
  await ruolo('dir'); await nav('Controllo di gestione'); ok('home: 97.300 dopo la fattura', (await vista()).includes('97.300 €'));
  // la sala vede lo stesso stato
  await clic('header [data-a="modo"][data-v="sala"]'); const ids = await p.evaluate(() => SALA.decisioni().map(d => d.id));
  ok('sala: niente decisioni già prese nel gestionale', !ids.some(id => ['prev-traf', 'rich-1', 'rinn-1', 'pian-3', 'pian-4', 'inc-estratto', 'inc-dub-426', 'ore-file'].includes(id)), ids.join(','));
  ok('sala: il diario racconta il giro', await p.evaluate(() => ['P-2026-048', 'FT 432', 'FT 426'].every(t => SALA.stato.feed.some(f => f.txt.includes(t)))));
  await clic('header [data-a="modo"][data-v="gestionale"]'); ok('ritorno al gestionale nella stessa pagina', (await p.evaluate(() => document.querySelector('#titolo').textContent)) === 'Controllo di gestione');
  await p.setViewport({ width: 390, height: 844 }); await ruolo('tec'); ok('telefono: largo 390', await p.evaluate(() => document.documentElement.scrollWidth) <= 390);
  console.log(esiti.join('\n')); console.log('ERRORI:', errs.length ? errs : 'nessuno');
  await b.close();
})();
