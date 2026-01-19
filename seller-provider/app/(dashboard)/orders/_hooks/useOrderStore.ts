import { create } from "zustand";
import type { Order as MockOrder } from "@/data/orders";

export type Order = MockOrder;

type OrderFilters = {
    status?: string;
};

type OrderStore = {
    orders: Order[];
    searchQuery: string;
    filters: OrderFilters;
    
    // Actions
    setOrders: (orders: Order[]) => void;
    updateOrder: (id: string, order: Partial<Order>) => void;
    setSearchQuery: (query: string) => void;
    setFilters: (filters: Partial<OrderFilters>) => void;
    clearFilters: () => void;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
    orders: [],
    searchQuery: "",
    filters: {},
    
    setOrders: (orders) => set({ orders }),
    
    updateOrder: (id, updates) => set((state) => ({
        orders: state.orders.map((o) =>
            o.id === id ? { ...o, ...updates } : o
        ),
    })),
    
    setSearchQuery: (query) => set({ searchQuery: query }),
    
    setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters },
    })),
    
    clearFilters: () => set({ filters: {}, searchQuery: "" }),
}));

// Pure selector function
export function getFilteredOrders(orders: Order[], searchQuery: string, filters: OrderFilters): Order[] {
    let filtered = orders;
    
    // Apply search
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
            (o) =>
                o.id.toLowerCase().includes(query) ||
                o.customer.toLowerCase().includes(query) ||
                o.email.toLowerCase().includes(query) ||
                o.phone.toLowerCase().includes(query)
        );
    }
    
    // Apply filters
    if (filters.status) {
        filtered = filtered.filter((o) => o.status === filters.status);
    }
    
    return filtered;
}
