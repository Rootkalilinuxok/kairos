# KAIROS — Current Build State 0.2

Factual repository audit for the completed **KAIROS v3 Phase 1A — Experience Infrastructure** code snapshot.

- Snapshot date: 2026-09-07
- Audited source commit: `050e714cede8e69ffc806f27819a3d6ddd475d76` (`050e714`)
- Authority: `00_KAIROS_MASTER_V3.md` → `02_KAIROS_PHASE_1A_EXPERIENCE_INFRASTRUCTURE.md` → `04_KAIROS_DESIGN_SYSTEM_BLUEPRINT.md` → `01_KAIROS_BASELINE_AND_COMPATIBILITY.md`
- Product identity: **KAIROS**
- Claim: **Decide at the right moment.**
- Application phase: **KAIROS v3 PHASE 1A completed**
- Scope completed: Phase 1A only; this document does not claim Phase 1B or Phase 2A delivery
- Phase 1B status: not implemented
- Phase 2A status: not implemented
- Audit method: direct source inspection at the audited commit plus lint, TypeScript, production build, and automated test execution

## 1. Audited repository snapshot

The following values describe the audited source commit, not the historical pre-Phase-1A baseline:

| Audited fact | Current value |
|---|---:|
| Navigation Registry routes | **73** |
| Admin routes | **50** |
| Advisor routes | **16** |
| Employee routes | **7** |
| Module Registry entries | **13** |
| Custom application component files | **35** |
| UI primitives | **61** |
| Automated tests | **27 passing** |
| Runtime dependencies | **27** |
| Development dependencies | **17** |

No database, object storage, OAuth, production AI, OCR, banking engine, tax engine, compliance engine, payroll engine, or production RBAC was added.

### State labels used by this audit

| Label | Meaning |
|---|---|
| **OPERATIVO** | The capability executes its stated shell/client or development function in the current build and is covered by direct verification. |
| **FIXTURE / LOCAL STATE** | The interaction works against centralized development data and/or in-memory browser state; it is not persisted production data. |
| **SHELL / EXTENSION POINT** | The contract, route, UI surface, or integration boundary exists, but the final workflow/engine is intentionally absent. |
| **NON IMPLEMENTATO** | No production implementation exists in the audited commit. |

## 2. Preserved without architectural replacement

- `PortalShell` and the three role workspaces;
- all previously registered route paths;
- development-only authentication and route protection;
- Navigation Registry as the sole route/navigation source of truth;
- Module Registry and feature-gate boundary;
- DataGrid behavior, including selected-row export only;
- advanced employee-expense filters, including independent inclusive From/To dates;
- Universal File Viewer and its explicit simulated-PDF limitation;
- Detail Drawer / mobile Drawer split;
- Light / Dark / System theme support;
- fixture data layer;
- responsive desktop/mobile shell;
- existing application and UI tests.

## 3. Application routing

Physical routing uses three protected catch-all route handlers:

- `app/admin/[...slug]/page.tsx`
- `app/advisor/[...slug]/page.tsx`
- `app/employee/[...slug]/page.tsx`

Each resolves a route through `navigationItemForRoute()` and dispatches its `pageKind` through `PortalPage`. Unknown paths produce the application 404.

Other routes:

- `/` and `/login`: internal development login surface;
- `/admin`: redirects compatibly to `/admin/dashboard` (NOW);
- `/advisor`: redirects to `/advisor/dashboard`;
- `/employee`: redirects to `/employee/home`;
- `/api/dev-auth/login`: development login API;
- `/api/dev-auth/logout`: development logout API.

### Registered routes — 73

#### Admin — 50

```text
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
```

#### Advisor — 16

```text
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
```

#### Employee — 7

```text
/employee/documents
/employee/home
/employee/notifications
/employee/profile
/employee/trips
/employee/upload-expense
/employee/upload-work-report
```

### Phase 1A additive routes

| Route | Registry key | Permission | Module | Current surface |
|---|---|---|---|---|
| `/admin/inbox` | `admin.inbox` | `inbox.read` | `inbox` | honest infrastructure placeholder |
| `/admin/control/policies` | `admin.policies` | `policies.read` | `compliance` | honest infrastructure placeholder |
| `/advisor/closing` | `advisor.closing` | `advisor.closing.read` | `compliance` | honest infrastructure placeholder |

These are intentionally not the final Inbox or Closing Cockpit.

