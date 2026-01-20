## Goals
1.  **Fix "Upload Failure" / UI Broken in `ProductOptions`**: The current implementation tries to embed a full `FileUpload` dropzone into a small badge, which breaks layout and usability.
2.  **Ensure Data Flow**: Wire up the option images so they actually flow into `VariantsList` (inheritance).
3.  **Robust Uploader**: Ensure the uploader supports required formats/sizes and gives feedback.

## Plan

### 1. Create a Minimal Uploader Trigger
- Modify `components/ui/file-upload.tsx` or create a wrapper.
- Add a `minimal` prop or mode to `FileUpload` that renders a simple "Upload" icon button (or accepts a custom trigger via children/slot).
- When clicked, it opens the file dialog.
- Shows progress as a small ring or toast, not a big bar.

### 2. Update `ProductOptions.tsx`
- Replace the current cumbersome `FileUpload` embedding.
- Use the new minimal trigger inside the Option Value badge/chip.
- **UX**:
  - Show a small "image" icon on the value badge.
  - Clicking it triggers upload.
  - Once uploaded, show the thumbnail on the badge.
  - Hovering the thumbnail shows a "remove" (X) button.
  - Limit: 1 image per value (swatch).

### 3. Wire Option Media to Variants
- In `new/page.tsx` and `edit/page.tsx`:
  - Calculate `optionMedia` map from the `options` state.
  - Pass `optionMedia` to `<VariantsList />`.
- **Logic**:
  - Transform `Option[]` -> `Record<optionName, Record<valueName, Media[]>>`.
  - Pass this to `VariantsList`.

### 4. Verify `VariantsList.tsx`
- Ensure it correctly merges `optionMedia` with variant-specific media (already implemented in previous step, just needs the prop).
- Check deduplication logic (already there).

### 5. Testing
- Manual verification checklist:
  - Add option "Color", value "Red".
  - Click small upload icon on "Red".
  - Select valid PNG.
  - Verify upload success and thumbnail appearance.
  - Check "Variants" section: All variants with "Red" should now show the red image.
  - Verify layout is clean (no broken dropzones).

## Files to Modify
- `seller-provider/components/ui/file-upload.tsx` (Add minimal mode support)
- `seller-provider/app/(dashboard)/products/_components/ProductOptions.tsx` (Fix UI)
- `seller-provider/app/(dashboard)/products/new/page.tsx` (Pass data)
- `seller-provider/app/(dashboard)/products/[productId]/edit/page.tsx` (Pass data)