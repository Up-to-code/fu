"use client";

import { usePermissions } from "@/app/(dashboard)/_hooks/usePermissions";
import { Permission } from "@/lib/permissions";
import type { ReactNode } from "react";

interface PermissionGuardProps {
    permission?: Permission;
    permissions?: Permission[];
    requireAll?: boolean;
    children: ReactNode;
    fallback?: ReactNode;
}

/**
 * Component to conditionally render content based on user permissions
 * 
 * @example
 * <PermissionGuard permission={Permission.CREATE_PRODUCTS}>
 *   <Button>Add Product</Button>
 * </PermissionGuard>
 * 
 * @example
 * <PermissionGuard permissions={[Permission.EDIT_PRODUCTS, Permission.DELETE_PRODUCTS]} requireAll={false}>
 *   <ActionsMenu />
 * </PermissionGuard>
 */
export function PermissionGuard({
    permission,
    permissions,
    requireAll = false,
    children,
    fallback = null,
}: PermissionGuardProps) {
    const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

    let hasAccess = false;

    if (permission) {
        hasAccess = hasPermission(permission);
    } else if (permissions && permissions.length > 0) {
        hasAccess = requireAll
            ? hasAllPermissions(permissions)
            : hasAnyPermission(permissions);
    } else {
        // If no permission specified, render children
        hasAccess = true;
    }

    return hasAccess ? <>{children}</> : <>{fallback}</>;
}
