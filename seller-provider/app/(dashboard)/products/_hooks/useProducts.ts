import { useEffect, useMemo } from "react";
import { useProductStore } from "./useProductStore";
import { useAuth } from "@/lib/auth/hooks";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

/**
 * Hook to get all products with search and filters applied
 */
export function useProducts() {
    const { user } = useAuth();
    const setProducts = useProductStore((state) => state.setProducts);
    const categoriesPage = useQuery(
        api.sellerCategories.listSellerCategories,
        user?.id ? { providerId: user.id, includeDeleted: false } : "skip"
    );
    const productsPage = useQuery(
        api.sellerProducts.listSellerProducts,
        user?.id ? { providerId: user.id, includeDeleted: false } : "skip"
    );

    useEffect(() => {
        if (!productsPage?.page) return;
        const categories = categoriesPage?.page ?? [];
        const categoryNameById = new Map<string, string>(
            categories.map((c: any) => [c._id as string, c.name as string])
        );

        const mapped = productsPage.page.map((p: any) => ({
            id: p._id as string,
            name: p.name,
            nameEn: p.nameEn,
            description: p.description,
            price: p.price,
            comparePrice: p.comparePrice,
            stock: p.stock,
            status: p.status,
            categoryId: p.categoryId as string | undefined,
            category: p.categoryId ? categoryNameById.get(p.categoryId as string) : undefined,
            style: p.style,
            sku: p.sku,
            image: p.image,
            images: p.images,
            sales: p.sales,
            views: p.views,
        }));
        setProducts(mapped);
    }, [productsPage, categoriesPage, setProducts]);

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
    const createSellerProduct = useMutation(api.sellerProducts.createSellerProduct);
    const updateSellerProduct = useMutation(api.sellerProducts.updateSellerProduct);
    const deleteSellerProduct = useMutation(api.sellerProducts.deleteSellerProduct);

    return {
        createSellerProduct,
        updateSellerProduct,
        deleteSellerProduct,
    };
}