### Compatibility semantics

| Stable path | Phase 1A presentation |
|---|---|
| `/admin/dashboard` | NOW |
| `/admin/action-center` | Decisions |
| `/advisor/dashboard` | Accounting Cockpit |
| `/admin/control/period-close` | Closing |
| `/admin/automation/integrations` | Integrations |

No destructive route rename was introduced.

## 4. Navigation Registry

File: `core/navigation/registry.ts`

Stable fields retained:

- `key`, `route`, `label`, `labelKey`;
- `portal`, `group`, `icon`;
- `permission`, `module`, `order`;
- `pageKind`, `description`, `primaryActions`.

Phase 1A presentation metadata added to every normalized entry:

- `section`, `sectionLabel`, `sectionOrder`;
- `subsection`, `subsectionLabel`, `subsectionOrder` where applicable;
- `placement: primary | nested | utility`;
- `mobileOrder`, `mobileLabel` where included in bottom navigation;
- `defaultExpanded`;
- `breadcrumbLabel`.

Helpers:

- `navigationForPortal(portal)`;
- `navigationItemForRoute(route)`;
- `mobileNavigationForPortal(portal)`.

`mobileNavigationForPortal()` derives route destinations directly from the same registry. The only synthetic mobile entries are role-level shell behaviors (`Actions` opens the Command Bar preview; `Altro` opens the full Employee menu). No second route registry exists.

## 5. Desktop navigation

Admin now uses progressive disclosure in `AppSidebar`:

```text
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
```

- Primary destinations remain immediately visible.
- Nested groups use accessible `Collapsible` triggers.
- Active sections/subsections expand automatically.
- Hidden sections remain mounted for stable discoverability and compatibility while remaining visually collapsed.
- AI Workspace remains an explicit global utility.
- Advisor and Employee keep their established grouped sidebar patterns to avoid needless redesign.

## 6. Mobile navigation

File: `components/shell/mobile-navigation.tsx`

| Portal | Bottom navigation |
|---|---|
| Admin | NOW · Decisions · Inbox · Actions · Notifiche |
| Advisor | Cockpit · Closing · Richieste · Eccezioni · Documenti |
| Employee | Home · Spesa · Rapportino · Notifiche · Altro |

- Route entries come from Navigation Registry metadata.
- Active route uses `aria-current="page"`.
- `Actions` opens the non-executing Action preview category in the Universal Command Bar.
- `Altro` opens the full responsive sidebar.
- Targets are at least 44px on mobile.
- Employee remains intentionally simple and action-first.

## 7. Universal Command Bar

Files:

- `components/command-bar/universal-command-bar.tsx`
- `components/shell/topbar.tsx`

Behavior:

- opens with `Ctrl+K` or `Cmd+K`;
- closes with `Escape` or dialog dismissal;
- desktop and mobile triggers are available;
- `Search` searches only role-scoped fixture objects;
- `Navigate` is generated from the active portal's Navigation Registry entries and performs real router navigation;
- `Action` commands are disabled and labeled as preview/non-executable;
- `Ask KAIROS` commands are disabled and labeled as preview/AI not connected;
- context header displays current organization and current page;
- no AI call, mutation, or false completion is performed.

## 8. Context Capsule

Files:

- `core/context/context-capsule.ts`
- `components/providers/context-capsule-provider.tsx`

Typed contract version: `1.0`.

Fields:

- `user`;
- `organization`;
- `portal`;
- `route`;
- `currentPage`;
- `currentObject`;
- `selectedRows`;
- `filters`;
- `visibleColumns`;
- `period`;
- `permissions`.

The provider derives stable shell context from the current route and centralized development fixture. It exposes `updatePageContext()` and `resetPageContext()` for later DataGrid/detail/decision integration. Phase 1A intentionally does not send the capsule to any AI backend.

## 9. Module Registry

File: `core/modules/registry.ts`

| Module key | Portals | Current status |
|---|---|---|
| `ai-workspace` | Admin | shell |
| `action-center` | Admin, Advisor | shell |
| `inbox` | Admin | shell — added in Phase 1A |
| `crm` | Admin | later-step |
| `people` | Admin, Advisor, Employee | foundation |
| `banking` | Admin, Advisor | foundation |
| `billing` | Admin, Advisor | later-step |
| `documents` | Admin, Advisor, Employee | foundation |
| `analytics` | Admin, Advisor | later-step |
| `compliance` | Admin, Advisor | later-step |
| `tax` | Admin, Advisor | later-step |
| `automation` | Admin, Advisor, Employee | later-step |
| `platform` | Admin | foundation |

