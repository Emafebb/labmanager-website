# Guida UI Responsive Multipiattaforma

> Guida completa per sviluppare UI responsive che funzionano correttamente su **Windows Desktop**, **Android Tablet** e **Android Smartphone**.

**Creazione:** 2026-01-20 | **Aggiornamento:** 2026-02-08 | **Stato:** Attiva

---

## Quick Reference

### Quando usare cosa

| Decisione | Helper | Esempio |
|-----------|--------|---------|
| **Layout pagina (sidebar vs grid)** | **`DeviceContext.of(context)`** | **Sidebar desktop, grid mobile** |
| Swipe/Dismissible | `PlatformUtils.isMobile` | Gesture swipe su lista |
| BottomSheet vs Dialog | `PlatformUtils.isMobile` | Selezione categoria |
| Haptic feedback | `PlatformUtils.isMobile` | Feedback tattile |
| Dimensioni campi | `ResponsiveHelpers.isTouchBreakpoint()` | Width: 100 vs 120 |
| Numero colonne | `ResponsiveHelpers.isTouchBreakpoint()` | 2 vs 4 colonne |
| Layout Row vs Column | `ResponsiveHelpers.hasHorizontalSpace()` | Preview side-by-side |
| Bloccare pagina portrait | `PlatformUtils.isSmartphonePortrait(context)` | Bilancia ricetta |
| Touch density vs Pointer density | `DeviceContext.of(context)` | Padding 16dp vs 4dp |

> **REGOLA OBBLIGATORIA:** Per decisioni di layout a livello di pagina (sidebar vs grid, NavigationView vs card list, ecc.)
> usare SEMPRE `DeviceContext.of(context)` che combina piattaforma + dimensione finestra.
> NON usare solo `hasHorizontalSpace()` o `isTouchBreakpoint()` che non distinguono
> "Windows finestra piccola" da "Android smartphone".

### Import

```dart
import '../../utils/responsive_helpers.dart';
import '../../utils/platform_utils.dart';
import '../../utils/device_context.dart';
```

### Pattern Dialog Responsive

```dart
final dialogConfig = ResponsiveHelpers.getDialogConfig(context);

return ContentDialog(
  title: const Text('Titolo'),
  constraints: dialogConfig.constraints,
  content: SizedBox(
    height: dialogConfig.contentHeight,
    child: /* contenuto */,
  ),
);
```

---

## Indice

