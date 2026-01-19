# Migration Guide: Deprecated Seller Types

## Summary
Seller-provider no longer supports legacy `customer` / `freelancer` role paths in the dashboard UI. The seller dashboard treats the authenticated user as a seller (vendor) and gates all CRUD operations accordingly.

## What Changed
- Dashboard access is gated by `AuthGuard` and `getSellerProfile`/`ensureSellerInitialized`.
- Provider config no longer derives `entityType` from legacy roles.
- Seller CRUD mutations derive provider identity from Convex auth, not from client input.

## Migration Rules
- `freelancer` → unsupported in seller-provider UI. Users must be upgraded to `vendor` to access seller CRUD.
- `customer` → unsupported in seller-provider UI. Users must be upgraded to `vendor` (via onboarding flow).
- `vendor` / `admin` → supported.

## Operational Steps
1) Run Convex schema update + codegen:
   - `npx convex codegen`
2) Deploy Convex functions:
   - `npx convex deploy`
3) Verify seller dashboard flows:
   - Authenticated user with vendor profile lands on `/dashboard`
   - Non-vendor profiles are redirected to `/onboarding`

## Rollback
- Re-enable old role-based provider mapping in `convex/providers.ts`.
- Re-introduce dashboard upgrade dialog flow if needed.

