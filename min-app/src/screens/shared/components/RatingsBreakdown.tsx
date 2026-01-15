// File: src/screens/shared/components/RatingsBreakdown.tsx
// Purpose: Star rating distribution chart component

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { RatingsBreakdownProps, RatingDistribution } from '../types/ui';
import { styles } from '../StyleSheets/RatingsBreakdown.styles';

export const RatingsBreakdown: React.FC<RatingsBreakdownProps> = ({
    overallRating,
    totalReviews,
    distribution,
}) => {
    const maxCount = Math.max(
        distribution.five,
        distribution.four,
        distribution.three,
        distribution.two,
        distribution.one
    );

    const renderStarBar = (stars: number, count: number) => {
        const width = maxCount > 0 ? (count / maxCount) * 100 : 0;
        return (
            <View style={styles.starRow} key={stars}>
                <Text style={styles.starLabel}>☆ {stars}</Text>
                <View style={styles.barContainer}>
                    <View style={[styles.bar, { width: `${width}%` }]} />
                </View>
                <Text style={styles.count}>{count}</Text>
            </View>
        );
    };

    // Calculate filled stars for overall rating
    const fullStars = Math.floor(overallRating);
    const hasHalfStar = overallRating % 1 >= 0.5;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.ratingContainer}>
                    <Text style={styles.overallRating}>{overallRating}</Text>
                    <View style={styles.starsContainer}>
                        {[...Array(5)].map((_, index) => {
                            if (index < fullStars) {
                                return (
                                    <Feather
                                        key={index}
                                        name="star"
                                        size={20}
                                        color="#F59E0B"
                                        fill="#F59E0B"
                                    />
                                );
                            } else if (index === fullStars && hasHalfStar) {
                                return (
                                    <Feather
                                        key={index}
                                        name="star"
                                        size={20}
                                        color="#F59E0B"
                                        fill="#F59E0B"
                                    />
                                );
                            } else {
                                return (
                                    <Feather
                                        key={index}
                                        name="star"
                                        size={20}
                                        color="#E5E7EB"
                                    />
                                );
                            }
                        })}
                    </View>
                    <Text style={styles.reviewCount}>{totalReviews} تقييم</Text>
                </View>
            </View>

            <View style={styles.breakdown}>
                {renderStarBar(5, distribution.five)}
                {renderStarBar(4, distribution.four)}
                {renderStarBar(3, distribution.three)}
                {renderStarBar(2, distribution.two)}
                {renderStarBar(1, distribution.one)}
            </View>
        </View>
    );
};
