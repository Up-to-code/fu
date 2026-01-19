# Technical Architecture (Scalable Implementation Notes)

## Modules (Suggested Boundaries)

- Services (catalog + pricing options)
- Bookings (schedule + lifecycle)
- Chat (conversations + messages + attachments)
- Payments (payment intents + webhooks + escrow/payout)
- Notifications (event routing + delivery)
- Reviews (stars + comments + moderation)

## State Ownership

- Client stores (Zustand) are used for fast UI and demo data.
- Backend remains the source of truth for:\n  - booking/payment state\n  - message history\n  - payout eligibility\n
## Event-Driven Workflow (Backend)

Recommended events:

- `booking.created`
- `booking.accepted`
- `payment.confirmed`
- `service.started`
- `service.milestone_updated`
- `service.completion_requested`
- `service.completed`
- `payout.released`

Each event can trigger:

- Notification fan-out
- Audit logging
- Analytics counters

## Time-Based Tracking

- SLA timers (provider acceptance window)
- Reminder notifications (before appointment)
- Overdue detection and escalation

## Current UI Reference

- Dashboard: `app/(dashboard)/dashboard/page.tsx`
- Chat: `app/(dashboard)/messages/page.tsx`
- Finance: `app/(dashboard)/finance/page.tsx`

