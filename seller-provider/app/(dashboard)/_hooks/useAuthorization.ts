/**
 * useAuthorization Hook
 * Hook for checking authorization
 */

import { useCurrentUser } from "./useCurrentUser";
import { authorizeAction, authorizeProvider } from "@/lib/auth/authorize";
import { Permission } from "@/lib/permissions";

/**
 * Hook for checking authorization
 */
export function useAuthorization() {
    const user = useCurrentUser();

    const canPerform = (permission: Permission): boolean => {
        if (!user) return false;
        return authorizeAction(permission, user.role);
    };

    const canAccessProvider = (providerId: string): boolean => {
        if (!user) return false;
        return authorizeProvider(providerId, user.id);
    };

    return {
        canPerform,
        canAccessProvider,
        user,
    };
}
