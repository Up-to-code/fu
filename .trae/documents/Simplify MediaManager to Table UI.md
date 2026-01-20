## What you want
- Edit this Media UI to be **more simple + clear** and look **like tables**.
- Target file: [MediaManager.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/products/_components/MediaManager.tsx)

## Current problem
- Media items are shown as a **drag grid** with **hover-only actions** (set main / delete / drag).
- This is harder to understand and not “table-like”, and hover actions are not great for mobile.

## Plan (Table-based Media Manager)
### 1) Replace grid view with table view
- Use existing UI table components: [table.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/components/ui/table.tsx)
- Show each media as a row:
  - Thumbnail
  - Type (image/video)
  - Main (badge)
  - Actions

### 2) Make actions always visible (clear + accessible)
- Remove hover overlay.
- Add buttons in the Actions column:
  - Move up / Move down (reorder)
  - Set as main (move to top)
  - Delete
- All buttons will have `type="button"` and `aria-label`.

### 3) Keep upload simple
- Keep `FileUpload` at the bottom (same behavior).
- Keep limits (max 5 images + 1 video).

### 4) Improve text + feedback
- Replace “اسحب لإعادة الترتيب…” with simpler hint like:
  - “استخدم الأسهم لإعادة الترتيب • أول عنصر هو الرئيسي”
- Keep counter `current/max`.

### 5) Responsive + WCAG
- Table container already scrolls horizontally on small screens.
- Ensure thumbnails have meaningful `alt`.
- Ensure focus-visible ring is clear.

## Verification
- Run TypeScript check.
- Run tests.
- Manual check: reorder, set main, delete, upload, mobile.

If you confirm, I will implement the table UI and remove the complex hover/drag grid.