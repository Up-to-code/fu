// Search Results Screen - Products grid
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../../components/shared';
import { ProductGrid } from './_components';
import { COLORS } from '../../constants/theme';

const isTablet = Dimensions.get('window').width >= 768;

const RESULTS = [
    { id: '1', name: 'صوفا مودرن رمادي', price: 2499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500' },
    { id: '2', name: 'صوفا زاوية كبيرة', price: 3999, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500' },
    { id: '3', name: 'صوفا كلاسيك بيج', price: 1899, image: 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=500' },
];

export default function SearchResultsScreen() {
    const router = useRouter();
    const { q } = useLocalSearchParams<{ q: string }>();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Header */}
            <View className="flex-row-reverse items-center gap-3 px-5 py-3 border-b border-slate-100">
                <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-right" size={24} color={COLORS.text} /></TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row-reverse items-center bg-slate-50 rounded-xl px-4 py-2.5" onPress={() => router.replace(`/search?q=${encodeURIComponent(q || '')}` as any)}>
                    <Feather name="search" size={18} color="#94a3b8" />
                    <Text className="flex-1 text-right font-cairo-medium text-sm text-slate-600 mr-2">{q}</Text>
                    <Feather name="edit-2" size={14} color="#94a3b8" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/search/filter' as any)}><Feather name="sliders" size={22} color={COLORS.text} /></TouchableOpacity>
            </View>

            {/* Count */}
            <View className="px-5 py-3 border-b border-slate-50">
                <Text className="font-cairo-medium text-slate-500 text-sm text-right">{RESULTS.length} نتيجة لـ &quot;{q}&quot;</Text>
            </View>

            {/* Results */}
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 20 }}>
                {RESULTS.length > 0 ? (
                    <ProductGrid products={RESULTS} onProductPress={p => router.push(`/product/${p.id}`)} />
                ) : (
                    <EmptyState icon="search" title="لا توجد نتائج" description={`لم نجد منتجات تطابق "${q}"`} actionLabel="تصفح المنتجات" onAction={() => router.push('/(tabs)/home')} />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
