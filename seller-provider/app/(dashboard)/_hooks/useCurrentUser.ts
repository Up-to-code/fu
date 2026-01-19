/**
 * Hook to get current user information
 * Uses Better Auth for authentication and fetches profile from Convex
 */

"use client";

import { useAuth } from "@/lib/auth/hooks";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export type CurrentUser = {
    id: string;
    name: string;
    email: string;
    role: 'owner' | 'admin' | 'member';
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

    if (!isAuthenticated || !user) {
        return null;
    }

    // Map Better Auth user and Convex profile to CurrentUser type
    // Map Convex role to CurrentUser role
    let role: 'owner' | 'admin' | 'member' = 'owner';
    if (userProfile) {
        if (userProfile.role === 'admin') {
            role = 'admin';
        } else if (userProfile.role === 'freelancer' || userProfile.role === 'vendor') {
            role = 'owner';
        } else {
            role = 'member';
        }
    }

    return {
        id: user.id || '',
        name: userProfile?.name || user.name || user.email?.split('@')[0] || 'مستخدم',
        email: user.email || '',
        role,
    };
}
