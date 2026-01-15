// File: src/screens/shared/types/card.ts
// Purpose: Card component interfaces

export interface IProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    discount?: number;
    rating?: number;
    category?: string;
    isFavorite?: boolean;
}

export interface ProductCardProps {
    product: IProductCardProps;
    onPress?: () => void;
    onFavorite?: () => void;
    variant?: 'grid' | 'horizontal';
}

export interface ProductGridProps {
    products: IProductCardProps[];
    onProductPress?: (product: IProductCardProps) => void;
    onFavorite?: (product: IProductCardProps) => void;
    numColumns?: number;
}

export interface ProductHorizontalListProps {
    products: IProductCardProps[];
    onProductPress?: (product: IProductCardProps) => void;
    onFavorite?: (product: IProductCardProps) => void;
}

export interface OrderCardData {
    id: string;
    number: string;
    date: Date;
    status: string;
    statusLabel: string;
    statusColors: {
        color: string;
        bg: string;
    };
    total: number;
    itemsCount: number;
    type: 'product' | 'service';
    image?: string;
    title?: string;
}

export interface OrderCardProps {
    order: OrderCardData;
    onPress?: () => void;
}

export interface ServiceProvider {
    id: string;
    name: string;
    type: 'freelancer' | 'company';
    category: string;
    avatar: string;
    rating: number;
    reviews: number;
    price: number;
    priceLabel: string;
    location: string;
    verified?: boolean;
    services?: string[];
}

export interface ServiceCardProps {
    provider: ServiceProvider;
    onPress?: () => void;
    onFavorite?: () => void;
    isFavorite?: boolean;
}
