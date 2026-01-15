// File: src/screens/services/_components/ReviewsSection.tsx
// Purpose: Reviews section with average rating and review list

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { ReviewCard } from '../../shared';
import { ReviewsSectionProps } from './types/services';
import { styles } from './StyleSheets/ReviewsSection.styles';

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
    averageRating,
    totalReviews,
    reviews,
}) => {
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.5;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingValue}>{averageRating}</Text>
                    <View style={styles.starsContainer}>
                        {[...Array(5)].map((_, index) => {
                            if (index < fullStars) {
                                return (
                                    <Feather
                                        key={index}
                                        name="star"
                                        size={24}
                                        color="#F59E0B"
                                        fill="#F59E0B"
                                    />
                                );
                            } else if (index === fullStars && hasHalfStar) {
                                return (
                                    <Feather
                                        key={index}
                                        name="star"
                                        size={24}
                                        color="#F59E0B"
                                        fill="#F59E0B"
                                    />
                                );
                            } else {
                                return (
                                    <Feather
                                        key={index}
                                        name="star"
                                        size={24}
                                        color="#E5E7EB"
                                    />
                                );
                            }
                        })}
                    </View>
                    <Text style={styles.reviewCount}>{totalReviews} تقييم</Text>
                </View>
            </View>

            <View style={styles.reviewsList}>
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </View>
        </View>
    );
};
