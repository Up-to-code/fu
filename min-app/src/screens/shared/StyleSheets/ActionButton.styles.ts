// File: src/screens/shared/StyleSheets/ActionButton.styles.ts
// Purpose: Styles for ActionButton component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (variant: 'primary' | 'secondary' | 'outline' | 'danger', disabled: boolean, fullWidth: boolean, isRTL: boolean = true, getSize: GetSizeFunction) => {
    const baseButtonStyle = {
        borderRadius: 16,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        gap: 12,
        paddingVertical: getSize(14, 16, 18, 20, 24),
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
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
                fontSize: getSize(14, 15, 16, 18, 20),
                color: textColors[variant],
            },
        }).text,
        iconColor: iconColors[variant],
    };
};
