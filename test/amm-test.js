// prova della parte amministrativa chiesta nella seconda call: niente nome del vecchio gestionale, contabilità, SdI, banca, G1, conformità
const puppeteer = require('puppeteer-core');
const { CHROME, URL_DEMO } = require('./config');

const URL = process.argv[2] || URL_DEMO;
const OUT = __dirname + '/shots/amm-';
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const p = await b.newPage(); const errs = [], logs = [], esiti = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { logs.push(m.text()); if (m.type() === 'error' || m.type() === 'assert') errs.push(m.text()); });
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto(URL, { waitUntil: 'networkidle0' }); await p.evaluate(() => document.fonts.ready);
  const pausa = ms => new Promise(r => setTimeout(r, ms));
  const nb = t => t.replace(/\u00a0|\u202f/g, ' ');
  const ok = (n, c, d = '') => esiti.push(`${c ? 'OK ' : 'NO '} ${n}${d ? ' :: ' + d : ''}`);
  const clic = async (sel, testo) => { try { await p.evaluate((sel, testo) => { const l = [...document.querySelectorAll(sel)].filter(e => !testo || e.textContent.includes(testo)); if (!l.length) throw new Error(`non trovo ${sel} ${testo || ''}`); l[0].click(); }, sel, testo); } catch (e) { esiti.push('NO  CLIC ' + e.message.split(' at ')[0]); } await pausa(300); };
  const vista = async () => nb(await p.evaluate(() => document.querySelector('#vista').innerText));
  const toast = async () => nb(await p.evaluate(() => document.querySelector('#toast-t').textContent));
  const titolo = () => p.evaluate(() => document.querySelector('#titolo').textContent);
  const foto = async (n, w = 1440) => { await p.setViewport({ width: w, height: 900 }); await pausa(250); const h = await p.evaluate(() => document.querySelector('#vista').scrollHeight + 140); await p.setViewport({ width: w, height: Math.max(900, h) }); await pausa(500); const dw = await p.evaluate(() => document.documentElement.scrollWidth); if (dw > w) esiti.push(`NO  ${n} a ${w}px è larga ${dw}`); await p.screenshot({ path: OUT + w + '-' + n + '.png' }); await p.setViewport({ width: 1440, height: 900 }); await pausa(150); };
  const passi = () => p.evaluate(() => PASSI_AMM().map(x => x[1] ? 1 : 0).join(''));

  try {
  ok('console 44/44', logs.some(l => l.includes('44/44')));
  // il cliente vuole staccarsi dal vecchio gestionale: nella pagina, codice compreso, non ne resta il nome
  ok('nessun accenno al vecchio gestionale', !(await p.evaluate(() => /zucchetti|\bG1\b/i.test(document.documentElement.outerHTML))));
  ok('menu: Contabilità, Fatture, Banca, Sicurezza', await p.evaluate(() => ['Contabilità', 'Fatture', 'Banca', 'Sicurezza e conformità'].every(t => [...document.querySelectorAll('#nav .nav-i')].some(b => b.textContent.includes(t)))));
  await clic('#profilo-menu [data-a="ruolo"][data-v="amm"]');
  ok('amministrazione apre Contabilità', (await titolo()) === 'Contabilità');
  ok('sei passi, all\'inizio quasi tutti da fare', /^0/.test(await passi()), await passi());
  for (const t of ['prima', 'registri', 'iva', 'scad', 'conti', 'pacchetto', 'copertura']) { await clic(`[data-a="tab"][data-v="tabCont|${t}"]`); await foto('contabilita-' + t); }
  await clic('[data-a="tab"][data-v="tabCont|prima"]');
  const pn = await p.evaluate(() => { const l = primaNota(); return [sum(l, x => x.dare), sum(l, x => x.avere)]; }); ok('prima nota: dare = avere', Math.abs(pn[0] - pn[1]) < 0.05, pn.map(x => x.toFixed(2)).join(' / '));
  ok('registro vendite = fatturato del mese', await p.evaluate(() => Math.abs(sum(registroVendite(), r => r.imp) - mese().fatt) < 0.05));
  const liq0 = await p.evaluate(() => liquidazione().saldo);
  // passo 1: emettere la fattura dei lavori chiusi
  await clic('[data-a="passo"]', 'Emetti la fattura'); ok('passo 1 porta a Fatture emesse', (await titolo()) === 'Fatture' && await p.evaluate(() => S.tabFatt === 'emesse'));
  await foto('fatture-emesse');
  await clic('[data-a="fattura"][data-v="8"]'); ok('FT 432 inviata allo SdI', (await toast()).includes('FT 432 inviata allo SdI'), await toast());
  ok('stato Inviata', (await vista()).includes('Inviata allo SdI'));
  await pausa(2900); ok('poi Consegnata', await p.evaluate(() => FATT.find(f => f.n === 432)?.sdi === 'consegnata') && (await toast()).includes('consegnata'), await toast());
  ok('registro vendite sale con la fattura', await p.evaluate(() => Math.abs(sum(registroVendite(), r => r.imp) - mese().fatt) < 0.05 && registroVendite().some(r => r.num === 'FT 432')));
  await clic('[data-a="vedi-ft"][data-v="432"]'); ok('anteprima fattura', (await p.evaluate(() => document.querySelector('#modale').innerText)).includes('Scarica XML FatturaPA'));
  await clic('#modale [data-a="xml"]'); ok('XML scaricato', (await toast()).includes('XML FatturaPA'));
  ok('XML con dati veri', await p.evaluate(() => { const f = FATT.find(f => f.n === 432); if (!f) return false; const x = xmlFattura(f); return x.includes('<Numero>432</Numero>') && x.includes(cli(5).piva) && x.includes('Logistica Cremasca'); }));
  await clic('#modale [data-a="chiudi-modale"]');
  // scarto FT 430
  await clic('[data-a="correggi"][data-v="430"]'); await p.evaluate(() => document.querySelector('form[data-form="rinvia"]').requestSubmit()); await pausa(300);
  ok('FT 430 rinviata', (await toast()).includes('FT 430 rinviata'), await toast());
  await pausa(2900); ok('FT 430 consegnata e tra i crediti', await p.evaluate(() => FATT.find(f => f.n === 430)?.sdi === 'consegnata' && !SCARTI.length));
  // passo 2: fatture dei fornitori
  await clic('[data-a="tab"][data-v="tabFatt|ricevute"]'); await foto('fatture-ricevute');
  await clic('[data-a="reg-passiva"][data-v="1"]'); ok('fattura del Laboratorio registrata', (await toast()).includes('Laboratorio Analisi Padano'), await toast());
  ok('IVA a credito sale, saldo IVA scende', await p.evaluate(l0 => liquidazione().saldo < l0, liq0));
  await clic('[data-a="registra-tutte"]'); ok('registrate tutte', await p.evaluate(() => PASSIVE.every(x => x.registrata)));
  ok('fattura del medico esente', await p.evaluate(() => registroAcquisti().some(r => r.esente && r.iva === 0)));
  // passo 3: estratto
  await clic('#nav .nav-i', 'Incassi'); await clic('[data-a="carica"]'); await pausa(1700); await clic('[data-a="inc"][data-v="426|ok"]'); await clic('[data-a="inc"][data-v="423|acconto"]');
  ok('incassi finiti in banca', await p.evaluate(() => MOVBANCA.filter(m => m.imp > 0).length) >= 6);
  // passo 4: pagamenti
  await clic('#nav .nav-i', 'Contabilità'); await clic('[data-a="tab"][data-v="tabCont|scad"]');
  const dovuti = await p.evaluate(() => daPagare().filter(x => x.scad <= 7).map(x => x.id));
  for (const id of dovuti) await clic(`[data-a="paga"][data-v="${id}"]`);
  ok('pagati i fornitori in scadenza', dovuti.length > 0 && await p.evaluate(() => !daPagare().some(x => x.scad <= 7)), `${dovuti.length} pagati`);
  await clic('[data-a="tab"][data-v="tabCont|iva"]'); await clic('[data-a="tab"][data-v="tabCont|pacchetto"]'); await clic('[data-a="pacchetto"]');
  ok('pacchetto mandato', (await toast()).includes('commercialista'));
  ok('i sei passi sono fatti', (await passi()) === '111111', await passi());
  const pn2 = await p.evaluate(() => { const l = primaNota(); return Math.abs(sum(l, x => x.dare) - sum(l, x => x.avere)); }); ok('prima nota ancora in pareggio dopo tutto', pn2 < 0.05, pn2.toFixed(2));
  await clic('[data-a="tab"][data-v="tabCont|prima"]'); await foto('contabilita-dopo');
  // banca
  await clic('#nav .nav-i', 'Banca'); const saldo0 = await p.evaluate(() => saldoConto('cp'));
  await clic('[data-a="collega-conto"]'); await clic('#modale [data-a="autorizza-conto"]'); await pausa(2100);
  ok('open banking: FT 431 abbinata da sola', await p.evaluate(() => FATT.find(f => f.n === 431).stato === 'incassata') && (await toast()).includes('FT 431'), await toast());
  ok('saldo del conto aggiornato', await p.evaluate(s0 => saldoConto('cp') > s0, saldo0));
  await foto('banca');
  // avvio dei dati e conformità
  await clic('#profilo-menu [data-a="ruolo"][data-v="dir"]'); await clic('#nav .nav-i', 'Impostazioni');
  ok('impostazioni con avvio dei dati', (await vista()).includes('Avvio: i vostri dati qui dentro'));
  const vi = await vista(); ok('impostazioni: aggiornamenti normativi con chi, come e registro', ['Aggiornamenti normativi', 'Come arriva un aggiornamento', 'Registro degli aggiornamenti', 'specifiche tecniche 1.9.1', 'gestionale contabile del mercato'].every(t => vi.includes(t)));
  await clic('#vista [data-a="normativa"]'); ok('etichetta normativa apre il riquadro', (await p.evaluate(() => document.querySelector('#modale').innerText)).includes('Registro degli aggiornamenti')); await clic('#modale [data-a="chiudi-modale"]');
  for (let i = 0; i < 3; i++) await clic('[data-a="passo-avvio"]'); ok('avvio dei dati completato', (await vista()).includes('Avvio completato'));
  await foto('impostazioni');
  await clic('#nav .nav-i', 'Sicurezza e conformità'); const vs = await vista();
  ok('sicurezza: GDPR, sicurezza, fatture e conti, normativa', ['GDPR', 'secondo fattore', 'intermediario accreditato', 'Chi tiene aggiornata la normativa', 'commercialista'].every(t => vs.includes(t)));
  await foto('sicurezza');
  // nota di credito: il cliente ha annullato un corso già pagato
  await p.evaluate(() => { S.ruolo = 'amm'; S.tabFatt = 'emesse'; vai('fatture'); });
  const nc0 = await p.evaluate(() => ({ fatt: mese().fatt, iva: liquidazione().deb, ft: NC_RICH.ft }));
  await clic(`#vista [data-a="nota-credito"][data-v="${nc0.ft}"]`); await clic('#modale form button.btn-pri');
  const nc1 = await p.evaluate(() => { const pn = primaNota(); return { fatt: mese().fatt, reg: Math.round(sum(registroVendite(), x => x.imp) * 100) / 100, iva: liquidazione().deb, pari: Math.abs(sum(pn, x => x.dare) - sum(pn, x => x.avere)) < 0.05, n: NOTE.length, xml: xmlFattura(NOTE[0]) }; });
  ok('nota di credito: fatturato e registro IVA scendono insieme', nc1.n === 1 && nc1.fatt === nc0.fatt - 650 && nc1.reg === nc1.fatt, `${nc0.fatt} > ${nc1.fatt} / ${nc1.reg}`);
  ok('nota di credito: IVA a debito giù di 143 €, prima nota in pareggio', Math.round((nc0.iva - nc1.iva) * 100) === 14300 && nc1.pari);
  ok('nota di credito: XML TD04 collegato alla fattura', nc1.xml.includes('<TipoDocumento>TD04</TipoDocumento>') && nc1.xml.includes(`<IdDocumento>${nc0.ft}</IdDocumento>`));
  ok('nota di credito: in cima alle emesse, e nello scadenzario', (await vista()).includes('NC 1') && await p.evaluate(() => { S.tabCont = 'scad'; vai('contabilita'); return document.querySelector('#vista').innerText.includes('da scalare sulla prossima fattura'); }));
  // meno rumore: menu della direzione, numerini, tabella dei margini, prezzo consigliato
  const fac = await p.evaluate(() => { AZ_.ruolo('dir'); vai('home'); const vis = [...document.querySelectorAll('#nav .nav-i')].filter(e => e.offsetParent).length, chiusa = document.querySelectorAll('#rail .rail-b').length === 5;
    document.querySelector('#rail .rail-b[data-v="contabilita"]').click(); const aperta = [...document.querySelectorAll('#nav .nav-i')].filter(e => e.offsetParent).length;
    const calmi = document.querySelectorAll('#nav .badge.calmo').length, urg = [...document.querySelectorAll('#nav .nav-i .badge:not(.calmo)')].map(b => b.closest('.nav-i').dataset.v);
    vai('margini'); const colonne = document.querySelector('#vista table').querySelectorAll('thead th').length; AZ_['marg-dett'](); const tutte = document.querySelector('#vista table').querySelectorAll('thead th').length; AZ_['marg-dett']();
    vai('ordini'); const hint = document.querySelector('#vista [data-a="prev-giusto"]')?.closest('div').innerText.replace(/\s+/g, ' ') || ''; AZ_.ruolo('amm');
    return { vis, chiusa, aperta, calmi, urg, colonne, tutte, hint }; });
  ok('menu: 5 sezioni nella barra scura, accanto solo le pagine della sezione', fac.chiusa && fac.vis === 1 && fac.aperta === 6, `${fac.vis} > ${fac.aperta}`);
  ok('numerini grigi, arancio solo se urgente', fac.calmi >= 4 && fac.urg.every(v => ['incassi', 'fatture', 'contabilita'].includes(v)), fac.urg.join(','));
  ok('prezzi e margini: 4 colonne, 8 con i dettagli', fac.colonne === 4 && fac.tutte === 8, `${fac.colonne}/${fac.tutte}`);
  ok('preventivo: prezzo consigliato in una riga', fac.hint.includes('Prezzo consigliato 1.650 €') && fac.hint.includes('Usa 1.650 €'), fac.hint);
  // facile da capire: barra della demo, benvenuto, parole spiegate
  await p.evaluate(() => vai('impostazioni'));
  ok('profilo con i quattro ruoli, nessun ruolo in alto', (await p.$$('#profilo-menu [data-a="ruolo"]')).length === 4 && !(await p.$('header [data-a="ruolo"]')));
  await clic('#barra-demo [data-a="guida"]'); ok('suggerimenti spenti: niente righe Prova', !(await p.$('#vista .prova-riga')));
  await clic('#barra-demo [data-a="guida"]'); ok('suggerimenti riaccesi', !!(await p.$('#vista .prova-riga')));
  await clic('#barra-demo [data-a="benvenuto"]'); ok('benvenuto con quattro punti di partenza', (await p.$$('#modale [data-a="benvenuto-ruolo"]')).length === 4);
  await clic('#modale [data-a="benvenuto-ruolo"][data-v="amm"]'); ok('dal benvenuto si parte da Amministrazione', await p.evaluate(() => S.ruolo === 'amm' && S.view === 'contabilita' && !document.querySelector('#modale').innerHTML));
  const gl = await p.evaluate(() => [...document.querySelectorAll('#vista .gl')].map(x => x.dataset.gl)); ok('parole spiegate in Contabilità', ['Prima nota', 'Registri IVA', 'Scadenzario'].every(t => gl.includes(t)), gl.join(','));
  await clic('#vista .gl'); ok('la spiegazione compare al tocco', await p.evaluate(() => !document.querySelector('#glossa').hidden && document.querySelector('#glossa').innerText.length > 20));
  // sala: le nuove decisioni amministrative
  const p2 = await b.newPage(); await p2.goto(URL, { waitUntil: 'networkidle0' });
  const dec = await p2.evaluate(() => SALA.decisioni().map(d => d.id)); ok('sala: scarto e fatture fornitori tra le decisioni', dec.includes('scarto-430') && dec.some(x => x.startsWith('pass-')), dec.join(','));
  await p2.evaluate(() => { AZ_.modo('sala'); AZ_['sala-apri']('scarto-430'); AZ_['sala-decidi']('scarto-430|0'); AZ_['sala-decidi']('pass-1|0'); });
  ok('sala: approvate scarto e fattura fornitore', await p2.evaluate(() => FATT.some(f => f.n === 430) && PASSIVE.find(x => x.id === 1).registrata));
  // telefono
  for (const v of ['contabilita', 'fatture', 'banca', 'sicurezza']) { await p.evaluate(v => vai(v), v); await foto(v + '-tel', 390); }
  } catch (e) { esiti.push('NO  ECCEZIONE ' + e.message.slice(0, 160)); }
  console.log(esiti.join('\n')); console.log('ERRORI:', errs.length ? errs : 'nessuno');
  await b.close();
})();
