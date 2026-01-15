// File: src/screens/shared/StyleSheets/FormToggle.styles.ts
// Purpose: Styles for FormToggle component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    toggleRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        gap: 12,
    },
    toggleContent: {
        flex: 1,
    },
    toggleLabel: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: '#1e293b',
        textAlign: 'right',
    },
    toggleSubLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#64748b',
        textAlign: 'right',
        marginTop: 4,
    },
});
