// File: src/components/shared/ProductGrid.tsx
// Purpose: Responsive product grid wrapper

import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { Product, ProductCard } from './ProductCard';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

interface ProductGridProps {
    products: Product[];
    onProductPress?: (product: Product) => void;
    onFavorite?: (product: Product) => void;
    numColumns?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    onProductPress,
    onFavorite,
    numColumns,
}) => {
    const columns = numColumns || (isTablet ? 3 : 2);
    const cardWidth = columns === 3 ? '31%' : '48%';

    return (
        <View className="flex-row flex-wrap justify-between" style={{ direction: 'rtl' }}>
            {products.map((product) => (
                <View key={product.id} style={{ width: cardWidth }} className="mb-4">
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

interface ProductHorizontalListProps {
    products: Product[];
    onProductPress?: (product: Product) => void;
    onFavorite?: (product: Product) => void;
}

export const ProductHorizontalList: React.FC<ProductHorizontalListProps> = ({
    products,
    onProductPress,
    onFavorite,
}) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: isTablet ? 24 : 16 }}
            style={{ transform: [{ scaleX: -1 }] }}
        >
            {products.map((product) => (
                <View key={product.id} style={{ transform: [{ scaleX: -1 }], marginLeft: 12 }}>
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
