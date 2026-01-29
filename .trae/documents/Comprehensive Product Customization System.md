## Current State (Repo)
- Products: `sellerProducts` (base attributes) + `sellerProductVariants` (flat combinations via `combination`), and `productMedia` (product/variant/option media).<mccoremem id="01KFC5NX2JPPXXPE1P2EAG1XVX" />
- Orders: `sellerOrders.items[]` has no `variantId` or selected-options snapshot (must be added for real customization).
- Variants today are generated client-side and stored loosely (`combination: any`), and updates replace variants by delete+reinsert (breaks stable references).

## Target Architecture (High Level)
- Keep **base product** as canonical (`sellerProducts`).
- Add a **typed options layer** (option groups + values) with ordering, localization-ready fields, active flags.
- Add a **variant node** model that supports:
  - Flat combinations (current behavior)
  - Future “nested”/hierarchical variants (parentVariantId tree)
- Centralize pricing in a **price resolver** (pure function) used by:
  - Admin preview (variant editor)
  - Customer product page (real-time price)
  - Order creation (final snapshot)

## Database Schema (Convex tables)
I’ll implement tables that map to your requested ones, but aligned to existing naming conventions:
1) **Products table (core attributes)**
- Keep `sellerProducts` as-is (base price, base media, default specs).

2) **Product_options table (variant relationships)**
- `sellerProductOptionGroups`:
  - `productId`, `providerId`, `key` (stable), `name`, `type` (size|color|material|custom), `position`, `isRequired`, `isActive`
- `sellerProductOptionValues`:
  - `groupId`, `productId`, `providerId`, `valueKey` (stable), `label`, `position`, `isActive`
  - Color: `hex`/`rgb`
  - Size: `dimensions` (w/h/d), `sizeChart` fields
  - Material: `textureName`, `meta`
  - Media pointers: `primaryImageUrl?` (denormalized), plus references via `productMedia` by `(productId, optionKey, optionValue)`

3) **Option_attributes table (size/color/material specs)**
- If attributes grow large or need indexing by attribute type:
  - `sellerProductOptionAttributes`:
    - `productId`, `providerId`, `groupKey`, `valueKey`, `attributes` (typed object), `updatedAt`
- Otherwise keep attributes embedded in `sellerProductOptionValues` for performance and simplicity.

4) **Price_matrix table (size-color-price calculations)**
- `sellerProductPriceRules`:
  - `productId`, `providerId`, `ruleType`:
    - `valueAdjustment` (e.g., size +10)
    - `valueMultiplier` (e.g., XL * 1.2)
    - `pairOverride` (size+color = fixed)
    - `comboOverride` (full combination = fixed)
  - `appliesTo`:
    - `{ groupKey, valueKey }` for single
    - `{ pairs: [{groupKey,valueKey}, ...] }` for pair
    - `{ combinationKey }` for full combo (computed stable key)
  - `amount`/`multiplier`, `currency` (future multi-currency), `isActive`, `priority`

5) **Customization_templates table (user-defined option sets)**
- `sellerCustomizationTemplates`:
  - `providerId`, `name`, `appliesTo` (category/style), `definition` (validated JSON), `createdAt`, `updatedAt`
- Templates can be applied to products to generate option groups/values + default rules.

6) **Variants table (resolved purchasable SKUs)**
- Keep/upgrade `sellerProductVariants`:
  - Add: `combinationKey` (stable hash/string of sorted `{groupKey:valueKey}`), `parentVariantId?`, `isDefault?`
  - Tighten validation: `combination` becomes typed structure (validated server-side).
  - Media: use `images[]` and/or `productMedia` linkage.

7) **Orders snapshot (required)**
- Extend `sellerOrders.items[]` to include:
  - `variantId?`, `selectedOptions` (snapshot), `customizationSnapshot` (price breakdown + resolved media)
  - This guarantees the exact purchased configuration is preserved.

## Backend API Surface (Convex-first, REST optional)
- **Queries**
  - `getProductCustomization(productId)` → base product + option groups/values + active rules + variants summary.
  - `resolveVariant(productId, selectedOptions)` → returns matched variant + computed price + inventory.
- **Mutations**
  - CRUD for option groups/values
  - CRUD for price rules / matrix
  - Variant upsert (non-destructive): update in place using `combinationKey` instead of delete+reinsert
  - Apply template to product
- **RESTful endpoints (optional facade)**
  - If needed, expose `GET /products/:id/customization` and `POST /products/:id/resolve` via `convex/http.ts`, while keeping Convex functions as source of truth.

## Pricing Engine (Core Logic)
- Implement a deterministic resolver:
  1) Start from base price
  2) Apply value adjustments/multipliers
  3) Apply pair overrides
  4) Apply full combination override (highest priority)
  5) Return `finalPrice` + `explain` breakdown for UI
- Precompute `combinationKey` for O(1) lookups, and index rules by `(productId, combinationKey)` and `(productId, groupKey, valueKey)`.

## UI/UX Implementation (Seller + Product Details)
1) **Product details page**
- Option selector sections:
  - Size grid (with dimensions + stock)
  - Color swatches (hex) with optional images
  - Material tiles (texture/label)
- Real-time price + availability updates driven by `resolveVariant`.
- Media gallery updates:
  - Prefer variant images; fallback to option media; fallback to base.
- Accessibility:
  - Buttons with `aria-pressed`, keyboard navigation, focus rings, readable contrast.

2) **Admin interfaces**
- Product creation wizard steps:
  - Base product → options → price matrix → variants preview → publish
- Variant management dashboard:
  - Bulk edit stock/price/SKU, search, filter by option values
- Template editor:
  - Save reusable sets of groups/values/rules

## Performance, Caching, and Scale (1000+ options)
- Use indexed lookups (by `productId`, `groupKey`, `valueKey`, `combinationKey`).
- UI virtualization for large value lists.
- Cache resolved results:
  - Client memoization for selectedOptions
  - Optional server-side “computed cache” table keyed by `(productId, combinationKey, updatedAtVersion)`
- Media loading:
  - Thumbnail-first, lazy-load gallery, reuse existing Next/Image optimizations.

## Migration / Phases (matches your phases)
1) Schema migration: add new tables + extend `sellerOrders.items[]`
2) Core services: implement option/rule/variant APIs + pricing resolver
3) Admin updates: wizard + matrix editor + variant dashboard
4) Customer-facing enhancements: selectors + preview + dynamic price
5) Testing: price resolver unit tests + Convex integration tests + UI tests
6) Monitoring: track resolve latency, cache hit rate, media load metrics

## Testing Plan
- Unit: pricing engine (adjustments, overrides, edge cases)
- Integration: Convex functions (auth, rule evaluation, variant resolution)
- UI: variant selection updates price/media/stock correctly
- Performance: synthetic product with 1000+ values; ensure selector remains responsive

If you confirm, I’ll implement Phase 1–2 first (schema + backend APIs + resolver), then wire the product details UI and admin screens on top.