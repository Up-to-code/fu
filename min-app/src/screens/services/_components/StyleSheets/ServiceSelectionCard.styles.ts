// File: src/screens/services/_components/StyleSheets/ServiceSelectionCard.styles.ts
// Purpose: Styles for ServiceSelectionCard component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

export const styles = StyleSheet.create({
    list: {
        gap: 12,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    cardSelected: {
        borderColor: COLORS.primary,
    },
    content: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 12,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#cbd5e1',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    label: {
        flex: 1,
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        color: '#1e293b',
        textAlign: 'right',
    },
    labelSelected: {
        fontFamily: 'Cairo_700Bold',
        color: COLORS.primary,
    },
});
