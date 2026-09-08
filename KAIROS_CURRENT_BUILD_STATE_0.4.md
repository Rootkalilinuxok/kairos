# KAIROS — Current Build State 0.4

Audit fattuale del repository e del deployment dopo **KAIROS v3 Phase 1A.2 — Visual Reference Implementation**.

- Data snapshot: 2026-09-08 UTC
- Baseline applicativa Phase 1A.1: f3904fc1ff99685d354ce8a6ae4f3f097a6a01c0 (f3904fc)
- Commit applicativo auditato e pubblicato: 5b11b58fa4b6cb6ae4a5c1130ddfeecbda558e65 (5b11b58)
- Fase: **KAIROS v3 PHASE 1A.2 completed**
- Prodotto: **KAIROS**
- Claim: **Decide at the right moment.**
- Site project: appgprj_6a9ee97218d88191abbe3584dae866dc
- Release pubblicata: **Sites version 8**
- Deployment: appgdep_6a9f7fe6504081919dd7a590afa3aed8
- URL: https://ai-business-os.alex818181.chatgpt.site
- Audience: privata, custom owner-only verificata
- Phase 1B: non iniziata
- Phase 2A: non iniziata

Il commit documentale che aggiunge questo snapshot è successivo al commit applicativo e non modifica il codice pubblicato.

## 1. Classificazioni

| Stato | Significato |
|---|---|
| **OPERATIVO** | Il comportamento dichiarato funziona nella shell/client o nell’ambiente development ed è stato verificato direttamente. |
| **FIXTURE / LOCAL STATE** | La funzione usa dati development centralizzati e/o stato locale; non è persistenza production. |
| **SHELL / EXTENSION POINT** | Esistono contratto, route o UI predisposta, ma workflow, servizio o motore finale è intenzionalmente assente. |
| **NON IMPLEMENTATO** | Non esiste una implementazione production nella build auditata. |

Una route esistente non viene classificata automaticamente come business capability implementata.

## 2. Inventario numerico

| Elemento | Stato corrente |
|---|---:|
| Route nel Navigation Registry | **73** |
| Admin | **50** |
| Advisor | **16** |
| Employee | **7** |
| Moduli nel Module Registry | **13** |
| Componenti TSX | **101** |
| Componenti applicativi KAIROS | **40** |
| Primitive UI | **61** |
| File test | **9** |
| Test automatici | **42/42 PASS** |
| Dipendenze runtime | **27** |
| Dipendenze development | **17** |
| Microvisualizzazioni NOW | **14**: 5 KPI, 6 Operating Pulse, 3 Predictive Insights |

Phase 1A.2 non aggiunge route, moduli, API di dominio o dipendenze.

## 3. Routing — 73 route preservate

Routing fisico:

- app/admin/[...slug]/page.tsx
- app/advisor/[...slug]/page.tsx
- app/employee/[...slug]/page.tsx

I catch-all risolvono le destinazioni tramite navigationItemForRoute() e delegano a PortalPage. Le route sconosciute producono un 404 applicativo.

Route shell/API:

- / e /login: login development;
- /admin: redirect a /admin/dashboard;
- /advisor: redirect a /advisor/dashboard;
- /employee: redirect a /employee/home;
- /api/dev-auth/login;
- /api/dev-auth/logout.

### Admin — 50

- /admin/action-center
- /admin/ai-workspace
- /admin/automation/automations
- /admin/automation/integrations
- /admin/automation/notifications
- /admin/automation/workflows
- /admin/company/catalog
- /admin/company/contacts
- /admin/company/customers
- /admin/company/projects
- /admin/company/suppliers
- /admin/control/anomalies
- /admin/control/audit
- /admin/control/compliance
- /admin/control/period-close
- /admin/control/policies
- /admin/dashboard
- /admin/documents/archive
- /admin/documents/hub
- /admin/documents/studio
- /admin/documents/templates
- /admin/finance/bank-accounts
- /admin/finance/billing
- /admin/finance/company-cards
- /admin/finance/expenses
- /admin/finance/income
- /admin/finance/movements
- /admin/finance/reconciliations
- /admin/finance/statements
- /admin/inbox
- /admin/intelligence/analytics
- /admin/intelligence/digital-twin
- /admin/intelligence/forecast
- /admin/intelligence/reports
- /admin/intelligence/scenarios
- /admin/people/employee-cards
- /admin/people/employee-expenses
- /admin/people/employees
- /admin/people/payroll
- /admin/people/trips
- /admin/people/work-reports
- /admin/system/company-brain
- /admin/system/modules
- /admin/system/roles
- /admin/system/settings
- /admin/system/users
- /admin/tax/deadlines
- /admin/tax/incentives
- /admin/tax/intelligence
- /admin/tax/regulation

