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
            video: p.video,
            videos: p.videos,
            sales: p.sales,
            views: p.views,
        }));
        setProducts(mapped);
    }, [productsPage, categoriesPage, setProducts]);

    const filteredProducts = useProductStore((state) => state.getFilteredProducts());
    return filteredProducts;
}

import { Id } from "@/convex/_generated/dataModel";

/**
 * Hook to get a single product by ID
 */
export function useProduct(id: string) {
    const getProductById = useProductStore((state) => state.getProductById);
    const storeProduct = useMemo(() => getProductById(id), [getProductById, id]);
    
    // Fallback: fetch directly from Convex if not in store
    const dbProduct = useQuery(api.sellerProducts.getSellerProduct, { 
        productId: id as Id<"sellerProducts"> 
    });

    const finalProduct = useMemo(() => {
        if (storeProduct) return storeProduct;
        if (!dbProduct) return undefined;

        // Map Convex object to Product type
        return {
            id: dbProduct._id,
            name: dbProduct.name,
            nameEn: dbProduct.nameEn,
            description: dbProduct.description,
            price: dbProduct.price,
            comparePrice: dbProduct.comparePrice,
            stock: dbProduct.stock,
            status: dbProduct.status,
            categoryId: dbProduct.categoryId,
            style: dbProduct.style,
            sku: dbProduct.sku,
            image: dbProduct.image,
            images: dbProduct.images,
            video: dbProduct.video,
            videos: dbProduct.videos,
            sales: dbProduct.sales,
            views: dbProduct.views,
            variants: (dbProduct as any).variants?.map((v: any) => ({
                id: v._id,
                combination: v.combination,
                price: v.price.toString(),
                stock: v.stock.toString(),
                sku: v.sku,
                media: v.images?.map((url: string) => ({ id: url, url, type: "image" })) || 
                       (v.image ? [{ id: v.image, url: v.image, type: "image" }] : [])
            })) || [],
        };
    }, [storeProduct, dbProduct]);

    return finalProduct;
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
