// File: src/screens/services/BookingScreen.tsx
// Purpose: Service Booking Screen with service selection, date/time, and contact

import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeToConfirm } from '../../components/shared';
import { COLORS } from '../../constants/theme';

interface Provider {
    id: string;
    name: string;
    avatar: string;
    category: string;
    rating: number;
    services: string[];
}

const PROVIDERS: Record<string, Provider> = {
    '1': {
        id: '1',
        name: 'أحمد المصمم',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        category: 'تصميم داخلي',
        rating: 4.9,
        services: [
            'تصميم ديكورات كاملة',
            'اختيار الألوان والمواد',
            'رسوم هندسية',
            'متابعة التنفيذ',
        ],
    },
    '2': {
        id: '2',
        name: 'شركة التطوير الحديث',
        avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80',
        category: 'تجديد وتطوير',
        rating: 4.8,
        services: [
            'تجديد المطابخ',
            'تجديد الحمامات',
            'أعمال الدهان',
            'تركيب الأرضيات',
        ],
    },
};

const AVAILABLE_DATES = [
    { id: '1', day: 'اليوم', date: '15', month: 'يناير', available: true },
    { id: '2', day: 'غداً', date: '16', month: 'يناير', available: true },
    { id: '3', day: 'الجمعة', date: '17', month: 'يناير', available: false },
    { id: '4', day: 'السبت', date: '18', month: 'يناير', available: true },
    { id: '5', day: 'الأحد', date: '19', month: 'يناير', available: true },
];

const AVAILABLE_TIMES = [
    { id: '1', time: '9:00 ص', available: true },
    { id: '2', time: '10:00 ص', available: true },
    { id: '3', time: '11:00 ص', available: false },
    { id: '4', time: '12:00 م', available: true },
    { id: '5', time: '2:00 م', available: true },
    { id: '6', time: '3:00 م', available: true },
    { id: '7', time: '4:00 م', available: false },
    { id: '8', time: '5:00 م', available: true },
];

const CONTACT_METHODS = [
    { id: 'whatsapp', label: 'واتساب', icon: 'message-circle' },
    { id: 'phone', label: 'اتصال هاتفي', icon: 'phone' },
    { id: 'chat', label: 'محادثة التطبيق', icon: 'message-square' },
];

const DEFAULT_PROVIDER = PROVIDERS['1'];

