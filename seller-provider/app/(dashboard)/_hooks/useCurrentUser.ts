/**
 * Hook to get current user information
 * Uses Better Auth for authentication and fetches profile from Convex
 */

"use client";

import { useAuth } from "@/lib/auth/hooks";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { USER_ROLES, DASHBOARD_ROLES, type DashboardRole } from "@/lib/auth-types";
import { useMemo } from "react";

export type CurrentUser = {
    id: string;
    name: string;
    email: string;
    role: DashboardRole;
    organizationId?: string;
};

/**
 * Get current user from auth context and Convex profile
 */
export function useCurrentUser(): CurrentUser | null {
    const { user, isAuthenticated } = useAuth();
    
    // Fetch user profile from Convex
    const userProfile = useQuery(
        api.users.getUserProfile,
        user?.id ? { userId: user.id } : "skip"
    );

    return useMemo(() => {
        if (!isAuthenticated || !user) {
            return null;
        }

        // Map Better Auth user and Convex profile to CurrentUser type
        // Map Convex role to CurrentUser role
        let role: DashboardRole = DASHBOARD_ROLES.OWNER;
        if (userProfile) {
            if (userProfile.role === USER_ROLES.ADMIN) {
                role = DASHBOARD_ROLES.ADMIN;
            } else if (userProfile.role === USER_ROLES.VENDOR) {
                role = DASHBOARD_ROLES.OWNER;
            } else {
                role = DASHBOARD_ROLES.MEMBER;
            }
        }

        return {
            id: user.id || '',
            name: userProfile?.name || user.name || user.email?.split('@')[0] || 'مستخدم',
            email: user.email || '',
            role,
            organizationId: (userProfile as any)?.organizationId,
        };
    }, [user, isAuthenticated, userProfile]);
}
