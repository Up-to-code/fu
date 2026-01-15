// File: src/screens/shared/components/StarRating.tsx
// Purpose: Star rating with filled/half-filled stars

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { StarRatingProps } from '../types/ui';
import { getStyles } from '../StyleSheets/StarRating.styles';

const StarRatingComponent: React.FC<StarRatingProps> = ({
    rating,
    reviews,
    size = 'md',
    showCount = true,
}) => {
    const styles = getStyles(size);
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
        <View style={styles.container}>
            {/* Full Stars */}
            {Array.from({ length: fullStars }).map((_, idx) => (
                <Ionicons key={`full-${idx}`} name="star" size={styles.starSize} color="#F59E0B" />
            ))}

            {/* Half Star */}
            {hasHalf && (
                <Ionicons name="star-half" size={styles.starSize} color="#F59E0B" />
            )}

            {/* Empty Stars */}
            {Array.from({ length: emptyStars }).map((_, idx) => (
                <Ionicons key={`empty-${idx}`} name="star-outline" size={styles.starSize} color="#F59E0B" />
            ))}

            <Text style={styles.ratingText}>{rating}</Text>
            {showCount && reviews !== undefined && (
                <Text style={styles.reviewCount}>({reviews})</Text>
            )}
        </View>
    );
};

// Memoize StarRating to prevent unnecessary re-renders
export const StarRating = React.memo(StarRatingComponent);

export default StarRating;