### Advisor — 16

- /advisor/accounting/expenses
- /advisor/accounting/invoices
- /advisor/accounting/movements
- /advisor/accounting/reconciliations
- /advisor/accounting/statements
- /advisor/closing
- /advisor/compliance/anomalies
- /advisor/dashboard
- /advisor/documents
- /advisor/notifications
- /advisor/people/employee-reports
- /advisor/people/payroll
- /advisor/reports
- /advisor/requests
- /advisor/tax/deadlines
- /advisor/tax/documents

### Employee — 7

- /employee/documents
- /employee/home
- /employee/notifications
- /employee/profile
- /employee/trips
- /employee/upload-expense
- /employee/upload-work-report

Le tre route additive della Phase 1A restano extension point:

| Route | Stato reale |
|---|---|
| /admin/inbox | **SHELL / EXTENSION POINT** — Inbox finale rinviata |
| /admin/control/policies | **SHELL / EXTENSION POINT** — policy/compliance engine assente |
| /advisor/closing | **SHELL / EXTENSION POINT** — Closing Cockpit finale rinviato |

## 4. Navigation Registry v3

File: core/navigation/registry.ts.

È l’unica fonte applicativa per route e navigazione. Metadati:

- key, route, label, labelKey;
- portal, group, icon;
- permission, module, order;
- pageKind, description, primaryActions;
- section, sectionLabel, sectionOrder;
- subsection, subsectionLabel, subsectionOrder;
- placement: primary, nested o utility;
- mobileOrder, mobileLabel;
- defaultExpanded;
- breadcrumbLabel.

Helper operativi:

- navigationForPortal(portal);
- navigationItemForRoute(route);
- mobileNavigationForPortal(portal).

**Phase 1A.2 non modifica registry, route o metadati.**

## 5. Module Registry

File: core/modules/registry.ts.

| Modulo | Portali | Stato |
|---|---|---|
| ai-workspace | Admin | **SHELL / EXTENSION POINT** |
| action-center | Admin, Advisor | **FIXTURE / LOCAL STATE** |
| inbox | Admin | **SHELL / EXTENSION POINT** |
| crm | Admin | **SHELL / EXTENSION POINT** |
| people | Admin, Advisor, Employee | **FIXTURE / LOCAL STATE** |
| banking | Admin, Advisor | **SHELL / EXTENSION POINT** |
| billing | Admin, Advisor | **SHELL / EXTENSION POINT** |
| documents | tutti | **FIXTURE / LOCAL STATE** |
| analytics | Admin, Advisor | **FIXTURE / LOCAL STATE** |
| compliance | Admin, Advisor | **SHELL / EXTENSION POINT** |
| tax | Admin, Advisor | **SHELL / EXTENSION POINT** |
| automation | tutti | **SHELL / EXTENSION POINT** |
| platform | Admin | **SHELL / EXTENSION POINT** |

moduleByKey resta il lookup condiviso. Phase 1A.2 non modifica il Module Registry.

## 6. Precision Intelligence visual system 1A.2

File centrale: app/globals.css.

### Visual contract — OPERATIVO

- canvas dark deep navy con atmosfera statica blue/violet;
- traduzione Light professionale, non semplice inversione;
- superfici panel glossy controllate con bordo luminoso sottile;
- cyan/electric blue per agency, focus e analytical selection;
- violet/magenta limitati a serie, forecast e segnali semantici;
- glow localizzato su active navigation, focus, analytical points, Command Bar e Ask KAIROS;
- topbar e sidebar deep navy;
- tabular numerals per valori e assi;
- separatori compatti e alta densità informativa;
- nessun ambient loop, cyberpunk, AI orb, glass-everywhere o nuova libreria visuale.

