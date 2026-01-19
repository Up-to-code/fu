# Seller-Provider Service Refactoring Plan

I will refactor the `seller-provider` application to remove all "Service Provider" (bookings/appointments) functionality and strictly enforce the "Seller" (products/orders) model.

## 1. Deletion of Non-Essential Features
**Task**: Remove directories and files related to services and bookings.
*   **Actions**:
    *   Delete `app/(dashboard)/services` (Service management).
    *   Delete `app/(dashboard)/bookings` (Appointment management).
    *   Delete `app/(dashboard)/select-type` (Provider type selection page).

## 2. Configuration & Type Cleanup
**Task**: Enforce single-purpose "Seller" configuration.
*   **Actions**:
    *   **Update `types/provider.ts`**:
        *   Remove `service_provider` from `ProviderType`.
        *   Remove `ServiceType` and `enabledServices`.
        *   Hardcode or simplify `ProviderType` to `furniture_seller` (or generic `seller`).
    *   **Update `config/providers.ts`**:
        *   Remove route definitions for `services` and `bookings`.
        *   Simplify `getNavigationRoutes` to remove `service_provider` logic.

## 3. Authentication & Routing Logic Update
**Task**: Remove "Provider Type" selection checks.
*   **Actions**:
    *   **Update `app/(dashboard)/_components/AuthGuard.tsx`**:
        *   Remove the check for `hasProviderType`.
        *   Remove redirection to `/select-type`.
        *   Ensure the app defaults to the seller dashboard.

## 4. Context & Hook Optimization
**Task**: Clean up provider context and hooks.
*   **Actions**:
    *   **Update `app/(dashboard)/_context/ProviderContext.tsx`**: Remove logic related to `enabledServices` or dynamic provider types if present.
    *   **Update `app/(dashboard)/_hooks/useProviderConfig.ts`**: Simplify route generation since dynamic filtering is no longer needed (or strictly for permissions).

## 5. Verification
*   **Actions**:
    *   Run `npm run build` to ensure no broken imports from deleted files.
    *   Run `npm run lint`.
    *   Verify `app/(dashboard)/layout.tsx` and `Sidebar` render correctly without service routes.

## 6. Documentation
*   **Actions**:
    *   Update `CHANGELOG.md` with the removal of service-provider features.

---
**Request for Confirmation**:
Shall I proceed with permanently deleting the Services and Bookings modules and enforcing the Seller-only architecture?