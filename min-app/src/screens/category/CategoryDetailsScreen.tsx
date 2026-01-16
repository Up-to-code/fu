// File: src/screens/category/CategoryDetailsScreen.tsx
// Purpose: Category Products Screen

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../shared';
import { Header, ProductGrid, IProductCardProps, LoadingSpinner } from '../shared';
import { COLORS } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { useCategoryProducts } from './_hooks';
import { CategoryDetailsScreenProps } from './types/category';
import { getStyles } from './StyleSheets/CategoryDetailsScreen.styles';

export default function CategoryDetailsScreen({ id, name, fromSearch, searchQuery }: CategoryDetailsScreenProps) {
    const router = useRouter();
    const { products, isLoading } = useCategoryProducts(id);
    const { getSize, iconSize } = useResponsive();
    const styles = getStyles(getSize);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleProductPress = (product: IProductCardProps) => {
        const queryParams: Record<string, string> = {};
        if (fromSearch === 'true') {
            queryParams.fromSearch = 'true';
            if (searchQuery) {
                queryParams.searchQuery = searchQuery;
            }
        }
        router.push({
            pathname: `/product/${product.id}`,
            params: queryParams
        } as any);
    };

    const handleBack = () => {
        if (fromSearch === 'true' && searchQuery) {
            router.push({
                pathname: '/search/results',
                params: { q: searchQuery }
            });
        } else {
            router.back();
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Header
                title={name || 'التصنيف'}
                showBack
                onBack={handleBack}
                rightAction={
                    <TouchableOpacity
                        onPress={() => setIsFavorite(!isFavorite)}
                        style={styles.favoriteButton}
                        activeOpacity={0.7}
                    >
                        <Feather
                            name={isFavorite ? 'heart' : 'heart'}
                            size={iconSize.md}
                            color={isFavorite ? COLORS.primary : COLORS.text}
                            fill={isFavorite ? undefined : COLORS.primary}
                        />
                    </TouchableOpacity>
                }
            />
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
            >
                {isLoading ? (
                    <LoadingSpinner message="جاري التحميل..." />
                ) : products.length > 0 ? (
                    <ProductGrid
                        products={products}
                        onProductPress={handleProductPress}
                    />
                ) : (
                    <EmptyState
                        icon="package"
                        title="لا توجد منتجات"
                        description="لم يتم إضافة منتجات لهذا التصنيف بعد"
                        actionLabel="تصفح التصنيفات"
                        onAction={() => router.push('/(tabs)/categories')}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
