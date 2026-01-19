## Objectives & KPIs
- Deliver complete CRUD for seller-provider (profiles, services, bookings, orders) with robust validation and indexes.
- Achieve ≥90% unit/integration test coverage; reduce p95 query latency to ≤250ms.
- Ensure secure, role-based access and seamless integration with existing Next.js app.

## Architecture Review (Summary)
- Data model: userProfiles, services, serviceCategories, bookings, serviceReviews, orders, favorites, addresses, products (indexes present for services/bookings/reviews).
- Provider gating uses providerType=furniture_seller and entityType (via role mapping). No organizationType field; keep providerType as canonical filter.
- UI uses shadcn components; Convex functions grouped by feature.

## Phased Timeline & Milestones
- Phase 1 (Week 1–2): Schema/index hardening, validator tightening; service wrappers baseline.
  - Milestones: new indexes (profiles/orders), validated queries, baseline wrappers.
- Phase 2 (Week 3–4): CRUD UI (tables/forms) for services & bookings with pagination/filter/sort/export.
  - Milestones: services CRUD complete; bookings CRUD complete.
- Phase 3 (Week 5): Updates (optimistic), deletes (soft/hard), audit logging across entities.
  - Milestones: audits table active; referential integrity checks.
- Phase 4 (Week 6): Tests (≥90% coverage), TypeDoc/JSDoc, accessibility passes.
  - Milestones: coverage reports; a11y checklist passed.
- Phase 5 (Week 7): CI/CD pipeline, feature flags, performance monitoring; staged rollout.
  - Milestones: green CI; rollout enabled; dashboards in place.

## Resources
- Personnel: 1 BE (Convex), 1 FE (Next/shadcn), 1 QA, 0.25 DevOps.
- Technology: Convex, Next.js, TypeScript, Vitest, shadcn UI, TypeDoc, GitHub Actions.
- Budget: dev time (~8–10 weeks equivalent), CI minutes, minimal infra costs.

## Risks & Mitigation
- Schema impacts on legacy code → feature flags, migration scripts, staged rollout.
- Performance regressions → add indexes early, profile queries, set pagination limits.
- Auth/session inconsistencies → centralized auth client, integration tests of protected flows.
- Data export privacy → role-based scoping, mask sensitive fields.

## Performance Metrics & Success Criteria
- p95 query ≤ 250ms; p95 mutation ≤ 400ms; error rate < 0.5%.
- Test coverage ≥ 90% (lines/branches) across CRUD modules.
- 100% seller-provider pages migrated to new CRUD.
- Accessibility: labeled inputs, focus management, color contrast—WCAG basic checks pass.

## Stakeholder Communication
- Weekly status updates and milestone demos.
- Change logs for Convex functions and UI surfaces.
- Rollout advisories with feature availability notes and support channels.

## Training & Change Management
- Developer playbooks: service wrappers, pagination/filter patterns, mutation validation.
- Ops guide: feature flags, rollback steps, monitoring dashboards.
- UI help text/tooltips for complex operations (priceType, locationType, status transitions).

## Implementation Steps
- Database Integration:
  - Add indexes: userProfiles (by_userId/by_role/by_isDeleted), orders (by_userId/by_status/by_createdAt), favorites composite.
  - Tighten validators in mutations (services priceRange; bookings transitions; vendor profile required fields).
- CRUD Functionality:
  - Create: RHF + Zod forms; server-side validation; file uploads via Convex _storage.
  - Read: paginated tables, sorting, advanced filters (providerType, status/date/category); export CSV/Excel.
  - Update: inline editing with optimistic UI and rollback; audit logging of before/after.
  - Delete: soft delete (isDeleted or isActive=false), guarded hard delete with referential checks.
- UI Requirements:
  - Responsive shadcn components; loading skeletons and empty states; accessible dialogs/tooltips.
  - Consistent error handling with toasts and inline messages.
- Code Quality:
  - Enable TS strict; refactor legacy code to feature modules; write unit/integration tests; JSDoc/TypeDoc.
- Organization:
  - Convex functions per feature under /convex (users, services, bookings, orders, providers).
  - Client service wrappers under /seller-provider/services/*.ts.
  - Shared types in /seller-provider/types; docs in /seller-provider/docs.
- API Endpoints:
  - Prefer direct Convex usage; add Next.js route handlers only for exports/webhooks with auth.
- Deployment:
  - CI/CD (lint/typecheck/build/test; Convex deploy); feature flags; performance monitoring; rollback docs.

## Continuous Improvement
- Post-deploy analytics: query/mutation times, error logs.
- Feedback loop from users/QA; sprint hardening for UX and performance.
- Iterative refactors: consolidate service wrappers, enhance typings, expand tests.

## Visuals
- Gantt Outline: Foundations → CRUD UI → Updates/Deletes → Quality → Ops with weekly milestones.
- Process Flow: Client (RHF/Zod) → Services Layer → Convex (validated mutations/indexed queries) → Audits/Storage → Metrics/Flags → CI/CD.

Confirm to proceed; I will start Phase 1 (schema/index hardening and validated queries) and report milestones weekly.