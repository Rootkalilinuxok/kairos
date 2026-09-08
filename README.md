KAIROS — Current Build State 0.3
Audit fattuale del repository dopo KAIROS v3 Phase 1A.1 — Precision Intelligence.

Data snapshot: 2026-09-08 UTC
Baseline verificata: a129f75a86f6c378c7f154096dfc5fcacfbfe282 (a129f75)
Commit applicativo auditato e pubblicato: f3904fc1ff99685d354ce8a6ae4f3f097a6a01c0 (f3904fc)
Commit applicativi Phase 1A.1: ca61bfb + f3904fc
Fase: KAIROS v3 PHASE 1A.1 completed
Prodotto: KAIROS
Claim: Decide at the right moment.
Site project: appgprj_6a9ee97218d88191abbe3584dae866dc
Release pubblicata: Sites version 7
URL: https://ai-business-os.alex818181.chatgpt.site
Audience: privata, owner-only verificata
Phase 1B: non iniziata
Phase 2A: non iniziata
1. Classificazioni usate
Stato	Significato
OPERATIVO	La funzione esegue il comportamento dichiarato nella shell/client o nell’ambiente development ed è coperta da verifica diretta.
FIXTURE / LOCAL STATE	Il comportamento funziona con dati di sviluppo centralizzati e/o stato locale; non è persistenza production.
SHELL / EXTENSION POINT	Esistono contratto, route, UI o boundary, ma il workflow o motore finale è intenzionalmente assente.
NON IMPLEMENTATO	Non esiste una implementazione production nella build auditata.
L’esistenza di una route non viene considerata prova di business logic implementata.

2. Inventario numerico
Elemento	Stato corrente
Route nel Navigation Registry	73
Admin	50
Advisor	16
Employee	7
Module Registry	13 moduli
Componenti TSX totali	96
Componenti applicativi KAIROS	35
Primitive UI	61
File test	8
Test automatici	37/37 PASS
Dipendenze runtime	27
Dipendenze development	17
Nessuna route, dipendenza, API di dominio o capability business è stata aggiunta in Phase 1A.1.

3. Routing — 73 route preservate
Routing fisico:

app/admin/[...slug]/page.tsx
app/advisor/[...slug]/page.tsx
app/employee/[...slug]/page.tsx
I catch-all risolvono le destinazioni tramite navigationItemForRoute() e delegano a PortalPage. Route sconosciute producono 404 applicativo.

Route shell/API:

/ e /login: login development;
/admin: redirect a /admin/dashboard;
/advisor: redirect a /advisor/dashboard;
/employee: redirect a /employee/home;
/api/dev-auth/login;
/api/dev-auth/logout.
Admin — 50
/admin/action-center
/admin/ai-workspace
/admin/automation/automations
/admin/automation/integrations
/admin/automation/notifications
/admin/automation/workflows
/admin/company/catalog
/admin/company/contacts
/admin/company/customers
/admin/company/projects
/admin/company/suppliers
/admin/control/anomalies
/admin/control/audit
/admin/control/compliance
/admin/control/period-close
/admin/control/policies
/admin/dashboard
/admin/documents/archive
/admin/documents/hub
/admin/documents/studio
/admin/documents/templates
/admin/finance/bank-accounts
/admin/finance/billing
/admin/finance/company-cards
/admin/finance/expenses
/admin/finance/income
/admin/finance/movements
/admin/finance/reconciliations
/admin/finance/statements
/admin/inbox
/admin/intelligence/analytics
/admin/intelligence/digital-twin
/admin/intelligence/forecast
/admin/intelligence/reports
/admin/intelligence/scenarios
/admin/people/employee-cards
/admin/people/employee-expenses
/admin/people/employees
/admin/people/payroll
/admin/people/trips
/admin/people/work-reports
/admin/system/company-brain
/admin/system/modules
/admin/system/roles
/admin/system/settings
/admin/system/users
/admin/tax/deadlines
/admin/tax/incentives
/admin/tax/intelligence
/admin/tax/regulation
Advisor — 16
/advisor/accounting/expenses
/advisor/accounting/invoices
/advisor/accounting/movements
/advisor/accounting/reconciliations
/advisor/accounting/statements
/advisor/closing
/advisor/compliance/anomalies
/advisor/dashboard
/advisor/documents
/advisor/notifications
/advisor/people/employee-reports
/advisor/people/payroll
/advisor/reports
/advisor/requests
/advisor/tax/deadlines
/advisor/tax/documents
Employee — 7
/employee/documents
/employee/home
/employee/notifications
/employee/profile
/employee/trips
/employee/upload-expense
/employee/upload-work-report
Le tre route additive Phase 1A restano presenti e non sono state trasformate nei workflow finali:

