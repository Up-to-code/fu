# Banking & Wallet (Provider)

## Purpose

Providers track earnings, manage payout balances, and configure bank accounts to receive payouts.

## Current UI Reference

- Finance page: `app/(dashboard)/finance/page.tsx`
- Add bank account: `app/(dashboard)/finance/bank/page.tsx`
- Bank validation: `lib/validations.ts` (`bankAccountSchema`)

## Bank Account Setup

Required fields:

- Account holder name
- Bank name
- IBAN (Saudi format: `SA` + 22 digits)
- Swift code

## Payment Confirmation & Payout (Workflow)

Recommended payout gating sequence:

1. Booking is completed and confirmed by both sides
2. Dispute window passes (if enabled)
3. System marks payout as eligible
4. Wallet updates:\n   - Available balance\n   - Pending balance\n   - Paid-out history\n+
## Screenshot Placeholders

- `docs/images/wallet-overview.png`: Wallet overview cards
- `docs/images/bank-add.png`: Add bank account form

