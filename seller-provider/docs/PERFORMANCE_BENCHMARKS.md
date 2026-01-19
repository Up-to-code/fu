# Performance Benchmarks (Pre/Post Refactor)

## What To Measure
- Convex query p95 latency (list queries for products, categories, orders, services, bookings)
- Convex mutation p95 latency (create/update/delete per entity)
- Next.js page render time (TTFB + client hydration for list/detail pages)
- Bundle size for dashboard routes

## Baseline (Pre)
Capture before deploying changes:
- Convex dashboard logs:
  - p50/p95 for queries and mutations
- Browser metrics:
  - `/dashboard/products`, `/dashboard/categories`, `/dashboard/orders`

## Post-Refactor (After)
Capture after deploying changes:
- Repeat the same measurements and record:
  - p50/p95 latencies
  - error rates
  - perceived UI responsiveness (loading skeleton duration)

## Expected Improvements
- Reduced memory usage and time spent in queries by removing collect-then-filter patterns for high-cardinality lists.
- Faster dashboard navigation due to consistent loading states and simplified auth gating.

## How To Run
1) Deploy Convex functions:
   - `npx convex deploy`
2) Run production build locally:
   - `npm run build && npm run start`
3) Use a consistent data set and run 30–50 samples per route.

## Reporting Template
- Feature: Products
  - Query: listSellerProducts
  - Pre p95:
  - Post p95:
- Feature: Orders
  - Query: listSellerOrders
  - Pre p95:
  - Post p95:

