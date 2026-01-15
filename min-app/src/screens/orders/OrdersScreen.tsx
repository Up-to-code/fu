// File: src/screens/orders/OrdersScreen.tsx
// Purpose: Unified orders screen showing both product orders and service bookings

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../shared';
import { Header, TabBar, OrderCard } from '../shared';
import { useOrders } from './_hooks';
import { COLORS } from '../../constants/theme';
import {
    OrderStatus,
    ORDER_STATUS_LABELS,
    ORDER_STATUS_COLORS,
    ServiceBookingStatus,
    SERVICE_STATUS_LABELS,
    ProductOrder,
    ServiceBooking
} from '../../types/orders';
import { OrderType, UnifiedOrder } from './types/orders';

const { width } = Dimensions.get('window');

// Consistent customer data
const CURRENT_USER = {
    id: 'u1',
    name: 'أحمد منصور',
    email: 'ahmed.mansour@example.com',
    phone: '+966501234567',
};

// Mock product orders
const PRODUCT_ORDERS: ProductOrder[] = [
    {
        id: 'po1',
        orderNumber: 'ORD-2024-001234',
        customer: CURRENT_USER,
        items: [
            {
                id: 'i1',
                productId: 'p1',
                name: 'صوفا مودرن',
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200',
                price: 2499,
                quantity: 1,
                total: 2499,
            },
        ],
        subtotal: 2499,
        shippingCost: 50,
        tax: 124.5,
        discount: 0,
        total: 2673.5,
        currency: 'ر.س',
        status: OrderStatus.SHIPPED,
        statusHistory: [
            { status: OrderStatus.PAID, timestamp: new Date('2024-01-15T10:05:00'), changedBy: 'system' },
            { status: OrderStatus.PROCESSING, timestamp: new Date('2024-01-15T14:00:00'), changedBy: 'admin' },
            { status: OrderStatus.SHIPPED, timestamp: new Date('2024-01-16T09:00:00'), changedBy: 'admin' },
        ],
        shippingAddress: {
            street: 'شارع الأمير سلطان، حي النرجس',
            city: 'الرياض',
            postalCode: '12345',
            country: 'السعودية',
        },
        shippingMethod: 'توصيل سريع',
        trackingNumber: 'TRK123456789',
        estimatedDelivery: new Date('2024-01-18'),
        paymentMethod: 'بطاقة ائتمان',
        paymentStatus: 'paid',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-16'),
    },
];

