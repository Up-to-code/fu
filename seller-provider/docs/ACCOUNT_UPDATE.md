# Account Update Feature

This page enables users to update editable profile data securely with validation, loading states, and error handling.

## Path
- `/dashboard/account/update`

## Data Flow
- Load existing profile via `api.users.getUserProfile`.
- Submit updates via `api.users.updateUserProfile`.
- Show success/error toasts and keep UI responsive during processing.

## Validation
- Implemented with Zod and react-hook-form to ensure correct inputs.

## Tests
- Validation schema unit tests with Vitest in `__tests__/account-update.test.ts`.

## Maintenance
- Keep email read-only if managed by Better Auth.
- Extend form fields as needed; ensure backend schema alignment.
