// File: src/screens/shared/components/ProductGrid.tsx
// Purpose: Responsive product grid wrapper

import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { isTablet } from '../../../utils/responsive';
import { ProductCard } from './ProductCard';
import { ProductGridProps, ProductHorizontalListProps } from '../types/card';
import { styles } from '../StyleSheets/ProductGrid.styles';

export const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    onProductPress,
    onFavorite,
    numColumns,
}) => {
    const columns = numColumns || (isTablet ? 3 : 2);
    const cardWidth = columns === 3 ? '31%' : '48%';

    return (
        <View style={styles.gridContainer}>
            {products.map((product) => (
                <View key={product.id} style={[styles.cardWrapper, { width: cardWidth }]}>
                    <ProductCard
                        product={product}
                        onPress={() => onProductPress?.(product)}
                        onFavorite={() => onFavorite?.(product)}
                    />
                </View>
            ))}
        </View>
    );
};

export const ProductHorizontalList: React.FC<ProductHorizontalListProps> = ({
    products,
    onProductPress,
    onFavorite,
}) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
            style={{ transform: [{ scaleX: -1 }] }}
        >
            {products.map((product) => (
                <View key={product.id} style={[styles.horizontalCardWrapper, { transform: [{ scaleX: -1 }] }]}>
                    <ProductCard
                        product={product}
                        variant="horizontal"
                        onPress={() => onProductPress?.(product)}
                        onFavorite={() => onFavorite?.(product)}
                    />
                </View>
            ))}
        </ScrollView>
    );
};

export default ProductGrid;
