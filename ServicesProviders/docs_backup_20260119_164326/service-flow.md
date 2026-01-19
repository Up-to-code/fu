# End-to-End Service Flow (Booking → Completion)

## Overview

This document describes the complete service lifecycle from a customer booking a service to final completion confirmation and payout. It covers both user-facing behavior and backend workflow expectations.

## Actors

- Customer (end user)
- Provider (service provider in the dashboard)
- Support/Admin (disputes, refunds, moderation)
- Payment Processor (card/bank transfer, webhooks)
- Notification System (in-app, email, SMS)

## Step-by-Step Flow

### 1) Booking (Customer)

1. Customer selects a service.
2. Customer selects one or more **priced options** (e.g., “Room design”, “Home design”).
3. Customer chooses a schedule date/time (appointment).
4. Customer confirms booking details.
5. System creates a `Booking` in `pending` state and generates a calendar entry for the provider.

### 2) Chat Consultation (Customer ↔ Provider)

1. Booking automatically opens a conversation thread.
2. Customer shares requirements, images, attachments, and clarifications.
3. Provider confirms feasibility, timeline, and deliverables.
4. Provider can request changes before accepting the booking.

### 3) Payment Confirmation (Dual Confirmation)

1. Customer initiates payment.
2. Payment processor returns a payment intent result and emits webhooks.
3. Customer sees “Payment Confirmed” UI.
4. Provider sees “Payment Confirmed” badge and confirms acceptance to start work (second confirmation).

### 4) Service Provision (Provider)

1. Provider starts the service and updates progress milestones.
2. System tracks time-based milestones (SLA reminders, due dates).
3. Customer receives notifications on milestone updates.

### 5) Completion Confirmation (Customer ↔ Provider)

1. Provider marks service as “Ready for completion”.
2. Customer reviews and confirms completion OR requests revisions.
3. On completion confirmation, payout becomes eligible (after dispute window if applicable).

## Flow Diagram (Sequence)

```mermaid
sequenceDiagram
  autonumber
  actor Customer
  participant App as App (Frontend)
  participant Provider as Provider Dashboard
  participant Chat as Chat Service
  participant Pay as Payment Processor
  participant Notify as Notification Service

  Customer->>App: Select service + options + schedule
  App->>Provider: Create booking (pending)
  App->>Chat: Create conversation thread
  App->>Notify: Notify provider (new booking)

  Customer->>Chat: Consultation messages + attachments
  Provider->>Chat: Replies + requirements

  Customer->>App: Start payment
  App->>Pay: Create/confirm payment intent
  Pay-->>App: Payment status update (webhook)
  App->>Notify: Notify provider (payment confirmed)

  Provider->>Provider: Confirm acceptance (dual confirmation)
  Provider->>Notify: Notify customer (work started)

  Provider->>Provider: Update milestones/progress
  Provider->>Notify: Notify customer (progress update)

  Provider->>Provider: Mark ready for completion
  Provider->>Notify: Notify customer (completion requested)
  Customer->>App: Confirm completion / request revision
  App->>Pay: Trigger payout eligibility
```

## Booking Lifecycle (State Machine)

```mermaid
stateDiagram-v2
  [*] --> pending: booking created
  pending --> confirmed: provider accepts
  pending --> cancelled: customer cancels
  confirmed --> payment_pending: awaiting payment
  payment_pending --> customer_paid: payment processor confirms
  customer_paid --> in_progress: provider confirms start
  in_progress --> review: provider requests completion
  review --> in_progress: customer requests revision
  review --> completed: customer confirms completion
  completed --> paid_out: payout released
  review --> dispute: customer disputes
  dispute --> refunded: admin resolves refund
  dispute --> paid_out: admin resolves payout
```

## Key UX Touchpoints (Current UI Reference)

- Provider dashboard calendar: `app/(dashboard)/dashboard/_components/ServiceCalendar.tsx`
- Chat: `app/(dashboard)/messages/page.tsx`
- Finance/Wallet: `app/(dashboard)/finance/page.tsx`
- Notifications: `app/(dashboard)/notifications/*`

## Screenshot Placeholders

- `docs/images/flow-dashboard.png`: Dashboard showing active bookings + calendar
- `docs/images/flow-chat.png`: Chat consultation view
- `docs/images/flow-finance.png`: Wallet + payout status