Token Phase 1A.2 principali:

- kairos-canvas-0, kairos-canvas-1, kairos-canvas-2;
- intelligence-cyan, intelligence-blue, intelligence-violet, intelligence-magenta;
- glow-xs, glow-sm, glow-md, glow-lg;
- canvas-atmosphere;
- panel-background, panel-border, panel-shadow;
- topbar-background, sidebar-background;
- chart-grid.

I precedenti token di surface, density, provenance, focus e motion restano compatibili.

## 7. NOW / Admin Dashboard

File: components/pages/admin-dashboard.tsx.

### Layout e contenuto — OPERATIVO su fixture

- header NOW con saluto, numero elementi da attenzionare, data/ora e signature KAIROS;
- KPI strip compatta a cinque indicatori;
- Performance & Forecast principale;
- KAIROS Brief;
- Priorità;
- Operating Pulse;
- KAIROS Predictive Insights;
- Ask KAIROS CTA collegata alla modalità preview della Command Bar.

Ordine mobile:

1. KPI;
2. KAIROS Brief;
3. Performance & Forecast;
4. Priorità;
5. Operating Pulse;
6. Predictive Insights.

Il rendering, i controlli periodo e i link sono **OPERATIVI**. Valori, insight e serie sono **FIXTURE / LOCAL STATE**. NOW finale e i motori decisionali non sono stati anticipati.

## 8. KPI e microchart riutilizzabili

Nuovi componenti:

- components/visuals/mini-sparkline.tsx;
- components/visuals/mini-bars.tsx;
- components/visuals/mini-ring.tsx;
- components/visuals/mini-segment.tsx;
- components/visuals/metric-visual.tsx.

Contratto typed:

- core/visualization/mini-chart.ts;
- MetricVisualSpec union: sparkline, bars, ring, segment;
- tone: cyan, blue, violet, magenta, amber, danger;
- accessibleLabel obbligatoria;
- period e provenance opzionali;
- supporto ai null per evitare interpolazioni false;
- forecastFrom per il tratto forecast della sparkline.

Fixture centralizzate:

- fixtures/development/visualization-fixtures.ts;
- fonte KAIROS_PHASE_1A_DEVELOPMENT_FIXTURE;
- nessun valore random o array numerico hard-coded nei componenti JSX.

Mappatura NOW:

| Area | Visuale |
|---|---|
| Ricavi | cyan sparkline |
| Posizione di cassa | blue/cyan sparkline |
| Profitto / margine | violet sparkline |
| Tax exposure | magenta sparkline con forecast |
| Compliance / anomalie | segment severity bars |
| Cash flow forecast | cyan bars |
| Documenti mancanti | magenta bars |
| Fatture da incassare | cyan bars |
| Compliance | cyan ring |
| Tax forecast | blue bars |
| Prossime scadenze | magenta bars |
| Predictive Insights | tre sparklines contestuali |

Le microvisualizzazioni sono **OPERATIVE come componenti**, ma mostrano **FIXTURE / LOCAL STATE**.

## 9. Performance & Forecast chart

L’implementazione Recharts esistente è stata evoluta, non sostituita.

**OPERATIVO su fixture**:

- ComposedChart con tre serie: Ricavi, Costi, Profitto;
- Actual solid;
- Forecast dashed;
- area fill sottile;
- missing values non interpolati;
- tooltip premium con data, unità e valori tabular;
- crosshair sul datum attivo;
- nearest-point highlight tramite active dots;
- marker verticale OGGI e reference dots;
- grid più sottile;
- legenda esplicita Actual/Forecast e serie;
- range 30G, 90G, YTD, 12M, Personalizzato;
- date personalizzate From/To;
- summary screen-reader e Recharts accessibility layer.

Le serie restano fixture. Reality Horizon, Evidence Lattice, Decision Debt Curve, Scenario Differential Lens e Outcome Reconciliation Trace sono **NON IMPLEMENTATI**.

