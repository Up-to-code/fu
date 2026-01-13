import { useOrderStore, getFilteredOrders } from "./useOrderStore";
import { useMemo } from "react";

/**
 * Hook to get all orders with search and filters applied
 */
export function useOrders() {
    const orders = useOrderStore((state) => state.orders);
    const searchQuery = useOrderStore((state) => state.searchQuery);
    const filters = useOrderStore((state) => state.filters);
    
    const filteredOrders = useMemo(() => {
        return getFilteredOrders(orders, searchQuery, filters);
    }, [orders, searchQuery, filters]);
    
    return filteredOrders;
}

/**
 * Hook to get a single order by ID
 */
export function useOrder(id: string) {
    const order = useOrderStore((state) => {
        return state.orders.find((o) => o.id === id);
    });
    return order;
}

/**
 * Hook for search functionality
 */
export function useOrderSearch() {
    const searchQuery = useOrderStore((state) => state.searchQuery);
    const setSearchQuery = useOrderStore((state) => state.setSearchQuery);
    
    return {
        searchQuery,
        setSearchQuery,
    };
}

/**
 * Hook for filter management
 */
export function useOrderFilters() {
    const filters = useOrderStore((state) => state.filters);
    const setFilters = useOrderStore((state) => state.setFilters);
    const clearFilters = useOrderStore((state) => state.clearFilters);
    
    return {
        filters,
        setFilters,
        clearFilters,
    };
}

/**
 * Hook for order actions
 */
export function useOrderActions() {
    const updateOrder = useOrderStore((state) => state.updateOrder);
    
    return {
        updateOrder,
    };
}
