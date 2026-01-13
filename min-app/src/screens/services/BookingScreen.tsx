// File: src/screens/services/BookingScreen.tsx
// Purpose: Service Booking Screen with form and SwipeToConfirm

import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { SwipeToConfirm } from '../../components/shared';
import { PaymentStep } from './_components/PaymentStep';

// Mock provider data (in real app, this would come from API/context)
const PROVIDERS = [
    {
        id: '1',
        name: 'شركة النظافة المتكاملة',
        category: 'التنظيف',
        price: 150,
        priceLabel: 'من 150 ر.س',
    },
    {
        id: '2',
        name: 'أحمد - مصمم داخلي',
        category: 'التصميم الداخلي',
        price: 500,
        priceLabel: 'من 500 ر.س',
    },
    {
        id: '3',
        name: 'فريق الصيانة السريع',
        category: 'الصيانة المنزلية',
        price: 100,
        priceLabel: 'من 100 ر.س',
    },
];

const getProviderById = (id: string) => {
    return PROVIDERS.find(p => p.id === id);
};

export default function BookingScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

    const provider = getProviderById(id || '');

    if (!provider) {
        return (
            <SafeAreaView style={styles.container} edges={['top']}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>الخدمة غير موجودة</Text>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>العودة</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const totalAmount = provider.price;

    const handleConfirm = () => {
        // Handle booking confirmation
        router.push('/orders' as any);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Feather name="arrow-right" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>حجز الخدمة</Text>
                    <View style={styles.headerSpacer} />
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Service Summary */}
                    <View style={styles.summaryCard}>
                        <Text style={styles.sectionTitle}>ملخص الخدمة</Text>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>مقدم الخدمة:</Text>
                            <Text style={styles.summaryValue}>{provider.name}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>التصنيف:</Text>
                            <Text style={styles.summaryValue}>{provider.category}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>السعر:</Text>
                            <Text style={[styles.summaryValue, { color: COLORS.primary }]}>
                                {provider.priceLabel}
                            </Text>
                        </View>
                    </View>

                    {/* Booking Details */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>تفاصيل الحجز</Text>

                        {/* Date Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>التاريخ</Text>
                            <TouchableOpacity style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="اختر التاريخ"
                                    placeholderTextColor={COLORS.textLight}
                                    value={selectedDate}
                                    onChangeText={setSelectedDate}
                                />
                                <Feather name="calendar" size={20} color={COLORS.textLight} />
                            </TouchableOpacity>
                        </View>

                        {/* Time Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>الوقت</Text>
                            <TouchableOpacity style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="اختر الوقت"
                                    placeholderTextColor={COLORS.textLight}
                                    value={selectedTime}
                                    onChangeText={setSelectedTime}
                                />
                                <Feather name="clock" size={20} color={COLORS.textLight} />
                            </TouchableOpacity>
                        </View>

                        {/* Address Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>العنوان</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.textArea}
                                    placeholder="أدخل عنوان الحجز"
                                    placeholderTextColor={COLORS.textLight}
                                    value={address}
                                    onChangeText={setAddress}
                                    multiline
                                    numberOfLines={3}
                                    textAlignVertical="top"
                                />
                                <Feather name="map-pin" size={20} color={COLORS.textLight} style={styles.inputIcon} />
                            </View>
                        </View>

                        {/* Notes Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>ملاحظات (اختياري)</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.textArea}
                                    placeholder="أضف أي ملاحظات إضافية"
                                    placeholderTextColor={COLORS.textLight}
                                    value={notes}
                                    onChangeText={setNotes}
                                    multiline
                                    numberOfLines={3}
                                    textAlignVertical="top"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Payment Method */}
                    <View style={styles.section}>
                        <PaymentStep
                            selectedMethod={selectedPaymentMethod}
                            onSelectMethod={setSelectedPaymentMethod}
                            totalAmount={totalAmount}
                        />
                    </View>

                    {/* Total Summary */}
                    <View style={styles.totalCard}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>المجموع</Text>
                            <Text style={styles.totalValue}>{totalAmount} ر.س</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

            {/* Bottom - Swipe to Confirm */}
            <SafeAreaView edges={['bottom']} style={styles.bottomContainer}>
                <View style={styles.bottomContent}>
                    <SwipeToConfirm
                        onConfirm={handleConfirm}
                        label="اسحب لتأكيد الحجز"
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    safeArea: {
        flex: 1,
    },
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
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: '#1e293b',
    },
    headerSpacer: {
        width: 40,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    errorText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: COLORS.text,
        marginBottom: 16,
        textAlign: 'center',
    },
    backButtonText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        color: COLORS.primary,
    },
    summaryCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        marginBottom: 16,
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 16,
    },
    summaryRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    summaryLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: COLORS.textLight,
    },
    summaryValue: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: '#1e293b',
    },
    section: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        marginBottom: 16,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    input: {
        flex: 1,
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        color: '#1e293b',
        textAlign: 'right',
        padding: 0,
    },
    textArea: {
        flex: 1,
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        color: '#1e293b',
        textAlign: 'right',
        padding: 0,
        minHeight: 80,
    },
    inputIcon: {
        marginLeft: 12,
    },
    totalCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        marginBottom: 16,
    },
    totalRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: '#1e293b',
    },
    totalValue: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 20,
        color: COLORS.primary,
    },
    bottomContainer: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    bottomContent: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
});
