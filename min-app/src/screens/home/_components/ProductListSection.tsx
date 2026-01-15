// File: src/screens/home/_components/ProductListSection.tsx
// Purpose: Simplified product list section using FlashList for better performance

import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { COLORS } from '../../../constants/theme';
import { IProductCardProps, ProductCard } from '../../shared';
import { ProductListSectionProps } from './types/home';
import { styles } from './StyleSheets/ProductListSection.styles';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const ESTIMATED_ITEM_SIZE = isTablet ? 200 : 170;

export const ProductListSection: React.FC<ProductListSectionProps> = ({ title, products, onToggleFavorite }) => {
    const router = useRouter();

    const renderItem = ({ item }: { item: IProductCardProps }) => (
        <View style={styles.itemWrapper}>
            <ProductCard
                product={item}
                variant="horizontal"
                onPress={() => router.push(`/product/${item.id}`)}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Link href={`/category/${title}` as any} asChild>
                    <TouchableOpacity style={styles.viewAllButton}>
                        <Text style={styles.viewAllText}>عرض الكل</Text>
                        <Feather name="chevron-left" size={16} color={COLORS.textLight} />
                    </TouchableOpacity>
                </Link>
            </View>

            {/* Products */}
            <View style={styles.listContainer}>
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
