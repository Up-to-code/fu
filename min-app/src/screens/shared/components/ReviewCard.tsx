// File: src/screens/shared/components/ReviewCard.tsx
// Purpose: Unified review card component for products and services

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { Review, ServiceReview } from '../types/review';
import { styles } from '../StyleSheets/ReviewCard.styles';

interface ReviewCardProps {
    review: Review | ServiceReview;
    variant?: 'product' | 'service';
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ 
    review, 
    variant = 'product' 
}) => {
    const fullStars = Math.floor(review.rating);
    const hasHalf = review.rating % 1 >= 0.5;
    
    // Handle different property names between product and service reviews
    const userName = 'userName' in review ? review.userName : review.customerName;
    const userAvatar = 'userAvatar' in review ? review.userAvatar : review.avatar;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    {userAvatar ? (
                        <Image
                            source={{ uri: userAvatar }}
                            style={styles.avatar}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarText}>
                                {userName.charAt(0)}
                            </Text>
                        </View>
                    )}
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{userName}</Text>
                    <Text style={styles.date}>{review.date}</Text>
                </View>
                <View style={styles.stars}>
                    {[...Array(5)].map((_, index) => {
                        if (index < fullStars) {
                            return (
                                <Feather
                                    key={index}
                                    name="star"
                                    size={14}
                                    color="#F59E0B"
                                    fill="#F59E0B"
                                />
                            );
                        } else if (index === fullStars && hasHalf) {
                            return (
                                <Feather
                                    key={index}
                                    name="star"
                                    size={14}
                                    color="#F59E0B"
                                    fill="#F59E0B"
                                />
                            );
                        } else {
                            return (
                                <Feather
                                    key={index}
                                    name="star"
                                    size={14}
                                    color="#E5E7EB"
                                />
                            );
                        }
                    })}
                </View>
            </View>
            <Text style={styles.comment}>{review.comment}</Text>
            {'helpful' in review && review.helpful !== undefined && review.helpful > 0 && (
                <View style={styles.helpful}>
                    <Feather name="thumbs-up" size={12} color="#94a3b8" />
                    <Text style={styles.helpfulText}>
                        {review.helpful} وجدوا هذا مفيداً
                    </Text>
                </View>
            )}
        </View>
    );
};
