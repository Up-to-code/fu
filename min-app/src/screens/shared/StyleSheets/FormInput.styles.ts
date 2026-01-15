// File: src/screens/shared/StyleSheets/FormInput.styles.ts
// Purpose: Styles for FormInput component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    inputGroup: {
        gap: 8,
    },
    label: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: '#1e293b',
        textAlign: 'right',
        marginRight: 4,
    },
    required: {
        color: '#EF4444',
    },
    inputContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        minHeight: 56,
    },
    inputIcon: {
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        fontFamily: 'Cairo_500Medium',
        fontSize: 15,
        color: '#1e293b',
        textAlign: 'right',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    inputDisabled: {
        backgroundColor: '#f1f5f9',
        opacity: 0.7,
    },
    inputDisabledText: {
        color: '#64748b',
    },
    inputError: {
        borderColor: '#EF4444',
    },
    errorText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#EF4444',
        textAlign: 'right',
        marginTop: 4,
        marginRight: 4,
    },
});
