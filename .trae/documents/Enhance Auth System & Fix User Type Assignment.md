I have completed a deep scan of the codebase and identified the dual-role system (Platform vs. Organization) as the key area for synchronization. I will now execute the plan to enforce the "Vendor" platform role, which correctly maps to the "Owner" organization role, fixing the sidebar and access issues.

### Plan

1.  **Backend: Enforce "Vendor" Role (Convex)**
    *   **Create `ensureUserInitialized` Mutation**:
        *   **File**: `convex/users.ts`
        *   **Logic**: Check if `userProfiles` has an entry. If not, create one with **`role: "vendor"`**. This forces new Google OAuth users in the Seller App to be Vendors.
    *   **Update `updateUserProfile`**:
        *   **File**: `convex/users.ts`
        *   **Logic**: Default `role` to `"vendor"` if not specified (for the Seller App context).
    *   **Cleanup**: Remove any legacy checks for "service_provider" in `convex/providers.ts`.

2.  **Frontend: Active Synchronization (AuthGuard)**
    *   **Update `AuthGuard.tsx`**:
        *   **File**: `seller-provider/app/(dashboard)/_components/AuthGuard.tsx`
        *   **Action**: Automatically call `ensureUserInitialized` when a user is authenticated.
        *   **Benefit**: This bridges the gap between Better Auth (session) and Convex (profile), ensuring no user is left with a missing role.

3.  **Role Mapping & Sidebar Fix**
    *   **Verify `useCurrentUser.ts`**:
        *   **File**: `seller-provider/app/(dashboard)/_hooks/useCurrentUser.ts`
        *   **Logic**: Confirm that `role: "vendor"` correctly maps to `role: "owner"`. This grants full dashboard access and fixes the sidebar.
    *   **Update `DashboardSidebar.tsx`**:
        *   **File**: `seller-provider/components/layout/DashboardSidebar.tsx`
        *   **Action**: Ensure it gracefully handles the loading state while `ensureUserInitialized` runs.

4.  **Codebase Cleanup & Hardening**
    *   **Refactor**: Define `UserRole` types (`"vendor" | "customer" | ...`) in a shared file to replace fragile string literals.
    *   **Remove Dead Code**: Scan and delete unused imports and legacy "customer" logic in the Seller App.

5.  **Documentation**
    *   **Create `docs/AUTHENTICATION_FLOW.md`**: Document the "Google Login -> Vendor -> Owner" flow.

6.  **Verification**
    *   Run `npm run build` and `npm run lint`.
    *   Verify that the "Google Login" flow creates a Vendor profile.
