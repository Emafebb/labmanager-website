# Piano Checkout Stripe dati fatturazione elettronica

> Data: 2026-04-25
> Ambito: Stripe Checkout per abbonamenti LabManager, raccolta dati utili a fattura elettronica italiana.
> Stato: aggiornato post-implementazione Checkout. Non e consulenza fiscale. Le regole finali su emissione, recapito e conservazione vanno validate con commercialista o provider e-fattura.

---

## 1. Decisione

Usare Stripe Checkout come punto di raccolta dati, senza bloccare il pagamento quando il cliente non compila i dati fiscali opzionali.

Campi da aggiungere:

- indirizzo di fatturazione obbligatorio
- raccolta Tax ID Stripe nativa abilitata
- aggiornamento automatico del Customer Stripe con nome e indirizzo
- lingua Checkout italiana
- campo custom opzionale `codicefiscale` con label "Codice fiscale"
- campo custom opzionale `sdipec` con label "Codice SDI o PEC"

Questa scelta migliora molto la disponibilita dei dati, ma non garantisce che ogni pagamento sia subito fatturabile senza follow-up amministrativo. Se un privato non compila il codice fiscale, o se un business non inserisce P.IVA/SDI/PEC, il pagamento puo riuscire ma la pratica e-fattura resta incompleta.

Decisione finale v1: non duplicare questi dati fiscali in Supabase. Stripe resta la fonte operativa per i dati di fatturazione raccolti in Checkout; Supabase continua a conservare solo lo stato applicativo dell'abbonamento in `user_subscriptions`.

---

## 2. Perche campi opzionali

Stripe Checkout non supporta logiche condizionali complete sui custom fields.

Non si puo dire nativamente:

- se il cliente spunta "acquisto come azienda", allora P.IVA obbligatoria e codice fiscale opzionale
- se non spunta azienda, allora codice fiscale obbligatorio
- se inserisce SDI, allora PEC non necessaria, o viceversa

Rendere il codice fiscale obbligatorio per tutti creerebbe attrito per aziende che inseriscono gia la P.IVA tramite Tax ID Stripe.

Rendere il campo SDI/PEC obbligatorio per tutti creerebbe attrito per privati senza PEC o codice destinatario. Per i privati, il recapito SdI puo essere gestito con codice convenzionale `0000000` nel processo e-fattura.

Decisione v1: raccolta opzionale, pagamento non bloccante, follow-up amministrativo sui dati mancanti.

---

## 3. Comportamento atteso nel Checkout

Con `tax_id_collection.enabled=true`, Stripe mostra nativamente la spunta tipo:

- "Sto effettuando l'acquisto come azienda"

Quando il cliente la seleziona, Stripe mostra i campi business supportati per il paese, inclusi:

- ragione sociale / legal business name
- P.IVA / VAT ID, per Italia `eu_vat`

Questi dati vengono salvati su Stripe Customer quando la Sessione usa un Customer esistente e `customer_update.name=auto`.

Campi standard Stripe:

| Dato | Campo Stripe | Obbligo v1 |
| --- | --- | --- |
| Email | Checkout contact | automatico |
| Indirizzo fatturazione | `billing_address_collection=required` | obbligatorio |
| Ragione sociale business | `tax_id_collection` + business checkbox | opzionale, se cliente sceglie business |
| P.IVA | `tax_id_collection.enabled=true` | opzionale |
| Nome Customer | `customer_update.name=auto` | automatico quando disponibile |
| Indirizzo Customer | `customer_update.address=auto` | automatico |

Campi custom Stripe:

| Dato | Campo | Obbligo v1 | Nota |
| --- | --- | --- | --- |
| Codice fiscale privato/professionista | `custom_fields.codicefiscale` | opzionale | key alfanumerica richiesta da Stripe; label mostrata: "Codice fiscale" |
| Codice SDI o PEC | `custom_fields.sdipec` | opzionale | key alfanumerica richiesta da Stripe; label mostrata: "Codice SDI o PEC" |

---

## 4. Parametri Checkout implementati

File principale:

- `supabase/functions/create-checkout-session/handler.js`

Sessione implementata:

