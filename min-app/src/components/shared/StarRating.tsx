// File: src/components/shared/StarRating.tsx
// Purpose: Star rating with filled/half-filled stars

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

interface StarRatingProps {
    rating: number;
    reviews?: number;
    size?: 'sm' | 'md' | 'lg';
    showCount?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
    rating,
    reviews,
    size = 'md',
    showCount = true,
}) => {
    const starSize = size === 'sm' ? 12 : size === 'lg' ? 20 : 16;
    const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';

    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
        <View className="flex-row-reverse items-center gap-1">
            {/* Full Stars */}
            {Array.from({ length: fullStars }).map((_, idx) => (
                <Ionicons key={`full-${idx}`} name="star" size={starSize} color="#F59E0B" />
            ))}

            {/* Half Star */}
            {hasHalf && (
                <Ionicons name="star-half" size={starSize} color="#F59E0B" />
            )}

            {/* Empty Stars */}
            {Array.from({ length: emptyStars }).map((_, idx) => (
                <Ionicons key={`empty-${idx}`} name="star-outline" size={starSize} color="#F59E0B" />
            ))}

            <Text className={`font-cairo-bold text-slate-700 mr-1 ${textSize}`}>
                {rating}
            </Text>
            {showCount && reviews !== undefined && (
                <Text className={`font-cairo-medium text-slate-400 ${textSize}`}>
                    ({reviews})
                </Text>
            )}
        </View>
    );
};

export default StarRating;
