/**
 * Better Auth Server Utilities
 * Server-side utilities for authenticated SSR, server functions, and route handlers
 * Following official Convex + Better Auth guide
 */

import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";
import { getPublicEnv } from "@/lib/env";

export const {
  handler,
  preloadAuthQuery,
  isAuthenticated,
  getToken,
  fetchAuthQuery,
  fetchAuthMutation,
  fetchAuthAction,
} = convexBetterAuthNextJs({
  convexUrl: getPublicEnv().NEXT_PUBLIC_CONVEX_URL,
  convexSiteUrl: getPublicEnv().NEXT_PUBLIC_CONVEX_SITE_URL,
});
