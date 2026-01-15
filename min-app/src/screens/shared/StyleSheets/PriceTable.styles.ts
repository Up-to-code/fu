// File: src/screens/shared/StyleSheets/PriceTable.styles.ts
// Purpose: Styles for PriceTable component

import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { getResponsiveValue, isSmallScreen } from '../../../utils/responsive';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const isLarge = width >= 1024;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: getResponsiveValue(16, 20),
    },
    row: {
        flexDirection: 'row-reverse',
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
        fontSize: getResponsiveValue(isSmallScreen ? 13 : 14, isLarge ? 18 : 16),
    },
    value: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getResponsiveValue(isSmallScreen ? 13 : 14, isLarge ? 18 : 16),
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
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        paddingTop: 16,
        marginTop: 8,
        borderTopWidth: 2,
        borderTopColor: '#e2e8f0',
    },
    totalLabel: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        fontSize: getResponsiveValue(isSmallScreen ? 16 : 18, isLarge ? 24 : 20),
    },
    totalValue: {
        fontFamily: 'Cairo_700Bold',
        color: COLORS.primary,
        fontSize: getResponsiveValue(isSmallScreen ? 16 : 18, isLarge ? 24 : 20),
    },
});
