// File: src/screens/search/StyleSheets/FilterScreen.styles.ts
// Purpose: Styles for FilterScreen component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        padding: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 12,
    },
    priceRangeContainer: {
        flexDirection: 'row-reverse',
        gap: 12,
    },
    priceInputContainer: {
        flex: 1,
    },
    priceLabel: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        fontSize: 12,
        textAlign: 'right',
        marginBottom: 4,
    },
    priceInput: {
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        textAlign: 'right',
        fontFamily: 'Cairo_500Medium',
        color: '#1e293b',
    },
    chipsContainer: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        gap: 8,
    },
    brandButton: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    brandButtonSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    brandButtonUnselected: {
        backgroundColor: 'white',
        borderColor: '#e2e8f0',
    },
    brandText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
    },
    brandTextSelected: {
        color: 'white',
    },
    brandTextUnselected: {
        color: '#475569',
    },
    sortButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    sortButtonSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    sortButtonUnselected: {
        backgroundColor: 'white',
        borderColor: '#e2e8f0',
    },
    sortText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
    },
    sortTextSelected: {
        color: 'white',
    },
    sortTextUnselected: {
        color: '#475569',
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
});
