---
type: Interview Ledger
parent: spec.md
---

## Records

### L1

Status: current

Question: What audit scope should this ACT Spec preserve?

Answer: Preserve the dated 11 July 2026 action plan as an SEO remediation and growth program for labmanagergestionale.com, retaining its Critical, High, Medium, and Low priorities and its post-release measurement work.

Decision: This is a parent Spec. Its later Work Items must keep the dated audit as the source of truth and separate independently deployable technical, content, trust/conversion, and measurement workstreams.

Source: `labmanagergestionale.com-audit/2026-07-11/ACTION-PLAN.md` and `FULL-AUDIT-REPORT.md`.

### L2

Status: current

Question: What is the required HTTP-to-HTTPS behavior?

Answer: Every HTTP `GET` and `HEAD` URL must redirect to its HTTPS equivalent in one `308` hop while preserving path and query string. The check covers the homepage, form/API route, an unknown URL, and a URL with query parameters. Every HTTP non-`GET`/`HEAD` request must be rejected at edge with `400` and must not be forwarded.

Decision: The committente owns Cloudflare access. Treat the redirect and non-GET/HEAD rejection as edge/origin deployment requirements and verify them against the live site; HSTS alone is not sufficient for a first HTTP visit.

Source: `ACTION-PLAN.md`, Critical priority; user interview, 13 July 2026.

### L3

Status: current

Question: How must public claims about the Magazzino module be handled?

Answer: No public surface may promise a Warehouse capability that is not confirmed as live. Once confirmed, Warehouse, Hero, FAQ and its JSON-LD, llms.txt, pricing, and release notes must describe the same product reality.

Decision: L4's capability matrix v1 is already approved. Record it as a versioned source-controlled matrix and use it as the authoritative copy source across visible text and structured data; do not create a second product-approval gate.

Source: `ACTION-PLAN.md`, Critical priority; user approval recorded in L4.

### L4

Status: current

Question: Which Magazzino capabilities are live and publicly marketable today?

Answer: All six capabilities are live and publicly marketable: ricevimento merci, giacenze per sede, soglie configurabili, scarico FIFO, alert scadenze e trasferimenti tra sedi. The approved shared copy is: “Gestione magazzino con ricevimento merci, giacenze per sede, soglie configurabili, scarico FIFO, alert scadenze e trasferimenti tra sedi.”

Decision: Record the versioned capability matrix v1 as approved by the committente on 13 July 2026. Use its claim IDs and the approved copy as the cross-surface source for L3; the matrix is no longer a product-decision blocker.

Source: `FULL-AUDIT-REPORT.md`, "Contenuti, fiducia e conversione"; user interview, 13 July 2026.

### L5

Status: current

Question: What mobile performance and UX changes are required?

Answer: Prioritize only the LCP asset visible at the current breakpoint; provide responsive AVIF/WebP or equivalent responsive assets with correct sizing; optimize the newsletter screenshot; measure third-party scripts; do not defer consent/accessibility tooling unless legal and accessibility requirements remain satisfied; keep the cookie banner from obscuring the primary hero CTA after first interaction; and provide mobile touch targets of at least 44 by 44 px.

Decision: Improvement must be verified with a mobile deployment check and field measurement onboarding, not inferred solely from the existing Lighthouse lab results. The current Spec implements only the deterministic asset and touch-target portion; consent-state protocol and field acceptance are deferred by L13.

Source: `ACTION-PLAN.md`, High and Medium priorities; scope split in L13.

### L6

Status: current

Question: How should crawl, metadata, and structured-data issues be corrected?

Answer: Remove the global HowTo and the Home-only global breadcrumb; use accurate page-scoped WebPage and BreadcrumbList markup for pricing and newsletter; retain FAQPage for semantics and AI extraction rather than expected Google FAQ rich results; emit exactly one noindex directive for 404s; preserve the intended sitemap boundary; and align live llms.txt and robots.txt responses to `text/plain; charset=utf-8`.

Decision: Only shared brand/entity data belongs in the global layout. Page-context data belongs to the route that renders the corresponding visible content.

Source: `ACTION-PLAN.md`, High, Medium, and Low priorities.

### L7

Status: current

Question: What trust and conversion behavior should the program introduce?

Answer: Make the 14-day free trial the primary CTA, provide contextual secondary paths to Ordini or Prezzi, and provide paths for business owner, production/orders manager, price evaluator, and compliance manager. Add only verifiable identity, sameAs profiles, team/reviewer information, customer evidence, and case studies; aggregateRating requires authentic, verifiable reviews.

Decision: Do not fabricate social proof, identity information, claims, or ratings. Legal and business approval gate any changes to consent tooling and evidence publication. The current Spec corrects only direct trial/access destinations already approved in L10; experiment, trust evidence and consent changes are deferred by L13.

Source: `ACTION-PLAN.md`, High priority; scope split in L13.

### L8

Status: current

Question: What content architecture and editorial rules are required?

