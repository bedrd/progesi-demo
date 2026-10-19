# Progesi S.r.l. · fattibilità, seconda iterazione

Riferimenti: `requisiti.md` (ID R1 a R16), `transcript-call2.txt`, PDF "Progesi - punti da verificare" per i punti della prima call ancora aperti.
Stime in giornate di sviluppo di una persona, per il software vero e non per la demo. Sono stime da validare con Ervin.

## Per requisito

### R1 · La piattaforma al posto di Zucchetti G1 · DENTRO
- **Come si fa**: il gestionale diventa la fonte unica di anagrafiche, ordini, fatture e incassi. Non si costruisce l'integrazione con G1 (punti 1 e 2 del PDF, rischio alto, ora superati). Si costruisce la migrazione (R8).
- **Integrazioni**: nessuna verso Zucchetti, se non l'export iniziale.
- **Dati da avere**: la lista di cosa fa oggi l'amministrazione in G1, operazione per operazione.
- **Rischio**: **medio**. Togliere G1 sposta su di noi la parte normativa (vedi R2 e R5).
- **Stima**: compresa in R2, R3 e R8. Sulla demo 0,5 giornate.

### R2 · Contabilità operativa · DENTRO
- **Come si fa**:
  - piano dei conti per una società di servizi;
  - motore di scritture in partita doppia generate dagli eventi: fattura emessa, fattura ricevuta, incasso, pagamento, giroconto;
  - registri IVA vendite e acquisti;
  - liquidazione IVA mensile o trimestrale con stampa;
  - scadenzario clienti e fornitori;
  - export per il commercialista (prima nota e registri in un formato che il suo software importa, da chiedere).
- **AI**: un agente propone il conto per le fatture passive nuove, e l'amministrazione conferma.
- **Integrazioni**: nessuna obbligatoria. In alternativa si può appoggiare il motore contabile a un software con API (per esempio TeamSystem, che Giorgio ha nominato).
- **Dati da avere**:
  - piano dei conti attuale da G1;
  - regime IVA (mensile o trimestrale);
  - casi particolari: split payment con la PA, reverse charge, ritenute d'acconto, prestazioni esenti come le visite mediche;
  - formato richiesto dal commercialista.
- **Rischio**: **alto**. È la parte che Zucchetti e TeamSystem mantengono con team dedicati. Basta un caso IVA non previsto per avere un errore fiscale.
- **Stima**: 25 a 35 giornate, così ripartite:
  - scritture ed eventi 8;
  - registri e liquidazione 8;
  - scadenzario 4;
  - piano dei conti e casi particolari 5 a 10;
  - export commercialista 3;
  - test con l'amministrazione 2.

