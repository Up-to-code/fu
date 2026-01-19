import { useEffect, useMemo } from "react";
import { useOrderStore, getFilteredOrders } from "./useOrderStore";
import { useAuth } from "@/lib/auth/hooks";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

/**
 * Hook to get all orders with search and filters applied
 */
export function useOrders() {
    const { user } = useAuth();
    const setOrders = useOrderStore((state) => state.setOrders);
    const ordersPage = useQuery(
        api.sellerOrders.listSellerOrders,
        user?.id ? { providerId: user.id, includeDeleted: false } : "skip"
    );

    useEffect(() => {
        if (!ordersPage?.page) return;
        const mapped = ordersPage.page.map((o: any) => ({
            id: o.orderNumber as string,
            customer: o.customerName,
            email: o.email,
            phone: o.phone,
            items: o.items,
            total: o.total,
            subtotal: o.subtotal,
            shipping: o.shipping,
            status: o.status,
            date: o.date,
            address: o.address,
            paymentMethod: o.paymentMethod,
            shippingCompany: o.shippingCompany,
            trackingNumber: o.trackingNumber,
            shippingNotes: o.shippingNotes,
            cancellationReason: o.cancellationReason,
        }));
        setOrders(mapped);
    }, [ordersPage, setOrders]);

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
    const updateSellerOrder = useMutation(api.sellerOrders.updateSellerOrder);
    const deleteSellerOrder = useMutation(api.sellerOrders.deleteSellerOrder);

    return {
        updateSellerOrder,
        deleteSellerOrder,
    };
}
