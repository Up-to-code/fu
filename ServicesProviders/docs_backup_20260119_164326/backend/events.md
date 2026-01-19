# Backend Events (Recommended)

## Event List

- `booking.created`
- `booking.accepted`
- `booking.cancelled`
- `payment.intent_created`
- `payment.confirmed`
- `service.started`
- `service.milestone_updated`
- `service.completion_requested`
- `service.completed`
- `review.created`
- `payout.released`

## Event Rules

- All events must be idempotent
- Events should include correlation identifiers (bookingId, paymentIntentId)

