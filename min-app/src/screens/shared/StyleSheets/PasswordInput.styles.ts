// File: src/screens/shared/StyleSheets/PasswordInput.styles.ts
// Purpose: Styles for PasswordInput component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
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
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    input: {
        flex: 1,
        fontFamily: 'Cairo_500Medium',
        fontSize: 15,
        color: '#1e293b',
        textAlign: 'right',
    },
    eyeButton: {
        padding: 4,
        marginLeft: 8,
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
