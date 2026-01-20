## Focused Update per Request
Add image uploader directly to option values and complete the end-to-end flow that associates images with options and variants.

## Option-Level Media
- ProductOptions.tsx
  - For each option value chip, add a small image button to open a mini uploader (JPEG/PNG ≤ 5MB).
  - Store value-level media (e.g., a representative icon/photo) in local state and persist later.
  - Visual indicator when a value has media (thumbnail on the chip).

## Mapping to Variants
- When generating variants, auto-initialize variant media with the union of media from selected option values (e.g., Color:red image → attached to any variant that includes Color:red).
- VariantsList.tsx allows adding/removing additional variant-specific images beyond those inherited from options.

## Persistence
- Data model approach without breaking existing productMedia:
  - Reuse productMedia with a new optional field `optionKey` and `optionValue` for option-level media, and `variantId` for variant-level media.
  - Indices: by_product (existing), plus new by_variant, and filter for option media.
- Mutations:
  - addOptionMedia(productId, optionKey, optionValue, url,...): creates productMedia records tagged to option value for later variant generation.
  - listOptionMedia(productId): returns option-tagged media grouped by key/value.
  - During variant creation/upsert, copy references (not duplicate files) by linking the same media records to variantId when applicable.

## UI Wire-up
- ProductOptions.tsx: embed mini-uploader per value; calls addOptionMedia.
- VariantsList.tsx: shows inherited images first; user can add/remove and reorder; enforce per-variant limits.

## Validation  Limits
- Option value media: 1–2 images per value to keep UI light.
- Variant media: up to 4 images; all images verified.

## Security  Uploader
- Same type/size checks as global uploader.
- VirusTotal hash verification after upload.

## Testing
- Create product → add options and attach images to values → generate variants → confirm inherited images appear → add variant-specific images → submit and reload → all data persists and displays correctly.

## Deliverables
- Updated ProductOptions and VariantsList with option-level uploader and mapping to variants.
- New Convex mutations to store option media and link to variants.
- Documentation update to describe option/variant media relationship and limits.