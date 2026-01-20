## Scope
- Apply changes only inside `seller-provider/` (and its docs/configs).
- Do not change `ServicesProviders/`, `min-app/`, or repo-root `convex/` unless required for seller-provider compatibility.

## Current Findings (Seller-Provider)
- **Convex API imports are inconsistent**: `@/convex/*` is configured in [tsconfig.json](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/tsconfig.json#L21-L25) but some code uses brittle relative imports into repo-root convex, plus `any` casts in [ProviderContext.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/_context/ProviderContext.tsx#L39-L45).
- **Provider model mismatch**: UI treats `entityType` as user-editable, but backend provider config appears not persisted/used consistently; UI calls `updateEntityType` in [ProviderContext.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/_context/ProviderContext.tsx#L73-L86).
- **Rerender/perf risk**: ProviderContext mirrors query data into local state and uses `JSON.stringify` equality checks (costly + fragile) [ProviderContext.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/_context/ProviderContext.tsx#L46-L60).
- **Code quality issues**: imports after declarations and `route: any` in [DashboardSidebar.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/components/layout/DashboardSidebar.tsx#L27-L48) and unused icon imports.
- **Best-practice gap**: auth route logs request paths and status for every call [route.ts](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/api/auth/[...all]/route.ts#L17-L46) (should be gated/removed for production).
- **Docs naming mismatch**: ENV docs refer to `nextjs-1/` folder but project is `seller-provider/` [ENV_SETUP.md](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/ENV_SETUP.md#L7-L21).

## Implementation Plan
### 1) Architecture & Structure
- Standardize Convex imports to `@/convex/_generated/api` and remove relative imports into `../convex/*`.
- Decide the provider/entity model approach and implement consistently:
  - Option A (recommended): make `entityType` a real persisted field in the seller-provider domain and wire the UI + mutations without `any`.
  - Option B: remove `entityType` mutability from UI and simplify provider routing logic accordingly.
- Decouple route-specific hooks from reusable components:
  - Keep `app/` for page composition.
  - Move reusable domain hooks to `lib/` or `services/` where appropriate.

### 2) Code Quality
- Remove unused imports and fix import ordering:
  - Clean [DashboardSidebar.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/components/layout/DashboardSidebar.tsx#L6-L48) (icons, imports-after-code).
- Replace `any` with proper types in hotspots:
  - Provider context API calls + `ProviderType` unused import [ProviderContext.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/_context/ProviderContext.tsx#L8-L13).
  - Sidebar route prop: replace `route: any` with a typed `NavigationRoute` and type the icon component.
  - Tighten default generics in error helpers to avoid `any` leakage.
- Tighten TypeScript checks in `seller-provider/tsconfig.json`:
  - Enable `noUnusedLocals` / `noUnusedParameters` and fix resulting issues.

### 3) Performance
- Refactor ProviderContext:
  - Stop mirroring query results into local state.
  - Remove `JSON.stringify` comparison.
  - Use `useMemo` for the context value and `useCallback` for actions.
- Memoize derived route lists in sidebar (`useMemo`) and avoid recreating arrays per render.

### 4) Best Practices
- Reduce production logging and improve error handling:
  - Gate or remove `console.log` in auth API route [route.ts](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/api/auth/[...all]/route.ts#L17-L46).
- Centralize environment validation:
  - Create `lib/env.ts` that validates required env vars (client + server), and update `app/providers.tsx` + auth server wiring to use it.
- Security follow-up (important): a GitHub token was posted in chat previously—rotate/revoke it and ensure it is not present in any git remote URLs or committed config.

### 5) Testing & Documentation
- Update docs:
  - Fix `ENV_SETUP.md` paths and add a seller-provider “Quickstart” section.
- Add/extend tests in `seller-provider/__tests__/` for:
  - ProviderContext behavior (loading/undefined/null),
  - sidebar route filtering based on permissions,
  - env validation behavior.
- Add minimal comments only where logic is non-obvious (per your requirement), especially around provider model decisions and auth/env validation.

## Verification (after changes)
- Run TypeScript check for seller-provider.
- Run seller-provider tests.
- Smoke-test key routes: login, dashboard, organizations, products, orders.

If you confirm this plan, I will implement it in a new branch (e.g. `chore/seller-provider-audit`), run the checks, and then merge into `main`.