// Mock service bookings
const SERVICE_BOOKINGS: ServiceBooking[] = [
    {
        id: 'sb1',
        bookingNumber: 'SRV-2024-000156',
        customer: CURRENT_USER,
        provider: {
            id: 'p1',
            name: 'شركة التطوير الحديث',
            type: 'company',
            phone: '+966505555555',
            rating: 4.8,
        },
        serviceType: 'تجديد وتطوير',
        serviceCategory: 'تجديد',
        services: [
            { id: 's1', label: 'تجديد المطبخ' },
            { id: 's2', label: 'أعمال الدهان' },
        ],
        description: 'تجديد المطبخ الكامل مع دهان الجدران',
        scheduledDate: new Date('2024-01-20'),
        scheduledTime: '10:00 - 12:00',
        duration: 120,
        location: 'home',
        address: {
            street: 'شارع الأمير سلطان، حي النرجس',
            city: 'الرياض',
            country: 'السعودية',
        },
        status: ServiceBookingStatus.CONFIRMED,
        statusHistory: [
            { status: ServiceBookingStatus.PENDING, timestamp: new Date('2024-01-14T09:00:00'), changedBy: 'customer' },
            { status: ServiceBookingStatus.QUOTE_SENT, timestamp: new Date('2024-01-14T11:00:00'), changedBy: 'provider' },
            { status: ServiceBookingStatus.QUOTE_ACCEPTED, timestamp: new Date('2024-01-14T14:00:00'), changedBy: 'customer' },
            { status: ServiceBookingStatus.SCHEDULED, timestamp: new Date('2024-01-14T14:30:00'), changedBy: 'provider' },
            { status: ServiceBookingStatus.CONFIRMED, timestamp: new Date('2024-01-14T15:00:00'), changedBy: 'provider' },
        ],
        quote: {
            amount: 3500,
            validUntil: new Date('2024-01-17'),
            notes: 'يشمل المواد والعمالة',
        },
        finalPrice: 3500,
        paymentMethod: 'نقدي عند الإنجاز',
        paymentStatus: 'pending',
        createdAt: new Date('2024-01-14'),
        updatedAt: new Date('2024-01-14'),
    },
    {
        id: 'sb2',
        bookingNumber: 'SRV-2024-000157',
        customer: CURRENT_USER,
        provider: {
            id: 'p2',
            name: 'أحمد الدوسري - مصمم داخلي',
            type: 'freelancer',
            phone: '+966507777777',
            rating: 4.9,
        },
        serviceType: 'تصميم داخلي',
        serviceCategory: 'تصميم',
        services: [
            { id: 's1', label: 'تصميم غرفة المعيشة' },
        ],
        description: 'تصميم وتنسيق غرفة المعيشة',
        scheduledDate: new Date('2024-01-18'),
        scheduledTime: '14:00 - 16:00',
        duration: 120,
        location: 'home',
        address: {
            street: 'شارع الأمير سلطان، حي النرجس',
            city: 'الرياض',
            country: 'السعودية',
        },
        status: ServiceBookingStatus.IN_PROGRESS,
        statusHistory: [
            { status: ServiceBookingStatus.PENDING, timestamp: new Date('2024-01-12T10:00:00'), changedBy: 'customer' },
            { status: ServiceBookingStatus.QUOTE_SENT, timestamp: new Date('2024-01-12T15:00:00'), changedBy: 'provider' },
            { status: ServiceBookingStatus.QUOTE_ACCEPTED, timestamp: new Date('2024-01-13T09:00:00'), changedBy: 'customer' },
            { status: ServiceBookingStatus.SCHEDULED, timestamp: new Date('2024-01-13T10:00:00'), changedBy: 'provider' },
            { status: ServiceBookingStatus.CONFIRMED, timestamp: new Date('2024-01-13T10:30:00'), changedBy: 'provider' },
            { status: ServiceBookingStatus.IN_PROGRESS, timestamp: new Date('2024-01-18T14:00:00'), changedBy: 'provider', note: 'بدأ المصمم العمل' },
        ],
        quote: {
            amount: 1200,
            validUntil: new Date('2024-01-15'),
        },
        finalPrice: 1200,
        checkIn: new Date('2024-01-18T14:00:00'),
        paymentMethod: 'تحويل بنكي',
        paymentStatus: 'pending',
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-18'),
    },
];

