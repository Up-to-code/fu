# Reviews & Ratings (Stars + Comment)

## Purpose

After completion, customers rate the service and optionally provide written feedback. Ratings influence provider reputation and can inform partnership tiers.

## UX Requirements

- Prompt appears after completion confirmation
- Star rating (1–5)
- Optional comment
- Provider can respond (optional)
- Moderation/reporting flow for abusive content

## Data Model (Recommended)

```txt
Review
- id
- bookingId
- serviceId
- customerId
- providerId
- stars (1..5)
- comment (optional)
- createdAt
- status (published/hidden/reported)
```

## Integration Points

- Dashboard: show average rating and count
- Service details: show reviews list and recent highlights

## Screenshot Placeholder

- `docs/images/review-modal.png`: Rating prompt UI

