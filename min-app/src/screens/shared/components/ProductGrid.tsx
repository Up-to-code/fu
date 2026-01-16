// File: src/screens/shared/components/ProductGrid.tsx
// Purpose: Responsive product grid wrapper - uses View+flexWrap for ScrollView compatibility

import React, { useMemo } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useResponsive } from '../../../hooks/useResponsive';
import { ProductCard } from './ProductCard';
import { ProductGridProps, ProductHorizontalListProps, IProductCardProps } from '../types/card';
import { getStyles } from '../StyleSheets/ProductGrid.styles';

export const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    onProductPress,
    onFavorite,
    numColumns,
    useScrollView = true, // Default to true for ScrollView compatibility
}) => {
    const { width, isTablet, padding, getSize } = useResponsive();
    const styles = getStyles(getSize);
    const columns = numColumns || (isTablet ? 3 : 2);
    const cardWidth = useMemo(() => columns === 3 ? '31%' : '48%', [columns]);
    
    // Calculate estimated item size based on screen width and columns
    const estimatedItemSize = useMemo(() => {
        const itemWidth = (width - padding * 2) / columns; // Account for padding
        return itemWidth * 1.5; // Approximate height (width * aspect ratio)
    }, [columns, width, padding]);

    // Use View + flexWrap when inside ScrollView (more reliable)
    if (useScrollView) {
        return (
            <View style={styles.gridContainer}>
                {products.map((item) => (
                    <View key={item.id} style={[styles.cardWrapper, { width: cardWidth }]}>
                        <ProductCard
                            product={item}
                            onPress={() => onProductPress?.(item)}
                            onFavorite={() => onFavorite?.(item)}
                        />
                    </View>
                ))}
            </View>
        );
    }

    // Use FlashList for standalone usage (not inside ScrollView)
    const renderItem = React.useCallback(({ item }: { item: IProductCardProps }) => (
        <View style={[styles.cardWrapper, { width: cardWidth }]}>
            <ProductCard
                product={item}
                onPress={() => onProductPress?.(item)}
                onFavorite={() => onFavorite?.(item)}
            />
        </View>
    ), [cardWidth, onProductPress, onFavorite]);

    const keyExtractor = React.useCallback((item: IProductCardProps) => item.id, []);

    return (
        <View style={styles.gridContainer}>
            <FlashList
                data={products}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                numColumns={columns}
                estimatedItemSize={estimatedItemSize}
                contentContainerStyle={styles.gridContainer}
            />
        </View>
    );
};

export const ProductHorizontalList: React.FC<ProductHorizontalListProps> = ({
    products,
    onProductPress,
    onFavorite,
}) => {
    const { getSize, isTablet } = useResponsive();
    const estimatedItemSize = useMemo(() => getSize(150, 170, 180, 200, 220), [getSize]);

    const renderItem = useCallback(({ item }: { item: IProductCardProps }) => (
        <View style={[styles.horizontalCardWrapper, { transform: [{ scaleX: -1 }] }]}>
            <ProductCard
                product={item}
                variant="horizontal"
                onPress={() => onProductPress?.(item)}
                onFavorite={() => onFavorite?.(item)}
            />
        </View>
    ), [onProductPress, onFavorite]);

    const keyExtractor = useCallback((item: IProductCardProps) => item.id, []);

    return (
        <View style={{ transform: [{ scaleX: -1 }] }}>
            <FlashList
                data={products}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                horizontal
                estimatedItemSize={estimatedItemSize}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContainer}
            />
        </View>
    );
};

export default ProductGrid;
