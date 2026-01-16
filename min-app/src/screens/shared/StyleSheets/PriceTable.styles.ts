// File: src/screens/shared/StyleSheets/PriceTable.styles.ts
// Purpose: Styles for PriceTable component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (isRTL: boolean = true, getSize: GetSizeFunction) => StyleSheet.create({
    container: {
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: getSize(16, 18, 20, 20, 24),
    },
    row: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    rowWithBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    label: {
        fontFamily: 'Cairo_500Medium',
        color: '#475569',
        fontSize: getSize(13, 14, 15, 16, 18),
    },
    value: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(13, 14, 15, 16, 18),
    },
    valueNormal: {
        color: '#334155',
    },
    valueDiscount: {
        color: '#EF4444',
    },
    valueFree: {
        color: '#10B981',
    },
    totalRow: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        paddingTop: getSize(16, 18, 20, 20, 24),
        marginTop: 8,
        borderTopWidth: 2,
        borderTopColor: '#e2e8f0',
    },
    totalLabel: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        fontSize: getSize(16, 18, 20, 20, 24),
    },
    totalValue: {
        fontFamily: 'Cairo_700Bold',
        color: COLORS.primary,
        fontSize: getSize(16, 18, 20, 20, 24),
    },
});
