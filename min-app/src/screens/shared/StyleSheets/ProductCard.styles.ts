// File: src/screens/shared/StyleSheets/ProductCard.styles.ts
// Purpose: Styles for ProductCard component with responsive design

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (isRTL: boolean = true, getSize: GetSizeFunction) => StyleSheet.create({
    // Grid variant styles
    gridCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    imageContainer: {
        position: 'relative',
        backgroundColor: '#f1f5f9',
        height: getSize(128, 144, 160, 176, 200),
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    favoriteButton: {
        position: 'absolute',
        top: getSize(8, 10, 12, 10, 14),
        ...(isRTL ? { right: getSize(8, 10, 12, 10, 14) } : { left: getSize(8, 10, 12, 10, 14) }),
        width: getSize(36, 38, 40, 40, 44),
        height: getSize(36, 38, 40, 40, 44),
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: getSize(18, 19, 20, 20, 22),
        alignItems: 'center',
        justifyContent: 'center',
        padding: getSize(8, 9, 10, 10, 12),
    },
    discountBadge: {
        position: 'absolute',
        bottom: getSize(8, 10, 12, 10, 14),
        ...(isRTL ? { left: getSize(8, 10, 12, 10, 14) } : { right: getSize(8, 10, 12, 10, 14) }),
        backgroundColor: '#EF4444',
        paddingHorizontal: getSize(10, 11, 12, 12, 14),
        paddingVertical: getSize(4, 4.5, 5, 5, 6),
        borderRadius: 6,
    },
    discountText: {
        color: 'white',
        fontSize: getSize(10, 10.5, 11, 11, 12),
        fontFamily: 'Cairo_700Bold',
    },
    contentContainer: {
        padding: getSize(12, 14, 16, 16, 20),
    },
    textContainer: {
        height: getSize(36, 44, 48, 48, 56),
        marginBottom: getSize(8, 9, 10, 10, 12),
        justifyContent: 'center',
    },
    productName: {
        color: '#1e293b',
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(12, 14, 16, 16, 18),
        textAlign: (isRTL ? 'right' : 'left') as const,
        lineHeight: getSize(18, 20, 22, 22, 24),
    },
    priceRow: {
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceContainer: {
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        alignItems: 'baseline',
        gap: 4,
    },
    price: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(14, 16, 18, 18, 20),
        color: COLORS.primary,
    },
    priceCurrency: {
        fontSize: getSize(10, 12, 13, 13, 14),
        fontFamily: 'Cairo_500Medium',
        color: COLORS.primary,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#f8fafc',
        paddingHorizontal: getSize(8, 9, 10, 10, 12),
        paddingVertical: getSize(4, 4.5, 5, 5, 6),
        borderRadius: 6,
    },
    ratingText: {
        fontSize: getSize(10, 11, 12, 12, 13),
        color: '#475569',
        fontFamily: 'Cairo_700Bold',
    },
    originalPrice: {
        fontSize: getSize(9, 10, 11, 11, 12),
        color: '#94a3b8',
        fontFamily: 'Cairo_500Medium',
        textDecorationLine: 'line-through',
        ...(isRTL ? { marginLeft: getSize(6, 7, 8, 8, 10) } : { marginRight: getSize(6, 7, 8, 8, 10) }),
    },
    
    // Horizontal variant styles
    horizontalCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        overflow: 'hidden',
        width: getSize(150, 170, 180, 200, 220),
    },
    horizontalImageContainer: {
        position: 'relative',
        backgroundColor: '#f1f5f9',
        height: getSize(140, 160, 176, 192, 220),
        width: '100%',
    },
    horizontalTextContainer: {
        height: getSize(36, 40, 44, 44, 52),
        marginBottom: getSize(6, 7, 8, 8, 10),
        justifyContent: 'center',
    },
    horizontalProductName: {
        color: '#1e293b',
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(11, 12, 13, 13, 15),
        textAlign: (isRTL ? 'right' : 'left') as const,
        lineHeight: getSize(18, 19, 20, 20, 22),
    },
    horizontalPrice: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(12, 14, 15, 15, 17),
        color: COLORS.primary,
    },
});