Route	Stato reale
/admin/inbox	SHELL / EXTENSION POINT — Inbox finale rinviata
/admin/control/policies	SHELL / EXTENSION POINT — policy/compliance engine assente
/advisor/closing	SHELL / EXTENSION POINT — Closing Cockpit finale rinviato
4. Navigation Registry v3
File: core/navigation/registry.ts.

Unica fonte applicativa per route e navigazione. Metadati preservati:

key, route, label, labelKey;
portal, group, icon;
permission, module, order;
pageKind, description, primaryActions;
section, sectionLabel, sectionOrder;
subsection, subsectionLabel, subsectionOrder;
placement: primary | nested | utility;
mobileOrder, mobileLabel;
defaultExpanded;
breadcrumbLabel.
Helper operativi:

navigationForPortal(portal);
navigationItemForRoute(route);
mobileNavigationForPortal(portal).
Phase 1A.1 non modifica il registry.

5. Module Registry
File: core/modules/registry.ts.

Modulo	Portali	Stato
ai-workspace	Admin	SHELL / EXTENSION POINT
action-center	Admin, Advisor	FIXTURE / LOCAL STATE
inbox	Admin	SHELL / EXTENSION POINT
crm	Admin	SHELL / EXTENSION POINT
people	Admin, Advisor, Employee	FIXTURE / LOCAL STATE
banking	Admin, Advisor	SHELL / EXTENSION POINT
billing	Admin, Advisor	SHELL / EXTENSION POINT
documents	tutti	FIXTURE / LOCAL STATE
analytics	Admin, Advisor	FIXTURE / LOCAL STATE
compliance	Admin, Advisor	SHELL / EXTENSION POINT
tax	Admin, Advisor	SHELL / EXTENSION POINT
automation	tutti	SHELL / EXTENSION POINT
platform	Admin	SHELL / EXTENSION POINT
moduleByKey resta il lookup usato da placeholder e gate. Nessun modulo è stato rimosso.

6. Sidebar desktop e disclosure state
File principali:

components/shell/app-sidebar.tsx;
core/navigation/sidebar-disclosure.ts;
app/globals.css.
IA Admin preservata:

NOW
DECISIONS
INBOX
WORK
  Company
  People
  Finance
  Documents
INTELLIGENCE
CONTROL
  Tax
AUTOMATIONS
INTEGRATIONS
SETTINGS
GLOBAL UTILITY
  AI Workspace
Root cause storica del bug
Nel codice precedente a a129f75, CollapsibleContent forceMount manteneva i figli renderizzati senza una regola closed-state che li nascondesse. Lo stato Radix cambiava, ma il contenuto restava visibile. Inoltre defaultOpen e key derivate da sectionActive/subsectionActive potevano rimontare i branch durante la navigazione e perdere il controllo utente.

Stato corrente — OPERATIVO
stato controlled e indipendente per ogni sezione/sottosezione;
nessun accordion single-open;
trigger reali button sull’intera riga;
click, Enter e Space ereditano la semantica nativa del button;
aria-expanded e aria-controls;
chevron decorativo con rotazione right/down;
auto-expand dei parent della nuova route;
un parent attivo può essere chiuso manualmente;
cambio route apre i nuovi parent necessari;
persistenza non sensibile in localStorage con chiave kairos.sidebar.sections;
lettura/scrittura storage protette da try/catch;
contenuti chiusi con aria-hidden + inert, quindi fuori dal focus order;
reveal del contenitore tramite grid rows, senza animare ogni figlio;
modalità icon-only espande la sidebar quando si attiva un gruppo;
il full menu mobile riusa la stessa sidebar/registry.
7. Navigazione mobile
File: components/shell/mobile-navigation.tsx.

