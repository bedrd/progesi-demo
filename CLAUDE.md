# Progesi demo · istruzioni per Claude

Prima di tutto leggi `HANDOFF.md`: c'è tutta la situazione (cliente, decisioni, architettura del file, test, pubblicazione, limiti noti).

Regole che non si discutono:
- La demo è **un solo file**, `progesi.html`. Niente build, niente file nuovi per la demo.
- All'apertura la console deve stampare `[check] 44/44 controlli sui dati: dati coerenti`.
- I numeri si calcolano dai dati, non si scrivono a mano. Il registro IVA vendite fa lo stesso totale del fatturato del mese, e la prima nota è in pareggio.
- Il rosso `#DD0000` va solo su marchio e azioni. Grafici e barre restano grafite. Eccezione: la scena della Sala agenti usa la palette del marchio (HANDOFF §8).
- I testi sono in italiano, e non c'è **mai** il trattino lungo (`—` o `–`). Ogni vista ha la sua riga "Prova:".
- Nella demo non c'è mai il nome del vecchio gestionale (Zucchetti, G1), né un confronto con lui, neanche nel codice: Progesi se ne vuole staccare.
- Passando tra Gestionale e Sala agenti non si perde niente: lo stato è uno solo (`S`) e le decisioni della Sala si calcolano da lì.
- Prima di ogni commit lancia `npm test` dentro `test/`. Deve uscire tutto OK con "ERRORI: nessuno". Controlla anche il telefono (390 px) e il desktop (1440 px).
- Non lavorare su `main`: crea un ramo e apri una pull request (vedi HANDOFF §12). Se cambia qualcosa di importante, aggiorna `HANDOFF.md` nello stesso commit.
