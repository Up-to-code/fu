// File: src/components/shared/ProductCard.tsx
// Purpose: Unified product card for grid and horizontal lists

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    discount?: number;
    rating?: number;
    category?: string;
    isFavorite?: boolean;
}

interface ProductCardProps {
    product: Product;
    onPress?: () => void;
    onFavorite?: () => void;
    variant?: 'grid' | 'horizontal';
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onPress,
    onFavorite,
    variant = 'grid',
}) => {
    const finalPrice = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;

    if (variant === 'horizontal') {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onPress}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
                style={{ width: isTablet ? 200 : 170 }}
            >
                <View className={`relative bg-slate-100 ${isTablet ? 'h-48' : 'h-40'}`}>
                    <Image
                        source={{ uri: product.image }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />

                    {onFavorite && (
                        <TouchableOpacity
                            onPress={onFavorite}
                            className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full items-center justify-center"
                        >
                            <Feather
                                name="heart"
                                size={16}
                                color={product.isFavorite ? '#EF4444' : '#94a3b8'}
                            />
                        </TouchableOpacity>
                    )}

                    {product.discount && (
                        <View className="absolute bottom-2 left-2 bg-red-500 px-2 py-0.5 rounded">
                            <Text className="text-white text-[10px] font-cairo-bold">
                                {product.discount}% خصم
                            </Text>
                        </View>
                    )}
                </View>

                <View className="p-3">
                    <View className="mb-1.5" style={{ minHeight: 32 }}>
                        <Text
                            className="text-slate-800 font-cairo-medium text-xs text-right"
                            numberOfLines={2}
                        >
                            {product.name}
                        </Text>
                    </View>

                    <View className="flex-row-reverse items-center justify-between">
                        <Text
                            className="font-cairo-bold text-sm"
                            style={{ color: COLORS.primary }}
                        >
                            {Math.round(finalPrice)} ر.س
                        </Text>
                        {product.discount && (
                            <Text className="text-slate-400 text-[10px] line-through">
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
            className="bg-white rounded-2xl overflow-hidden border border-slate-100"
        >
            <View className={`relative bg-slate-100 ${isTablet ? 'h-44' : 'h-36'}`}>
                <Image
                    source={{ uri: product.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                />

                {onFavorite && (
                    <TouchableOpacity
                        onPress={onFavorite}
                        className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full items-center justify-center"
                    >
                        <Feather
                            name="heart"
                            size={16}
                            color={product.isFavorite ? '#EF4444' : '#94a3b8'}
                        />
                    </TouchableOpacity>
                )}

                {product.discount && (
                    <View className="absolute bottom-2 left-2 bg-red-500 px-2 py-0.5 rounded">
                        <Text className="text-white text-[10px] font-cairo-bold">
                            {product.discount}% خصم
                        </Text>
                    </View>
                )}
            </View>

            <View className="p-3">
                <View className="mb-2" style={{ minHeight: isTablet ? 44 : 40 }}>
                    <Text
                        className={`text-slate-800 font-cairo-bold text-right ${isTablet ? 'text-base' : 'text-sm'}`}
                        numberOfLines={2}
                    >
                        {product.name}
                    </Text>
                </View>

                <View className="flex-row-reverse items-center justify-between">
                    <View className="flex-row-reverse items-baseline gap-1">
                        <Text
                            className={`font-cairo-bold ${isTablet ? 'text-lg' : 'text-base'}`}
                            style={{ color: COLORS.primary }}
                        >
                            {Math.round(finalPrice)}
                        </Text>
                        <Text className="text-xs font-cairo-medium" style={{ color: COLORS.primary }}>
                            ر.س
                        </Text>
                    </View>

                    {product.rating && (
                        <View className="flex-row items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded">
                            <Text className="text-xs text-slate-600 font-cairo-bold">
                                {product.rating}
                            </Text>
                            <Feather name="star" size={10} color="#F59E0B" />
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;
