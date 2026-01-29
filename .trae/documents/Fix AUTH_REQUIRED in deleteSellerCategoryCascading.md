Diagnosis and remediation plan to resolve the AUTH_REQUIRED error in mediaManagement:deleteSellerCategoryCascading.

## Root Cause Hypotheses
- The mutation is executed before the Better Auth session is attached to Convex, so getAuthUser(ctx) returns null.
- Environment variables for Convex <-> Better Auth integration are misconfigured, breaking authentication bridging.
- Inconsistent user identifier property names (userId vs id vs _id) cause providerId to be undefined.

## Verification Steps (Read-only)
1. Confirm Providers composition:
   - Ensure ConvexProvider and ConvexBetterAuthProvider wrap the app [layout.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/layout.tsx) and [providers.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/providers.tsx).
2. Review server auth component:
   - Confirm getAuthUser(ctx) implementation [auth.ts](file:///Users/ahmedmansour/Documents/GitHub/fu/convex/auth.ts#L62-67).
3. Validate env vars presence:
   - NEXT_PUBLIC_CONVEX_URL and NEXT_PUBLIC_CONVEX_SITE_URL are set as per [ENV_SETUP.md](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/ENV_SETUP.md).
4. Confirm client guard:
   - AuthGuard wraps dashboard and prevents unauthenticated access [layout.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/layout.tsx#L11-L15).

## Implementation Plan
1. Canonicalize providerId extraction in server mutations:
   - Create a small helper (e.g., getProviderId(ctx)) that attempts user?.userId || user?.id || user?._id and returns a validated string. Use it across mediaManagement, sellerProducts, and sellerCategories.
2. Guard client-side delete action until auth is ready:
   - In the categories page, disable the delete action when !isAuthenticated or user.id is falsy to avoid premature calls.
3. Keep category deletion rules aligned:
   - Allow deletion of imported system categories owned by the provider (already planned by skipping the strict isSystem block).
4. Improve error surfaces:
   - Map AUTH_REQUIRED to a user-visible message suggesting login refresh if encountered.

## Testing
- Login and navigate to Categories.
- Attempt deletion without waiting for auth; confirm the button is disabled until auth is ready.
- Delete a normal category and an imported system category; both should proceed.
- Validate server receives providerId and no AUTH_REQUIRED occurs.

## Notes
- No schema changes needed beyond the existing updates.
- This plan keeps the Better Auth + Convex integration intact and adds resilience against timing and identifier mismatches.