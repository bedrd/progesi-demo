# Progesi · demo

Demo commerciale della piattaforma gestionale con agenti AI per Progesi S.r.l. (sicurezza sul lavoro, Offanengo).

- Online: https://progesi-demo-b376.netlify.app (per l'amministrazione: `/#amministrazione`)
- Si apre in locale con doppio clic su `progesi.html`: è un file unico, senza build.
- Tutta la situazione è in [HANDOFF.md](HANDOFF.md). Requisiti in [requisiti.md](requisiti.md), fattibilità in [fattibilita.md](fattibilita.md).

## Test

```bash
cd test
npm install
npm test
```

## Lavorare in due

```bash
git pull
git switch -c nome-modifica
# modifiche, poi: cd test && npm test
git push -u origin nome-modifica
```

Poi si apre una pull request su GitHub. Dopo il merge, chi è rimasto indietro fa `git switch main && git pull`.
