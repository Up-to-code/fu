/**
 * Better Auth Client
 * Initialize and export Better Auth client instance
 * Following official Convex + Better Auth guide
 */

import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";

// Get base URL - prefer explicit env var, fallback to window origin or localhost
const getBaseURL = () => {
  if (process.env.NEXT_PUBLIC_BETTER_AUTH_BASE_URL) {
    return process.env.NEXT_PUBLIC_BETTER_AUTH_BASE_URL;
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  basePath: "/api/auth",
  plugins: [convexClient()],
});

export type AuthClient = typeof authClient;
