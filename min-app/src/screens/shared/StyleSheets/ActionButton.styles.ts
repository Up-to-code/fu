// File: src/screens/shared/StyleSheets/ActionButton.styles.ts
// Purpose: Styles for ActionButton component

import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { getResponsiveValue, isSmallScreen } from '../../../utils/responsive';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export const getStyles = (variant: 'primary' | 'secondary' | 'outline' | 'danger', disabled: boolean, fullWidth: boolean) => {
    const baseButtonStyle = {
        borderRadius: 16,
        flexDirection: 'row-reverse' as const,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        gap: 12,
        paddingVertical: getResponsiveValue(isSmallScreen ? 14 : 16, 20),
        paddingHorizontal: getResponsiveValue(16, 24),
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' as const : undefined,
    };

    const variantStyles = {
        primary: {
            backgroundColor: COLORS.primary,
        },
        secondary: {
            backgroundColor: '#f1f5f9',
        },
        outline: {
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#e2e8f0',
        },
        danger: {
            backgroundColor: '#FEF2F2',
        },
    };

    const textColors = {
        primary: 'white',
        secondary: '#475569',
        outline: '#475569',
        danger: '#EF4444',
    };

    const iconColors = {
        primary: 'white',
        secondary: COLORS.text,
        outline: COLORS.text,
        danger: '#EF4444',
    };

    return {
        button: StyleSheet.create({
            button: {
                ...baseButtonStyle,
                ...variantStyles[variant],
            },
        }).button,
        text: StyleSheet.create({
            text: {
                fontFamily: 'Cairo_700Bold',
                fontSize: getResponsiveValue(isSmallScreen ? 14 : 16, 18),
                color: textColors[variant],
            },
        }).text,
        iconColor: iconColors[variant],
    };
};
