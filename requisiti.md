# Progesi S.r.l. · requisiti demo, seconda iterazione

Fonte: `transcript-call2.txt` (call di feedback con Giorgio, Mihail Catana, Ervin BDMedia), più `transcript.txt` della prima call per quello che resta valido.
Prossima presentazione: lunedì 2 novembre, ore 14:30, di persona da Progesi a Offanengo. Presentano Mihail ed Ervin. Giorgio vuole un'anteprima prima del 2 per farla vedere ai soci. Obiettivo dichiarato: demo "al 90%".
Demo di partenza: `progesi.html` (online su https://progesi-demo-b376.netlify.app). Tutto quello che c'è già resta, salvo dove scritto qui sotto.

## Flaw della call

- **Scope raddoppiato senza prezzo nuovo.** Si passa da "piattaforma accanto a Zucchetti" a "sostituto di Zucchetti G1 con tutta la contabilità". La quotazione interna era 17.000 € sullo scope della prima call, e il 2 novembre Mihail porta proposta e contratto.
- **Promesse da verificare prima del 2:**
  - Ervin ha detto "tranquillamente fattibile" per contabilità completa con aggiornamenti normativi, "come quelle più famose". Zucchetti e TeamSystem hanno team dedicati alla normativa: costruirla e mantenerla in casa non sta in questo budget.
  - "Noi ce l'abbiamo, si chiama Fabric": è Fabrick (gruppo Sella), istituto di pagamento autorizzato come AISP. Va verificato che il contratto esista davvero, non solo un contatto.
  - Il fornitore SdI e conservazione è "potenziale" per sua stessa ammissione.
- **Giorgio ha già aperto un'alternativa:** cambiare gestionale con uno che si collega (TeamSystem o simili) invece di fare tutto dentro. È un'opzione da tenere in proposta, non da scartare.
- **Decisori e utenti chiave assenti:**
  - i due soci non hanno ancora visto la demo per un ritardo nell'accesso;
  - chi fa l'amministrazione, cioè chi usa G1 ogni giorno, non è mai stato in call. Giorgio chiede esplicitamente una demo "per chi fa la mia amministrazione".
- **Il bilancio resta al commercialista** (prima call: "ogni tre mesi abbiamo il bilancio che ci fa il commercialista"). Nessuno l'ha detto in call, ma va messo nero su bianco per non promettere dichiarativi e bilancio.
- **Documentazione legale promessa** (GDPR clienti, cybersecurity, adempimenti Agenzia delle Entrate): qualcuno la deve scrivere entro il 2 novembre.

## Wedge

**L'amministrazione senza Zucchetti, vista con gli occhi di chi la fa.** È la cosa che Giorgio ha chiesto di sua iniziativa e ripetuto tre volte:
- "quello che non ci torna è la parte amministrativa";
- "devo assicurarmi che... ci sia tutto quello che ci serve per l'amministrazione e la contabilità";
- "verificare se dentro la contabilità... c'è tutto quello che effettivamente di là fanno".

Per chi fa l'amministrazione la demo si apre con il link `progesi.html#amministrazione` (oppure `?ruolo=amm`), direttamente su Contabilità, con un mese tipo: fatture emesse allo SdI, fatture dei fornitori ricevute, incassi abbinati dalla banca, pagamenti in scadenza, prima nota, IVA del periodo, pacchetto per il commercialista.

## Requisiti

| ID | Funzione | Chi l'ha detta | Citazione breve | Reazione del cliente | Decisione |
|---|---|---|---|---|---|
| R1 | Togliere la scelta "con / senza Zucchetti": la piattaforma è il gestionale | Mihail | "togliere la parte senza zucchetti, la demo diventerà il sostitutivo di zucchetti" | Giorgio: "Ok" | DENTRO |
| R2 | Contabilità operativa in piattaforma: piano dei conti, prima nota generata da fatture, incassi e pagamenti, registri IVA, liquidazione periodica, scadenzario | Giorgio | "ci sia tutto quello che ci serve per l'amministrazione e la contabilità" | Domanda principale della call | DENTRO |
| R3 | Fattura elettronica attiva tramite intermediario SdI accreditato, con stato (inviata, consegnata, scartata) e conservazione a norma | Ervin | "un fornitore di certificazioni... che lavora a mo' di fatturazioni elettroniche" | Nessuna obiezione | DENTRO |
| R4 | Fatture passive ricevute dallo SdI, registrate da sole e messe in scadenzario pagamenti | Giorgio (implicito) | G1 fa "gestione ordini fornitore e clienti e arriva fino alla prima nota" (prima call) | Necessario per sostituire G1 | DENTRO |
| R5 | Aggiornamenti normativi garantiti | Giorgio | "questi aggiornamenti normativi ci sono o no?" | Preoccupazione esplicita | DENTRO (pagina che dice chi li garantisce) |
| R6 | Collegamento diretto al conto con open banking (Fabrick), movimenti che arrivano da soli e si abbinano alle fatture | Ervin | "collegamento diretto alla banca con chiavi API" | Giorgio: "Quello è ancora da verificare" | OPZIONALE |
| R7 | Estratto conto caricato a mano e letto dall'AI | Ervin | "la prima è umana... e la E poi ti estrae tutto l'estratto di conto" | Già in demo, nessuna obiezione | DENTRO (c'è già) |
| R8 | Passaggio da Zucchetti G1: anagrafiche, fatture aperte, scadenze, saldi | Ervin | "bisogna estrapolare quante più informazioni si abbia dal G1" | Giorgio lo dà per scontato | DENTRO (anteprima della procedura) |
| R9 | Percorso demo per chi fa l'amministrazione | Giorgio | "una demo così per capire anche con chi fa la mia amministrazione" | Richiesta diretta | DENTRO |
| R10 | Sala agenti AI: ufficio con gli agenti al lavoro, si clicca un agente e si vede cosa fa | Mihail, Ervin | "come quando entri in ufficio e vedi tutti i dipendenti che lavorano" | Giorgio: "va bene, prova a mettermela dentro" | DENTRO |
| R11 | Agenti divisi in quattro reparti: commerciale, contabilità e fatturazione, operatività, risorse umane | Ervin | "la parte commerciale, la contabilità... l'operatività... le risorse umane" | Nessuna obiezione | DENTRO |
| R12 | Agenti che preparano i preventivi e assegnano i lavori in background, con decisioni approvate dalla direzione | Mihail | "quelli che ti fanno i preventivi, quelli che ti fanno l'allocazione delle risorse" | Accolta | DENTRO |
| R13 | Pagina sicurezza e conformità (GDPR, cybersecurity, Agenzia delle Entrate), con il documento scritto a parte | Mihail | "cyber security, agenzia delle entrate... tutti gli adempimenti" | Giorgio: "è giusto" | DENTRO (pagina sintetica), documento FUORI dalla demo |
| R14 | Bilancio, dichiarativi, F24 delle imposte | nessuno in call 2 | Prima call: il bilancio lo fa il commercialista | Funziona oggi | FUORI (la piattaforma esporta, il commercialista chiude) |
| R15 | Paghe | Prima call | "abbiamo uno studio che fa le paghe" | Funziona oggi | FUORI |
| R16 | Nuovo metodo di visualizzazione del software | Bedr | Vista "Sala agenti" selezionabile dall'header, accanto al cambio ruolo | Definita dopo la call | DENTRO |

## Criteri di accettazione

**R1, via Zucchetti**
- In Impostazioni non c'è più la scelta del collegamento.
- Spariscono le frasi "La fattura la emette sempre Zucchetti", "Passa a Zucchetti", "dalle fatture emesse in Zucchetti".
- "Manda in fatturazione" diventa "Emetti fattura elettronica".
- La riga di Cascina Rosa (DVR, 900 €) diventa FT 432 inviata allo SdI. Lo stato passa da "inviata" a "consegnata" in pochi secondi.

**R2, contabilità**
- Una nuova vista Contabilità, con schede:
  - Prima nota;
  - Registri IVA (vendite e acquisti);
  - Liquidazione IVA del periodo;
  - Scadenzario clienti e fornitori;
  - Piano dei conti.
- La prima nota si popola da sola: emettere FT 432 crea la scrittura cliente a ricavi e IVA a debito; confermare il bonifico di Carpenteria Oglio crea banca a cliente.
- La liquidazione di ottobre mostra IVA a debito, IVA a credito e saldo, calcolati dai dati della demo: niente numeri scritti a mano.
- Il pulsante "Pacchetto per il commercialista" scarica il file del periodo.

**R3, fattura elettronica attiva**
- La lista fatture emesse mostra numero, cliente, importo, stato SdI e data di consegna.
- Una fattura scartata, per esempio con partita IVA errata, mostra il motivo dello scarto e "Correggi e rinvia".
- L'anteprima mostra la fattura in formato leggibile e "XML FatturaPA" scaricabile.
- Una riga in pagina dice: "Inviata tramite intermediario accreditato, conservata a norma per 10 anni".

**R4, fatture passive**
- In arrivo c'è la fattura del Laboratorio Analisi Padano (3.820 €, ordine fornitore già presente).
- La fattura si abbina all'ordine fornitore e finisce in scadenzario pagamenti.
- "Registra" crea la scrittura in prima nota e l'IVA a credito.

**R5, aggiornamenti normativi**
- Pagina o riquadro "Chi tiene aggiornata la normativa", con tre righe:
  - tracciati SdI e conservazione: l'intermediario accreditato;
  - aliquote e regole contabili: Altalogik con contratto di manutenzione;
  - bilancio e dichiarativi: il commercialista.
- Nessuna promessa oltre questo.

**R6, open banking (opzionale)**
- In Banca, "Collega il conto" mostra il flusso di consenso: scelta della banca, autorizzazione, conto collegato.
- I movimenti arrivano con l'etichetta "dalla banca", senza caricare il file.
- Un riquadro "Modulo opzionale" spiega che il collegamento passa da un fornitore autorizzato da Banca d'Italia, e che resta sempre possibile caricare l'estratto a mano.

**R7, estratto manuale**
- Resta il flusso attuale di Incassi, con il caso Carpenteria Oglio senza numero fattura in causale.

**R8, passaggio da G1**
- In Impostazioni, "Passaggio da Zucchetti G1" mostra cinque passi con stato:
  1. esportazione dal G1;
  2. anagrafiche clienti e fornitori;
  3. fatture aperte e scadenze;
  4. saldi di apertura;
  5. controllo con l'amministrazione.
- Contatori di esempio: 214 contratti, 12 clienti mostrati, 13 fornitori.
- Una riga dice che i dati restano anche in G1 fino alla chiusura dell'anno.

**R9, percorso amministrazione**
- Il ruolo Amministrazione si apre su Contabilità, con i riquadri "Prova" in sequenza:
  1. emetti FT 432;
  2. registra la fattura del laboratorio;
  3. carica l'estratto e conferma Carpenteria Oglio;
  4. guarda la prima nota;
  5. apri la liquidazione IVA;
  6. scarica il pacchetto per il commercialista.
- Tutto si completa in meno di 5 minuti.

**R10, sala agenti**
- Una vista "Sala agenti", con lo stesso modello della demo Altalogik in `sala-agenti/altalogik-sala-agenti.html`:
  - pianta dell'ufficio con un agente per scrivania, raggruppati per reparto;
  - un contatore "N agenti al lavoro";
  - pannello del Coordinatore con le decisioni che aspettano Giorgio;
  - "Cosa hanno appena fatto gli agenti" che scorre dal vivo;
  - "Pausa".
- Si clicca un agente e si vede: cosa sta facendo adesso, cosa ha fatto oggi, cosa non fa da solo, e un campo "Chiedi cosa sta facendo" con una risposta di esempio.

**R11, reparti e agenti**
- **Commerciale**:
  - Preventivista: prepara i preventivi con il prezzo dallo storico;
  - Rinnovi: contratti in scadenza sotto prezzo;
  - Richieste: legge le email e crea le richieste in Trattative.
- **Contabilità e fatturazione**:
  - Fatturatore: emette allo SdI i lavori chiusi;
  - Riconciliatore: abbina gli incassi;
  - Fornitori: registra le fatture passive;
  - Solleciti: fatture scadute.
- **Operatività**:
  - Pianificatore: assegna i lavori sul carico dei tecnici;
  - Documenti: archivia DVR e verbali.
- **Risorse umane**:
  - Ore e timbrature: confronta i due file e prepara il file per lo studio paghe.

**R12, decisioni**
- Almeno 4 decisioni in attesa, ognuna con i suoi dati veri della demo:
  - "Trafilerie Adda: proporre il DVR a 1.650 € invece di 900 €?" (Preventivista);
  - "Studio Dentistico Ferla: lo assegno a Sara giovedì?" (Pianificatore);
  - "Carpenteria Oglio: bonifico senza numero fattura, lo abbino alla FT 426?" (Riconciliatore);
  - "Officine Serio: proporre il rinnovo RSPP a 2.400 €?" (Rinnovi).
- Approvare una decisione fa la stessa cosa del pulsante nella pagina relativa, e le due viste restano allineate.
- Una riga ripete: "Gli agenti lavorano, Giorgio decide: niente parte senza un ok".

**R13, sicurezza e conformità**
- Pagina con quattro blocchi:
  - dati dei clienti (GDPR, dove stanno, chi accede);
  - sicurezza (accessi per ruolo, registro delle operazioni, backup);
  - fatture e conti (SdI, conservazione, open banking autorizzato);
  - documento completo in arrivo.
- Niente certificazioni dichiarate che non abbiamo.

## Ruoli della demo

| Ruolo | Chi | Cosa fa nella demo |
|---|---|---|
| Direzione | Giorgio, direttore commerciale e socio | Decide: approva le decisioni degli agenti, guarda margini e controllo di gestione |
| Soci | Legale rappresentante e responsabile tecnico | Guardano. Il responsabile tecnico usa Pianificazione |
| Amministrazione | La persona che oggi usa G1, nome da chiedere (in demo Elena Moretti) | Opera: contabilità, fatture, banca, fornitori. È il wedge |
| Responsabile tecnico | Socio | Assegna i lavori, vede il carico dei tecnici |
| Tecnico | Paolo Ferri | Chiude i lavori dal telefono |

## Viste

**Nuove**
- Contabilità: prima nota, registri IVA, liquidazione, scadenzario, piano dei conti.
- Fatture: emesse con stato SdI, ricevute.
- Banca: conti, movimenti, collegamento open banking come opzionale.
- Sala agenti.
- Passaggio da G1 (in Impostazioni).
- Sicurezza e conformità.

**Da cambiare**
- Impostazioni: senza la scelta Zucchetti.
- Incassi: senza "Passa a Zucchetti".
- Kanban: con "Emetti fattura elettronica".
- Controllo di gestione: "dalle fatture emesse", senza Zucchetti.

**Restano come sono**
- Preventivi e ordini, Trattative, Clienti, Contratti, Pianificazione, Prezzi e margini, Ordini fornitori, Ore e timbrature, Tecnico.

**Grafica**
- Resta una sola versione, `progesi.html`, con la grafica a vetro. La versione a superfici piene non c'è più.

## Dati di esempio

- **Aziende e servizi**: tutti quelli già in demo (clienti, servizi, tecnici, contratti, 13 ordini fornitori per 21.300 €), con il controllo `[check] 44/44` da mantenere.
- **Fatture emesse**: FT 399 a FT 431 nel mese, in ordine di numero e di data, tutte nel registro IVA vendite (FT 399-411 già incassate). FT 398 è del mese scorso ed è scaduta. FT 432 nasce dal primo lavoro chiuso da fatturare.
- **Fattura scartata**: una fattura di esempio con partita IVA errata, per esempio FT 430 a Impresa Edile Zucchi.
- **Fatture ricevute**: Laboratorio Analisi Padano 3.820 €, Studio medico convenzionato 950 € e 700 €, Antincendi Bassa Lombarda 2.140 €. Sono gli ordini fornitori già presenti.
- **Banca**: un conto principale e un conto anticipi, con nomi generici e senza banche reali. Movimenti dell'estratto già in demo.
- **IVA**:
  - aliquota 22% su tutti i servizi;
  - la liquidazione di ottobre si calcola dal registro vendite e dal registro acquisti;
  - visite mediche esenti IVA (art. 10): la fattura del medico va registrata esente. Va verificato con l'amministrazione.
- **Intermediario SdI e open banking**: in pagina "intermediario accreditato" e "fornitore open banking autorizzato da Banca d'Italia", senza marchi, finché i contratti non sono firmati.
- **Date**: le 15 della prima call restano; il "mese tipo" è ottobre.

## Stile

Invariato rispetto alla demo attuale:
- rosso Progesi #DD0000 solo su marchio, navigazione e azioni;
- grafici e barre in grafite;
- Ubuntu per i titoli, Lato per testi e numeri;
- angoli squadrati, tono sobrio;
- ogni vista con la riga "Prova:";
- mai il trattino lungo.

## Stato al 19 ottobre

Tutti i requisiti DENTRO e OPZIONALE sono nella demo, R1 a R13 e R16. In più, dopo la verifica:
- scheda "Da G1 a qui" in Contabilità: il passaggio da G1 e l'elenco di cosa fa oggi G1 e dove si fa qui, con le voci da verificare con chi fa l'amministrazione (note di credito, ritenute, split payment, periodicità IVA, cespiti);
- registro IVA vendite fattura per fattura; in banca anche stipendi, F24 e affitto, con la scrittura paghe del mese in prima nota;
- il responsabile tecnico vede Ore e timbrature, come il socio che oggi confronta i file.
