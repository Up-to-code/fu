// File: src/screens/categories/_hooks/useCategories.ts
// Purpose: Fetch categories list

import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';

export interface Category {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    parentId?: string;
}

interface UseCategoriesReturn {
    categories: Category[];
    isLoading: boolean;
}

export const useCategories = (): UseCategoriesReturn => {
    // TODO: Implement actual Convex query for categories
    // For now, return empty array
    const categories: Category[] = [];
    const isLoading = false;

    return {
        categories,
        isLoading,
    };
};
