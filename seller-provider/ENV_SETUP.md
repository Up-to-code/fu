# Environment Variables Setup

This document explains the required environment variables for the Next.js application.

## Required Environment Variables

Create a `.env.local` file in the `nextjs-1/` directory with the following variables:

### Convex Configuration

```env
# Convex deployment URL for client-side queries/mutations
# Get this from your Convex dashboard: https://dashboard.convex.dev
# Format: https://your-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Convex site URL for Better Auth HTTP endpoint
# This is used for authentication API routes
# Format: https://your-deployment.convex.site
NEXT_PUBLIC_CONVEX_SITE_URL=https://your-deployment.convex.site
```

### Better Auth Configuration

```env
# Base URL of your Next.js application
# For local development: http://localhost:3000
# For production: https://your-domain.com
NEXT_PUBLIC_BETTER_AUTH_BASE_URL=http://localhost:3000
```

### Google OAuth (Optional)

If you're using Google sign-in, you need to set these in your Convex environment (not in `.env.local`):

```bash
# Set in Convex environment using:
npx convex env set GOOGLE_CLIENT_ID=your-google-client-id
npx convex env set GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**How to Get Google OAuth Credentials:**

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure the OAuth consent screen if prompted
6. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Name: Your app name
   - Authorized redirect URIs:
     - Development: `http://localhost:3000/api/auth/callback/google`
     - Production: `https://your-deployment.convex.site/api/auth/callback/google`
7. Copy the Client ID and Client Secret
8. Set them in Convex environment using the commands above

**Important Notes:**
- These environment variables must be set in Convex, not in Next.js `.env.local`
- The redirect URI must match exactly: `/api/auth/callback/google`
- For production, use your Convex site URL (ending in `.convex.site`)

## How to Get Convex URLs

1. Go to your Convex dashboard: https://dashboard.convex.dev
2. Select your project
3. Go to Settings → Deployment
4. Copy the deployment URL (for `NEXT_PUBLIC_CONVEX_URL`)
5. The site URL (for `NEXT_PUBLIC_CONVEX_SITE_URL`) is typically the same base URL but with `.convex.site` instead of `.convex.cloud`

## Example `.env.local` File

```env
# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=https://happy-animal-123.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://happy-animal-123.convex.site

# Better Auth Configuration
NEXT_PUBLIC_BETTER_AUTH_BASE_URL=http://localhost:3000

# Note: Google OAuth credentials (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET)
# should be set in Convex environment, not here. Use:
# npx convex env set GOOGLE_CLIENT_ID=your-client-id
# npx convex env set GOOGLE_CLIENT_SECRET=your-client-secret
```

## Important Notes

- **`NEXT_PUBLIC_CONVEX_URL`**: Used by the Convex React client for queries and mutations
- **`NEXT_PUBLIC_CONVEX_SITE_URL`**: Used by the Better Auth API route handler to proxy requests to Convex HTTP endpoint
- All `NEXT_PUBLIC_*` variables are exposed to the browser, so never put secrets in them
- The `.env.local` file should be in your `.gitignore` and never committed to version control
