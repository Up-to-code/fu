// File: src/screens/services/_components/CommunicationMethodSelector.tsx
// Purpose: Communication method buttons (WhatsApp, Phone, App Chat)

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import {
    CommunicationMethod,
    CommunicationMethodSelectorProps,
} from './types/services';
import { styles } from './StyleSheets/CommunicationMethodSelector.styles';

export type { CommunicationMethod };

const DEFAULT_METHODS: CommunicationMethod[] = [
    { id: 'whatsapp', label: 'واتساب', icon: 'message-circle' },
    { id: 'phone', label: 'اتصال هاتفي', icon: 'phone' },
    { id: 'app', label: 'محادثة التطبيق', icon: 'message-square' },
];

export const CommunicationMethodSelector: React.FC<CommunicationMethodSelectorProps> = ({
    methods = DEFAULT_METHODS,
    selectedId,
    onSelect,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                {methods.map((method) => {
                    const isSelected = selectedId === method.id;
                    return (
                        <TouchableOpacity
                            key={method.id}
                            onPress={() => onSelect(method.id)}
                            style={[styles.button, isSelected && styles.buttonSelected]}
                            activeOpacity={0.8}
                        >
                            <Feather
                                name={method.icon as any}
                                size={20}
                                color={isSelected ? COLORS.primary : COLORS.textLight}
                            />
                            <Text style={[styles.label, isSelected && styles.labelSelected]}>
                                {method.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};
