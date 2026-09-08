# KAIROS — Codex Handoff 0.4

This package is a source snapshot of **KAIROS v3 Phase 1A.2 — Visual Reference Implementation**.

- Application source commit: `5b11b58fa4b6cb6ae4a5c1130ddfeecbda558e65`
- Product: **KAIROS**
- Claim: **Decide at the right moment.**
- Registered routes: **73**
- Portals: **Admin 50 / Advisor 16 / Employee 7**
- Phase 1B: **not started in this snapshot**
- Phase 2A: **not started in this snapshot**

The ZIP is intentionally source-only. Git history is supplied separately when `KAIROS_GIT_HISTORY_0.4.bundle` accompanies it.

## 1. Product

KAIROS is an AI-native Business System of Action for independent professionals and small/medium businesses up to approximately 40–50 employees. Its long-term goal is to turn governed business data, evidence and policy into timely decisions and actions across company administration, finance, people, documents, accounting/advisory work and employee operations.

Phase 1A.2 is an application-shell and visual-system milestone. It is not a production accounting, tax, banking, payroll, compliance or AI engine.

## 2. Current stack

- TypeScript 5.9 and React 19
- Next.js-compatible App Router source executed through Vinext
- Vite 8 and Cloudflare Worker/Sites build target
- Tailwind CSS 4 and the existing shadcn/Base UI primitives
- Recharts for the dashboard chart foundation
- Drizzle ORM/D1 extension points; no production schema or data service
- ExcelJS, jsPDF and jsPDF-AutoTable for DataGrid exports
- Node built-in test runner
- ESLint 9

The required Node version is `>=22.13.0`. The repository is ESM (`"type": "module"`).

## 3. Repository map

| Path | Responsibility |
|---|---|
| `app/` | App Router pages, protected portal layouts, development auth routes and global CSS |
| `components/` | KAIROS pages, shell, shared components, DataGrid, File Viewer, drawers, command bar and UI primitives |
| `core/` | Typed auth, navigation/module registries, Context Capsule, DataGrid services and visualization contracts |
| `fixtures/development/` | Centralized, replaceable development data and visual series |
| `hooks/`, `lib/` | Shared hooks and utilities |
| `tests/` | Source-contract, SSR/rendered, auth, shell, sidebar, grid and visual regression guards |
| `db/`, `drizzle/`, `drizzle.config.ts` | Intentionally minimal D1/Drizzle extension point |
| `worker/` | Cloudflare/Vinext worker entry |
| `build/` | Source build plugin used by the Sites/Vite pipeline; this is not generated output |
| `scripts/` | Bounded install/build and isolated Sites runtime helpers |
| `public/` | Static KAIROS and development fixture assets |
| `.openai/hosting.json` | ChatGPT Sites project metadata and declared bindings; no runtime secrets |

`node_modules/`, `dist/`, `.next/`, caches, logs and generated runtime artifacts are deliberately excluded.

## 4. Routing and portals

The Navigation Registry at `core/navigation/registry.ts` is the single route/navigation source. It contains **73** registered routes:

- **Admin — 50**: decision/action shell, NOW dashboard, company, people, finance, documents, intelligence, control, tax, automation, integrations, settings and AI Workspace.
- **Advisor — 16**: accounting, closing, compliance, documents, requests, people/payroll, reports, tax and notifications.
- **Employee — 7**: home, expense upload, work-report upload, notifications, trips, documents and profile.

Physical portal routing is implemented by the Admin, Advisor and Employee catch-all pages under `app/`. Unknown registry routes render the application 404. The registry metadata also drives nested desktop navigation and role-specific mobile navigation.

The Module Registry at `core/modules/registry.ts` preserves all 13 capability domains and their portal availability. A route or module entry does not imply production business logic.

## 5. Phase 1A.2 status

The status labels below are strict:

