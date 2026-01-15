// File: src/screens/favorites/_hooks/useFavorites.ts
// Purpose: Manage favorites (products and services)

import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { useAuth } from '../../../hooks/useAuth';

interface UseFavoritesReturn {
    toggleFavorite: (productId: string) => Promise<boolean>;
    isFavorite: (productId: string) => boolean;
    isLoading: boolean;
}

export const useFavorites = (): UseFavoritesReturn => {
    const { user } = useAuth();
    const toggleFavoriteMutation = useMutation(api.users.toggleFavorite);
    const favorites = useQuery(
        api.users.getFavorites,
        user?.id ? { userId: user.id } : 'skip'
    );

    const toggleFavorite = async (productId: string): Promise<boolean> => {
        if (!user?.id) {
            throw new Error('User not authenticated');
        }

        const result = await toggleFavoriteMutation({
            userId: user.id,
            productId,
        });

        return result.isFavorite;
    };

    const isFavorite = (productId: string): boolean => {
        if (!favorites) return false;
        return favorites.some((fav: any) => fav.productId === productId);
    };

    return {
        toggleFavorite,
        isFavorite,
        isLoading: favorites === undefined,
    };
};
