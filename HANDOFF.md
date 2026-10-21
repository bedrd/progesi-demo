# Progesi · handoff della demo

Questo file serve a chi riprende il lavoro, persona o Claude, per avere tutta la situazione senza rileggere le call. Aggiornato al 19 ottobre 2026. Quando cambiate qualcosa di importante, aggiornatelo nello stesso commit.

## Novità del 19 ottobre (ramo `normativa-in-evidenza`)

Riepilogo per chi riprende il lavoro dopo questa giornata. I dettagli tecnici sono anche nelle sezioni sotto (§4, §5, §7, §8, §9), già aggiornate.

**Perché.** Rileggendo la call 2, la domanda più importante di Giorgio era: "questi aggiornamenti normativi ci sono o no?". Nella demo la risposta c'era ma era nascosta. In più la demo va mostrata ai soci anche senza nessuno che la presenti, quindi deve capirsi da sola.

**1. Aggiornamenti normativi in evidenza**
- In cima a Impostazioni c'è la sezione "Aggiornamenti normativi". Dice chi li fa (intermediario SdI, Altalogik con il contratto di manutenzione, il commercialista), come arriva un aggiornamento (4 passi), il registro degli aggiornamenti, le regole già attive e l'alternativa di un gestionale contabile con API.
- Il registro (`NORME`) contiene solo novità vere e verificate: specifiche FatturaPA 1.9 (dal 1 aprile 2025) e 1.9.1 (dal 15 maggio 2026). Quando ne esce una nuova, va aggiunta in cima.
- In cima a Contabilità c'è l'etichetta "Normativa aggiornata: SdI 1.9.1", che apre la stessa sezione in un riquadro. Lo stesso riquadro si apre anche dal link nel riquadro laterale "Chi tiene aggiornata la normativa".
- La riga Prova della direzione rimanda a Impostazioni.

**2. Niente più Zucchetti né G1**
- Nella demo non c'è più il nome del vecchio gestionale né un confronto con lui, neanche nel codice. Un test lo controlla.
- "Passaggio da Zucchetti G1" è diventato "Avvio: i vostri dati qui dentro".
- La scheda "Da G1 a qui" è diventata "Cosa c'è dentro".
- Identificatori rinominati: `passaggioG1` → `avvioDati`, `DA_G1` → `COPERTURA`, `STATO_G1` → `STATO_COP`, scheda `g1` → `copertura`, azione `passo-g1` → `passo-avvio`. Tolto `S.zuc`, che non serviva più.

