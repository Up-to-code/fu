// File: src/screens/shared/components/ActionButton.tsx
// Purpose: Primary and secondary action buttons

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useRTL } from '../../../hooks/useRTL';
import { useResponsive } from '../../../hooks/useResponsive';
import { ActionButtonProps } from '../types/button';
import { getStyles } from '../StyleSheets/ActionButton.styles';

const ActionButtonComponent: React.FC<ActionButtonProps> = ({
    label,
    icon,
    onPress,
    variant = 'primary',
    disabled = false,
    fullWidth = true,
}) => {
    const { isRTL } = useRTL();
    const { getSize, iconSize } = useResponsive();
    const styles = getStyles(variant, disabled, fullWidth, isRTL, getSize);

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={styles.button}
            activeOpacity={0.8}
        >
            <Text style={styles.text}>{label}</Text>
            {icon && (
                <Feather name={icon} size={iconSize.md} color={styles.iconColor} />
            )}
        </TouchableOpacity>
    );
};

// Memoize ActionButton to prevent unnecessary re-renders
export const ActionButton = React.memo(ActionButtonComponent);

export default ActionButton;