export default function OrdersScreen() {
    const router = useRouter();
    const [filter, setFilter] = useState<'all' | 'products' | 'services'>('all');

    // Combine and sort orders
    const allOrders: UnifiedOrder[] = [
        ...PRODUCT_ORDERS.map(order => ({
            id: order.id,
            type: 'product' as OrderType,
            number: order.orderNumber,
            date: order.createdAt,
            status: order.status,
            statusLabel: ORDER_STATUS_LABELS[order.status],
            statusColors: ORDER_STATUS_COLORS[order.status],
            total: order.total,
            itemsCount: order.items.length,
            data: order,
        })),
        ...SERVICE_BOOKINGS.map(booking => ({
            id: booking.id,
            type: 'service' as OrderType,
            number: booking.bookingNumber,
            date: booking.createdAt,
            status: booking.status,
            statusLabel: SERVICE_STATUS_LABELS[booking.status],
            statusColors: {
                color: booking.status === ServiceBookingStatus.IN_PROGRESS ? '#3B82F6' :
                    booking.status === ServiceBookingStatus.CONFIRMED ? '#10B981' :
                        booking.status === ServiceBookingStatus.COMPLETED ? '#10B981' :
                            '#F59E0B',
                bg: booking.status === ServiceBookingStatus.IN_PROGRESS ? '#DBEAFE' :
                    booking.status === ServiceBookingStatus.CONFIRMED ? '#D1FAE5' :
                        booking.status === ServiceBookingStatus.COMPLETED ? '#D1FAE5' :
                            '#FEF3C7',
            },
            total: booking.finalPrice || booking.quote?.amount || 0,
            itemsCount: booking.services.length,
            data: booking,
        })),
    ].sort((a, b) => b.date.getTime() - a.date.getTime());

    const filteredOrders = allOrders.filter(order => {
        if (filter === 'all') return true;
        if (filter === 'products') return order.type === 'product';
        if (filter === 'services') return order.type === 'service';
        return true;
    });

    const handleOrderPress = (order: UnifiedOrder) => {
        if (order.type === 'product') {
            router.push(`/orders/${order.id}` as any);
        } else {
            // Navigate to service booking details (to be created)
            router.push(`/services/booking-details/${order.id}` as any);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Header title="طلباتي" showBack />
                
                <TabBar
                    tabs={[
                        { id: 'all', label: 'الكل', count: allOrders.length },
                        { id: 'products', label: 'المنتجات', count: PRODUCT_ORDERS.length },
                        { id: 'services', label: 'الخدمات', count: SERVICE_BOOKINGS.length },
                    ]}
                    activeTab={filter}
                    onTabChange={(tabId) => {
                        if (tabId === 'all' || tabId === 'products' || tabId === 'services') {
                            setFilter(tabId);
                        }
                    }}
                />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <TouchableOpacity
                                key={order.id}
                                style={styles.orderCard}
                                onPress={() => handleOrderPress(order)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.orderHeader}>
                                    <View style={styles.orderNumberSection}>
                                        <View style={styles.orderTypeRow}>
                                            <Text style={styles.orderNumber}>{order.number}</Text>
                                            <View style={styles.orderTypeBadge}>
                                                <Feather
                                                    name={order.type === 'product' ? 'package' : 'tool'}
                                                    size={12}
                                                    color={COLORS.primary}
                                                />
                                                <Text style={styles.orderTypeText}>
                                                    {order.type === 'product' ? 'منتج' : 'خدمة'}
                                                </Text>
                                            </View>
                                        </View>
                                        {order.type === 'service' && (
                                            <Text style={styles.providerName}>
                                                {(order.data as ServiceBooking).provider.name}
                                            </Text>
                                        )}
                                    </View>
                                    <View style={[styles.statusBadge, { backgroundColor: order.statusColors.bg }]}>
                                        <Text style={[styles.statusText, { color: order.statusColors.color }]}>
                                            {order.statusLabel}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.divider} />

                                <View style={styles.orderDetails}>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailValue}>
                                            {order.date.toLocaleDateString('ar-SA')}
                                        </Text>
                                        <Text style={styles.detailLabel}>التاريخ</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailValue}>{order.itemsCount}</Text>
                                        <Text style={styles.detailLabel}>
                                            {order.type === 'product' ? 'منتج' : 'خدمة'}
                                        </Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text style={[styles.detailValue, { color: COLORS.primary, fontFamily: 'Cairo_700Bold' }]}>
                                            {order.total.toFixed(2)} ر.س
                                        </Text>
                                        <Text style={styles.detailLabel}>المجموع</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <EmptyState
                            icon={filter === 'products' ? 'package' : filter === 'services' ? 'tool' : 'shopping-bag'}
                            title="لا توجد طلبات"
                            description={
                                filter === 'products' ? 'لم تقم بطلب أي منتجات بعد' :
                                    filter === 'services' ? 'لم تحجز أي خدمات بعد' :
                                        'لم تقم بأي طلبات بعد'
                            }
                        />
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    headerTitle: { fontFamily: 'Cairo_700Bold', fontSize: 18, color: '#1e293b' },
    filterContainer: {
        flexDirection: 'row-reverse',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    filterTab: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    filterTabActive: {
        backgroundColor: COLORS.primary,
    },
    filterText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 13,
        color: '#64748b',
    },
    filterTextActive: {
        color: 'white',
    },
    scrollView: { flex: 1 },
    scrollContent: { padding: 16 },
    orderCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    orderHeader: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    orderNumberSection: { flex: 1 },
    orderTypeRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    orderNumber: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: '#1e293b',
    },
    orderTypeBadge: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        backgroundColor: `${COLORS.primary}10`,
    },
    orderTypeText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 10,
        color: COLORS.primary,
    },
    providerName: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#64748b',
        textAlign: 'right',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginLeft: 12,
    },
    statusText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 11,
        textAlign: 'right',
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        marginBottom: 12,
    },
    orderDetails: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        gap: 12,
    },
    detailRow: { flex: 1 },
    detailLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 11,
        color: '#94a3b8',
        textAlign: 'right',
        marginBottom: 4,
    },
    detailValue: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 13,
        color: '#1e293b',
        textAlign: 'right',
    },
});
