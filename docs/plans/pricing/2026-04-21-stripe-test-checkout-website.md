# Stripe Test Checkout - Website

> Stato: archivio tecnico interno.
> Decisione attuale: il funnel pubblico non usa checkout sul sito, la scelta del piano avviene solo nell'app.

## Scopo del test fatto

Questa integrazione era servita solo a verificare:

- creazione di una `Checkout Session` dal sito
- redirect di ritorno dopo il checkout
- corretto funzionamento del pagamento in test mode

## Perché non fa più parte del piano

- il sito non conosce l'utente autenticato dell'app
- il webhook non può associare in modo affidabile il pagamento al `user_id`
- la logica corretta per LabManager è trial, paywall e scelta piano direttamente nell'app

## Stato attuale

- il sito resta informativo
- il trial parte dal flusso applicativo previsto
- checkout, webhook e stato `trial | active | expired` vanno implementati nel backend/app flow

## Nota operativa

Le variabili Stripe usate durante questo test non devono più essere considerate parte del funnel pubblico del sito.
