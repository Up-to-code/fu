// File: src/screens/checkout/CheckoutScreen.tsx
// Purpose: Checkout confirmation screen with order summary, delivery time, promo code, and notes

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeToConfirm } from '../../components/shared';
import { COLORS } from '../../constants/theme';

// Mock cart data (in real app, this would come from context/store)
const CART_ITEMS = [
    { id: '1', name: 'صوفا مودرن مريحة', price: 2499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', quantity: 1 },
    { id: '2', name: 'طاولة قهوة خشبية', price: 899, discount: 15, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', quantity: 2 },
];

const DELIVERY_TIMES = [
    { id: '1', label: 'اليوم', time: '4:00 - 8:00 مساءً', available: true },
    { id: '2', label: 'غداً', time: '10:00 ص - 2:00 م', available: true },
    { id: '3', label: 'غداً', time: '4:00 - 8:00 مساءً', available: true },
    { id: '4', label: 'بعد غد', time: '10:00 ص - 2:00 م', available: false },
];

// Mock addresses
const ADDRESSES = [
    { id: '1', name: 'المنزل', address: 'شارع الملك فهد، حي النخيل، الرياض', phone: '0501234567', isDefault: true },
    { id: '2', name: 'العمل', address: 'برج المملكة، الطابق 15، الرياض', phone: '0509876543', isDefault: false },
];

export default function CheckoutScreen() {
    const router = useRouter();
    const [selectedTime, setSelectedTime] = useState<string>('1');
    const [selectedAddress, setSelectedAddress] = useState<string>('1');
    const [showAddressMenu, setShowAddressMenu] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const [notes, setNotes] = useState('');

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const addressMenuAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    // Toggle address menu animation
    useEffect(() => {
        Animated.timing(addressMenuAnim, {
            toValue: showAddressMenu ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [showAddressMenu]);

    const currentAddress = ADDRESSES.find(a => a.id === selectedAddress) || ADDRESSES[0];

    // Calculate totals
    const subtotal = CART_ITEMS.reduce((sum, item) => {
        const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
        return sum + Math.round(price * item.quantity);
    }, 0);
    const shipping = subtotal >= 2000 ? 0 : 50;
    const promoDiscount = promoApplied ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal - promoDiscount + shipping;

    const handleApplyPromo = () => {
        if (promoCode.toLowerCase() === 'خصم10' || promoCode.toLowerCase() === 'save10') {
            setPromoApplied(true);
            Alert.alert('تم', 'تم تطبيق كود الخصم بنجاح!');
        } else {
            Alert.alert('خطأ', 'كود الخصم غير صالح');
        }
    };

    const handleConfirmOrder = () => {
        Alert.alert(
            'تم تأكيد الطلب! 🎉',
            'سيتم التواصل معك قريباً لتأكيد موعد التوصيل',
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
                    <Text className="font-cairo-bold text-xl text-slate-900">تأكيد الطلب</Text>
                    <View className="w-6" />
                </View>

                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Delivery Address */}
                    <Animated.View 
                        className="px-5 py-4"
                        style={{ 
                            opacity: fadeAnim, 
                            transform: [{ translateY: slideAnim }] 
                        }}
                    >
                        <View className="flex-row-reverse items-center justify-between mb-4">
                            <Text className="font-cairo-bold text-lg text-slate-900">
                                عنوان التوصيل
                            </Text>
                            <TouchableOpacity 
                                onPress={() => setShowAddressMenu(!showAddressMenu)}
                                className="flex-row-reverse items-center gap-1"
                            >
                                <Text className="font-cairo-medium text-sm" style={{ color: COLORS.primary }}>
                                    تغيير
                                </Text>
                                <Feather name="chevron-down" size={16} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                        
                        {/* Current Address Card */}
                        <View className="bg-slate-50 rounded-2xl p-4">
                            <View className="flex-row-reverse items-start gap-3">
                                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                                    <Feather name="map-pin" size={20} color={COLORS.primary} />
                                </View>
                                <View className="flex-1">
                                    <Text className="font-cairo-bold text-base text-slate-800 text-right">
                                        {currentAddress.name}
                                    </Text>
                                    <Text className="font-cairo-medium text-sm text-slate-600 text-right mt-1">
                                        {currentAddress.address}
                                    </Text>
                                    <Text className="font-cairo-medium text-xs text-slate-500 text-right mt-1">
                                        {currentAddress.phone}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Address Selection Menu */}
                        {showAddressMenu && (
                            <Animated.View 
                                className="mt-3 bg-white rounded-2xl border border-slate-200 overflow-hidden"
                                style={{
                                    opacity: addressMenuAnim,
                                    transform: [{
                                        translateY: addressMenuAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [-10, 0],
                                        })
                                    }]
                                }}
                            >
                                {ADDRESSES.map((addr, index) => (
                                    <TouchableOpacity
                                        key={addr.id}
                                        onPress={() => {
                                            setSelectedAddress(addr.id);
                                            setShowAddressMenu(false);
                                        }}
                                        className={`flex-row-reverse items-center gap-3 p-4 ${
                                            index < ADDRESSES.length - 1 ? 'border-b border-slate-100' : ''
                                        }`}
                                    >
                                        <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                                            selectedAddress === addr.id ? 'border-primary bg-primary' : 'border-slate-300'
                                        }`}>
                                            {selectedAddress === addr.id && (
                                                <View className="w-2 h-2 rounded-full bg-white" />
                                            )}
                                        </View>
                                        <View className="flex-1">
                                            <Text className="font-cairo-bold text-sm text-slate-800 text-right">
                                                {addr.name}
                                            </Text>
                                            <Text className="font-cairo-medium text-xs text-slate-500 text-right">
                                                {addr.address}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                                
                                {/* Add New Address */}
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowAddressMenu(false);
                                        router.push('/account/addresses' as any);
                                    }}
                                    className="flex-row-reverse items-center gap-3 p-4 bg-slate-50"
                                >
                                    <View className="w-5 h-5 rounded-full bg-primary/10 items-center justify-center">
                                        <Feather name="plus" size={14} color={COLORS.primary} />
                                    </View>
                                    <Text className="font-cairo-bold text-sm text-right" style={{ color: COLORS.primary }}>
                                        إضافة عنوان جديد
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        )}
                    </Animated.View>

                    <View className="h-2 bg-slate-50" />

                    {/* Order Summary */}
                    <Animated.View 
                        className="px-5 py-4"
                        style={{ 
                            opacity: fadeAnim, 
                            transform: [{ translateY: slideAnim }] 
                        }}
                    >
                        <Text className="font-cairo-bold text-lg text-slate-900 text-right mb-4">
                            ملخص الطلب
                        </Text>
                        {CART_ITEMS.map((item) => {
                            const itemPrice = item.discount 
                                ? Math.round(item.price * (1 - item.discount / 100)) 
                                : item.price;
                            return (
                                <View key={item.id} className="flex-row-reverse items-center mb-3">
                                    <Image
                                        source={{ uri: item.image }}
                                        className="w-14 h-14 rounded-xl bg-slate-100"
                                        resizeMode="cover"
                                    />
                                    <View className="flex-1 mr-3">
                                        <Text className="font-cairo-medium text-sm text-slate-800 text-right" numberOfLines={1}>
                                            {item.name}
                                        </Text>
                                        <Text className="font-cairo-medium text-xs text-slate-500 text-right">
                                            {item.quantity} × {itemPrice} ر.س
                                        </Text>
                                    </View>
                                    <Text className="font-cairo-bold text-sm" style={{ color: COLORS.primary }}>
                                        {itemPrice * item.quantity} ر.س
                                    </Text>
                                </View>
                            );
                        })}
                    </Animated.View>

                    <View className="h-2 bg-slate-50" />

                    {/* Delivery Time */}
                    <Animated.View 
                        className="px-5 py-4"
                        style={{ 
                            opacity: fadeAnim, 
                            transform: [{ translateY: slideAnim }] 
                        }}
                    >
                        <Text className="font-cairo-bold text-lg text-slate-900 text-right mb-4">
                            موعد التوصيل
                        </Text>
                        <View className="flex-row-reverse flex-wrap gap-3">
                            {DELIVERY_TIMES.map((time) => (
                                <TouchableOpacity
                                    key={time.id}
                                    onPress={() => time.available && setSelectedTime(time.id)}
                                    disabled={!time.available}
                                    className={`px-4 py-3 rounded-xl border ${
                                        selectedTime === time.id
                                            ? 'border-primary bg-primary/5'
                                            : time.available
                                            ? 'border-slate-200 bg-white'
                                            : 'border-slate-100 bg-slate-50'
                                    }`}
                                    style={{ minWidth: '45%' }}
                                >
                                    <Text
                                        className={`font-cairo-bold text-sm text-right ${
                                            selectedTime === time.id
                                                ? 'text-primary'
                                                : time.available
                                                ? 'text-slate-800'
                                                : 'text-slate-400'
                                        }`}
                                    >
                                        {time.label}
                                    </Text>
                                    <Text
                                        className={`font-cairo-medium text-xs text-right ${
                                            selectedTime === time.id
                                                ? 'text-primary/70'
                                                : time.available
                                                ? 'text-slate-500'
                                                : 'text-slate-300'
                                        }`}
                                    >
                                        {time.time}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Animated.View>

                    <View className="h-2 bg-slate-50" />

                    {/* Promo Code */}
                    <Animated.View 
                        className="px-5 py-4"
                        style={{ 
                            opacity: fadeAnim, 
                            transform: [{ translateY: slideAnim }] 
                        }}
                    >
                        <Text className="font-cairo-bold text-lg text-slate-900 text-right mb-4">
                            كود الخصم
                        </Text>
                        <View className="flex-row-reverse gap-3">
                            <TextInput
                                className="flex-1 bg-slate-50 rounded-xl px-4 py-3 text-right font-cairo-medium text-base"
                                placeholder="أدخل كود الخصم"
                                placeholderTextColor="#94a3b8"
                                value={promoCode}
                                onChangeText={setPromoCode}
                                editable={!promoApplied}
                            />
                            <TouchableOpacity
                                onPress={handleApplyPromo}
                                disabled={promoApplied || !promoCode}
                                className={`px-5 py-3 rounded-xl ${
                                    promoApplied
                                        ? 'bg-green-500'
                                        : promoCode
                                        ? 'bg-primary'
                                        : 'bg-slate-200'
                                }`}
                            >
                                <Text className="font-cairo-bold text-sm text-white">
                                    {promoApplied ? '✓ تم' : 'تطبيق'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {promoApplied && (
                            <Text className="font-cairo-medium text-sm text-green-600 text-right mt-2">
                                تم تطبيق خصم 10%
                            </Text>
                        )}
                    </Animated.View>

                    <View className="h-2 bg-slate-50" />

                    {/* Order Notes */}
                    <Animated.View 
                        className="px-5 py-4"
                        style={{ 
                            opacity: fadeAnim, 
                            transform: [{ translateY: slideAnim }] 
                        }}
                    >
                        <Text className="font-cairo-bold text-lg text-slate-900 text-right mb-4">
                            ملاحظات الطلب
                        </Text>
                        <TextInput
                            className="bg-slate-50 rounded-xl px-4 py-3 text-right font-cairo-medium text-base"
                            placeholder="أضف ملاحظات للطلب (اختياري)"
                            placeholderTextColor="#94a3b8"
                            value={notes}
                            onChangeText={setNotes}
                            multiline
                            numberOfLines={3}
                            style={{ minHeight: 80, textAlignVertical: 'top' }}
                        />
                    </Animated.View>

                    <View className="h-2 bg-slate-50" />

                    {/* Price Breakdown */}
                    <Animated.View 
                        className="px-5 py-4"
                        style={{ 
                            opacity: fadeAnim, 
                            transform: [{ translateY: slideAnim }] 
                        }}
                    >
                        <Text className="font-cairo-bold text-lg text-slate-900 text-right mb-4">
                            تفاصيل السعر
                        </Text>
                        
                        <View className="flex-row-reverse justify-between mb-2">
                            <Text className="font-cairo-medium text-sm text-slate-600">المجموع الفرعي</Text>
                            <Text className="font-cairo-medium text-sm text-slate-800">{subtotal} ر.س</Text>
                        </View>
                        
                        {promoApplied && (
                            <View className="flex-row-reverse justify-between mb-2">
                                <Text className="font-cairo-medium text-sm text-green-600">خصم الكود</Text>
                                <Text className="font-cairo-medium text-sm text-green-600">-{promoDiscount} ر.س</Text>
                            </View>
                        )}
                        
                        <View className="flex-row-reverse justify-between mb-3">
                            <Text className="font-cairo-medium text-sm text-slate-600">الشحن</Text>
                            <Text className="font-cairo-medium text-sm text-slate-800">
                                {shipping === 0 ? 'مجاني' : `${shipping} ر.س`}
                            </Text>
                        </View>
                        
                        <View className="h-px bg-slate-200 my-3" />
                        
                        <View className="flex-row-reverse justify-between">
                            <Text className="font-cairo-bold text-base text-slate-900">الإجمالي</Text>
                            <Text className="font-cairo-bold text-xl" style={{ color: COLORS.primary }}>
                                {total} ر.س
                            </Text>
                        </View>
                    </Animated.View>
                </ScrollView>
            </SafeAreaView>

            {/* Bottom - Swipe to Confirm */}
            <SafeAreaView edges={['bottom']} className="bg-white border-t border-slate-100">
                <View className="px-5 py-4">
                    <SwipeToConfirm
                        onConfirm={handleConfirmOrder}
                        label="اسحب لتأكيد الطلب"
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}