Answer: Keep the homepage focused on "gestionale pasticceria" commercial intent. After SERP-overlap research, create distinct feature/use-case and resource pages for orders, warehouse, allergen labels, food cost, allergens regulation, lot/expiry traceability, production planning, and recipe balancing. Each resource must be substantially unique, receive at least three relevant internal links, and link contextually to feature, trial, and pricing pages. Decide deliberately whether `/aggiornamenti` becomes an indexable self-canonical release-notes archive or remains intentionally noindex.

Decision: Do not create content that cannibalizes the homepage or publish unsubstantiated normative claims; use attributed, current, citable evidence and sources. The content map and editorial decision are deferred by L13; `/aggiornamenti` remains noindex in the current phase.

Source: `ACTION-PLAN.md`, Medium priority; scope split in L13.

### L9

Status: current

Question: What must be measured and monitored after releases?

Answer: Connect Search Console, CrUX/PageSpeed, GA4, and Moz or Bing Webmaster as available; monitor coverage, selected canonicals, queries, CTR, mobile LCP and INP field data, CTA/trial/contact/drop-off behavior, and referring-domain/backlink trends. Keep low-priority security and discovery work after higher-priority remediation: CSP nonce/hash evaluation, sitemap hint review, legacy-domain index normalization, and optional IndexNow.

Decision: Do not claim organic, Core Web Vitals, or backlink outcomes until the relevant external measurement data is available. Ownership, access and measurement readiness are deferred by L13.

Source: `ACTION-PLAN.md`, Low priority and post-release measurement; `FULL-AUDIT-REPORT.md`, scope limits; scope split in L13.

### L10

Status: current

Question: What is the approved self-service trial and access journey?

Answer: The marketing-site CTA for the free trial and the access CTA both lead directly to `https://app.labmanagergestionale.com`, with no intermediate filter page. The page lets existing users log in and makes registration for the 14-day trial visible. Registration requires name, surname, email, password and password confirmation; telephone is optional. It does not require ragione sociale or tipo di attività. The user receives an email token, verifies it to create the account, returns manually to login, and the 14-day full trial starts on the first successful login. No payment card is required for the trial.

Decision: The website is the commercial surface and the web app is the unique access point. Treat trial-started (first successful login) as the primary immediate conversion, while retaining paid subscription as the final conversion after the trial delay.

Source: User interview, 13 July 2026.

### L11

Status: current

Question: What subscription, price, and post-trial behavior is approved?

Answer: At expiry the user can still authenticate, but sees plan selection before operational use. The monthly plan is €44,99 and the annual plan is €480; both exactly match Stripe. The chosen plan opens Stripe and confirmed payment restores app use. The public site shows only the two prices, with no IVA/regime wording; LabManager absorbs any applicable annual stamp duty. Both plans renew automatically. If the customer cancels renewal, full access remains until the end of the already-paid period.

Decision: Stripe is used to collect payment and the billing data needed at checkout. Payment entitlement must be confirmed by the subscription state rather than inferred only from a browser return URL. Live configuration and tests are deferred by L13.

Source: User interview, 13 July 2026; scope split in L13.

### L12

Status: current

Question: What is the scope of the auth UI restyling?

Answer: Restyle login, registration, password recovery, and email-token verification in the separate Flutter repository `/Users/emanuele/Documents/github/Labmanager`. Preserve the established behavior. Visual mockups have been prepared for the future Work Item, but no direction has yet been selected.

Decision: Treat this as a bounded cross-repository conversion/UI Work Item, not a change to the marketing-site repository or to authentication and subscription behavior. The visual choice and implementation are deferred by L13.

Source: User interview, 13 July 2026; scope split in L13.

### L13

Status: current

Question: Come deve essere delimitato il perimetro della Spec madre mentre alcuni stream richiedono ancora approvazioni o configurazioni esterne?

Recommended Answer:
- Mantenere nel perimetro corrente soltanto gli interventi con comportamento e criteri di verifica già determinati.
- Differire in stream separati l'approvazione/pubblicazione degli asset di fiducia, il contratto dell'esperimento CTA, la configurazione Stripe live e l'entitlement verificato, la mappa intent/URL e la decisione su `/aggiornamenti`, il protocollo mobile e budget Lighthouse, la measurement readiness, e la direzione/implementazione del restyling auth Flutter.
- Conservare come vincoli per i futuri stream tutte le decisioni già registrate nei ledger interessati.

Answer: ok

Decision: La Spec madre viene scissa per perimetro. Restano implementabili gli interventi già determinati, inclusi trasporto HTTP/HTTPS, riconciliazione delle promesse Magazzino, correzioni crawl/metadata/schema, asset mobile deterministici, touch target e collegamenti CTA già approvati verso la web app, senza introdurre un esperimento o nuova strumentazione. Gli stream che richiedono ulteriori owner, approvazioni, configurazioni live o una scelta di design sono intenzionalmente differiti e saranno oggetto di Spec o Work Item autonomi quando la relativa decisione sarà disponibile.

Reason: Il differimento evita assunzioni su decisioni legali, business, editoriali, analytics, Stripe e design, senza revocare i requisiti e i vincoli già risolti.

Source: User approval, 13 July 2026.
