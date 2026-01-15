// File: src/screens/services/_components/PaymentStep.tsx
// Purpose: Payment step component for booking

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { PaymentMethod, PaymentStepProps } from './types/services';
import { styles } from './StyleSheets/PaymentStep.styles';

const PAYMENT_METHODS: PaymentMethod[] = [
    { id: 'card', label: 'بطاقة ائتمانية', icon: 'credit-card' },
    { id: 'wallet', label: 'محفظة', icon: 'wallet' },
    { id: 'cash', label: 'نقدي', icon: 'dollar-sign' },
];

export const PaymentStep: React.FC<PaymentStepProps> = ({
    selectedMethod,
    onSelectMethod,
    totalAmount,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                طريقة الدفع
            </Text>
            <View style={styles.methodsContainer}>
                {PAYMENT_METHODS.map((method) => {
                    const isSelected = selectedMethod === method.id;
                    return (
                        <TouchableOpacity
                            key={method.id}
                            onPress={() => onSelectMethod(method.id)}
                            style={[
                                styles.methodButton,
                                isSelected ? styles.methodButtonSelected : styles.methodButtonUnselected
                            ]}
                            activeOpacity={0.8}
                        >
                            <View style={styles.methodLeft}>
                                <View
                                    style={[
                                        styles.iconContainer,
                                        isSelected ? styles.iconContainerSelected : styles.iconContainerUnselected
                                    ]}
                                >
                                    <Feather
                                        name={method.icon as any}
                                        size={20}
                                        color={isSelected ? 'white' : COLORS.textLight}
                                    />
                                </View>
                                <Text
                                    style={[
                                        styles.methodLabel,
                                        isSelected ? styles.methodLabelSelected : styles.methodLabelUnselected
                                    ]}
                                >
                                    {method.label}
                                </Text>
                            </View>
                            {isSelected && (
                                <View style={styles.checkIcon}>
                                    <Feather name="check" size={14} color="white" />
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
            {totalAmount && (
                <View style={styles.totalContainer}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>المجموع</Text>
                        <Text style={styles.totalAmount}>
                            {totalAmount} ر.س
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};
