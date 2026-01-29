
import { useEffect, useMemo } from "react";
import { useCategoryStore } from "./useCategoryStore";
import { useAuth } from "@/lib/auth/hooks";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

/**
 * Hook to get all categories with search and filters applied
 */
export function useCategories() {
    const { user } = useAuth();
    const setCategories = useCategoryStore((state) => state.setCategories);
    // Removed seeding logic
    const categoriesPage = useQuery(
        api.sellerCategories.listSellerCategories,
        user?.id ? { providerId: user.id, includeDeleted: false } : "skip"
    );
    // Removed seeding mutation

    useEffect(() => {
        if (!categoriesPage?.page) return;
        const mapped = categoriesPage.page.map((c: any) => ({
            id: c._id as string,
            name: c.name,
            nameEn: c.nameEn,
            description: c.description,
            products: c.products,
            icon: c.icon,
            image: c.image ?? c.imageUrl,
            style: c.style,
        }));
        setCategories(mapped);
    }, [categoriesPage, setCategories]);

    // Removed seller default seeding; categories should be user-created or imported explicitly

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
    const createSellerCategory = useMutation(api.sellerCategories.createSellerCategory);
    const updateSellerCategory = useMutation(api.sellerCategories.updateSellerCategory);
    const deleteSellerCategory = useMutation(api.mediaManagement.deleteSellerCategoryCascading);

    return {
        createSellerCategory,
        updateSellerCategory,
        deleteSellerCategory,
    };
}
