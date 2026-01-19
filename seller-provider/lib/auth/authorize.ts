/**
 * Authorization Utilities
 * Functions for checking authorization and permissions
 */

import { Permission, hasPermission } from "@/lib/permissions";
import type { Role } from "@/lib/permissions";

/**
 * Check if user owns a provider
 */
export function authorizeProvider(providerId: string, userId: string): boolean {
    return providerId === userId;
}

/**
 * Check if user has permission to perform an action
 */
export function authorizeAction(permission: Permission, userRole: Role): boolean {
    return hasPermission(userRole, permission);
}

/**
 * Check if user can perform action on resource
 */
export function canPerformAction(
    userRole: Role,
    resource: string,
    action: string
): boolean {
    const permissionName = `${action}_${resource}`.toUpperCase() as keyof typeof Permission;
    const permission = Permission[permissionName];
    
    if (!permission) return false;
    return hasPermission(userRole, permission);
}

/**
 * Authorization result
 */
export interface AuthorizationResult {
    authorized: boolean;
    error?: string;
}

/**
 * Authorize provider access
 */
export function authorizeProviderAccess(
    providerId: string,
    userId: string
): AuthorizationResult {
    if (!authorizeProvider(providerId, userId)) {
        return {
            authorized: false,
            error: "غير مصرح: يمكنك فقط الوصول إلى مواردك الخاصة",
        };
    }
    return { authorized: true };
}

/**
 * Authorize action with permission
 */
export function authorizeActionWithPermission(
    permission: Permission,
    userRole: Role
): AuthorizationResult {
    if (!authorizeAction(permission, userRole)) {
        return {
            authorized: false,
            error: "ليس لديك صلاحية للقيام بهذا الإجراء",
        };
    }
    return { authorized: true };
}
