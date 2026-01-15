// File: src/screens/shared/components/PrimaryButton.tsx
// Purpose: Standardized primary action button

import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { PrimaryButtonProps } from '../types/button';
import { styles } from '../StyleSheets/PrimaryButton.styles';

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    label,
    loading = false,
    variant = 'primary',
    disabled,
    style,
    ...touchableProps
}) => {
    const getButtonStyle = () => {
        switch (variant) {
            case 'secondary':
                return [styles.button, styles.buttonSecondary];
            case 'outline':
                return [styles.button, styles.buttonOutline];
            default:
                return [styles.button, styles.buttonPrimary];
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case 'secondary':
                return styles.buttonTextSecondary;
            case 'outline':
                return styles.buttonTextOutline;
            default:
                return styles.buttonTextPrimary;
        }
    };

    return (
        <TouchableOpacity
            style={[
                ...getButtonStyle(),
                (disabled || loading) && styles.buttonDisabled,
                style
            ]}
            disabled={disabled || loading}
            activeOpacity={0.8}
            {...touchableProps}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? 'white' : COLORS.primary} />
            ) : (
                <Text style={getTextStyle()}>{label}</Text>
            )}
        </TouchableOpacity>
    );
};
