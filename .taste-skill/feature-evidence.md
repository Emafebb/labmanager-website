# Provenienza del catalogo

Verifica in sola lettura il 19/10/2026, app locale `/Users/emanuele/Documents/github/Labmanager`, branch `integration/spec-0038`. Le pagine sono collegate da `lib/widgets/pagina_sezione_shell.dart`. La presenza nel codice non certifica rilascio o migrazioni remote.

| Area | Sorgenti nell'app |
| --- | --- |
| Ricette e semilavorati | lib/pages/recipe_page.dart; lib/pages/recipe_archive_page_actions.dart; lib/pages/confronta_ricette_page.dart |
| Bilanciamento e tools | lib/pages/balance_recipe_page.dart; lib/pages/tools_page.dart; lib/pages/pagina_assemblaggio_dessert.dart |
| Food Cost | lib/features/food_cost/widgets/editor/food_cost_editor_workspace.dart |
| Menu | lib/features/food_cost/pages/calcolo_food_cost_page.dart; lib/features/menu/presentazione/riepilogo_economico_menu.dart; dialog_leva_margine_menu.dart; esportazione_pdf_menu.dart |
| Ordini | lib/features/ordini/pages/ordini_page.dart; services/ordine_chiusura_service.dart; ordine_chiusura_pesatura.dart; ordine_chiusura_vendite.dart; ordine_chiusura_lotti.dart |
| Produzione e vendite | lib/pages/dashboard_produzione_page.dart; lib/pages/vendite_page.dart |
| Magazzino e lotti | lib/pages/inventario_scadenze_page.dart; lib/widgets/dialogs/inventario/inserimento_lotto_dialog.dart; lib/widgets/inventario_scadenze/menu_movimenti_lotto.dart; lib/widgets/dialogs/tracciabilita/tracciabilita_lotto_dialog.dart |
| Etichette e nutrizione | lib/pages/nutritional_table_page.dart; lib/widgets/etichette/gestione_etichette_page.dart; label_config_strings.dart |
| Libro ingredienti | lib/features/libro_ingredienti/pages/libro_ingredienti_page.dart; pages/scheda_assortimento.dart; widgets/genera_libro_assortimento.dart; widgets/storico_libri_section.dart; widgets/stato_libro_assortimento.dart |
| Importazioni | lib/widgets/magazzino/recipe_scan_verifica_dialog.dart; ddt_scan_button.dart; ddt_verifica_dialog.dart; lib/features/dashboard_gestione_costi/widgets/dialog_partita_scadenzario.dart |
| Economia | lib/features/dashboard_gestione_costi/pages/dashboard_gestione_costi_page.dart; widgets/tab_economico_costi.dart; tab_prodotti_costi.dart; tab_scadenzario.dart |
| Team | lib/pages/settings_page.dart; lib/features/accesso_dipendenti/widgets/dialogs/editor_permessi_dipendente.dart |

Il committente ha confermato il 19/10/2026 che Libro ingredienti è già disponibile: rimosso il testo “In arrivo”. Non promessi QR (esplicitamente in sviluppo), conformità legale garantita, estrazione AI senza verifica umana, tracciabilità automatica completa, funzionamento integrale offline o nuove distribuzioni native. Prezzi e inclusioni derivano solo dal manifesto commerciale del sito, invariato.

Entitlement Libro ingredienti verificato in `lib/features/abbonamenti/domain/catalogo_entitlement.dart:93-107`: Light gestione/consultazione, Plus generazione/storico PDF. Il manifesto sito fissato alla propria impronta è rimasto invariato; il confronto esplicita questa estensione con una riga dedicata basata sul catalogo corrente dell’app. Menu ricade nel Food Cost con accesso Light/Plus.
