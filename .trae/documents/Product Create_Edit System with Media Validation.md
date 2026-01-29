## Scope Update per Request
Extend the plan to explicitly remove any mock data usage across product/category UI and flows, ensuring only real, user-provided data is displayed.

## Mock Data Removal
- Eliminate hardcoded Unsplash placeholders and default images/icons from UI components.
  - Replace with neutral empty states (skeleton, gray placeholders) until user uploads media.
  - Files to update: Category cards/list items, product media previews, any fallback image URLs.
- Remove legacy seeding paths that inject defaults into seller data.
  - Keep global categories initialization (system list) but do not auto-seed into seller scope.
  - Confirm `seedDefaultSellerCategories` stays deprecated and unused.
- Clean sample text and mismatched copy in uploader (e.g., size hints) to reflect new limits.

## Product Create/Edit System
- Validation  enforce 5 images (JPG/PNG ≤ 5MB) + single video (MP4/MOV ≤ 100MB) on client (Zod) and server (Convex).
- MediaManager + FileUpload enforce type/size and show previews, progress, delete; sync form properly.
- Options/Variants management and optional CSV import (template download, parsing, validation) to generate options.
- Full create and edit flows with success/error toasts and navigation.

## Server Integration
- Mutations continue enforcing ownership and validation, with no auto-populated mock fields.

## UI/UX
- Empty-state components instead of mocked media or text, responsive layout, clear labels.

## Testing
- Verify no mock data appears anywhere unless uploaded or imported by the user.
- Validate all flows: media limits, options/variants generation, CSV import, persistence.

## Notes
- No breaking schema changes; focus on removing mock placeholders and aligning copy with media limits.
- Maintain current auth protections and provider ownership checks.