// File: src/screens/services/_components/StyleSheets/PaymentStep.styles.ts
// Purpose: Styles for PaymentStep component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        fontSize: 18,
        textAlign: 'right',
        marginBottom: 16,
    },
    methodsContainer: {
        gap: 12,
        marginBottom: 24,
    },
    methodButton: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
    },
    methodButtonSelected: {
        backgroundColor: '#f0f9ff',
    },
    methodButtonUnselected: {
        backgroundColor: '#f8fafc',
    },
    methodLeft: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainerSelected: {
        backgroundColor: COLORS.primary,
    },
    iconContainerUnselected: {
        backgroundColor: 'white',
    },
    methodLabel: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
    },
    methodLabelSelected: {
        color: COLORS.primary,
    },
    methodLabelUnselected: {
        color: '#1e293b',
    },
    checkIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalContainer: {
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: 16,
    },
    totalRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        fontSize: 18,
    },
    totalAmount: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: COLORS.primary,
    },
});