| Label | Meaning |
|---|---|
| **OPERATIVE** | The declared shell/client or development-only behavior works in this snapshot. |
| **FIXTURE / LOCAL STATE** | The behavior is functional with centralized development data or in-memory/browser state only. |
| **SHELL / EXTENSION POINT** | A typed contract, route or UI boundary exists, but the final workflow/service is absent. |
| **NOT IMPLEMENTED** | No production implementation exists. |

### Operative

- Registry-backed routing for 73 routes and route protection
- Three role-specific portal shells
- Nested, independently collapsible Admin sidebar with route auto-expand and local persistence
- Registry-derived mobile navigation and mobile full menu
- Light, Dark and System theme modes
- Universal Command Bar keyboard shell: `Ctrl+K`, `Cmd+K`, Escape and real registry navigation
- DataGrid search, sorting, filters, selection, column visibility/order/resize, detail drawer and responsive cards
- Selected-row-only CSV, real XLSX and generated PDF exports; export disabled at zero selection
- Employee-expense `Data dal` / `Data al` filtering, usable separately or together
- Universal File Viewer for fixture images, including preview, zoom, rotation/pan, fullscreen shell and download
- Development-only server-side authentication when `ALLOW_DEV_LOGIN=true`
- Precision Intelligence token/surface system, accessible microcharts and Performance & Forecast visualization behavior over fixtures
- Development test suite, lint, typecheck and production build commands

### Fixture / local state

- Dashboard KPIs, charts, KAIROS Brief, priorities, Operating Pulse and predictive insights
- Command Bar local search corpus
- Notifications, documents, expenses, employee uploads and sample records
- DataGrid mutations and saved views
- Local theme/sidebar/UI state
- Action Center sample items

Fixtures are centralized under `fixtures/development/`; do not move domain rules into page JSX when replacing them.

### Shell / extension point

- Context Capsule v1
- Permission and feature gates; these are not production server-side RBAC
- Command Bar Action and Ask KAIROS categories, visibly disabled/preview-only
- AI Workspace
- Inbox, Policies and Closing routes
- Most CRM, banking, billing, compliance, tax, automation and platform workflows
- Dynamic relevance selection for Operating Pulse
- Drizzle/D1 schema and service boundaries
- PDF document preview placeholder

### Not implemented

- Production database, object storage, tenant data model or repositories
- OCR and document ingestion pipeline
- OpenAI API or governed AI/tool orchestration
- Google OAuth or live Google Workspace integration
- Bank feeds and production banking engine
- Tax, compliance and payroll engines
- Production RBAC, tenant scoping, MFA, invitations, recovery and durable session store
- Final NOW, Decisions, Inbox, Closing/Advisor Cockpits and Output Engine
- Advanced analytical signature visualizations

## 6. Locked visual identity

The Phase 1A.2 visual foundation is approved and must be treated as locked unless a later explicit specification authorizes a change:

- deep navy/dark blue canvas;
- controlled cyan/electric-blue edge light;
- restrained violet and magenta;
- compact, information-dense enterprise surfaces;
- KPI and Operating Pulse microvisuals;
- refined Performance & Forecast chart grammar;
- polished sidebar, topbar and Command Bar;
- localized glow only for agency, selection, focus and analytical emphasis;
- Light/Dark/System equivalents;
- subtle motion with `prefers-reduced-motion` support.

Avoid giant cards, decorative gradients, cyberpunk effects, gamification, oversized icons and consumer-dashboard patterns.

## 7. DataGrid contract

Do not rewrite the shared grid without an explicit specification. Preserve:

- search and sorting;
- combined advanced filters, including independent From/To dates;
- selection and select-all-visible behavior;
- visible column order and resize state;
- detail drawer and context menu;
- responsive mobile cards;
- export disabled when no rows are selected;
- selected rows only, in current order, using semantic visible columns;
- CSV, true XLSX and true report PDF output.

The pure filters live in `core/data-grid/filters.ts`; export services live in `core/data-grid/export.ts`.

## 8. File Viewer limitation

The Universal File Viewer architecture must be preserved. Image workflows are operative over fixture files. PDF is explicitly a simulated preview shell: there is **no real PDF renderer** in this snapshot. Do not represent the placeholder as real rendering. Print and some mobile metadata refinements remain deferred.