```js
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  customer: stripeCustomerId,
  line_items: [{ price: selectedPriceId, quantity: 1 }],
  allow_promotion_codes: true,
  billing_address_collection: 'required',
  tax_id_collection: {
    enabled: true,
  },
  customer_update: {
    name: 'auto',
    address: 'auto',
  },
  custom_fields: [
    {
      key: 'codicefiscale',
      label: {
        type: 'custom',
        custom: 'Codice fiscale',
      },
      type: 'text',
      optional: true,
      text: {
        minimum_length: 16,
        maximum_length: 16,
      },
    },
    {
      key: 'sdipec',
      label: {
        type: 'custom',
        custom: 'Codice SDI o PEC',
      },
      type: 'text',
      optional: true,
    },
  ],
  custom_text: {
    submit: {
      message:
        'Se non hai un codice SDI o una PEC puoi lasciare il campo vuoto: per la fattura elettronica puo essere usato il codice destinatario 0000000 quando applicabile.',
    },
  },
  locale: 'it',
  success_url: successUrl,
  cancel_url: cancelUrl,
  client_reference_id: user.id,
});
```

Note:

- `tax_id_collection.required` resta non impostato. Se lo impostassimo a `if_supported`, potremmo forzare dati fiscali in paesi supportati e aumentare il rischio di bloccare privati o clienti non business.
- Le key dei custom fields sono `codicefiscale` e `sdipec`, non `codice_fiscale` e `sdi_pec`, per rispettare il vincolo Stripe sulle key alfanumeriche.
- `allow_promotion_codes`, URL success/cancel, piano mensile/annuale e `client_reference_id` restano invariati.

---

## 5. Dove restano i dati dopo pagamento

I dati raccolti restano in Stripe, non in una nuova tabella Supabase.

Scelta finale v1:

- non creare `public.billing_profiles`
- non modificare `stripe-webhook` per salvare dati fiscali
- non duplicare codice fiscale, SDI/PEC, indirizzo o Tax ID in Supabase
- mantenere `public.user_subscriptions` come unica projection billing letta dall'app

Motivazione:

- Stripe salva Tax ID e business name sul Customer quando Checkout raccoglie Tax ID su un Customer esistente con `customer_update.name=auto`
- Stripe aggiorna il Customer con l'indirizzo quando `customer_update.address=auto`
- i custom fields sono disponibili nei dettagli Checkout/pagamento in Dashboard e nel payload `checkout.session.completed`
- duplicare i dati fiscali in Supabase aumenterebbe superficie privacy, RLS, migrazioni e rischi di coerenza senza beneficio immediato per la v1

Operativita v1:

- l'app usa `user_subscriptions` solo per sapere se l'abbonamento e attivo
- l'amministrazione recupera i dati fiscali da Stripe Dashboard / Customer / Checkout Session
- eventuali esportazioni o integrazioni e-fattura restano fase futura, da progettare solo se serve automazione reale

---

## 6. Regole operative sui casi cliente

| Caso | Dati attesi | Esito operativo |
| --- | --- | --- |
| Azienda con P.IVA + SDI/PEC | Tax ID `eu_vat`, ragione sociale, indirizzo, custom field `sdipec` | fatturazione probabilmente completa |
| Azienda con P.IVA ma senza SDI/PEC | Tax ID `eu_vat`, ragione sociale, indirizzo | possibile uso `0000000` o follow-up, da validare col commercialista |
| Privato con codice fiscale | nome, indirizzo, custom field `codicefiscale` | e-fattura B2C gestibile con `0000000` se non c'e PEC/SDI |
| Privato senza codice fiscale | nome/indirizzo soltanto | pagamento ok, fattura non completa senza follow-up |
| Cliente estero | indirizzo estero, tax ID eventuale | processo fiscale separato da definire |

---

## 7. Test implementati e manuali

### Unit test Edge Function

Aggiornato:

- `supabase/functions/create-checkout-session/handler.test.mjs`

Verifiche:

- la Sessione include `billing_address_collection: 'required'`
- la Sessione include `tax_id_collection.enabled=true`
- la Sessione include `customer_update.name='auto'`
- la Sessione include `customer_update.address='auto'`
- la Sessione include `locale='it'`
- `codicefiscale` e `sdipec` sono presenti e `optional=true`
- `codicefiscale` ha `minimum_length=16` e `maximum_length=16`
- `allow_promotion_codes` resta `true`
- URL success/cancel e piano mensile/annuale restano invariati

