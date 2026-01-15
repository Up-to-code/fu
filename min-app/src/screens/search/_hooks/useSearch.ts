// File: src/screens/search/_hooks/useSearch.ts
// Purpose: Search query state and results with filtering

import { useState, useMemo } from 'react';
import { IProductCardProps } from '../../shared';

export interface SearchFilters {
    category: string;
    priceRange: string;
    rating: string;
    sort: string;
}

interface UseSearchReturn {
    query: string;
    setQuery: (query: string) => void;
    results: IProductCardProps[];
    isLoading: boolean;
    performSearch: (searchQuery: string) => void;
    filters: SearchFilters;
    setCategory: (category: string) => void;
    setPriceRange: (priceRange: string) => void;
    setRating: (rating: string) => void;
    setSort: (sort: string) => void;
    clearAllFilters: () => void;
    getActiveFiltersCount: () => number;
    filteredResults: IProductCardProps[];
}

const DEFAULT_FILTERS: SearchFilters = {
    category: 'all',
    priceRange: 'all',
    rating: 'all',
    sort: 'newest',
};

export const useSearch = (initialQuery?: string): UseSearchReturn => {
    const [query, setQuery] = useState(initialQuery || '');
    const [results, setResults] = useState<IProductCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);

    const performSearch = async (searchQuery: string) => {
        setQuery(searchQuery);
        setIsLoading(true);
        try {
            // TODO: Implement actual search with Convex
            // For now, return empty results
            setResults([]);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const setCategory = (category: string) => {
        setFilters(prev => ({ ...prev, category }));
    };

    const setPriceRange = (priceRange: string) => {
        setFilters(prev => ({ ...prev, priceRange }));
    };

    const setRating = (rating: string) => {
        setFilters(prev => ({ ...prev, rating }));
    };

    const setSort = (sort: string) => {
        setFilters(prev => ({ ...prev, sort }));
    };

    const clearAllFilters = () => {
        setFilters(DEFAULT_FILTERS);
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.category !== 'all') count++;
        if (filters.priceRange !== 'all') count++;
        if (filters.rating !== 'all') count++;
        if (filters.sort !== 'newest') count++;
        return count;
    };

    // Price range mapping
    const getPriceRange = (priceRangeId: string): { min: number; max: number } => {
        switch (priceRangeId) {
            case 'under-500':
                return { min: 0, max: 500 };
            case '500-1000':
                return { min: 500, max: 1000 };
            case '1000-2000':
                return { min: 1000, max: 2000 };
            case '2000-5000':
                return { min: 2000, max: 5000 };
            case 'over-5000':
                return { min: 5000, max: Infinity };
            default:
                return { min: 0, max: Infinity };
        }
    };

    // Rating threshold mapping
    const getRatingThreshold = (ratingId: string): number => {
        switch (ratingId) {
            case '4-plus':
                return 4;
            case '3-plus':
                return 3;
            case '2-plus':
                return 2;
            case '1-plus':
                return 1;
            default:
                return 0;
        }
    };

    // Filter and sort results
    const filteredResults = useMemo(() => {
        let filtered = [...results];

        // Filter by category
        if (filters.category !== 'all') {
            // TODO: Implement category filtering when product data includes category
            // filtered = filtered.filter(p => p.category === filters.category);
        }

        // Filter by price range
        if (filters.priceRange !== 'all') {
            const { min, max } = getPriceRange(filters.priceRange);
            filtered = filtered.filter(p => {
                const price = p.price || 0;
                return price >= min && price < max;
            });
        }

        // Filter by rating
        if (filters.rating !== 'all') {
            const threshold = getRatingThreshold(filters.rating);
            filtered = filtered.filter(p => {
                const rating = p.rating || 0;
                return rating >= threshold;
            });
        }

        // Sort results
        filtered.sort((a, b) => {
            switch (filters.sort) {
                case 'price-asc':
                    return (a.price || 0) - (b.price || 0);
                case 'price-desc':
                    return (b.price || 0) - (a.price || 0);
                case 'rating-desc':
                    return (b.rating || 0) - (a.rating || 0);
                case 'bestseller':
                    // TODO: Implement bestseller sorting when product data includes sales count
                    return 0;
                case 'newest':
                default:
                    // Sort by ID or creation time if available
                    return 0;
            }
        });

        return filtered;
    }, [results, filters]);

    return {
        query,
        setQuery,
        results,
        isLoading,
        performSearch,
        filters,
        setCategory,
        setPriceRange,
        setRating,
        setSort,
        clearAllFilters,
        getActiveFiltersCount,
        filteredResults,
    };
};
