// File: src/screens/orders/OrderDetailsScreen.tsx
// Purpose: Enhanced order details with customer info, timeline, and tracking

import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../shared';
import { useOrderDetails } from './_hooks';
import { COLORS } from '../../constants/theme';
import { OrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, ProductOrder } from '../../types/orders';

const { width } = Dimensions.get('window');

// Mock order data - in real app, fetch by ID
const MOCK_ORDER: ProductOrder = {
    id: '1',
    orderNumber: 'ORD-2024-001234',
    customer: {
        id: 'c1',
        name: 'أحمد منصور',
        email: 'ahmed@example.com',
        phone: '+966501234567',
    },
    items: [
        {
            id: 'i1',
            productId: 'p1',
            name: 'صوفا مودرن مريحة',
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
    currency: 'SAR',
    status: OrderStatus.SHIPPED,
    statusHistory: [
        { status: OrderStatus.PENDING_PAYMENT, timestamp: new Date('2024-01-15T10:00:00'), note: 'تم إنشاء الطلب', changedBy: 'system' },
        { status: OrderStatus.PAID, timestamp: new Date('2024-01-15T10:05:00'), note: 'تم الدفع بنجاح', changedBy: 'system' },
        { status: OrderStatus.PROCESSING, timestamp: new Date('2024-01-15T14:00:00'), note: 'جاري تجهيز الطلب', changedBy: 'admin' },
        { status: OrderStatus.SHIPPED, timestamp: new Date('2024-01-16T09:00:00'), note: 'تم الشحن عبر شركة الشحن السريع', changedBy: 'admin' },
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
    transactionId: 'TXN123456',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16'),
};

export default function OrderDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { order: hookOrder, isLoading } = useOrderDetails(id as string, 'product');
    const order = hookOrder || MOCK_ORDER; // Fallback to mock if hook returns null

    const statusColors = ORDER_STATUS_COLORS[order.status];
    const statusLabel = ORDER_STATUS_LABELS[order.status];

    const handleCallCustomer = () => {
        Linking.openURL(`tel:${order.customer.phone}`);
    };

    const handleEmailCustomer = () => {
        Linking.openURL(`mailto:${order.customer.email}`);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Header title={order.orderNumber} showBack />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Current Status */}
                    <View style={[styles.statusCard, { backgroundColor: statusColors.bg }]}>
                        <View style={styles.statusHeader}>
                            <Text style={[styles.currentStatusLabel, { color: statusColors.color }]}>
                                {statusLabel}
                            </Text>
                            <Feather name="package" size={24} color={statusColors.color} />
                        </View>
                        {order.estimatedDelivery && (
                            <Text style={styles.estimatedDelivery}>
                                التوصيل المتوقع: {order.estimatedDelivery.toLocaleDateString('ar-SA')}
                            </Text>
                        )}
                        {order.trackingNumber && (
                            <Text style={styles.trackingNumber}>
                                رقم التتبع: {order.trackingNumber}
                            </Text>
                        )}
                    </View>

                    {/* Customer Information */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>معلومات العميل</Text>
                        <View style={styles.customerInfo}>
                            <View style={styles.customerRow}>
                                <Text style={styles.customerValue}>{order.customer.name}</Text>
                                <Feather name="user" size={16} color="#64748b" />
                            </View>
                            <TouchableOpacity style={styles.customerRow} onPress={handleEmailCustomer}>
                                <Text style={[styles.customerValue, { color: COLORS.primary }]}>
                                    {order.customer.email}
                                </Text>
                                <Feather name="mail" size={16} color={COLORS.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.customerRow} onPress={handleCallCustomer}>
                                <Text style={[styles.customerValue, { color: COLORS.primary }]}>
                                    {order.customer.phone}
                                </Text>
                                <Feather name="phone" size={16} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Status Timeline */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>تتبع الطلب</Text>
                        {order.statusHistory.map((item, index) => {
                            const isLast = index === order.statusHistory.length - 1;
                            const itemColors = ORDER_STATUS_COLORS[item.status];

                            return (
                                <View key={index} style={styles.timelineItem}>
                                    <View style={styles.timelineLeft}>
                                        <View style={[styles.timelineDot, { backgroundColor: itemColors.color }]} />
                                        {!isLast && <View style={styles.timelineLine} />}
                                    </View>
                                    <View style={[styles.timelineContent, { marginBottom: isLast ? 0 : 20 }]}>
                                        <Text style={styles.timelineStatus}>
                                            {ORDER_STATUS_LABELS[item.status]}
                                        </Text>
                                        {item.note && (
                                            <Text style={styles.timelineNote}>{item.note}</Text>
                                        )}
                                        <Text style={styles.timelineDate}>
                                            {item.timestamp.toLocaleString('ar-SA', {
                                                day: 'numeric',
                                                month: 'long',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>

                    {/* Products */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>المنتجات</Text>
                        {order.items.map((item) => (
                            <View key={item.id} style={styles.productItem}>
                                <View style={styles.productQuantity}>
                                    <Text style={styles.quantityText}>{item.quantity}</Text>
                                </View>
                                <Image source={{ uri: item.image }} style={styles.productImage} />
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName}>{item.name}</Text>
                                    <Text style={styles.productPrice}>
                                        {item.price.toFixed(2)} {order.currency}
                                    </Text>
                                </View>
                                <Text style={[styles.productTotal, { color: COLORS.primary }]}>
                                    {item.total.toFixed(2)} {order.currency}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Shipping Address */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>عنوان التوصيل</Text>
                        <View style={styles.addressContainer}>
                            <Feather name="map-pin" size={16} color="#64748b" />
                            <Text style={styles.addressText}>
                                {order.shippingAddress.street}, {order.shippingAddress.city}
                                {order.shippingAddress.postalCode && `, ${order.shippingAddress.postalCode}`}
                                {', '}{order.shippingAddress.country}
                            </Text>
                        </View>
                        <Text style={styles.shippingMethod}>
                            طريقة الشحن: {order.shippingMethod}
                        </Text>
                    </View>

                    {/* Payment & Total */}
                    <View style={styles.totalSection}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalValue}>{order.subtotal.toFixed(2)} {order.currency}</Text>
                            <Text style={styles.totalLabel}>المجموع الفرعي</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalValue}>{order.shippingCost.toFixed(2)} {order.currency}</Text>
                            <Text style={styles.totalLabel}>الشحن</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalValue}>{order.tax.toFixed(2)} {order.currency}</Text>
                            <Text style={styles.totalLabel}>الضريبة</Text>
                        </View>
                        {order.discount > 0 && (
                            <View style={styles.totalRow}>
                                <Text style={[styles.totalValue, { color: '#10B981' }]}>
                                    -{order.discount.toFixed(2)} {order.currency}
                                </Text>
                                <Text style={styles.totalLabel}>الخصم</Text>
                            </View>
                        )}
                        <View style={styles.divider} />
                        <View style={styles.totalRow}>
                            <Text style={[styles.totalValue, styles.finalTotal, { color: COLORS.primary }]}>
                                {order.total.toFixed(2)} {order.currency}
                            </Text>
                            <Text style={[styles.totalLabel, styles.finalTotal]}>الإجمالي</Text>
                        </View>
                        <Text style={styles.paymentMethod}>
                            الدفع عبر {order.paymentMethod}
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    headerTitle: { fontFamily: 'Cairo_700Bold', fontSize: 16, color: '#1e293b' },
    scrollView: { flex: 1 },
    scrollContent: { padding: 16 },
    statusCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    statusHeader: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    currentStatusLabel: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
    },
    estimatedDelivery: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 13,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 4,
    },
    trackingNumber: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#64748b',
        textAlign: 'right',
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 15,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 12,
    },
    customerInfo: { gap: 12 },
    customerRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 8,
    },
    customerValue: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#1e293b',
        textAlign: 'right',
        flex: 1,
    },
    timelineItem: {
        flexDirection: 'row-reverse',
        gap: 12,
    },
    timelineLeft: {
        alignItems: 'center',
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    timelineLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 4,
    },
    timelineContent: {
        flex: 1,
    },
    timelineStatus: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 4,
    },
    timelineNote: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 13,
        color: '#64748b',
        textAlign: 'right',
        marginBottom: 4,
    },
    timelineDate: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 11,
        color: '#94a3b8',
        textAlign: 'right',
    },
    productItem: {
        flexDirection: 'row-reverse',
        gap: 12,
        marginBottom: 12,
        alignItems: 'center',
    },
    productQuantity: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 11,
        color: '#64748b',
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#f8fafc',
    },
    productInfo: { flex: 1 },
    productName: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 13,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 4,
    },
    productPrice: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#64748b',
        textAlign: 'right',
    },
    productTotal: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
    },
    addressContainer: {
        flexDirection: 'row-reverse',
        gap: 8,
        marginBottom: 8,
    },
    addressText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 13,
        color: '#64748b',
        textAlign: 'right',
        flex: 1,
        lineHeight: 20,
    },
    shippingMethod: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 12,
        color: '#1e293b',
        textAlign: 'right',
    },
    totalSection: {
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    totalRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    totalLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 13,
        color: '#64748b',
    },
    totalValue: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 13,
        color: '#1e293b',
    },
    divider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 8,
    },
    finalTotal: {
        fontSize: 16,
        fontFamily: 'Cairo_700Bold',
    },
    paymentMethod: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#94a3b8',
        textAlign: 'right',
        marginTop: 8,
    },
});
