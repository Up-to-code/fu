/**
 * Hook for permission checking throughout the application
 */

import { useCallback, useMemo } from "react";
import { useCurrentUser } from "./useCurrentUser";
import {
    Permission,
    hasPermission,
    canAccessPage,
    canPerformAction,
    hasAnyPermission,
    hasAllPermissions,
    getUserPermissions,
    type Role,
} from "@/lib/permissions";

/**
 * Hook to check permissions based on current user's role
 */
export function usePermissions() {
    const user = useCurrentUser();
    const userRole = (user?.role || 'member') as Role;

    const hasPermissionForUser = useCallback(
        (permission: Permission): boolean => {
            if (!user) return false;
            return hasPermission(userRole, permission);
        },
        [user, userRole]
    );

    const canAccessPageForUser = useCallback(
        (pagePath: string): boolean => {
            if (!user) return false;
            return canAccessPage(userRole, pagePath);
        },
        [user, userRole]
    );

    const canPerformActionForUser = useCallback(
        (resource: string, action: string): boolean => {
            if (!user) return false;
            return canPerformAction(userRole, resource, action);
        },
        [user, userRole]
    );

    const hasAnyPermissionForUser = useCallback(
        (permissions: Permission[]): boolean => {
            if (!user) return false;
            return hasAnyPermission(userRole, permissions);
        },
        [user, userRole]
    );

    const hasAllPermissionsForUser = useCallback(
        (permissions: Permission[]): boolean => {
            if (!user) return false;
            return hasAllPermissions(userRole, permissions);
        },
        [user, userRole]
    );

    const getUserPermissionsForUser = useCallback((): Permission[] => {
        if (!user) return [];
        return getUserPermissions(userRole);
    }, [user, userRole]);

    return useMemo(
        () => ({
            hasPermission: hasPermissionForUser,
            canAccessPage: canAccessPageForUser,
            canPerformAction: canPerformActionForUser,
            hasAnyPermission: hasAnyPermissionForUser,
            hasAllPermissions: hasAllPermissionsForUser,
            getUserPermissions: getUserPermissionsForUser,
            userRole,
        }),
        [
            hasPermissionForUser,
            canAccessPageForUser,
            canPerformActionForUser,
            hasAnyPermissionForUser,
            hasAllPermissionsForUser,
            getUserPermissionsForUser,
            userRole,
        ]
    );
}
