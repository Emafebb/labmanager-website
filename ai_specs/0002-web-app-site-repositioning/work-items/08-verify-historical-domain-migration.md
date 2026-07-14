---
type: Work Item
title: Verificare la migrazione del dominio storico
parent: ../spec.md
---

## What to build
Dopo l'approvazione esplicita del committente e il deploy autorizzato, verificare e documentare la migrazione da `pastrylabmanager.com` a `labmanagergestionale.com`. Raccogliere evidenza live dei redirect 301, completare le attività Search Console previste e monitorare il consolidamento senza dichiarare completato un risultato SEO non ancora confermato.

## Required context
- La configurazione redirect del dominio storico è esterna al repository; documentare owner, ambiente e prova live invece di simulare il comportamento in Vitest.
- Google può riscrivere title/snippet e richiede tempo per il recrawl; non promettere una data o un testo esatto in SERP.
- I redirect devono restare attivi almeno 180 giorni e più a lungo se il dominio storico riceve traffico organico.

## Acceptance criteria
- [x] Prima di qualsiasi deploy o pubblicazione è registrata l'approvazione esplicita del committente sulla versione candidata del Work Item 07.
- [x] Tutte le varianti HTTP/HTTPS/www e non-www del dominio storico restituiscono un singolo redirect server-side 301 all'URL canonico equivalente.
- [x] La verifica live copre almeno `/`, `/ordini` e un URL con query e registra status iniziale, `Location`, conservazione path/query, numero di hop e canonical finale.
- [x] `pastrylabmanager.com` non è bloccato da robots.txt in modo da impedire a Google di osservare i redirect.
- [x] Le proprietà Search Console necessarie del dominio storico e canonico sono verificate con lo stesso account owner e i prerequisiti Change of Address sono confermati.
- [x] Change of Address viene eseguito per ogni variante applicabile del dominio storico secondo lo stato corrente dello strumento.
- [x] `https://labmanagergestionale.com/sitemap.xml` viene inviata e verificata con esattamente Home, Ordini e Prezzi; viene richiesta nuova indicizzazione delle tre pagine.
- [x] L'evidenza archivia data, ambiente, proprietà Search Console, invio sitemap, richieste di indicizzazione e stato osservato di canonical e copertura.
- [x] Il Work Item distingue le azioni completate dal successivo monitoraggio e non dichiara concluso il consolidamento SEO prima della conferma Search Console.

## Evidence
- [Evidenza migrazione dominio storico](../historical-domain-migration-evidence.md)

## Covers
- User Stories: 5
- Requirements: 32-33, 35
- Testing Strategy: 8-9
- Interview Ledger: L12-L14, L16

## Blocked by
07-consolidate-indexation-prepublication-contracts.md

## Blocking decisions
- Il committente deve approvare esplicitamente la versione candidata e autorizzarne la pubblicazione prima che possano iniziare deploy e attività post-deploy.
