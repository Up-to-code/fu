// File: src/types/orders.ts
// Purpose: Comprehensive order and service booking type definitions

// ============= PRODUCT ORDERS =============

export enum OrderStatus {
    // Pre-fulfillment
    PENDING_PAYMENT = 'pending_payment',
    PAYMENT_FAILED = 'payment_failed',
    PAID = 'paid',

    // Fulfillment
    PROCESSING = 'processing',
    READY_TO_SHIP = 'ready_to_ship',
    SHIPPED = 'shipped',
    OUT_FOR_DELIVERY = 'out_for_delivery',
    DELIVERED = 'delivered',

    // Issues
    DELIVERY_FAILED = 'delivery_failed',
    RETURNED = 'returned',
    REFUNDED = 'refunded',

    // Cancellation
    CANCELLED_BY_CUSTOMER = 'cancelled_by_customer',
    CANCELLED_BY_SELLER = 'cancelled_by_seller',
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    [OrderStatus.PENDING_PAYMENT]: 'في انتظار الدفع',
    [OrderStatus.PAYMENT_FAILED]: 'فشل الدفع',
    [OrderStatus.PAID]: 'تم الدفع',
    [OrderStatus.PROCESSING]: 'قيد المعالجة',
    [OrderStatus.READY_TO_SHIP]: 'جاهز للشحن',
    [OrderStatus.SHIPPED]: 'تم الشحن',
    [OrderStatus.OUT_FOR_DELIVERY]: 'في الطريق',
    [OrderStatus.DELIVERED]: 'تم التوصيل',
    [OrderStatus.DELIVERY_FAILED]: 'فشل التوصيل',
    [OrderStatus.RETURNED]: 'تم الإرجاع',
    [OrderStatus.REFUNDED]: 'تم الاسترداد',
    [OrderStatus.CANCELLED_BY_CUSTOMER]: 'ملغي من العميل',
    [OrderStatus.CANCELLED_BY_SELLER]: 'ملغي من البائع',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, { color: string; bg: string }> = {
    [OrderStatus.PENDING_PAYMENT]: { color: '#F59E0B', bg: '#FEF3C7' },
    [OrderStatus.PAYMENT_FAILED]: { color: '#EF4444', bg: '#FEE2E2' },
    [OrderStatus.PAID]: { color: '#10B981', bg: '#D1FAE5' },
    [OrderStatus.PROCESSING]: { color: '#3B82F6', bg: '#DBEAFE' },
    [OrderStatus.READY_TO_SHIP]: { color: '#8B5CF6', bg: '#EDE9FE' },
    [OrderStatus.SHIPPED]: { color: '#3B82F6', bg: '#DBEAFE' },
    [OrderStatus.OUT_FOR_DELIVERY]: { color: '#06B6D4', bg: '#CFFAFE' },
    [OrderStatus.DELIVERED]: { color: '#10B981', bg: '#D1FAE5' },
    [OrderStatus.DELIVERY_FAILED]: { color: '#EF4444', bg: '#FEE2E2' },
    [OrderStatus.RETURNED]: { color: '#F59E0B', bg: '#FEF3C7' },
    [OrderStatus.REFUNDED]: { color: '#6B7280', bg: '#F3F4F6' },
    [OrderStatus.CANCELLED_BY_CUSTOMER]: { color: '#6B7280', bg: '#F3F4F6' },
    [OrderStatus.CANCELLED_BY_SELLER]: { color: '#EF4444', bg: '#FEE2E2' },
};

export interface StatusChange {
    status: OrderStatus;
    timestamp: Date;
    note?: string;
    changedBy?: string;
}

export interface Address {
    street: string;
    city: string;
    state?: string;
    postalCode?: string;
    country: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export interface OrderItem {
    id: string;
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    total: number;
}

export interface ProductOrder {
    id: string;
    orderNumber: string;

    customer: Customer;

    items: OrderItem[];
    subtotal: number;
    shippingCost: number;
    tax: number;
    discount: number;
    total: number;
    currency: string;

    status: OrderStatus;
    statusHistory: StatusChange[];

    shippingAddress: Address;
    shippingMethod: string;
    trackingNumber?: string;
    estimatedDelivery?: Date;
    actualDelivery?: Date;

