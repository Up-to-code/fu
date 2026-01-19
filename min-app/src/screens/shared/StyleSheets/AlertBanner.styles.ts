// File: src/screens/shared/StyleSheets/AlertBanner.styles.ts
// Purpose: Styles for AlertBanner component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 16,
        gap: 12,
    },
    error: {
        backgroundColor: '#FEF2F2',
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    success: {
        backgroundColor: '#F0FDF4',
        borderWidth: 1,
        borderColor: '#BBF7D0',
    },
    info: {
        backgroundColor: '#EFF6FF',
        borderWidth: 1,
        borderColor: '#BFDBFE',
    },
    icon: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
    },
    message: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        textAlign: 'right',
    },
    errorText: {
        color: '#DC2626',
    },
    successText: {
        color: '#16A34A',
    },
    infoText: {
        color: '#2563EB',
    },
    dismissButton: {
        padding: 4,
    },
});
