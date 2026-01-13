// File: src/screens/favorites/FavoritesScreen.tsx
// Purpose: Favorites Screen with tabs for Products and Services

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Animated, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../../components/shared';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const numColumns = 3;
const gap = 2;
const itemSize = (width - gap * (numColumns - 1) - 40) / numColumns;

const FAVORITE_PRODUCTS = [
    { id: '1', name: 'صوفا مودرن مريحة', price: 2499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80' },
    { id: '2', name: 'طاولة قهوة خشبية', price: 899, discount: 15, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80' },
    { id: '3', name: 'مصباح أرضي ذهبي', price: 450, image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80' },
    { id: '4', name: 'سرير مزدوج', price: 1299, image: 'https://images.unsplash.com/photo-1505693416388-b0346ef38604?w=500&q=80' },
    { id: '5', name: 'كرسي مكتبي', price: 599, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80' },
    { id: '6', name: 'طاولة طعام', price: 1899, image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&q=80' },
];

const FAVORITE_SERVICES = [
    {
        id: '1',
        name: 'أحمد المصمم',
        category: 'تصميم داخلي',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        rating: 4.9,
        price: 'من 500 ر.س',
        location: 'الرياض',
        verified: true,
    },
    {
        id: '3',
        name: 'سارة للديكور',
        category: 'استشارات ديكور',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        rating: 4.7,
        price: 'من 200 ر.س',
        location: 'الدمام',
        verified: true,
    },
];

type TabType = 'products' | 'services';

export default function FavoritesScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>('products');

    const TabButton = ({ tab, label, count }: { tab: TabType; label: string; count: number }) => (
        <TouchableOpacity
            onPress={() => setActiveTab(tab)}
            className={`flex-1 py-3 items-center border-b-2 ${
                activeTab === tab ? 'border-primary' : 'border-transparent'
            }`}
            style={activeTab === tab ? { borderBottomColor: COLORS.primary } : {}}
        >
            <Text 
                className={`font-cairo-bold text-sm ${activeTab === tab ? 'text-primary' : 'text-slate-500'}`}
                style={activeTab === tab ? { color: COLORS.primary } : {}}
            >
                {label} ({count})
            </Text>
        </TouchableOpacity>
    );

    const renderProductsGrid = () => {
        if (FAVORITE_PRODUCTS.length === 0) {
            return (
                <EmptyState
                    icon="heart"
                    title="قائمة المفضلة فارغة"
                    description="لم تقم بإضافة أي منتجات للمفضلة بعد"
                    actionLabel="تصفح المنتجات"
                    onAction={() => router.push('/(tabs)/home')}
                />
            );
        }

        return (
            <View className="flex-row flex-wrap" style={{ marginHorizontal: -gap / 2 }}>
                {FAVORITE_PRODUCTS.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => router.push(`/product/${item.id}` as any)}
                        style={{
                            width: itemSize,
                            height: itemSize,
                            margin: gap / 2,
                        }}
                        activeOpacity={0.9}
                    >
                        <View className="relative w-full h-full rounded-lg overflow-hidden bg-slate-100">
                            <Image
                                source={{ uri: item.image }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                            <View className="absolute top-2 right-2">
                                <View className="w-7 h-7 bg-black/40 rounded-full items-center justify-center">
                                    <Feather name="heart" size={14} color="#EF4444" />
                                </View>
                            </View>
                            <View className="absolute bottom-0 left-0 right-0 h-20 bg-black/50" />
                            <View className="absolute bottom-0 left-0 right-0 p-2">
                                <Text className="text-white font-cairo-bold text-xs text-right" numberOfLines={1}>
                                    {item.name}
                                </Text>
                                <Text className="text-white/90 font-cairo-medium text-[10px] text-right">
                                    {item.price.toLocaleString()} ر.س
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const renderServicesList = () => {
        if (FAVORITE_SERVICES.length === 0) {
            return (
                <EmptyState
                    icon="briefcase"
                    title="لا توجد خدمات محفوظة"
                    description="لم تقم بحفظ أي مقدمي خدمات بعد"
                    actionLabel="تصفح الخدمات"
                    onAction={() => router.push('/services' as any)}
                />
            );
        }

        return (
            <View className="gap-4">
                {FAVORITE_SERVICES.map((provider) => (
                    <TouchableOpacity
                        key={provider.id}
                        onPress={() => router.push(`/services/${provider.id}` as any)}
                        activeOpacity={0.9}
                        className="bg-white rounded-2xl p-4 border border-slate-100"
                    >
                        <View className="flex-row-reverse gap-4">
                            {/* Avatar */}
                            <View className="relative">
                                <View className="w-16 h-16 rounded-full bg-slate-100 overflow-hidden">
                                    <Image
                                        source={{ uri: provider.avatar }}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />
                                </View>
                                {provider.verified && (
                                    <View className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full items-center justify-center border-2 border-white">
                                        <Feather name="check" size={10} color="white" />
                                    </View>
                                )}
                            </View>

                            {/* Info */}
                            <View className="flex-1 justify-center">
                                <View className="flex-row-reverse justify-between items-start">
                                    <View className="flex-1">
                                        <Text className="font-cairo-bold text-slate-900 text-base text-right mb-1">
                                            {provider.name}
                                        </Text>
                                        <Text className="font-cairo-medium text-slate-500 text-xs text-right">
                                            {provider.category} • {provider.location}
                                        </Text>
                                    </View>
                                    {/* Heart - Always filled */}
                                    <TouchableOpacity className="p-1">
                                        <Feather name="heart" size={20} color="#EF4444" />
                                    </TouchableOpacity>
                                </View>

                                <View className="flex-row-reverse items-center justify-between mt-3 pt-3 border-t border-slate-50">
                                    <View className="flex-row-reverse items-center gap-1.5">
                                        <Feather name="star" size={14} color="#F59E0B" />
                                        <Text className="font-cairo-bold text-slate-900 text-sm">{provider.rating}</Text>
                                    </View>
                                    <Text className="font-cairo-bold text-sm" style={{ color: COLORS.primary }}>{provider.price}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Header */}
            <View className="px-5 py-4 border-b border-slate-100">
                <Text className="font-cairo-bold text-xl text-slate-900 text-right">المفضلة</Text>
            </View>

            {/* Tabs */}
            <View className="flex-row-reverse px-5 bg-white border-b border-slate-100">
                <TabButton tab="products" label="المنتجات" count={FAVORITE_PRODUCTS.length} />
                <TabButton tab="services" label="الخدمات" count={FAVORITE_SERVICES.length} />
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    padding: 20,
                    paddingBottom: 20,
                }}
                showsVerticalScrollIndicator={false}
            >
                {activeTab === 'products' ? renderProductsGrid() : renderServicesList()}
            </ScrollView>
        </SafeAreaView>
    );
}
