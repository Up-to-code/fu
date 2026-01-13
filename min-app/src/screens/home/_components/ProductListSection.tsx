// File: src/components/home/ProductListSection.tsx
// Purpose: Simplified product list section using FlashList for better performance

import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { COLORS } from '../../../constants/theme';
import { Product, ProductCard } from '../../../components/shared';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const ESTIMATED_ITEM_SIZE = isTablet ? 200 : 170;

interface ProductListSectionProps {
    title: string;
    products: Product[];
    onToggleFavorite?: (id: string) => void;
}

export const ProductListSection = ({ title, products, onToggleFavorite }: ProductListSectionProps) => {
    const router = useRouter();

    const renderItem = ({ item }: { item: Product }) => (
        <View style={{ marginLeft: 12, transform: [{ scaleX: -1 }] }}>
            <ProductCard
                product={item}
                variant="horizontal"
                onPress={() => router.push(`/product/${item.id}`)}
            />
        </View>
    );

    return (
        <View className="mb-6">
            {/* Header */}
            <View className="flex-row-reverse justify-between items-center px-5 mb-4">
                <Text className="text-base font-cairo-bold text-slate-800">{title}</Text>
                <Link href={`/category/${title}` as any} asChild>
                    <TouchableOpacity className="flex-row-reverse items-center gap-1">
                        <Text className="text-sm font-cairo-medium text-slate-500">عرض الكل</Text>
                        <Feather name="chevron-left" size={16} color={COLORS.textLight} />
                    </TouchableOpacity>
                </Link>
            </View>

            {/* Products */}
            <View style={{ height: isTablet ? 280 : 240, transform: [{ scaleX: -1 }] }}>
                <FlashList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    estimatedItemSize={ESTIMATED_ITEM_SIZE}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                />
            </View>
        </View>
    );
};
