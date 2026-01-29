## Goals
Remove all code and logic related to the "option-to-variant media inheritance" feature, as requested. This includes removing the mini-uploader from option chips, the inheritance calculation logic, and the compact mode in the file uploader.

## Plan

### 1. Update `ProductOptions.tsx`
- Remove the `FileUpload` import and usage inside the option value badges.
- Remove the `media` property from the `OptionValue` type definition.
- Remove the `media: []` initialization in `addOptionValue`.
- Clean up the UI to only show the value text and delete button (X).

### 2. Update `VariantsList.tsx`
- Remove the `optionMedia` prop from the interface and component arguments.
- Remove the `getInheritedMedia` and `getCombinedMedia` helper functions.
- Simplify the media rendering to only use `variant.media` (the variant's own images).
- Remove any logic that merged or displayed inherited media.

### 3. Update Page Logic (`new/page.tsx` & `edit/page.tsx`)
- Remove the `optionMedia` calculation logic (the `reduce` block that mapped options to media).
- Stop passing `optionMedia` to the `<VariantsList />` component.

### 4. Clean Up `file-upload.tsx`
- Remove the `compact` prop and its associated logic (auto-upload effect, minimal UI render block).
- Revert the component to only support the standard dropzone mode.

### 5. Backend Cleanup (Optional but Recommended)
- Although the user asked to "remove non useful code," touching the schema/backend might be risky if existing data relies on it. I will primarily focus on the frontend removal. However, I will check if `addOptionMedia` mutation is used elsewhere and remove it if it's dead code. *Correction*: I will stick to the frontend removal as per the explicit UI request to avoid breaking existing data structures unless explicitly asked.

## Verification
- Build check: Ensure no type errors remain after removing props.
- Visual check:
  - Option chips should just be text tags.
  - Variants should only show media explicitly uploaded to them.
  - No "inherited" ghost images.

## Files to Modify
- `seller-provider/app/(dashboard)/products/_components/ProductOptions.tsx`
- `seller-provider/app/(dashboard)/products/_components/VariantsList.tsx`
- `seller-provider/app/(dashboard)/products/new/page.tsx`
- `seller-provider/app/(dashboard)/products/[productId]/edit/page.tsx`
- `seller-provider/components/ui/file-upload.tsx`