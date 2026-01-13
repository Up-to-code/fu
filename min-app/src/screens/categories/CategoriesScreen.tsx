// File: src/screens/categories/CategoriesScreen.tsx
// Purpose: Categories Grid Screen - Using Shared Header

import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../components/shared';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const cardWidth = isTablet ? '31%' : '48%';

const CATEGORIES = [
    { id: 1, name: 'sofas', label: 'كنب', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', count: 120 },
    { id: 2, name: 'beds', label: 'أسرة', image: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=500&q=80', count: 85 },
    { id: 3, name: 'tables', label: 'طاولات', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&q=80', count: 65 },
    { id: 4, name: 'chairs', label: 'كراسي', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', count: 240 },
    { id: 5, name: 'lighting', label: 'إضاءة', image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', count: 45 },
    { id: 6, name: 'decor', label: 'ديكور', image: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?w=500&q=80', count: 180 },
];

export default function CategoriesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Shared Header */}
            <ScreenHeader
                title="التصنيفات"
                subtitle="اكتشف مجموعاتنا"
                icon="grid"
            />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    paddingBottom: 20,
                    paddingHorizontal: 20,
                    paddingTop: 16,
                }}
            >
                <View className="flex-row flex-wrap justify-between" style={{ direction: 'rtl' }}>
                    {CATEGORIES.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={{ width: cardWidth }}
                            className="mb-4 bg-white rounded-2xl border border-slate-100 overflow-hidden"
                            activeOpacity={0.8}
                            onPress={() => router.push({
                                pathname: '/category/[id]',
                                params: { id: category.id, name: category.label }
                            })}
                        >
                            <View className={`bg-slate-100 ${isTablet ? 'h-44' : 'h-32'}`}>
                                <Image
                                    source={{ uri: category.image }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                            </View>
                            <View className={`items-end ${isTablet ? 'p-5' : 'p-4'}`}>
                                <Text className={`font-cairo-bold text-slate-800 mb-1 ${isTablet ? 'text-lg' : 'text-base'}`}>
                                    {category.label}
                                </Text>
                                <Text className={`text-slate-500 font-cairo-medium ${isTablet ? 'text-sm' : 'text-xs'}`}>
                                    {category.count} منتج
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
