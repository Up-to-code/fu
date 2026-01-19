/**
 * Auth Hooks
 * Custom hooks for authentication using Better Auth client
 * Following official Convex + Better Auth guide
 */

"use client";

import { authClient } from "./client";

// Types for better type safety
export interface AuthUser {
  id: string;
  name?: string;
  email: string;
  image?: string;
  emailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthSession {
  user: AuthUser;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
  };
}

/**
 * Hook to get current session - uses Better Auth's reactive useSession
 * This provides instant reactivity when session changes
 */
export function useAuth() {
  // Better Auth client provides a reactive useSession hook
  const { data: session, isPending: isLoading, error } = authClient.useSession();

  return {
    session,
    user: session?.user as AuthUser | undefined,
    isAuthenticated: !!session?.user,
    isLoading,
    error,
  };
}

/**
 * Hook to get current user
 */
export function useAuthUser() {
  const { user, isAuthenticated, isLoading, error } = useAuth();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
  };
}

/**
 * Hook to get auth client methods
 * Only includes methods that are configured in the Better Auth setup
 */
export function useAuthActions() {
  return {
    signIn: authClient.signIn,
    signUp: authClient.signUp,
    signOut: authClient.signOut,
    // Note: forgotPassword, resetPassword, verifyEmail, resendVerificationEmail
    // are only available if email verification is enabled in auth config
    // Note: socialSignIn is only available if social providers are configured
    getSession: authClient.getSession,
  };
}
