// File: src/screens/services/_components/PaymentStep.tsx
// Purpose: Payment step component for booking

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';

interface PaymentMethod {
    id: string;
    label: string;
    icon: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
    { id: 'card', label: 'بطاقة ائتمانية', icon: 'credit-card' },
    { id: 'wallet', label: 'محفظة', icon: 'wallet' },
    { id: 'cash', label: 'نقدي', icon: 'dollar-sign' },
];

interface PaymentStepProps {
    selectedMethod: string;
    onSelectMethod: (id: string) => void;
    totalAmount?: number;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
    selectedMethod,
    onSelectMethod,
    totalAmount,
}) => {
    return (
        <View className="px-5 py-5">
            <Text className="font-cairo-bold text-slate-900 text-lg text-right mb-4">
                طريقة الدفع
            </Text>
            <View className="gap-3 mb-6">
                {PAYMENT_METHODS.map((method) => {
                    const isSelected = selectedMethod === method.id;
                    return (
                        <TouchableOpacity
                            key={method.id}
                            onPress={() => onSelectMethod(method.id)}
                            className={`flex-row-reverse items-center justify-between p-4 rounded-2xl ${
                                isSelected ? 'bg-primary/10' : 'bg-slate-50'
                            }`}
                            activeOpacity={0.8}
                        >
                            <View className="flex-row-reverse items-center gap-3">
                                <View
                                    className={`w-10 h-10 rounded-full items-center justify-center ${
                                        isSelected ? 'bg-primary' : 'bg-white'
                                    }`}
                                >
                                    <Feather
                                        name={method.icon as any}
                                        size={20}
                                        color={isSelected ? 'white' : COLORS.textLight}
                                    />
                                </View>
                                <Text
                                    className={`font-cairo-bold text-base ${
                                        isSelected ? 'text-primary' : 'text-slate-800'
                                    }`}
                                >
                                    {method.label}
                                </Text>
                            </View>
                            {isSelected && (
                                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                                    <Feather name="check" size={14} color="white" />
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
            {totalAmount && (
                <View className="bg-slate-50 rounded-2xl p-4">
                    <View className="flex-row-reverse justify-between items-center">
                        <Text className="font-cairo-bold text-slate-900 text-lg">المجموع</Text>
                        <Text className="font-cairo-bold text-lg" style={{ color: COLORS.primary }}>
                            {totalAmount} ر.س
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};