`moduleByKey` remains the lookup consumed by placeholders and gates.

## 10. Shared components

There are **96 TSX component files**: 35 KAIROS/application components and 61 UI primitives.

### Components added by Phase 1A

- `components/command-bar/universal-command-bar.tsx`;
- `components/providers/context-capsule-provider.tsx`;
- `components/shared/data-provenance-badge.tsx`.

### Existing components materially evolved by Phase 1A

- shell/navigation: `app-sidebar.tsx`, `mobile-navigation.tsx`, `portal-shell.tsx`, `topbar.tsx`, `icon-registry.tsx`;
- semantic presentation: `admin-dashboard.tsx`, `advisor-dashboard.tsx`, `action-center-page.tsx`, `module-placeholder.tsx`;
- centralized development identity: login, employee, notifications, fixture label, theme switcher, AI Workspace, and related page surfaces;
- low-risk compatibility/accessibility changes only: `data-grid.tsx`, `universal-file-viewer.tsx`, `action-center-card.tsx`.

The DataGrid, File Viewer, PortalShell, and page-dispatch architectures were not replaced.

### Application/shared components — 35

```text
components/action-center/action-center-card.tsx
components/auth/login-screen.tsx
components/command-bar/universal-command-bar.tsx
components/data-grid/data-grid.tsx
components/data-grid/filter-builder.tsx
components/data-grid/saved-view-selector.tsx
components/detail/detail-drawer.tsx
components/file-viewer/universal-file-viewer.tsx
components/gates/permission-gate.tsx
components/notifications/notification-center.tsx
components/pages/action-center-page.tsx
components/pages/admin-ai-workspace.tsx
components/pages/admin-dashboard.tsx
components/pages/advisor-dashboard.tsx
components/pages/data-grid-page.tsx
components/pages/documents-page.tsx
components/pages/employee-home.tsx
components/pages/employee-profile.tsx
components/pages/employee-upload-flow.tsx
components/pages/insight-deck.tsx
components/pages/module-placeholder.tsx
components/pages/notifications-page.tsx
components/pages/page-frame.tsx
components/pages/portal-page.tsx
components/providers/app-providers.tsx
components/providers/context-capsule-provider.tsx
components/shared/data-provenance-badge.tsx
components/shared/fixture-label.tsx
components/shared/status-badge.tsx
components/shared/theme-switcher.tsx
components/shell/app-sidebar.tsx
components/shell/icon-registry.tsx
components/shell/mobile-navigation.tsx
components/shell/portal-shell.tsx
components/shell/topbar.tsx
```

### UI primitives — 61

`accordion`, `alert-dialog`, `alert`, `aspect-ratio`, `attachment`, `avatar`, `badge`, `breadcrumb`, `bubble`, `button-group`, `button`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `combobox`, `command`, `context-menu`, `dialog`, `direction`, `drawer`, `dropdown-menu`, `empty`, `field`, `form`, `hover-card`, `input-group`, `input-otp`, `input`, `item`, `kbd`, `label`, `marker`, `menubar`, `message-scroller`, `message`, `native-select`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `spinner`, `switch`, `table`, `tabs`, `textarea`, `toggle-group`, `toggle`, `tooltip`.

## 11. DataGrid

Primary files:

- `components/data-grid/data-grid.tsx`
- `components/data-grid/filter-builder.tsx`
- `components/data-grid/saved-view-selector.tsx`
- `core/data-grid/filters.ts`
- `core/data-grid/export.ts`

Preserved behavior:

- query search;
- independent inclusive `Data dal >= start_date` and `Data al <= end_date`;
- advanced combined filters for employee, category, state, currency, receipt state, reconciliation state, minimum and maximum amount;
- reset filters;
- selection and select-all-visible;
- sorting;
- column visibility, order, and pointer resize;
- compact desktop table and mobile record cards;
- context menu and Detail Drawer;
- attachment launch into Universal File Viewer;
- bulk fixture delete confirmation;
- export disabled at zero selections;
- export of selected rows only, in current sorted/filtered order;
- visible semantic columns only;
- true XLSX, true PDF report, and CSV export.