Portale	Bottom navigation
Admin	NOW · Decisions · Inbox · Actions · Notifiche
Advisor	Cockpit · Closing · Richieste · Eccezioni · Documenti
Employee	Home · Spesa · Rapportino · Notifiche · Altro
OPERATIVO:

destinazioni route derivate dal Navigation Registry;
aria-current="page" sulla destinazione attiva;
Actions apre la preview Command Bar, senza eseguire azioni;
Altro apre il menu completo Employee;
hit target minimo 44px;
feedback press/focus localizzato;
nessuna modifica alla semplicità Employee.
8. Universal Command Bar
File: components/command-bar/universal-command-bar.tsx.

OPERATIVO:

Ctrl+K / Cmd+K apre;
Escape, pulsante Close o dismissal chiude;
Search locale su fixture role-scoped;
Navigate deriva dal registry e usa router.push();
grouping Search / Navigate / Action / Ask KAIROS;
risultato keyboard-selected con indicatore shape + surface;
focus layer e dialog elevation L2;
context header con organizzazione, pagina e, quando presenti, conteggio selezioni/filtri;
metadata Local fixture, Route, Preview;
target Close mobile da 44px.
Classificazione interna:

Area	Stato
Navigate	OPERATIVO
Search	FIXTURE / LOCAL STATE
Action	SHELL / EXTENSION POINT — disabled preview
Ask KAIROS	SHELL / EXTENSION POINT — disabled preview
Non esiste alcuna esecuzione AI o mutazione simulata.

9. Context Capsule v1
Files:

core/context/context-capsule.ts;
components/providers/context-capsule-provider.tsx.
Contract version: 1.0.

Campi: user, organization, portal, route, current page, current object, selected rows, filters, visible columns, period, permissions.

Phase 1A.1 estende additivamente ContextDataProvenance con:

Actual;
Imported;
Calculated;
Forecast;
AI extracted;
AI inferred;
Estimated;
User confirmed;
Official source;
Fixture/demo;
Missing/unsupported.
Il provider è SHELL / EXTENSION POINT: popola il contesto shell e offre updatePageContext()/resetPageContext(), ma DataGrid, viewer e motori futuri non sono ancora collegati end-to-end al capsule.

10. Precision Intelligence design contract
File centrale: app/globals.css.

Surface model
L0 Canvas: .kairos-surface-l0;
L1 Surface: .kairos-surface-l1;
L2 Elevated: .kairos-surface-l2.
L2 è applicato solo a superfici transitorie/focali: Command Bar, drawer, viewer, menu e bulk tray. I pannelli persistenti restano flat/tonal.

Motion tokens
Token	Valore
press	80ms
hover	110ms
focus/selection	130ms
icon	140ms
collapse	170ms
disclosure	180ms
popover	160ms
drawer	220ms
modal	200ms
layout	260ms
prefers-reduced-motion: reduce riduce globalmente animazioni e transizioni a 0.01ms. Non sono stati introdotti background animati, glow, neon, orb o motion decorativo.

Interaction and density
selected distinto da hover;
focus-visible resta distinto su righe selezionate;
press feedback di 1px senza layout shift in hover;
density compact per Admin/Advisor desktop;
density touch per Employee/mobile;
numeri finanziari e date usano tabular numerals;
nessun monospace aggiunto ai valori finanziari.
11. Data provenance component
File: components/shared/data-provenance-badge.tsx.

OPERATIVO come linguaggio UI, con dati attuali ancora fixture:

