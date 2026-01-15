// File: src/screens/home/_components/index.ts
// Purpose: Export all home screen components

export { HomeHeader } from './HomeHeader';
export { AIDesignSlider } from './AIDesignSlider';
export { CategoriesSection } from './CategoriesSection';
export { FeaturesSection } from './FeaturesSection';
export { ServicesSection } from './ServicesSection';
export { ProductListSection } from './ProductListSection';
export { QuickActionsSection } from './QuickActionsSection';

// Export types
export type {
    ProductListSectionProps,
    ServiceBanner,
    QuickAction,
    Feature,
    Category,
    FeaturedProvider,
    Slide,
} from './types/home';