## 10. Operating Pulse

**OPERATIVO su fixture**:

- selezione dinamica locale per relevance;
- sei indicatori visibili;
- 3 colonne × 2 righe su desktop ampio;
- progressivo 2 colonne e 1 colonna sui breakpoint inferiori;
- label, provenance badge, valore, contesto e mini visuale;
- celle linkabili verso route esistenti;
- separatori compatti e nessuna card gigante.

La selezione KAIROS futura alimentata da Analytics/Forecast Engine resta **SHELL / EXTENSION POINT**.

## 11. Sidebar, topbar e shell

Files visualmente aggiornati:

- components/shell/app-sidebar.tsx;
- components/shell/topbar.tsx;
- components/shell/portal-shell.tsx;
- app/globals.css.

### Sidebar — comportamento preservato

- WORK, INTELLIGENCE, CONTROL, AUTOMATIONS e SETTINGS indipendenti;
- Company, People, Finance, Documents e Tax annidati;
- trigger button, Enter/Space, aria-expanded e aria-controls;
- auto-expand della nuova route;
- chiusura manuale consentita anche sul parent attivo;
- persistenza in localStorage con kairos.sidebar.sections;
- branch chiusi aria-hidden + inert;
- icon-only e full mobile menu compatibili.

Phase 1A.2 modifica esclusivamente la presentazione:

- deep navy;
- active rail cyan;
- edge light controllata;
- icone più nette;
- AI Workspace rafforzata come CTA inferiore.

Topbar:

- superficie navy/polished;
- launcher “Ask KAIROS or search…”;
- stati hover/focus coerenti con il glow contract;
- nessuna modifica funzionale ai controlli.

## 12. Universal Command Bar

File: components/command-bar/universal-command-bar.tsx.

Phase 1A.2 applica solo classi e stati visuali:

- overlay e panel L2 più profondi;
- bordo cyan controllato;
- selected keyboard result più leggibile;
- focus layer premium;
- entry/exit tramite motion token;
- context strip e category grouping preservati.

Stato funzionale:

| Area | Stato |
|---|---|
| Apertura Ctrl+K / Cmd+K, Escape, Close | **OPERATIVO** |
| Navigate da registry | **OPERATIVO** |
| Search | **FIXTURE / LOCAL STATE** |
| Action | **SHELL / EXTENSION POINT** — disabled preview |
| Ask KAIROS | **SHELL / EXTENSION POINT** — disabled preview |

Ask KAIROS non simula esecuzione AI.

## 13. Context Capsule v1

Files:

- core/context/context-capsule.ts;
- components/providers/context-capsule-provider.tsx.

Contract version 1.0; campi: user, organization, portal, route, current page, current object, selected rows, filters, visible columns, period, permissions e provenance.

È **SHELL / EXTENSION POINT**: il provider popola il contesto shell e offre updatePageContext()/resetPageContext(), ma DataGrid, viewer e motori futuri non sono ancora collegati end-to-end.

Phase 1A.2 non modifica il Context Capsule.

## 14. DataGrid

Files principali:

- components/data-grid/data-grid.tsx;
- components/data-grid/filter-builder.tsx;
- components/data-grid/saved-view-selector.tsx;
- core/data-grid/filters.ts;
- core/data-grid/export.ts.

**OPERATIVO e invariato in Phase 1A.2**:

- search e sorting;
- filtri avanzati combinati;
- Data dal >= start_date e Data al <= end_date, usabili singolarmente o insieme;
- employee, category, state, currency, receipt, reconciliation, min/max amount;
- reset;
- selezione e select-all-visible;
- visibilità, ordine e resize colonne;
- detail drawer e context menu;
- mobile cards;
- export disabilitato con zero selezioni;
- export selected-only nell’ordine corrente;
- sole colonne semantiche visibili;
- CSV, vero XLSX e vero PDF report.

Record, delete e saved view restano **FIXTURE / LOCAL STATE**. Nessun file DataGrid è stato modificato.

## 15. Detail Drawer e Universal File Viewer

Detail Drawer è **OPERATIVO su fixture**: Sheet a destra desktop, Drawer mobile, close accessibile, provenienza, allegati nel viewer.