label testuale centralizzata;
data-provenance machine-readable;
colore + marker/shape, quindi non color-only;
Missing usa bordo/marker distinto;
variante compact;
styling secondario, non dominante.
Le label sono in fixtures/development/experience-config.ts e i token Light/Dark in app/globals.css.

12. Data visualization foundation
File nuovo: core/visualization/chart-grammar.ts.

SHELL / EXTENSION POINT riutilizzabile:

Actual = solid;
Forecast = dashed 5 4;
Budget/Plan = dotted 1 4 quando verrà usato;
missing = null/undefined, senza falsa interpolazione;
analytical focus = semantic teal;
default connectNulls: false;
animazione serie disattivata nel chart Phase 1A per stabilità/riduzione movimento.
Il chart Performance & Forecast esistente usa il contratto, conserva tre colori funzionali, legenda pattern testuale, tooltip tabular non-monospace e semantic summary accessibile.

Reality Horizon, Decision Debt Curve, Evidence Lattice, Scenario Differential Lens e Outcome Reconciliation Trace sono NON IMPLEMENTATI.

13. DataGrid
Files principali:

components/data-grid/data-grid.tsx;
components/data-grid/filter-builder.tsx;
components/data-grid/saved-view-selector.tsx;
core/data-grid/filters.ts;
core/data-grid/export.ts.
Logica preservata — OPERATIVO
search;
sorting;
filtri combinati;
Data dal >= start_date e Data al <= end_date, indipendenti;
employee, category, state, currency, receipt, reconciliation, min/max amount;
reset filtri;
selezione e select-all-visible;
visibilità, ordine e resize colonne;
detail drawer e context menu;
mobile cards;
export disabilitato a zero selezioni;
export selected-only nell’ordine corrente;
sole colonne semantiche visibili;
CSV, vero XLSX e vero PDF report.
Phase 1A.1 polish
hover, focus e selected distinti;
riga desktop keyboard-focusable: Space seleziona, Enter apre dettaglio;
date/importi tabular;
bulk toolbar L2 con motion localizzato;
tray selected sticky su mobile;
azioni mobile da 44px;
nessuna modifica a filter/export logic.
Record, delete e saved view restano FIXTURE / LOCAL STATE.

14. Detail Drawer e Universal File Viewer
Detail Drawer — OPERATIVO su fixture
File: components/detail/detail-drawer.tsx.

Sheet a destra su desktop;
Drawer dal basso su mobile;
close esplicito mobile da 44px;
focus/direction gestiti dalle primitive esistenti;
fixture provenance visibile;
allegati aprono il viewer senza cambio route;
relazioni/timeline definitive restano extension point.
File Viewer
File: components/file-viewer/universal-file-viewer.tsx.

OPERATIVO per fixture immagine:

modal;
preview immagine;
zoom;
rotazione/pan;
fullscreen shell;
download;
metadati/linked object desktop;
toolbar accessibile e responsive;
hit target 44px;
zoom aria-live;
close esplicito;
reset fullscreen a ogni nuovo file;
gestione pointer capture sicura anche su cancel/up.
PDF display: SHELL / EXTENSION POINT. La pagina mostrata è esplicitamente “Anteprima PDF simulata”; page control e download fixture esistono, ma non c’è un renderer PDF reale. Print e mobile metadata sheet sono rinviati.

15. Insight deck e feedback
components/pages/insight-deck.tsx non esegue più auto-advance periodico. Il carosello resta manuale, le azioni sono visibili su touch e diventano visibili anche con focus-within su desktop. Skeleton animato resta limitato al componente loading standard.

Toast e feedback localizzati esistenti sono preservati; non sono stati introdotti spinner globali o banner di successo sovradimensionati.

16. Authentication development
Files principali:

core/auth/development-session.ts;
app/api/dev-auth/login/route.ts;
app/api/dev-auth/logout/route.ts;
layout protetti Admin/Advisor/Employee.
OPERATIVO — DEVELOPMENT / TEST ONLY:

