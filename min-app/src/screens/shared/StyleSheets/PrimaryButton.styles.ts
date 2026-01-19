// File: src/screens/shared/StyleSheets/PrimaryButton.styles.ts
// Purpose: Styles for PrimaryButton component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    button: {
        borderRadius: 16,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPrimary: {
        backgroundColor: COLORS.primary,
    },
    buttonSecondary: {
        backgroundColor: '#f1f5f9',
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonTextPrimary: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: 'white',
    },
    buttonTextSecondary: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: '#1e293b',
    },
    buttonTextOutline: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: COLORS.primary,
    },
});
