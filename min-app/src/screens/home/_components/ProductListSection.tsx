// File: src/screens/home/_components/ProductListSection.tsx
// Purpose: Simplified product list section using FlashList for better performance

import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { COLORS } from '../../../constants/theme';
import { IProductCardProps, ProductCard } from '../../shared';
import { ProductListSectionProps } from './types/home';
import { styles } from './StyleSheets/ProductListSection.styles';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const ESTIMATED_ITEM_SIZE = isTablet ? 200 : 170;

const ProductListSectionComponent: React.FC<ProductListSectionProps> = ({ title, products, onToggleFavorite }) => {
    const router = useRouter();

    const handleProductPress = useCallback((productId: string) => {
        router.push(`/product/${productId}`);
    }, [router]);

    const renderItem = useCallback(({ item }: { item: IProductCardProps }) => (
        <View style={styles.itemWrapper}>
            <ProductCard
                product={item}
                variant="horizontal"
                onPress={() => handleProductPress(item.id)}
                onFavorite={onToggleFavorite ? () => onToggleFavorite(item.id) : undefined}
            />
        </View>
    ), [handleProductPress, onToggleFavorite]);

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

// Memoize ProductListSection to prevent unnecessary re-renders
export const ProductListSection = React.memo(ProductListSectionComponent, (prevProps, nextProps) => {
    return (
        prevProps.title === nextProps.title &&
        prevProps.products.length === nextProps.products.length &&
        prevProps.products.every((product, index) => 
            product.id === nextProps.products[index]?.id &&
            product.isFavorite === nextProps.products[index]?.isFavorite
        ) &&
        prevProps.onToggleFavorite === nextProps.onToggleFavorite
    );
});
