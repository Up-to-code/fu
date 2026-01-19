import { useCategoryStore } from "./useCategoryStore";
import { useMemo } from "react";

/**
 * Hook to get all categories with search and filters applied
 */
export function useCategories() {
    const filteredCategories = useCategoryStore((state) => state.getFilteredCategories());
    return filteredCategories;
}

/**
 * Hook to get a single category by ID
 */
export function useCategory(id: string) {
    const getCategoryById = useCategoryStore((state) => state.getCategoryById);
    return useMemo(() => getCategoryById(id), [getCategoryById, id]);
}

/**
 * Hook for search functionality
 */
export function useCategorySearch() {
    const searchQuery = useCategoryStore((state) => state.searchQuery);
    const setSearchQuery = useCategoryStore((state) => state.setSearchQuery);
    
    return {
        searchQuery,
        setSearchQuery,
    };
}

/**
 * Hook for filter management
 */
export function useCategoryFilters() {
    const filters = useCategoryStore((state) => state.filters);
    const setFilters = useCategoryStore((state) => state.setFilters);
    const clearFilters = useCategoryStore((state) => state.clearFilters);
    
    return {
        filters,
        setFilters,
        clearFilters,
    };
}

/**
 * Hook for view mode
 */
export function useCategoryViewMode() {
    const viewMode = useCategoryStore((state) => state.viewMode);
    const setViewMode = useCategoryStore((state) => state.setViewMode);
    
    return {
        viewMode,
        setViewMode,
    };
}

/**
 * Hook for category actions (create, update, delete)
 */
export function useCategoryActions() {
    const addCategory = useCategoryStore((state) => state.addCategory);
    const updateCategory = useCategoryStore((state) => state.updateCategory);
    const deleteCategory = useCategoryStore((state) => state.deleteCategory);
    
    return {
        addCategory,
        updateCategory,
        deleteCategory,
    };
}
