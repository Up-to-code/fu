// File: src/screens/favorites/_hooks/useFavoriteProducts.ts
// Purpose: Fetch favorite products

import { useMemo } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { useAuth } from '../../../hooks/useAuth';
import { IProductCardProps } from '../../shared';

interface UseFavoriteProductsReturn {
    favoriteProducts: IProductCardProps[];
    isLoading: boolean;
}

export const useFavoriteProducts = (): UseFavoriteProductsReturn => {
    const { user } = useAuth();
    const favorites = useQuery(
        api.users.getFavorites,
        user?.id ? { userId: user.id } : 'skip'
    );

    // In a real implementation, you would fetch product details for each favorite
    // For now, we'll return an empty array and let the screen handle mock data
    const favoriteProducts: IProductCardProps[] = useMemo(() => {
        if (!favorites) return [];
        // TODO: Fetch product details for each favorite.productId
        return [];
    }, [favorites]);

    return {
        favoriteProducts,
        isLoading: favorites === undefined,
    };
};
