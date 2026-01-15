// File: src/screens/favorites/_hooks/useFavoriteServices.ts
// Purpose: Fetch favorite services

import { useMemo } from 'react';
import { ServiceProvider } from '../../shared';

interface UseFavoriteServicesReturn {
    favoriteServices: ServiceProvider[];
    isLoading: boolean;
}

export const useFavoriteServices = (): UseFavoriteServicesReturn => {
    // TODO: Implement service favorites when Convex schema supports it
    // For now, return empty array
    const favoriteServices: ServiceProvider[] = useMemo(() => {
        return [];
    }, []);

    return {
        favoriteServices,
        isLoading: false,
    };
};