File Viewer:

- immagine: **OPERATIVO su fixture** con modal, preview, zoom, rotazione/pan, fullscreen shell, download e metadati;
- PDF: **SHELL / EXTENSION POINT** con “Anteprima PDF simulata”; non esiste un renderer PDF reale;
- print e mobile metadata sheet: rinviati.

Phase 1A.2 non modifica File Viewer o Detail Drawer. Il polish overlay deriva dai token globali compatibili.

## 16. Authentication development

Files:

- core/auth/development-session.ts;
- app/api/dev-auth/login/route.ts;
- app/api/dev-auth/logout/route.ts;
- layout protetti Admin, Advisor ed Employee.

**OPERATIVO — DEVELOPMENT / TEST ONLY**:

- abilitato esclusivamente con ALLOW_DEV_LOGIN=true;
- admin / 1010, role super_admin;
- password accettata come stringa;
- verifica server-side tramite digest e confronto timing-safe;
- nessuna password nel client bundle;
- redirect a /admin/dashboard;
- cookie HttpOnly, Path=/, max-age 8 ore;
- HTTPS: Secure, SameSite=None, Partitioned;
- logout elimina la sessione;
- route protette tornano non accessibili dopo logout.

Verifica post-deploy reale del 2026-09-08:

- admin / 1010: HTTP 200, role super_admin, redirectTo /admin/dashboard;
- password errata: HTTP 401 con messaggio discreto;
- username errato: HTTP 401 con messaggio discreto;
- /admin/dashboard senza sessione: HTTP 307 verso /login;
- dashboard e tre route Phase 1A con sessione: HTTP 200;
- refresh: HTTP 200;
- logout: HTTP 303 con Max-Age=0;
- route protetta dopo logout: HTTP 307 verso /login.

La privacy ChatGPT Site resta un livello upstream separato. Auth production, inviti, MFA, recovery, session store e RBAC production sono **NON IMPLEMENTATI**.

## 17. Theme, motion e accessibilità

Theme provider: next-themes, class strategy, default system, system preference attiva.

**OPERATIVO**:

- Light, Dark e System;
- traduzione semantica dei nuovi token in entrambi i temi;
- focus-visible non color-only;
- tabular numerals;
- label accessibili per le 14 microvisualizzazioni;
- chart summary e accessibility layer;
- legend Actual/Forecast esplicita;
- hit target esistenti preservati;
- link, button e region semanticamente distinti;
- reduced motion globale.

Motion tokens invariati:

| Token | Valore |
|---|---:|
| press | 80ms |
| hover | 110ms |
| focus/selection | 130ms |
| icon | 140ms |
| collapse | 170ms |
| disclosure | 180ms |
| popover | 160ms |
| drawer | 220ms |
| modal | 200ms |
| layout | 260ms |

Phase 1A.2 usa motion solo per hover/focus, sidebar reveal, tooltip, microchart mount/update, Command Bar e overlay. Nessuna animazione ambient continua.

## 18. Responsive shell e mobile

**OPERATIVO**:

- desktop ad alta densità;
- tablet con riduzione progressiva delle colonne;
- mobile action-first, non desktop compresso;
- bottom navigation role-specific derivata dal registry;
- Employee Home, Expense, Work Report, Notifications e More invariati;
- full menu mobile riusa sidebar e registry;
- Operating Pulse passa da 3×2 a 2×3 e quindi 1×6;
- microchart ridimensionate senza scroll orizzontale obbligatorio;
- sidebar icon-only preservata.

Nessun file di mobile navigation è stato modificato.

## 19. Fixture/config layer

Files:

- fixtures/development/index.ts;
- fixtures/development/experience-config.ts;
- fixtures/development/visualization-fixtures.ts.

Fonte dichiarata: KAIROS_PHASE_1A_DEVELOPMENT_FIXTURE.

Contenuti:

- tenant, utenti e ruoli demo;
- brand KAIROS e claim;
- badge DEV · FIXTURE;
- record, documenti, notifiche e insight;
- Command Bar preview;
- provenance;
- serie del chart principale;
- 5 visual KPI;
- 6 visual Operating Pulse;
- 3 visual Predictive Insights.

