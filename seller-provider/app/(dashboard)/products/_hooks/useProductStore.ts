import { create } from "zustand";

// Product type for UI rendering (backed by Convex sellerProducts)
export type Product = {
    id: string;
    name: string;
    nameEn?: string;
    description?: string;
    price: number;
    comparePrice?: number;
    stock: number;
    status: string;
    category?: string;
    categoryId?: string;
    style?: string;
    sku?: string;
    image: string;
    images: string[];
    sales?: number;
    views?: number;
};

type ProductFilters = {
    category?: string;
    status?: string;
    style?: string;
};

type ProductStore = {
    products: Product[];
    searchQuery: string;
    filters: ProductFilters;
    
    // Actions
    setProducts: (products: Product[]) => void;
    addProduct: (product: Product) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    setSearchQuery: (query: string) => void;
    setFilters: (filters: Partial<ProductFilters>) => void;
    clearFilters: () => void;
    
    // Selectors
    getProductById: (id: string) => Product | undefined;
    getFilteredProducts: () => Product[];
};

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    searchQuery: "",
    filters: {},
    
    setProducts: (products) => set({ products }),
    
    addProduct: (product) => set((state) => ({
        products: [...state.products, product],
    })),
    
    updateProduct: (id, updates) => set((state) => ({
        products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
        ),
    })),
    
    deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id),
    })),
    
    setSearchQuery: (query) => set({ searchQuery: query }),
    
    setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters },
    })),
    
    clearFilters: () => set({ filters: {}, searchQuery: "" }),
    
    getProductById: (id) => {
        const state = get();
        return state.products.find((p) => p.id === id);
    },
    
    getFilteredProducts: () => {
        const state = get();
        let filtered = state.products;
        
        // Apply search
        if (state.searchQuery.trim()) {
            const query = state.searchQuery.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    (p.nameEn ? p.nameEn.toLowerCase().includes(query) : false) ||
                    (p.sku ? p.sku.toLowerCase().includes(query) : false) ||
                    (p.description ? p.description.toLowerCase().includes(query) : false)
            );
        }
        
        // Apply filters
        if (state.filters.category) {
            filtered = filtered.filter((p) => p.categoryId === state.filters.category);
        }
        
        if (state.filters.status) {
            filtered = filtered.filter((p) => p.status === state.filters.status);
        }
        
        if (state.filters.style) {
            filtered = filtered.filter((p) => p.style === state.filters.style);
        }
        
        return filtered;
    },
}));
