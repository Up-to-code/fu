// File: src/screens/product/StyleSheets/ProductDetailsScreen.styles.ts
// Purpose: Styles for ProductDetailsScreen component

import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../constants/theme';

const { width } = Dimensions.get('window');

// Responsive breakpoints
const isSmall = width < 375;
const isMedium = width >= 375 && width < 428;
const isLarge = width >= 428 && width < 768;
const isTablet = width >= 768 && width < 1024;
const isDesktop = width >= 1024;

export const getSize = (small: number, medium: number, large: number, tablet: number, desktop: number) => {
    if (isDesktop) return desktop;
    if (isTablet) return tablet;
    if (isLarge) return large;
    if (isMedium) return medium;
    return small;
};

export const padding = getSize(16, 20, 24, 32, 48);
export const imageHeight = getSize(300, 350, 400, 450, 500);
export const maxWidth = getSize(width, width, width, 700, 800);

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        paddingBottom: 120,
        maxWidth: maxWidth,
        alignSelf: 'center',
        width: '100%',
    },
    imageContainer: {
        height: imageHeight,
        backgroundColor: '#f1f5f9',
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    expandIcon: {
        position: 'absolute',
        bottom: 48,
        right: 16,
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
    },
    thumbnailsContainer: {
        position: 'absolute',
        bottom: 48,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    thumbnail: {
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 2,
    },
    thumbnailSelected: {
        borderColor: COLORS.primary,
    },
    thumbnailUnselected: {
        borderColor: 'white',
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        marginTop: -24,
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: padding,
        paddingTop: getSize(20, 24, 28, 32, 40),
        // Shadow/Elevation for floating effect
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8, // For Android
    },
    dragIndicator: {
        width: 56,
        height: 4,
        backgroundColor: '#94a3b8',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 24,
    },
    titleContainer: {
        marginBottom: 16,
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 8,
    },
    discountContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    discountBadge: {
        backgroundColor: '#fee2e2',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    discountText: {
        fontFamily: 'Cairo_700Bold',
        color: '#dc2626',
    },
    priceContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'baseline',
        gap: 12,
        marginBottom: 24,
    },
    price: {
        fontFamily: 'Cairo_700Bold',
        color: COLORS.primary,
    },
    originalPrice: {
        fontFamily: 'Cairo_500Medium',
        color: '#94a3b8',
        textDecorationLine: 'line-through',
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
    },
    sectionAction: {
        padding: 4,
    },
    sectionActionText: {
        fontFamily: 'Cairo_500Medium',
        color: COLORS.primary,
    },
    colorsContainer: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        gap: 12,
    },
    colorButton: {
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },
    colorButtonSelected: {
        borderColor: COLORS.primary,
    },
    colorButtonUnselected: {
        borderColor: '#e2e8f0',
    },
    colorCircle: {
        borderRadius: 999,
    },
    sizesContainer: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        gap: 12,
    },
    sizeButton: {
        borderRadius: 12,
        borderWidth: 1,
    },
    sizeButtonSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    sizeButtonAvailable: {
        backgroundColor: 'white',
        borderColor: '#e2e8f0',
    },
    sizeButtonUnavailable: {
        backgroundColor: '#f1f5f9',
        borderColor: '#f1f5f9',
    },
    sizeText: {
        fontFamily: 'Cairo_700Bold',
    },
    sizeTextSelected: {
        color: 'white',
    },
    sizeTextAvailable: {
        color: '#475569',
    },
    sizeTextUnavailable: {
        color: '#94a3b8',
    },
    quantityContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 16,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
    },
    quantityButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        paddingHorizontal: 16,
    },
    stockText: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
    },
    featuresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    featureBadge: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#f8fafc',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
    },
    featureText: {
        fontFamily: 'Cairo_700Bold',
        color: '#475569',
    },
    descriptionText: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        textAlign: 'right',
        lineHeight: 24,
    },
    similarProductsScroll: {
        transform: [{ scaleX: -1 }],
    },
    similarProductItem: {
        transform: [{ scaleX: -1 }],
        marginLeft: 12,
    },
    addToCartContainer: {
        marginTop: 24,
    },
});