1. [Concetto Fondamentale: Breakpoint vs Piattaforma](#1-breakpoint-vs-piattaforma)
2. [Helper Disponibili](#2-helper-disponibili)
3. [Pattern UI per Piattaforma](#3-pattern-ui-per-piattaforma)
4. [Dialog Responsive](#4-dialog-responsive)
5. [Pattern Ibrido (BottomSheet + Dialog)](#5-pattern-ibrido)
6. [Header Scrollabile su Mobile](#6-header-scrollabile)
7. [Blocco Pagine su Smartphone](#7-blocco-pagine)
8. [Checklist Migrazione](#8-checklist-migrazione)
9. [Troubleshooting](#9-troubleshooting)
10. [File di Riferimento](#10-riferimenti)

---

## 1. Breakpoint vs Piattaforma vs DeviceContext

**Tre livelli di decisione, ognuno con il suo helper:**

| Concetto | Misura | Helper | Uso |
|----------|--------|--------|-----|
| **Breakpoint** | Larghezza (px) | `ResponsiveHelpers.isTouchBreakpoint()` | **LAYOUT interno**: dimensioni campi, colonne, padding |
| **Piattaforma** | Sistema operativo | `PlatformUtils.isMobile` | **INTERAZIONE**: swipe, gesture, haptic |
| **DeviceContext** | Piattaforma + larghezza | `DeviceContext.of(context)` | **LAYOUT pagina**: sidebar vs grid, NavigationView vs card |

### Il Problema: Breakpoint da solo non basta

```dart
// SBAGLIATO: Windows con finestra piccola mostra layout touch!
if (ResponsiveHelpers.hasHorizontalSpace(context)) {
  return _buildDesktopLayout();    // Sidebar
}
return _buildCompactLayout();      // Grid card su Windows piccolo!

// SBAGLIATO: Swipe su Windows
if (ResponsiveHelpers.isTouchBreakpoint(context)) {
  return Dismissible(...);  // Swipe su Windows piccolo!
}

// CORRETTO: DeviceContext per layout pagina
final ctx = DeviceContext.of(context);
if (ctx.deviceType == DeviceType.desktop) {
  return _buildDesktopLayout();    // Sidebar SEMPRE su Windows
}

// CORRETTO: Piattaforma per interazione
if (PlatformUtils.isMobile) {
  return Dismissible(...);  // Swipe solo su Android/iOS
}
```

### Tabella Decisionale

| Scenario | `deviceType` | `sizeClass` | `isTouchBreakpoint` | Sidebar? | Swipe? |
|----------|-------------|-------------|---------------------|----------|--------|
| Windows fullscreen | desktop | expanded+ | false | **Si** | No |
| Windows finestra piccola | desktop | compact | **true** | **Si** | No |
| Android smartphone | smartphone | compact | true | No | Si |
| Android tablet portrait | tablet | medium | true | No | Si |
| Android tablet landscape | tablet | expanded | false | **Si** | Si |

> **ATTENZIONE:** La riga "Windows finestra piccola" e' il caso critico.
> `isTouchBreakpoint` = true ma `deviceType` = desktop.
> Usando solo il breakpoint, Windows piccolo mostrerebbe layout mobile.
> **DeviceContext risolve questo problema.**

---

## 2. Helper Disponibili

### Breakpoint (per LAYOUT)

```dart
ResponsiveHelpers.isMobile(context)           // < 600px
ResponsiveHelpers.isTablet(context)           // 600-839px
ResponsiveHelpers.isTouchBreakpoint(context)  // < 800px
// NOTA: isMediumDesktop() rimosso → usare isSmallDesktop()
```

### Piattaforma (per INTERAZIONE)

```dart
PlatformUtils.isMobile      // Android/iOS (sempre, indipendente da larghezza)
PlatformUtils.isDesktop     // Windows/Linux/macOS
```

### Form Factor

```dart
PlatformUtils.isSmartphone(context)           // mobile + shortestSide < 600dp
PlatformUtils.isTabletDevice(context)         // mobile + shortestSide >= 600dp
PlatformUtils.isSmartphonePortrait(context)   // smartphone + portrait
```

### Layout

```dart
ResponsiveHelpers.shouldUseCompactLayout(context)  // mobile O tablet portrait
ResponsiveHelpers.hasHorizontalSpace(context)      // desktop O tablet landscape
```

### DeviceContext (OBBLIGATORIO per layout pagina)

**DeviceContext e' l'unico helper che combina piattaforma + dimensione finestra.**
**OBBLIGATORIO per tutte le decisioni di layout a livello di pagina.**

```dart
import '../../utils/device_context.dart';

final ctx = DeviceContext.of(context);

ctx.deviceType   // smartphone | tablet | desktop
ctx.sizeClass    // compact | medium | expanded | large | extraLarge
ctx.inputMode    // touch | pointer

ctx.isTouch      // true su Android/iOS
ctx.minTouchTarget // 48dp touch, 32dp pointer
ctx.legacyLayoutType // bridge verso DesktopLayoutType
```

#### Pattern obbligatorio per build() di pagine

```dart
@override
Widget build(BuildContext context) {
  final ctx = DeviceContext.of(context);

  // Desktop: SEMPRE layout desktop (anche finestra piccola)
  // Tablet: layout desktop solo con spazio (expanded+)
  // Smartphone: SEMPRE layout compact
  if (ctx.deviceType == DeviceType.desktop ||
      (ctx.deviceType == DeviceType.tablet &&
          ctx.sizeClass != WindowSizeClass.compact &&
          ctx.sizeClass != WindowSizeClass.medium)) {
    return _buildDesktopLayout();
  }
  return _buildCompactLayout();
}
```

#### Quando usare DeviceContext vs helper esistenti

| Scenario | Usa | Perche' |
|----------|-----|---------|
| **Layout pagina (sidebar/grid)** | **`DeviceContext.of(context)`** | **Distingue Windows piccolo da Android** |
| Layout colonne/flex interni | `getLayoutType()` | 30 file gia' funzionanti |
| Swipe/gesture si/no | `PlatformUtils.isMobile` | Interazione, non layout |
| Padding/density nuovi widget | `DeviceContext.of(context)` | Combina layout + input |
| Config completa nuovi widget | `ResponsiveConfiguration.forDeviceContext(ctx)` | Un oggetto con tutto |

---

## 3. Pattern UI per Piattaforma

| Piattaforma | Componente | Razionale |
|-------------|------------|-----------|
| **Desktop** | `ContentDialog`, `Flyout` | Mouse, hover |
| **Tablet** | `BottomSheet`, `DraggableScrollableSheet` | Touch, gesture |
| **Smartphone** | `BottomSheet` fullscreen | Thumb-reachable |

### Diagramma Layout

| Dispositivo | `shouldUseCompactLayout` | `hasHorizontalSpace` | Layout |
|-------------|--------------------------|----------------------|--------|
| Mobile | true | false | Column |
| Tablet Portrait | true | false | Column |
| Tablet Landscape | false | true | Row |
| Desktop | false | true | Row |

---

## 4. Dialog Responsive

### Uso Base

```dart
final dialogConfig = ResponsiveHelpers.getDialogConfig(context);

return ContentDialog(
  constraints: dialogConfig.constraints,
  content: SizedBox(
    height: dialogConfig.contentHeight,
    child: Column(...),
  ),
);
```

### Dimensioni Automatiche

| Dispositivo | Orientamento | Larghezza | Altezza | Content |
|-------------|--------------|-----------|---------|---------|
| Mobile | Portrait | 95% | 85% | 55% |
| Mobile | Landscape | 85% | 90% | 60% |
| Tablet | Portrait | 90% | 75% | 50% |
| Tablet | Landscape | 75% | 85% | 60% |
| Desktop | - | 650px | 756px | 400px |

### Parametri Custom

```dart
ResponsiveHelpers.getDialogConfig(
  context,
  desktopMaxWidth: 800.0,
  desktopMaxHeight: 600.0,
  desktopContentHeight: 350.0,
);
```

### Proprieta DialogResponsiveConfig

```dart
config.constraints / config.contentHeight
config.isMobile / config.isTablet / config.isDesktop
config.hasHorizontalSpace      // desktop O tablet landscape
config.shouldUseCompactLayout  // mobile O tablet portrait
```

---

## 5. Pattern Ibrido

**Per selector, liste, interazioni frequenti: usa componenti nativi diversi per piattaforma.**

### Entry Point

```dart
void _openSelector() {
  if (PlatformUtils.isMobile) {
    _openBottomSheetSelector();  // Android/iOS
  } else {
    _openFlyoutSelector();       // Windows
  }
}
```

### BottomSheet per Touch

```dart
void _openBottomSheetSelector() {
  showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
    ),
    builder: (context) => DraggableScrollableSheet(
      initialChildSize: 0.7,
      minChildSize: 0.5,
      maxChildSize: 0.95,
      expand: false,
      builder: (context, scrollController) => _buildContent(scrollController),
    ),
  );
}
```

### Flyout per Desktop

```dart
void _openFlyoutSelector() {
  _flyoutController.showFlyout(
    placementMode: FlyoutPlacementMode.rightCenter,
    builder: (context) => FlyoutContent(
      child: Container(
        constraints: const BoxConstraints(maxWidth: 500, maxHeight: 600),
        child: _buildContent(),
      ),
    ),
  );
}
```

**Riferimento:** [badge_modifica_categoria_rapida.dart](../lib/widgets/common/badge_modifica_categoria_rapida.dart)

---

## 6. Header Scrollabile

Su mobile/tablet, header fissi sprecano spazio. Soluzione: header inline scrollabile.

**Usa `DeviceContext` per decidere quale layout mostrare, NON solo il breakpoint:**

```dart
@override
Widget build(BuildContext context) {
  final ctx = DeviceContext.of(context);

  // Desktop: SEMPRE header fisso (anche finestra piccola)
  if (ctx.deviceType == DeviceType.desktop) {
    return ScaffoldPage(
      header: PageHeader(title: Text('Titolo')),
      content: _buildContent(),
    );
  }

  // Mobile/Tablet: header scrollabile
  return ScaffoldPage(
    padding: EdgeInsets.zero,
    content: SingleChildScrollView(
      child: Column(
        children: [
          _buildScrollableHeader(),
          _buildContent(),
        ],
      ),
    ),
  );
}

Widget _buildScrollableHeader() {
  return SafeArea(
    bottom: false,
    child: Padding(
      padding: const EdgeInsets.fromLTRB(12, 8, 12, 0),
      child: Row(
        children: [Text('Titolo'), Expanded(child: SearchBox(...))],
      ),
    ),
  );
}
```

> **NOTA:** Il pattern precedente usava `isTouchBreakpoint(context)` che causava
> header scrollabile anche su Windows con finestra piccola. Usare DeviceContext.

---

## 7. Blocco Pagine

Per pagine troppo complesse per smartphone:

```dart
if (PlatformUtils.isSmartphone(context)) {
  return const SmartphoneBlockScreen(
    description: 'visualizzare tutte le colonne nutrizionali',
  );
}
```

**Pagine con blocco:**
- `balance_recipe_page.dart`
- `gestione_etichette_page.dart`
- `pagina_assemblaggio_dessert.dart` (blocco parziale)

---

## 8. Checklist Migrazione

### Trovare Dialog da Migrare

```bash
# Con constraints fissi (da migrare)
grep -rn "BoxConstraints(maxWidth:" lib/widgets/dialogs/

# Gia migrati
grep -rn "getDialogConfig" lib/widgets/dialogs/
```

### Stato Migrazione

| Priorita | File | Stato |
|----------|------|-------|
| Alta | `recipe_list_dialog.dart` | Done |
| Alta | `recipe_preview_dialog.dart` | TODO |
| Alta | `ingredient_selection_dialog.dart` | TODO |
| Media | `recipe_archive_details_dialog.dart` | Done (ibrido) |
| Media | `recipe_detail_dialog.dart` | TODO |
| Bassa | `dialogs/impostazioni/*` | TODO |

### Workflow

1. Aggiungi import: `import '../../utils/responsive_helpers.dart';`
2. Nel build(): `final dialogConfig = ResponsiveHelpers.getDialogConfig(context);`
3. Sostituisci: `constraints: dialogConfig.constraints,`
4. Sostituisci: `height: dialogConfig.contentHeight,`
5. Testa su Windows E Android

---

## 9. Troubleshooting

### Layout mobile appare su Windows con finestra piccola

```dart
// SBAGLIATO: breakpoint non distingue piattaforma
if (ResponsiveHelpers.hasHorizontalSpace(context)) {
  return _buildDesktopLayout();
}
return _buildCompactLayout();  // Windows piccolo = layout mobile!

// CORRETTO: DeviceContext distingue piattaforma + dimensione
final ctx = DeviceContext.of(context);
if (ctx.deviceType == DeviceType.desktop) {
  return _buildDesktopLayout();  // SEMPRE su Windows
}
```

### Swipe/BottomSheet appare su Windows

```dart
// SBAGLIATO
if (ResponsiveHelpers.isTouchBreakpoint(context)) { ... }

// CORRETTO
if (PlatformUtils.isMobile) { ... }
```

### Dialog troppo alto su mobile

```dart
content: ConstrainedBox(
  constraints: BoxConstraints(maxHeight: dialogConfig.contentHeight),
  child: SingleChildScrollView(child: Column(...)),
),
```

### Keyboard copre input

```dart
content: Padding(
  padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
  child: ...,
),
```

### BottomSheet non rispetta Safe Area

```dart
builder: (context) => Padding(
  padding: EdgeInsets.only(
    bottom: MediaQuery.of(context).padding.bottom +
            MediaQuery.of(context).viewInsets.bottom,
  ),
  child: _buildContent(),
),
```

### Import non trovato

```dart
// Da lib/widgets/dialogs/[cat]/[file].dart
import '../../../../utils/responsive_helpers.dart';

// Da lib/widgets/[file].dart
import '../../utils/responsive_helpers.dart';

// Da lib/pages/[file].dart
import '../utils/responsive_helpers.dart';
```

---

## 10. Riferimenti

### File Helper

| Helper | File |
|--------|------|
| Layout | [responsive_helpers.dart](../lib/utils/responsive_helpers.dart) |
| Piattaforma | [platform_utils.dart](../lib/utils/platform_utils.dart) |
| DeviceContext | [device_context.dart](../lib/utils/device_context.dart) |

### Esempi Implementazione

| Pattern | File |
|---------|------|
| **DeviceContext per layout pagina** | **[tools_page.dart](../lib/pages/tools_page.dart)** |
| Separazione breakpoint/piattaforma | [reorderable_ingredients_list.dart](../lib/widgets/recipes/reorderable_ingredients_list.dart) |
| Pattern ibrido | [badge_modifica_categoria_rapida.dart](../lib/widgets/common/badge_modifica_categoria_rapida.dart) |
| Dialog responsive | [recipe_list_dialog.dart](../lib/widgets/dialogs/ricette/selezione/recipe_list_dialog.dart) |
| Header scrollabile | [ingredients_page.dart:735-833](../lib/pages/ingredients_page.dart) |
| Blocco smartphone | [smartphone_block_screen.dart](../lib/widgets/common/smartphone_block_screen.dart) |

### Documentazione Correlata

- [PIANO_MIGRAZIONE_ANDROID_MOBILE.md](../Fatti/PIANO_MIGRAZIONE_ANDROID_MOBILE.md)
