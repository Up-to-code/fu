// File: src/screens/services/_components/index.ts
// Purpose: Export services screen components

export { RecommendationsSection } from './RecommendationsSection';
export { PaymentStep } from './PaymentStep';
export { ServiceSelectionCard, ServiceSelectionList } from './ServiceSelectionCard';
export { DateSelectionCards, generateDateOptions } from './DateSelectionCards';
export { TimeSlotGrid, generateTimeSlots } from './TimeSlotGrid';
export { CommunicationMethodSelector } from './CommunicationMethodSelector';
export { ServicesOfferedSection } from './ServicesOfferedSection';
export { ReviewsSection } from './ReviewsSection';

// Export types
export type {
    Service,
    ServiceSelectionCardProps,
    ServiceSelectionListProps,
    TimeSlot,
    TimeSlotGridProps,
    DateOption,
    DateSelectionCardsProps,
    CommunicationMethod,
    CommunicationMethodSelectorProps,
    PaymentMethod,
    PaymentStepProps,
    Provider,
    RecommendationsSectionProps,
    ServicesOfferedSectionProps,
    ReviewsSectionProps,
} from './types/services';
