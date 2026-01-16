// File: src/screens/orders/_hooks/useOrders.ts
// Purpose: Fetch and manage orders (products and services)

import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useAuth } from '../../../hooks/useAuth';
import { ProductOrder, ServiceBooking } from '../../../types/orders';

export type OrderType = 'all' | 'products' | 'services';

interface UnifiedOrder {
    id: string;
    type: 'product' | 'service';
    number: string;
    date: Date;
    status: string;
    statusLabel: string;
    statusColors: {
        color: string;
        bg: string;
    };
    total: number;
    itemsCount: number;
    data: ProductOrder | ServiceBooking;
    image?: string;
}

interface UseOrdersReturn {
    orders: UnifiedOrder[];
    isLoading: boolean;
    filterOrders: (filter: OrderType) => UnifiedOrder[];
}

export const useOrders = (): UseOrdersReturn => {
    const { user } = useAuth();
    
    // TODO: Implement actual Convex queries for orders
    // For now, return empty array
    const orders: UnifiedOrder[] = [];
    const isLoading = false;

    const filterOrders = (filter: OrderType): UnifiedOrder[] => {
        if (filter === 'all') return orders;
        return orders.filter(order => order.type === filter);
    };

    return {
        orders,
        isLoading,
        filterOrders,
    };
};
