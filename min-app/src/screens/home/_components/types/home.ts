// File: src/screens/home/_components/types/home.ts
// Purpose: Home screen component types

export interface ProductListSectionProps {
    title: string;
    products: import('../../shared').IProductCardProps[];
    onToggleFavorite?: (id: string) => void;
}

export interface ServiceBanner {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    route: string;
}

export interface QuickAction {
    id: string;
    label: string;
    icon: string;
    color: string;
    link: string;
}

export interface Feature {
    id: string;
    name: string;
    icon: string;
    link: string;
}

export interface Category {
    id: string;
    name: string;
    image: string;
}

export interface FeaturedProvider {
    id: string;
    name: string;
    category: string;
    avatar: string;
    rating: number;
}

export interface Slide {
    id: string;
    title: string;
    description: string;
    image: string;
    cta: string;
    link: string;
}