abilitato solo con ALLOW_DEV_LOGIN=true;
account admin / 1010, role super_admin;
password accettata solo come stringa;
verifica esclusivamente server-side con digest e confronto timing-safe;
nessuna password nel bundle client;
redirect corretto a /admin/dashboard;
session cookie HttpOnly, Path=/, max-age 8 ore;
locale HTTP: SameSite=Lax;
HTTPS embedded: Secure, SameSite=None, Partitioned;
logout cancella la sessione;
route protette tornano inaccessibili dopo logout.
La privacy ChatGPT Site resta un livello upstream distinto. Auth production, inviti, MFA, recovery, session store e RBAC production sono NON IMPLEMENTATI.

Phase 1A.1 non modifica autenticazione.

17. Theme e responsive shell
Theme provider: next-themes, class strategy, default system, system preference attiva.

OPERATIVO:

Light;
Dark;
System;
soppressione transizioni durante cambio tema;
semantic token Light/Dark;
sidebar desktop collapsible/icon-only;
tablet reflow con breakpoint esistenti;
mobile bottom navigation dedicata;
mobile drawer e card list;
Employee action-first/touch-first preservato.
Non è stato compresso il layout desktop per creare il mobile.

18. Fixture/config layer
Files:

fixtures/development/index.ts;
fixtures/development/experience-config.ts.
Fonte: KAIROS_PHASE_1A_DEVELOPMENT_FIXTURE.

Contenuti centralizzati:

tenant dimostrativo;
utenti/ruoli di sviluppo;
brand KAIROS e claim;
badge DEV · FIXTURE;
metriche shell;
record, documenti, notifiche e insight;
planned integration metadata;
object references condivisi;
Command Bar preview;
label provenance Phase 1A.1.
Tutto è FIXTURE / LOCAL STATE e sostituibile da adapter futuri. Nessun dato viene presentato come production.

19. Providers
Root:

ThemeProvider
  TooltipProvider
    UniversalFileViewerProvider
      application
      Toaster
Portal:

AccessProvider
  ContextCapsuleProvider
    UniversalCommandBarProvider
      SidebarProvider
        AppSidebar
        Topbar
        page content
        MobileNavigation
Phase 1A.1 non cambia l’ordine dei provider.

20. Services, data layer e permission hooks
Moduli operativi oggi:

development auth/session adapter;
login/logout route handlers;
pure DataGrid filters;
CSV/XLSX/PDF export services;
centralized fixture/config adapters;
sidebar disclosure state helpers;
chart grammar constants.
Non esiste ancora una directory/domain service production generica. UI e fixture restano separate tramite adapter dedicati; nessuna UI o AI accede direttamente a SQL.

components/gates/permission-gate.tsx espone:

AccessProvider;
PermissionGate;
FeatureFlagGate.
Registry e Context Capsule trasportano permission/module metadata. Sono SHELL / EXTENSION POINT, non autorizzazione server-side production tenant-scoped.

Hook condivisi:

useMobile() / useIsMobile();
useUniversalFileViewer();
useUniversalCommandBar();
useContextCapsule().
21. Componenti Phase 1A.1
Modificati:

app/globals.css
components/command-bar/universal-command-bar.tsx
components/data-grid/data-grid.tsx
components/detail/detail-drawer.tsx
components/file-viewer/universal-file-viewer.tsx
components/pages/admin-dashboard.tsx
components/pages/insight-deck.tsx
components/shared/data-provenance-badge.tsx
components/shell/app-sidebar.tsx
components/shell/mobile-navigation.tsx
components/shell/portal-shell.tsx
core/context/context-capsule.ts
fixtures/development/experience-config.ts
Aggiunto:

core/visualization/chart-grammar.ts
tests/phase-1a1-polish.test.mjs
Test di infrastruttura/sidebar aggiornati per il nuovo contratto disclosure. Nessun file route, registry, module registry, auth o package manifest è stato modificato.

22. Dipendenze
Nessuna dipendenza aggiunta, rimossa o aggiornata in Phase 1A.1.

