// File: src/screens/product/_hooks/useProductDetails.ts
// Purpose: Fetch product details

import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';

interface ProductDetails {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    reviews: number;
    stock: number;
    images: string[];
    colors?: Array<{ id: number; name: string; code: string }>;
    sizes?: Array<{ id: number; name: string; available: boolean }>;
    features?: Array<{ icon: string; text: string; color: string }>;
}

interface UseProductDetailsReturn {
    product: ProductDetails | null;
    isLoading: boolean;
}

export const useProductDetails = (productId: string): UseProductDetailsReturn => {
    // TODO: Implement actual Convex query for product details
    // For now, return null
    const product: ProductDetails | null = null;
    const isLoading = false;

    return {
        product,
        isLoading,
    };
};
