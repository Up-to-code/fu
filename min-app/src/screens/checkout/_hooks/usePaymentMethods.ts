// File: src/screens/checkout/_hooks/usePaymentMethods.ts
// Purpose: Payment method selection

import { useState } from 'react';

export interface PaymentMethod {
    id: string;
    label: string;
    icon: string;
    description?: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
    { id: 'card', label: 'بطاقة ائتمان/خصم', icon: 'credit-card' },
    { id: 'apple_pay', label: 'Apple Pay', icon: 'smartphone' },
    { id: 'mada', label: 'مدى', icon: 'credit-card' },
    { id: 'tamara', label: 'تمارا (تقسيط)', icon: 'calendar' },
];

interface UsePaymentMethodsReturn {
    paymentMethods: PaymentMethod[];
    selectedMethod: string;
    setSelectedMethod: (methodId: string) => void;
}

export const usePaymentMethods = (): UsePaymentMethodsReturn => {
    const [selectedMethod, setSelectedMethod] = useState<string>('');

    return {
        paymentMethods: PAYMENT_METHODS,
        selectedMethod,
        setSelectedMethod,
    };
};
