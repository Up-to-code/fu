// File: src/screens/services/_components/types/services.ts
// Purpose: Service-related component types

export interface Service {
    id: string;
    label: string;
}

export interface ServiceSelectionCardProps {
    service: Service;
    isSelected: boolean;
    onToggle: (id: string) => void;
}

export interface ServiceSelectionListProps {
    services: Service[];
    selectedIds: Set<string>;
    onToggle: (id: string) => void;
}

export interface TimeSlot {
    id: string;
    time: string;
    value: string;
}

export interface TimeSlotGridProps {
    slots: TimeSlot[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export interface DateOption {
    id: string;
    label: string;
    date: number;
    month: string;
    isToday?: boolean;
    isTomorrow?: boolean;
    dateValue: Date;
}

export interface DateSelectionCardsProps {
    dates: DateOption[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export interface CommunicationMethod {
    id: string;
    label: string;
    icon: string;
}

export interface CommunicationMethodSelectorProps {
    methods?: CommunicationMethod[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export interface PaymentMethod {
    id: string;
    label: string;
    icon: string;
}

export interface PaymentStepProps {
    selectedMethod: string;
    onSelectMethod: (id: string) => void;
    totalAmount?: number;
}

export interface Provider {
    id: string;
    name: string;
    category: string;
    avatar: string;
    rating: number;
    priceLabel: string;
}

export interface RecommendationsSectionProps {
    providers: Provider[];
    onPress: (id: string) => void;
}

export interface ServicesOfferedSectionProps {
    services: Service[];
    title?: string;
}

export interface ReviewsSectionProps {
    averageRating: number;
    totalReviews: number;
    reviews: import('../../shared').ServiceReview[];
}
