## Objectives & Principles
- Modernize all CRUD UIs in /seller-provider with a cohesive design system.
- Maintain functionality with zero regressions; improve usability and accessibility.
- Optimize performance and support all major browsers/devices.

## Design System (Tokens)
- Typography: type scale (12, 14, 16, 18, 24, 32, 40, 56), headings H1–H6, body, caption.
- Colors: Primary (#242C5A), Secondary (#1A2144), Accent (#33A3FF), Success, Warning, Error; neutrals (slate 50–900). Contrast ratios ≥ 4.5:1.
- Spacing: 8px baseline grid (4, 8, 12, 16, 24, 32, 40, 64).
- Radii: 4, 8, 12, 16; Elevation: shadow-sm/md/lg/xl; Z-index scale.
- Motion: reduced motion support; durations 150–300ms; easing cubic-bezier(0.2, 0.8, 0.2, 1).

## Component Standards
- Buttons: sizes (sm, md, lg), variants (primary, secondary, ghost, destructive), states (hover/active/focus/disabled), loading spinners.
- Forms: RHF + Zod; consistent labels/help text; inline errors; submission flows with optimistic UI and toasts.
- Menus & Navigation: unified sidebar/header patterns; dropdowns with keyboard navigation and ARIA roles.
- Modals: standardized sizes (sm, md, lg), focus trap, ESC/overlay dismissal, accessible titles/descriptions.
- Tables: sortable headers, pagination, row selection, skeletons, empty states, responsive columns.

## CRUD Overhaul (Feature Coverage)
- Create: form pages/dialogs per entity (profiles, services, bookings, orders) using shared form components.
- Read: paginated tables with sorting and filters; CSV/Excel export.
- Update: inline editing, optimistic updates, change tracking; non-blocking spinners.
- Delete: soft delete patterns; guarded hard delete with confirmation and integrity checks.

## Responsive Layout
- Mobile-first breakpoints: 320, 768, 1024, 1440.
- Adaptive behaviors: stacked forms/tables on mobile, condensed toolbars, collapsible filters.

## Accessibility (WCAG 2.1 AA)
- Keyboard navigation across menus, tables, dialogs.
- ARIA attributes for interactive components; focus management on modals and route changes.
- Color contrast checks; screen reader-friendly alerts and errors.

## Performance Optimization
- Lazy load non-critical components (charts, heavy tables); code-splitting.
- Virtualized tables for large lists; memoization and stable keys.
- Optimized assets: SVG icons, compressed images; prefetch critical routes.

## Documentation
- Living style guide (MDX/Storybook or docs pages) with component specs and examples.
- Design tokens documented (colors, typography, spacing).
- Implementation guidelines and usage patterns.

## Testing & Quality
- Cross-browser/device testing matrix (Chrome, Firefox, Safari, Edge; iOS/Android).
- Automated visual regression (Playwright screenshot assertions or Storybook Chromatic).
- Unit tests for form validation; integration tests for CRUD flows; accessibility checks.

## Implementation Phases & Milestones
- Phase 1: Design tokens consolidation and core UI primitives (buttons, inputs, dialogs). Milestone: tokenized UI kit.
- Phase 2: Tables and forms standardization; services/bookings CRUD refactor. Milestone: services/bookings complete.
- Phase 3: Orders/profiles overhaul; export features; accessibility pass. Milestone: AA compliance checks pass.
- Phase 4: Performance enhancements; virtualization; lazy loading; asset optimization. Milestone: target render time reductions.
- Phase 5: Documentation (style guide) and automated visual regression; cross-browser/device validation. Milestone: test suite green.

## Resources
- Personnel: 1 FE, 1 QA; support from BE for CRUD wiring.
- Tech: Next.js, shadcn UI, Tailwind, RHF + Zod, Playwright/Vitest.

## Risks & Mitigation
- Regression risk → feature flags, phased rollout, snapshot tests.
- A11y gaps → automated checks and manual audits.
- Performance regressions → profiling and progressive enhancements.

## Delivery & Governance
- Weekly demos, change logs, and rollout communications.
- Incremental merges with CI checks and visual regression gating.

On approval, I will start Phase 1 by consolidating design tokens and standardizing core components, then proceed feature-by-feature across CRUD UIs with documentation and tests.