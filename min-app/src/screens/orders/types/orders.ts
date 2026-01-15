// File: src/screens/orders/types/orders.ts
// Purpose: Orders screen component types

import { OrderStatus, ServiceBookingStatus, ProductOrder, ServiceBooking } from '../../../types/orders';

export type OrderType = 'product' | 'service';

export interface UnifiedOrder {
    id: string;
    type: OrderType;
    number: string;
    date: Date;
    status: OrderStatus | ServiceBookingStatus;
    statusLabel: string;
    statusColors: { color: string; bg: string };
    total: number;
    itemsCount: number;
    data: ProductOrder | ServiceBooking;
}
