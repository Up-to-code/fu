// File: src/components/home/ProductListSection.tsx
// Purpose: Simplified product list section using shared components

import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { Product, ProductCard } from '../../../components/shared';

interface ProductListSectionProps {
    title: string;
    products: Product[];
    onToggleFavorite?: (id: string) => void;
}

export const ProductListSection = ({ title, products, onToggleFavorite }: ProductListSectionProps) => {
    const router = useRouter();

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
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                style={{ transform: [{ scaleX: -1 }] }}
            >
                {products.map((product) => (
                    <View key={product.id} style={{ transform: [{ scaleX: -1 }], marginLeft: 12 }}>
                        <ProductCard
                            product={product}
                            variant="horizontal"
                            onPress={() => router.push(`/product/${product.id}`)}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
