/**
 * Auth Context Provider
 * Provides authentication state and methods throughout the app
 */

"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useAuth, useAuthActions, type AuthSession, type AuthUser } from "./hooks";

interface AuthContextValue {
  session: AuthSession | null | undefined;
  user: AuthUser | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: unknown;
  actions: ReturnType<typeof useAuthActions>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { session, user, isAuthenticated, isLoading, error } = useAuth();
  const actions = useAuthActions();

  const value: AuthContextValue = {
    session,
    user,
    isAuthenticated,
    isLoading,
    error,
    actions,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access auth context
 */
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
