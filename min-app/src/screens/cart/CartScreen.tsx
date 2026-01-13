// File: src/screens/cart/CartScreen.tsx
// Purpose: Shopping Cart Screen

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../../components/shared';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    discount?: number;
}

const MOCK_CART: CartItem[] = [
    { id: '1', name: 'صوفا مودرن مريحة', price: 2499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', quantity: 1 },
    { id: '2', name: 'طاولة قهوة خشبية', price: 899, discount: 15, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', quantity: 2 },
];

export default function CartScreen() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_CART);

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const getItemTotal = (item: CartItem) => {
        const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
        return Math.round(price * item.quantity);
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + getItemTotal(item), 0);
    const isEmpty = cartItems.length === 0;

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1" edges={['top']}>
                {/* Simple Header */}
                <View className="flex-row-reverse items-center justify-between px-5 py-4 border-b border-slate-100">
                    <Text className="font-cairo-bold text-xl text-slate-900">السلة</Text>
                    {!isEmpty && (
                        <Text className="font-cairo-medium text-slate-500 text-sm">{cartItems.length} منتجات</Text>
                    )}
                </View>

                {/* Content */}
                {isEmpty ? (
                    <View className="flex-1">
                        <EmptyState
                            icon="shopping-cart"
                            title="السلة فارغة"
                            description="لم تقم بإضافة أي منتجات للسلة بعد"
                            actionLabel="تصفح المنتجات"
                            onAction={() => router.push('/(tabs)/home')}
                        />
                    </View>
                ) : (
                    <ScrollView
                        className="flex-1"
                        contentContainerStyle={{
                            paddingHorizontal: 20,
                            paddingTop: 16,
                            paddingBottom: 16,
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        {cartItems.map((item) => (
                            <View
                                key={item.id}
                                className="flex-row-reverse bg-gray-50 rounded-2xl p-3 mb-3"
                            >
                                {/* Image */}
                                <Image
                                    source={{ uri: item.image }}
                                    className="w-20 h-20 rounded-xl bg-slate-200"
                                    resizeMode="cover"
                                />

                                {/* Content */}
                                <View className="flex-1 mr-3 justify-between">
                                    {/* Name & Delete */}
                                    <View className="flex-row-reverse items-start justify-between">
                                        <Text 
                                            className="font-cairo-bold text-slate-800 text-right text-sm flex-1"
                                            numberOfLines={2}
                                        >
                                            {item.name}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => removeItem(item.id)}
                                            className="w-7 h-7 bg-red-50 rounded-full items-center justify-center ml-2"
                                        >
                                            <Feather name="trash-2" size={14} color="#EF4444" />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Price & Quantity */}
                                    <View className="flex-row-reverse items-center justify-between mt-2">
                                        <View className="flex-row-reverse items-center gap-2">
                                            <Text className="font-cairo-bold text-base" style={{ color: COLORS.primary }}>
                                                {getItemTotal(item)} ر.س
                                            </Text>
                                            {item.discount && (
                                                <Text className="text-slate-400 text-xs line-through">
                                                    {item.price * item.quantity}
                                                </Text>
                                            )}
                                        </View>

                                        {/* Quantity Controls */}
                                        <View className="flex-row items-center bg-white rounded-lg">
                                            <TouchableOpacity
                                                onPress={() => updateQuantity(item.id, -1)}
                                                className="w-8 h-8 items-center justify-center"
                                            >
                                                <Feather name="minus" size={14} color={COLORS.text} />
                                            </TouchableOpacity>
                                            <Text className="text-sm font-cairo-bold text-slate-800 w-6 text-center">
                                                {item.quantity}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => updateQuantity(item.id, 1)}
                                                className="w-8 h-8 items-center justify-center"
                                            >
                                                <Feather name="plus" size={14} color={COLORS.text} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </SafeAreaView>

            {/* Bottom Bar - Fixed in normal flow */}
            <View className="bg-white border-t border-slate-100">
                <View className="flex-row-reverse items-center px-5 py-3 gap-4">
                    {/* Total */}
                    <View>
                        <Text className="text-slate-500 font-cairo-medium text-right text-xs">
                            الإجمالي
                        </Text>
                        <Text 
                            className="font-cairo-bold text-right text-lg" 
                            style={{ color: isEmpty ? '#94a3b8' : COLORS.primary }}
                        >
                            {cartTotal} ر.س
                        </Text>
                    </View>
                    
                    {/* Button */}
                    <TouchableOpacity
                        className="flex-1 py-3.5 rounded-xl flex-row-reverse items-center justify-center gap-2"
                        style={{ 
                            backgroundColor: isEmpty ? '#e2e8f0' : COLORS.primary 
                        }}
                        activeOpacity={0.8}
                        onPress={() => !isEmpty && router.push('/checkout')}
                        disabled={isEmpty}
                    >
                        <Text 
                            className="font-cairo-bold text-base"
                            style={{ color: isEmpty ? '#94a3b8' : 'white' }}
                        >
                            إتمام الطلب
                        </Text>
                        <Feather name="arrow-left" size={18} color={isEmpty ? '#94a3b8' : 'white'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
