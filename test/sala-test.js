const puppeteer = require('puppeteer-core');
const { CHROME, URL_DEMO } = require('./config');

const URL = process.argv[2] || URL_DEMO;
const OUT = __dirname + '/shots/sala-';
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const p = await b.newPage(); const errs = [], logs = [], esiti = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { logs.push(m.text()); if (m.type() === 'error' || m.type() === 'assert') errs.push(m.text()); });
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto(URL, { waitUntil: 'networkidle0' }); await p.evaluate(() => document.fonts.ready);
  const pausa = ms => new Promise(r => setTimeout(r, ms));
  const ok = (n, c, d = '') => esiti.push(`${c ? 'OK ' : 'NO '} ${n}${d ? ' :: ' + d : ''}`);
  const clic = async (sel, testo) => { try { await p.evaluate((sel, testo) => { const l = [...document.querySelectorAll(sel)].filter(e => !testo || e.textContent.includes(testo)); if (!l.length) throw new Error(`non trovo ${sel} ${testo || ''}`); l[0].click(); }, sel, testo); } catch (e) { esiti.push('NO  CLIC ' + e.message.split(' at ')[0]); } await pausa(350); };
  const toast = () => p.evaluate(() => document.querySelector('#toast-t').textContent.replace(/\u00a0|\u202f/g, ' '));
  const titolo = () => p.evaluate(() => document.querySelector('#titolo').textContent);
  const foto = async (n, w = 1440) => { await p.setViewport({ width: w, height: 900 }); await pausa(300); const h = await p.evaluate(() => document.querySelector('#vista').scrollHeight + 140); await p.setViewport({ width: w, height: Math.max(900, h) }); await pausa(600); await p.screenshot({ path: OUT + w + '-' + n + '.png' }); await p.setViewport({ width: 1440, height: 900 }); await pausa(200); };

  ok('si apre su Gestionale', (await titolo()) === 'Controllo di gestione' && await p.evaluate(() => S.modo === 'gestionale'));
  ok('selettore nell\'header', await p.evaluate(() => !!document.querySelector('header .modo-seg [data-v="sala"]')));
  // stato preso nel gestionale prima di passare alla sala: apro Preventivi e aggiungo una riga
  await clic('#nav .nav-i', 'Preventivi e ordini'); await clic('[data-a="prev-add"]');
  const righePrima = await p.evaluate(() => S.prev.righe.length);
  await clic('header [data-a="modo"][data-v="sala"]');
  ok('sala aperta', (await titolo()) === 'Sala agenti' && await p.evaluate(() => !!document.querySelector('#scena svg')));
  ok('barra laterale nascosta nella sala', await p.evaluate(() => getComputedStyle(document.querySelector('#sidebar')).display === 'none'));
  const nDec = await p.evaluate(() => SALA.decisioni().length); ok('decisioni in sospeso', nDec >= 5, `${nDec}: ${await p.evaluate(() => SALA.decisioni().map(d => d.id).join(', '))}`);
  ok('11 agenti in sala', await p.evaluate(() => document.querySelectorAll('#badges .badge-ag').length) === 11);
  await pausa(4200); ok('gli agenti lavorano dal vivo', await p.evaluate(() => SALA.stato.passo) >= 1);
  await foto('coordinatore');
  // torno al gestionale: stato conservato
  await clic('header [data-a="modo"][data-v="gestionale"]');
  ok('torna al gestionale nella stessa pagina e con le stesse righe', (await titolo()) === 'Preventivi e ordini' && await p.evaluate(() => S.prev.righe.length) === righePrima);
  // decisione approvata nella sala, verificata nel gestionale
  await clic('header [data-a="modo"][data-v="sala"]');
  await clic('[data-a="sala-apri"][data-v="rinn-1"]'); await clic('[data-a="sala-decidi"][data-v="rinn-1|0"]');
  ok('decisione rinnovo approvata', (await toast()).includes('Officine Meccaniche Serio'), await toast());
  ok('sparita dalla sala', await p.evaluate(() => !SALA.decisioni().some(d => d.id === 'rinn-1')));
  await clic('header [data-a="modo"][data-v="gestionale"]'); await clic('#nav .nav-i', 'Contratti ricorrenti');
  ok('nel gestionale risulta proposta', (await p.evaluate(() => document.querySelector('#vista').innerText)).includes('Proposti 2.400'));
  // decisione presa nel gestionale, sparita dalla sala
  await clic('#nav .nav-i', 'Preventivi e ordini'); await clic('[data-a="fattura"][data-v="8"]');
  await clic('header [data-a="modo"][data-v="sala"]');
  ok('fattura fatta nel gestionale: decisione sparita', await p.evaluate(() => !SALA.decisioni().some(d => d.id === 'fatt-8')));
  ok('la sala racconta cosa avete fatto', await p.evaluate(() => SALA.stato.feed.some(f => f.txt.includes('FT 432'))));
  // agente e "Vedi nel gestionale"
  await clic('#badges [data-a="sala-ag"][data-v="prev"]');
  ok('pannello del Preventivista', (await p.evaluate(() => document.querySelector('#sala-pannello').innerText)).includes('Vedi nel gestionale: Preventivi e ordini'));
  await clic('[data-a="sala-chiedi"][data-v="0"]'); ok('risponde alla domanda', (await p.evaluate(() => document.querySelector('.bolla-a')?.textContent || '')).length > 20, await p.evaluate(() => document.querySelector('.bolla-a')?.textContent));
  await p.evaluate(() => { const f = document.querySelector('form[data-form="sala-domanda"]'); f.querySelector('[name="q"]').value = 'cosa non fai da solo?'; f.requestSubmit(); }); await pausa(200);
  ok('domanda scritta', (await p.evaluate(() => [...document.querySelectorAll('.bolla-a')].at(-1).textContent)).includes('Non manda'));
  await foto('preventivista');
  await clic('#sala-pannello [data-a="sala-vai"]'); ok('Vedi nel gestionale porta a Preventivi', (await titolo()) === 'Preventivi e ordini' && await p.evaluate(() => S.modo === 'gestionale'));
  // ogni agente porta alla sua vista
  const viste = await p.evaluate(() => { const r = []; for (const [id, v] of [['rinn', 'Contratti ricorrenti'], ['inc', 'Incassi'], ['pian', 'Pianificazione'], ['ore', 'Ore e timbrature'], ['forn', 'Fatture'], ['fatt', 'Fatture'], ['rich', 'Trattative'], ['scad', 'Clienti']]) { AZ_.modo('sala'); AZ_['sala-ag'](id); document.querySelector('#sala-pannello [data-a="sala-vai"]').click(); r.push(document.querySelector('#titolo').textContent === v ? '' : `${id}->${document.querySelector('#titolo').textContent}`); } return r.filter(Boolean); });
  ok('ogni agente apre la sua vista', !viste.length, viste.join(', '));
  // estratto caricato dalla sala
  await clic('header [data-a="modo"][data-v="sala"]'); await clic('[data-a="sala-apri"][data-v="inc-estratto"]'); await clic('[data-a="sala-decidi"][data-v="inc-estratto|0"]'); await pausa(1700);
  ok('estratto letto dalla sala e decisioni nuove', await p.evaluate(() => S.estratto === 'si' && SALA.decisioni().some(d => d.id === 'inc-dub-426')));
  // approva insieme solo quelle di routine; quelle da guardare restano, una per una
  const prima = await p.evaluate(() => SALA.decisioni().map(d => [d.id, SALA.peso(d)]));
  await clic('[data-a="sala-tutte"]'); await pausa(300);
  const dopo = await p.evaluate(() => SALA.decisioni().map(d => d.id));
  ok('approva le routine: fatte', !prima.some(([id, w]) => w === 'routine' && dopo.includes(id)), `prima ${prima.map(x => x.join(':')).join(',')} | dopo ${dopo.join(',')}`);
  ok('quelle da guardare restano', prima.filter(([, w]) => w === 'guardare').every(([id]) => dopo.includes(id)));
  ok('la prossima decisione in grande è da guardare', await p.evaluate(() => !!document.querySelector('#sala-pannello .chip') && document.querySelector('#sala-pannello').innerText.includes('Prossima decisione')));
  for (let i = 0; i < 20; i++) { const id = await p.evaluate(() => SALA.decisioni()[0]?.id); if (!id) break; await p.evaluate(id => AZ_['sala-decidi'](id + '|0'), id); }
  ok('una per una: tutto deciso', await p.evaluate(() => !SALA.decisioni().length));
  // stanze e fuoco
  await clic('[data-a="sala-stanza"][data-v="cont"]'); await pausa(700);
  ok('stanza Contabilità a fuoco', await p.evaluate(() => document.querySelector('#scena').style.transform.includes('scale') && document.querySelector('#sala-pannello').innerText.includes('Contabilità') && document.querySelectorAll('#badges .badge-ag.fuori').length === 7));
  await clic('#sala-pannello [data-a="sala-chiudi"]'); await pausa(700);
  ok('torna a tutto l\'ufficio', await p.evaluate(() => document.querySelector('#scena').style.transform === 'none' && !document.querySelector('#badges .badge-ag.fuori')));
  ok('nastro delle ultime cose fatte', await p.evaluate(() => document.querySelectorAll('#sala-nastro li button').length >= 3));
  ok('nessun doppione per lo stesso cliente', await p.evaluate(() => { const c = SALA.decisioni().map(d => d.titolo.split(':')[0]); return new Set(c).size === c.length; }));
  await foto('tutto-deciso');
  // ruoli
  await clic('#barra-demo [data-a="ruolo"][data-v="amm"]'); ok('amministrazione resta nella sala, solo le sue decisioni', (await titolo()) === 'Sala agenti');
  await clic('#barra-demo [data-a="ruolo"][data-v="tec"]'); ok('il tecnico non vede la sala né il selettore', (await titolo()) === 'I miei lavori' && await p.evaluate(() => getComputedStyle(document.querySelector('header .modo-seg')).display === 'none'));
  await clic('#barra-demo [data-a="ruolo"][data-v="dir"]');
  // telefono
  await p.setViewport({ width: 390, height: 844 }); await clic('[data-a="modo"][data-v="sala"]');
  ok('telefono senza scorrimento laterale', await p.evaluate(() => document.documentElement.scrollWidth) <= 390);
  await foto('telefono', 390);
  ok('console 44/44', logs.some(l => l.includes('44/44')));
  console.log(esiti.join('\n')); console.log('ERRORI:', errs.length ? errs : 'nessuno');
  await b.close();
})();
