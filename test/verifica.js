// verifica mirata dei problemi trovati dai tre controlli
const puppeteer = require('puppeteer-core');
const { CHROME, URL_DEMO } = require('./config');

const URL = process.argv[2] || URL_DEMO;
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const esiti = [], errs = [];
  const ok = (n, c, d = '') => esiti.push(`${c ? 'OK ' : 'NO '} ${n}${d ? ' :: ' + d : ''}`);
  const pausa = ms => new Promise(r => setTimeout(r, ms));
  const nuova = async (w, h = 900) => { const p = await b.newPage(); p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' || m.type() === 'assert') errs.push(m.text()); }); await p.setViewport({ width: w, height: h }); await p.goto(URL, { waitUntil: 'networkidle0' }); await p.evaluate(() => document.fonts.ready); return p; };
  const VISTE = { dir: ['home', 'ordini', 'trattative', 'contratti', 'clienti', 'margini', 'impostazioni', 'fornitori', 'incassi'], rt: ['pianifica', 'ordini', 'ore'], amm: ['contabilita', 'fatture', 'banca', 'incassi', 'fornitori', 'sicurezza'] };
  // tabelle tagliate e titolo dell'header, per larghezza
  for (const w of [390, 768, 1024, 1280, 1366, 1440]) {
    const p = await nuova(w); const tagli = [];
    for (const [r, vv] of Object.entries(VISTE)) for (const v of vv) {
      const tabsList = v === 'contabilita' ? ['prima', 'registri', 'iva', 'scad', 'conti', 'g1'] : v === 'fatture' ? ['emesse', 'ricevute'] : [null];
      for (const t of tabsList) {
        const res = await p.evaluate((r, v, t) => { AZ_.ruolo(r); if (t) S[v === 'fatture' ? 'tabFatt' : 'tabCont'] = t; vai(v);
          const x = [...document.querySelectorAll('#vista .scroll-x, #vista .overflow-x-auto')].filter(e => e.scrollWidth > e.clientWidth + 2 && !e.closest('#kanban')).map(e => `${e.scrollWidth}/${e.clientWidth} ${e.className.slice(0, 40)} > ${(e.firstElementChild?.className || "").toString().slice(0, 50)}`);
          return { x, doc: document.documentElement.scrollWidth, tit: document.querySelector('#titolo').getBoundingClientRect().width };
        }, r, v, t);
        if (res.x.length && !(v === 'pianifica')) tagli.push(`${r}/${v}${t ? ':' + t : ''} ${res.x.join(',')}`);
        if (res.doc > w) tagli.push(`${r}/${v} pagina larga ${res.doc}`);
        if (w >= 640 && res.tit < 80) tagli.push(`${r}/${v} titolo ${Math.round(res.tit)}px`);
      }
    }
    ok(`${w}px: nessuna tabella tagliata, titolo leggibile`, !tagli.length, tagli.join(' | '));
    await p.close();
  }
  // tendina sopra le card
  { const p = await nuova(1440); await p.evaluate(() => document.querySelector('[data-a="avvisi"]').click()); await pausa(300);
    const sopra = await p.evaluate(() => { const t = document.querySelector('.tendina:not(.hidden)') || [...document.querySelectorAll('.tendina')].find(e => e.offsetParent); if (!t) return 'nessuna tendina'; const r = t.getBoundingClientRect(); const pts = [[r.left + 30, r.top + 60], [r.left + 30, r.bottom - 20], [r.right - 30, r.top + r.height / 2]]; return pts.every(([x, y]) => t.contains(document.elementFromPoint(x, y))) ? 'ok' : 'coperta'; });
    ok('tendina Avvisi sopra le card', sopra === 'ok', sopra); await p.close(); }
  // sala: agenti cliccabili a tutte le larghezze desktop
  for (const w of [1280, 1300, 1340, 1366, 1440, 1600]) {
    const p = await nuova(w); await p.evaluate(() => AZ_.modo('sala')); await pausa(400);
    const coperti = await p.evaluate(() => [...document.querySelectorAll('#badges button.nome')].filter(btn => { const r = btn.getBoundingClientRect(); const e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return !btn.contains(e); }).map(b => b.dataset.v));
    ok(`sala ${w}px: tutti gli agenti cliccabili`, !coperti.length, coperti.join(','));
    if (w === 1280) await p.screenshot({ path: __dirname + '/shots/ver-sala-1280.png' });
    await p.close();
  }
  // sala: link per ruolo, Fatturatore su emesse, Scadenze sulla scheda cliente
  { const p = await nuova(1440);
    const r = await p.evaluate(() => { AZ_.ruolo('rt'); AZ_.modo('sala'); AZ_['sala-ag']('fatt'); const pann = document.querySelector('#sala-pannello').innerText; const haBtn = !!document.querySelector('#sala-pannello [data-a="sala-vai"]'); return { pann: pann.includes("lo vedono l'amministrazione"), haBtn }; });
    ok('rt, Fatturatore: niente link, dice chi lo vede', r.pann && !r.haBtn);
    const r2 = await p.evaluate(() => { AZ_.ruolo('dir'); S.tabFatt = 'ricevute'; AZ_['sala-chiudi'](); AZ_['sala-ag']('fatt'); document.querySelector('#sala-pannello [data-a="sala-vai"]').click(); return [S.view, S.tabFatt, S.modo]; });
    ok('Fatturatore apre Fatture emesse', r2.join() === 'fatture,emesse,gestionale', r2.join());
    const r3 = await p.evaluate(() => { AZ_.modo('sala'); AZ_['sala-chiudi'](); AZ_['sala-ag']('scad'); const l = document.querySelector('#sala-pannello [data-a="sala-vai"]'); const txt = l.textContent; l.click(); return [txt, S.view, cli(S.cliSel).nome, document.querySelector('#vista').innerText.includes(cli(S.cliSel).nome)]; });
    ok('Scadenze apre la scheda del cliente', r3[1] === 'clienti' && r3[3] && r3[0].includes(r3[2]), r3.join(' | '));
    // preventivo in corso non si perde
    const r4 = await p.evaluate(() => { vai('ordini'); S.prev.righe[0].prezzo = 1200; S.prev.note = 'Nota di prova'; AZ_.modo('sala'); AZ_['sala-decidi']('prev-traf|0'); AZ_.modo('gestionale'); return [S.prev.righe[0].prezzo, S.prev.note, ORDINI.some(o => o.cli === 3 && o.num)]; });
    ok('preventivo in scrittura conservato dopo la decisione in sala', r4[0] === 1200 && r4[1] === 'Nota di prova' && r4[2], r4.join());
    // scadenze non ripropone servizi già in preventivo o confermati
    const r5 = await p.evaluate(() => { const d = SALA.decisioni().filter(x => x.ag === 'scad'); return d.map(x => x.titolo); });
    const r6 = await p.evaluate(() => { const d = SALA.decisioni().find(x => x.ag === 'scad'); if (d) AZ_['sala-decidi'](d.id + '|0'); const dopo = SALA.decisioni().filter(x => x.ag === 'scad'); return dopo.every(x => !ORDINI.some(o => o.stato !== 'perso' && o.cli === +x.id.match(/scad-(\d+)/)[1])) ; });
    ok('Scadenze senza doppioni', r6, r5.join(' / '));
    await p.close(); }
  // sala: contatori fermi mentre il battito gira, niente righe doppie
  { const p = await nuova(1440); await p.evaluate(() => AZ_.modo('sala'));
    const prima = await p.evaluate(() => document.getElementById('kf-5').textContent); await pausa(20000);
    const dopo = await p.evaluate(() => [document.getElementById('kf-5').textContent, SALA.stato.feed.length, new Set(SALA.stato.feed.map(f => f.ag + f.txt)).size]);
    ok('ore risparmiate ferme senza lavoro vero', prima === dopo[0], `${prima} -> ${dopo[0]}`);
    ok('feed senza righe doppie', dopo[1] === dopo[2], `${dopo[1]} righe, ${dopo[2]} diverse`);
    const risp = await p.evaluate(() => { AZ_['sala-chiudi'](); AZ_['sala-ag']('prev'); AZ_['sala-chiedi']('1'); AZ_['sala-chiedi']('3'); return [...document.querySelectorAll('#sala-pannello .bolla-a')].map(e => e.textContent); });
    ok('risposte coerenti con le decisioni e senza doppi punti', risp[0].includes('Aspetto il vostro ok') && !/\.\./.test(risp.join(' ')), risp.join(' || '));
    // clic durante il battito
    let presi = 0; for (let i = 0; i < 12; i++) { const id = ['prev', 'fatt', 'inc', 'pian'][i % 4]; const box = await p.evaluate(id => { AZ_['sala-chiudi'](); const r = document.querySelector(`#badges button[data-v="${id}"]`).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, id); await p.mouse.move(box[0], box[1]); await p.mouse.down(); await pausa(180); await p.mouse.up(); await pausa(150); if (await p.evaluate(id => SALA.stato.sel === id, id)) presi++; await pausa(700); }
    ok('clic sugli agenti presi anche durante il battito', presi === 12, `${presi}/12`);
    const saluti = await p.evaluate(() => { AZ_.ruolo('rt'); return document.querySelector('#vista h1').textContent; });
    ok('saluto del resp. tecnico senza "Responsabile."', !/Responsabile\./.test(saluti), saluti);
    await p.close(); }
  // link diretto
  { const p = await b.newPage(); await p.goto(URL + '#amministrazione', { waitUntil: 'networkidle0' }); ok('link #amministrazione apre Contabilità', (await p.evaluate(() => document.querySelector('#titolo').textContent)) === 'Contabilità'); await p.close(); }
  console.log(esiti.join('\n')); console.log('ERRORI:', errs.length ? errs : 'nessuno');
  await b.close();
})();
