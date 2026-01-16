// File: src/screens/services/_components/StyleSheets/ReviewsSection.styles.ts
// Purpose: Styles for ReviewsSection component

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (
    getSize: GetSizeFunction,
    fontSize: { xs: number; sm: number; base: number; lg: number; xl: number; '2xl': number; '3xl': number }
) => {
    const { StyleSheet } = require('react-native');
    return StyleSheet.create({
        container: {
            backgroundColor: 'white',
            marginHorizontal: getSize(14, 15, 16, 20, 24),
            marginBottom: getSize(10, 11, 12, 14, 16),
            borderRadius: getSize(10, 11, 12, 14, 16),
            padding: getSize(14, 15, 16, 20, 24),
            borderWidth: 1,
            borderColor: '#f1f5f9',
        },
        header: {
            marginBottom: getSize(10, 11, 12, 14, 16),
            paddingBottom: getSize(10, 11, 12, 14, 16),
            borderBottomWidth: 1,
            borderBottomColor: '#f1f5f9',
        },
        ratingContainer: {
            alignItems: 'center',
        },
        ratingValue: {
            fontFamily: 'Cairo_700Bold',
            fontSize: getSize(28, 30, 32, 40, 48),
            color: '#1e293b',
            marginBottom: getSize(4, 5, 6, 8, 10),
        },
        starsContainer: {
            flexDirection: 'row-reverse',
            gap: 4,
            marginBottom: getSize(6, 7, 8, 10, 12),
        },
        reviewCount: {
            fontFamily: 'Cairo_500Medium',
            fontSize: fontSize.sm,
            color: '#64748b',
        },
        reviewsList: {
            gap: getSize(6, 7, 8, 10, 12),
        },
    });
};