No DataGrid rewrite occurred in Phase 1A.

## 12. Universal File Viewer

File: `components/file-viewer/universal-file-viewer.tsx`

Preserved:

- modal viewer;
- image preview;
- zoom;
- image rotation and pan;
- fullscreen shell;
- PDF page controls;
- download;
- metadata and linked-object desktop panel;
- permission-ready descriptor shape;
- accessible toolbar labels.

Phase 1A changes are limited to KAIROS branding, explicit simulated-PDF wording, and 44px mobile toolbar targets. It does **not** claim real PDF rendering.

## 13. Detail Drawer

File: `components/detail/detail-drawer.tsx`

- Desktop: right-side `Sheet`.
- Mobile: bottom `Drawer`.
- Displays status, date, amount, owner, category, note, attachments, and future relationship boundary.
- Attachments open in the global File Viewer without route changes.

## 14. Authentication

Files:

- `core/auth/development-session.ts`
- `app/api/dev-auth/login/route.ts`
- `app/api/dev-auth/logout/route.ts`
- protected Admin/Advisor/Employee layouts.

Current implementation is explicitly DEVELOPMENT / TEST ONLY:

- enabled only when `ALLOW_DEV_LOGIN=true`;
- account: `admin` / `1010`, role `super_admin`;
- credential verification is server-side using a digest and timing-safe comparison;
- password input must be a string;
- no credential is shipped in the client bundle;
- successful login redirects to `/admin/dashboard`;
- session cookie is HttpOnly, `Path=/`, eight-hour max age;
- local HTTP uses `SameSite=Lax`;
- HTTPS embedded deployment uses `Secure`, `SameSite=None`, and `Partitioned`;
- logout clears the cookie and protected routes become inaccessible again.

The private ChatGPT Site protection remains a separate upstream layer. `app/chatgpt-auth.ts` retains helpers for platform identity; Phase 1A does not remove or replace platform access protection.

Production authentication, invite lifecycle, MFA, persisted sessions, and production RBAC are not implemented.

## 15. Theme and design system

Theme provider: `next-themes`, class strategy, default `system`, system preference enabled, transition suppression during theme switch.

Modes preserved:

- Light;
- Dark;
- System.

Precision Futurism remains intact: restrained neutral surfaces, teal accent, compact geometry, thin borders, professional typography, and semantic-only warning/danger use.

Phase 1A tokens added/prepared:

- `success`, `warning`, `danger`, `info` with semantic surfaces;
- data provenance: `actual`, `forecast`, `extracted`, `confirmed`, `official`, `fixture`;
- `accent-brand-foreground` for accessible small accent text;
- `density-compact` and `density-touch`;
- improved Light-mode muted text contrast.

`DataProvenanceBadge` provides a reusable, labeled component so provenance never relies on color alone. Actual/forecast charts retain solid/dashed line distinction.

Reduced-motion handling remains in global CSS.

## 16. Responsive shell

- Desktop: persistent/collapsible sidebar, nested Admin IA, dense topbar, DataGrid table, right-side detail panels.
- Tablet: sidebar and content adapt through existing Tailwind breakpoints.
- Mobile: dedicated five-slot bottom navigation, 44px shell controls, cards where tables are inappropriate, bottom detail drawer, direct Command Bar trigger.
- Employee: touch-density mode and intentionally minimal task-first navigation.
- Admin/Advisor use compact density on desktop and touch density below the mobile breakpoint.

## 17. Fixture and configuration layer

Files:

- `fixtures/development/index.ts`: typed demonstration entities and visual datasets;
- `fixtures/development/experience-config.ts`: Phase 1A environment/config metadata.

Centralized configuration now includes:

- KAIROS name and claim;
- `DEV · FIXTURE` environment identity;
- shell metrics;
- data-provenance labels;
- planned/non-executable integration states;
- shared object-ID references for Decisions, Inbox, and Closing;
- Command Bar Action and Ask KAIROS previews.

Source marker: `KAIROS_PHASE_1A_DEVELOPMENT_FIXTURE`.

The principle is **one object → many views**: future NOW, Decisions, Inbox, Closing, and Notifications should resolve shared IDs rather than duplicate competing records.

## 18. Providers

Root provider stack (`AppProviders`):

```text
ThemeProvider
  TooltipProvider
    UniversalFileViewerProvider
      application
      Toaster
```

