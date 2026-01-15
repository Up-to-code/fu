// File: src/screens/shared/types/review.ts
// Purpose: Review-related interfaces

export interface Review {
    id: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    date: string;
    comment: string;
    helpful?: number;
}

export interface ServiceReview {
    id: string;
    customerName: string;
    avatar?: string;
    rating: number;
    comment: string;
    date: string;
}

export interface RatingDistribution {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
}
