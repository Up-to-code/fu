// File: src/screens/shared/StyleSheets/OrderCard.styles.ts
// Purpose: Styles for OrderCard component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (isRTL: boolean = true, getSize: GetSizeFunction) => StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: getSize(12, 14, 16, 16, 20),
        padding: getSize(12, 14, 16, 20, 24),
        marginBottom: getSize(12, 14, 16, 16, 20),
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    header: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    orderNumberSection: {
        flex: 1,
    },
    orderNumber: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(14, 14.5, 15, 17, 19),
        color: '#1e293b',
        marginBottom: 4,
    },
    orderDate: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(11, 11.5, 12, 14, 16),
        color: '#64748b',
    },
    statusBadge: {
        paddingHorizontal: getSize(12, 13, 14, 16, 20),
        paddingVertical: getSize(6, 6.5, 7, 8, 10),
        borderRadius: getSize(8, 9, 10, 10, 12),
    },
    statusText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: getSize(11, 11.5, 12, 14, 16),
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: getSize(100, 110, 120, 140, 160),
        borderRadius: getSize(8, 9, 10, 10, 12),
        overflow: 'hidden',
        marginBottom: getSize(12, 13, 14, 16, 20),
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
        flexDirection: isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalSection: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        alignItems: 'baseline',
        gap: 8,
    },
    totalLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(12, 12.5, 13, 15, 17),
        color: '#64748b',
    },
    totalAmount: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(15, 15.5, 16, 18, 20),
        color: COLORS.primary,
    },
});
