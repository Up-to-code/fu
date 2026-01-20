## What You Want
- Remove **Customization** + **Edit** buttons from the **product details** page.
- Remove the standalone pages:
  - `/products/[productId]/customization`
  - `/products/[productId]/variants`
- Put **all customization + variants management** inside the **Create** and **Edit** product screens as reusable components.

## Impact (How It Works After)
- **Product Details** becomes read-only viewing (with selector + delete) and no longer a “management hub”.
- **Create** and **Edit** become the only places where the seller configures:
  - options/values
  - generated variants
  - advanced customization (option groups/values, price rules, templates, preview)
  - stored variant overrides (price/stock/SKU per combination)

## Files To Remove (UI routes)
- Remove: [customization/page.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/%5BproductId%5D/customization/page.tsx)
- Remove: [variants/page.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/%5BproductId%5D/variants/page.tsx)

## Files To Modify
### 1) Product Details
- Update header actions in [page.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/%5BproductId%5D/page.tsx):
  - Remove buttons: `التخصيص`, `تعديل المنتج` (and we will also remove `المتغيرات` since the pages will be gone)
  - Keep: `حذف` (and back button)

### 2) Create Flow (No More Redirect to /customization)
- Update create submit redirect in [useProductForm.ts](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/_hooks/useProductForm.ts):
  - After create, redirect to `/products/[newId]/edit?tab=customization` (or `#customization`) so the user starts building inside Edit screen.

### 3) Create + Edit Pages: Inline Components
- Create a reusable component under:
  - `seller-provider/app/(dashboard)/products/_components/ProductCustomizationPanel.tsx`
- Embed it into:
  - [new/page.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/new/page.tsx)
  - [edit/page.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/%5BproductId%5D/edit/page.tsx)

## Component Architecture (What Goes Inside)
### A) ProductCustomizationPanel (Tabs)
Tabs inside Create/Edit:
1) **Basic** (existing fields)
2) **Media** (existing `MediaManager`)
3) **Options & Generated Variants** (existing `ProductOptions` + `VariantsList`)
4) **Advanced Customization** (migrated UI from removed customization page)
   - option groups/values (size/color/material)
   - price rules
   - templates apply
   - preview resolver
5) **Variant Overrides** (migrated UI from removed variants page)
   - bulk edit stored variants via `upsertSellerProductVariant`

### B) Create Mode vs Edit Mode
- **Create screen (no productId yet):**
  - Tabs 1–3 work as they do today.
  - Tabs 4–5 show a locked state (“Save product first to manage advanced customization”) because they write to product-linked tables.
- **Edit screen:**
  - All tabs enabled.
  - The header buttons for customization/variants will be removed (because everything is now inside the page).

## Flowchart (New Navigation)
```mermaid
flowchart TD
  A[Products List] --> B[Create /products/new]
  B -->|Fill base + options| C[Save]
  C --> D[Redirect /products/{id}/edit?tab=customization]
  D --> E[Edit Screen Tabs]
  E --> E1[Options & Variants]
  E --> E2[Advanced Customization]
  E --> E3[Variant Overrides]
  A --> F[Details /products/{id}]
  F -->|View only| F
```

## Verification
- Typecheck seller-provider.
- Run repo tests.
- Manual: Create product → redirected to Edit with customization tab open → configure options/rules/overrides → product detail shows no customization/edit buttons.

If you confirm, I will implement this refactor (delete the pages, migrate their UI into reusable components for Create/Edit, and fix all links/tests).