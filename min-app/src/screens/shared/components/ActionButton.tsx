// File: src/screens/shared/components/ActionButton.tsx
// Purpose: Primary and secondary action buttons

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import { getResponsiveValue } from '../../../utils/responsive';
import { ActionButtonProps } from '../types/button';
import { getStyles } from '../StyleSheets/ActionButton.styles';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const ActionButtonComponent: React.FC<ActionButtonProps> = ({
    label,
    icon,
    onPress,
    variant = 'primary',
    disabled = false,
    fullWidth = true,
}) => {
    const styles = getStyles(variant, disabled, fullWidth);

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={styles.button}
            activeOpacity={0.8}
        >
            <Text style={styles.text}>{label}</Text>
            {icon && (
                <Feather name={icon} size={getResponsiveValue(18, 22)} color={styles.iconColor} />
            )}
        </TouchableOpacity>
    );
};

// Memoize ActionButton to prevent unnecessary re-renders
export const ActionButton = React.memo(ActionButtonComponent);

export default ActionButton;
