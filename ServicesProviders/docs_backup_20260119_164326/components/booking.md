# Booking Component Specification

## Goal

Allow customers to create a booking for a service, select options, and schedule an appointment time.

## User Flow

1. Customer selects a service.
2. Customer selects one or more priced options.
3. Customer picks a date/time.
4. Customer confirms booking details.
5. Booking is created in `pending` status and appears on the provider dashboard calendar.

## Recommended Data Model

```txt
Booking
- id
- serviceId
- serviceName
- providerId
- customerId
- customerName
- scheduledAt (ISO string)
- selectedOptions: [{ label, price }]
- subtotal
- status: pending|confirmed|in_progress|completed|cancelled
- createdAt
```

## UI Requirements

- Clear appointment picker and timezone display
- Inline validation for missing schedule/options
- Confirmation summary before final create

## Integration Points

- Creates/links chat conversation
- Creates notification for provider
- Creates calendar entry

