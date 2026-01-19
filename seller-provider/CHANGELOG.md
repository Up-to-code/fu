# Changelog - Next.js Optimization

## [Unreleased] - 2026-01-19

### Refactor - Seller Service Streamlining
- **Removed Service/Booking Features**: 
  - Systematically removed all `service_provider` functionality to focus exclusively on `furniture_seller` (Products & Orders).
  - Deleted `app/(dashboard)/services` and `app/(dashboard)/bookings` directories.
  - Removed `app/(dashboard)/select-type` and `components/auth/UserTypeSelector.tsx` as provider type is now enforced.
- **Backend Updates**:
  - Updated `convex/providers.ts` to enforce `furniture_seller` type and remove service-specific logic.
  - Simplified `getProviderConfig` and `updateProviderConfig`.
- **Type Definitions**:
  - Cleaned `types/provider.ts` to remove `ServiceType` and `service_provider` type.
- **Route Configuration**:
  - Updated `config/providers.ts` to remove service and booking routes.
  - Simplified route filtering logic in `useProviderConfig`.
- **Authentication**:
  - Removed redirection logic in `AuthGuard.tsx` that forced users to select a type.

### Refactor - Previous
- **Directory Structure**: Renamed application root from `nextjs-1` to `seller-provider`.
- **Layout Architecture**: 
  - Split `app/(dashboard)/layout.tsx` into a Server Component (Shell) and a Client Component (`AuthGuard`).
  - This separation enables potential SSR of the dashboard shell and improves separation of concerns.
  - Moved authentication and provider logic to `AuthGuard.tsx`.

### Performance
- **SSR & Loading**:
  - Added `app/(dashboard)/loading.tsx` with a skeleton UI.
  - This improves Perceived Performance by showing the dashboard structure immediately while client-side auth checks run.
- **Configuration**:
  - Enabled `compress: true` (Gzip/Brotli) in `next.config.ts`.
  - Disabled `poweredByHeader` for security and byte saving.
  - Enabled `reactStrictMode` for better development practices.
  - Added `experimental.optimizePackageImports` for `lucide-react`, `date-fns`, `@radix-ui/*`, and `recharts` to improve tree-shaking and reduce initial bundle size.
- **Code Splitting**:
  - Implemented `next/dynamic` in `app/(dashboard)/orders/page.tsx`.
  - `OrdersTable` is now lazy-loaded with a skeleton fallback, reducing the initial JavaScript payload for the Orders page.
  - `DropdownMenu` components are also dynamically imported.

### Documentation
- Created this changelog to track architectural and performance improvements.
