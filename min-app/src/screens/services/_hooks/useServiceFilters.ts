// File: src/screens/services/_hooks/useServiceFilters.ts
// Purpose: Service filtering logic

import { useState, useMemo } from 'react';

export interface FilterOption {
    id: string;
    label: string;
    min?: number;
    max?: number;
}

interface ServiceFiltersState {
    type: string;
    category: string;
    priceRange: string;
    location: string;
}

interface UseServiceFiltersReturn {
    filters: ServiceFiltersState;
    setType: (type: string) => void;
    setCategory: (category: string) => void;
    setPriceRange: (priceRange: string) => void;
    setLocation: (location: string) => void;
    clearFilters: () => void;
    activeFiltersCount: number;
}

export const useServiceFilters = (
    typeFilters: FilterOption[],
    categories: FilterOption[],
    priceRanges: FilterOption[],
    locations: FilterOption[]
): UseServiceFiltersReturn => {
    const [filters, setFilters] = useState<ServiceFiltersState>({
        type: 'all',
        category: 'all',
        priceRange: 'all',
        location: 'all',
    });

    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (filters.category !== 'all') count++;
        if (filters.priceRange !== 'all') count++;
        if (filters.location !== 'all') count++;
        return count;
    }, [filters]);

    const clearFilters = () => {
        setFilters({
            type: 'all',
            category: 'all',
            priceRange: 'all',
            location: 'all',
        });
    };

    return {
        filters,
        setType: (type) => setFilters(prev => ({ ...prev, type })),
        setCategory: (category) => setFilters(prev => ({ ...prev, category })),
        setPriceRange: (priceRange) => setFilters(prev => ({ ...prev, priceRange })),
        setLocation: (location) => setFilters(prev => ({ ...prev, location })),
        clearFilters,
        activeFiltersCount,
    };
};