export default function BookingScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const provider = PROVIDERS[id || '1'] || DEFAULT_PROVIDER;

    const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [selectedContactMethod, setSelectedContactMethod] = useState<string>('whatsapp');
    const [message, setMessage] = useState('');

    const toggleService = (service: string) => {
        setSelectedServices(prev => {
            const newSet = new Set(prev);
            if (newSet.has(service)) {
                newSet.delete(service);
            } else {
                newSet.add(service);
            }
            return newSet;
        });
    };

    const canSubmit = selectedServices.size > 0 && selectedDate && selectedTime;

    const handleConfirmBooking = () => {
        Alert.alert(
            'تم إرسال طلب الحجز! 🎉',
            `سيتواصل معك ${provider.name} قريباً لتأكيد الموعد.`,
            [
                {
                    text: 'حسناً',
                    onPress: () => router.replace('/(tabs)/home'),
                },
            ]
        );
    };

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1" edges={['top']}>
                {/* Header */}
                <View className="flex-row-reverse items-center justify-between px-5 py-4 border-b border-slate-100">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Feather name="arrow-right" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text className="font-cairo-bold text-xl text-slate-900">حجز موعد</Text>
                    <View className="w-6" />
                </View>

                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Provider Info */}
                    <View className="px-5 py-4 flex-row-reverse items-center gap-4 border-b border-slate-100">
                        <View className="w-14 h-14 rounded-full overflow-hidden bg-slate-100">
                            <Image
                                source={{ uri: provider.avatar }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="font-cairo-bold text-slate-900 text-base text-right">{provider.name}</Text>
                            <View className="flex-row-reverse items-center gap-2">
                                <Text className="font-cairo-medium text-slate-500 text-sm">{provider.category}</Text>
                                <View className="flex-row items-center gap-1">
                                    <Feather name="star" size={12} color="#F59E0B" />
                                    <Text className="font-cairo-bold text-slate-700 text-sm">{provider.rating}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Select Services */}
                    <View className="px-5 py-5">
                        <Text className="font-cairo-bold text-slate-900 text-lg text-right mb-4">
                            اختر الخدمات المطلوبة
                        </Text>
                        <View className="gap-3">
                            {provider.services.map((service, index) => {
                                const isSelected = selectedServices.has(service);
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => toggleService(service)}
                                        className={`flex-row-reverse items-center justify-between p-4 rounded-xl border ${
                                            isSelected ? 'border-primary bg-primary/5' : 'border-slate-200'
                                        }`}
                                        style={isSelected ? { borderColor: COLORS.primary } : {}}
                                    >
                                        <Text className={`font-cairo-medium text-base ${
                                            isSelected ? 'text-primary' : 'text-slate-700'
                                        }`} style={isSelected ? { color: COLORS.primary } : {}}>
                                            {service}
                                        </Text>
                                        <View className={`w-6 h-6 rounded-full items-center justify-center ${
                                            isSelected ? 'bg-primary' : 'border-2 border-slate-300'
                                        }`} style={isSelected ? { backgroundColor: COLORS.primary } : {}}>
                                            {isSelected && <Feather name="check" size={14} color="white" />}
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    <View className="h-2 bg-slate-50" />

                    {/* Select Date */}
                    <View className="px-5 py-5">
                        <Text className="font-cairo-bold text-slate-900 text-lg text-right mb-4">
                            اختر التاريخ
                        </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 12 }}
                            style={{ transform: [{ scaleX: -1 }] }}
                        >
                            {AVAILABLE_DATES.map((date) => {
                                const isSelected = selectedDate === date.id;
                                return (
                                    <TouchableOpacity
                                        key={date.id}
                                        onPress={() => date.available && setSelectedDate(date.id)}
                                        disabled={!date.available}
                                        className={`w-20 py-4 rounded-2xl items-center ${
                                            isSelected
                                                ? 'bg-primary'
                                                : date.available
                                                ? 'bg-white border border-slate-200'
                                                : 'bg-slate-100'
                                        }`}
                                        style={[
                                            { transform: [{ scaleX: -1 }] },
                                            isSelected ? { backgroundColor: COLORS.primary } : {}
                                        ]}
                                    >
                                        <Text className={`font-cairo-medium text-xs ${
                                            isSelected ? 'text-white' : date.available ? 'text-slate-500' : 'text-slate-400'
                                        }`}>
                                            {date.day}
                                        </Text>
                                        <Text className={`font-cairo-bold text-2xl ${
                                            isSelected ? 'text-white' : date.available ? 'text-slate-900' : 'text-slate-400'
                                        }`}>
                                            {date.date}
                                        </Text>
                                        <Text className={`font-cairo-medium text-xs ${
                                            isSelected ? 'text-white/80' : date.available ? 'text-slate-400' : 'text-slate-300'
                                        }`}>
                                            {date.month}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    <View className="h-2 bg-slate-50" />

                    {/* Select Time */}
                    <View className="px-5 py-5">
                        <Text className="font-cairo-bold text-slate-900 text-lg text-right mb-4">
                            اختر الوقت
                        </Text>
                        <View className="flex-row-reverse flex-wrap gap-3">
                            {AVAILABLE_TIMES.map((time) => {
                                const isSelected = selectedTime === time.id;
                                return (
                                    <TouchableOpacity
                                        key={time.id}
                                        onPress={() => time.available && setSelectedTime(time.id)}
                                        disabled={!time.available}
                                        className={`px-5 py-3 rounded-xl ${
                                            isSelected
                                                ? 'bg-primary'
                                                : time.available
                                                ? 'bg-white border border-slate-200'
                                                : 'bg-slate-100'
                                        }`}
                                        style={isSelected ? { backgroundColor: COLORS.primary } : {}}
                                    >
                                        <Text className={`font-cairo-bold text-sm ${
                                            isSelected ? 'text-white' : time.available ? 'text-slate-700' : 'text-slate-400'
                                        }`}>
                                            {time.time}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    <View className="h-2 bg-slate-50" />

                    {/* Contact Method */}
                    <View className="px-5 py-5">
                        <Text className="font-cairo-bold text-slate-900 text-lg text-right mb-4">
                            طريقة التواصل المفضلة
                        </Text>
                        <View className="flex-row-reverse gap-3">
                            {CONTACT_METHODS.map((method) => {
                                const isSelected = selectedContactMethod === method.id;
                                return (
                                    <TouchableOpacity
                                        key={method.id}
                                        onPress={() => setSelectedContactMethod(method.id)}
                                        className={`flex-1 flex-row-reverse items-center justify-center gap-2 py-4 rounded-xl border ${
                                            isSelected ? 'border-primary bg-primary/5' : 'border-slate-200'
                                        }`}
                                        style={isSelected ? { borderColor: COLORS.primary } : {}}
                                    >
                                        <Feather
                                            name={method.icon as any}
                                            size={18}
                                            color={isSelected ? COLORS.primary : COLORS.textLight}
                                        />
                                        <Text className={`font-cairo-medium text-sm ${
                                            isSelected ? 'text-primary' : 'text-slate-600'
                                        }`} style={isSelected ? { color: COLORS.primary } : {}}>
                                            {method.label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    <View className="h-2 bg-slate-50" />

                    {/* Message */}
                    <View className="px-5 py-5">
                        <Text className="font-cairo-bold text-slate-900 text-lg text-right mb-4">
                            رسالة للمقدم (اختياري)
                        </Text>
                        <TextInput
                            className="bg-slate-50 rounded-xl px-4 py-3 text-right font-cairo-medium text-base text-slate-800"
                            placeholder="اكتب وصف للمشروع أو أي ملاحظات..."
                            placeholderTextColor="#94a3b8"
                            value={message}
                            onChangeText={setMessage}
                            multiline
                            numberOfLines={4}
                            style={{ minHeight: 100, textAlignVertical: 'top' }}
                        />
                    </View>

                    {/* Booking Summary */}
                    {canSubmit && (
                        <View className="mx-5 p-4 bg-slate-50 rounded-2xl">
                            <Text className="font-cairo-bold text-slate-900 text-base text-right mb-3">ملخص الحجز</Text>
                            <View className="gap-2">
                                <View className="flex-row-reverse justify-between">
                                    <Text className="font-cairo-medium text-slate-500 text-sm">الخدمات</Text>
                                    <Text className="font-cairo-medium text-slate-800 text-sm">{selectedServices.size} خدمة</Text>
                                </View>
                                <View className="flex-row-reverse justify-between">
                                    <Text className="font-cairo-medium text-slate-500 text-sm">التاريخ</Text>
                                    <Text className="font-cairo-medium text-slate-800 text-sm">
                                        {AVAILABLE_DATES.find(d => d.id === selectedDate)?.date} {AVAILABLE_DATES.find(d => d.id === selectedDate)?.month}
                                    </Text>
                                </View>
                                <View className="flex-row-reverse justify-between">
                                    <Text className="font-cairo-medium text-slate-500 text-sm">الوقت</Text>
                                    <Text className="font-cairo-medium text-slate-800 text-sm">
                                        {AVAILABLE_TIMES.find(t => t.id === selectedTime)?.time}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>

            {/* Bottom - Swipe to Confirm */}
            <SafeAreaView edges={['bottom']} className="bg-white border-t border-slate-100">
                <View className="px-5 py-4">
                    <SwipeToConfirm
                        onConfirm={handleConfirmBooking}
                        label="اسحب لتأكيد الحجز"
                        disabled={!canSubmit}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}
