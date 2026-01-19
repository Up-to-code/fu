# Security Audit Notes (Seller-Provider)

## Authentication
- Dashboard access is gated by a single guard component.
- Seller profile initialization uses Convex auth identity and avoids trusting client-provided providerId.

## Authorization
- Seller CRUD mutations derive `providerId` from the authenticated Convex user.
- Mutations enforce ownership checks (document.providerId must match auth user).

## Data Protection
- Soft delete is used for seller CRUD entities (isDeleted flag) to reduce accidental loss.
- Queries exclude deleted records by default.

## Error Handling
- Convex functions throw structured error codes to avoid leaking implementation details.
- UI maps common codes to user-friendly messages.

