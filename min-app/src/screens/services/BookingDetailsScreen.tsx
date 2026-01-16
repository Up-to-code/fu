// File: src/screens/services/BookingDetailsScreen.tsx
// Purpose: Service booking details with status tracking and provider info

import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../shared';
import { useOrderDetails } from '../orders/_hooks';
import { COLORS } from '../../constants/theme';
import { useRTL } from '../../hooks/useRTL';
import { useResponsive } from '../../hooks/useResponsive';
import { ServiceBookingStatus, SERVICE_STATUS_LABELS, ServiceBooking } from '../../types/orders';
import { getStyles } from './StyleSheets/BookingDetailsScreen.styles';

// Mock data - in real app, fetch by ID
const MOCK_SERVICE_BOOKING: ServiceBooking = {
    id: 'sb1',
    bookingNumber: 'SRV-2024-000156',
    customer: {
        id: 'u1',
        name: 'أحمد منصور',
        email: 'ahmed.mansour@example.com',
        phone: '+966501234567',
    },
    provider: {
        id: 'p1',
        name: 'شركة التطوير الحديث',
        type: 'company',
        phone: '+966505555555',
        rating: 4.8,
        avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200',
    },
    serviceType: 'تجديد وتطوير',
    serviceCategory: 'تجديد',
    services: [
        { id: 's1', label: 'تجديد المطبخ', price: 2500 },
        { id: 's2', label: 'أعمال الدهان', price: 1000 },
    ],
    description: 'تجديد المطبخ الكامل مع دهان الجدران بألوان حديثة',
    scheduledDate: new Date('2024-01-20'),
    scheduledTime: '10:00 - 12:00',
    duration: 120,
    location: 'home',
    address: {
        street: 'شارع الأمير سلطان، حي النرجس',
        city: 'الرياض',
        postalCode: '12345',
        country: 'السعودية',
    },
    status: ServiceBookingStatus.CONFIRMED,
    statusHistory: [
        {
            status: ServiceBookingStatus.PENDING,
            timestamp: new Date('2024-01-14T09:00:00'),
            changedBy: 'customer',
            note: 'تم إرسال طلب الحجز'
        },
        {
            status: ServiceBookingStatus.QUOTE_SENT,
            timestamp: new Date('2024-01-14T11:00:00'),
            changedBy: 'provider',
            note: 'تم إرسال العرض السعري'
        },
        {
            status: ServiceBookingStatus.QUOTE_ACCEPTED,
            timestamp: new Date('2024-01-14T14:00:00'),
            changedBy: 'customer',
            note: 'تم قبول العرض'
        },
        {
            status: ServiceBookingStatus.SCHEDULED,
            timestamp: new Date('2024-01-14T14:30:00'),
            changedBy: 'provider',
            note: 'تم تحديد موعد الزيارة'
        },
        {
            status: ServiceBookingStatus.CONFIRMED,
            timestamp: new Date('2024-01-14T15:00:00'),
            changedBy: 'provider',
            note: 'تم تأكيد الموعد'
        },
    ],
    quote: {
        amount: 3500,
        validUntil: new Date('2024-01-17'),
        notes: 'يشمل المواد والعمالة. الدفع عند الإنجاز.',
    },
    finalPrice: 3500,
    paymentMethod: 'نقدي عند الإنجاز',
    paymentStatus: 'pending',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
};

const STATUS_COLORS: Record<ServiceBookingStatus, { color: string; bg: string }> = {
    [ServiceBookingStatus.PENDING]: { color: '#F59E0B', bg: '#FEF3C7' },
    [ServiceBookingStatus.QUOTE_SENT]: { color: '#3B82F6', bg: '#DBEAFE' },
    [ServiceBookingStatus.QUOTE_ACCEPTED]: { color: '#10B981', bg: '#D1FAE5' },
    [ServiceBookingStatus.QUOTE_REJECTED]: { color: '#EF4444', bg: '#FEE2E2' },
    [ServiceBookingStatus.SCHEDULED]: { color: '#8B5CF6', bg: '#EDE9FE' },
    [ServiceBookingStatus.CONFIRMED]: { color: '#10B981', bg: '#D1FAE5' },
    [ServiceBookingStatus.IN_PROGRESS]: { color: '#3B82F6', bg: '#DBEAFE' },
    [ServiceBookingStatus.PAUSED]: { color: '#F59E0B', bg: '#FEF3C7' },
    [ServiceBookingStatus.COMPLETED]: { color: '#10B981', bg: '#D1FAE5' },
    [ServiceBookingStatus.VERIFIED]: { color: '#10B981', bg: '#D1FAE5' },
    [ServiceBookingStatus.PAYMENT_PENDING]: { color: '#F59E0B', bg: '#FEF3C7' },
    [ServiceBookingStatus.PAID]: { color: '#10B981', bg: '#D1FAE5' },
    [ServiceBookingStatus.REJECTED_BY_PROVIDER]: { color: '#EF4444', bg: '#FEE2E2' },
    [ServiceBookingStatus.CANCELLED_BY_CUSTOMER]: { color: '#6B7280', bg: '#F3F4F6' },
    [ServiceBookingStatus.CANCELLED_BY_PROVIDER]: { color: '#EF4444', bg: '#FEE2E2' },
    [ServiceBookingStatus.RESCHEDULED]: { color: '#8B5CF6', bg: '#EDE9FE' },
    [ServiceBookingStatus.DISPUTED]: { color: '#EF4444', bg: '#FEE2E2' },
    [ServiceBookingStatus.RESOLVED]: { color: '#10B981', bg: '#D1FAE5' },
};