Runtime (27): @base-ui/react, @hookform/resolvers, @shadcn/react, class-variance-authority, clsx, cmdk, date-fns, drizzle-orm, embla-carousel-react, exceljs, input-otp, jspdf, jspdf-autotable, lucide-react, next, next-themes, radix-ui, react, react-day-picker, react-dom, react-hook-form, react-resizable-panels, recharts, sonner, tailwind-merge, vaul, zod.

Development (17): @cloudflare/vite-plugin, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom, @vitejs/plugin-react, @vitejs/plugin-rsc, drizzle-kit, eslint, eslint-config-next, react-server-dom-webpack, tailwindcss, tw-animate-css, typescript, vinext, vite, wrangler.

Stack rilevante: Next 16.2.6, React 19.2.6, TypeScript 5.9.3, vinext 0.0.50, Vite 8.0.13.

23. Test e QA
File suite: 8. Test: 37/37 PASS.

Gate	Esito
Login dev, credenziali errate, string password	PASS
Sessione, refresh, logout	PASS
Protezione route	PASS
Tutte le 73 route con sessione dev	PASS
Admin / Advisor / Employee SSR	PASS
Sidebar state indipendente	PASS
WORK / INTELLIGENCE / CONTROL / AUTOMATIONS / SETTINGS	PASS via state/source contract
Company / People / Finance / Documents / Tax	PASS via state/source contract
Route auto-expand + manual close	PASS
Collapsed branch inert	PASS
Icon-only/mobile registry compatibility	PASS
Ctrl/Cmd+K, Escape, navigate, preview boundary	PASS
DataGrid search/filter/reset	PASS
From/To inclusivi e indipendenti	PASS
Selected-only CSV/XLSX/PDF	PASS
Viewer limitation esplicita	PASS
Light/Dark/System tokens/provider	PASS
Reduced motion e motion tokens	PASS
Provenance text/shape/color contract	PASS
Actual/Forecast/Budget grammar	PASS
ESLint	PASS
TypeScript tsc --noEmit	PASS
Production build	PASS
git diff --check	PASS
Preview browser interna:

login KAIROS visivamente verificato su desktop;
accesso diretto /admin/dashboard senza sessione verificato con redirect reale a /login?returnTo=%2Fadmin%2Fdashboard;
nessun errore console applicativo rilevato; presente solo rumore della browser extension di controllo;
il secure browser-auth adapter ha restituito locator_invalid, quindi non è stato possibile completare un pass visuale browser autenticato in questa esecuzione;
non sono stati usati bypass, cookie injection o modifiche auth;
auth/session/route protette restano verificate end-to-end dalla suite HTTP production-server.
24. Bundle impact
Nessuna nuova libreria.
Principale chunk applicativo misurato prima: 551,733 byte minified.
Principale chunk applicativo Phase 1A.1: 552,354 byte minified.
Delta: +621 byte, circa +0.11%.
exceljs resta 929,923 byte e jspdf circa 399,770 byte.
Il warning Vite per chunk >500 kB resta presente e non è stato aggravato in modo significativo.
Code splitting di export/chart resta technical debt, non affrontato per evitare un refactor fuori scope.
25. Build e deployment
Elemento	Stato
Build command	npm run build → bounded vinext build
Git source	branch main, commit f3904fc1ff99685d354ce8a6ae4f3f097a6a01c0
Sites project	appgprj_6a9ee97218d88191abbe3584dae866dc
Saved/published version	7
Version id	appgprj_6a9ee97218d88191abbe3584dae866dc~appgver_1277ce807db88191a0e2886303fc9aca
Deployment id	appgdep_6a9f5b26b6a4819181f1d8a13bea3c0a
Deployment completed	2026-09-08T00:47:49.488469+00:00
URL	https://ai-business-os.alex818181.chatgpt.site
Status	succeeded / active
Access	custom owner-only: 1 allowed user, 0 groups, 0 external visitors
Runtime env	revision 8; ALLOW_DEV_LOGIN=true
Worker errors after deploy	0 nel controllo post-release
D1	none
R2	none
Il Site non è stato reso pubblico e la protezione ChatGPT Site non è stata rimossa.

