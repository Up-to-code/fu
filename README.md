# fu (Monorepo)

fu is a multi-app codebase powered by a shared [Convex](https://convex.dev) backend. It includes:

- **seller-provider/**: Next.js dashboard for vendors (products, orders, organizations, settings).
- **ServicesProviders/**: Next.js dashboard for service providers (services, bookings, analytics).
- **min-app/**: Expo / React Native client app.
- **convex/**: Shared backend functions, schema, and auth integration.

## Key Features

- **Shared backend**: Single Convex deployment powering multiple clients.
- **Auth**: Better Auth integrated with Convex.
- **Role/permission model**: Organization and member permissions (seller-provider & backend).
- **Type-safe API**: Generated Convex API bindings used by clients.

## Repository Structure

```text
fu/
  convex/                 # Convex schema + functions (shared backend)
  seller-provider/        # Next.js vendor dashboard
  ServicesProviders/      # Next.js service-provider dashboard
  min-app/                # Expo (React Native) app
```

## Prerequisites

- Node.js (recommended: LTS)
- npm (repo uses npm + lockfiles)
- A Convex project/deployment (or create one via the Convex CLI)

## Installation

Install dependencies in the repo root (Convex tooling) and in each app you intend to run:

```bash
# backend tooling + shared dependencies
npm install

# seller dashboard
cd seller-provider && npm install

# services dashboard
cd ../ServicesProviders && npm install

# mobile app
cd ../min-app && npm install
```

## Configuration

### Convex (backend)

You configure Convex through the CLI and your Convex dashboard:

- Dashboard: <https://dashboard.convex.dev>
- Docs: <https://docs.convex.dev>

Common commands:

```bash
# from repo root
npx convex dev
npx convex codegen
```

### Observability (Sentry)

- Issues dashboard: <https://avyren.sentry.io/projects/javascript-nextjs/issues/>

### seller-provider environment variables

Create `seller-provider/.env.local` and follow:

- [seller-provider/ENV_SETUP.md](./seller-provider/ENV_SETUP.md)

At minimum, seller-provider expects:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://your-deployment.convex.site
NEXT_PUBLIC_BETTER_AUTH_BASE_URL=http://localhost:3000
```

## Usage

### Run Convex backend (root)

```bash
cd fu
npm run dev
```

### Run seller-provider (Next.js)

```bash
cd seller-provider
npm run dev
```

### Run ServicesProviders (Next.js)

```bash
cd ServicesProviders
npm run dev
```

### Run mobile app (Expo)

```bash
cd min-app
npm run start
```

## Usage Examples

### Calling a Convex function from the CLI

```bash
npx convex run myFunctions:myQuery '{"first": 1, "second": "Hello"}'
```

### Calling Convex from a React component (example)

```ts
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function Example() {
  const profile = useQuery(api.users.getUserProfile, { userId: "user_123" });
  if (profile === undefined) return <div>Loading…</div>;
  if (profile === null) return <div>Not found</div>;
  return <div>{profile.name}</div>;
}
```

## Testing

### seller-provider

```bash
cd seller-provider
npm test
```

## Contributing

1. Create a feature branch from `main`.
2. Keep changes scoped to one domain/app when possible.
3. Run checks before opening a PR:
   - `cd seller-provider && npm test` (if seller-provider changed)
   - `cd seller-provider && npm run build` (if seller-provider changed)
4. Open a PR with a clear description, screenshots (for UI changes), and testing notes.

## License

No license file is currently present in this repository. Unless stated otherwise by the repository owner, treat this codebase as **All Rights Reserved** (not licensed for redistribution). If you intend this to be open source, add a `LICENSE` file (e.g., MIT/Apache-2.0) and update this section.
