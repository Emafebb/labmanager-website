# PV-01 — configurazione CMP e verifiche, 19 ottobre 2026

**Aggiornamento successivo:** il committente ha confermato la pubblicazione; **GTM v9 è pubblica dal 19 ottobre, 17:46:49 Europe/Rome**. Configurazione pubblica e smoke verificati. Sei nuove misure mostrano -36,1% di byte CMP, ma LCP Prezzi mediano 8,83 s e nessun miglioramento affidabile. [Rapporto corrente](PV01-GTM-V9-RELEASE.md). Le sezioni sotto conservano preparazione, bozza e prove precedenti; non sono istruzioni a pubblicare nuovamente.

## Fase precedente — bozza salvata, anteprima reale conclusa

**Il solo TCF è stato disattivato nella bozza del tag LegalBlink 7; Google Consent Mode resta attivo. Nessuna pubblicazione eseguita.** Accesso risolto nel profilo Chrome **Labmanager**: account `6366556768`, contenitore `258582000` / **GTM-TCZR8HQP**, `Default Workspace` **9**. L'estensione browser elencava un altro profilo Chrome: i precedenti elenchi vuoti di Laura/Emanuele non dimostravano l'assenza di accesso nel profilo del proprietario. Raggiunto il contenitore tramite l'interfaccia nativa Chrome, senza nuovi login o modifiche alle autorizzazioni.

### Bozza effettiva e confronto

- Disattivata soltanto la casella **Enable IAB Transparency and Consent Framework** e premuto **Salva** nel tag. La casella Google Consent Mode era attiva ed è rimasta tale; licenza, default, attivatore e tag Meta non modificati.
- Area di lavoro: **1 tag modificato, 0 aggiunti, 0 eliminati**. Il confronto con la versione 8 evidenzia il solo TCF true→false; i default e il trigger Consent Initialization sono uguali. Prova `gtm-real-workspace-diff.png`.
- Aperto **Invia modifiche**, selezione normale «Pubblica e crea versione», nome **CMP: Consent Mode senza TCF**, descrizione compilata. Il riepilogo contiene soltanto LegalBlink CMP. **Pubblica non premuto**; attesa conferma del committente per rendere la modifica pubblica. Nessuna nuova versione creata.

### Anteprima reale Tag Assistant

Avviata dalla bozza, collegata a Prezzi nel profilo proprietario esistente, senza override di risposte. Il pannello preferenze mostra soltanto categorie tecniche e pubblicitarie, senza tab Vendor/switch TCF. Il profilo partiva con una preferenza pubblicitaria già concessa:

1. Tag Assistant: default pubblicitari negati, aggiornamento iniziale a **Concesso** per `ad_storage`, `ad_user_data` e `ad_personalization`; analytics resta negato, security concesso. È un controllo di una preferenza già salvata letta dalla nuova modalità, non una nuova accettazione.
2. Revocata la categoria pubblicitaria tramite il controllo reale e salvate le preferenze. Dopo reload, Tag Assistant mostra i tre segnali pubblicitari **Negato** anche nell'aggiornamento; analytics, preferences e personalization negati, security concesso.
3. Preferenze riapribili dopo reload, pubblicità **off**. Navigazione dal link del footer Prezzi→Ricette e Food Cost e nuova riapertura riuscite, pubblicità ancora **off** e TCF assente.

**Limiti del test reale:** finestra desktop esistente, senza nuove misure mobile/Lighthouse né profilo pulito. Tag Assistant registra LegalBlink due volte su due documenti e Meta una volta mentre la preferenza iniziale era concessa. In questa anteprima **SDK e log non erano intercettati**: non attestare assenza di traffico Meta o di registrazioni CMP. L'arresto del vero SDK già caricato dopo revoca non è dimostrato dalla sola tabella consensi. La preferenza pubblicitaria del profilo resta negata. Nessun form, iscrizione o pagamento eseguito.

Anteprima e debug poi arrestati; chiusa soltanto la finestra del sito creata per la prova. Lasciata aperta la schermata GTM di pubblicazione preparata. Non sono cambiati sorgenti applicativi, dipendenze o servizi Cloudflare; nessun commit/push/deploy del sito. Test/build applicativi non ripetuti.

### Verifica pubblica e prossimo passo

Lettura pubblica alle **17:11 Europe/Rome**: versione **8**, TCF **true**, Consent Mode **true**. L'intero oggetto `resource` coincide con la copia precedente alla bozza. Il bundle JavaScript complessivo ha un hash diverso (`6af33ee9…` nella prima lettura), quindi non si dichiara identità byte per byte del loader Google; la configurazione pubblica del contenitore è invece confrontata e invariata.

