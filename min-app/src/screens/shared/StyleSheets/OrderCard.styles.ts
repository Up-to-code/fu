// File: src/screens/shared/StyleSheets/OrderCard.styles.ts
// Purpose: Styles for OrderCard component

import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { getResponsiveValue, isSmallScreen } from '../../../utils/responsive';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: getResponsiveValue(12, 16),
        padding: getResponsiveValue(isSmallScreen ? 12 : 16, 20),
        marginBottom: getResponsiveValue(12, 16),
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    header: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    orderNumberSection: {
        flex: 1,
    },
    orderNumber: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getResponsiveValue(isSmallScreen ? 14 : 15, 17),
        color: '#1e293b',
        marginBottom: 4,
    },
    orderDate: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getResponsiveValue(isSmallScreen ? 11 : 12, 14),
        color: '#64748b',
    },
    statusBadge: {
        paddingHorizontal: getResponsiveValue(12, 16),
        paddingVertical: getResponsiveValue(6, 8),
        borderRadius: getResponsiveValue(8, 10),
    },
    statusText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: getResponsiveValue(isSmallScreen ? 11 : 12, 14),
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: getResponsiveValue(isSmallScreen ? 100 : 120, 140),
        borderRadius: getResponsiveValue(8, 10),
        overflow: 'hidden',
        marginBottom: getResponsiveValue(12, 16),
        backgroundColor: '#f1f5f9',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    itemsCountBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    itemsCountText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 11,
        color: 'white',
    },
    footer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalSection: {
        flexDirection: 'row-reverse',
        alignItems: 'baseline',
        gap: 8,
    },
    totalLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getResponsiveValue(isSmallScreen ? 12 : 13, 15),
        color: '#64748b',
    },
    totalAmount: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getResponsiveValue(isSmallScreen ? 15 : 16, 18),
        color: COLORS.primary,
    },
});
