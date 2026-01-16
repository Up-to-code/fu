// File: src/hooks/useUserProfile.ts
// Purpose: Custom hook to fetch user profile with role from Convex

import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const useUserProfile = (userId: string | null | undefined) => {
    const profile = useQuery(
        api.users.getUserProfile,
        userId ? { userId } : 'skip'
    );

    // Default to customer role if profile is not loaded or doesn't exist
    const defaultRole = 'customer';

    return {
        profile,
        role: profile?.role || defaultRole,
        name: profile?.name,
        phone: profile?.phone,
        isLoading: profile === undefined && userId !== null && userId !== undefined,
    };
};
