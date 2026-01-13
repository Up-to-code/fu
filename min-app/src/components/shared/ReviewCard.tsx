// File: src/components/shared/ReviewCard.tsx
// Purpose: Product review/comment card component

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export interface Review {
    id: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    date: string;
    comment: string;
    helpful?: number;
}

interface ReviewCardProps {
    review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    const fullStars = Math.floor(review.rating);
    const hasHalf = review.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
        <View className="bg-slate-50 rounded-2xl p-4 mb-3">
            {/* Header */}
            <View className="flex-row-reverse items-center mb-3">
                {review.userAvatar ? (
                    <Image
                        source={{ uri: review.userAvatar }}
                        className={`rounded-full bg-slate-200 ${isTablet ? 'w-12 h-12' : 'w-10 h-10'}`}
                    />
                ) : (
                    <View className={`rounded-full bg-primary/10 items-center justify-center ${isTablet ? 'w-12 h-12' : 'w-10 h-10'}`}>
                        <Text className="font-cairo-bold text-primary text-lg">
                            {review.userName.charAt(0)}
                        </Text>
                    </View>
                )}

                <View className="flex-1 mr-3">
                    <Text className={`font-cairo-bold text-slate-800 text-right ${isTablet ? 'text-base' : 'text-sm'}`}>
                        {review.userName}
                    </Text>
                    <Text className={`font-cairo-medium text-slate-400 text-right ${isTablet ? 'text-sm' : 'text-xs'}`}>
                        {review.date}
                    </Text>
                </View>

                {/* Filled Stars */}
                <View className="flex-row items-center gap-0.5">
                    {Array.from({ length: fullStars }).map((_, idx) => (
                        <Ionicons key={`full-${idx}`} name="star" size={isTablet ? 14 : 12} color="#F59E0B" />
                    ))}
                    {hasHalf && (
                        <Ionicons name="star-half" size={isTablet ? 14 : 12} color="#F59E0B" />
                    )}
                    {Array.from({ length: emptyStars }).map((_, idx) => (
                        <Ionicons key={`empty-${idx}`} name="star-outline" size={isTablet ? 14 : 12} color="#F59E0B" />
                    ))}
                </View>
            </View>

            {/* Comment */}
            <Text className={`font-cairo-medium text-slate-600 text-right leading-6 ${isTablet ? 'text-base' : 'text-sm'}`}>
                {review.comment}
            </Text>

            {/* Helpful */}
            {review.helpful !== undefined && review.helpful > 0 && (
                <View className="flex-row-reverse items-center gap-1 mt-3 pt-3 border-t border-slate-100">
                    <Ionicons name="thumbs-up" size={12} color="#94a3b8" />
                    <Text className="font-cairo-medium text-slate-400 text-xs">
                        {review.helpful} وجدوا هذا مفيداً
                    </Text>
                </View>
            )}
        </View>
    );
};

export default ReviewCard;
