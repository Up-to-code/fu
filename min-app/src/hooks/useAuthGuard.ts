// File: src/hooks/useAuthGuard.ts
// Purpose: Navigation guard hook - allows guest access (no redirects)

import { useAuth } from './useAuth';

/**
 * Hook for authentication state.
 * Guest access is enabled - users can access all screens without authentication.
 * Auth remains optional for features that require it.
 */
export function useAuthGuard() {
    const { user, isLoading } = useAuth();

    // No redirects - allow guest access to all screens
    return { user, isLoading };
}
