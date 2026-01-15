// File: src/screens/services/types/services.ts
// Purpose: Services screen-level types

export interface ProviderData {
    name: string;
    type: 'freelancer' | 'company';
    category: string;
    avatar: string;
    backgroundImage: string;
    rating: number;
    reviewsCount: number;
    price: string;
    location: string;
    verified: boolean;
    description: string;
    services: { id: string; label: string }[];
    experienceYears: number;
    responseTime: string;
    languages: string[];
    completedProjects: number;
    reviews: any[];
}

export type BookingLocation = 'home' | 'provider_location' | 'remote';

// Provider type for ServicesScreen (extends the base provider type)
export interface ServicesScreenProvider {
    id: string;
    name: string;
    type: 'freelancer' | 'company';
    category: string;
    categoryId: string;
    avatar: string;
    rating: number;
    reviews: number;
    price: number;
    priceLabel: string;
    location: string;
    locationId: string;
    verified: boolean;
    services?: string[];
}
