// File: src/screens/shared/types/ui.ts
// Purpose: General UI component interfaces

import { TextInputProps } from 'react-native';
import { HeaderProps } from './interfaces';

export interface SearchBarProps extends TextInputProps {
    onClear?: () => void;
    onCameraPress?: () => void;
    showCamera?: boolean;
}

export interface LoadingSpinnerProps {
    message?: string;
    size?: 'small' | 'large';
}

export interface EmptyCartStateProps {
    onBrowseProducts?: () => void;
}

export interface ScreenHeaderProps extends HeaderProps {
    subtitle?: string;
}

export interface SimpleModalProps {
    visible: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export interface RoleBadgeProps {
    role?: string | null;
    size?: 'small' | 'medium';
}

export interface FilterBottomSheetRef {
    expand: () => void;
    close: () => void;
}

export interface FilterOption {
    id: string;
    label: string;
}

export interface FilterBottomSheetProps {
    categories: FilterOption[];
    priceRanges: FilterOption[];
    locations: FilterOption[];
    activeCategory: string;
    activePriceRange: string;
    activeLocation: string;
    onCategoryChange: (id: string) => void;
    onPriceRangeChange: (id: string) => void;
    onLocationChange: (id: string) => void;
    onClearAll: () => void;
    resultsCount: number;
}

export interface QuickViewModalProps {
    visible: boolean;
    provider: any | null;
    onClose: () => void;
    onViewDetails: () => void;
    onBook: () => void;
}

export interface RatingsBreakdownProps {
    overallRating: number;
    totalReviews: number;
    distribution: import('./review').RatingDistribution;
}

export interface CountryCodePickerProps {
    selectedCode: string;
    onSelect: (code: string) => void;
}

export interface SectionHeaderProps {
    title: string;
    showViewAll?: boolean;
    viewAllLink?: string;
    onViewAllPress?: () => void;
}

export interface EmptyStateProps {
    icon: keyof typeof import('@expo/vector-icons').Feather.glyphMap;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    iconColor?: string;
}

export interface SwipeToConfirmProps {
    onConfirm: () => void;
    label?: string;
    disabled?: boolean;
}

export interface BottomBarProps {
    children: React.ReactNode;
    maxWidth?: number;
    inTabs?: boolean;
}

export interface FloatingHeaderProps {
    onBack?: () => void;
    onFavorite?: () => void;
    isFavorite?: boolean;
    showBack?: boolean;
    showFavorite?: boolean;
    transparent?: boolean;
}

export interface PriceTableProps {
    items: Array<{
        label: string;
        value: number;
        isDiscount?: boolean;
        isFree?: boolean;
    }>;
    total: number;
    currency?: string;
}

export interface StarRatingProps {
    rating: number;
    reviews?: number;
    size?: 'sm' | 'md' | 'lg';
    showCount?: boolean;
}