26. Capability audit
Capability	Classificazione
Development auth e route protection	OPERATIVO
73 route registry-backed	OPERATIVO
Sidebar desktop controllata/annidata	OPERATIVO
Navigation mobile role-specific	OPERATIVO
Light/Dark/System	OPERATIVO
Command Bar shell/navigate	OPERATIVO
Command Bar Search	FIXTURE / LOCAL STATE
Command Bar Action/Ask	SHELL / EXTENSION POINT
Context Capsule v1	SHELL / EXTENSION POINT
Surface/motion/density/provenance system	OPERATIVO come UI contract
Chart grammar	SHELL / EXTENSION POINT, applicata al chart fixture esistente
DataGrid interaction/export	OPERATIVO
DataGrid record/mutation persistence	FIXTURE / LOCAL STATE
Detail Drawer	OPERATIVO su fixture
File Viewer immagini	OPERATIVO su fixture
File Viewer PDF	SHELL / EXTENSION POINT
NOW/Decisions/dashboard/analytics	FIXTURE / LOCAL STATE
Inbox/Policies/Closing finali	SHELL / EXTENSION POINT
Employee uploads	FIXTURE / LOCAL STATE
Banking/tax/compliance/payroll engines	NON IMPLEMENTATO
Production DB/storage/OCR	NON IMPLEMENTATO
Production AI/tool orchestration	NON IMPLEMENTATO
Production tenancy/RBAC/MFA	NON IMPLEMENTATO
Advanced signature visualizations	NON IMPLEMENTATO
27. Known limitations e technical debt
La verifica browser autenticata è rimasta bloccata dal secure browser-auth adapter; nessun bypass è stato tentato.
PDF display simulato; renderer e print assenti.
Context Capsule non ancora collegato live a DataGrid/detail/chart state.
Search Command Bar locale; Action/Ask non eseguibili.
Dati, delete, upload, dashboard, analytics e notifiche sono fixture/local state.
Permission/module gates non sostituiscono RBAC production server-side.
Nessun dominio production ha repository/service persistente.
Chunk warning >500 kB, principalmente export libraries e portal bundle.
I test automatici della sidebar verificano state machine, SSR/source contract e route behavior; il framework corrente non include un DOM test runner dedicato.
28. Rinviato esplicitamente a Phase 1B
NOW finale su /admin/dashboard;
Decisions finale su /admin/action-center;
Inbox queue finale su /admin/inbox;
Admin Closing Cockpit e Advisor Closing finale;
Advisor Accounting Cockpit finale;
Integrations experience finale;
contextual AI governata;
DataGrid/detail/chart binding al Context Capsule;
Command Bar Action/Ask reali dietro service/permission adapters;
shared object resolution fra NOW, Decisions, Inbox, Closing e Notifications;
File Viewer print/mobile metadata refinements;
analytics/report-frame e drilldown experience oltre la grammatica di base.
29. Rinviato esplicitamente a Phase 2A
tenant/organization production model;
identity lifecycle, inviti, MFA, recovery e session store;
RBAC server-side tenant-scoped;
canonical objects, relations ed event model;
policy/autonomy framework;
database, storage, ingestion documentale e OCR;
governed AI orchestration/tool layer;
Output Engine production;
semantic metrics foundation production;
domain service/repository interfaces production.
30. Deviations
Nessuna deviazione funzionale intenzionale da MASTER v3 o Phase 1A.1.
Nessuna capability precedente è stata rimossa.
Route count e registry sono invariati.
Nessuna dipendenza è stata aggiunta.
L’unico limite del gate è il pass browser autenticato non completato per locator_invalid; la suite HTTP/SSR copre auth, sessione e tutte le route.
Phase 1B e Phase 2A non sono state iniziate.
Questo documento audita il commit applicativo f3904fc1ff99685d354ce8a6ae4f3f097a6a01c0. Il commit documentale che aggiunge questo file non modifica il codice applicativo pubblicato.
