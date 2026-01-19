import { create } from "zustand";
import { services as initialServices, type Service } from "@/data/services";

export type { Service } from "@/data/services";

type ServiceFilters = {
    category?: string;
    status?: string;
    style?: string;
};

type ServiceStore = {
    services: Service[];
    searchQuery: string;
    filters: ServiceFilters;
    
    // Actions
    setServices: (services: Service[]) => void;
    addService: (service: Service) => void;
    updateService: (id: string, service: Partial<Service>) => void;
    deleteService: (id: string) => void;
    setSearchQuery: (query: string) => void;
    setFilters: (filters: Partial<ServiceFilters>) => void;
    clearFilters: () => void;
    
    // Selectors
    getServiceById: (id: string) => Service | undefined;
    getFilteredServices: () => Service[];
};

export const useServiceStore = create<ServiceStore>((set, get) => ({
    services: initialServices as Service[],
    searchQuery: "",
    filters: {},
    
    setServices: (services) => set({ services }),
    
    addService: (service) => set((state) => ({
        services: [...state.services, service],
    })),
    
    updateService: (id, updates) => set((state) => ({
        services: state.services.map((s) =>
            s.id === id ? { ...s, ...updates } : s
        ),
    })),
    
    deleteService: (id) => set((state) => ({
        services: state.services.filter((s) => s.id !== id),
    })),
    
    setSearchQuery: (query) => set({ searchQuery: query }),
    
    setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters },
    })),
    
    clearFilters: () => set({ filters: {}, searchQuery: "" }),
    
    getServiceById: (id) => {
        const state = get();
        return state.services.find((s) => s.id === id);
    },
    
    getFilteredServices: () => {
        const state = get();
        let filtered = state.services;
        
        // Apply search
        if (state.searchQuery.trim()) {
            const query = state.searchQuery.toLowerCase();
            filtered = filtered.filter(
                (s) =>
                    s.name.toLowerCase().includes(query) ||
                    s.nameEn.toLowerCase().includes(query) ||
                    s.description.toLowerCase().includes(query)
            );
        }
        
        // Apply filters
        if (state.filters.category) {
            filtered = filtered.filter((s) => s.categoryId === state.filters.category);
        }
        
        if (state.filters.status) {
            filtered = filtered.filter((s) => s.status === state.filters.status);
        }
        
        if (state.filters.style) {
            filtered = filtered.filter((s) => s.style === state.filters.style);
        }
        
        return filtered;
    },
}));
