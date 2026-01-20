
import { useEffect, useMemo, useRef } from "react";
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
    const seedAttemptedRef = useRef(false);
    const categoriesPage = useQuery(
        api.sellerCategories.listSellerCategories,
        user?.id ? { providerId: user.id, includeDeleted: false } : "skip"
    );
    const seedDefaultCategories = useMutation(api.sellerCategories.seedDefaultSellerCategories);

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

    useEffect(() => {
        if (seedAttemptedRef.current) return;
        if (!user?.id) return;
        if (!categoriesPage) return;
        if (categoriesPage.page.length > 0) return;
        
        const seed = async () => {
            try {
                seedAttemptedRef.current = true;
                await seedDefaultCategories();
            } catch (error) {
                console.error("Seeding failed:", error);
                seedAttemptedRef.current = false;
            }
        };
        
        void seed();
    }, [categoriesPage, seedDefaultCategories, user?.id]);

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
