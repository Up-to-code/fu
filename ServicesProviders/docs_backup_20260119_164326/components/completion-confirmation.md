# Completion Confirmation Specification

## Goal

Ensure the service is only finalized (and payout becomes eligible) after explicit confirmation.

## Flow

1. Provider marks booking as “Ready for completion”.
2. Customer either:
   - Confirms completion
   - Requests revision
   - Opens dispute

## Payout Rule

- Completion confirmed → payout eligible
- Optional dispute window delays payout release

## UI Requirements

- Clear completion CTA and revision request path
- Confirmation modal for irreversible actions

