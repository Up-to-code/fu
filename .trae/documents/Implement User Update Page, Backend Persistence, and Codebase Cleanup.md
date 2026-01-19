I will implement a dedicated, robust user update feature and clean up legacy code while maintaining backward compatibility.

## Update Page
- Create `/app/(dashboard)/account/update/page.tsx` as a client page with React Hook Form and Zod.
- Form fields: name, businessName, phone, email (read-only if managed by auth), language, profile image.
- Validation: Zod schema per field (e.g., phone regex, name length, language enum).
- UI behavior: clear Save button, disabled state while submitting, loading spinners, accessible labels.
- Reference current UI style and components to keep consistency, e.g. [ProfileSection.tsx](file:///Users/ahmedmansour/Documents/GitHub/fu/seller-provider/app/(dashboard)/settings/_components/ProfileSection.tsx).

## Update Logic
- Use Convex mutation `api.users.updateUserProfile` for persistence: see [users.ts:updateUserProfile](file:///Users/ahmedmansour/Documents/GitHub/fu/convex/users.ts#L200-L241).
- State: preload with `api.users.getUserProfile`, update local state optimistically, and revalidate after mutation.
- Error handling: try/catch on mutation, show success/error toasts (sonner), and display inline field errors from Zod.
- Loading states: disable submit, show spinner, avoid double-submission.

## Codebase Cleanup
- Remove unused legacy UI props in settings components where applicable, streamline to a single form source of truth.
- Organize modules:
  - `/app/(dashboard)/account/update` for page
  - `/app/(dashboard)/account/_components` for form sections (Profile, Organization)
  - `/app/(dashboard)/account/_hooks` for data hooks (fetch/update)
- Remove commented placeholder blocks and unused imports; standardize coding style across components.
- Keep Clear comments documenting key flows (form submit, mutation calls, error paths).

## Security & Data Protection
- Email remains read-only if owned by Better Auth; no plaintext tokens stored.
- All data fetches/mutations continue via Convex with session cookies; no client-side secrets.
- Validate and sanitize inputs before sending to backend.

## Tests
- Unit tests: Zod schemas, utility functions to map profile ↔ form values.
- Integration tests: mock Convex mutation calls for success and failure; assert UI feedback and state.
- Backward compatibility: ensure existing settings still render; redirect or link to the new update page.
- Performance: verify no unnecessary re-renders; debounce text inputs where helpful.

## Deliverables
- New update page with validated form and loading states.
- Wiring to backend persistence and notification handling.
- Cleanup of legacy code and module organization.
- Tests for validation and update flows, plus short documentation of the implementation.
