## Outcome
Create a product management UX that is faster, clearer, and safer (fewer mistakes) by turning create/edit into an intuitive guided flow with quick actions, inline guidance, and consistent feedback.

## Current Baseline (Repo)
- Create/Edit are form-based pages with manual validation via `productSchema` and inline errors.
- Advanced configuration exists as an inline tabbed panel (`ProductCustomizationPanel`) and uses Sonner toasts.
- Tooltip + Skeleton components exist but are not used consistently in product flows.

## Proposed UX / Navigation
### 1) Guided Wizard (minimal steps)
- Convert Create and Edit into a clear 2–3 step wizard using a small stepper header:
  1) Basics (title/description/category/status)
  2) Media + Pricing (images/video/price/stock/SKU)
  3) Options & Variants (simple options + generated variants + advanced customization panel)
- Steps are navigable via query param (no complex routing):
  - `/products/new?step=basics|media|options`
  - `/products/[id]/edit?step=basics|media|options` (default to last used)
- Keep Details page as “view + delete + edit” entry.

### 2) Quick Creation (common elements)
- Add “Quick Add” presets in create/edit to speed repetitive work:
  - Common option sets: Size (S/M/L/XL), Color (Black/White/… + swatch), Material (Cotton/Leather/Wood)
  - Common product templates: “Chair”, “Sofa”, “Table” (default fields + option presets)
- Quick add actions always use `type="button"` and show toast confirmation.

### 3) Clear guidance + tooltips
- Add tooltip icons next to confusing fields (SKU, compare price, media limits, stock meaning, variant overrides).
- Add short helper text under sections (“5 images max”, “Variants override computed price”).

### 4) Feedback + safety
- Add a persistent “Saving…” state and success toast on save.
- Add non-blocking validation hints (e.g., warn if SKU empty, images missing) before save.
- Add “unsaved changes” guard on navigation (optional) to prevent accidental loss.

### 5) Accessibility + responsiveness
- Ensure keyboard navigation across wizard steps and tabs.
- Ensure all icon-only buttons have `aria-label`.
- Ensure color swatches have text fallback and contrast.

### 6) Speed + accuracy optimizations
- Replace large blank loading screens with Skeletons for:
  - Edit product fetch
  - Customization panel fetch
- Reduce accidental submits (already fixed) + add consistent `type="button"` in new UI.
- Optional: local draft persistence (localStorage) for create flow until first save.

## Implementation (Concrete Changes)
### A) New UI building blocks
1) Add `ProductWizardHeader` (stepper + next/back) component
- Location: `seller-provider/app/(dashboard)/products/_components/ProductWizardHeader.tsx`
- Input: current step, steps array, onStepChange, isSubmitting.

2) Add `QuickAddPresets` component
- Location: `seller-provider/app/(dashboard)/products/_components/QuickAddPresets.tsx`
- Provides preset buttons to inject common options/values and/or base product defaults.

3) Add `FieldHelp` + Tooltip usage
- Reuse existing tooltip: `seller-provider/components/ui/tooltip.tsx`

### B) Refactor Create/Edit pages to wizard
- Update:
  - `seller-provider/app/(dashboard)/products/new/page.tsx`
  - `seller-provider/app/(dashboard)/products/[productId]/edit/page.tsx`
- Structure:
  - Keep a single `<form>` but render only the active step’s content.
  - Step navigation uses buttons with `type="button"`.
  - Save button only appears on the final step (or always visible but clearly separated).

### C) Form system upgrade (accuracy)
- Migrate create/edit to React Hook Form + zodResolver using existing shadcn `<Form*>` wrappers:
  - Reuse: `seller-provider/components/ui/form.tsx`
  - Keep schema: `seller-provider/lib/validations.ts (productSchema)`
- Benefits: consistent error rendering, less manual field wiring, fewer edge-case submits.

### D) Loading states
- Use `Skeleton` (`seller-provider/components/ui/skeleton.tsx`) for edit load and customization panel load.

## Files Likely Touched
- Create/edit UI:
  - `seller-provider/app/(dashboard)/products/new/page.tsx`
  - `seller-provider/app/(dashboard)/products/[productId]/edit/page.tsx`
- Product components:
  - add: `_components/ProductWizardHeader.tsx`
  - add: `_components/QuickAddPresets.tsx`
  - update: `_components/ProductCustomizationPanel.tsx` (tooltips, quick-add hooks, skeleton)
- Validation:
  - `seller-provider/lib/validations.ts` (ensure fields align; clarify comparePrice/originalPrice)

## Verification
- Manual:
  - Create flow: complete wizard quickly using presets → save → verify no unexpected redirects.
  - Edit flow: update fields, options, pricing rules; ensure all non-save buttons do not submit.
  - Mobile: stepper is usable and content stacks correctly.
- Automated:
  - Typecheck
  - Existing test suite

If you confirm, I will implement the wizard header + quick presets first, then migrate create/edit to step-based layout and add tooltips/skeletons for a noticeably smoother experience.