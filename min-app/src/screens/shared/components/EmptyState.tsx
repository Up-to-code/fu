// File: src/screens/shared/components/EmptyState.tsx
// Purpose: Reusable empty state placeholder

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useResponsive } from '../../../hooks/useResponsive';
import { EmptyStateProps } from '../types/ui';
import { getStyles } from '../StyleSheets/EmptyState.styles';

const EmptyStateComponent: React.FC<EmptyStateProps> = ({
    icon,
    title,
    description,
    actionLabel,
    onAction,
    iconColor = '#CBD5E1',
}) => {
    const { getSize, iconSize } = useResponsive();
    const styles = getStyles(getSize);
    
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Feather name={icon} size={iconSize.xl} color={iconColor} />
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
