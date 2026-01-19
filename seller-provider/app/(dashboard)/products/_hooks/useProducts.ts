import { useProductStore } from "./useProductStore";
import { useMemo } from "react";

/**
 * Hook to get all products with search and filters applied
 */
export function useProducts() {
    const filteredProducts = useProductStore((state) => state.getFilteredProducts());
    return filteredProducts;
}

/**
 * Hook to get a single product by ID
 */
export function useProduct(id: string) {
    const getProductById = useProductStore((state) => state.getProductById);
    return useMemo(() => getProductById(id), [getProductById, id]);
}

/**
 * Hook for search functionality
 */
export function useProductSearch() {
    const searchQuery = useProductStore((state) => state.searchQuery);
    const setSearchQuery = useProductStore((state) => state.setSearchQuery);
    
    return {
        searchQuery,
        setSearchQuery,
    };
}

/**
 * Hook for filter management
 */
export function useProductFilters() {
    const filters = useProductStore((state) => state.filters);
    const setFilters = useProductStore((state) => state.setFilters);
    const clearFilters = useProductStore((state) => state.clearFilters);
    
    return {
        filters,
        setFilters,
        clearFilters,
    };
}

/**
 * Hook for product actions (create, update, delete)
 */
export function useProductActions() {
    const addProduct = useProductStore((state) => state.addProduct);
    const updateProduct = useProductStore((state) => state.updateProduct);
    const deleteProduct = useProductStore((state) => state.deleteProduct);
    
    return {
        addProduct,
        updateProduct,
        deleteProduct,
    };
}
