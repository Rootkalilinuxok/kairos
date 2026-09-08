# KAIROS — MASTER v3
## Permanent Product Constitution

**Version:** 3.0  
**Status:** LOCKED MASTER  
**Product:** KAIROS  
**Claim:** *Decide at the right moment.*  
**Target:** AI-native SaaS for professionals, micro-businesses and SMEs up to roughly 40–50 employees  
**Primary build environment:** GPT Site / ChatGPT Work  
**Implementation style:** progressive, additive, backward-compatible, test-gated

---

## 0. AUTHORITY AND RESET RULE

This MASTER v3 supersedes the following historical specifications if they are still present in GPT Site context:

- `00_AI_BOS_MASTER(1).md`
- `01_APPLICATION_SHELL(1).md`
- any old pasted prompt/text used for Step 01
- `00_KAIROS_MASTER_V2.md`
- `01_KAIROS_EXPERIENCE_SHELL_V2.md`

Those files are **historical only** and must not drive implementation after this reset.

Current source-of-truth hierarchy:

1. `00_KAIROS_MASTER_V3.md`
2. current numbered phase specification
3. `04_KAIROS_DESIGN_SYSTEM_BLUEPRINT.md`
4. `01_KAIROS_BASELINE_AND_COMPATIBILITY.md`
5. repository reality / updated build-state handoff

If there is a conflict, the higher item wins.

### Non-regression rule

A new design may reorganize, simplify or improve existing functions, but **must never silently remove previously agreed capabilities**.

---

## 1. PRODUCT DEFINITION

KAIROS is not an ERP with an AI chat box.

KAIROS is an:

> **AI-native Business Operating System and System of Action**

It should help the user:

1. understand what is happening;
2. identify what matters now;
3. know what is likely to happen next;
4. understand why a decision is timely;
5. prepare the right action;
6. approve or govern the action;
7. execute through safe business services;
8. preserve evidence, audit and outcome.

Core operating loop:

`OBSERVE → UNDERSTAND → EVIDENCE → DECIDE → GOVERN → ACT → AUDIT → OUTCOME`

---

## 2. TARGET CUSTOMER AND SIMPLICITY

KAIROS is designed for:

- freelancers / professionals;
- micro-businesses;
- small businesses;
- SMEs up to approximately 40–50 employees.

It is not initially designed for multinational enterprises with thousands of employees.

The platform must remain:

- broad in capability;
- deep enough for serious business operations;
- intuitive without formal training;
- operational on desktop and mobile;
- commercially usable through subscription when production-ready.

### Zero Training principle

A normal user should be able to use KAIROS without a training course.

Use:

- clear primary actions;
- progressive disclosure;
- role-specific language;
- contextual help;
- AI assistance where useful;
- defaults that reduce configuration burden.

Do not show every advanced option at once.

---

## 3. NO PAID DEPENDENCY PRINCIPLE

Core KAIROS capabilities must not depend on mandatory paid third-party business SaaS platforms.

Benchmark products such as SAP, Oracle, ServiceNow, Workday, Odoo, Ramp, Brex, etc. are design and product references only.

Preferred foundations:

- OpenAI API for AI capabilities;
- KAIROS-owned application logic;
- PostgreSQL/Supabase or equivalent for database/auth/storage when implemented;
- Google APIs where authorized;
- official/public sources for tax/regulatory/FX where possible;
- open-source libraries for output, parsing, analytics and rendering.

Commercial integrations may enhance KAIROS later, but should not be required for core operation when a reasonable native/free fallback exists.

---

## 4. THREE REQUIRED PORTALS

KAIROS has one backend and three product experiences.

### 4.1 Admin / Owner

Full operating workspace for understanding, deciding, operating, approving, analyzing and configuring.

### 4.2 Accountant / Advisor

Must remain a first-class product area.

It is not a reduced Admin clone.

It is an Accounting / Closing Cockpit focused on:

- movements;
- statements;
- expenses;
- invoices;
- reconciliations;
- payroll inputs;
- employee reports;
- documents;
- requests / clarifications;
- compliance items;
- tax deadlines/documentation;
- close readiness;
- reports.

Permissions will later be organization-, module-, period-, document-, action- and detail-scoped.

### 4.3 Employee

Must remain extremely simple and mobile-first.

Core functions remain:

- Home;
- Carica spesa;
- Carica rapportino;
- Notifiche;
- Trasferte;
- Documenti;
- Profilo.

Preferred mobile bottom navigation:

`Home | Spesa | Rapportino | Notifiche | Altro`

Do not expose ERP jargon or administrative complexity to employees.

---

## 5. REQUIRED BUSINESS CAPABILITIES — NEVER DELETE