## 9. Development authentication

Development auth is server-side and gated by `ALLOW_DEV_LOGIN=true`. Its fixed test account is documented in `KAIROS_CURRENT_BUILD_STATE_0.4.md` and must never be treated as production identity. Verification uses a digest/timing-safe comparison; the session cookie is HttpOnly and protected portal layouts redirect unauthenticated requests.

For production, disable the flag and replace this adapter with specified identity, session and tenant-scoped authorization services. Do not move credential checks into client code.

## 10. Context Capsule and Command Bar

`core/context/context-capsule.ts` defines Context Capsule v1 for user, organization, portal, route, current page/object, selected rows, filters, visible columns, period, permissions and provenance. The provider supplies shell context and page update/reset methods. End-to-end bindings to DataGrid, details and charts are not present in this snapshot.

The Universal Command Bar has four categories:

- Search — fixture/local;
- Navigate — operative from the Navigation Registry;
- Action — disabled preview;
- Ask KAIROS — disabled preview.

Never fake AI execution or silently turn preview commands into production actions.

## 11. Providers and boundaries

Root providers: Theme, Tooltip, Universal File Viewer and Toaster.

Portal composition: Access, Context Capsule, Universal Command Bar, Sidebar, App Sidebar, Topbar, page content and Mobile Navigation.

The current service layer contains the development session adapter, login/logout handlers, pure grid filters/export services, fixture adapters, sidebar disclosure helpers and chart/microchart contracts. There is no generic production data service.

## 12. Tests and commands

The audited Phase 1A.2 snapshot contains **9 test files** and recorded **42/42 passing tests**. See `README_CODEX_SETUP.md` for exact prerequisites and commands.

Core commands:

```bash
npm install
npm run dev
npm test
npm run lint
npx tsc --noEmit
npm run build
```

`npm test` runs a production build before the Node test suite. The bounded Sites scripts target Linux and require GNU `timeout`; the lockfile-oriented `npm run install:ci` also requires `flock`, `curl` and `sha256sum`.

## 13. Current technical debt

- Main client chunk exceeds 500 kB; dashboard/export code splitting is deferred.
- Phase 1A.2 increased the main portal client chunk by approximately 5.14% and CSS by approximately 11.27% without adding dependencies.
- Browser-authenticated visual comparison was blocked in the audited release; source/SSR/live HTTP checks are not pixel-level visual regression.
- PDF preview is simulated.
- Context Capsule is not live-bound across grid/detail/chart surfaces.
- Command Bar Search is local; Action and Ask are previews.
- Permission gates are not tenant-scoped production RBAC.
- There is no production domain repository/service layer.
- Sidebar and visual tests are primarily source/SSR contracts; there is no dedicated DOM visual-regression runner.

## 14. Non-regression rules

**DO NOT redesign the application from scratch.**

**DO NOT remove existing capabilities.**

**DO NOT silently replace fixtures with fake production behavior.**

**DO NOT add secrets to source control.**

**DO NOT start destructive migrations without an explicit specification.**

Also preserve the 73-route contract, all three portals, registries, DataGrid behavior, File Viewer boundary, theme modes, development-auth boundary and role-specific responsive strategy unless a later source-of-truth specification explicitly changes them.

## 15. Source of truth

Read these documents before implementation:

1. `00_KAIROS_MASTER_V3.md` — permanent product and architecture authority.
2. `KAIROS_CURRENT_BUILD_STATE_0.4.md` — factual audit of this Phase 1A.2 source snapshot and its published release.
3. `CODEX_HANDOFF.md` — transfer context and non-regression guidance.
4. `README_CODEX_SETUP.md` — local installation and verification commands.

Repository reality at commit `5b11b58fa4b6cb6ae4a5c1130ddfeecbda558e65` wins if a secondary handoff statement is stale. Any later phase must be driven by its explicit approved specification; do not infer or implement Phase 1B from placeholders alone.
