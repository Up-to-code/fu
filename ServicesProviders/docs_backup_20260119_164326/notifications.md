# Notifications (Workflow & UI)

## Purpose

Notifications keep customers and providers aware of important events throughout the service lifecycle.

## Current UI Reference

- Notifications page: `app/(dashboard)/notifications/page.tsx`
- Store: `app/(dashboard)/notifications/_hooks/useNotificationStore.ts`
- Seed data: `data/index.ts`

## Event → Notification Mapping (Recommended)

- Booking created → provider notified
- Provider accepts booking → customer notified
- Payment confirmed → provider notified
- Provider starts work → customer notified
- Milestone updated → customer notified
- Completion requested → customer notified
- Completion confirmed → provider notified
- Payout released → provider notified

## Delivery Channels (Backend)

- In-app (immediate)
- Email (optional)
- SMS (optional)

## Screenshot Placeholder

- `docs/images/notifications.png`: Notifications list

