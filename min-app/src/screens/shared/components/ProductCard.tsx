// File: src/screens/shared/components/ProductCard.tsx
// Purpose: Unified product card for grid and horizontal lists

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { COLORS } from '../../../constants/theme';
import { useRTL } from '../../../hooks/useRTL';
import { useResponsive } from '../../../hooks/useResponsive';
import { IProductCardProps, ProductCardProps } from '../types/card';
import { getStyles } from '../StyleSheets/ProductCard.styles';

const ProductCardComponent: React.FC<ProductCardProps> = ({
    product,
    onPress,
    onFavorite,
    variant = 'grid',
}) => {
    const { isRTL } = useRTL();
    const { getSize, iconSize, isTablet } = useResponsive();
    const styles = getStyles(isRTL, getSize);
    const finalPrice = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;

    if (variant === 'horizontal') {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onPress}
                style={styles.horizontalCard}
            >
                <View style={styles.horizontalImageContainer}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.image}
                        contentFit="cover"
                        transition={200}
                        cachePolicy="memory-disk"
                        placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
                    />

                    {onFavorite && (
                        <TouchableOpacity
                            onPress={onFavorite}
                            style={styles.favoriteButton}
                        >
                            <Feather
                                name="heart"
                                size={iconSize.sm}
                                color={product.isFavorite ? '#EF4444' : '#94a3b8'}
                                fill={product.isFavorite ? '#EF4444' : 'none'}
                            />
                        </TouchableOpacity>
                    )}

                    {product.discount && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>
                                {product.discount}% خصم
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.horizontalTextContainer}>
                        <Text
                            style={styles.horizontalProductName}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {product.name}
                        </Text>
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.horizontalPrice}>
                            {Math.round(finalPrice)} ر.س
                        </Text>
                        {product.discount && (
                            <Text style={styles.originalPrice}>
                                {product.price}
                            </Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    // Grid variant (default)
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={styles.gridCard}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.image }}
                    style={styles.image}
                    contentFit="cover"
                    transition={200}
                    cachePolicy="memory-disk"
                    placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
                />

                {onFavorite && (
                    <TouchableOpacity
                        onPress={onFavorite}
                        style={styles.favoriteButton}
                    >
                        <Feather
                            name="heart"
                            size={isTablet ? 18 : 16}
                            color={product.isFavorite ? '#EF4444' : '#94a3b8'}
                            fill={product.isFavorite ? '#EF4444' : 'none'}
                        />
                    </TouchableOpacity>
                )}

                {product.discount && (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>
                            {product.discount}% خصم
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text
                        style={styles.productName}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {product.name}
                    </Text>
                </View>

                <View style={styles.priceRow}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>
                            {Math.round(finalPrice)}
                        </Text>
                        <Text style={styles.priceCurrency}>
                            ر.س
                        </Text>
                    </View>

                    {product.rating && (
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingText}>
                                {product.rating}
                            </Text>
                            <Feather name="star" size={getSize(10, 11, 12, 12, 14)} color="#F59E0B" fill="#F59E0B" />
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

// Memoize ProductCard to prevent unnecessary re-renders when props haven't changed
export const ProductCard = React.memo(ProductCardComponent, (prevProps, nextProps) => {
    // Custom comparison function for better performance
    return (
        prevProps.product.id === nextProps.product.id &&
        prevProps.product.isFavorite === nextProps.product.isFavorite &&
        prevProps.product.discount === nextProps.product.discount &&
        prevProps.product.price === nextProps.product.price &&
        prevProps.product.name === nextProps.product.name &&
        prevProps.product.image === nextProps.product.image &&
        prevProps.variant === nextProps.variant &&
        prevProps.onPress === nextProps.onPress &&
        prevProps.onFavorite === nextProps.onFavorite
    );
});

export default ProductCard;
