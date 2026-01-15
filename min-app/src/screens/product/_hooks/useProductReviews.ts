// File: src/screens/product/_hooks/useProductReviews.ts
// Purpose: Fetch and manage product reviews

import { useState } from 'react';

export interface Review {
    id: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    date: string;
    comment: string;
    helpful?: number;
}

interface UseProductReviewsReturn {
    reviews: Review[];
    isLoading: boolean;
    addReview: (review: Omit<Review, 'id' | 'date'>) => Promise<void>;
}

export const useProductReviews = (productId: string): UseProductReviewsReturn => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // TODO: Implement actual Convex query for reviews
    const addReview = async (review: Omit<Review, 'id' | 'date'>) => {
        // TODO: Implement review submission
        const newReview: Review = {
            ...review,
            id: Date.now().toString(),
            date: 'الآن',
        };
        setReviews(prev => [newReview, ...prev]);
    };

    return {
        reviews,
        isLoading,
        addReview,
    };
};
