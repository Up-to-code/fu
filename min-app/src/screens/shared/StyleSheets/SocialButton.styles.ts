// File: src/screens/shared/StyleSheets/SocialButton.styles.ts
// Purpose: Styles for SocialButton component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        borderRadius: 12,
    },
    label: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 15,
        color: '#FFFFFF',
    },
});
