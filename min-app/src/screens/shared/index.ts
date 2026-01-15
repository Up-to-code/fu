// File: src/screens/shared/index.ts
// Purpose: Export all shared screen components and types

export * from './components';

// Export all types
export type { HeaderProps } from './types/interfaces';
export type { CameraMode } from './types/types';
export type { FormInputProps, FormTextAreaProps, FormToggleProps, PasswordInputProps } from './types/form';
export type { PrimaryButtonProps, SocialButtonProps } from './types/button';
export type { IProductCardProps, ProductCardProps, ProductGridProps, ProductHorizontalListProps, OrderCardData, OrderCardProps, ServiceProvider, ServiceCardProps } from './types/card';
export type { TypeOption, TypeSelectorProps, Tab, TabBarProps, FilterChipProps } from './types/navigation';
export type { SearchBarProps, LoadingSpinnerProps, EmptyCartStateProps, ScreenHeaderProps, SimpleModalProps, RoleBadgeProps, FilterBottomSheetRef, FilterOption, FilterBottomSheetProps, QuickViewModalProps, RatingsBreakdownProps, CountryCodePickerProps, SectionHeaderProps } from './types/ui';
export type { Review, ServiceReview, RatingDistribution } from './types/review';
