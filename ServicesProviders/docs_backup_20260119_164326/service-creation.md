# Service Creation (Provider)

## Purpose

Providers create services with a clear title, rich description, and custom priced options. The service also defines a minimum (and optional maximum) price range.

## Where It Lives (Current UI Reference)

- New Service: `app/(dashboard)/services/new/page.tsx`
- Edit Service: `app/(dashboard)/services/[serviceId]/edit/page.tsx`
- Options component: `app/(dashboard)/services/_components/CustomPricedOptions.tsx`
- Validation: `lib/validations.ts`

## Step-by-Step (User Guide)

1. Go to **My Services** → “Add Service”.
2. Enter **Service Title** (required).
3. Write the **Description** using the rich text editor.
4. Set **Minimum price** (required) and optional **Maximum price**.
5. Add **Custom Options** (unlimited): each option has a name and its own price.
6. (Optional) Add media (images/videos).
7. (Optional) Choose category/style and publishing status.
8. Save.

## Example (Pattern)

- Service Title: “Interior Design”
- Description: “Expert interior design services for your space”
- Custom Options:
  - “Room design” ($200)
  - “Home design” ($500)
  - “Office design” ($300)

## Validation Rules (Client-Side)

- Title: required
- Description: required
- Min price: required, > 0
- Max price: optional, but if provided must be ≥ min price
- Options: at least 1 option; each option must have:
  - label: required
  - price: required, > 0

## Data Model (Service)

The service stores pricing as:

- `minPrice`: numeric (primary displayed price)
- `maxPrice`: numeric | undefined
- `options`: array of `{ label, price }`

## Screenshot Placeholders

- `docs/images/service-create-main.png`: Title + description
- `docs/images/service-create-range.png`: Price range inputs
- `docs/images/service-create-options.png`: Custom options list