**Prossimo passo: conferma per pubblicare questa sola modifica GTM**, poi lettura della nuova versione pubblica, smoke mirato e misure comparabili. Il nome della versione proposta non equivale a una versione già creata. Nessun miglioramento LCP attestato; PV-01 resta aperto.

Prove nella cartella locale già usata: `gtm-real-workspace-verification.json`, screenshot confronto/anteprima/riepilogo, AX dei consensi concessi/negati e dopo navigazione, `public-after-draft.json`, risorsa pubblica confrontata. Negli AX Tag Assistant il parametro di autenticazione dell'anteprima è oscurato; non includere URL di anteprima con token nei documenti o nei messaggi.

## Fasi precedenti — diagnosi e candidata nei browser isolati

**Candidata definita e verificata in browser isolati:** mantenere Google Consent Mode e disattivare il solo TCF nel tag GTM. Il committente ha confermato **«Solo acquisizione clienti»**. La dipendenza del banner dalla GVL è confermata; il confronto desktop/mobile di accettazione e revoca passa. **Nessuna configurazione remota applicata o pubblicata:** nella sessione GTM collegata l’account Laura mostra ancora zero contenitori. Serve aprire il contenitore nell’account proprietario per passare all’anteprima reale. Questo lavoro non certifica conformità legale o un miglioramento LCP.

## Verifica esterna: tentativo non concluso

