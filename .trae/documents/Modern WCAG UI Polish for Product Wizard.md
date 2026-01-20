## UX/UI Goals (Mapped to Your Requirements)
- **Hierarchy + spacing:** consistent section layout, headings, and whitespace.
- **Typography + contrast:** readable sizes, strong contrast, no “gray on gray” pitfalls.
- **Information architecture:** clear wizard steps + strong grouping (Basics / Media+Pricing / Options+Variants).
- **Responsive + accessible:** mobile-first stacking, keyboard navigation, focus indicators, ARIA labels.
- **Feedback:** clear loading, saving, success/error messaging, disabled states.
- **Speed + accuracy:** fewer clicks, presets, validation before submit, skeletons.

## Current State (What We Already Have)
- Create/Edit are now a **3-step wizard** using [ProductWizardHeader.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/_components/ProductWizardHeader.tsx).
- **Quick presets** exist via [QuickAddPresets.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/_components/QuickAddPresets.tsx).
- RHF + Zod validation is integrated in create/edit.
- Skeletons exist for edit and customization panel.
- Theme tokens already exist (`primary`, `ring`, etc.) in [globals.css](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/globals.css).

## Problems To Fix (Based on Best Practices + Screenshot)
- Some UI still uses hard-coded brand colors (`#242C5A`) instead of theme tokens.
- Stepper buttons need stronger **focus styles**, clearer active/done states, and better mobile behavior.
- Sidebar/help text needs more consistent hierarchy and accessible tooltips.
- Validation feedback is per-field only; there is no clear summary or guidance for new users.

## Implementation Plan
### 1) Standardize Design Tokens (Consistency + Contrast)
- Replace hard-coded `#242C5A` usage in product pages/components with Tailwind theme classes:
  - `bg-primary`, `text-primary`, `ring-primary`, `border-primary/…`
- Ensure disabled/secondary button states maintain WCAG contrast.
- Files:
  - [ProductWizardHeader.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/_components/ProductWizardHeader.tsx)
  - [new/page.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/new/page.tsx)
  - [edit/page.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/%5BproductId%5D/edit/page.tsx)
  - [ProductCustomizationPanel.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/_components/ProductCustomizationPanel.tsx)

### 2) Upgrade Wizard Header (Hierarchy + Navigation + WCAG)
- Make the stepper:
  - Mobile-friendly (`overflow-x-auto`, step buttons with `min-w`)
  - Keyboard-friendly with visible focus (`focus-visible:ring-2 ring-primary`)
  - Clear “done/active/upcoming” styling (including numbers: 1/2/3)
  - Add `aria-label` and better semantics (e.g., wrap stepper in `nav aria-label="Product wizard steps"`).
- Add small “progress” text: `Step 2 of 3`.
- File: [ProductWizardHeader.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/_components/ProductWizardHeader.tsx)

### 3) Add Section Wrappers (Alignment + Grouping)
- Create a simple reusable wrapper for product sections that ensures:
  - consistent padding, border, heading styles
  - consistent helper text placement
- Use it for Basics cards, Quick presets, customization panel container.
- New file:
  - `seller-provider/app/(dashboard)/products/_components/ProductSection.tsx`
- Update create/edit to use this wrapper for all main sections.

### 4) Improve Form Feedback (Accuracy + Guidance)
- Add a **top-level error summary** when submit fails (WCAG-friendly):
  - `role="alert"`, `aria-live="polite"`, list of missing fields with jump links.
- Add inline “new user guidance” blocks per step (1–2 lines max).
- Ensure all icon-only actions have `aria-label` (audit stepper, tooltips, media actions already mostly covered).
- Files:
  - `new/page.tsx`, `edit/page.tsx`
  - add: `ProductFormErrorSummary.tsx`

### 5) Responsive Layout Enhancements
- Improve mobile layout:
  - Stepper scroll instead of squishing
  - Sidebar becomes stacked below content on small screens (already in grid, but we’ll ensure spacing and headings scale)
  - Add a sticky bottom action bar on mobile for Next/Back/Save (optional, but recommended for speed)
- Files:
  - `new/page.tsx`, `edit/page.tsx`, `ProductWizardHeader.tsx`

### 6) Accessibility Audit Checklist (WCAG)
We’ll validate:
- Focus visible on all interactive elements.
- No color-only meaning (active step uses border + background + text).
- Tooltips accessible via keyboard and not required to understand core tasks.
- Error messages are programmatically associated and summarized.
- Adequate contrast for text, buttons, badges.

## Verification
- Run TypeScript check and the existing test suite.
- Manual QA:
  - Keyboard-only navigation across steps
  - Mobile viewport checks
  - Submit with missing required fields (verify summary + field errors)

If you confirm this plan, I’ll implement the token cleanup + stepper improvements first (biggest visual win), then add the error summary + section wrappers for a consistently modern, WCAG-compliant UI.