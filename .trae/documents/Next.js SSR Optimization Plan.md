# Next.js Application Optimization Plan

I have analyzed the `nextjs-1` application and identified key areas for SSR performance improvement, specifically focusing on the configuration, provider architecture, and dashboard rendering strategy.

## 1. Application Renaming
**Task**: Rename `nextjs-1` folder to `seller-provider` to align with the domain.

## 2. Configuration Optimization
**Task**: Enhance `next.config.ts` for production performance.
*   **Actions**:
    *   Enable `compress: true` (Gzip/Brotli).
    *   Disable `poweredByHeader` for security and byte saving.
    *   Add `experimental.optimizePackageImports` for `lucide-react`, `@radix-ui/react-*`, and `date-fns` to reduce bundle size.
    *   Enable `reactStrictMode` for better dev-time checks.

## 3. SSR & Loading Strategy (Structural Optimization)
**Task**: Improve Perceived Performance and First Contentful Paint (FCP).
*   **Current State**: The `(dashboard)` layout is a Client Component that blocks rendering until authentication is verified.
*   **Optimization**:
    *   **Implement `loading.tsx`**: Create a server-rendered Loading Skeleton for the dashboard. This allows the browser to show the layout structure (sidebar/header placeholders) *immediately* while the client bundle loads and authentication checks run.
    *   **Refactor `app/(dashboard)/layout.tsx`**:
        *   Split the monolithic Client Layout into a **Server Layout** (for structure) and a **Client Auth Guard** (for logic).
        *   This ensures the "Shell" can potentially be rendered on the server (or at least statically generated) in the future.

## 4. Provider Architecture
**Task**: Optimize Context Providers to prevent unnecessary re-renders.
*   **Current State**: `Providers` wraps the entire app. `ProviderContext` is used in the dashboard.
*   **Optimization**:
    *   Verify `app/providers.tsx` only contains truly global providers (`ThemeProvider`, `ConvexProvider`).
    *   Ensure `ProviderProvider` (in dashboard) is only mounted where necessary (already scoped to dashboard, which is good).

## 5. Component Optimization (Code Splitting)
**Task**: Reduce initial bundle size for dashboard pages.
*   **Target**: `app/(dashboard)/orders/page.tsx`.
*   **Actions**:
    *   Implement `next/dynamic` for heavy components like `OrdersTable` and `DropdownMenu` to split them from the main bundle.
    *   This speeds up the initial navigation to the Orders page.

## 6. Documentation
*   **Deliverable**: A `CHANGELOG.md` detailing all architectural changes and configuration updates.

## Verification Plan
1.  **Build Check**: Run `npm run build` to ensure no regression.
2.  **Lint Check**: Run `npm run lint`.
3.  **Manual Verification**: Check if the Loading Skeleton appears on refresh.

---
**Request for Confirmation**:
Shall I proceed with renaming the folder to `seller-provider` and applying these optimizations?