Tutto è **FIXTURE / LOCAL STATE**, centralizzato e sostituibile da adapter futuri.

## 20. Providers

Root:

1. ThemeProvider
2. TooltipProvider
3. UniversalFileViewerProvider
4. application
5. Toaster

Portal:

1. AccessProvider
2. ContextCapsuleProvider
3. UniversalCommandBarProvider
4. SidebarProvider
5. AppSidebar
6. Topbar
7. page content
8. MobileNavigation

Phase 1A.2 non modifica ordine o responsabilità dei provider.

## 21. Services, data layer e permission hooks

Operativi oggi:

- development auth/session adapter;
- login/logout handlers;
- pure DataGrid filters;
- CSV/XLSX/PDF export services;
- fixture/config adapters;
- sidebar disclosure helpers;
- chart grammar constants;
- typed microchart contract.

Non esiste un generic production data service. UI e fixture restano separate; nessuna UI o AI accede direttamente a SQL.

components/gates/permission-gate.tsx espone AccessProvider, PermissionGate e FeatureFlagGate. Registry e Context Capsule trasportano permission/module metadata. Sono **SHELL / EXTENSION POINT**, non RBAC server-side production tenant-scoped.

Hook condivisi:

- useMobile() / useIsMobile();
- useUniversalFileViewer();
- useUniversalCommandBar();
- useContextCapsule().

## 22. Componenti aggiunti e modificati in Phase 1A.2

Nuovi:

- components/visuals/metric-visual.tsx
- components/visuals/mini-bars.tsx
- components/visuals/mini-ring.tsx
- components/visuals/mini-segment.tsx
- components/visuals/mini-sparkline.tsx
- core/visualization/mini-chart.ts
- fixtures/development/visualization-fixtures.ts
- tests/phase-1a2-visual.test.mjs

Modificati:

- app/globals.css
- components/command-bar/universal-command-bar.tsx
- components/pages/admin-dashboard.tsx
- components/shell/app-sidebar.tsx
- components/shell/portal-shell.tsx
- components/shell/topbar.tsx
- fixtures/development/index.ts

Non modificati: route files, Navigation Registry, Module Registry, authentication, Context Capsule, DataGrid, File Viewer, Detail Drawer, mobile navigation e package manifests.

## 23. Dipendenze

Nessuna dipendenza aggiunta, rimossa o aggiornata.

Runtime (27): @base-ui/react, @hookform/resolvers, @shadcn/react, class-variance-authority, clsx, cmdk, date-fns, drizzle-orm, embla-carousel-react, exceljs, input-otp, jspdf, jspdf-autotable, lucide-react, next, next-themes, radix-ui, react, react-day-picker, react-dom, react-hook-form, react-resizable-panels, recharts, sonner, tailwind-merge, vaul, zod.

Development (17): @cloudflare/vite-plugin, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom, @vitejs/plugin-react, @vitejs/plugin-rsc, drizzle-kit, eslint, eslint-config-next, react-server-dom-webpack, tailwindcss, tw-animate-css, typescript, vinext, vite, wrangler.

Versioni rilevanti: Next 16.2.6, React 19.2.6, TypeScript 5.9.3, vinext 0.0.50, Vite 8.0.13, Recharts 3.8.x.

## 24. Test e QA

Suite presenti: 9.

- tests/ai-business-os-shell.test.mjs
- tests/data-grid-patch.test.mjs
- tests/patch-shell.test.mjs
- tests/phase-1a-infrastructure.test.mjs
- tests/phase-1a1-polish.test.mjs
- tests/phase-1a2-visual.test.mjs
- tests/rendered-html.test.mjs
- tests/sidebar-collapse.test.mjs
- tests/ui-components.test.mjs

Risultati:

