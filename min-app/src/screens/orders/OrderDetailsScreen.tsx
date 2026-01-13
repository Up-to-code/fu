// File: src/screens/orders/OrderDetailsScreen.tsx
// Purpose: Order details and tracking

import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const ORDER = {
    id: '1',
    date: '2024-01-15',
    status: 'shipping',
    total: 2499,
    shipping: 0,
    items: [
        { id: '1', name: 'صوفا مودرن مريحة', price: 2499, qty: 1, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200' },
    ],
    address: 'الرياض، حي النرجس، شارع الأمير سلطان',
    tracking: [
        { status: 'confirmed', label: 'تم تأكيد الطلب', date: '15 يناير', done: true },
        { status: 'preparing', label: 'جاري التجهيز', date: '16 يناير', done: true },
        { status: 'shipping', label: 'قيد الشحن', date: '17 يناير', done: true },
        { status: 'delivered', label: 'تم التوصيل', date: '', done: false },
    ],
};

export default function OrderDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Header */}
            <View className="flex-row-reverse items-center justify-between px-5 py-3 border-b border-slate-100">
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="arrow-right" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text className="font-cairo-bold text-lg text-slate-800">طلب #{id}</Text>
                <View className="w-6" />
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
                {/* Tracking */}
                <View className="bg-slate-50 rounded-2xl p-4 mb-4">
                    <Text className="font-cairo-bold text-slate-800 text-right mb-4">حالة الطلب</Text>
                    {ORDER.tracking.map((step, idx) => (
                        <View key={step.status} className="flex-row-reverse items-start gap-3 mb-3">
                            <View className={`w-6 h-6 rounded-full items-center justify-center ${step.done ? 'bg-green-500' : 'bg-slate-200'}`}>
                                {step.done && <Ionicons name="checkmark" size={14} color="white" />}
                            </View>
                            <View className="flex-1">
                                <Text className={`font-cairo-bold text-right ${step.done ? 'text-slate-800' : 'text-slate-400'}`}>
                                    {step.label}
                                </Text>
                                {step.date && <Text className="font-cairo-medium text-slate-400 text-xs text-right">{step.date}</Text>}
                            </View>
                        </View>
                    ))}
                </View>

                {/* Items */}
                <View className="bg-slate-50 rounded-2xl p-4 mb-4">
                    <Text className="font-cairo-bold text-slate-800 text-right mb-4">المنتجات</Text>
                    {ORDER.items.map((item) => (
                        <View key={item.id} className="flex-row-reverse gap-3 mb-3">
                            <Image source={{ uri: item.image }} className="w-16 h-16 rounded-xl" />
                            <View className="flex-1">
                                <Text className="font-cairo-bold text-slate-800 text-right">{item.name}</Text>
                                <Text className="font-cairo-medium text-slate-500 text-right text-sm">الكمية: {item.qty}</Text>
                            </View>
                            <Text className="font-cairo-bold text-primary">{item.price} ر.س</Text>
                        </View>
                    ))}
                </View>

                {/* Address */}
                <View className="bg-slate-50 rounded-2xl p-4 mb-4">
                    <Text className="font-cairo-bold text-slate-800 text-right mb-2">عنوان التوصيل</Text>
                    <Text className="font-cairo-medium text-slate-500 text-right">{ORDER.address}</Text>
                </View>

                {/* Total */}
                <View className="bg-primary/5 rounded-2xl p-4">
                    <View className="flex-row-reverse justify-between">
                        <Text className="font-cairo-bold text-slate-800">الإجمالي</Text>
                        <Text className="font-cairo-bold text-primary text-lg">{ORDER.total} ر.س</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
