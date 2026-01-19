import { create } from "zustand";
import { categories as initialCategories } from "@/data/categories";

export type Category = {
    id: string;
    name: string;
    nameEn: string;
    description: string;
    products: number;
    icon: string;
    image: string;
    style: string;
};

type CategoryFilters = {
    style?: string;
};

type CategoryStore = {
    categories: Category[];
    searchQuery: string;
    filters: CategoryFilters;
    viewMode: "cards" | "list";
    
    // Actions
    setCategories: (categories: Category[]) => void;
    addCategory: (category: Category) => void;
    updateCategory: (id: string, category: Partial<Category>) => void;
    deleteCategory: (id: string) => void;
    setSearchQuery: (query: string) => void;
    setFilters: (filters: Partial<CategoryFilters>) => void;
    setViewMode: (mode: "cards" | "list") => void;
    clearFilters: () => void;
    
    // Selectors
    getCategoryById: (id: string) => Category | undefined;
    getFilteredCategories: () => Category[];
};

export const useCategoryStore = create<CategoryStore>((set, get) => ({
    categories: initialCategories as Category[],
    searchQuery: "",
    filters: {},
    viewMode: "cards",
    
    setCategories: (categories) => set({ categories }),
    
    addCategory: (category) => set((state) => ({
        categories: [...state.categories, category],
    })),
    
    updateCategory: (id, updates) => set((state) => ({
        categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...updates } : c
        ),
    })),
    
    deleteCategory: (id) => set((state) => ({
        categories: state.categories.filter((c) => c.id !== id),
    })),
    
    setSearchQuery: (query) => set({ searchQuery: query }),
    
    setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters },
    })),
    
    setViewMode: (mode) => set({ viewMode: mode }),
    
    clearFilters: () => set({ filters: {}, searchQuery: "" }),
    
    getCategoryById: (id) => {
        const state = get();
        return state.categories.find((c) => c.id === id);
    },
    
    getFilteredCategories: () => {
        const state = get();
        let filtered = state.categories;
        
        // Apply search
        if (state.searchQuery.trim()) {
            const query = state.searchQuery.toLowerCase();
            filtered = filtered.filter(
                (c) =>
                    c.name.toLowerCase().includes(query) ||
                    c.nameEn.toLowerCase().includes(query) ||
                    c.description.toLowerCase().includes(query)
            );
        }
        
        // Apply filters
        if (state.filters.style) {
            filtered = filtered.filter((c) => c.style === state.filters.style);
        }
        
        return filtered;
    },
}));
