---
type: Work Item
title: Applicare la policy HTTP/HTTPS a edge
parent: ../spec.md
---

## What to build
Configurare Cloudflare affinché ogni richiesta HTTP `GET` o `HEAD` a `labmanagergestionale.com` riceva un solo redirect `308` verso la risorsa HTTPS equivalente, preservando esattamente path e query string. Ogni altro metodo HTTP deve ricevere `400` a edge senza essere inoltrato all'origine. Registrare evidenza ripetibile delle verifiche live.

## Required context
- Il committente possiede l'accesso Cloudflare; il repository non contiene oggi una regola che possa soddisfare da sola questa policy.
- Usare soltanto `labmanagergestionale.com-audit/2026-07-11/` come baseline di audit.
- Un redirect non protegge un body già trasmesso via HTTP e HSTS non sostituisce il comportamento richiesto alla prima visita.

## Acceptance criteria
- [x] Una regola edge/origin distribuita applica `308` a ogni richiesta HTTP `GET` o `HEAD` senza eccezioni per path applicativi, API o URL inesistenti.
- [x] Il valore `Location` conserva esattamente host, path e query e conduce direttamente all'equivalente HTTPS in un solo hop.
- [x] La homepage HTTP non restituisce mai `200`.
- [x] Ogni metodo HTTP diverso da `GET` e `HEAD`, inclusi quelli che possono trasportare un body, riceve `400` a edge e non raggiunge l'origine.
- [x] L'evidenza live, raccolta senza seguire redirect, include data/ambiente, comando, URL, metodo, status iniziale e `Location` per homepage, URL form/API, URL inesistente e URL con query.
- [x] L'evidenza live per i metodi non `GET`/`HEAD` include almeno un endpoint che accetta body e dimostra sia il `400` sia l'assenza di inoltro all'origine.
- [x] Se l'implementazione modifica configurazione OpenNext/Cloudflare versionata nel repository, `npx opennextjs-cloudflare build` passa.

## Covers
- User Stories: 1
- Requirements: 1-2
- Testing Strategy: 5-6
- Interview Ledger: L1, L2, L13

## Blocked by
None - ready to start

## Implementation evidence

- Data e ambiente: 13 luglio 2026, 14:09 CEST, produzione Cloudflare su `labmanagergestionale.com`.
- Deploy: `npx wrangler deploy`; versione Worker `f2c0c530-1a31-4850-abc1-2a72b4d5d86e`.
- Comando base, senza seguire redirect: `curl --http1.1 --max-redirs 0 -H 'Cache-Control: no-cache' -D - -o /dev/null <URL>`. Per `HEAD` è stata aggiunta `-I`; per il probe con body sono stati aggiunti `-X POST -H 'Content-Type: application/json' --data '{"probe":"edge-policy-3"}'`.

| Metodo | URL HTTP | Status iniziale | `Location` / prova edge |
| --- | --- | --- | --- |
| `GET` | `/` | `308` | `https://labmanagergestionale.com/` |
| `HEAD` | `/` | `308` | `https://labmanagergestionale.com/` |
| `GET` | `/api/contact` | `308` | `https://labmanagergestionale.com/api/contact` |
| `GET` | `/percorso-inesistente-verifica` | `308` | `https://labmanagergestionale.com/percorso-inesistente-verifica` |
| `GET` | `/pricing?source=seo%20audit&empty=` | `308` | `https://labmanagergestionale.com/pricing?source=seo%20audit&empty=` |
| `POST` | `/api/contact` con body JSON | `400` | `x-labmanager-edge-policy: block-insecure-http-method` |

Tutte le risposte `308` espongono `x-labmanager-edge-policy: redirect-http-to-https`. Il `400` testuale con `Cache-Control: no-store` è creato prima di OpenNext; i test unitari verificano inoltre che il forwarder non sia chiamato per `POST`, `PUT`, `PATCH`, `DELETE` e `OPTIONS`. `npx opennextjs-cloudflare build` è passato il 13 luglio 2026.
