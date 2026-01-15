// File: src/screens/product/_hooks/useSimilarProducts.ts
// Purpose: Fetch similar products

import { useMemo } from 'react';
import { IProductCardProps } from '../../shared';

interface UseSimilarProductsReturn {
    similarProducts: IProductCardProps[];
    isLoading: boolean;
}

export const useSimilarProducts = (productId: string, categoryId?: string): UseSimilarProductsReturn => {
    // TODO: Implement actual Convex query for similar products
    // For now, return empty array
    const similarProducts: IProductCardProps[] = useMemo(() => {
        return [];
    }, [productId, categoryId]);

    return {
        similarProducts,
        isLoading: false,
    };
};