La [documentazione Google](https://developers.google.com/speed/docs/insights/v5/get-started) consente richieste PageSpeed anche senza chiave. L'API anonima restituisce **429, quota giornaliera esaurita**. La normale interfaccia pubblica PageSpeed, aperta sulla pagina Prezzi, termina con «Impossibile aprire»; la console registra un 429 della richiesta RPC. Non è una prova che l'URL del sito sia invalido: lo stesso percorso risponde 200 nei browser diagnostici successivi.

Nessun risultato Lighthouse esterno o CrUX ottenuto, nessuna nuova mediana da confrontare con la [serie locale pubblica](PV01-POST-RELEASE-MEASUREMENTS.md). Non ripetuti tentativi sul servizio dopo questi errori. Configurazione API Google locale assente; lo script di controllo della skill non parte per mancanza di `requests`. Usato Node già disponibile per il tentativo pubblico, senza installazioni o creazione di credenziali. La cache SEO è riferita alla vecchia build locale prepubblicazione e non è usata come dato corrente.

## Configurazione e sorgenti pubblici

Lettura diretta alle **15:47 Europe/Rome**: build `_ydy_dmUjew6BEDreHjAX`, GTM risorsa versione **8**, stesso hash della correzione licenza già documentata. Loader CMP 8.661 B; bundle banner versione `v1.0.5`, **751.312 B decodificati**, hash `be16a9b284167cbe22a2035a4615828d5a3a75db980bbfba4eeb686a0347e04e`. Manifest con timestamp/hash nelle prove locali.

- La configurazione LegalBlink pubblica e il tag GTM 7 attivano entrambi Consent Mode e TCF. Il ritardo configurato del banner è **0**: non è un ritardo volontario di diversi secondi.
- Nel bundle attuale `sP` richiede la GVL quando `effectiveConfig.banner.tcfEnabled` è vero. `fP` attende `gvlReady` prima di aprire il banner e inizializzare quel percorso. Con TCF disattivato il provider GVL imposta subito lo stato pronto.
- `rP` applica alla configurazione ricevuta dal servizio gli override del loader per `consentModeEnabled` e `tcfEnabled`. Il flag TCF del tag GTM è quindi sufficiente per provare la variante, senza scrivere override nel sito o cambiare la licenza.
- Nel contenitore pubblico acquisito sono presenti due tag: LegalBlink **7**, attivato da `gtm.init_consent`, e Pixel Meta **9**, attivato da `legalblink_marketing`. L'inventario del contenitore non esclude altre integrazioni o servizi esterni; non equivale a una dichiarazione completa del titolare.

Queste conclusioni derivano dai [bundle loader](https://app.legalblink.it/api/scripts/cmp/loader.js), [banner](https://app.legalblink.it/api/scripts/cmp/v1.0.5/banner.js) e [GTM pubblici](https://www.googletagmanager.com/gtm.js?id=GTM-TCZR8HQP). I nomi minificati valgono per l'hash acquisito, non sono API da usare nel sito. La [guida LegalBlink](https://legalblink.it/post/come-configurare-il-banner-cookie-guida-aggiornamento.html) distingue configurazioni Consent Mode e Google-ready; l'idoneità della modalità al sito va confermata con il responsabile CMP, senza dedurla dal solo peso dei file.

## Esperimento browser isolato

Tre Chrome nuovi, Prezzi a **390×844**, senza throttling Lighthouse. GTM restituito dalla stessa copia pubblica in tutti i casi; nessun aggiornamento del contenitore. Nella sola candidata viene sostituito **un campo**, TCF true→false. Nel controllo di dipendenza si ritarda di 3.000 ms la risposta GVL originale senza modificarne il corpo. La rete marketing è intercettata in tutti i casi per evitare invii di test; in realtà non è stata tentata alcuna richiesta Meta.

| Caso | GVL prima visita + reload | Banner visibile dalla partenza | Esito funzionale |
| --- | --- | --- | --- |
| Configurazione pubblicata, senza modifiche ai campi | 2 richieste | 1.679 ms | Chiusura, scelta ricordata al reload, riapertura preferenze |
| Stessa configurazione, risposta GVL ritardata 3 s | 2 richieste | 4.466 ms | Stessi controlli conclusi; banner visibile solo dopo la GVL |
| Candidata TCF false, solo nel browser | 0 richieste | 1.719 ms | Stessi controlli conclusi, Consent Mode attivo |

Nei tre casi: loader/host unici alla prima visita, risposte CMP 2xx (compreso log chiusura 201); default dei sette segnali Google identici, con pubblicità e analytics negati e security storage concesso. Default verificati nel runtime nativo GTM; chiusura, reload e riapertura tramite i controlli reali. Ispezionate le schermate della candidata, incluse le preferenze. **Nessun consenso marketing espresso**; accettazione selettiva/totale, revoca dopo accettazione e trasmissione dei segnali ai servizi non sono verificate da questo esperimento.

I tempi della tabella sono osservazioni diagnostiche non replicate, **non LCP** e non una prova di vantaggio della candidata: il suo tempo è simile alla configurazione pubblicata in questa rete non limitata. Sono ancora browser sul computer con interferenze GUID. La prova del ritardo e il codice confermano la dipendenza dalla GVL; non quantificano il guadagno reale della rimozione. La candidata mantiene intero il bundle banner di 751.312 B: non è una versione alleggerita del JavaScript.

## Conferma del committente e flussi aggiuntivi

Il committente dichiara che il sito serve **solo all'acquisizione clienti**, senza annunci di terzi. Su questa base è stata completata la candidata Consent Mode attivo / TCF disattivato, lasciando invariati i servizi e le scelte pubblicitarie. È una selezione tecnica per la proposta, non una certificazione della configurazione normativa.

Eseguiti altri **quattro percorsi completi**, ciascuno in Chrome nuovo: baseline TCF true e candidata TCF false, a **1440×1000** e **390×844**. Sempre stessa copia GTM pubblica; l'unica differenza della candidata è il flag TCF. Tutti passano:

1. Prezzi prima visita: default negato, nessuna richiesta Meta.
2. Click reale su Accetta tutti: segnali pubblicitari concessi, una richiesta di caricamento Meta intercettata.
3. Reload: scelta conservata e una seconda richiesta Meta intercettata.
4. Riapertura preferenze e revoca delle categorie opzionali: segnali pubblicitari negati. Nella baseline si revoca anche lo switch TCF; nella candidata quello switch è assente.
5. Navigazione client reale Prezzi→Ricette e Food Cost dal footer, senza nuovo Document: scelta negata conservata, preferenze riapribili.
6. Nuovo reload: scelta negata e nessun nuovo caricamento Meta.

**Venti stati verificati** fra i quattro percorsi: tutti i valori Google default/update coincidono fra baseline e candidata. `ad_storage`, `ad_user_data` e `ad_personalization` passano a true solo dopo accettazione e tornano false dopo revoca; `analytics_storage` resta false perché la categoria statistica è disabilitata nella configurazione del sito. Loader/host unici nei venti stati; nessuna GVL nella candidata.

Nella **serie finale (quinto tentativo)** SDK Meta e tutti i POST LegalBlink sono **intercettati e soddisfatti localmente**, con assert sul percorso effettivo `/api/cookie-consent-logs`: otto richieste complessive al caricamento SDK (due per percorso), nessun evento o log di consenso di questa serie finale inviato ai servizi reali. Il Pixel osservato è quindi il codice GTM di inizializzazione con una risposta SDK vuota. La prova verifica il gate del tag e i segnali della CMP, **non il comportamento del vero SDK Meta già caricato dopo la revoca**, né la consegna delle conversioni. La prova precedente di sola chiusura aveva lasciato passare i normali log di chiusura 201, senza consenso marketing.

Restano da verificare in anteprima GTM effettiva i visitatori con preferenze salvate dalla vecchia modalità, il comportamento del vero SDK e i casi di consenso selettivo pertinenti; la misura prestazionale indipendente è ancora assente. Non attribuire alla candidata un vantaggio LCP.

I tre tentativi iniziali del verificatore dei percorsi completi si fermano su assunzioni del test: ripristino dei segnali più rapido del montaggio dell'host al reload; contenitore React vuoto quando il banner è chiuso; presenza di uno switch TCF aggiuntivo nella baseline. Corretti soltanto attese e selettori, mantenendo gli assert dei consensi. Il quarto tentativo completa i percorsi, ma la verifica finale rileva che il sink dei log usa erroneamente `/api/v2/cookie-consent-logs` anziché `/api/cookie-consent-logs`: nei primi quattro tentativi i log di consenso sintetici non erano intercettati e possono essere stati registrati dal servizio. Non certificata la loro consegna individuale. Nessun dato cliente inserito; l’SDK Meta era invece intercettato fin dall’inizio, senza eventi pubblicitari reali. Il quinto tentativo corregge il sink a tutti i POST LegalBlink, ne verifica esplicitamente l’intercettazione e ripete con successo tutti e quattro i percorsi. I JSON/log intermedi sono conservati, distinti dalla serie finale; il limite è stato comunicato al committente.

## Diff selezionato per la proposta

Il diff da preparare in anteprima GTM riguarda il solo tag LegalBlink 7:

```diff
- "vtp_tcf_enabled": true
+ "vtp_tcf_enabled": false
```

Restano invariati licenza, `vtp_consent_mode: true`, trigger Consent Initialization, default, blocco automatico, attesa degli aggiornamenti e tag Meta. La candidata browser dimostra che il bundle attuale gestisce questo flag; la prova non equivale alla modifica del contenitore e l’anteprima effettiva resta da eseguire. Non introdurre un override in `SiteScripts.tsx`: GTM resta la sede unica della configurazione.

**Alternativa, se in futuro occorre mantenere TCF:** il lavoro è sul fornitore: richiedere una strategia supportata per ridurre bundle e dipendenze iniziali, preservando la corretta disponibilità dei consensi TCF. Il codice acquisito non espone un flag separato per rendere lazy la sola GVL; non applicare patch alle funzioni minificate o dati partner incompleti. [Supporto tecnico CMP LegalBlink](https://legalblink.it/post/supporto-cmp-legalblink.html). Nessuna richiesta inviata al fornitore.

**Passo operativo:** aprire in Chrome collegato l'account proprietario del contenitore **GTM-TCZR8HQP**. La scheda esistente `90600279` mostra l’account Laura con zero contenitori anche in questa verifica; nessun account cambiato e nessun login tentato. Non serve un deploy del sito e non va aggiunto un override al codice.

**Verifica successiva al login dichiarato dal committente:** nel Chrome collegato la nuova scheda GTM `90600301` mostra l’account Emanuele con tabella Account vuota, anche dopo reload; la scheda di accesso `90600304` resta su «Email o telefono». Nessuna credenziale letta o inserita. Serve lasciare visibile direttamente il contenitore richiesto con l’elenco tag; nessuna modifica applicata.

Nell'account proprietario: preparare la modifica del solo flag, usare l'anteprima del contenitore e completare i controlli rimasti sopra. Poi valutare la pubblicazione e tre nuove misure indipendenti per pagina con configurazione documentata. Non promettere il rientro sotto 2,5 s e non chiudere PV-01 ora. Il GTM pubblico è stato riletto alle **16:01 Europe/Rome**: hash invariato, TCF ancora true, stessa build del sito.

## Prove e limiti operativi

Prove locali ignorate da Git in `output/playwright/pv01-external-2026-10-19/`: risposta/API log, screenshot e console PageSpeed, copie dei bundle/configurazione e manifest, `gtm-resource.json`, `tag-7-proposed.json` (proposta, **non export da importare**), `cmp-experiment.mjs`, log, JSON delle tre condizioni, stati e screenshot; `consent-journey.mjs` / `consent-journey.json` e log dei quattro percorsi completi, `public-end.json` per il GTM invariato. Gli script contengono assert e chiudono soltanto i Chrome dedicati.

Il primo verificatore browser si ferma perché cerca comandi `gtag` nel dataLayer; il template ufficiale usa l'API nativa GTM per i default. Corretto il solo controllo per leggere lo stato runtime e ripetute tutte e tre le condizioni con esito positivo. Il tentativo incompleto non contribuisce alla tabella.

Nessuna modifica a sorgenti applicativi, dipendenze, GTM/LegalBlink o servizi Cloudflare; nessun invio moduli, messaggio, commit, push o deploy. Test/build applicativi non ripetuti. Restano aperti accesso al contenitore proprietario, anteprima reale, misura indipendente, flussi non coperti dalle prove e le altre dipendenze del piano. La dichiarazione sull’uso del sito è stata raccolta.