| Gate | Esito |
|---|---|
| npm test | **42/42 PASS** |
| Test Phase 1A.2 dedicati | **5/5 PASS** |
| ESLint | **PASS** |
| TypeScript tsc --noEmit | **PASS** |
| Production build | **PASS** |
| git diff --check | **PASS** |
| Route registry | **73 = 50 Admin + 16 Advisor + 7 Employee** |
| Auth/session/logout live | **PASS** |
| Route live campione | **PASS** |
| Worker exceptions/crash post-release | **0** |
| Expected negative-auth log events | **4 × HTTP 401, outcome ok** |

La suite copre:

- dev auth, credenziali errate, cookie/sessione, refresh e logout;
- tutte le 73 route e i tre portali;
- sidebar disclosure, route auto-expand, manual collapse, icon-only/mobile;
- Command Bar, shortcut e preview boundary;
- DataGrid, From/To, selezione e selected-only CSV/XLSX/PDF;
- File Viewer e limite PDF dichiarato;
- Light/Dark/System e reduced motion;
- microchart contracts e fixture centralizzate;
- KPI, Operating Pulse 3×2 e main chart semantics;
- assenza di modifiche distruttive ai boundary protetti.

Verifica browser:

- la reference approvata 1536×1024 è stata ispezionata integralmente;
- login KAIROS è stato verificato nel browser cloud senza errori console applicativi;
- il pass visuale autenticato dashboard-to-reference non è stato completabile perché il secure browser-auth adapter ha restituito locator_invalid;
- non sono stati usati cookie injection o bypass del browser;
- la dashboard autenticata è stata verificata tramite HTTP live, SSR e test source-contract, ma ciò non equivale a un confronto visuale pixel/fidelity autenticato.

Questo limite è registrato in design-qa.md con esito **blocked**, non “passed”.

## 25. Bundle impact

Nessuna nuova libreria.

| Asset | Phase 1A.1 | Phase 1A.2 | Delta |
|---|---:|---:|---:|
| Main portal client chunk | 552,354 B | 580,764 B | +28,410 B / **+5.14%** |
| Main CSS | 201,424 B | 224,130 B | +22,706 B / **+11.27%** |

Il delta supera il target preferenziale del 2%. È dovuto al nuovo dashboard composto, alle primitive Recharts già installate e tree-shaken, ai 14 microchart SVG data-driven e al visual contract Light/Dark. Nessuna dipendenza è stata introdotta.

Il warning Vite per chunk client >500 kB resta non bloccante. Code splitting del dashboard/export resta technical debt.

## 26. Build, hosting e deployment

| Elemento | Valore |
|---|---|
| Build | npm run build / vinext build |
| Source branch | main |
| Commit pubblicato | 5b11b58fa4b6cb6ae4a5c1130ddfeecbda558e65 |
| Sites project | appgprj_6a9ee97218d88191abbe3584dae866dc |
| Saved/published version | **8** |
| Version id | appgprj_6a9ee97218d88191abbe3584dae866dc~appgver_ded3900cbf2c819196c85226e832887c |
| Deployment id | appgdep_6a9f7fe6504081919dd7a590afa3aed8 |
| Provider deployment | site---6a9ee97218d88191abbe3584dae866dc |
| Deployment last status update | 2026-09-08T03:25:17.313538+00:00 |
| URL | https://ai-business-os.alex818181.chatgpt.site |
| Status | succeeded / active |
| Access | custom owner-only: 1 allowed account, 0 groups, 0 external visitors |
| Runtime env revision | 8; ALLOW_DEV_LOGIN=true |
| Worker exceptions/crash post-release | 0 |
| Log note | errors_only restituisce i quattro 401 intenzionali dei test credenziali; tutti outcome ok, error null |
| D1 / R2 | none / none |

La protezione privata ChatGPT Site non è stata rimossa e il Site non è pubblico.

## 27. Capability audit

