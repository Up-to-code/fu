# Standardize Home Screen Component Styling

## Current Issues Identified

### Horizontal Spacing Inconsistencies:

- **HomeHeader**: Uses `paddingHorizontal: 20`
- **AIDesignBanner**: Uses `marginHorizontal: 20`
- **QuickActionsSection**: Uses `paddingHorizontal: 20` in scrollContent
- **ProductListSection**: Uses `paddingHorizontal: 20` in header and contentContainerStyle
- **CategoriesSection**: Uses `paddingHorizontal: 20`
- **ServicesSection**: Uses `paddingHorizontal: 20` in header and contentContainerStyle

### Vertical Spacing Inconsistencies:

- **HomeHeader**: `paddingBottom: 12`
- **AIDesignBanner**: `marginVertical: 16` (top and bottom)
- **QuickActionsSection**: `paddingTop: 16`, `marginBottom: 24`
- **ProductListSection**: `marginBottom: 24`
- **CategoriesSection**: `marginBottom: 32`
- **ServicesSection**: `marginBottom: 32`

### Height Inconsistencies:

- **AIDesignBanner**: `height: 150px` (needs to be changed to `100px`)
- **ProductListSection listContainer**: `height: 240px` (mobile) / `280px` (tablet)
- **ServicesSection listContainer**: `height: 140px` (too small, should be consistent with ProductListSection)
- **ServicesSection avatar**: `height: 80px` (matches CategoriesSection, correct)
- **QuickActionsSection iconContainer**: `height: 64px` (correct)
- **CategoriesSection categoryImage**: `height: 80px` (correct)

## Standardization Rules

1. **Horizontal Spacing**: All components should use `paddingHorizontal: 20` in their container styles for consistency
2. **Vertical Spacing**: Standardize to `marginBottom: 24` for all sections (except header which has its own padding)
3. **Height Consistency**: 

- List containers should have consistent heights (240px for mobile, 280px for tablet)
- ServicesSection listContainer should match ProductListSection height

4. **Remove redundant spacing**: Eliminate double spacing where components have both paddingTop and the previous component has marginBottom

## Files to Update

### 1. [AIDesignBanner.styles.ts](min-app/src/screens/home/_components/StyleSheets/AIDesignBanner.styles.ts)

- Change `marginHorizontal: 20` to `paddingHorizontal: 20` in container
- Change `marginVertical: 16` to `marginBottom: 24` (remove top margin, standardize bottom)
- **Change height**: Change `BANNER_HEIGHT` from `150px` to `100px`
- **Ensure rounded styling**: Verify `borderRadius: 16` is applied and all child elements respect the rounded corners

### 2. [QuickActionsSection.styles.ts](min-app/src/screens/home/_components/StyleSheets/QuickActionsSection.styles.ts)

- Remove `paddingTop: 16` (AIDesignBanner already has bottom margin)
- Change `marginBottom: 24` to ensure consistency (already correct)
- Ensure `paddingHorizontal: 20` in scrollContent is consistent
- Keep iconContainer `height: 64px` (already correct)

### 3. [ProductListSection.styles.ts](min-app/src/screens/home/_components/StyleSheets/ProductListSection.styles.ts)

- Ensure `marginBottom: 24` (already correct)
- Verify `paddingHorizontal: 20` consistency in header and contentContainerStyle
- Keep listContainer `height: 240px` (mobile) / `280px` (tablet) as reference

### 4. [CategoriesSection.styles.ts](min-app/src/screens/home/_components/StyleSheets/CategoriesSection.styles.ts)

- Change `marginBottom: 32` to `marginBottom: 24` for consistency
- Ensure `paddingHorizontal: 20` is used (already correct)
- Keep categoryImage `height: 80px` (already correct)

### 5. [ServicesSection.styles.ts](min-app/src/screens/home/_components/StyleSheets/ServicesSection.styles.ts)

- Change `marginBottom: 32` to `marginBottom: 24` for consistency
- Ensure `paddingHorizontal: 20` consistency in header and contentContainerStyle
- **Fix height**: Change listContainer `height: 140px` to `height: 240px` (mobile) / `280px` (tablet) to match ProductListSection
- Keep avatar `height: 80px` (already correct)

### 6. [HomeScreen.styles.ts](min-app/src/screens/home/StyleSheets/HomeScreen.styles.ts)

- Verify `paddingBottom: 20` in scrollContent is appropriate for final spacing

## Implementation Details

- All horizontal spacing: `20px` padding
- All vertical spacing between sections: `24px` margin bottom
- Banner height: `100px` (changed from 150px)
- List container heights: `240px` (mobile) / `280px` (tablet) for consistency
- Rounded styling: Ensure all banner elements have proper `borderRadius` and respect rounded corners
- Remove any redundant top padding/margins that create double spacing
- Maintain existing component functionality while standardizing spacing and height values