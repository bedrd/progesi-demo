# Progesi · handoff della demo

Questo file serve a chi riprende il lavoro, persona o Claude, per avere tutta la situazione senza rileggere le call. Aggiornato al 19 ottobre 2026. Quando cambiate qualcosa di importante, aggiornatelo nello stesso commit.

## 1. In breve

- **Cos'è**: una demo commerciale, frontend puro e in un solo file (`progesi.html`), di una piattaforma gestionale con agenti AI per **Progesi S.r.l.**, società di Offanengo (CR) che fa sicurezza sul lavoro (DVR, RSPP, formazione, medicina del lavoro, ambiente, antincendio, acustica, HACCP).
- **Online**: https://progesi-demo-b376.netlify.app
  - Link diretto per chi fa l'amministrazione: https://progesi-demo-b376.netlify.app/#amministrazione (funziona anche `?ruolo=amm`, `#direzione`, `#responsabile`, `#tecnico`).
- **Prossima scadenza**: presentazione lunedì **2 novembre, ore 14:30**, di persona da Progesi a Offanengo. Presentano Mihail (Catana) ed Ervin (BD Media). Prima del 2, Giorgio vuole un'anteprima da far vedere ai due soci. Obiettivo dichiarato dal cliente: demo "al 90%".
- **Persone lato cliente**:
  - **Giorgio**, direttore commerciale, l'interlocutore delle call;
  - **due soci**, uno dei due segue i tecnici e confronta le ore;
  - **chi fa l'amministrazione** in Zucchetti G1: non è mai stato in call e il nome non lo sappiamo (in demo è "Elena Moretti").
- **Stato**: la demo copre tutto quello che è stato chiesto nelle due call. Ha passato tre giri di verifica indipendenti più un giro finale, e 91 controlli automatici (vedi §9). I limiti noti sono al §11.

## 2. File del repo

| File | Cosa è |
|---|---|
| `progesi.html` | **La demo.** Unico file da modificare per la demo: HTML, CSS e JS insieme. |
| `CLAUDE.md` | Regole brevi che Claude Code legge da solo all'avvio. Rimanda a questo file. |
| `HANDOFF.md` | Questo file. |
| `requisiti.md` | Requisiti R1 a R16 ricavati dalle due call, con citazioni e decisioni (DENTRO, OPZIONALE, FUORI). In fondo, lo stato al 19 ottobre. |
| `fattibilita.md` | Fattibilità del software vero, non della demo: come si fa, rischi e giornate per requisito. Le aggiunte della call 2 valgono 74 a 99 giornate. |
| `transcript.txt` | Prima call con il cliente. |
| `transcript-call2.txt` | Seconda call: feedback sulla demo e cambio di scope (via Zucchetti). |
| `Progesi - punti da verificare.pdf` | Punti di fattibilità incerta, mandati al commerciale dopo la prima call. **In parte superato**: è precedente alla call 2 (per esempio parla ancora di integrazione con Zucchetti). |
| `dominicis (1/2/3).html` | Demo Altalogik già consegnate a un altro cliente. Sono **lo standard di qualità** e la fonte di alcune funzioni riprese. Non vanno pubblicate. |
| `test/` | Giri di prova automatici con Chrome headless (vedi §9). |
| `netlify.toml` | Configurazione per pubblicare solo la demo su Netlify (vedi §10). |

## 3. Storia e decisioni prese

1. **Prima call** (`transcript.txt`). Il cliente usa Zucchetti G1, prepara i preventivi in Word e fa le fatture a mano. Vuole:
   - prezzi giusti dallo storico delle ore;
   - il giro preventivo → ordine → assegnazione → lavoro → fattura;
   - contratti ricorrenti che si rinnovano;
   - abbinamento dell'estratto conto con le fatture;
   - confronto tra ore dichiarate e timbrature;
   - un cruscotto con fatturato, ordini fornitori e margine.

   Paghe e bilancio restano allo studio paghe e al commercialista.
2. **Prima versione della demo**, rifinita sul transcript e sulle demo dominicis.
3. **Feedback del commerciale**:
   - mancava l'inserimento di un nuovo cliente dal preventivo;
   - tutto dipendeva da Zucchetti;
   - il CRM era troppo basilare.

   La quotazione interna era **17.000 €** sullo scope della prima call. Aggiunti: nuovo cliente, CRM con referenti, attività e promemoria, trattative, clienti persi con motivo.
