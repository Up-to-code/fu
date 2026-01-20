## Scope (Exactly What Will Change)
- Add **Variants** + **Customization Builder** entry points on:
  - Create screen
  - Edit screen
- Make Create flow redirect into the Builder immediately after successful save.
- Improve Builder readability by reorganizing into tabs/sections.
- No backend/schema changes in this round.

## Files to Modify (Maintained + Minimal)
### Seller UI
- Create page: [new/page.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/new/page.tsx)
  - Add two header buttons (disabled pre-save)
  - After create, redirect to `/products/[newId]/customization`
- Edit page: [edit/page.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/%5BproductId%5D/edit/page.tsx)
  - Add two header buttons next to Save
- Builder (“Tilter screen”): [customization/page.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/%5BproductId%5D/customization/page.tsx)
  - Re-layout into tabs (Options / Pricing / Templates / Preview)

### (Optional) Shared UI
- If we need a consistent header action group, I’ll add a small shared component under:
  - `seller-provider/app/(dashboard)/products/_components/…`

## UX Behavior Details
### 1) Edit Screen Buttons
- Placement: right side of header (same row as Save)
- Buttons:
  - `التخصيص` → builder
  - `المتغيرات` → variants dashboard
- Behavior:
  - Always enabled
  - Does not auto-save; user can save first or navigate

### 2) Create Screen Buttons
- Placement: right side of header (same row as Save)
- Buttons:
  - `التخصيص` and `المتغيرات`
- Behavior:
  - Disabled while product has no id
  - After successful create:
    - automatically navigate to builder `/products/[newId]/customization`
    - builder becomes the place to add option types + price rules + variant overrides

### 3) Builder Readability (Tabs)
- **Tab 1: Options**
  - Create option groups (size/color/material/custom)
  - Add/disable values
- **Tab 2: Pricing**
  - Add/disable price rules
  - Show a compact “price breakdown” preview
- **Tab 3: Templates**
  - Apply template to product
  - Link to templates page
- **Tab 4: Preview**
  - Select option values and see resolved price/stock/SKU + breakdown

## Flowchart (End-to-End)
```mermaid
flowchart TD
  A[Products List /products] --> B[Create Product /products/new]
  B -->|Fill base fields| C[Click Save]
  C -->|createSellerProduct mutation| D[New productId returned]
  D --> E[Redirect to Builder /products/{id}/customization]
  E --> F[Define option groups + values]
  E --> G[Define price rules]
  E --> H[Preview resolved variant]
  E --> I[Go to Variants Dashboard /products/{id}/variants]
  I --> J[Override price/stock/SKU/images per combination]
  A --> K[Edit Product /products/{id}/edit]
  K -->|Header buttons| E
  K -->|Header buttons| I
```

## Implementation Steps (In Order)
1) Update edit header UI to include the 2 navigation buttons.
2) Update create header UI:
   - show disabled buttons pre-save
   - redirect to builder after create
3) Refactor builder page into tabs (same functionality, clearer layout).
4) Verify:
   - Create → redirects to builder
   - Edit → buttons navigate correctly
   - Typecheck + tests

If you accept this plan, I’ll implement it immediately.