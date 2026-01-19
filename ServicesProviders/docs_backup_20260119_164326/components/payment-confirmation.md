# Payment Confirmation (Dual Confirmation) Specification

## Goal

Implement a dual-confirmation flow so both customer payment and provider acceptance are explicitly captured before work starts.

## States

- `payment_pending`
- `customer_confirmed` (processor confirms paid + customer sees confirmation)
- `provider_confirmed` (provider accepts and starts)
- `refunded` / `chargeback` (exception)

## Backend Triggers

- Payment processor webhook updates payment status (idempotent)
- Provider action triggers `service.started`

## UI Requirements

- Customer view: payment result + receipt reference
- Provider view: “Payment confirmed” badge + “Start work” CTA