Portal provider stack (`PortalShell`):

```text
AccessProvider
  ContextCapsuleProvider
    UniversalCommandBarProvider
      SidebarProvider
        AppSidebar
        Topbar
        page content
        MobileNavigation
```

## 19. Services and boundaries

Implemented service-level modules:

- development auth/session adapter;
- login/logout route handlers;
- pure DataGrid filtering functions;
- reusable CSV/XLSX/PDF export functions;
- centralized fixture/config adapters.

There is intentionally no generic `services/` domain layer yet because Phase 1A does not implement production data or domain engines. UI components consume fixtures through the fixture adapter; future engines should enter behind dedicated service interfaces without direct SQL access from UI or AI.

## 20. Permissions and feature hooks

File: `components/gates/permission-gate.tsx`

- `AccessProvider` supplies permission and enabled-module context;
- `PermissionGate` checks a route/component permission string;
- `FeatureFlagGate` checks the module key;
- development super-admin uses the explicit `"all"` capability;
- Navigation Registry entries carry both `permission` and `module` metadata;
- Context Capsule carries the permission context.

These are extension hooks, not production authorization. Server-enforced tenant-scoped RBAC remains deferred.

## 21. Hooks

- `useMobile()` / `useIsMobile()` in `hooks/use-mobile.ts`;
- `useUniversalFileViewer()`;
- `useUniversalCommandBar()`;
- `useContextCapsule()`.

## 22. Dependencies

No dependency was added or upgraded in Phase 1A.

### Runtime — 27

```text
@base-ui/react ^1.7.0
@hookform/resolvers ^5.7.1
@shadcn/react ^0.3.0
class-variance-authority 0.7.1
clsx 2.1.1
cmdk ^1.1.1
date-fns ^4.4.0
drizzle-orm 0.45.2
embla-carousel-react ^8.6.0
exceljs ^4.4.0
input-otp ^1.4.2
jspdf ^4.2.1
jspdf-autotable ^5.0.8
lucide-react ^1.31.0
next 16.2.6
next-themes ^0.4.6
radix-ui ^1.6.7
react 19.2.6
react-day-picker ^10.0.1
react-dom 19.2.6
react-hook-form ^7.85.0
react-resizable-panels ^4.12.2
recharts ^3.8.0
sonner ^2.0.8
tailwind-merge 3.6.0
vaul ^1.1.2
zod ^3.25.76
```

### Development — 17

```text
@cloudflare/vite-plugin 1.37.1
@tailwindcss/postcss 4.2.1
@types/node 22.19.19
@types/react 19.2.14
@types/react-dom 19.2.3
@vitejs/plugin-react 6.0.2
@vitejs/plugin-rsc 0.5.26
drizzle-kit 0.31.10
eslint 9.39.4
eslint-config-next 16.2.6
react-server-dom-webpack 19.2.6
tailwindcss 4.2.1
tw-animate-css ^1.4.0
typescript 5.9.3
vinext 0.0.50
vite 8.0.13
wrangler 4.92.0
```

## 23. Build and hosting

| Area | Audited repository state |
|---|---|
| Application stack | Next `16.2.6`, React `19.2.6`, TypeScript `5.9.3` |
| Build/runtime adapter | vinext `0.0.50`, Vite `8.0.13`, Cloudflare Vite plugin and Wrangler |
| Build command | `npm run build` → `scripts/build-verified.sh` → bounded `vinext build` |
| Production start command | `npm run start` → `vinext start` |
| Hosting binding | `.openai/hosting.json` references ChatGPT Site project `appgprj_6a9ee97218d88191abbe3584dae866dc` |
| Database binding | none (`d1: null`) |
| Object-storage binding | none (`r2: null`) |
| Platform privacy | separate upstream ChatGPT Site protection; not removed or replaced by application auth |
| Deployment action in this synchronization | none; this is a repository-documentation update only |

The successful production build emits physical catch-all portal routes and the two development-auth API routes. The registry expands those catch-all routes into 73 application destinations at runtime. This audit does not assert that any currently published deployment has been repointed to the documentation-only commit.

## 24. Capability-state audit

