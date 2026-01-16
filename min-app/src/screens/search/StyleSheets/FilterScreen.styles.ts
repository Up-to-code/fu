// File: src/screens/search/StyleSheets/FilterScreen.styles.ts
// Purpose: Styles for FilterScreen component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (isRTL: boolean = true, getSize: GetSizeFunction) => {
    return StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        padding: getSize(16, 18, 20, 24, 32),
    },
    section: {
        marginBottom: getSize(20, 22, 24, 32, 40),
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        fontSize: getSize(16, 17, 18, 20, 22),
        textAlign: (isRTL ? 'right' : 'left') as const,
        marginBottom: getSize(10, 11, 12, 16, 20),
    },
    priceRangeContainer: {
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        gap: 12,
    },
    priceInputContainer: {
        flex: 1,
    },
    priceLabel: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        fontSize: getSize(11, 11.5, 12, 13, 14),
        textAlign: (isRTL ? 'right' : 'left') as const,
        marginBottom: 4,
    },
    priceInput: {
        backgroundColor: '#f8fafc',
        borderRadius: getSize(10, 11, 12, 14, 16),
        paddingHorizontal: getSize(14, 15, 16, 20, 24),
        paddingVertical: getSize(10, 11, 12, 14, 16),
        fontSize: getSize(13, 13.5, 14, 15, 16),
        textAlign: (isRTL ? 'right' : 'left') as const,
        fontFamily: 'Cairo_500Medium',
        color: '#1e293b',
    },
    chipsContainer: {
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        flexWrap: 'wrap',
        gap: 8,
    },
    brandButton: {
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: getSize(14, 15, 16, 20, 24),
        paddingVertical: getSize(6, 7, 8, 10, 12),
        borderRadius: getSize(18, 19, 20, 24, 28),
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
        fontSize: getSize(13, 13.5, 14, 15, 16),
    },
    brandTextSelected: {
        color: 'white',
    },
    brandTextUnselected: {
        color: '#475569',
    },
    sortButton: {
        paddingHorizontal: getSize(14, 15, 16, 20, 24),
        paddingVertical: getSize(6, 7, 8, 10, 12),
        borderRadius: getSize(18, 19, 20, 24, 28),
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
        fontSize: getSize(13, 13.5, 14, 15, 16),
    },
    sortTextSelected: {
        color: 'white',
    },
    sortTextUnselected: {
        color: '#475569',
    },
    footer: {
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingBottom: getSize(12, 14, 16, 20, 24),
        paddingTop: getSize(12, 14, 16, 20, 24),
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    });
};
