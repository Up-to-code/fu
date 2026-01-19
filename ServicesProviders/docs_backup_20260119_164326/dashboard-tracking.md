# Dashboard & Service Tracking

## Purpose

The dashboard provides an instant overview of current work: active bookings, progress tracking, and a calendar of client appointments.

## Current UI Reference

- Dashboard page: `app/(dashboard)/dashboard/page.tsx`
- Progress widget: `app/(dashboard)/dashboard/_components/BookingGoals.tsx`
- Active work: `app/(dashboard)/dashboard/_components/ActiveOrders.tsx`
- Calendar: `app/(dashboard)/dashboard/_components/ServiceCalendar.tsx`

## Booking Data Source

Bookings are stored in a lightweight Zustand store for instant rendering and predictable performance:

- Store: `app/(dashboard)/dashboard/_hooks/useBookingStore.ts`
- Selector: `app/(dashboard)/dashboard/_hooks/useBookings.ts`

## Calendar Requirements

- Loads instantly (no blocking fetch in render)
- Clear appointment display (service name + time)
- Mobile agenda view fallback

## Progress Requirements

- Minimal and readable
- Reflects milestones and/or booking status
- No clutter; primary goal is quick understanding

## Screenshot Placeholders

- `docs/images/dashboard-main.png`: Main dashboard layout
- `docs/images/dashboard-calendar.png`: Calendar with multiple bookings
- `docs/images/dashboard-progress.png`: Progress widget

