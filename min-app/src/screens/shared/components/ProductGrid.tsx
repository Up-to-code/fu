// File: src/screens/shared/components/ProductGrid.tsx
// Purpose: Responsive product grid wrapper with FlashList for performance

import React, { useCallback, useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { isTablet } from '../../../utils/responsive';
import { ProductCard } from './ProductCard';
import { ProductGridProps, ProductHorizontalListProps, IProductCardProps } from '../types/card';
import { styles } from '../StyleSheets/ProductGrid.styles';

const { width } = Dimensions.get('window');

export const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    onProductPress,
    onFavorite,
    numColumns,
}) => {
    const columns = numColumns || (isTablet ? 3 : 2);
    const cardWidth = useMemo(() => columns === 3 ? '31%' : '48%', [columns]);
    
    // Calculate estimated item size based on screen width and columns
    const estimatedItemSize = useMemo(() => {
        const itemWidth = (width - 40) / columns; // Account for padding
        return itemWidth * 1.5; // Approximate height (width * aspect ratio)
    }, [columns]);

    const renderItem = useCallback(({ item }: { item: IProductCardProps }) => (
        <View style={[styles.cardWrapper, { width: cardWidth }]}>
            <ProductCard
                product={item}
                onPress={() => onProductPress?.(item)}
                onFavorite={() => onFavorite?.(item)}
            />
        </View>
    ), [cardWidth, onProductPress, onFavorite]);

    const keyExtractor = useCallback((item: IProductCardProps) => item.id, []);

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
    const estimatedItemSize = useMemo(() => isTablet ? 200 : 170, []);

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
