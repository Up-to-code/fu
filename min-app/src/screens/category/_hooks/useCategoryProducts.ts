// File: src/screens/category/_hooks/useCategoryProducts.ts
// Purpose: Fetch products by category

import { useMemo } from 'react';
import { IProductCardProps } from '../../shared';

interface UseCategoryProductsReturn {
    products: IProductCardProps[];
    isLoading: boolean;
}

export const useCategoryProducts = (categoryId: string): UseCategoryProductsReturn => {
    // TODO: Implement actual Convex query for category products
    // For now, return empty array
    const products: IProductCardProps[] = useMemo(() => {
        return [];
    }, [categoryId]);

    return {
        products,
        isLoading: false,
    };
};