| Capability | Classificazione |
|---|---|
| Development auth e route protection | **OPERATIVO** |
| 73 route registry-backed | **OPERATIVO** |
| Sidebar desktop controllata/annidata | **OPERATIVO** |
| Navigation mobile role-specific | **OPERATIVO** |
| Light/Dark/System | **OPERATIVO** |
| Command Bar shell/navigate | **OPERATIVO** |
| Command Bar Search | **FIXTURE / LOCAL STATE** |
| Command Bar Action/Ask | **SHELL / EXTENSION POINT** |
| Context Capsule v1 | **SHELL / EXTENSION POINT** |
| Precision Intelligence visual contract | **OPERATIVO** come UI system |
| Microchart component family | **OPERATIVO** con dati fixture |
| Main Performance & Forecast | **OPERATIVO** con dati fixture |
| KPI / Brief / Pulse / Predictive | **FIXTURE / LOCAL STATE** |
| DataGrid interaction/export | **OPERATIVO** |
| DataGrid mutation/persistence | **FIXTURE / LOCAL STATE** |
| Detail Drawer | **OPERATIVO** su fixture |
| File Viewer immagini | **OPERATIVO** su fixture |
| File Viewer PDF | **SHELL / EXTENSION POINT** |
| Inbox/Policies/Closing finali | **SHELL / EXTENSION POINT** |
| Employee uploads | **FIXTURE / LOCAL STATE** |
| Banking/tax/compliance/payroll engines | **NON IMPLEMENTATO** |
| Production DB/storage/OCR | **NON IMPLEMENTATO** |
| Production AI/tool orchestration | **NON IMPLEMENTATO** |
| Production tenancy/RBAC/MFA | **NON IMPLEMENTATO** |
| Advanced analytical signature visualizations | **NON IMPLEMENTATO** |

## 28. Known limitations e technical debt

- Visual comparison autenticato con la reference bloccato dal secure browser-auth adapter locator_invalid.
- PDF preview simulata; renderer e print assenti.
- Context Capsule non collegato live a DataGrid/detail/chart.
- Search Command Bar locale; Action/Ask non eseguibili.
- Dashboard, chart, microchart, insight, upload e notifiche sono fixture/local state.
- Permission/module gates non sostituiscono RBAC server-side.
- Nessun domain repository/service production persistente.
- Main client chunk 580,764 B e warning >500 kB.
- CSS Phase 1A.2 cresce dell’11.27%; futura estrazione per route resta possibile.
- Test sidebar e visuali sono state/source/SSR contract; non è presente un DOM visual regression runner dedicato.

## 29. Rinviato esplicitamente a Phase 1B

1. NOW finale alimentato da oggetti e segnali reali;
2. Decisions finale;
3. Inbox queue finale;
4. Admin e Advisor Closing Cockpit finali;
5. Advisor Accounting Cockpit finale;
6. Integrations experience finale;
7. contextual AI governata;
8. binding live fra Context Capsule, DataGrid, detail e chart;
9. Command Bar Action/Ask reali dietro service e permission adapter;
10. shared object resolution fra NOW, Decisions, Inbox, Closing e Notifications;
11. File Viewer print/mobile metadata refinements;
12. advanced analytics/report frames e drilldown;
13. Reality Horizon, Evidence Lattice, Decision Debt Curve, Scenario Differential Lens e Outcome Reconciliation Trace.

## 30. Rinviato esplicitamente a Phase 2A

1. tenant/organization production model;
2. identity lifecycle, inviti, MFA, recovery e session store;
3. RBAC server-side tenant-scoped;
4. canonical objects, relations ed event model;
5. policy/autonomy framework;
6. database, storage, ingestion documentale e OCR;
7. governed AI orchestration/tool layer;
8. Output Engine production;
9. semantic metrics foundation production;
10. domain service/repository interfaces production;
11. banking, tax, compliance e payroll engines production.

## 31. Deviations

- Nessuna deviazione funzionale intenzionale da MASTER v3 o Phase 1A.2.
- Nessuna capability precedente è stata rimossa.
- Route count, registries, auth, DataGrid, File Viewer e mobile navigation sono invariati.
- Nessuna dipendenza è stata aggiunta.
- Il bundle delta del main client chunk è **+5.14%**, superiore al target preferenziale del 2%; la causa e il technical debt sono documentati.
- Il solo gate visuale non concluso è il confronto dashboard autenticata nel browser per locator_invalid; non viene dichiarato superato.
- Phase 1B e Phase 2A non sono state iniziate.

Questo documento audita il commit applicativo e pubblicato **5b11b58fa4b6cb6ae4a5c1130ddfeecbda558e65**.
