// File: src/screens/services/_components/ServiceSelectionCard.tsx
// Purpose: Multi-select service cards with checkboxes

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
    ServiceSelectionCardProps,
    ServiceSelectionListProps,
} from './types/services';
import { styles } from './StyleSheets/ServiceSelectionCard.styles';

export const ServiceSelectionCard: React.FC<ServiceSelectionCardProps> = ({
    service,
    isSelected,
    onToggle,
}) => {
    return (
        <TouchableOpacity
            onPress={() => onToggle(service.id)}
            style={[styles.card, isSelected && styles.cardSelected]}
            activeOpacity={0.8}
        >
            <View style={styles.content}>
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <Feather name="check" size={16} color="white" />}
                </View>
                <Text style={[styles.label, isSelected && styles.labelSelected]}>
                    {service.label}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export const ServiceSelectionList: React.FC<ServiceSelectionListProps> = ({
    services,
    selectedIds,
    onToggle,
}) => {
    return (
        <View style={styles.list}>
            {services.map((service) => (
                <ServiceSelectionCard
                    key={service.id}
                    service={service}
                    isSelected={selectedIds.has(service.id)}
                    onToggle={onToggle}
                />
            ))}
        </View>
    );
};