| Capability | Current classification | Repository reality |
|---|---|---|
| Development login and logout | **OPERATIVO** | Server-side verification gated by `ALLOW_DEV_LOGIN=true`; HttpOnly session and protected-route redirects work. It is not production auth. |
| Portal route resolution | **OPERATIVO** | Registry-backed catch-all routing resolves all 73 registered destinations and rejects unknown paths. |
| Admin desktop navigation | **OPERATIVO** | Nested progressive-disclosure IA is driven by Navigation Registry metadata. |
| Advisor/Employee desktop navigation | **OPERATIVO** | Existing role-specific grouped navigation remains functional. |
| Role-specific mobile navigation | **OPERATIVO** | Route destinations derive from the shared registry; only shell actions such as `Actions` and `Altro` are synthetic. |
| Light/Dark/System theme | **OPERATIVO** | `next-themes` provider and semantic CSS tokens are active. |
| Command Bar keyboard/dialog shell | **OPERATIVO** | Ctrl/Cmd+K, Escape, desktop/mobile triggers, grouping, and route navigation work. |
| Command Bar Search | **FIXTURE / LOCAL STATE** | Searches centralized, portal-scoped fixture records and routes to existing surfaces. |
| Command Bar Action / Ask KAIROS | **SHELL / EXTENSION POINT** | Visible, explicitly disabled previews; no action or AI execution occurs. |
| Context Capsule v1 | **SHELL / EXTENSION POINT** | Typed provider populates user, organization, portal, route, page, and permissions; exposes page-context update/reset APIs. Live DataGrid binding is absent. |
| DataGrid interaction model | **OPERATIVO** | Search, sorting, combined filters, From/To bounds, selection, visible columns/order/resize, responsive cards, context menu, and detail opening work. |
| DataGrid records and mutations | **FIXTURE / LOCAL STATE** | Rows are fixture-backed; bulk deletion and UI changes are not persisted to a production data source. |
| CSV/XLSX/PDF export | **OPERATIVO** | Exports selected rows only, respects current order and visible semantic columns, and disables export at zero selection. XLSX and PDF are real generated files. |
| Detail Drawer | **OPERATIVO** | Desktop Sheet and mobile Drawer open selected fixture records and linked attachments. |
| File Viewer images | **OPERATIVO** | Modal preview, zoom, rotation, pan, fullscreen shell, download, metadata, and linked-object presentation work for available assets. |
| File Viewer PDF display | **SHELL / EXTENSION POINT** | Page controls and report shell exist, but the displayed PDF surface is explicitly simulated; no production PDF renderer is present. |
| Admin NOW and Decisions surfaces | **FIXTURE / LOCAL STATE** | Existing executive dashboard and Action Center render structured fixture data at their stable routes; they are not the final Phase 1B experiences. |
| KAIROS Inbox, Policies, Advisor Closing | **SHELL / EXTENSION POINT** | Routes, registry metadata, permissions, modules, and honest placeholders exist; final workflows do not. |
| Advisor Accounting Cockpit | **FIXTURE / LOCAL STATE** | Existing advisor dashboard foundation renders fixture information; final cockpit orchestration is deferred. |
| Employee upload flows | **FIXTURE / LOCAL STATE** | Touch-first expense and work-report forms are navigable; no production upload, OCR, storage, or persistence exists. |
| Notifications, dashboards, charts, grids | **FIXTURE / LOCAL STATE** | UI behavior uses centralized demonstration datasets. |
| Business-domain engines | **NON IMPLEMENTATO** | Banking, tax, compliance, payroll, fiscal logic, OCR, and deep workflow engines are absent. |
| Production identity/RBAC/tenancy | **NON IMPLEMENTATO** | No production identity lifecycle, tenant-scoped server authorization, MFA, or persisted session store. |
| Production database/storage/data services | **NON IMPLEMENTATO** | No D1/R2 binding, production database, object storage, or tenant-scoped domain repository. |
| Production AI/orchestration | **NON IMPLEMENTATO** | No OpenAI integration, AI backend, governed tool execution, or direct/indirect SQL access. |

## 25. QA status at the audited commit

Verification was rerun directly against `050e714` during this documentation synchronization:

| Check | Result |
|---|---|
| Development login enabled | pass |
| Wrong username/password rejected | pass |
| String-only password payload | pass |
| Protected route redirect | pass |
| Session refresh persistence | pass |
| Logout and post-logout protection | pass |
| Existing route compatibility + 3 additive routes | pass |
| Registry count | pass — 73 total; 50 Admin / 16 Advisor / 7 Employee |
| All registered route responses | pass — HTTP 200 with authenticated development session |
| Admin/Advisor/Employee server rendering | pass |
| Desktop nested navigation contract | pass |
| Shared mobile navigation metadata | pass |
| Command Bar shortcut/Escape/navigation/preview contracts | pass |
| Context Capsule contract | pass |
| DataGrid combined filters and reset | pass |
| Employee From/To date filters | pass |
| Selected-row-only CSV | pass |
| Selected-row-only true XLSX | pass |
| Selected-row-only true PDF | pass |
| File Viewer source/branding regression | pass |
| Light/Dark/System provider and token regression | pass |
| ESLint | pass |
| TypeScript `tsc --noEmit` | pass |
| Production build | pass |
| Node test suite | **pass — 27/27** |

The production build retains one non-blocking bundler warning: a client chunk exceeds 500 kB after minification. npm also reports that its inherited `http-proxy` environment configuration will become unsupported in a future npm major version; this is not an application-code failure.

The earlier Phase 1A smoke test covered production-server auth, role/new routes, refresh, logout, and server error output. Interactive cloud-browser QA could not reach the local loopback server in that environment (`ERR_BLOCKED_BY_CLIENT`, then gateway failure). An independently captured browser visual/console pass therefore remains a release check before publication.

## 26. Known limitations and technical debt

- Inbox, Closing, Policies, final NOW, final Decisions, and final Advisor Cockpit are still shell/fixture surfaces by design.
- Command Bar Search is local fixture search only; Action and Ask KAIROS are disabled previews.
- Context Capsule is not wired to live DataGrid selection, filter, visible-column, object, or period state.
- File Viewer PDF display is simulated; Print and a dedicated mobile metadata Details Sheet are absent.
- Authentication is development-only and uses a non-production static session model.
- Permission and feature gates are shell hooks, not server-enforced production RBAC.
- Fixtures and local mutations are not persisted.
- No production domain service or tenant-scoped persistence layer exists.
- The client bundle has a non-blocking chunk-size warning above 500 kB.
- A live browser visual/console regression pass is still required before deployment promotion.

## 27. Explicitly deferred to Phase 1B — Experience Surfaces

Phase 1B must evolve the current infrastructure additively without renaming stable routes or replacing valid shared components:

1. final NOW experience at `/admin/dashboard`;
2. final Decisions experience at `/admin/action-center`;
3. final KAIROS Inbox queue at `/admin/inbox`;
4. final Closing experiences using `/admin/control/period-close` and `/advisor/closing`;
5. final Advisor Accounting Cockpit at `/advisor/dashboard`;
6. final Integrations placement and experience at `/admin/automation/integrations`;
7. contextual AI surface connected only through a future governed adapter; no direct SQL access;
8. print shell and the explicitly deferred File Viewer print/mobile-detail refinements;
9. binding of DataGrid/detail state to `ContextCapsuleProvider.updatePageContext()`;
10. replacement of Command Bar Action/Ask previews only when permission-aware service adapters exist;
11. shared object resolution across NOW, Decisions, Inbox, Closing, and Notifications using centralized object references;
12. final `PageKind` dispatch components for current honest placeholders, preserving registry keys and route compatibility.

## 28. Explicitly deferred to Phase 2A — Platform Foundations

The audited commit contains preparation points only. These capabilities are **NON IMPLEMENTATE**:

1. production tenant and organization model;
2. production identity lifecycle, invitations, sessions, MFA, and account recovery;
3. server-enforced tenant-scoped permissions and production RBAC;
4. canonical objects, relations, and event model;
5. policy and autonomy framework;
6. production document ingestion, object storage, extraction, OCR, and evidence lifecycle;
7. governed AI orchestration and tool-access layer;
8. production Output Engine;
9. semantic metrics foundation;
10. production service/repository interfaces that replace development fixtures without coupling UI to SQL.

## 29. Deviations

- No functional deviation from MASTER v3 or the Phase 1A specification is present in the audited source commit.
- The only incomplete acceptance medium is the interactive cloud-browser console/visual run, blocked by local-preview connectivity. Automated build, rendering, route, export, auth, and source-contract checks pass.
- Figma and Product Design remained advisory. No alternate product, paid dependency, capability reduction, or Phase 1B implementation was introduced.
- This `0.2` document intentionally records `050e714` as its audited application source. Any later documentation-only commit does not change that audited code snapshot.