The following original capabilities remain part of KAIROS even if navigation changes.

### Company / CRM
- Customers
- Suppliers
- Contacts
- Products / Services
- Projects / Practices

### People
- Employees
- Trips
- Work Reports
- Employee Expenses
- Employee Cards
- Payroll preparation
- Employee documents
- Employee financial ledger

### Finance
- Bank Accounts
- Company Cards
- Movements
- Bank Statements
- Expenses
- Income
- Reconciliation
- Billing

### Documents
- Document Hub
- Document Studio
- Templates
- Archive
- Universal File Viewer

### Intelligence
- Analytics
- Reports
- Forecast / Outlook
- Scenarios
- Digital Twin

### Control
- Closing
- Compliance
- Anomalies
- Audit
- Policies

### Tax
- Tax Intelligence
- Deadlines
- Regulation
- Incentives / Grants

### Automation
- Workflows
- Automations
- Notifications
- Integrations

### Platform
- Users
- Roles & Permissions
- Modules
- Company Brain
- Settings
- Industry Packs
- Country Packs
- future white-label capability

---

## 6. PRIMARY EXPERIENCE MODEL

Admin is conceptually organized around:

1. **NOW**
2. **DECISIONS**
3. **INBOX**
4. **WORK**
5. **INTELLIGENCE**
6. **CONTROL**
7. **AUTOMATIONS**
8. **INTEGRATIONS**
9. **SETTINGS**

This is a presentation hierarchy, not a reduction in functionality.

### NOW
Answers: What matters now? What is approaching? Where are we heading? Why is this important now?

### DECISIONS
Human judgment queue. Not a generic to-do list.

### INBOX
Unified ingestion surface. Not the canonical document archive.

### WORK
Operational modules.

### INTELLIGENCE
Analytics, reports, forecast, scenarios, Digital Twin.

### CONTROL
Closing, compliance, anomalies, tax, audit, policies.

---

## 7. EXCEPTION-FIRST UX

If KAIROS has checked 2,000 records and only 15 require human judgment, the user should primarily see the 15 exceptions.

Normal/correct items remain searchable and auditable but should not dominate attention.

---

## 8. BUSINESS OBJECT GRAPH

KAIROS will use stable business entities plus explicit relationships.

Core object classes include:

- Organization
- Customer
- Supplier
- Contact
- Employee
- Product / Service
- Project
- Trip
- Work Report
- Expense
- Card
- Bank Account
- Bank Statement
- Bank Transaction
- Invoice
- Payment
- Document
- Email / Message
- Decision
- Policy
- Workflow
- Metric
- Regulatory Rule

Production business objects must be tenant-scoped using `organization_id`.

---

## 9. RELATIONSHIP MODEL

Examples:

- Employee `works_on` Project
- Project `belongs_to` Customer
- Expense `incurred_by` Employee
- Expense `related_to` Trip
- Expense `charged_to` Project
- Expense `evidenced_by` Receipt
- Bank Transaction `matched_with` Expense
- Invoice `issued_to` Customer
- Invoice `settled_by` Transaction
- Email `contains` Document
- Decision `acts_on` Business Object

Important relationships should be able to preserve source, confidence, evidence and validity dates where useful.

---

## 10. EVENT LOG

Important business changes must produce structured events.

Examples:

- `document.received`
- `document.classified`
- `expense.created`
- `expense.receipt_matched`
- `bank_transaction.imported`
- `bank_transaction.reconciled`
- `invoice.issued`
- `employee.created`
- `employee.report_submitted`
- `payroll.input_ready`
- `payslip.uploaded`
- `compliance.finding_created`
- `compliance.finding_resolved`
- `ai.proposal_created`
- `decision.approved`
- `decision.rejected`
- `action.executed`
- `action.reverted`
- `period.closed`

The Event Log supports audit, timeline, automation, process intelligence, AI context and diagnostics.

---

## 11. EVIDENCE GRAPH

KAIROS must be able to explain where important conclusions came from.

Example:

`Bank transaction ↔ Expense ↔ Receipt ↔ Supplier ↔ Employee ↔ Trip ↔ Project`

A missing evidence node can generate a finding.

Evidence links should preserve source, source document, extraction method, timestamp, confidence and user confirmation where applicable.

---

## 12. DECISION MODEL

A Decision is a first-class object.

Future fields may include ID, organization, type, status, severity, risk, financial exposure, deadline, decision window, related objects, evidence, recommendation, alternatives, confidence, policy version, approval requirement, expected outcome and actual outcome.

### Decision Debt
NOW should later quantify unresolved decision burden: open count, financial exposure, compliance exposure, time-sensitive items and estimated delay cost where meaningful.