**3. Facile a primo impatto**
- **Barra scura della demo** in alto (`#barra-demo`): dati di esempio, "Guarda come" con i quattro ruoli (tolti dall'header), "Suggerimenti" per spegnere le righe Prova, "Guida".
- **Benvenuto** alla prima apertura: come si usa la demo e da dove partire, per ruolo. Si riapre da "Guida". Non compare nei test automatici.
- **Parole tecniche spiegate**: sottolineate a puntini, con la spiegazione al passaggio o al tocco (`GLOSSARIO`, `glossa()`).
- **Menu della direzione più corto**: Tecnici e Analisi uniti in "Lavori e margini"; Amministrazione parte chiusa e si apre dal titolo.
- **Numerini**: grigi per le cose da fare, arancio solo per le urgenti (fatture scadute, scartate, pagamenti entro 7 giorni).
- **Prezzi e margini**: 4 colonne di partenza; "Mostra ore e anno scorso" apre le altre.
- **Preventivo**: una riga sola, "Prezzo consigliato 1.650 €: a 900 € ci guadagnate solo il 9%", con "Usa 1.650 €"; il calcolo è sotto "Come lo calcolo".
- **Sicurezza e conformità**: aggiunta la riga Prova che mancava.

**4. Nota di credito**
- In Fatture emesse, in cima, c'è la FT 399 di Officine Meccaniche Serio con la richiesta del cliente (corso annullato, storno di 650 € più IVA) e il pulsante "Nota di credito". La nota si può fare anche su qualsiasi altra fattura, dalla sua anteprima.
- La nota parte allo SdI come una fattura e diventa NC 1. Si correggono da soli fatturato del mese, registro IVA vendite, liquidazione, prima nota e scadenzario.
- L'XML è di tipo TD04 e richiama la fattura che storna.
- Se la fattura è già pagata, la nota si scala dalla prossima fattura oppure si rimborsa con bonifico; se è aperta, il cliente paga solo la differenza.
- La stessa decisione è nella Sala agenti, sotto il Fatturatore.
- Nel codice: `NOTE`, `NC_RICH`, `resto(f)`, `aperta(f)`, `anteprimaNota()`, `FORM.nc`.

**5. Sala agenti rifatta** (stesso ufficio, stessi reparti, stesso stato)
- **Riepilogo in una frase**: cose fatte, ore risparmiate, quante decisioni da guardare e quante di routine.
- **Stanze per reparto**: etichette cliccabili con "N per voi". Su ogni agente c'è il pallino di stato (ambra = aspetta voi) e il numero di decisioni.
- **Fuoco**: clic su una stanza o su un agente e la scena si ingrandisce su quella stanza, le altre si spengono, a destra compare la scheda della stanza.
- **Prossima decisione in grande**, una alla volta: Sì, No, Vedi nel gestionale, Più tardi. Sotto, le altre raggruppate per reparto.
- **Routine e da guardare**: "Approva le N" approva solo quelle di routine. Quelle che toccano prezzi, soldi o clienti si decidono una per una.
- **Nastro "Cosa hanno appena fatto"** sotto la scena: ogni voce porta alla pagina del gestionale.
- **Numeri**: sotto la scena restano 3 numeri invece di 6; i calcoli sono sotto "Come si calcolano questi numeri".

**6. Test**
- 114 controlli, tutti OK: giro 33, sala 31, amministrazione 50. La console stampa 44/44.
- I selettori dei ruoli ora sono `#barra-demo [data-a="ruolo"]`. In `verifica.js` il test dei clic aspetta che finisca l'animazione del ritorno a tutto l'ufficio.
- **Se sul PC non c'è Chrome**: si scarica Chrome headless con `npx @puppeteer/browsers install chrome-headless-shell@stable`. Poi si lancia `npm test` con `CHROME_PATH` impostato sul file `chrome-headless-shell.exe` scaricato.

**7. Cosa resta da fare**
- **Pubblicare su Netlify** dopo l'unione su `main`, con il comando del §10. Il sito online è ancora la versione di prima: niente di tutto questo, e ci sono ancora i nomi del vecchio gestionale. Va fatto prima che Giorgio mandi il link ai soci.
- **Chiedere a chi fa l'amministrazione** le voci "da verificare" in "Cosa c'è dentro": ritenute d'acconto, split payment, IVA mensile o trimestrale, cespiti.
- **Preparare il documento scritto** promesso da Mihail (GDPR, sicurezza informatica, Agenzia delle Entrate) entro il 2 novembre.

## 1. In breve

- **Cos'è**: una demo commerciale, frontend puro e in un solo file (`progesi.html`), di una piattaforma gestionale con agenti AI per **Progesi S.r.l.**, società di Offanengo (CR) che fa sicurezza sul lavoro (DVR, RSPP, formazione, medicina del lavoro, ambiente, antincendio, acustica, HACCP).
- **Online**: https://progesi-demo-b376.netlify.app
  - Link diretto per chi fa l'amministrazione: https://progesi-demo-b376.netlify.app/#amministrazione (funziona anche `?ruolo=amm`, `#direzione`, `#responsabile`, `#tecnico`).
- **Prossima scadenza**: presentazione lunedì **2 novembre, ore 14:30**, di persona da Progesi a Offanengo. Presentano Mihail (Catana) ed Ervin (BD Media). Prima del 2, Giorgio vuole un'anteprima da far vedere ai due soci. Obiettivo dichiarato dal cliente: demo "al 90%".
- **Persone lato cliente**:
  - **Giorgio**, direttore commerciale, l'interlocutore delle call;
  - **due soci**, uno dei due segue i tecnici e confronta le ore;
  - **chi fa l'amministrazione** in Zucchetti G1: non è mai stato in call e il nome non lo sappiamo (in demo è "Elena Moretti").
- **Stato**: la demo copre tutto quello che è stato chiesto nelle due call. Ha passato tre giri di verifica indipendenti più un giro finale, e 114 controlli automatici (vedi §9). I limiti noti sono al §11.

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
- **Colori**: rosso Progesi `#DD0000` solo per marchio, navigazione attiva e azioni. **Grafici e barre in grafite** (`#3A3A3A`), mai rossi. Eccezione voluta: la scena della Sala agenti usa la palette del marchio (sedute, nomi dei reparti stampati sui tappeti, numerini), come chiesto il 21 ottobre.
- **Font**: Ubuntu per i titoli, Lato per testi e numeri (`.num` con cifre tabellari), IBM Plex Mono solo per le causali bancarie. Angoli squadrati, tono sobrio.
- **Testi in italiano, mai il trattino lungo** (né `—` né `–`). Tono concreto, niente gergo. Usare `pl()` per singolare e plurale.
- **Ogni vista ha la riga "Prova:"**, che guida chi presenta (helper `prova()`). Si spengono tutte da "Suggerimenti" nella barra della demo (`S.guida`).
- **Facile a primo impatto**, per chi non conosce il software:
  - **menu**: Tecnici e Analisi sono un solo gruppo ("Lavori e margini"); per la direzione i gruppi con più di 4 voci partono chiusi (Amministrazione), salvo che ci siate dentro, e si aprono dal titolo (`aperto()`, `S.navAperti`, azione `nav-gruppo`). Da chiuso il titolo mostra quante voci e il totale dei numerini;
  - **numerini**: grigi (`.badge.calmo`) per le cose da fare, arancio solo per le urgenti (`urgente` in `renderNav`: fatture scadute senza sollecito, fatture scartate, pagamenti entro 7 giorni). Anche i numerini delle schede sono grigi; la campanella resta arancio;
  - **Prezzi e margini**: di partenza 4 colonne (servizio, prezzo medio, margine, giudizio); "Mostra ore e anno scorso" apre le altre (`S.margDett`);
  - **preventivo**: la riga sotto il servizio dice "Prezzo consigliato 1.650 €: a 900 € ci guadagnate solo il 9%" con "Usa 1.650 €"; il calcolo è sotto "Come lo calcolo" (`hintRiga`);
  - **barra della demo** (`#barra-demo`, scura, sopra tutto): dati di esempio, "Guarda come" con i quattro ruoli, "Suggerimenti" e "Guida". I comandi della demo stanno lì, separati dal gestionale vero; nell'header resta solo "Gestionale · Sala agenti";
  - **benvenuto** (`benvenuto()`): si apre la prima volta (ricordato in `localStorage`, mai nei test automatici perché `navigator.webdriver`), spiega in quattro righe come si usa la demo e fa scegliere da dove partire; si riapre da "Guida";
  - **parole spiegate** (`GLOSSARIO`, `glossa()`): la prima volta che una parola tecnica compare in una pagina o in un riquadro è sottolineata a puntini, e passandoci sopra o toccandola compare la spiegazione. Non tocca pulsanti, titoli, numeri e righe Prova. Per una parola nuova basta aggiungere una riga a `GLOSSARIO`.
- **Non si perde niente** passando tra Gestionale e Sala, o cambiando ruolo: lo stato è uno solo.
- **Nella demo non c'è il nome del vecchio gestionale, né un confronto con lui** (né "Zucchetti" né "G1", neanche nel codice): Progesi vuole staccarsene e la demo si presenta già come il loro gestionale. Il passaggio dei dati si chiama "Avvio". Un test lo controlla (`amm-test.js`).
- Nella demo non ci sono marchi reali di fornitori (intermediario SdI e open banking restano generici), né banche reali.

## 5. Com'è fatto `progesi.html` (circa 2.450 righe)

L'ordine nel file:

1. **CSS**:
   - token Tailwind in `@theme` (petrolio = rosso #DD0000, grafite, inchiostro, carta, ok, ambra, arancio, grigio #555);
   - componenti (`.card`, `.btn`, `.seg`, `.chip`, `.tab-t`, `.kanban`);
   - tabelle `.impila`, che diventano schede: sotto i 640 px, sotto i 1300 px con `.larga`, sotto i 1400 px con `.larghissima`;
   - stili della Sala;
   - blocco **"variante vetro"**: superfici traslucide con `backdrop-filter`, sfondo a luci tenui, ripiego per `prefers-reduced-transparency` e per i browser senza sfocatura.
2. **HTML**: barra della demo `#barra-demo` con il selettore ruolo, poi barra laterale `#nav`, header con cerca, avvisi e selettore modo. Sotto i 1280 px il selettore modo va in una seconda barra (`#barra-modo`). Poi `#vista`, dove si disegna la pagina, `#modale` e `#toast`.
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
   - `NOTE` (note di credito della sessione, numerate NC 1, 2, ...), `NC_RICH` (la richiesta di esempio: il cliente della prima fattura del mese con il corso lavoratori ha annullato il corso già pagato, storno di 650 € più IVA), `MOTIVI_NC`; `resto(f)` è quanto resta da incassare tolti pagamenti e note, `aperta(f)` esclude le fatture incassate o stornate del tutto. Una nota abbassa il fatturato del mese (`S.mese.fatt`), entra nel registro IVA vendite in negativo, scrive in prima nota ricavi e IVA in dare e crediti in avere, ed esce come XML TD04 con `DatiFattureCollegate`. Se la fattura è già pagata il credito si scala dalla prossima fattura (nello scadenzario) o si rimborsa con bonifico; se è aperta il cliente paga solo la differenza;
   - `PASSIVE`: fatture dei fornitori, una per ordine fornitore; le visite mediche sono esenti, art. 10;
   - `CONTI`: conto principale e conto anticipi;
   - `MOVBANCA`: movimenti arrivati durante la sessione;
   - `FISSI` e `PAGHE`: affitto, stipendi, F24 e la scrittura paghe del mese;
   - `NORME` (registro degli aggiornamenti normativi, il più recente per primo), `REGOLE_ATTIVE`, `CHI_NORMA`, con `normativaCorpo()` (sezione completa, in Impostazioni e nel riquadro `data-a="normativa"`), `chipNorma()` e il riquadro laterale `NORMATIVA`;
   - funzioni `registroVendite()`, `registroAcquisti()`, `liquidazione()`, `movimentiBanca()`, `saldoConto()`, `primaNota()`, `daPagare()`, `PASSI_AMM()` (i 6 passi del mese), `xmlFattura()` (XML FatturaPA scaricabile), `anteprimaFattura()`, `avvioDati()`, `COPERTURA`.
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
- **Impostazioni, primo riquadro "Aggiornamenti normativi"**: è la risposta alla domanda più importante della call 2 ("questi aggiornamenti normativi ci sono o no?"). Chi li fa, come arrivano in 4 passi, registro degli aggiornamenti con le novità vere, regole già attive, alternativa di un gestionale contabile con API. Lo stesso riquadro si apre dall'etichetta "Normativa aggiornata" in cima a Contabilità e dal link nel riquadro laterale "Chi tiene aggiornata la normativa".
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
  - Fatture: nota di credito sulla fattura in cima con la richiesta del cliente (corso annullato), "Invia allo SdI", poi apri la NC 1. La stessa decisione è nella Sala, sotto il Fatturatore;
  - Banca: collegamento diretto (opzionale), FT 431 abbinata da sola;
  - scheda "Cosa c'è dentro": l'avvio dei dati e la lista di tutto quello che fa l'amministrazione e dove si fa qui.
- **Sala agenti**: decidi la prossima decisione nel pannello del Coordinatore (o "Approva le N" di routine) e ritrovala fatta nel gestionale. Poi clicca la stanza Contabilità per metterla a fuoco, o il Preventivista e "Vedi nel gestionale".

## 8. Sala agenti (modulo `SALA`)

- **Scena**: SVG isometrico generato da codice (`scena()`), semi-flat, con la palette del sito Progesi: rosso `#DD0000`, antracite `#303030`/`#3A3A3A`, superfici chiare. Pavimento in legno chiaro, muri bianco panna, tappeti grigio chiarissimo, scrivanie bianche con gambe antracite, monitor sottili con l'interfaccia rossa di Progesi (`postazione()`), sedie da ufficio nel colore del reparto (`sedia()`), persone con carnagioni, capelli e vestiti diversi (`persona()`). I colori dei reparti (`REP`) sono nella famiglia del marchio: Commerciale rosso, Contabilità antracite, Operatività rosso scuro, Risorse umane rosso chiaro. Sopra la scena ci sono i nomi degli agenti come testo pulito, senza box (`badges()`, aggiornati sul posto da `aggiornaBadges()` per non perdere clic e focus), con il numerino rosso delle decisioni che aspettano; i fumetti di lavoro sono scuri e sottili. Su telefono resta il pallino di stato (rosso = aspetta voi).
- **Zoom libero**: una sola telecamera (`camera()`): segue il fuoco della stanza (`camFuoco()`), oppure è libera (`st.cam`, da 100% a 400%, `limita()` tiene la scena senza buchi ai bordi).
  - Comandi in basso a destra della scena: −, livello in %, + e "Tutto l'ufficio" (`sala-zoom`).
  - Ctrl o ⌘ + rotella, o il pizzico sul trackpad, avvicina dove punta il mouse (`zoomIn()`). La rotella da sola fa scorrere la pagina e mostra un aiuto.
  - Trascinando ci si sposta; dopo un trascinamento il clic non apre l'agente sotto il mouse.
  - Da tastiera: + e − per lo zoom, 0 per tutto l'ufficio.
  - Su telefono si usano due dita, e da vicino (`.vicino`, da 180%) tornano i nomi degli agenti e dei reparti.
  - I nomi degli agenti crescono poco con lo zoom (`--k`, animata con `@property`), le scritte sui tappeti crescono con il pavimento.
  - Gesti installati una volta in `gestiZoom()`.
- **Stanze** (`stanze()`): il nome del reparto è **stampato sul tappeto**, sul lato est, con la stessa prospettiva del pavimento (pulsante HTML con `transform: matrix(.866,-.5,.866,.5,0,0)`, misura in `cqw` così segue la scena), in rosso Progesi grassetto, con accanto il numerino rosso delle decisioni per voi. Cliccandolo la stanza va a fuoco (`zoomTarget()`, `zooma()`, transizione di 0,6 secondi), gli agenti e le scritte delle altre stanze si spengono (`.fuori`) e a destra compare la scheda della stanza (`pannelloStanza()`). Le stanze che il ruolo non segue sono spente (`.spento`, `.spenta`). Su telefono le scritte sui tappeti spariscono e si usano i titoli dei reparti nell'elenco sotto.
- **Riepilogo** in una frase sotto il saluto: cose fatte, ore risparmiate, quante decisioni da guardare e di routine. Sotto la scena: legenda, nastro "Cosa hanno appena fatto" (`nastroHtml()`, le ultime 4, ognuna porta alla pagina del gestionale) e tre numeri (`kf-0`, `kf-1`, `kf-5`); il dettaglio dei calcoli è in "Come si calcolano questi numeri". La lavagna disegnata è decorativa.
- **Agenti** (`AG`): Coordinatore (regia); Commerciale: Preventivista, Richieste, Rinnovi; Contabilità: Fatturatore, Incassi, Fornitori; Operatività: Pianificatore, Scadenze, Archivista; Risorse umane: Ore e timbrature (modulo opzionale). Ogni agente ha `fa`, `nonFa`, `fonti`, `vista` (pagina del gestionale) e `min` (minuti risparmiati per azione).
- **Decisioni**: `decisioni()` le **calcola dallo stato del gestionale**, non sono salvate a parte. Una cosa fatta nel gestionale sparisce dalla Sala e viceversa. Le scelte chiamano le stesse azioni del gestionale (`AZ_.fattura`, `FORM.assegna`, `AZ_.proponi`, …).
- **Prossima decisione e peso** (`ordinate()`, `peso()`): il pannello del Coordinatore mostra in grande una decisione alla volta ("1 di N", Sì, No, Vedi nel gestionale, "Più tardi" la manda in fondo), poi le altre raggruppate per reparto. **Da guardare** sono quelle che toccano prezzi, soldi o clienti (`GUARDARE`: preventivi, rinnovi, note di credito, abbinamenti dubbi, acconti, solleciti) e vengono prima; le altre sono **di routine** e "Approva le N" (`sala-tutte`) approva solo quelle.
- **Filtro per ruolo** (`REP_RUOLO`): la direzione vede tutto, il resp. tecnico vede operatività e risorse umane, l'amministrazione vede contabilità e risorse umane.
- **"Vedi nel gestionale"**: `vistaAg()` porta alla pagina giusta; Scadenze e Archivista aprono la scheda del cliente. Se il ruolo non vede quella pagina, il pulsante non c'è e una riga dice chi la vede.
- **Battito**: ogni 3,8 secondi un evento del `COPIONE`, cioè controlli in sola lettura che finiscono in fumetti e nel nastro. **Non aumenta i contatori**: salgono solo con le decisioni approvate e con le azioni fatte nel gestionale (`SALA.racconta`).
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
  - `sala-test.js`: la Sala agenti, con routine e da guardare, stanze a fuoco e nastro (31 controlli);
  - `amm-test.js`: l'amministrazione dal primo all'ultimo passo, più gli aggiornamenti normativi, più barra della demo, benvenuto, parole spiegate, nota di credito, menu, numerini, margini e prezzo consigliato, con le schermate a 1440 e 390 px in `test/shots/` (50 controlli);
  - `zoom-prova.js`: zoom libero della Sala, con pulsanti, rotella, trascinamento, tastiera e due dita su telefono (17 controlli);
  - `verifica.js`: controlli di layout a 390, 768, 1024, 1280, 1366 e 1440 px, più punti specifici della Sala. Segnala come "NO" anche cose volute:
    - titoli brevi come "Banca" sotto gli 80 px;
    - su telefono la barra delle schede di Contabilità e la matrice dei permessi che scorrono di lato;
    - a 1600 px, agenti sotto la piega.
- Prima di ogni commit: `npm test`, tutto OK e "ERRORI: nessuno". Se cambiate un testo che un test cerca, aggiornate il test.

## 10. Pubblicazione

- **Sito**: Netlify, team "BD Media", progetto `progesi-demo-b376` (https://progesi-demo-b376.netlify.app). Un secondo progetto, `progesi-demo-vetro-ba3d`, mostra la stessa versione ed è da tenere o cancellare.
- **Cosa si pubblica**: `netlify.toml` copia solo `progesi.html` in `dist/index.html` e aggiunge `X-Robots-Tag: noindex`. Transcript, PDF e demo dominicis non vanno online.
- **Oggi** si pubblica a mano dal PC di Bedr, con la CLI di Netlify (da Git Bash, Mac o Linux):
  ```bash
  mkdir -p dist && cp progesi.html dist/index.html
  npx netlify-cli deploy --prod --no-build --dir dist --site 04760a10-b90e-47f4-8bde-aa7a3cbb6757
  ```
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

**Aggiornamenti normativi (registro `NORME`)**
- Ci vanno solo novità vere e verificate, mai inventate. Oggi: specifiche tecniche FatturaPA 1.9, dal 1 aprile 2025 (TD29, RF20), e 1.9.1, pubblicate il 31 marzo 2026 e applicabili dal 15 maggio 2026 (nuovi controlli, gruppi IVA). Fonti: Agenzia delle Entrate, IPSOA, Assolombarda.
- Quando esce una versione nuova, va aggiunta in cima a `NORME`: l'etichetta "Normativa aggiornata" la prende da lì.
- La promessa resta quella di `fattibilita.md` (R5): tempi scritti nel contratto di manutenzione, niente di più.

**Da chiedere al cliente**, e già elencate nella scheda "Cosa c'è dentro"
- Ritenute d'acconto, split payment, periodicità IVA (mensile o trimestrale), cespiti.
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
