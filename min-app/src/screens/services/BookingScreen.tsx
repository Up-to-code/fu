// File: src/screens/services/BookingScreen.tsx
// Purpose: Enhanced Service Booking Form with comprehensive status support

import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, FormInput, PrimaryButton } from '../shared';
import { useServiceBooking } from './_hooks';
import { COLORS } from '../../constants/theme';
import { SwipeToConfirm } from '../shared';
import { ServiceBookingStatus } from '../../types/orders';
import { BookingLocation } from './types/services';

// Mock provider data (in real app, fetch by ID)
const PROVIDERS = {
    '1': {
        id: '1',
        name: 'شركة التطوير الحديث',
        type: 'company' as const,
        category: 'تجديد وتطوير',
        priceRange: '1000-5000',
        services: [
            { id: 's1', label: 'تجديد المطابخ', basePrice: 3000 },
            { id: 's2', label: 'تجديد الحمامات', basePrice: 2500 },
            { id: 's3', label: 'أعمال الدهان', basePrice: 1000 },
            { id: 's4', label: 'تركيب الأرضيات', basePrice: 1500 },
        ],
    },
    '2': {
        id: '2',
        name: 'أحمد - مصمم داخلي',
        type: 'freelancer' as const,
        category: 'التصميم الداخلي',
        priceRange: '500-3000',
        services: [
            { id: 's1', label: 'تصميم المنزل الكامل', basePrice: 3000 },
            { id: 's2', label: 'تصميم غرفة واحدة', basePrice: 800 },
            { id: 's3', label: 'استشارة تصميم', basePrice: 500 },
        ],
    },
};