### WHY NOW
KAIROS should explain not only what to do but why now.

### Outcome Ledger
Important decisions may later track expected result, actual result, variance, prediction error and decision effectiveness.

---

## 13. AI CORE

AI is an operator, not only a chatbot.

Conceptual architecture:

- Supervisor / Orchestrator
- specialized agents
- Context Capsule
- safe tools/actions
- Company Brain
- semantic metrics
- proposal engine
- policy evaluation
- audit instrumentation

### Structured AI Transaction

`PROPOSAL → PREVIEW → APPROVAL/POLICY → COMMIT → EVENT → AUDIT`

No direct generic SQL access for AI. No generic `execute_sql()` tool.

---

## 14. CONTEXT CAPSULE

Relevant pages should be able to expose structured context such as current user, organization, portal, route, current object, selected rows, active filters, visible columns, current period and permission context.

---

## 15. POLICY & AUTONOMY

AI autonomy is evaluated per action, not by one global switch.

Potential inputs include action type, role, organization, amount, risk, confidence, evidence completeness, reversibility, jurisdiction and policy version.

---

## 16. KAIROS INBOX

Unified ingestion sources include email, PDF, images, Excel, CSV, Word, receipts, bank files, camera, Drive and future connectors.

Flow:

`INGEST → VALIDATE → DEDUPE → CLASSIFY → EXTRACT → MATCH → PROPOSE → APPROVE/POLICY → COMMIT`

Inbox is not Document Hub.

Inbox = what arrived and needs interpretation.  
Document Hub = canonical company documents after acceptance/storage/linking.

---

## 17. CONTROLLED GMAIL INGESTION

Development/pilot mailbox:

`kairosframetechsl@gmail.com`

Purpose:

- private ingestion mailbox;
- the user manually forwards selected business emails;
- no assumption that external parties contact it directly.

Planned initial mode:

- OAuth;
- READ ONLY;
- no Gmail password stored in code;
- no client-side secret;
- no outbound email permission initially;
- process only configured scope/label when implemented.

KAIROS must distinguish forwarding user, original sender, original recipients, original date, original subject, forwarded content, original attachments and user-added instruction.

The account is configuration, never global SaaS hard-coding.

---

## 18. DOCUMENT STORAGE AND VIEWER

A binary document is stored once. Multiple records may link to the same `document_id`.

Universal Viewer must eventually support image preview, real PDF rendering, zoom, pan, image rotation, fullscreen, PDF navigation, metadata, permissions, download and print.

---

## 19. PROFESSIONAL DATAGRID

Admin/Advisor grids should support sorting, search, advanced filters, `Data dal`, `Data al`, checkbox selection, select visible, multi-select, resize/reorder/show-hide columns, sticky header, saved views, export, print, bulk actions, context menu, double-click detail, detail drawer, soft delete/restore and permission-aware actions.

Mobile uses compact operational cards.

### Selection export rule

- zero rows selected → Export disabled;
- selected rows → export only selected rows;
- preserve current row order;
- use visible exportable columns;
- exclude checkbox/action UI columns.

---

## 20. UNIVERSAL OUTPUT / EXPORT / PRINT

Output generation is a shared platform service, not duplicated in modules.

Eligible formats where appropriate:

- CSV
- XLSX
- PDF
- DOCX
- Print

### A4 invariant

Every human-readable artifact must have an A4-ready print representation with orientation, margins, title, organization, timestamp, page number, repeated table headers, intelligent page breaks, no clipping and print-safe light theme by default.

CSV remains raw data. The same dataset must have a separate A4 print representation.

XLSX should include A4 print settings where technically feasible.

Print is not merely `window.print()` on arbitrary application UI.

---

## 21. BILLING & DOCUMENT STUDIO

Retain generation of invoices, proformas, quotations, orders, credit notes, expense reports, trip reports, work/service reports, operational reports, HR letters and other templates.

Flow:

`REQUEST → SOURCES → VALIDATE → BUSINESS RULES → DRAFT → PREVIEW → APPROVE → FINAL ARTIFACT → STRUCTURED RECORD → LINKS → AUDIT`

---

## 22. ANALYTICS & SEMANTIC METRICS

Metrics must have stable, versioned definitions.

Examples: Revenue, Operating Cost, Employee Cost, Gross Margin, Profit, Cash, Tax Exposure, Receivables, Payables and Project Margin.

AI may explain metrics but must not redefine them ad hoc.

---

## 23. FORECAST / SCENARIOS / DIGITAL TWIN

Retain natural-language report builder, saved reports, actual vs forecast, cash forecast, tax estimate, profitability by employee/customer/project, break-even, travel analysis, pension estimates where rules/sources support them, scenario simulator and Digital Twin.

