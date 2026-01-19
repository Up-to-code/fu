/**
 * Hook for permission checking throughout the application
 */

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
    const userRole = user.role as Role;

    return {
        /**
         * Check if current user has a specific permission
         */
        hasPermission: (permission: Permission): boolean => {
            return hasPermission(userRole, permission);
        },

        /**
         * Check if current user can access a page
         */
        canAccessPage: (pagePath: string): boolean => {
            return canAccessPage(userRole, pagePath);
        },

        /**
         * Check if current user can perform an action on a resource
         */
        canPerformAction: (resource: string, action: string): boolean => {
            return canPerformAction(userRole, resource, action);
        },

        /**
         * Check if current user has any of the provided permissions
         */
        hasAnyPermission: (permissions: Permission[]): boolean => {
            return hasAnyPermission(userRole, permissions);
        },

        /**
         * Check if current user has all of the provided permissions
         */
        hasAllPermissions: (permissions: Permission[]): boolean => {
            return hasAllPermissions(userRole, permissions);
        },

        /**
         * Get all permissions for current user
         */
        getUserPermissions: (): Permission[] => {
            return getUserPermissions(userRole);
        },

        /**
         * Get current user's role
         */
        userRole,
    };
}