4. **Variante vetro** (glassmorphism), chiesta dal cliente. **Ora è l'unica versione**: quella a superfici piene è stata tolta.
5. **Seconda call** (`transcript-call2.txt`). Cambio di scope: **la piattaforma sostituisce Zucchetti G1**, con tutta l'amministrazione e la contabilità dentro. Fattura elettronica tramite intermediario SdI. Collegamento diretto alla banca (open banking) come **opzionale**, perché Giorgio ha detto "è ancora da verificare". Restano **fuori** paghe, bilancio, dichiarativi e F24 delle imposte.
6. **Sala agenti**: una seconda vista dello stesso sistema, un ufficio isometrico con 11 agenti AI in 4 reparti. Si sceglie dall'header ("Gestionale · Sala agenti"), si apre sempre su Gestionale e condivide lo stesso stato. Il modello è la demo Altalogik "sala agenti" di Ferretti Impianti.
7. **Attenzione sul piano commerciale**, scritta in `requisiti.md` e `fattibilita.md`:
   - lo scope è raddoppiato e i 17.000 € non reggono più;
   - la normativa contabile è il rischio più alto;
   - Giorgio ha aperto lui stesso l'alternativa di appoggiarsi a un gestionale con API, per esempio TeamSystem.

## 4. Regole da rispettare (vincoli del cliente e dello stile)

