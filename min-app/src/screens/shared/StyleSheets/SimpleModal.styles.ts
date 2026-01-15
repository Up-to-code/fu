// File: src/screens/shared/StyleSheets/SimpleModal.styles.ts
// Purpose: Styles for SimpleModal component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        width: '100%',
        maxWidth: 400,
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 12,
    },
    message: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#64748b',
        textAlign: 'right',
        marginBottom: 24,
        lineHeight: 22,
    },
    buttons: {
        flexDirection: 'row-reverse',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 14,
        color: '#64748b',
    },
    confirmButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 14,
        color: '#EF4444',
    },
});
