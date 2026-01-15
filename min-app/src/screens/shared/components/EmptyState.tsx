// File: src/screens/shared/components/EmptyState.tsx
// Purpose: Reusable empty state placeholder

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { getResponsiveValue } from '../../../utils/responsive';
import { EmptyStateProps } from '../types/ui';
import { styles } from '../StyleSheets/EmptyState.styles';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const EmptyStateComponent: React.FC<EmptyStateProps> = ({
    icon,
    title,
    description,
    actionLabel,
    onAction,
    iconColor = '#CBD5E1',
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Feather name={icon} size={getResponsiveValue(40, 56)} color={iconColor} />
            </View>

            <Text style={styles.title}>{title}</Text>

            {description && (
                <Text style={styles.description}>{description}</Text>
            )}

            {actionLabel && onAction && (
                <TouchableOpacity
                    onPress={onAction}
                    style={styles.actionButton}
                    activeOpacity={0.8}
                >
                    <Text style={styles.actionButtonText}>{actionLabel}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

// Memoize EmptyState to prevent unnecessary re-renders
export const EmptyState = React.memo(EmptyStateComponent);

export default EmptyState;