- **Un solo file HTML**, niente build. Tailwind v4 dal CDN browser (`@tailwindcss/browser`), Bootstrap Icons, Google Fonts.
- **Dati coerenti**: all'apertura la console deve stampare `[check] 44/44 controlli sui dati: dati coerenti` (funzione `check()` in fondo al file). Se toccate i dati controllati, aggiornate anche i controlli.
- **Numeri calcolati, mai scritti a mano**:
  - il registro IVA vendite fa lo stesso totale del fatturato del mese (96.400 € all'avvio);
  - la prima nota è in pareggio (dare = avere);
  - liquidazione IVA, saldi di banca e contatori vengono dai dati.
- **Colori**: rosso Progesi `#DD0000` solo per marchio, navigazione attiva e azioni. **Grafici e barre in grafite** (`#3A3A3A`), mai rossi.
- **Font**: Ubuntu per i titoli, Lato per testi e numeri (`.num` con cifre tabellari), IBM Plex Mono solo per le causali bancarie. Angoli squadrati, tono sobrio.
- **Testi in italiano, mai il trattino lungo** (né `—` né `–`). Tono concreto, niente gergo. Usare `pl()` per singolare e plurale.
- **Ogni vista ha la riga "Prova:"**, che guida chi presenta (helper `prova()`).
- **Non si perde niente** passando tra Gestionale e Sala, o cambiando ruolo: lo stato è uno solo.
- Nella demo non ci sono marchi reali di fornitori (intermediario SdI e open banking restano generici), né banche reali.

## 5. Com'è fatto `progesi.html` (circa 2.200 righe)

L'ordine nel file:

1. **CSS**:
   - token Tailwind in `@theme` (petrolio = rosso #DD0000, grafite, inchiostro, carta, ok, ambra, arancio, grigio #555);
   - componenti (`.card`, `.btn`, `.seg`, `.chip`, `.tab-t`, `.kanban`);
   - tabelle `.impila`, che diventano schede: sotto i 640 px, sotto i 1300 px con `.larga`, sotto i 1400 px con `.larghissima`;
   - stili della Sala;
   - blocco **"variante vetro"**: superfici traslucide con `backdrop-filter`, sfondo a luci tenui, ripiego per `prefers-reduced-transparency` e per i browser senza sfocatura.
2. **HTML**: barra laterale `#nav`, header con cerca, avvisi, selettore modo e selettore ruolo. Sotto i 1280 px i due selettori vanno in una seconda barra. Poi `#vista`, dove si disegna la pagina, `#modale` e `#toast`.
3. **Dati**:
   - `BASE` (fatturato del mese 96.400 €, ordini fornitori 21.300 €, ore 1.020);
   - `CLIENTI`: id 1 a 12 clienti, id 13 a 22 potenziali; 22 è Salumificio Crotti, il nuovo potenziale della prova;
   - `SERV` (servizi con prezzo di listino e ore previste), `TEC` (Paolo, Francesco, Sara, Davide), `STORICO` (lavori chiusi, base dei prezzi suggeriti), `CONTRATTI`, `ORDINI`;
   - `FATT`: fatture aperte o da incassare; FT 398 è del mese scorso ed è scaduta;
   - `MOV` (estratto conto), `ORE`, `OCCASIONI`, `RICHIESTE`, `FORN` (13 ordini fornitori), `PROMEMORIA`, `ATTIVITA`, `PERSI`, `UTENTI`, `PERMESSI`.
4. **Stato e calcoli**:
   - `S` è lo stato unico: `view`, `ruolo`, `modo`, `prev` (preventivo in scrittura), schede attive, flag dei passi;
   - funzioni di calcolo: `mese()`, `stimaRiga()` (prezzo giusto dallo storico), `kDaRivedere()`, `carico()`, ecc.
5. **Navigazione e ruoli**:
   - `NAV`, `TITOLI`;
   - `RUOLO`, con nome e pagina iniziale per ruolo;
   - `VISIBILI`, cioè le pagine per ruolo; la direzione vede tutto;
   - `vede(v)`, `render(nuova)`, `vai(view)`.
6. **Viste**: `VISTE[nome]()` restituisce l'HTML della pagina. Sono home, ordini, trattative, pianifica, contratti, clienti, fornitori, impostazioni, margini, incassi, ore, tecnico, poi contabilita, fatture, banca, sicurezza (aggiunte con `Object.assign(VISTE, …)`) e sala.
7. **Azioni**:
   - i clic sono delegati con `data-a="nome" data-v="valore"`, gestiti in `AZ_`;
   - i form con `data-form="nome"` vanno in `FORM`;
   - helper `apriModale`, `chiudiModale`, `toast`, `spegni`;
   - la classe `.lampo` evidenzia l'ultima riga cambiata.
8. **Modulo amministrazione**, dopo le azioni principali:
   - `CHIUSE`: le fatture del mese già incassate, che riempiono i numeri da FT 399 a 431, con importi proporzionati alla taglia del cliente;
   - `emDi(n)`: data di emissione in ordine di numero;
   - `SCARTI`: FT 430 scartata dallo SdI per partita IVA errata;
   - `PASSIVE`: fatture dei fornitori, una per ordine fornitore; le visite mediche sono esenti, art. 10;
   - `CONTI`: conto principale e conto anticipi;
   - `MOVBANCA`: movimenti arrivati durante la sessione;
   - `FISSI` e `PAGHE`: affitto, stipendi, F24 e la scrittura paghe del mese;
   - funzioni `registroVendite()`, `registroAcquisti()`, `liquidazione()`, `movimentiBanca()`, `saldoConto()`, `primaNota()`, `daPagare()`, `PASSI_AMM()` (i 6 passi del mese), `xmlFattura()` (XML FatturaPA scaricabile), `anteprimaFattura()`, `passaggioG1()`, `DA_G1`.
9. **Modulo `SALA`** (IIFE): vedi §8.
10. **`check()`** e avvio. All'avvio si legge il ruolo da `?ruolo=` o da `#`, poi `render(true)`.

## 6. Ruoli e pagine

| Ruolo | Chi in demo | Si apre su | Vede |
|---|---|---|---|
| Direzione (`dir`) | Giorgio | Controllo di gestione | tutto |
| Resp. tecnico (`rt`) | uno dei soci | Pianificazione | pianifica, ordini, contratti, clienti, margini, ore, sicurezza |
| Amministrazione (`amm`) | Elena Moretti | Contabilità | home, contabilità, fatture, incassi, banca, ordini fornitori, ore, clienti, contratti, sicurezza |
| Tecnico (`tec`) | Paolo Ferri | I miei lavori | solo i suoi lavori; niente Sala, niente selettore |

Cambiando ruolo si resta sulla pagina se il nuovo ruolo la vede, altrimenti si va alla sua pagina iniziale. Dalla home si va sempre alla pagina iniziale del ruolo. Preventivi e "Prepara preventivo" li vede solo la direzione.

## 7. Il giro della presentazione (le righe "Prova:")

- **Direzione, home**: dettaglio del fatturato. Poi passa a Tecnico.
- **Tecnico**: chiude Cascina Rosa con 6 ore e il documento.
- **Prezzi e margini**: il servizio appena chiuso, sopra i 30 dipendenti rende il 9%; prezzo giusto 1.650 €.
- **Preventivi**: Trafilerie Adda, "Usa 1.650 €", anteprima, invio P-2026-048. Poi fattura del lavoro chiuso, FT 432.
- **Contratti**: Officine Meccaniche Serio, "Proponi 2.400 €", poi "Accettata".
- **Clienti**: Salumificio Crotti (potenziale), telefonata e promemoria.
- **Trattative**: prepara DVR e HACCP per Crotti, P-2026-049.
- **Resp. tecnico**:
  - Pianificazione: Studio Dentistico Ferla a un tecnico libero;
  - Preventivi: trascina Carpenteria Oglio in lavorazione, si apre l'assegnazione.
- **Amministrazione**:
  - Contabilità con i 6 passi del mese: emetti la fattura, registra le fatture dei fornitori, carica l'estratto e conferma i casi dubbi, paga i fornitori in scadenza, controlla la liquidazione IVA, manda il pacchetto al commercialista;
  - Fatture: correggi e rinvia FT 430;
  - Banca: collegamento diretto (opzionale), FT 431 abbinata da sola;
  - scheda "Da G1 a qui": il passaggio da G1 e la lista di cosa fa G1 oggi e dove si fa qui.
- **Sala agenti**: clicca il Preventivista, poi "Vedi nel gestionale". Oppure approva una decisione e ritrovala fatta nel gestionale.

## 8. Sala agenti (modulo `SALA`)

- **Scena**: SVG isometrico generato da codice (`scena()`, ripreso dalla demo Altalogik), con badge HTML sopra (`badges()`, aggiornati sul posto da `aggiornaBadges()` per non perdere clic e focus). Sotto la scena c'è una riga di numeri leggibili (`kf-0` a `kf-5`); la lavagna disegnata è decorativa.
- **Agenti** (`AG`): Coordinatore (regia); Commerciale: Preventivista, Richieste, Rinnovi; Contabilità: Fatturatore, Incassi, Fornitori; Operatività: Pianificatore, Scadenze, Archivista; Risorse umane: Ore e timbrature (modulo opzionale). Ogni agente ha `fa`, `nonFa`, `fonti`, `vista` (pagina del gestionale) e `min` (minuti risparmiati per azione).
- **Decisioni**: `decisioni()` le **calcola dallo stato del gestionale**, non sono salvate a parte. Una cosa fatta nel gestionale sparisce dalla Sala e viceversa. Le scelte chiamano le stesse azioni del gestionale (`AZ_.fattura`, `FORM.assegna`, `AZ_.proponi`, …).
- **Filtro per ruolo** (`REP_RUOLO`): la direzione vede tutto, il resp. tecnico vede operatività e risorse umane, l'amministrazione vede contabilità e risorse umane.
- **"Vedi nel gestionale"**: `vistaAg()` porta alla pagina giusta; Scadenze e Archivista aprono la scheda del cliente. Se il ruolo non vede quella pagina, il pulsante non c'è e una riga dice chi la vede.
- **Battito**: ogni 3,8 secondi un evento del `COPIONE`, cioè controlli in sola lettura che finiscono in fumetti e nel diario. **Non aumenta i contatori**: salgono solo con le decisioni approvate e con le azioni fatte nel gestionale (`SALA.racconta`).
- **"Chiedi cosa sta facendo"**: le risposte vengono solo dai dati (`risposta()`).

## 9. Test

```bash
cd test
npm install
npm test
```

- I test usano `puppeteer-core` con il Chrome installato. Il percorso si trova da solo su Windows, Mac e Linux; altrimenti impostate `CHROME_PATH`.
- Per provare il sito online: `node giro.js https://progesi-demo-b376.netlify.app`.
- **Gli script**:
  - `giro.js`: il giro di presentazione completo (33 controlli);
  - `sala-test.js`: la Sala agenti (25 controlli);
  - `amm-test.js`: l'amministrazione dal primo all'ultimo passo, con le schermate a 1440 e 390 px in `test/shots/` (35 controlli);
  - `verifica.js`: controlli di layout a 390, 768, 1024, 1280, 1366 e 1440 px, più punti specifici della Sala. Segnala come "NO" anche cose volute:
    - titoli brevi come "Banca" sotto gli 80 px;
    - su telefono la barra delle schede di Contabilità e la matrice dei permessi che scorrono di lato;
    - a 1600 px, agenti sotto la piega.
- Prima di ogni commit: `npm test`, tutto OK e "ERRORI: nessuno". Se cambiate un testo che un test cerca, aggiornate il test.

## 10. Pubblicazione

- **Sito**: Netlify, team "BD Media", progetto `progesi-demo-b376` (https://progesi-demo-b376.netlify.app). Un secondo progetto, `progesi-demo-vetro-ba3d`, mostra la stessa versione ed è da tenere o cancellare.
- **Cosa si pubblica**: `netlify.toml` copia solo `progesi.html` in `dist/index.html` e aggiunge `X-Robots-Tag: noindex`. Transcript, PDF e demo dominicis non vanno online.
- **Oggi** si pubblica a mano dal PC di Bedr, con la CLI di Netlify:
  ```bash
  npx netlify-cli deploy --prod --site 04760a10-b90e-47f4-8bde-aa7a3cbb6757
  ```
  Con `netlify.toml`, la CLI esegue il build e pubblica `dist`.
- **Consigliato**: collegare il progetto Netlify a questo repo GitHub (Netlify → Project configuration → Build & deploy → Link repository). Così ogni push su `main` aggiorna il sito da solo.

## 11. Limiti noti e cose aperte

**Limiti della demo, da dire in presentazione**
- Niente salvataggio: ricaricando la pagina si torna ai dati di partenza.
- Invii allo SdI, collegamento con la banca, email e PDF sono simulati. L'XML FatturaPA invece si scarica davvero ed è plausibile.
- Il trascinamento nel kanban funziona solo da computer; su telefono ci sono i pulsanti.

**Piccole cose lasciate come sono (bassa priorità)**
- Le attività risultano sempre fatte da "Giorgio", anche quando agisce Elena (registro di Sicurezza e conformità).
- Il ricavo ricorrente (412.000 €, 34.333 € al mese) non cambia dopo un rinnovo accettato.
- Alcune fatture aperte hanno scadenze vicine all'emissione (FT 426: emessa il 15/10, scade il 20/10). Le scadenze `scad` di `FATT` sono dati originali, mentre le date di emissione sono ricalcolate in ordine di numero.
- Nelle card KPI, le etichette non sono allineate quando il sottotitolo va a capo.
- Nella chat della Sala alcune risposte sono in terza persona ("Tiene aggiornati…"), altre in prima.
- Molte righe "Prova:" non cambiano dopo che l'azione è stata fatta dalla Sala.
- Ubuntu a densità 1x in Chrome headless sembra spaziare male alcune lettere. Va controllato sul portatile della presentazione a zoom 100%.

**Da chiedere al cliente**, e già elencate nella scheda "Da G1 a qui"
- Note di credito, ritenute d'acconto, split payment, periodicità IVA (mensile o trimestrale), cespiti.
- Nome e abitudini di chi fa l'amministrazione.
- Formato che il commercialista importa.
- Contratti reali con intermediario SdI e con Fabrick per l'open banking.

## 12. Come lavorare in due senza restare indietro

- `main` è la versione buona, quella pubblicata. **Non si lavora direttamente su `main`.**
- **Chi sviluppa**:
  ```bash
  git pull
  git switch -c nome-modifica
  ```
  Poi lavora e lancia `npm test` dentro `test/`. Infine:
  ```bash
  git commit
  git push -u origin nome-modifica
  ```
  E apre una pull request su GitHub, scrivendo cosa ha cambiato e come l'ha provato.
- **Bedr** guarda la pull request e la unisce (merge). Poi, nella sua cartella:
  ```bash
  git switch main
  git pull
  ```
  Così ha sempre l'ultima versione, la stessa del sito se Netlify è collegato al repo.
- Commit piccoli e con un messaggio chiaro. Se cambia qualcosa di importante, si aggiornano questo file e `requisiti.md` nello stesso commit.
- `progesi.html` è un file unico e grande. Due persone sulla stessa zona creano conflitti, quindi conviene dirsi prima chi tocca cosa (vista, modulo, dati).

## 13. Glossario

- **DVR**: Documento di valutazione dei rischi.
- **RSPP**: Responsabile del servizio di prevenzione e protezione.
- **HACCP**: piano di autocontrollo igienico per gli alimenti.
- **MUD**: Modello unico di dichiarazione ambientale.
- **SdI**: Sistema di Interscambio dell'Agenzia delle Entrate, per le fatture elettroniche.
- **G1**: il gestionale Zucchetti che Progesi usa oggi.
- **Prima nota**: registro cronologico delle scritture contabili.
- **Liquidazione IVA**: IVA a debito meno IVA a credito del periodo.
- **Open banking (AISP)**: lettura dei movimenti del conto tramite un fornitore autorizzato da Banca d'Italia, con il consenso del cliente.