    paymentMethod: string;
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    transactionId?: string;

    createdAt: Date;
    updatedAt: Date;
    notes?: string;
    cancellationReason?: string;
    refundReason?: string;
}

// ============= SERVICE BOOKINGS =============

export enum ServiceBookingStatus {
    PENDING = 'pending',
    QUOTE_SENT = 'quote_sent',
    QUOTE_ACCEPTED = 'quote_accepted',
    QUOTE_REJECTED = 'quote_rejected',
    SCHEDULED = 'scheduled',
    CONFIRMED = 'confirmed',
    IN_PROGRESS = 'in_progress',
    PAUSED = 'paused',
    COMPLETED = 'completed',
    VERIFIED = 'verified',
    PAYMENT_PENDING = 'payment_pending',
    PAID = 'paid',
    REJECTED_BY_PROVIDER = 'rejected_by_provider',
    CANCELLED_BY_CUSTOMER = 'cancelled_by_customer',
    CANCELLED_BY_PROVIDER = 'cancelled_by_provider',
    RESCHEDULED = 'rescheduled',
    DISPUTED = 'disputed',
    RESOLVED = 'resolved',
}

export const SERVICE_STATUS_LABELS: Record<ServiceBookingStatus, string> = {
    [ServiceBookingStatus.PENDING]: 'قيد الانتظار',
    [ServiceBookingStatus.QUOTE_SENT]: 'تم إرسال العرض',
    [ServiceBookingStatus.QUOTE_ACCEPTED]: 'تم قبول العرض',
    [ServiceBookingStatus.QUOTE_REJECTED]: 'تم رفض العرض',
    [ServiceBookingStatus.SCHEDULED]: 'تم الجدولة',
    [ServiceBookingStatus.CONFIRMED]: 'مؤكد',
    [ServiceBookingStatus.IN_PROGRESS]: 'قيد التنفيذ',
    [ServiceBookingStatus.PAUSED]: 'متوقف مؤقتاً',
    [ServiceBookingStatus.COMPLETED]: 'مكتمل',
    [ServiceBookingStatus.VERIFIED]: 'تم التحقق',
    [ServiceBookingStatus.PAYMENT_PENDING]: 'في انتظار الدفع',
    [ServiceBookingStatus.PAID]: 'تم الدفع',
    [ServiceBookingStatus.REJECTED_BY_PROVIDER]: 'مرفوض من المزود',
    [ServiceBookingStatus.CANCELLED_BY_CUSTOMER]: 'ملغي من العميل',
    [ServiceBookingStatus.CANCELLED_BY_PROVIDER]: 'ملغي من المزود',
    [ServiceBookingStatus.RESCHEDULED]: 'تم إعادة الجدولة',
    [ServiceBookingStatus.DISPUTED]: 'نزاع',
    [ServiceBookingStatus.RESOLVED]: 'تم الحل',
};

export interface ServiceProvider {
    id: string;
    name: string;
    type: 'freelancer' | 'company';
    phone: string;
    rating: number;
    avatar?: string;
}

export interface SelectedService {
    id: string;
    label: string;
    price?: number;
}

export interface ServiceBooking {
    id: string;
    bookingNumber: string;

    customer: Customer;
    provider: ServiceProvider;

    serviceType: string;
    serviceCategory: string;
    services: SelectedService[];
    description: string;

    scheduledDate: Date;
    scheduledTime: string;
    duration: number;
    location: 'home' | 'provider_location' | 'remote';
    address?: Address;

    status: ServiceBookingStatus;
    statusHistory: Array<{
        status: ServiceBookingStatus;
        timestamp: Date;
        note?: string;
        changedBy: 'customer' | 'provider' | 'system';
    }>;

    quote?: {
        amount: number;
        validUntil: Date;
        notes?: string;
    };
    finalPrice?: number;

    checkIn?: Date;
    checkOut?: Date;
    actualDuration?: number;

    completionNotes?: string;
    customerRating?: number;
    customerReview?: string;

    rejectionReason?: string;
    cancellationReason?: string;

    paymentMethod: string;
    paymentStatus: 'pending' | 'paid' | 'refunded';
    paymentDue?: Date;

    createdAt: Date;
    updatedAt: Date;
}