### Test manuale Stripe sandbox

Scenario privato:

1. avviare checkout
2. compilare indirizzo
3. non spuntare acquisto come azienda
4. lasciare "Codice SDI o PEC" vuoto
5. opzionalmente compilare codice fiscale
6. pagamento deve procedere
7. i dati custom devono essere visibili in Stripe Dashboard / Checkout Session

Scenario azienda:

1. avviare checkout
2. compilare indirizzo Italia
3. spuntare acquisto come azienda
4. compilare ragione sociale e P.IVA
5. compilare "Codice SDI o PEC"
6. pagamento deve procedere
7. Customer Stripe deve avere nome/business name e tax id
8. i dati custom devono essere visibili in Stripe Dashboard / Checkout Session

Scenario rinnovo:

1. simulare rinnovo con subscription test clock
2. verificare `invoice.paid`
3. verificare che `user_subscriptions` resti coerente
4. verificare che il processo amministrativo recuperi i dati fiscali da Stripe, non da Supabase

---

## 8. Criteri di accettazione

PASS tecnico v1:

- Checkout mostra indirizzo fatturazione obbligatorio
- Checkout mostra la spunta business nativa Stripe dove supportata
- Checkout mostra i due campi custom opzionali
- pagamento privato senza dati custom non viene bloccato
- pagamento business con P.IVA salva Tax ID su Stripe Customer
- `checkout.session.completed` contiene i custom fields
- test Node della funzione checkout passano
- nessuna nuova tabella Supabase per dati fiscali e nessuna modifica webhook fiscale

PASS operativo:

- per ogni pagamento esiste almeno una traccia dati fatturazione in Stripe
- i casi incompleti sono identificabili e recuperabili manualmente da Stripe
- il processo SdI resta esplicitamente separato da Stripe receipt/PDF invoice

NO-GO:

- trattare la ricevuta Stripe come sostitutiva della fattura elettronica SdI
- andare live senza sapere come gestire pagamenti con dati incompleti
- rendere obbligatorio il campo SDI/PEC nel checkout unico senza conferma commerciale/fiscale
- duplicare dati fiscali in Supabase senza un requisito operativo concreto di export, portale dati o integrazione e-fattura

---

## 9. Implementazione effettiva e prossimi passi

Completato - Checkout:

- aggiungere parametri nativi Stripe e custom fields opzionali
- aggiornare test `create-checkout-session`
- test Node `create-checkout-session` verdi

Non implementato per scelta - Supabase dati fiscali:

- nessuna tabella `billing_profiles`
- nessuna persistenza dei dati fiscali custom in Supabase
- nessuna modifica al webhook per salvare profili fiscali

Da fare prima del go-live operativo:

- redeploy `create-checkout-session`
- test manuale sandbox privato e azienda
- verificare in Dashboard Stripe dove appaiono Customer, Tax ID, indirizzo e custom fields
- documentare fallback `0000000` per privati senza SDI/PEC, se confermato

Evoluzione futura solo se serve automazione:

- schermata app "Dati di fatturazione" per completare o correggere i dati dopo checkout
- tabella applicativa dedicata o export solo se serve davvero un flusso amministrativo interno
- integrazione provider e-fattura
- emissione automatica XML/SdI solo dopo validazione fiscale completa

---

## 10. Fonti

- Stripe, Collect customer tax IDs with Checkout: `https://docs.stripe.com/tax/checkout/tax-ids`
- Stripe, Checkout custom fields: `https://docs.stripe.com/payments/checkout/custom-components`
- Stripe, Codice destinatario per fatturazione elettronica in Italia: `https://stripe.com/it/resources/more/recipient-code-for-einvoicing-italy`
- Agenzia Entrate, Fatturazione elettronica: `https://www1.agenziaentrate.gov.it/web_app_entrate/fatturazione_elettronica.html/1000`
- Adamo, Link di pagamento Stripe e fattura elettronica: `https://adamogestionale.zendesk.com/hc/it/articles/21189668453778-Link-di-pagamento-Stripe-come-si-integra-con-Adamo`
