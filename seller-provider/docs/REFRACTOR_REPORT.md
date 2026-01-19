# Seller-Provider Refactor Report

## Scope
- Folder: `seller-provider/`
- Database: Convex functions and schema in `convex/`

## Deprecated Seller-Type Findings
### Legacy Roles
- Legacy roles appear in backend and frontend types:
  - Backend `userProfiles.role` is an unbounded string, with references to `customer/freelancer/vendor/admin`.
  - Frontend types include `freelancer` and `customer`.

### Hotspots
- Backend provider config derives `entityType` from legacy role values.
- Auth gating duplicates initialization logic in multiple components.

## Anti-Patterns and Maintainability Risks
### Duplicate Auth Gating
- Multiple “entry guards” exist with overlapping responsibilities (initialize profile, redirect, upgrade gating).
- Risk: race conditions, inconsistent role initialization, repeated network calls.

### In-Memory Filtering After Collect
- Queries that `.collect()` then filter in memory:
  - Services listing by provider/category/active.
  - Bookings listing by provider/status/date.
- Risk: performance degradation with data growth, unnecessary memory usage.

### Mock Stores for CRUD Pages
- Orders, products, categories are stored in in-memory mock stores and filtered client-side.
- Risk: no persistence, no concurrency checks, difficult to test real failure paths.

## Performance Bottlenecks
- Missing or underused indexes for high-cardinality query patterns.
- Table scans from `.filter` usage where `.withIndex` is expected.

## Security and Authorization Gaps
- Mutations accept overly permissive args (`role` as `string`) rather than strict literals.
- Some mutations rely on caller-provided `userId/providerId` without centralizing auth identity checks.

## Recommended Refactor Targets (Ordered)
1) Consolidate authentication/initialization into a single guard flow.
2) Remove deprecated seller-type paths from seller-provider UI and tighten backend invariants.
3) Replace mock CRUD stores with Convex-backed CRUD modules (orders/products/categories first).
4) Replace collect-then-filter queries with index-backed pagination and validated filters.
5) Add unified error codes across Convex functions and map to consistent UI messages.

## Expected Outcomes
- Maintainability: reduced duplication, consistent patterns per feature.
- Performance: index-backed queries with pagination and reduced memory usage.
- Reliability: fewer runtime exceptions from inconsistent state initialization.
- Security: predictable role handling and stronger validation/authorization.