---

## 24. TAX & REGULATORY INTELLIGENCE

Retain Fiscal Profile, Source Registry, official sources, jurisdiction engine, monitoring, versioned rules, effective dates, Regulatory Inbox, Tax Calendar, Tax Estimator and Incentives/Grants.

Ambiguous interpretation requires professional review.

---

## 25. COMPLIANCE & RESOLUTION

Compliance cross-checks data, documents, banking, fiscal profile, company policy and rules.

Findings include reason, evidence, rule/source, confidence, impact, severity and proposed remediation.

### Resolution Engine

Natural user replies can become structured resolution actions.

`finding → user response → proposed update → approval/policy → record update → recheck → resolved/residual open`

Never invent missing dates/accounts.

---

## 26. CLOSING COCKPIT

Period close is first-class. Readiness can aggregate reconciliation, invoices, expenses, employee reports, documents, compliance, tax and payroll input.

Use the same underlying close-readiness model for Admin and Advisor.

---

## 27. PROCESS INTELLIGENCE

The event model must later support analysis of process duration, delays, repeated exceptions, late-paying customers, expense bottlenecks, close duration and repeated manual work.

---

## 28. DYNAMIC MODULE BUILDER

Retain natural-language custom module creation. Stable core entities remain native; custom modules use metadata/dynamic schema.

---

## 29. SAAS ONBOARDING

Future onboarding uses business description, country, region, legal form, currency, language and fiscal basics to suggest:

`Base Platform + Industry Pack + Country Pack`

---

## 30. I18N & MULTI-CURRENCY

Initial readiness: Italian, English, Spanish.

Currency model supports transaction currency, base currency, exchange rate, converted amount, rate date and source.

---

## 31. SECURITY & TRUST

Production architecture must support tenant isolation, least privilege, server-side authorization, scoped roles, audit, invitation auth, MFA-ready, password reset, signed file access, encrypted integration tokens and no client-only RBAC.

---

## 32. DEVELOPMENT AUTH

Development/Test only seed account remains:

- username: `admin`
- password: `1010`
- role: `super_admin`

Server-side, flag-gated, removable for production.

---

## 33. DESIGN SYSTEM

Visual language: **Precision Futurism**.

Premium enterprise, sober futuristic, thin typography, fine separators, precise geometry, controlled whitespace, high information density, neutral base, restrained teal accent, linear icons and subtle motion.

Avoid giant cards, decorative gradients, oversized icons, generic dashboard templates, excessive colors and gamified UI.

Global modes: Light / Dark / System.

Desktop favors compact density. Mobile favors touch density.

---

## 34. COMPATIBILITY POLICY

Preserve stable routes where practical; use aliases/redirects when needed; do not orphan modules; do not silently delete permissions; avoid destructive renames only for aesthetics; user-facing branding must be KAIROS.

---

## 35. BUILD PROGRAM

### Phase 0 — Audit
Completed current-build inventory.

### Phase 1A — Experience Infrastructure
Navigation, registry, command system, context, fixtures, branding and compatibility.

### Phase 1B — Experience Surfaces
NOW, Decisions, Inbox, Closing, Advisor Cockpit, Integrations, contextual AI and print shell.

### Phase 2A — Platform Foundations
Tenant, identity, permissions, objects/relations/events, policy/autonomy, documents/storage, AI orchestration, output engine, semantic metrics.

### Phase 2B — Business Modules
Deep module-by-module implementation.

### Phase 3 — Connected Journeys
End-to-end cross-module workflows.

### Phase 4 — SaaS Production
Onboarding, subscription-ready architecture, production auth, security, observability, backup and commercialization.

---

## 36. STEP GATE

`BUILD → AUTOMATED QA → HUMAN REVIEW → PATCH → APPROVED → LOCK → NEXT`

LOCK means no arbitrary change, not permanent immutability.

---

## 37. PROHIBITED PATTERNS

Do not remove original capabilities; hard-code one organization; hard-code FrameTech into product architecture; hard-code Gmail as universal SaaS behavior; let AI execute arbitrary SQL; duplicate file binaries; store secrets in client code; create client-only production RBAC; silently substitute fixture logic for production; duplicate export/print/document logic per module; invent tax rules; fabricate missing business data; make paid enterprise SaaS mandatory; or treat screen printing as the only print solution.

---

## 38. SUCCESS DEFINITION

KAIROS succeeds when a non-technical professional can sign in, understand status, see priorities, upload/forward evidence, let KAIROS interpret it, approve safe actions, manage company operations, collaborate with accountant/employees, export/print professional artifacts, understand forecasts, trace evidence and work without formal training.

**KAIROS — Decide at the right moment.**