export default function BookingDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { order: hookOrder, isLoading } = useOrderDetails(id as string, 'service');
    const booking = (hookOrder as ServiceBooking) || MOCK_SERVICE_BOOKING; // Fallback to mock if hook returns null
    const { isRTL } = useRTL();
    const { getSize, fontSize, iconSize } = useResponsive();
    const styles = getStyles(isRTL, getSize, fontSize, iconSize);

    const statusColors = STATUS_COLORS[booking.status];
    const statusLabel = SERVICE_STATUS_LABELS[booking.status];

    const handleCallProvider = () => {
        Linking.openURL(`tel:${booking.provider.phone}`);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Feather name={isRTL ? "arrow-right" : "arrow-left"} size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{booking.bookingNumber}</Text>
                    <View style={{ width: 24 }} />
                </View>

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
                            <Feather name="tool" size={24} color={statusColors.color} />
                        </View>
                        {booking.scheduledDate && (
                            <Text style={styles.scheduledInfo}>
                                الموعد: {booking.scheduledDate.toLocaleDateString('ar-SA')} • {booking.scheduledTime}
                            </Text>
                        )}
                    </View>

                    {/* Provider Information */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>مزود الخدمة</Text>
                        <View style={styles.providerCard}>
                            <View style={styles.providerHeader}>
                                {booking.provider.avatar && (
                                    <Image
                                        source={{ uri: booking.provider.avatar }}
                                        style={styles.providerAvatar}
                                    />
                                )}
                                <View style={styles.providerInfo}>
                                    <Text style={styles.providerName}>{booking.provider.name}</Text>
                                    <View style={styles.providerRating}>
                                        <Feather name="star" size={14} color="#F59E0B" fill="#F59E0B" />
                                        <Text style={styles.ratingText}>{booking.provider.rating}</Text>
                                        <Text style={styles.providerType}>
                                            • {booking.provider.type === 'company' ? 'شركة' : 'مستقل'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.callButton}
                                onPress={handleCallProvider}
                            >
                                <Feather name="phone" size={18} color="white" />
                                <Text style={styles.callButtonText}>اتصل</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Services */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>الخدمات المطلوبة</Text>
                        {booking.services.map((service) => (
                            <View key={service.id} style={styles.serviceItem}>
                                <View style={styles.serviceInfo}>
                                    <Feather name="check-circle" size={16} color={COLORS.primary} />
                                    <Text style={styles.serviceLabel}>{service.label}</Text>
                                </View>
                                {service.price && (
                                    <Text style={styles.servicePrice}>{service.price} ر.س</Text>
                                )}
                            </View>
                        ))}
                        {booking.description && (
                            <View style={styles.descriptionBox}>
                                <Text style={styles.descriptionLabel}>التفاصيل:</Text>
                                <Text style={styles.descriptionText}>{booking.description}</Text>
                            </View>
                        )}
                    </View>

                    {/* Schedule & Location */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>الموعد والموقع</Text>
                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <Feather name="calendar" size={16} color="#64748b" />
                                <Text style={styles.infoText}>
                                    {booking.scheduledDate.toLocaleDateString('ar-SA', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <Feather name="clock" size={16} color="#64748b" />
                                <Text style={styles.infoText}>{booking.scheduledTime}</Text>
                            </View>
                        </View>
                        {booking.location === 'home' && booking.address && (
                            <View style={styles.infoRow}>
                                <View style={styles.infoItem}>
                                    <Feather name="map-pin" size={16} color="#64748b" />
                                    <Text style={styles.infoText}>
                                        {booking.address.street}, {booking.address.city}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>

                    {/* Quote/Price */}
                    {booking.quote && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>العرض السعري</Text>
                            <View style={styles.priceRow}>
                                <Text style={[styles.priceValue, { color: COLORS.primary }]}>
                                    {booking.quote.amount.toFixed(2)} ر.س
                                </Text>
                                <Text style={styles.priceLabel}>المبلغ المتفق عليه</Text>
                            </View>
                            {booking.quote.notes && (
                                <Text style={styles.quoteNotes}>{booking.quote.notes}</Text>
                            )}
                            <Text style={styles.paymentMethod}>
                                طريقة الدفع: {booking.paymentMethod}
                            </Text>
                        </View>
                    )}

                    {/* Status Timeline */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>سجل الحالة</Text>
                        {booking.statusHistory.map((item, index) => {
                            const isLast = index === booking.statusHistory.length - 1;
                            const itemColors = STATUS_COLORS[item.status];

                            return (
                                <View key={index} style={styles.timelineItem}>
                                    <View style={styles.timelineLeft}>
                                        <View style={[styles.timelineDot, { backgroundColor: itemColors.color }]} />
                                        {!isLast && <View style={styles.timelineLine} />}
                                    </View>
                                    <View style={[styles.timelineContent, { marginBottom: isLast ? 0 : 20 }]}>
                                        <Text style={styles.timelineStatus}>
                                            {SERVICE_STATUS_LABELS[item.status]}
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

                    {/* Actions */}
                    {(booking.status === ServiceBookingStatus.IN_PROGRESS ||
                        booking.status === ServiceBookingStatus.CONFIRMED ||
                        booking.status === ServiceBookingStatus.VERIFIED) && (
                            <View style={styles.section}>
                                <View style={styles.sectionContent}>
                                    <TouchableOpacity
                                        style={styles.completeButton}
                                        onPress={() => {
                                            // In real app: API call to update status
                                            alert('تم تأكيد اكتمال الخدمة بنجاح');
                                            router.back();
                                        }}
                                    >
                                        <View style={styles.completeButtonContent}>
                                            <Text style={styles.completeButtonText}>تأكيد اكتمال الخدمة</Text>
                                            <Feather name="check-circle" size={20} color="white" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                    <View style={{ height: 20 }} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

