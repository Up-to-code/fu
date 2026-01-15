// File: src/screens/services/_hooks/useServices.ts
// Purpose: Fetch and filter services

import { useMemo, useState } from 'react';
import { ServiceProvider } from '../../shared';

interface ServiceFilters {
    type?: 'all' | 'freelancer' | 'company';
    category?: string;
    priceRange?: { min: number; max: number };
    location?: string;
    searchQuery?: string;
}

interface UseServicesReturn {
    providers: ServiceProvider[];
    filteredProviders: ServiceProvider[];
    isLoading: boolean;
    setFilters: (filters: Partial<ServiceFilters>) => void;
    clearFilters: () => void;
}

export const useServices = (initialProviders: ServiceProvider[] = []): UseServicesReturn => {
    const [providers] = useState<ServiceProvider[]>(initialProviders);
    const [filters, setFilters] = useState<ServiceFilters>({});

    const filteredProviders = useMemo(() => {
        return providers.filter(p => {
            const matchesType = !filters.type || filters.type === 'all' || p.type === filters.type;
            const matchesCategory = !filters.category || filters.category === 'all' || p.category === filters.category;
            const matchesPrice = !filters.priceRange || (p.price >= filters.priceRange.min && p.price < filters.priceRange.max);
            const matchesLocation = !filters.location || filters.location === 'all' || p.location === filters.location;
            const matchesSearch = !filters.searchQuery || p.name.includes(filters.searchQuery) || p.category.includes(filters.searchQuery);
            return matchesType && matchesCategory && matchesPrice && matchesLocation && matchesSearch;
        });
    }, [providers, filters]);

    const updateFilters = (newFilters: Partial<ServiceFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const clearFilters = () => {
        setFilters({});
    };

    return {
        providers,
        filteredProviders,
        isLoading: false,
        setFilters: updateFilters,
        clearFilters,
    };
};