### R3 · Fattura elettronica attiva e conservazione · DENTRO
- **Come si fa**: generazione dell'XML FatturaPA dai lavori e dai canoni, invio tramite intermediario accreditato, ricezione delle notifiche (consegna, scarto, mancata consegna) via webhook, aggiornamento dello stato, conservazione a norma affidata all'intermediario.
- **Integrazioni**: esistono API documentate con sandbox, per esempio Openapi.com (invio, ricezione, firma e conservazione, con notifiche SdI su endpoint configurabili) e A-Cube (accreditata presso l'Agenzia delle Entrate, con conservazione). Ervin dice di avere un contatto: va scelto e contrattualizzato uno.
- **Dati da avere**: dati fiscali di Progesi, numerazione attuale delle fatture, eventuali sezionali, canale PEC o codice destinatario.
- **Rischio**: **medio**. La tecnica è standard, ma serve un contratto con costo a fattura e i tracciati vanno tenuti aggiornati dal fornitore.
- **Stima**: 8 a 10 giornate (XML e validazione 3, invio e notifiche 3, conservazione e archivio 2, test in sandbox 1 a 2).

### R4 · Fatture passive dallo SdI · DENTRO
- **Come si fa**: ricezione dall'intermediario, lettura dell'XML, abbinamento all'ordine fornitore aperto (importo e fornitore), proposta del conto (agente), registrazione in prima nota e in scadenzario pagamenti.
- **Integrazioni**: lo stesso intermediario di R3.
- **Dati da avere**: elenco fornitori con partita IVA, conti di costo abituali.
- **Rischio**: **basso**.
- **Stima**: 5 a 6 giornate.

### R5 · Aggiornamenti normativi · DENTRO
- **Come si fa**:
  - **tracciati SdI e conservazione**: li aggiorna l'intermediario (è il suo mestiere);
  - **aliquote, regole contabili e nuovi adempimenti**: noi, con un contratto di manutenzione annuo e un commercialista di riferimento che segnala le novità;
  - **bilancio e dichiarativi**: restano al commercialista.
- **Rischio**: **alto lato contratto**. Va scritto chi risponde di cosa, altrimenti Giorgio pensa che sia tutto incluso "come Zucchetti".
- **Stima**: 2 giornate per la prima impostazione, più manutenzione da quotare a canone.

### R6 · Open banking con Fabrick · OPZIONALE
- **Come si fa**: consenso dell'utente presso la banca (PSD2, servizio di informazione sui conti), lettura dei movimenti a intervalli, abbinamento automatico alle fatture con la stessa logica dell'estratto manuale, rinnovo del consenso a scadenza.
- **Integrazioni**: Fabrick (gruppo Sella) è istituto di pagamento autorizzato da Banca d'Italia e AISP, e offre il servizio anche "licence as a service". L'accesso non sembra aperto a chiunque: va confermato che il nostro accordo esiste e cosa costa.
- **Dati da avere**: banche e conti di Progesi, se le banche sono raggiungibili tramite Fabrick.
- **Rischio**: **medio alto**. Dipende dal contratto, il consenso va rinnovato periodicamente, e Giorgio stesso ha detto "è ancora da verificare".
- **Stima**: 6 a 8 giornate.

### R7 · Estratto conto caricato a mano · DENTRO
- **Come si fa**: lettura di CSV, Excel o CBI, e AI per i PDF. Abbinamento per numero fattura in causale, poi per cliente e importo. Già previsto nella prima iterazione.
- **Rischio**: **basso** con CSV o CBI, **medio** con PDF.
- **Stima**: 3 a 4 giornate.

### R8 · Passaggio da Zucchetti G1 · DENTRO
- **Come si fa**:
  - estrazione dei dati da G1 (database in formato DBF ed export verso Excel, da confermare sulla loro versione);
  - mappatura di anagrafiche, fatture aperte, scadenze, saldi di apertura e piano dei conti;
  - import con controlli di quadratura;
  - un periodo in cui G1 resta in sola lettura.
- **Dati da avere**: copia del database o export, versione esatta di G1, quanti anni di storico servono.
- **Rischio**: **medio**. La qualità dei dati di partenza non si conosce, e la quadratura dei saldi va fatta con l'amministrazione.
- **Stima**: 6 a 10 giornate.

### R9 · Percorso per l'amministrazione · DENTRO
- **Come si fa**: ruolo con permessi propri (contabilità, fatture, banca, fornitori, ore) e una pagina iniziale con le cose da fare del giorno.
- **Rischio**: **basso**.
- **Stima**: 2 giornate (i permessi per ruolo sono già previsti).

### R10, R11, R12 · Sala agenti e agenti nei quattro reparti · DENTRO
- **Come si fa**:
  - **agenti**: dieci agenti (vedi requisiti), ognuno con strumenti limitati alle sue funzioni (leggere ordini, proporre un prezzo, preparare una fattura, proporre un abbinamento);
  - **regola comune**: ogni azione che cambia dati o esce verso un cliente passa da una coda di decisioni approvate da un utente;
  - **registro**: log di ogni azione;
  - **sala agenti**: la dashboard è la vista di questo registro e di questa coda, con lo stesso disegno della demo Altalogik già fatta.
- **Integrazioni**: modello linguistico tramite API (Claude), email in ingresso per l'agente Richieste.
- **Dati da avere**: casella da cui arrivano le richieste, regole di approvazione (chi approva cosa e sotto quali soglie).
- **Rischio**: **medio**:
  - **costi a consumo** del modello;
  - **qualità** delle proposte da misurare sui dati veri;
  - **"Chiedi cosa sta facendo"** deve rispondere solo dal registro, mai inventare.
- **Stima**: 15 a 20 giornate, così ripartite:
  - coda decisioni e registro 4;
  - dieci agenti in media 1 giornata ciascuno;
  - dashboard 3 a 4;
  - test 1 a 2.

### R13 · Sicurezza e conformità · DENTRO (pagina), documento a parte
- **Come si fa**:
  - **pagina in piattaforma**: accessi per ruolo, registro delle operazioni, backup, dove stanno i dati;
  - **documento scritto**: GDPR (Progesi come titolare dei dati dei suoi clienti, noi come responsabili del trattamento, con la nomina), sicurezza, fatturazione e conservazione, open banking.
- **Dati da avere**: dove si vuole l'hosting (Italia o UE), politiche già esistenti in Progesi.
- **Rischio**: **medio**. Il documento lo deve rivedere un legale, come ha detto Mihail.
- **Stima**: 2 giornate di sviluppo, più il documento da preparare fuori dallo sviluppo.

### R16 · Nuovo metodo di visualizzazione · DA DEFINIRE
Aspetta la richiesta di Bedr. Va stimato quando è dettagliato.

## Totali

| Gruppo | Requisiti | Giornate |
|---|---|---|
| DENTRO | R1, R2, R3, R4, R5, R7, R8, R9, R10, R11, R12, R13 | 68 a 91 |
| OPZIONALE | R6 | 6 a 8 |
| FASE 2 | nessuno | 0 |
| **Totale** | | **74 a 99** |

**DENTRO, una riga per requisito**

| Requisito | Giornate |
|---|---|
| R2 | 25 a 35 |
| R3 | 8 a 10 |
| R4 | 5 a 6 |
| R5 | 2 |
| R7 | 3 a 4 |
| R8 | 6 a 10 |
| R9 | 2 |
| R10, R11, R12 | 15 a 20 |
| R13 | 2 |

Sono giornate in più rispetto allo scope della prima call, che resta da stimare a parte: ordini, preventivi, margini, contratti, CRM, ore, tecnici. Con questa aggiunta la quotazione interna di 17.000 € non regge: va rifatta prima del 2 novembre.

## Le 3 cose da verificare con i dev prima di presentare

1. **Contabilità: costruire o appoggiarsi.** Decidere se il motore contabile (R2) lo costruiamo noi o lo appoggiamo a un software con API, per esempio TeamSystem come ha ipotizzato Giorgio. Va deciso anche chi firma la manutenzione normativa (R5). È la scelta che sposta di più prezzo e rischio.
2. **Fabrick: accordo reale.** Se l'accordo con Fabrick esiste davvero, con che costi, e se le banche di Progesi sono raggiungibili. Se non esiste, R6 resta opzionale e in demo si dice.
3. **Intermediario SdI.** Quale intermediario usiamo (Openapi.com, A-Cube o il contatto di Ervin), il costo a fattura, se la conservazione è inclusa, e se esiste una sandbox per mostrare uno scarto vero.

## Domande per il cliente

1. Chi fa l'amministrazione e cosa fa ogni mese in G1, operazione per operazione: prima nota, registri IVA, liquidazione, F24, cespiti, ritenute, solleciti. Possiamo vederla al lavoro il 2 novembre?
2. Il commercialista cosa riceve oggi da G1 e in che formato? Tiene lui bilancio, dichiarativi e F24 delle imposte?
3. Quante fatture emettete e ricevete al mese? Lavorate con la Pubblica Amministrazione (split payment)? Avete ritenute o reverse charge?
4. Quanto pagate all'anno per G1 tra licenza, assistenza e aggiornamenti?
5. Con quali banche lavorate, e quanti conti avete?
6. Quanti anni di storico volete portare dal G1?

## Valore per il cliente

| Voce | Calcolo | Fonte | Stato |
|---|---|---|---|
| Canone G1 eliminato | da chiedere (domanda 4) | Giorgio: "paghi anche non poco" | non quantificato |
| Doppio inserimento ordini e fatture in G1 | circa 100 documenti al mese × 5 minuti = **circa 8 ore al mese** | fatturato demo 96.400 € al mese diviso un valore medio di circa 1.000 € a documento | stimato |
| Abbinamento manuale degli incassi | circa 100 incassi al mese × 3 minuti = **circa 5 ore al mese** | prima call: "controlla il conto bancario, verifica il pagamento e lo associa in Zucchetti" | stimato |
| Registrazione manuale delle fatture passive | circa 40 fatture al mese × 4 minuti = **circa 2,7 ore al mese** | 13 ordini fornitori in demo, più le fatture senza ordine | stimato |
| Totale ore amministrative | **circa 15,7 ore al mese, circa 188 ore l'anno** | somma delle tre righe sopra | stimato, da validare con l'amministrazione |

Le ore restano stime finché l'amministrazione non conferma i volumi (domanda 3).

## Fonti delle verifiche sul web
- Fabrick, istituto di pagamento e AISP: [Gruppo Sella, Fabrick](https://www.sellagroup.eu/en/chi-siamo/fabrick), [Ivy, Fabrick open banking](https://www.getivy.io/open-banking/providers/fabrick)
- API SdI con sandbox: [Openapi.com, documentazione SDI](https://console.openapi.com/it/apis/sdi/documentation); A-Cube accreditata presso l'Agenzia delle Entrate: [Dealroom, A-Cube](https://app.dealroom.co/companies/a_cube)
- Gestionale 1 Zucchetti, database DBF ed export: [Reteimprese, Gestionali 1 Zucchetti](https://www.reteimprese.it/sers_A6644B25824)
