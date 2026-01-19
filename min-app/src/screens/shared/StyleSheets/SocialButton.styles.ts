// File: src/screens/shared/StyleSheets/SocialButton.styles.ts
// Purpose: Styles for SocialButton component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 12, // actually in a row we might not need bottom margin if we wrap, but here we are in a row. 
        paddingHorizontal: 8,
        gap: 8,
    },
    googleButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
    },
    appleButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
    },
    text: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        textAlign: 'center',
    },
    googleText: {
        color: '#1E293B',
    },
    appleText: {
        color: '#1E293B', // Dark text for white button
    },
    icon: {
        // ensuring icon alignment
    }
});
