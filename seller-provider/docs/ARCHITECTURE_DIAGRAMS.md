# Seller-Provider Architecture Diagrams

## CRUD Architecture

```mermaid
flowchart LR
  UI[Next.js Pages/Components] --> FORM[RHF + Zod Validation]
  FORM --> SVC[Client Service Wrappers]
  SVC --> CVX[Convex Queries/Mutations]
  CVX --> DB[(Convex Tables + Indexes)]
  CVX --> AUD[(Audit Log Table)]
  CVX --> UI
```

## Auth and Initialization Flow

```mermaid
sequenceDiagram
  participant Browser
  participant Auth as Better Auth (Session)
  participant UI as Dashboard Guard
  participant Convex as Convex Functions
  participant DB as Convex DB

  Browser->>Auth: get-session
  Browser->>UI: /dashboard
  UI->>Convex: getSellerProfile / ensureInitialized
  Convex->>DB: query userProfiles by_userId
  alt profile missing
    Convex->>DB: insert userProfiles (vendor)
  end
  alt profile not vendor
    UI->>Browser: redirect to /onboarding
  else vendor
    UI->>Browser: render dashboard
  end
```

## Index-Backed List Query Pattern

```mermaid
flowchart TB
  Q[Query args: providerId + filters + cursor] --> V[Validate filters]
  V --> IDX[Use .withIndex(...) for providerId]
  IDX --> PAGE[Apply pagination window]
  PAGE --> F[Optional secondary filter (small set only)]
  F --> R[Return page + nextCursor]
```

