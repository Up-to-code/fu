# Authentication Flow & Role Management

This document outlines the authentication architecture, user role management, and synchronization between Better Auth (Auth Identity) and Convex (User Profile).

## Overview

The Seller/Provider application enforces a strict **Vendor** role for all users. The authentication flow is designed to seamlessly onboard users via Google OAuth and immediately provision them as Vendors in the system.

## 1. Authentication (Better Auth)

The application uses **Better Auth** for identity management.
- **Provider**: Google OAuth (and Email/Password).
- **Session**: Managed via `better-auth` session tokens.
- **Identity**: Stored in the `users` table managed by Better Auth.

## 2. Profile Synchronization (Convex)

Since Better Auth manages identity but not application-specific profiles (roles, business name, etc.), we implement an **Active Synchronization** pattern.

### The `ensureUserInitialized` Mutation
Located in `convex/users.ts`.
- **Trigger**: Called automatically by the frontend (`AuthGuard`) upon successful login.
- **Logic**:
  1. Checks if a `userProfile` exists for the authenticated `userId`.
  2. **If Missing**: Creates a new profile with `role: "vendor"`.
  3. **If Exists**: Returns the existing profile.

**Key Decision**: New users entering via the Seller App are **forced** into the `"vendor"` role. This bypasses the legacy "customer" default.

## 3. Role Mapping (Platform vs. Dashboard)

The system uses two sets of roles:

### A. Platform Roles (Database)
Stored in `userProfiles.role`.
- `vendor`: The standard role for sellers.
- `customer`: Legacy role for end-users (not used in Seller App).
- `admin`: Platform administrators.

### B. Dashboard Roles (Permissions)
Used by the frontend to control UI access (`Sidebar`, `Settings`).
Mapped in `app/(dashboard)/_hooks/useCurrentUser.ts`:

| Platform Role | Dashboard Role | Permissions |
| :--- | :--- | :--- |
| `vendor` | `owner` | Full access to Organization resources. |
| `freelancer` | `owner` | Full access (Legacy compatibility). |
| `admin` | `admin` | Platform admin access. |
| `customer` | `member` | Restricted / No access. |

## 4. Frontend Implementation

### AuthGuard (`app/(dashboard)/_components/AuthGuard.tsx`)
- Wraps the entire Dashboard.
- Checks `isAuthenticated`.
- **Action**: Calls `ensureUserInitialized` if authenticated.
- **UX**: Shows a loading screen while the profile is being created/fetched to prevent "missing permission" flashes.

### DashboardSidebar
- Uses `useCurrentUser()` to get the mapped `DashboardRole`.
- Uses `usePermissions()` to show/hide menu items based on that role.

## 5. Legacy Compatibility
- The system retains support for existing "customer" users but ensures they do not accidentally access Seller features without being upgraded (though the upgrade path is currently manual or via specific mutations).
- The "Service Provider" logic in `convex/providers.ts` defaults to `vendor` for all new configurations.