export default function BookingScreen() {
    const { id } = useLocalSearchParams();
    const provider = PROVIDERS[id as keyof typeof PROVIDERS];

    // If provider not found, show error
    if (!provider) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                            <Feather name="arrow-right" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>حجز خدمة</Text>
                        <View style={{ width: 24 }} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                        <Feather name="alert-circle" size={48} color="#94a3b8" />
                        <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 16, color: '#1e293b', marginTop: 16, textAlign: 'center' }}>
                            لم يتم العثور على مقدم الخدمة
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={{ marginTop: 16, backgroundColor: COLORS.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}
                        >
                            <Text style={{ fontFamily: 'Cairo_600SemiBold', color: 'white' }}>العودة</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [location, setLocation] = useState<BookingLocation>('home');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');

    // Generate date options (next 14 days)
    const dates = useMemo(() => {
        const options = [];
        const today = new Date();
        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            options.push({
                value: date.toISOString().split('T')[0],
                day: date.toLocaleDateString('ar-SA', { weekday: 'short' }),
                date: date.getDate(),
                month: date.toLocaleDateString('ar-SA', { month: 'short' }),
            });
        }
        return options;
    }, []);

    // Time slots
    const timeSlots = [
        '08:00 - 10:00',
        '10:00 - 12:00',
        '12:00 - 14:00',
        '14:00 - 16:00',
        '16:00 - 18:00',
        '18:00 - 20:00',
    ];

    const toggleService = (serviceId: string) => {
        setSelectedServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    const calculateTotal = () => {
        return provider.services
            .filter(s => selectedServices.includes(s.id))
            .reduce((sum, s) => sum + s.basePrice, 0);
    };

    const isFormValid = () => {
        return (
            selectedServices.length > 0 &&
            selectedDate &&
            selectedTime &&
            (location !== 'home' || address.trim()) &&
            phone.trim()
        );
    };

    const handleConfirmBooking = () => {
        if (!isFormValid()) {
            Alert.alert('تنبيه', 'يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        // In real app, this would create a booking with status: ServiceBookingStatus.PENDING
        const booking = {
            providerId: provider.id,
            providerName: provider.name,
            services: selectedServices.map(id =>
                provider.services.find(s => s.id === id)!
            ),
            date: selectedDate,
            time: selectedTime,
            location,
            address: location === 'home' ? address : '',
            phone,
            description,
            estimatedPrice: calculateTotal(),
            status: ServiceBookingStatus.PENDING,
        };

        // Booking created successfully

        Alert.alert(
            'تم إرسال الطلب',
            'سيتم التواصل معك قريباً لتأكيد الحجز وإرسال العرض',
            [
                {
                    text: 'حسناً',
                    onPress: () => router.back(),
                },
            ]
        );
    };

    if (!provider) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>مزود الخدمة غير موجود</Text>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Feather name="arrow-right" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>حجز خدمة</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Provider Info */}
                    <View style={styles.section}>
                        <Text style={styles.providerName}>{provider.name}</Text>
                        <Text style={styles.providerCategory}>{provider.category}</Text>
                    </View>

                    {/* Services Selection */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>اختر الخدمات المطلوبة *</Text>
                        {provider.services.map(service => (
                            <TouchableOpacity
                                key={service.id}
                                style={[
                                    styles.serviceItem,
                                    selectedServices.includes(service.id) && styles.serviceItemSelected,
                                ]}
                                onPress={() => toggleService(service.id)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.serviceInfo}>
                                    <Text style={[
                                        styles.serviceLabel,
                                        selectedServices.includes(service.id) && styles.serviceLabelSelected,
                                    ]}>
                                        {service.label}
                                    </Text>
                                    <Text style={styles.servicePrice}>
                                        {service.basePrice} ر.س
                                    </Text>
                                </View>
                                <View style={[
                                    styles.checkbox,
                                    selectedServices.includes(service.id) && styles.checkboxSelected,
                                ]}>
                                    {selectedServices.includes(service.id) && (
                                        <Feather name="check" size={16} color="white" />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Date Selection */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>اختر التاريخ *</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.datesContainer}
                        >
                            {dates.map(date => (
                                <TouchableOpacity
                                    key={date.value}
                                    style={[
                                        styles.dateCard,
                                        selectedDate === date.value && styles.dateCardSelected,
                                    ]}
                                    onPress={() => setSelectedDate(date.value)}
                                >
                                    <Text style={[
                                        styles.dateDay,
                                        selectedDate === date.value && styles.dateTextSelected,
                                    ]}>
                                        {date.day}
                                    </Text>
                                    <Text style={[
                                        styles.dateNumber,
                                        selectedDate === date.value && styles.dateTextSelected,
                                    ]}>
                                        {date.date}
                                    </Text>
                                    <Text style={[
                                        styles.dateMonth,
                                        selectedDate === date.value && styles.dateTextSelected,
                                    ]}>
                                        {date.month}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Time Selection */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>اختر الوقت *</Text>
                        <View style={styles.timeSlotsGrid}>
                            {timeSlots.map(slot => (
                                <TouchableOpacity
                                    key={slot}
                                    style={[
                                        styles.timeSlot,
                                        selectedTime === slot && styles.timeSlotSelected,
                                    ]}
                                    onPress={() => setSelectedTime(slot)}
                                >
                                    <Text style={[
                                        styles.timeSlotText,
                                        selectedTime === slot && styles.timeSlotTextSelected,
                                    ]}>
                                        {slot}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Location Type */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>مكان تقديم الخدمة *</Text>
                        <View style={styles.locationOptions}>
                            <TouchableOpacity
                                style={[
                                    styles.locationOption,
                                    location === 'home' && styles.locationOptionSelected,
                                ]}
                                onPress={() => setLocation('home')}
                            >
                                <Feather
                                    name="home"
                                    size={20}
                                    color={location === 'home' ? COLORS.primary : '#64748b'}
                                />
                                <Text style={[
                                    styles.locationOptionText,
                                    location === 'home' && styles.locationOptionTextSelected,
                                ]}>
                                    المنزل
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.locationOption,
                                    location === 'provider_location' && styles.locationOptionSelected,
                                ]}
                                onPress={() => setLocation('provider_location')}
                            >
                                <Feather
                                    name="map-pin"
                                    size={20}
                                    color={location === 'provider_location' ? COLORS.primary : '#64748b'}
                                />
                                <Text style={[
                                    styles.locationOptionText,
                                    location === 'provider_location' && styles.locationOptionTextSelected,
                                ]}>
                                    موقع المزود
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Address (if home service) */}
                    {location === 'home' && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>العنوان *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="أدخل العنوان الكامل"
                                value={address}
                                onChangeText={setAddress}
                                multiline
                                textAlign="right"
                            />
                        </View>
                    )}

                    {/* Phone */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>رقم الجوال *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="05XXXXXXXX"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            textAlign="right"
                        />
                    </View>

                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>تفاصيل إضافية (اختياري)</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="أي تفاصيل إضافية تريد إضافتها"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                            textAlign="right"
                        />
                    </View>

                    {/* Price Summary */}
                    {selectedServices.length > 0 && (
                        <View style={styles.summarySection}>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryValue}>
                                    {calculateTotal().toFixed(2)} ر.س
                                </Text>
                                <Text style={styles.summaryLabel}>السعر المتوقع</Text>
                            </View>
                            <Text style={styles.summaryNote}>
                                * السعر النهائي سيتم تحديده بعد الكشف ومراجعة المتطلبات
                            </Text>
                        </View>
                    )}

                    <View style={{ height: 120 }} />
                </ScrollView>

                {/* Fixed Bottom Button */}
                <SafeAreaView edges={['bottom']} style={styles.footer}>
                    <SwipeToConfirm
                        onConfirm={handleConfirmBooking}
                        disabled={!isFormValid()}
                        label="اسحب لتأكيد الحجز"
                    />
                </SafeAreaView>
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
    scrollView: { flex: 1 },
    scrollContent: { padding: 16 },
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
        fontSize: 14,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 12,
    },
    providerName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 4,
    },
    providerCategory: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 13,
        color: '#64748b',
        textAlign: 'right',
    },
    serviceItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 8,
    },
    serviceItemSelected: {
        borderColor: COLORS.primary,
        backgroundColor: `${COLORS.primary}08`,
    },
    serviceInfo: { flex: 1 },
    serviceLabel: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 14,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 4,
    },
    serviceLabelSelected: { color: COLORS.primary },
    servicePrice: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#64748b',
        textAlign: 'right',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#e2e8f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary,
    },
    datesContainer: {
        flexDirection: 'row-reverse',
        gap: 8,
    },
    dateCard: {
        width: 70,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        alignItems: 'center',
    },
    dateCardSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary,
    },
    dateDay: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 11,
        color: '#64748b',
        marginBottom: 4,
    },
    dateNumber: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: '#1e293b',
        marginBottom: 2,
    },
    dateMonth: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 10,
        color: '#64748b',
    },
    dateTextSelected: { color: 'white' },
    timeSlotsGrid: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        gap: 8,
    },
    timeSlot: {
        width: '48%',
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        alignItems: 'center',
    },
    timeSlotSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary,
    },
    timeSlotText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 13,
        color: '#1e293b',
    },
    timeSlotTextSelected: { color: 'white' },
    locationOptions: {
        flexDirection: 'row-reverse',
        gap: 8,
    },
    locationOption: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    locationOptionSelected: {
        borderColor: COLORS.primary,
        backgroundColor: `${COLORS.primary}08`,
    },
    locationOptionText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 13,
        color: '#64748b',
    },
    locationOptionTextSelected: { color: COLORS.primary },
    input: {
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#1e293b',
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    summarySection: {
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 12,
    },
    summaryRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 14,
        color: '#64748b',
    },
    summaryValue: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: COLORS.primary,
    },
    summaryNote: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 11,
        color: '#94a3b8',
        textAlign: 'right',
        lineHeight: 16,
    },
    footer: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
});
