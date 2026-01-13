// File: src/screens/orders/OrdersScreen.tsx
// Purpose: User orders list

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../../components/shared';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const ORDERS = [
    { id: '1', date: '2024-01-15', status: 'delivered', total: 2499, items: 2 },
    { id: '2', date: '2024-01-10', status: 'shipping', total: 1299, items: 1 },
    { id: '3', date: '2024-01-05', status: 'processing', total: 899, items: 3 },
];

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
    processing: { label: 'قيد المعالجة', color: '#F59E0B', bg: '#FEF3C7' },
    shipping: { label: 'قيد الشحن', color: '#3B82F6', bg: '#DBEAFE' },
    delivered: { label: 'تم التوصيل', color: '#10B981', bg: '#D1FAE5' },
};

export default function OrdersScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Header */}
            <View className="flex-row-reverse items-center justify-between px-5 py-3 border-b border-slate-100">
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="arrow-right" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text className="font-cairo-bold text-lg text-slate-800">طلباتي</Text>
                <View className="w-6" />
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 20 }}>
                {ORDERS.length > 0 ? (
                    ORDERS.map((order) => {
                        const status = STATUS_MAP[order.status];
                        return (
                            <TouchableOpacity
                                key={order.id}
                                className="bg-slate-50 rounded-2xl p-4 mb-3"
                                onPress={() => router.push(`/orders/${order.id}` as any)}
                            >
                                <View className="flex-row-reverse justify-between items-center mb-2">
                                    <Text className="font-cairo-bold text-slate-800">طلب #{order.id}</Text>
                                    <View style={{ backgroundColor: status.bg }} className="px-3 py-1 rounded-full">
                                        <Text style={{ color: status.color }} className="font-cairo-medium text-xs">
                                            {status.label}
                                        </Text>
                                    </View>
                                </View>
                                <View className="flex-row-reverse justify-between">
                                    <Text className="font-cairo-medium text-slate-500 text-sm">{order.date}</Text>
                                    <Text className="font-cairo-bold text-primary">{order.total} ر.س</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                ) : (
                    <EmptyState icon="package" title="لا توجد طلبات" description="لم تقم بأي طلبات بعد" />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
