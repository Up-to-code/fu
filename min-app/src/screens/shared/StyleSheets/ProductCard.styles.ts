// File: src/screens/shared/StyleSheets/ProductCard.styles.ts
// Purpose: Styles for ProductCard component with responsive design

import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const isSmallScreen = width < 375;

export const getStyles = () => StyleSheet.create({
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
        height: isTablet ? 176 : isSmallScreen ? 128 : 144,
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    favoriteButton: {
        position: 'absolute',
        top: isTablet ? 10 : 8,
        right: isTablet ? 10 : 8,
        width: isTablet ? 40 : 36,
        height: isTablet ? 40 : 36,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: isTablet ? 20 : 18,
        alignItems: 'center',
        justifyContent: 'center',
        padding: isTablet ? 10 : 8,
    },
    discountBadge: {
        position: 'absolute',
        bottom: isTablet ? 10 : 8,
        left: isTablet ? 10 : 8,
        backgroundColor: '#EF4444',
        paddingHorizontal: isTablet ? 12 : 10,
        paddingVertical: isTablet ? 5 : 4,
        borderRadius: 6,
    },
    discountText: {
        color: 'white',
        fontSize: isTablet ? 11 : 10,
        fontFamily: 'Cairo_700Bold',
    },
    contentContainer: {
        padding: isTablet ? 16 : isSmallScreen ? 12 : 14,
    },
    textContainer: {
        height: isTablet ? 48 : isSmallScreen ? 36 : 44,
        marginBottom: isTablet ? 10 : 8,
        justifyContent: 'center',
    },
    productName: {
        color: '#1e293b',
        fontFamily: 'Cairo_700Bold',
        fontSize: isTablet ? 16 : isSmallScreen ? 12 : 14,
        textAlign: 'right',
        lineHeight: isTablet ? 22 : isSmallScreen ? 18 : 20,
    },
    priceRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'baseline',
        gap: 4,
    },
    price: {
        fontFamily: 'Cairo_700Bold',
        fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16,
        color: COLORS.primary,
    },
    priceCurrency: {
        fontSize: isTablet ? 13 : isSmallScreen ? 10 : 12,
        fontFamily: 'Cairo_500Medium',
        color: COLORS.primary,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#f8fafc',
        paddingHorizontal: isTablet ? 10 : 8,
        paddingVertical: isTablet ? 5 : 4,
        borderRadius: 6,
    },
    ratingText: {
        fontSize: isTablet ? 12 : isSmallScreen ? 10 : 11,
        color: '#475569',
        fontFamily: 'Cairo_700Bold',
    },
    originalPrice: {
        fontSize: isTablet ? 11 : isSmallScreen ? 9 : 10,
        color: '#94a3b8',
        fontFamily: 'Cairo_500Medium',
        textDecorationLine: 'line-through',
        marginLeft: isTablet ? 8 : 6,
    },
    
    // Horizontal variant styles
    horizontalCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        overflow: 'hidden',
        width: isTablet ? 200 : isSmallScreen ? 150 : 170,
    },
    horizontalImageContainer: {
        position: 'relative',
        backgroundColor: '#f1f5f9',
        height: isTablet ? 192 : isSmallScreen ? 140 : 160,
        width: '100%',
    },
    horizontalTextContainer: {
        height: isTablet ? 44 : isSmallScreen ? 36 : 40,
        marginBottom: isTablet ? 8 : 6,
        justifyContent: 'center',
    },
    horizontalProductName: {
        color: '#1e293b',
        fontFamily: 'Cairo_500Medium',
        fontSize: isTablet ? 13 : isSmallScreen ? 11 : 12,
        textAlign: 'right',
        lineHeight: isTablet ? 20 : isSmallScreen ? 18 : 19,
    },
    horizontalPrice: {
        fontFamily: 'Cairo_700Bold',
        fontSize: isTablet ? 15 : isSmallScreen ? 12 : 14,
        color: COLORS.primary,
    },
});
