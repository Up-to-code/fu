/**
 * Hook to get current user information
 * For now, returns mock user data (can be replaced with auth context later)
 */

import { mockUser } from "@/data";

export type CurrentUser = {
    id: string;
    name: string;
    email: string;
    role: 'owner' | 'admin' | 'member';
};

/**
 * Get current user
 * TODO: Replace with actual auth context/store
 */
export function useCurrentUser(): CurrentUser {
    // For now, return mock user with owner role
    // In a real app, this would get the user from auth context/store
    return {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: 'owner', // Default to owner for demo
    };
}
